export type MedalPlain = {
  medalId: string;
  title: string;
  description: string;
  XP: number;
};

export class Medal {
  medalId: string;
  title: string;
  description: string;
  XP: number;

  constructor(data: {
    medalId: string;
    title: string;
    description: string;
    XP: number;
  }) {
    this.medalId = data.medalId;
    this.title = data.title;
    this.description = data.description;
    this.XP = data.XP;
  }

  toPlain(): MedalPlain {
    return {
      medalId: this.medalId,
      title: this.title,
      description: this.description,
      XP: this.XP,
    };
  }
}
