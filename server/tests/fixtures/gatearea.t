#charset "us-ascii"

#include <tads.h>
#include "advlite.h"


gateArea: Room 'Gate Area' 'gate area'
    "The ways to Gates 1, 2 and 3 are signposted to the northwest, north and
    northeast respectively, while a display board mounted high up on the wall
    indicates what flights are boarding and departing where and when.
    Immediately to the east is a metal door, while the main concourse lies
    south. "
    
    south = concourse
    northwest = gate1
    north = gate2
    northeast = gate3
    east = maintenanceRoomDoor
;


+ maintenanceRoomDoor: Door 'metal door'
    "It's marked <q>Personal de Mantenimiento S&oacute;lo</q>, and <<if isOpen>>
    is currently open<<else>> looks firmly closed<<end>>. "
    
    otherSide = mrDoorOut
    lockability = lockableWithKey
    isLocked = true
    
    lockedMsg = (inherited + '<.reveal maintenance-door-locked>')
;

+ Distant 'display board'
    "The display imparts the following information:\b
    TI 179 to Buenos Aires <FONT COLOR=GREEN>BOARDING GATE 3</FONT>\n
    RO 359 to Mexico City <FONT COLOR=RED>DELAYED</FONT>\n
    PZ 87 to Houston <FONT COLOR=RED>DELAYED</FONT>\n
    BU 4567 to Bogota <FONT COLOR=RED>DELAYED</FONT>"
 
    decorationActions = [Examine, GoTo, Read]
    readDesc = desc
;


maintenanceRoom: Room 'Maintenance Room' 'maintenance room'
    "<<one of>>On entering the room you immediately notice<<or>>This is a small
    square room with<<stopping>> a pair of steel cabinets mounted against one
    wall, one much taller than the other. The only way out is through a door to
    the west. "
    west = mrDoorOut
    out asExit(west)
;

+ mrDoorOut: Door 'metal door; plain'
    "It's just a plain metal door, currently <<if isOpen>> open<<else>>
    closed<<end>>. "
    
    otherSide = maintenanceRoomDoor    
    lockability = lockableWithKey
    isLocked = true
;

+ tallCabinet: OpenableContainer, Fixture 'tall metal cabinet; green'
    "It's a good two metres high and painted an institutional green. "
    
    bulkCapacity = 20
;

+ shortCabinet: Fixture 'short metal cabinet; light grey gray'
    "It's about a metre high and painted light grey. "
    
    remapIn: SubComponent 
    {
        isOpenable = true
        lockability = lockableWithKey
        isLocked = true
        bulkCapacity = 5        
    }
    
    remapOn: SubComponent { bulkCapacity = 10 }
    
;

++ powerSwitch: Fixture, Switch 'big red switch{-zz}'
    "It's marked <q>Metal Detector</q> and is currently in the <<if isOn>>ON
    <<else>> OFF<<end>> position. "
    
    isOn = true
    subLocation = &remapIn
    
    makeOn(stat)
    {
        inherited(stat);
        if(stat == nil)
            powerAchievement.awardPointsOnce();
    }
;

++ Decoration 'switches; other of[prep]; bank rows row; them'
    "There's four rows of switches in a variety of colours, but your attention
    is quickly drawn to the big red one marked <q>Metal Detector</q>. "

    notImportantMsg = 'Only the big red switch is off any interest with you; you
        don\'t want to risk drawing attention to yourself by messing with any of
        the others. '
    subLocation = &remapIn
    specialDesc = "A bank of switches is mounted at the rear of the 
        cabinet. "
;

    
++ potPlant: Thing 'pot plant; small; cactus'
    "It looks like a small cactus. "
    
    maxBulkHiddenUnder = 1
    hiddenUnder = [silverKey]
    canPutUnderMe = (locType == On || location.ofKind(Room))
    
    subLocation = &remapOn
    
    cannotPutUnderMsg = '{I} {can\'t} put anything under the pot plant unless
        it\'s resting on something. '
;

silverKey: Key 'small silver key'
    
    bulk = 1
    actualLockList = [shortCabinet]
    plausibleLockList = [shortCabinet]
