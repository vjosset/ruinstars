export type BattlefieldPlain = {
  battlefieldId: string;
  title: string;
  description: string;
  setup: string;
  effects: string;
  battlefieldNames?: string[];
};

export class Battlefield {
  battlefieldId: string
  title: string
  description: string
  setup: string
  effects: string
  battlefieldNames?: string[]

  constructor(data: {
    battlefieldId: string;
    title: string;
    description: string;
    setup: string;
    effects: string;
    battlefieldNames?: string[];
  }) {
    this.battlefieldId = data.battlefieldId
    this.title = data.title
    this.description = data.description
    this.setup = data.setup
    this.effects = data.effects
    this.battlefieldNames = data.battlefieldNames ? [...data.battlefieldNames] : undefined
  }

  toPlain(): BattlefieldPlain {
    return {
      battlefieldId: this.battlefieldId,
      title: this.title,
      description: this.description,
      setup: this.setup,
      effects: this.effects,
      battlefieldNames: this.battlefieldNames ? [...this.battlefieldNames] : undefined
    }
  }
}
