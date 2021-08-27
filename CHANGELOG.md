# Changelog

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