;


gate1: Room 'Gate 1' 'gate[n] 1[adj]; one'
    "Disconsolate passengers lounge around on seats waiting for a flight that
    seems never to arrive. The gate to the west is closed, so the only way out
    from here is back to the southeast. " 
    
    southeast = gateArea    
;

+ Decoration 'disconsolate passengers;;;them'    
;
 
+ Decoration 'seats;;;them'
;    

gate2: Room 'Gate 2' 'gate[n] 2[adj]; two'
    "This area is totally deserted, as if no one even expects a flight will ever
    board here. The gate to the north looks firmly locked, so the only
    practicable way out would seem to be back to the south. "
    
    south = gateArea
;

gate3: Room 'Gate 3' 'gate[n] 3[adj]; three'
    "The area is practically deserted, apart from the odd belated passenger
    dashing off through the open gate to the east. "
    
    southwest = gateArea
    east = openGate
;

+ Decoration 'seats; empty deserted unoccupied; seating; them'
    "All the seats at this departure gate are unoccupied, suggesting that any
    passengers for the current flight have already boarded the plane. "
    
;

+ openGate: Passage 'open gate; unattended wide'
    "The gate is wide open, and for some reason totally unattended. That
    hardly seems like a high level of security.  "
    cannotOpenMsg = 'It\'s already open. '
    cannotCloseMsg = 'That hardly seems appropriate. '
    
    destination = jetway
;

jetway: Room 'Jetway' 'jetway;short enclosed; walkway'
    "This is little more than a short enclosed walkway leading west-east from
    the gate to the plane. <<if takeover.isHappening>> Right now it's thronging
    with a stream of disgruntled passengers who have just been forced to
    disembark from their flight. <<else unless takeover.hasHappened>>You seem to
    be the only person here, as if everyone else has already boarded.<<end>> "
    
    west = gate3
    east: TravelConnector
    {
        destination = planeFront
        
        canTravelerPass(traveler) { return !takeover.isHappening; }
        explainTravelBarrier(traveler)
        {
            "You dare not go back aboard the plane until you've found a rather
            more effective disguise than a handful of cleaning items. ";
        }
    }
    
    travelerEntering(traveler, dest) 
    {
        if(traveler == gPlayerChar && takeover.isHappening)
            escapeAchievement.awardPointsOnce();
    }    
;

announcementObj: ShuffledEventList
    eventList =
    [
        '<<prefix>><q>Last call for passengers on Flight TI 179 to Buenos Aires;
        this flight is now boarding at Gate 3.</q> ',
        
        '<<prefix>><q>Ultima llamada a pasajeros en Vuelo TI 179 a Buenos Aires;
        este vuelo se aloja ahora en la Puerta 3.</q> ',
        
        '<<prefix>><q>La derni&egrave;re demande des passagers sur le Vol TI 179
        &agrave; Buenos Aires; ce vol est maintenant boarding &agrave; la Porte
        3.</q> ',
        
        '<<prefix>><q>Chamada &uacute;ltima a passageiros em TI de V&ocirc;o
        179 a Buenos Aires; este v&ocirc;o est&acute; embarcando agora na Porta
        3.</q> ',
        
        '<<prefix>><q>Will passenger Quixote please report to the airport
        information desk.</q> ',
        
        '<<prefix>><q>This is a security announcement. Any unattended baggage
        will be removed and auctioned for the airport security personnel
        benevolent fund.</q> '
        
    ]
    
    eventPercent = 67
    eventReduceTo = 33
    eventReduceAfter = static eventList.length
   
    
    start()
    {
        if(daemonID == nil)
            daemonID = new Daemon(self, &announce, 1);       
    }
    
    stopDaemon()
    {
        if(daemonID != nil)
        {
            daemonID.removeEvent();
            daemonID = nil;
        }
    }
    
    daemonID = nil
    
    announce()
    {
        if(!gPlayerChar.isIn(planeRegion))
           doScript();
    }
    
    prefix = 'An announcement comes over the public address system: '
;
