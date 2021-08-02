import { Tads3Listener } from './Tads3Listener';
import { ObjectDeclarationContext, PropertySetContext, PropertyContext, FunctionHeadContext, IdAtomContext, AssignmentStatementContext, FunctionDeclarationContext, CurlyObjectBodyContext, CodeBlockContext, MemberExprContext, ThrowStatementContext } from './Tads3Parser';
import { ScopedEnvironment } from './ScopedEnvironment';
import { CompletionItem, DocumentSymbol, SymbolKind } from 'vscode-languageserver';
import { Location, Range } from 'vscode-languageserver';

// TODO: Maybe much easier to just keep a map instead of an object like this?
export class ExtendedDocumentSymbolProperties {
	arrowConnection: string | undefined;
	at: string|undefined = undefined;
	objectScope: any | undefined;
	functionScope: any | undefined;
	symbol: any| undefined;
	isAssignment: boolean| undefined;
	shortName: string| undefined;
	parent: DocumentSymbol | undefined;
	superClassRoot: string | undefined;
	travelConnectorMap = new Map();
}

//const additionalProperties = new Map<string, ExtendedDocumentSymbolProperties>();

export class Tads3SymbolListener implements Tads3Listener {

	symbols: DocumentSymbol[] = [];

	additionalProperties: Map<DocumentSymbol, ExtendedDocumentSymbolProperties> = new Map();


	currentObjectSymbol: DocumentSymbol | undefined;

	currentFunctionSymbol: DocumentSymbol | undefined;

	currentInnerObjectSymbol: DocumentSymbol | undefined;

	assignmentStatements: DocumentSymbol[] = [];

	lastObjectLevelMap: Map<number, DocumentSymbol> = new Map();

	completionItems: Set<CompletionItem> = new Set();

	currentPropertySetName: string | undefined;

	validateSymbolPlacing = false;

	preprocessedText: string | undefined;

	inc = 0;

	inheritanceMap: any = new Map();

	symbolToTweak: any = undefined;

	callbackToRun: any = undefined;

	progressCallback: any;

	scopedEnvironment: ScopedEnvironment | undefined;

	currentUri!: string;

	scopedEnvironments: any;

	localKeywords: Map<string, Range[]> = new Map();

	memberCallChains = new Map();
	

	enterIdAtom(ctx: IdAtomContext) {
		try {
			let name;
			// eslint-disable-next-line prefer-const
			name = ctx?.identifierAtom()?.ID()?.text?.trim();
			if (name !== undefined) {
				this.completionItems.add(CompletionItem.create(name));
				const start = ctx.start.line ?? 1 - 1;
				const stop = (ctx.stop?.line) ?? 1 - 1;
				//console.error(`${name} added`);
				//this.scopedEnvironment.environment.set(name, new Location(this.currentUri, Range.create(start, 0, stop, 0)));
				try {
					const range = Range.create(start, 0, stop, 0);
					if (!this.localKeywords.has(name)) {
						this.localKeywords.set(name, [range]);
					} else {
						this.localKeywords.get(name)?.push(range);
					}
				} catch (err) {
					console.error(`enterIdAtom ${err}`);
				}

			}
		}
		catch(error) {
			console.error(error);
		}
	}


	/**
	 * Create a new scope whenever entering a new code block { ... } 
	 * TODO: this needs to happen inside various statements as well (while, for etc...)
	 * Keep track of new the new scope so we can access them all when doing call hierarchy etc
	 * @param ctx 
	 */
	enterCodeBlock(ctx: CodeBlockContext) {
		//TODO: this.scopedEnvironment = new ScopedEnvironment(this.scopedEnvironment);		
		//TODO: this.scopedEnvironments.push(this.scopedEnvironment);
	}

	/**
	 * Go back to the enclosing scope when leaving a code block { ... }
	 * @param ctx 
	 */
	exitCodeBlock(ctx: CodeBlockContext) {
		//TODO: this.scopedEnvironment = this.scopedEnvironment.getEnclosingEnvironment();
	}

