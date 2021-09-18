import * as Net from 'net';
import { DebugAdapterDescriptorFactory, DebugSession, DebugAdapterExecutable, ProviderResult, DebugAdapterDescriptor, DebugAdapterServer, ExtensionContext, commands, debug, DebugConfiguration, DebugConfigurationProviderTriggerKind, EvaluatableExpression, InlineValue, InlineValueContext, InlineValueVariableLookup, languages, Position, Range, TextDocument, Uri, window, workspace, WorkspaceFolder, DebugConfigurationProvider, CancellationToken } from 'vscode';
import { Tads3DebugSession } from './tads3debug';
import { FileAccessor } from './tads3runtime';

export class Tads3DebugAdapterServerDescriptorFactory implements DebugAdapterDescriptorFactory {

	private server?: Net.Server;

	createDebugAdapterDescriptor(session: DebugSession, executable: DebugAdapterExecutable | undefined): ProviderResult<DebugAdapterDescriptor> {
		
		// TODO: modify frobd and use a dedicated port
		// (The following requires frobd to be already running)

		if (!this.server) {
			// start listening on a random port
			this.server = Net.createServer(socket => {
				const session = new Tads3DebugSession(workspaceFileAccessor);
				session.setRunAsServer(true);
				session.start(socket as NodeJS.ReadableStream, socket);
			}).listen(0);
		}

		const port = (this.server.address() as Net.AddressInfo).port;
		return new DebugAdapterServer(port);
	}

	dispose() {
		if (this.server) {
			this.server.close();
		}
	}
}


export const workspaceFileAccessor: FileAccessor = {
	async readFile(path: string) {
		try {
			const uri = Uri.file(path);
			const bytes = await workspace.fs.readFile(uri);
			const contents = Buffer.from(bytes).toString('utf8');
			return contents;
		} catch(e) {
			try {
				const uri = Uri.parse(path);
				const bytes = await workspace.fs.readFile(uri);
				const contents = Buffer.from(bytes).toString('utf8');
				return contents;
			} catch (e) {
				return `cannot read '${path}'`;
			}
		}
	}
};


