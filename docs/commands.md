# Command Reference

All commands are accessible via the command palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).

## Project

| Command | Description |
|---|---|
| `tads3.createTads3TemplateProject` | Create a new TADS 3 project from a template. |
| `tads3.addFileToProject` | Add a new source file to the current project and register it in the Makefile. |
| `tads3.setMakefile` | Choose which `.t3m` Makefile to use when there are several in the project. |

## Parsing & cache

| Command | Description |
|---|---|
| `tads2.parseTads2Project` | Manually trigger a full parse of a TADS 2 project. |
| `tads3.clearCache` | Clear the cached library symbols for `adv3`/`adv3Lite`. Useful if the cache gets out of sync. |

## Editing & code intelligence

| Command | Description |
|---|---|
| `tads3.analyzeTextAtPosition` | Analyze the room description at the cursor using NLP and offer code actions to create decoration objects for identified nouns. |
| `tads3.extractAllQuotes` | Extract all unique single- and double-quoted strings from the project or current file into a list. |
| `tads3.evaluateSelection` | Evaluate the selected TADS 3 expression or statement block and show the result in a notification. Supports arithmetic, string operations, local variables, and constant folding. Only available when a `.t` file is open. |

## Preprocessor

| Command | Description |
|---|---|
| `tads3.showPreprocessedTextForCurrentFile` | Open the preprocessed version of the current file in a side-by-side window. |
| `tads3.showPreprocessedFileQuickPick` | Pick any project file and open its preprocessed version in a separate window. |
| `tads3.openProjectFileQuickPick` | Pick any project or library file and open it in a separate window. |
| `tads3.enablePreprocessorCodeLens` | Toggle CodeLens annotations that highlight differences between source and preprocessed text. Clicking a lens opens the preprocessed file at the divergent line. |
| `tads3.showPreprocessedTextAction` | Internal command — show preprocessed text and scroll to a specific range (used by CodeLens). |

## Game runner

| Command | Description |
|---|---|
| `tads3.restartGameRunnerOnT3ImageChanges` | Toggle automatic game restart in a terminal whenever a new `.t3` image is compiled. Uses the interpreter set in `tads3.gameRunnerInterpreter` (default: `frob`). |
| `tads3.installTracker` | Install a game-tracker source file into the project. The tracker persists the player's room position between sessions, enabling a continuous development loop together with the auto-restart feature. |

## Visual editor & tools

| Command | Description |
|---|---|
| `tads3.openInVisualEditor` | Open the current TADS 3 source file in the visual map editor — an interactive web view for editing room exits and adding rooms. |
| `tads3.downloadAndInstallExtension` | Browse and download TADS 3 extensions from the IF Archive, with multi-select support. Downloaded files are cached locally. |
| `tads3.analyzeImage` | Analyze an image file and display information in the image info view. |

## Debugger

| Command | Description |
|---|---|
| `extension.tads3-debug.debugEditorContents` | Start a debug session for the current file. |
| `extension.tads3-debug.runEditorContents` | Run the current file without debugging. |
| `extension.tads3-debug.toggleFormatting` | Toggle between decimal and hex display in the debug variable view. |

## Script replay (game session panel)

These commands appear in the script panel when script files are enabled.

| Command | Description |
|---|---|
| `tads3.restartReplayScript` | Restart the game and replay the current script from the beginning. |
| `tads3.replayScript` | Replay the current script without restarting. |
| `tads3.openReplayScript` | Open the current script file in the editor. |
| `tads3.deleteReplayScript` | Delete the current script file. |
