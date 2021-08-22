
# vscode-tads3tools

A language server/client for the Tads3 programming language and tailored made for Visual Studio Code. 

# Version 0.5 - alpha


## Features

### vscode-tads3tools has the following features:


Create new projects easily:

https://user-images.githubusercontent.com/39532593/130358170-ea5878d5-c504-4b55-94e8-10ae55a6fa84.mp4

Symbol outliner:

https://user-images.githubusercontent.com/39532593/130358201-3be0d686-465c-4316-b304-9e7370f93347.mp4

Symbol definitions:

https://user-images.githubusercontent.com/39532593/130358231-eb120e91-8521-498e-bd3b-a3cc3c7318ae.mp4


---

Use an interactive map editor for a visual experience while creating the game world:

**"Tads3 command: Open current tads3 source code \*.{t,h} in Tads3 Visual Editor"**
    
Opens the project in a special web view that displays a map of the game and also allows for some interactivity in changing the exits and adding room.

https://user-images.githubusercontent.com/39532593/130358350-a4c9c3a4-4b73-4fcd-9e76-ad39a44cee8e.mp4

---

See diagnostics on each save:

https://user-images.githubusercontent.com/39532593/130358270-b5d887e2-bcc1-430e-8806-9a42a79119c5.mp4

Completions as you type and save time:

https://user-images.githubusercontent.com/39532593/130358322-24908cf1-9b69-49b5-836c-bbeb03735894.mp4

Snippets for boilerplate code:

https://user-images.githubusercontent.com/39532593/130358339-227d99c6-6325-4de4-9e06-03cd54392430.mp4

https://user-images.githubusercontent.com/39532593/130358342-109e2ea7-619c-47b3-aa47-1f920bb19bf4.mp4


Be lazy and automatically create props for each room:

 **"Tads3 command: Analyze the text at the current position and offer code actions. "**
        
 Analyzes a room description (using NLP pos tagger technique) and identifies nouns in the text. Then displays a quickpick modal allowing you to select which one should be made a decoration for the current object. The levelling will be kept automatic, so in case the room starts with '+' the decoration objects will be set to '++'.

https://user-images.githubusercontent.com/39532593/130358397-e1c7bf6a-217f-44bb-9388-b18e6c20ed3a.mp4

---

Examine how preprocessed documents look like for better understanding during debugging:

**"Tads3 command: Toggle CodeLens for preprocessed text of the current Tads3 command: Create a new Tads3 template project"**

Toggles a codelens for any preprocessed differences in the original game source code. If clicking the codelens text it will open the preprocessed text and focus in on the divergent text. 

**"Tads3 command: Choose a preprocessed file to show in a separate window"**

Let's you choose any of the preprocessed files available in the project in a separate window next to the source code. 

**"Tads3 command: Open any project file in a separate window"**

Let's you choose any one of the project files (including library files that are included in the project) available in the project in a separate window next ot the source code. 

**"Tads3 command: Show preprocessed text for the current file"**

Opens up the preprocessed version of the file next to the source code in a separate window.


https://user-images.githubusercontent.com/39532593/130358400-d8c96975-27da-4e70-974d-b65b4ad34717.mp4

---

Extract all single or double quoted strings in the project or current file:

https://user-images.githubusercontent.com/39532593/130358391-4115016f-2e3b-4bd4-ada4-6f2f2892aae2.mp4

---

**"Tads3 command: Toggles on/off if the game should restarted as soon as the t3 image game file changes"**

If toggled to be enabled, the game will be restarted with the default interpreter in a terminal, on any saved changes in the project that will lead to a new game image file. 

---

**"Tads3 command: Clear cache for standard libraries adv3/adv3Lite."**

  This command will clear all the cache that's been built up since last parsing. This hopefully will only be useful for rare circumstances and edge cases. By default using cache for the library files will speed up parsing immensly.

---

**"Tads3 command: Download and install extension(s)"**

  Will open a quickpick dialog showing all the extensions for tads3 in the ifarchive contribution folder. It will let you multi-select which extension to download and install. At the moment, installment is only unzipping an archive to the project folder. This, because there might be non-uniformity in how extensions are installed and used. A downloaded file will also be cached in the same folder parent folder of the standard library cache. (globalStorageUri)

---

**"Tads3 command: Install a tracker game file in the project so the game will remember player position between sessions"**  

This command will install a "gametracker" tads source code file into the project and add itself to the makefile. (Both the makefile and this source code will be opened on the command run, so the effect can be seen right away.) Installing the game tracker allows for continuous game development, meaning the player position will be persisted ony any room change and whenever the game is restarted the tracker extension will move the player to the last persisted position and start the game from there. This along with the command for toggling a game restart on each t3 image file change this, will fire up the frob interpreter in a terminal on each incremental change that are saved with the latest change. 


---

 **"Tads3 command: Set which makefile (.t3m) to use for this project (in case there are several)"**

Select which makefile to use (this will be set automatically when opening the project but can be overriden with this command)




---

## Planned features

- A debugger implementation (via DAP)
- Go to references
- Call Hierarchy
- Document/Selection Formatting 





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
This is a work in progress and is considered at the moment an early alpha. It has probably a ton of bugs left to fix. Use at your own risk. The aim is to provide a robust language server available to several text editors beginning with vscode. 


## Bug reports

Please add an issue if you encounter any bugs or proposals. This is a project I hope there will be a lot of collaboration on.

## License

The vscode-tads3tools is licensed under the MIT License

@Copyright Tomas Öberg 2021
