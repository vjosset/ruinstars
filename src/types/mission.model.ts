// Named anchor positions on the battlefield — 4" from edges, center of each edge, and board center.
// Used in diagram elements as an alternative to raw inch coordinates.
export type AnchorName = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW' | 'C'

export type MissionDiagramLegendEntry = string | {
  label: string;
  color?: string;
};

export type MissionDiagramLegend = Partial<Record<string, MissionDiagramLegendEntry>>;

export type MissionDiagramElementBase = {
  id: string
  label?: string
  color?: string
  strokeColor?: string
  fillOpacity?: number
  showLabel?: boolean
  showInLegend?: boolean
  labelSizeIn?: number
}

export type MissionDiagramCircle = MissionDiagramElementBase & {
  type: 'circle'
  anchor?: AnchorName  // sets circle center; omit cxIn/cyIn when using anchor
  cxIn?: number
  cyIn?: number
  rIn: number
}

export type MissionDiagramRect = MissionDiagramElementBase & {
  type: 'rect'
  xIn: number
  yIn: number
  wIn: number
  hIn: number
  cornerRadiusIn?: number
}

export type MissionDiagramMarker = MissionDiagramElementBase & {
  type: 'marker'
  anchor?: AnchorName  // sets marker position; omit xIn/yIn when using anchor
  xIn?: number
  yIn?: number
  sizeIn?: number
}

export type MissionDiagramText = MissionDiagramElementBase & {
  type: 'text'
  xIn: number
  yIn: number
  text: string
  anchor?: 'start' | 'middle' | 'end'
}

export type MissionDiagramCallout = MissionDiagramElementBase & {
  type: 'callout'
  x1In: number
  y1In: number
  x2In: number
  y2In: number
  text?: string
  textOffsetIn?: number
  tickSizeIn?: number
  textAnchor?: 'start' | 'middle' | 'end'
}

export type MissionDiagramElement =
  | MissionDiagramCircle
  | MissionDiagramRect
  | MissionDiagramMarker
  | MissionDiagramText
  | MissionDiagramCallout

export type MissionDiagram = {
  board?: {
    widthIn?: number
    heightIn?: number
  }
  pixelsPerInch?: number
  showCenterLines?: boolean
  elements: MissionDiagramElement[]
  legend?: MissionDiagramLegend
}

export type MissionObjective = {
  type: string;        // e.g. "Control - Sustained Hold", "Destroy - Full Denial"
  description: string;
};

export type MissionPlain = {
  missionId: string;
  missionType?: string | null;
  seq?: number | null;
  title: string;
  active?: boolean;
  battlefield?: string;
  lore?: string | null;        // blockquote narrative intro (used in bespoke campaigns)
  description: string;
  battlefieldId?: string | null;
  setup?: string | null;
  deployment: string;
  victory?: string | null;     // standard missions; omit when using objectiveA/B
  objectiveA?: MissionObjective;
  objectiveB?: MissionObjective;
  special?: string | null;
  rewards?: MissionReward[];
  diagram?: MissionDiagram;
};

export type MissionReward = {
  name?: string | null,
  effect?: string | null
};

export type CampaignOperation = {
  operationId: string;
  title: string;
  lore?: string;
  enemyFaction: string;
  threatLevel: 1 | 2 | 3;
  missions: MissionPlain[];
  homebase?: string;   // narrative bridge shown after the operation's last mission
};

export type Campaign = {
  campaignId: string;
  title: string;
  subtitle?: string;   // e.g. "A bespoke Hegemony PvE campaign"
  lore?: string;       // campaign-level intro narrative
  factionId?: string;  // restricts to a specific player faction
  operations: CampaignOperation[];
  conclusion?: string; // epilogue shown after the final operation
};
