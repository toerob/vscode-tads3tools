#charset "us-ascii"
#include <adv3.h>
#include <en_us.h> 

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

gameMain: GameMainDef
	initialPlayerChar = ${6:me}
;

${5:startRoom}: Room '$5' '$5'
	""
;

+$6: Actor
;