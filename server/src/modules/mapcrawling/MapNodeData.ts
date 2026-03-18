/**
 * Metadata about a game-world object needed by the map editor.
 * Keyed by object name in TadsSymbolManager.mapData.
 */
export interface MapNodeData {
  level: number;
  isClass: boolean;
  parentName?: string;           // name of the containing + / ++ object (inline nesting)
  shortName?: string;            // display name from the template string expression
  arrowConnection?: string;      // -> destination (room or door arrow syntax)
  otherSide?: string;            // Door: the other-side door/room name
  at?: string;                   // @ location reference
  travelConnectorMap: Map<string, string>; // direction → destination (TravelConnector exits)
  assignedProperties: Set<string>;         // names of child properties using = (not method bodies)
  superClassRoot?: string;       // mutable: set during map-filter pass (e.g. 'Room', 'Door')
}
