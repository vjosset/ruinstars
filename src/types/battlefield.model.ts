export type BattlefieldPlain = {
  battlefieldId: number;
  title: string;
  description: string;
  setup: string;
  effects: string;
};

export class Battlefield {
  battlefieldId: number;
  title: string;
  description: string;
  setup: string;
  effects: string;

  constructor(data: {
    battlefieldId: number;
    title: string;
    description: string;
    setup: string;
    effects: string;
  }) {
    this.battlefieldId = data.battlefieldId;
    this.title = data.title;
    this.description = data.description;
    this.setup = data.setup;
    this.effects = data.effects;
  }

  toPlain(): BattlefieldPlain {
    return {
      battlefieldId: this.battlefieldId,
      title: this.title,
      description: this.description,
      setup: this.setup,
      effects: this.effects,
    };
  }
}
