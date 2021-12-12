# Changelog

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