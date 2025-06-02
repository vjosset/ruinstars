export type SpecialPlain = {
  specialId: string;
  scope: string;
  code: string;
  specialName: string;
  description: string;
};

export class Special {
  specialId: string;
  scope: string;
  code: string;
  specialName: string;
  description: string;

  constructor(data: {
    specialId: string
    scope: string
    code: string
    specialName: string
    description: string
  }) {
    this.specialId = data.specialId;
    this.scope = data.scope;
    this.code = data.code;
    this.specialName = data.specialName;
    this.description = data.description;
  }

  toPlain(): SpecialPlain {
    return {
      specialId: this.specialId,
      scope: this.scope,
      code: this.code,
      specialName: this.specialName,
      description: this.description,
    };
  }
}
