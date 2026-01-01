
wizardsHouse: Room 'The wizard\'s house' 'The wizard\'s house'
	east: TravelMessage {
		destination = wizardsHouse
		travelDesc = "you are going in circles" 
	}
;

+Decoration 'flowers' 'flowers';
+Decoration 'berries' 'berries';

+well: Container 'well' 'well';
class Fluid: object;
++water: Fluid 'water' 'water'; 


witchesHouse: Room 'The witche\'s house' 'The witche\'s house'
	atmossphereList: ShuffledEventList{[
		'...',
		'...'
	]}
	west: TravelMessage {
		destination = witchesHouse
		travelDesc = "you are going in circles" 
	}
;
+Door 'creeky old door' 'door';
++Component 'door handle' 'door handle';

+Decoration 'stream' 'stream';
++rocks: Heavy 'rocks' 'rocks';
++ Decoration 'stream bed' 'stream bed';
+++crabs: Actor 'crabs' 'crabs';
++lilyPad: Decoration 'lily pad' 'lily pad';
+++ Actor 'frogs' 'frogs';

+Decoration 'hedges' 'hedges';
+Decoration 'trees' 'trees';