export function activateTads3Debug(context: ExtensionContext, factory?: DebugAdapterDescriptorFactory) {
	
	context.subscriptions.push(
		commands.registerCommand('extension.tads3-debug.runEditorContents', (resource: Uri) => {
			let targetResource = resource;
			if (!targetResource && window.activeTextEditor) {
				targetResource = window.activeTextEditor.document.uri;
			}
			if (targetResource) {
				debug.startDebugging(undefined, {
						type: 'tads3',
						name: 'Run File',
						request: 'launch',
						program: targetResource.fsPath
					},
					{ noDebug: true }
				);
			}
		}),
		commands.registerCommand('extension.tads3-debug.debugEditorContents', (resource: Uri) => {
			let targetResource = resource;
			if (!targetResource && window.activeTextEditor) {
				targetResource = window.activeTextEditor.document.uri;
			}
			if (targetResource) {
				debug.startDebugging(undefined, {
					type: 'tads3',
					name: 'Debug File',
					request: 'launch',
					program: targetResource.fsPath,
					stopOnEntry: true
				});
			}
		}),
		commands.registerCommand('extension.tads3-debug.toggleFormatting', (variable) => {
			const ds = debug.activeDebugSession;
			if (ds) {
				ds.customRequest('toggleFormatting');
			}
		})
	);

	context.subscriptions.push(commands.registerCommand('extension.tads3-debug.getProgramName', config => {
		return window.showInputBox({
			placeHolder: "Please enter the name of a tads3 file in the workspace folder",
			value: "example1.t"
		});
	}));

	// register a configuration provider for 'tads3' debug type
	const provider = new Tads3ConfigurationProvider();
	context.subscriptions.push(debug.registerDebugConfigurationProvider('tads3', provider));

	// register a dynamic configuration provider for 'tads3' debug type
	context.subscriptions.push(debug.registerDebugConfigurationProvider('tads3', {
		provideDebugConfigurations(folder: WorkspaceFolder | undefined): ProviderResult<DebugConfiguration[]> {
			return [
				{
					name: "Dynamic Launch",
					request: "launch",
					type: "tads3",
					program: "${file}"
				},
				{
					name: "Another Dynamic Launch",
					request: "launch",
					type: "tads3",
					program: "${file}"
				},
				{
					name: "Tads3 Launch",
					request: "launch",
					type: "tads3",
					program: "${file}"
				}
			];
		}
	}, DebugConfigurationProviderTriggerKind.Dynamic));

	if (!factory) {

		//factory = new InlineDebugAdapterFactory();

		window.showErrorMessage(`Could not initiate debug adapter factory`);
		return;
	}



	context.subscriptions.push(debug.registerDebugAdapterDescriptorFactory('tads3', factory));
	/*if ('dispose' in factory) {
		context.subscriptions.push(factory);
	}*/


	// override VS Code's default implementation of the debug hover
	// here we match only Mock "variables", that are words starting with an '$' 
	context.subscriptions.push(languages.registerEvaluatableExpressionProvider('tads3', {
		provideEvaluatableExpression(document: TextDocument, position: Position): ProviderResult<EvaluatableExpression> {

			const VARIABLE_REGEXP = /\$[a-z][a-z0-9]*/ig;
			const line = document.lineAt(position.line).text;
			
			let m: RegExpExecArray | null;
			// eslint-disable-next-line no-cond-assign
			while (m = VARIABLE_REGEXP.exec(line)) {
				const varRange = new Range(position.line, m.index, position.line, m.index + m[0].length);

				if (varRange.contains(position)) {
					return new EvaluatableExpression(varRange);
				}
			}
			return undefined;
		}
	}));

	// override VS Code's default implementation of the "inline values" feature"
	context.subscriptions.push(languages.registerInlineValuesProvider('tads3', {

		provideInlineValues(document: TextDocument, viewport: Range, context: InlineValueContext) : ProviderResult<InlineValue[]> {

			const allValues: InlineValue[] = [];

			for (let l = viewport.start.line; l <= context.stoppedLocation.end.line; l++) {
				const line = document.lineAt(l);
				const regExp = /\$([a-z][a-z0-9]*)/ig;	// variables are words starting with '$'
				let m;
				do {
					m = regExp.exec(line.text);
					if (m) {
						const varName = m[1];
						const varRange = new Range(l, m.index, l, m.index + varName.length);

						// some literal text
						//allValues.push(new InlineValueText(varRange, `${varName}: ${viewport.start.line}`));

						// value found via variable lookup
						allValues.push(new InlineValueVariableLookup(varRange, varName, false));

						// value determined via expression evaluation
						//allValues.push(new InlineValueEvaluatableExpression(varRange, varName));
					}
				} while (m);
			}

			return allValues;
		}
	}));
}



class Tads3ConfigurationProvider implements DebugConfigurationProvider {

	/**
	 * Massage a debug configuration just before a debug session is being launched,
	 * e.g. add all missing attributes to the debug configuration.
	 */
	resolveDebugConfiguration(folder: WorkspaceFolder | undefined, config: DebugConfiguration, token?: CancellationToken): ProviderResult<DebugConfiguration> {

		// if launch.json is missing or empty
		if (!config.type && !config.request && !config.name) {
			const editor = window.activeTextEditor;
			if (editor && editor.document.languageId === 'tads3') {
				config.type = 'tads3';
				config.name = 'Launch';
				config.request = 'launch';
				config.program = '${file}';
				config.stopOnEntry = true;
			}
		}

		if (!config.program) {
			return window.showInformationMessage("Cannot find a program to debug").then(_ => {
				return undefined;	// abort launch
			});
		}

		return config;
	}
}
