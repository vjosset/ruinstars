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

export class Mission {
  missionId: string
  missionType?: string | null
  seq?: number | null
  title: string
  active?: boolean
  description: string
  battlefieldId?: string | null
  setup?: string | null
  deployment: string
  victory: string
  special?: string | null
  rewards?: MissionReward[]
  diagram?: MissionDiagram

  constructor(data: {
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
  }) {
    this.missionId = data.missionId
    this.missionType = data.missionType
    this.seq = data.seq
    this.title = data.title
    this.active = data.active
    this.description = data.description
    this.battlefieldId = data.battlefieldId ?? null
    this.setup = data.setup
    this.deployment = data.deployment
    this.victory = data.victory
    this.special = data.special
    this.rewards = data.rewards
    this.diagram = data.diagram
  }

  toPlain(): MissionPlain {
    return {
      missionId: this.missionId,
      missionType: this.missionType,
      seq: this.seq,
      title: this.title,
      active: this.active,
      description: this.description,
      battlefieldId: this.battlefieldId ?? null,
      setup: this.setup,
      deployment: this.deployment,
      victory: this.victory,
      special: this.special,
      rewards: this.rewards,
      diagram: this.diagram
    }
  }
}

export type MissionReward = {
  name?: string | null,
  effect?: string | null
};
