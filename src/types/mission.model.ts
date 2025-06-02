export type MissionPlain = {
  missionId: number;
  missionType: string;
  seq: number;
  title: string;
  description: string;
  setup: string;
  deployment: string;
  victory: string;
  special: string;
};

export class Mission {
  missionId: number;
  missionType: string;
  seq: number;
  title: string;
  description: string;
  setup: string;
  deployment: string;
  victory: string;
  special: string;

  constructor(data: {
    missionId: number;
    missionType: string;
    seq: number;
    title: string;
    description: string;
    setup: string;
    deployment: string;
    victory: string;
    special: string;
  }) {
    this.missionId = data.missionId;
    this.missionType = data.missionType;
    this.seq = data.seq;
    this.title = data.title;
    this.description = data.description;
    this.setup = data.setup;
    this.deployment = data.deployment;
    this.victory = data.victory;
    this.special = data.special;
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
    };
  }
}
