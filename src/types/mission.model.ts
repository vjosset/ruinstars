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
  cxIn: number
  cyIn: number
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
  xIn: number
  yIn: number
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

export type MissionPlain = {
  missionId: string;
  missionType?: string | null;
  seq?: number | null;
  title: string;
  active?: boolean;
  description: string;
  battlefieldId?: string | null;
  setup?: string | null;
  deployment: string;
  victory: string;
  special?: string | null;
  rewards?: MissionReward[];
  diagram?: MissionDiagram;
};

export type MissionReward = {
  name?: string | null,
  effect?: string | null
};
