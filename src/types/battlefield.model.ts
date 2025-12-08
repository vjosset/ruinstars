export type BattlefieldPlain = {
  battlefieldId: string;
  title: string;
  description: string;
  setup: string;
  effects: string;
  battlefieldNames?: string[];
  pdfA4?: string | null;
  pdfLetter?: string | null;
};

export class Battlefield {
  battlefieldId: string
  title: string
  description: string
  setup: string
  effects: string
  battlefieldNames?: string[]
  pdfA4?: string | null
  pdfLetter?: string | null

  constructor(data: {
    battlefieldId: string;
    title: string;
    description: string;
    setup: string;
    effects: string;
    battlefieldNames?: string[];
    pdfA4?: string | null;
    pdfLetter?: string | null
  }) {
    this.battlefieldId = data.battlefieldId
    this.title = data.title
    this.description = data.description
    this.setup = data.setup
    this.effects = data.effects
    this.battlefieldNames = data.battlefieldNames ? [...data.battlefieldNames] : undefined
    this.pdfA4 = data.pdfA4 ?? null
    this.pdfLetter = data.pdfLetter ?? null
  }

  toPlain(): BattlefieldPlain {
    return {
      battlefieldId: this.battlefieldId,
      title: this.title,
      description: this.description,
      setup: this.setup,
      effects: this.effects,
      battlefieldNames: this.battlefieldNames ? [...this.battlefieldNames] : undefined,
      pdfA4: this.pdfA4 ?? null,
      pdfLetter: this.pdfLetter ?? null
    }
  }
}
