export type MissionDiagramLegendEntry = string | {
  label: string;
  color?: string;
};

export type MissionDiagramLegend = Partial<Record<string, MissionDiagramLegendEntry>>;

export type MissionPlain = {
  missionId: string;
  missionType: string;
  seq: number;
  title: string;
  description: string;
  battlefieldId?: string | null;
  setup?: string | null;
  deployment: string;
  victory: string;
  special?: string | null;
  rewards?: MissionReward[];
  diagram?: string[][];
  diagramLegend?: MissionDiagramLegend;
};

export class Mission {
  missionId: string
  missionType: string
  seq: number
  title: string
  description: string
  battlefieldId?: string | null
  setup?: string | null
  deployment: string
  victory: string
  special?: string | null
  rewards?: MissionReward[]
  diagram?: string[][]
  diagramLegend?: MissionDiagramLegend

  constructor(data: {
    missionId: string;
    missionType: string;
    seq: number;
    title: string;
    description: string;
    battlefieldId?: string | null;
    setup?: string | null;
    deployment: string;
    victory: string;
    special?: string | null;
    rewards?: MissionReward[];
    diagram?: string[][];
    diagramLegend?: MissionDiagramLegend;
  }) {
    this.missionId = data.missionId
    this.missionType = data.missionType
    this.seq = data.seq
    this.title = data.title
    this.description = data.description
    this.battlefieldId = data.battlefieldId ?? null
    this.setup = data.setup
    this.deployment = data.deployment
    this.victory = data.victory
    this.special = data.special
    this.rewards = data.rewards
    this.diagram = data.diagram
    this.diagramLegend = data.diagramLegend
  }

  toPlain(): MissionPlain {
    return {
      missionId: this.missionId,
      missionType: this.missionType,
      seq: this.seq,
      title: this.title,
      description: this.description,
      battlefieldId: this.battlefieldId ?? null,
      setup: this.setup,
      deployment: this.deployment,
      victory: this.victory,
      special: this.special,
      rewards: this.rewards,
      diagram: this.diagram,
      diagramLegend: this.diagramLegend
    }
  }
}

export type MissionReward = {
  name?: string | null,
  effect?: string | null
};
