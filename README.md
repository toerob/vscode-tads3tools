


# vscode-tads3tools

A language server/client for the Tads3 programming language and tailored made for Visual Studio Code. 

# Version 0.5 - alpha

[![Video Demonstration](./screenshots/vscode-tads3tools-demo-small.gif)](./screenshots/vscode-tads3tools-demo-small.gif)

(Better quality here: [![Video Demonstration](./screenshots/vscode-tads3tools-demo-small.mp4)](./screenshots/vscode-tads3tools-demo-small.mp4))


## Functionality

Tads3tools has the following features:

- Diagnostics regenerated on each file change 
- Symbol outliner derived from each file in the tads3 project
- Symbol definitions (with cross references through the project files)
- CodeLens for showing preprocessed differences 
- A webview containing the visual map for visualizing and helping out creating a game world.
- Word completions (fuzzy searching through defined symbols and keywords in the project)
- Auto generate decorations based on room descriptions
- Auto monitoring the tads3 game image and restart the game on any changes
- Snippets to help out with commonly used classes, such as Room, Thing, Actor, ActorState, AgendaItem, Topic etc...
- Various commands and more...


## Planned features

- A debugger implementation (via DAP)
- Go to references
- Call Hierarchy
- Document/Selection Formatting 


## Available Commands

The following command are at the user's disposal any time by using the regular vscode "command-shift-p" command. They all start with the prefix "Tads3 command", so starting to type that will reveal all commands in the palette.

 * Clear cache for standard libraries adv3/adv3Lite.
 * Download and install extension(s)
 * Install a tracker game file in the project so the game will remember player position between sessions"  
 * Toggles on/off if the game should restarted as soon as the t3 image game file changes
 * Open current tads3 source code \*.{t,h} in Tads3 Visual Editor
 * Set which makefile (.t3m) to use for this project (in case there are several)
 * Show preprocessed text for the current file
 * Choose a preprocessed file to show in a separate window
 * Open any project file in a separate window
 * Toggle CodeLens for preprocessed text of the current Tads3 command: Create a new Tads3 template project
 * Analyze the text at the current position and offer code actions.




**Command details follows:**

---

#### **"Tads3 command: Open current tads3 source code \*.{t,h} in Tads3 Visual Editor"**
    
Opens the project in a special web view that displays a map of the game and also allows for some interactivity in changing the exits and adding room.

#### **"Tads3 command: Set which makefile (.t3m) to use for this project (in case there are several)"**

Select which makefile to use (this will be set automatically when opening the project but can be overriden with this command)

#### **"Tads3 command: Show preprocessed text for the current file"**

Opens up the preprocessed version of the file next to the source code in a separate window.

#### **"Tads3 command: Choose a preprocessed file to show in a separate window"**

Let's you choose any of the preprocessed files available in the project in a separate window next to the source code. 

#### **"Tads3 command: Open any project file in a separate window"**

Let's you choose any one of the project files (including library files that are included in the project) available in the project in a separate window next ot the source code. 


#### **"Tads3 command: Toggle CodeLens for preprocessed text of the current Tads3 command: Create a new Tads3 template project"**

Toggles a codelens for any preprocessed differences in the original game source code. If clicking the codelens text it will open the preprocessed text and focus in on the divergent text. 


#### **"Tads3 command: Analyze the text at the current position and offer code actions. "**
        
 Analyzes a room description (using NLP pos tagger technique) and identifies nouns in the text. Then displays a quickpick modal allowing you to select which one should be made a decoration for the current object. The levelling will be kept automatic, so in case the room starts with '+' the decoration objects will be set to '++'.

#### **"Tads3 command: Download and install extension(s)"**

  Will open a quickpick dialog showing all the extensions for tads3 in the ifarchive contribution folder. It will let you multi-select which extension to download and install. At the moment, installment is only unzipping an archive to the project folder. This, because there might be non-uniformity in how extensions are installed and used. A downloaded file will also be cached in the same folder parent folder of the standard library cache. (globalStorageUri)

#### **"Tads3 command: Install a tracker game file in the project so the game will remember player position between sessions"**  

This command will install a "gametracker" tads source code file into the project and add itself to the makefile. (Both the makefile and this source code will be opened on the command run, so the effect can be seen right away.) Installing the game tracker allows for continuous game development, meaning the player position will be persisted ony any room change and whenever the game is restarted the tracker extension will move the player to the last persisted position and start the game from there. This along with the command for toggling a game restart on each t3 image file change this, will fire up the frob interpreter in a terminal on each incremental change that are saved with the latest change. 

#### **"Tads3 command: Toggles on/off if the game should restarted as soon as the t3 image game file changes"**

If toggled to be enabled, the game will be restarted with the default interpreter in a terminal, on any saved changes in the project that will lead to a new game image file. 

#### **"Tads3 command: Clear cache for standard libraries adv3/adv3Lite."**

  This command will clear all the cache that's been built up since last parsing. This hopefully will only be useful for rare circumstances and edge cases. By default using cache for the library files will speed up parsing immensly.

---


## Attributions
 - Microsoft - This language server is based on the example found in (https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-sample)  MIT License

 - Antlr4 was used to generate a parser for the Tads3 programming Language (https://github.com/antlr/antlr4) BSD 3-clause license 
 - Antlr4ts was used to produce a specific typescript target of the antlr4 grammar (https://github.com/tunnelvisionlabs/antlr4ts) BSD 
 - Litegraph (https://github.com/jagenjo/litegraph.js) MIT License
 - RxJS (https://github.com/ReactiveX/rxjs) Apache-2.0 License 
 - Fuzzysort (https://github.com/farzher/fuzzysort) MIT License
 - Wink pos-tagger (https://github.com/winkjs/wink-pos-tagger) MIT License
 - Threads (https://github.com/andywer/threads.js) by Andy Wermke(andywer) MIT License
 - Axios (https://github.com/axios/axios) MIT License
 - Threads (https://github.com/andywer/threads.js) by Andy Wermke(andywer) MIT License
 - The Tads3 tmLanguage definition (for syntax highlighting) is copied from Sam Win-Mason
   (repo here: https://github.com/Or4c/vscode-tads3), and originally ported from the Sublime Text plugin by VoidPhantom (https://github.com/VoidPhantom/sublime-tads3) (Both distributed under the UNLICENSE license 


## Disclaimer
This is a work in progress and is considered at the moment an early alpha. It has probably a ton of bugs left to fix. Use at your own risk. The aim is to provide the most robust language server out there. But this will require thorough testing.
 

## License

The vscode-tads3tools is licensed under the MIT License

@Copyright Tomas Öberg 2021