	enterAssignmentStatement(ctx: AssignmentStatementContext) {
		const name = ctx.identifierAtom()?.ID()?.text?.trim();
		const start = (ctx.start.line ?? 1) - 1;
		const stop = (ctx.stop?.line ?? 1) - 1;
		const range = Range.create(start, 0, stop, 0);
		const detail = '';
		if (name !== undefined) {
			const symbol = DocumentSymbol.create(name, detail, SymbolKind.Variable, range, range, []);

			const additionalProps = new ExtendedDocumentSymbolProperties();
			additionalProps.objectScope = this.currentObjectSymbol;
			additionalProps.functionScope = this.currentFunctionSymbol;
			this.additionalProperties.set(symbol, additionalProps);
			this.assignmentStatements.push(symbol);
		}

	}
	enterObjectDeclaration(ctx: ObjectDeclarationContext) {
		let name: string = ctx.identifierAtom()?.ID()?.text.toString() ?? "unnamed";
		const start = (ctx.start.line ?? 1) - 1;
		const stop = (ctx.stop?.line ?? 1) - 1;
		const range = Range.create(start, 0, stop, 0);
		let level = 0;
		if (ctx._level) {
			level = ctx._level.length;
		}
		if (name === 'unnamed') {
			//name = ctx.superTypes().toString();
			name = ctx.superTypes()?.identifierAtom()?.ID()?.toString() ?? 'unnamed';
		}
		const detail = ctx.superTypes()?.payload?.text ?? "object";

		//TODO: add to classInheritance,
		if (ctx._isClass) {
			const superClassNames = detail.split(',');
			for (const superClassName of superClassNames) {
				this.inheritanceMap.set(name, superClassName);				
			}
		}

		// TODO: make a decision here:
		/*if(this.symbols.map(x=>x.name===name)) {
			name += new String(`(${++this.inc})`);
		}*/
		const symbol = DocumentSymbol.create(name, detail, ctx._isClass ? SymbolKind.Class : SymbolKind.Object, range, range, []);
		this.currentObjectSymbol = symbol;

		const additionalProps = new ExtendedDocumentSymbolProperties();


		try {

			const body = ctx.semiColonEndedObjectBody() ?? ctx.curlyObjectBody();
			if(body) {
				for (const template of body?.objectBody()?.templateExpr()) {


					if(template?.text) {
						if (template.text.startsWith('->')) {
							//symbol['arrowConnection'] = template.text.replace('->', '');
							const arrowConnection = template.text.replace('->', '');

							additionalProps.arrowConnection = arrowConnection ? arrowConnection : additionalProps.arrowConnection;

						} else if(template.text.startsWith('@')) {
							const at = template.text.replace('@', '');
							additionalProps.at = at ? at : additionalProps.arrowConnection;
						}
					}
					const shortName = template._singleString?.text;
					additionalProps.shortName = shortName ? shortName.substr(1, shortName.length - 2) : additionalProps.shortName;
				}
			}

		} catch (err) {
			console.error(err);
		}


		if (level > 0) {
			const lastObjectOneLevelBelow = this.lastObjectLevelMap.get(level - 1);
			if (lastObjectOneLevelBelow) {
				lastObjectOneLevelBelow.children?.push(symbol);
				additionalProps.parent = lastObjectOneLevelBelow;
			} else {
				this.symbols.push(symbol);

			}

		} else {
			this.symbols.push(symbol);
		}
		if (!ctx._isClass) {
			this.lastObjectLevelMap.set(level, symbol);
		}
		if (name) {
			this.additionalProperties.set(symbol, additionalProps);			
		}
	}


	exitObjectDeclaration(ctx: ObjectDeclarationContext) {
		this.currentObjectSymbol = undefined;
		this.callbackToRun = undefined;
	}

	enterPropertySet(ctx: PropertySetContext) {
		let name = '';
		const firstParameter = ctx.paramsWithWildcard()?._parameters[0];
		if (firstParameter && firstParameter.children) {
			name = firstParameter.children[0]?.toString();
			name = name.substr(1, name.length - 2);
		}
		this.currentPropertySetName = name;
	}

	enterMemberExpr(ctx: MemberExprContext) {
		const memberCallChain = ctx._prev ? ctx._prev.text.split('.') : [];
		const procedure = ctx._next?.text;
		//console.error(`MemberExpr: [ ${memberCallChain} ]  ->(${procedure} ())   Line: ${ctx.start.line} - ${ctx.stop.line}`);
		const previousArray = this.memberCallChains.get(procedure);
		if (previousArray) {
			this.memberCallChains.set(procedure, [  ...previousArray, {
				line: ctx.start.line,
				memberChain: memberCallChain
			}]);
		} else {
			this.memberCallChains.set(procedure, [ {
				line: ctx.start.line,
				memberChain: memberCallChain
			}]);
		}
	}

	exitPropertySet(ctx: PropertySetContext) {
		this.currentPropertySetName = undefined;
	}

	visitErrorNode(ctx: any) {
		console.error('*** ERROR NODE ***');
	}

	exitCurlyObjectBody(ctx: CurlyObjectBodyContext) {
		this.currentInnerObjectSymbol = undefined;
	}

