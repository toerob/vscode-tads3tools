# Changelog

## 0.6.0-alpha
### Added
  - Signature help provider for functions/methods. Now a help dialog will appear above when writing function/method calls where documenation, total parameters per signature and current parameter are visualized.
  - Implementation provider, get easily access to all classes inheriting the specified class. To use: right click on the name of the class and select "Go to Implementations"/"Find all Implementations".
  - References provider, easy access to all references of a certain keyword, To use: right click on the keyword and select "Go to References"/"Find all References".
  - Document formatter provider, formats the current document. To use: right click in the document and select "Format document".
  - Document range formatter provider, formats a selected range within a document. To use: select lines and right click in the document and select "Format Selection".
  - File completions are now available for the tads3 makefile. File uri's are collected based on the project's structure and directories specified via -FL -FI flags in the makefile.
  - Links are added to the makefile so every (valid) tads source file uri can be opened up with a ctrl-click.
  - Added icon for the extension for the marketplace.

### Fixed
  - Snippets renamed to be easier accessable for Room, Things, Actor, ActorState  
  - Fixes/tweaks here and there. 

## 0.5.1-alpha

### Fixed
  - Removes the dialog for tads2 project, so it won't show up on other types of projects.

## 0.5.0-alpha

### Added
  - Tads2 support! Tads2 projects now has the same support for many of the features that Tads3 projects has, e.g the outliner, visual map, goto-definitions, workspace symbols, game runner etc. 
  - A setting was added to only produce workspace symbol (CTRL-T) result from project files and not library files (might increase performance on larger projects).

### Fixed
  - the property "in" is no longer called unnamed in the outliner.
  - Ctrl-clicking on a symbol name will not populate a (redundant) match from the same file and position any longer.
  - Snippets are now added differently depending on library used. Different snippets will appear depending on using Tads3 adv3/adv3Lite or Tads2.
  - snippets for interpolated expressions such as \<\<if\>\> \<\<else\>\> \<\<end\>\> or as \<\<one of \>\>\<\<or\>\>\<\<stopping\>\> has been added. As well snippets and auto pairing for \<q\>quotes\</q\> 
  - Auto pairing quotes/aphostrophes/comments won't happen inside strings anymore.

### Notes

 - The requirements for Tads2 support is having access to the "t3make" compiler, the tads2 compiler ("tadsc"   on linux/mac or tc32.exe on windows) as well as the library path.

    Modify if needed the following settings: 
    - "tads.preprocessor.path"  
        (default value: "t3make")

    - "tads2.compiler.path"  
        (default value: "tadsc" for usage with frobtads, use tc32.exe for windows)

    - "tads2.library.path"
        (default value: "/usr/local/share/frobtads/tads2/")

    When opening up a folder containing a tads2 project the extension will automatially try to find the "main" file in order to preprocess all the other files. If it can't find a single such file it will give a quickpick menu showing the candidates. If escaping/cancelling that quickpick menu you'll receive a full open file window selection next time a file in the project is saved. 
    
    When a main file is found all the files are preprocessed and parsed. 
    (This information is also added to README.md under the section "First time users - Tads2 notes")

## 0.4.0-alpha

### Added
  - A command to add files and create makefile entries has been added
  - Macro definitions are now also indexed and can be peeked upon and opened up with CTRL-click.

### Fixed
  - Fixed an issue with definitions of propertyset that weren't displayed correctly
  - Fixed issue with the errors parser so it now displays the correct source file of the error
  - Fixed issue so that all symbols are found with the workspace symbol search (CTRL-T)
  - Fixed issue that was caused by auto closing quote pairs within strings

  Many thanks to John Ziegler for the extensive bug reporting!

### Notes

 - If earlier versions has been used the library cache might need be cleared, or you will still suffer from numerical artefacts in the outliner on propertyset symbols.

   - Run the command with ctrl-shift-P: "Tads3 command: Clear cache for standard libraries adv3/adv3Lite."
   - Either: restart vscode, or run the following command with ctrl-shift-P: "Tads3 command: Set which makefile (.t3m)..." (this will trigger a complete reparse)


## 0.3.0-alpha

### Added
  - A workspace symbol provider is added. You can now use the key combination CTRL-T and use fuzzy search to locate a symbol located in any file.
  - Now the visual map, if opened, auto redraws itself on each new save that leads to a successful parse.
  - A warning dialog is shown when the user tries to compile the project without setting -Fy or -Fo in the makefile

  Thank you John Ziegler for bringing up the idea of a workspace symbol provider!

### Fixed
  - Fixed an issue that caused a dialog to select a tads3 Makefile to appear in other languages besides tads3
  - Fixed an error that was caused by cancelling the create new tads3 project dialog
  - Expand Content-Security-Policy to allow inline script (so map level buttons can used)
  - Map levels can only be changed to existing planes

# Changelog

## 0.2.0-alpha

### Added
  - Hovering on classes, objects, methods and properties now reveals documentation from library source code
  - Text Completion reveals documentation on class level
  
  Thank you for the suggestions Tomáš Bláha and Luděk Šťastný!

### Fixed
  Different OS Platform issues and tweaks:

  - Fixed a bug that filtered libraries incorrectly on windows platform.
  - Fixed a bug that didn't display outliner symbols on windows platform (caused by case insensitive file paths).
  - Fixed a log output bug that always displayed adv3Lite even though adv3 library was used
  - Fixed a link issue on windows, file paths are now universally handled in the LinkProvider
  - Fixed create new project command: linux default lib/include dirs removed if not existing (like on windows)
  - Fixed making sure t3make path is within quotes during compilation
  - Slightly better efficiency during cached library import/export
  - Add guarding so the preprocessing command cannot be spammed with too frequent saving

  Major thanks to Jost Schenck for helping out with several bugs on the windows platform!

## 0.1.0-alpha

### Added

 - Added LinkProvider (Filenames in include directives is now possible to ctrl-click)
 - Added HoverProvider (for templates, now all templates will be shown above when hovering over a class/-  object)
 - Templates gets added to the outliner

### Fixed

 - Now Searches first for the default makefile to Makefile.t3m, so Makefile-web.t3m or others aren't favored first.
 - Now Reparses the whole project on changing makefiles via command "setMakefile" and improves user feedback during parsing.
 - Improves parser for some cases that weren't covered before (Only affected the logs by cluttering them)
 - Fixes diagnostics row issue that caused compiler errors to be misplaced by one row
 - Fixes Codelens issue where an error would show upon clicking a preprocessed codelens while the map editor was visible
 - Fixes issue where preprocessed cached documents not always kept the same length as the correspondent unprocessed text
 - Now ensures that obj folder is existing during diagnosis, so there will be no (strange) error reporting on that.

### Notes

 - If earlier versions has been used the cache needs to be cleared to make use of the HoverProvider (since the standard library needs to be reparsed.) This is easiest done in two steps:

   - Run the command with ctrl-shift-P: "Tads3 command: Clear cache for standard libraries adv3/adv3Lite."
   - Restart vscode


## 0.0.6-alpha

Initial alpha release 