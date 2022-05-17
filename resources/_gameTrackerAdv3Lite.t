#charset "us-ascii"
#include <tads.h>
#include "advlite.h"

#define TRACKER_FILENAME 'gamestate.data'

/**
 * Used to remember the last location of the player, making it possible to
 * start from that location next time the game restarts.
 * Useful when crafting out the game world and in usage with the vscode extension for tads3
 */

trackerObject: Thing 'last location tracker'
    "The display reads: <<lastLocation.name>>"
    lastLocation = nil
    afterAction() {
        if(lastLocation != gPlayerChar.location) {
            lastLocation = gPlayerChar.location;
            storeLastLocation(lastLocation);
            //"The tracker emits <q>Storing [<<lastLocation.name>>] to gamestate.data</q>";
        }
    }
;

preLoader: InitObject
    execute() {
        trackerObject.moveInto(gPlayerChar);
        local result = readDataFileToArray();
        if(result) {
            for(local x in result) {
                forEachInstance(Room, function(r) {
                    if(r.name == x) {
                        trackerObject.lastLocation = gPlayerChar.location;
                        "[Relocating player object to the last visited room: <<x>>]\b";
                        gPlayerChar.moveInto(r);
                    }
                });

            }
        }
    }
;

function storeLastLocation(location) {
    try {
        if(location.propDefined(&name) && location.ofKind(Room) && location.name != nil) {
            storeDataToFile([location.name]);
        }
    } catch(Exception e) {
        "File exception occured when trying to store last location to <<TRACKER_FILENAME>>: <<e.exceptionMessage>> ";
    }

}

function storeDataToFile(dataArray) {
    local file = File.openDataFile(TRACKER_FILENAME, FileAccessWrite);
    foreach(local data in dataArray) {
        file.writeFile(data);
    }
    file.closeFile();
}

function readDataFileToArray() {
    local result = [];
    try {
        local file = File.openDataFile(TRACKER_FILENAME, FileAccessRead);
        if(file) {
            local x;
            while((x = file.readFile()) != nil) {
                result += x;
            }
            file.closeFile();
        }
    }
    catch(FileNotFoundException e) {
       // Noop - since no file has been created yet, this exception is expected first time around.
    } catch(FileException e) {
        "File exception occured when trying read last location from <<TRACKER_FILENAME>>: <<e.exceptionMessage>> ";
    }
    return result;
}