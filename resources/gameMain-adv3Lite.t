#charset "us-ascii"
#include <tads.h>
#include "advlite.h"

gameMain: GameMainDef
	initialPlayerChar = ${6:me}
;

versionInfo: GameID
	IFID = '$UUID'
	name = '$1'
	byline = 'by $2'
	htmlByline = 'by <a href="mailto:${3:yourmail@address.com}">$2</a>'
	version = '1'
	authorEmail = '$2 $3'
	desc = '$4'
	htmlDesc = '$4'
;

${5:startRoom}: Room '$5'
	""
;

+$6: Actor
    person = 2
;