#charset "us-ascii"
#include <adv3.h>
#include <en_us.h> 

gameMain: GameMainDef
	initialPlayerChar = wrong_ref
;

versionInfo: GameID
	IFID = 'UUID'
	name = 'game'
	byline = 'by tester'
	htmlByline = 'by <a href="mailto:test@address.com}">tester</a>'
	version = '1'
	authorEmail = 'test@address.com'
	desc = '...'
	htmlDesc = '...'
;

startRoom: Room 'startroom' 'the start room'
	""
;

me: Actor
;