	enterProperty(ctx: PropertyContext) {
		let name: string;
		if (ctx.identifierAtom()?.length > 0) {
			name = (ctx.identifierAtom()[0]?.ID()?.toString()) ?? "unnamed";
		} else {
			name = (ctx.IN()?.text) ?? "unnamed";
		}
		let detail = "property";
		//let isDirection = false;
		let isAssignment = false;
		let isInnerObject = false;
		if (ctx.ASSIGN()) {
			isAssignment = true;
			const line = ctx.payload.text;
			const split = line.split(/=/);
			if (split.length > 1) {
				//isDirection = split[0].trim().match(/north|northeast|northwest|south|southeast|southwest|east|west|up|down|in|out/) !== undefined;
				detail = split[1].trim();
			}
		} else if (ctx.COLON()) {
			const line = ctx.payload.text;
			const split = line.split(/:/);
			if (split.length > 1) {
				detail = split[1].trim();
			}
			isInnerObject = true;
			//ctx.curlyObjectBody()?.children[1].payload.getChild(0).identifierAtom()[0].text
		}
		const start = ctx.start.line - 1;
		if (name === undefined || name === '') {
			console.error(`Couldn't process symbol at row ${start}`);
			return;
		}
		const stop = ((ctx.stop?.line) ?? 1) - 1 ?? start;
		const startCharacter =  (ctx.start?.charPositionInLine) ?? 0;
		const stopCharacter = (ctx.stop?.charPositionInLine) ?? 0;
		const range = Range.create(start, startCharacter, stop, stopCharacter); // TODO: stop character here.

		const additionalProps = new ExtendedDocumentSymbolProperties();
		const symbol = DocumentSymbol.create(name, detail, isInnerObject ? SymbolKind.Object : SymbolKind.Property, range, range, []);
		additionalProps.isAssignment = isAssignment;

		/*
		// Creates a callback to return to this object whenever a property named destination is found
		// This is made effectively unusable afterwards here and exitObjectDeclaration since then the scope 
		// is over
		*/

		// ------------------------------------------
		// Special handling for TravelConnectors 
		// ------------------------------------------
		if (detail.includes('TravelConnector')) {
			symbol.kind = SymbolKind.TypeParameter;
			this.callbackToRun = (destination: any) => {
				this.symbolToTweak = symbol;
				this.symbolToTweak.detail = 'TravelConnector';
				// We keep track of a travellerConnectorMap inside each object, so we can use that value 
				// directly whenever a travelConnector is in use

				if (this.currentObjectSymbol) {
					this.additionalProperties
						.get(this.currentObjectSymbol)
						?.travelConnectorMap.set(symbol, destination);
				}
				//console.error(`Fetching destination for ${this.symbolToTweak.name}'s TravelConnector: ${destination}`);
			};
		}
		if (this.callbackToRun && name === 'destination') {
			//console.error(`Found a destination for a travelConnector: ${detail}`);
			this.callbackToRun(detail);
			this.callbackToRun = undefined;
		}
		//------------------------------------------


		// ------------------------------------------
		// Special handling for Doors 
		// TODO: arrowConnection should be renamed
		// ------------------------------------------
		if (this.currentObjectSymbol && (name === 'otherSide' || name === 'masterObject')) {
			if (this.currentObjectSymbol) {
				//this.currentObjectSymbol.arrowConnection = detail;
				const prop = this.additionalProperties.get(this.currentObjectSymbol);
				if (prop?.arrowConnection) {
					prop.arrowConnection = detail;
				}
			}
		}
		//------------------------------------------
		if (this.currentInnerObjectSymbol) {
			this.currentInnerObjectSymbol.children?.push(symbol);
		} else if (this.currentObjectSymbol) {
			additionalProps.parent = this.currentObjectSymbol;

			this.currentObjectSymbol.children?.push(symbol);
		}
		if (isInnerObject) {
			this.currentInnerObjectSymbol = symbol;
		}

		if (name && additionalProps.parent) {
			this.additionalProperties.set(symbol, additionalProps);			
		}
	}
	
	enterFunctionHead(ctx: FunctionHeadContext) {
		try {

			let name: string = ctx.identifierAtom()?.ID()?.text.toString() ?? "anonymous function";
			const start = ctx.start.line - 1;
			const range = Range.create(start, 0, start, 0);

			const props = new ExtendedDocumentSymbolProperties();

			if (this.currentObjectSymbol) {
				const detail = "method";
				if (this.currentPropertySetName) {
					name = this.currentPropertySetName.replace('*', name);
				}
				const symbol = DocumentSymbol.create(name, detail, SymbolKind.Method, range, range, []);

				props.parent = this.currentObjectSymbol;

				this.currentObjectSymbol.children?.push(symbol);
				this.currentFunctionSymbol = symbol;
				this.additionalProperties.set(symbol, props);


			} else {
				const detail = "function";
				const symbol = DocumentSymbol.create(name, detail, SymbolKind.Function, range, range, []);
				this.symbols.push(symbol);
				this.currentFunctionSymbol = symbol;
				this.additionalProperties.set(symbol, props);

			}

		} catch(err) {
			console.error(err);
		}
	}
	exitFunctionDeclaration(ctx: FunctionDeclarationContext) {
		try {
				if (ctx.stop && ctx.stop.line && ctx.stop.charPositionInLine) {
				if(this.currentFunctionSymbol?.range) {
					const range = Range.create(this.currentFunctionSymbol.range.start.line,
						this.currentFunctionSymbol.range.start.character,
						ctx.stop.line, ctx.stop.charPositionInLine);
					this.currentFunctionSymbol.range = range;				
				}
			}
			this.currentFunctionSymbol = undefined;
		} catch(err) {
			console.error(err);
		}
	}
}
