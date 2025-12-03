export type MissionPlain = {
  missionId: string;
  missionType: string;
  seq: number;
  title: string;
  description: string;
  setup?: string | null;
  deployment: string;
  victory: string;
  special?: string | null;
  rewards?: MissionReward[];
};

export class Mission {
  missionId: string
  missionType: string
  seq: number
  title: string
  description: string
  setup?: string | null
  deployment: string
  victory: string
  special?: string | null
  rewards?: MissionReward[]

  constructor(data: {
    missionId: string;
    missionType: string;
    seq: number;
    title: string;
    description: string;
    setup?: string | null;
    deployment: string;
    victory: string;
    special?: string | null;
    rewards?: MissionReward[];
  }) {
    this.missionId = data.missionId
    this.missionType = data.missionType
    this.seq = data.seq
    this.title = data.title
    this.description = data.description
    this.setup = data.setup
    this.deployment = data.deployment
    this.victory = data.victory
    this.special = data.special
    this.rewards = data.rewards
  }

  toPlain(): MissionPlain {
    return {
      missionId: this.missionId,
      missionType: this.missionType,
      seq: this.seq,
      title: this.title,
      description: this.description,
      setup: this.setup,
      deployment: this.deployment,
      victory: this.victory,
      special: this.special,
      rewards: this.rewards
    }
  }
}

export type MissionReward = {
  name?: string | null,
  effect?: string | null
};
