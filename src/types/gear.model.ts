import { GearCategory, GearCategoryPlain } from '.'

export type GearPlain = {
  gearId: string
  gearName: string
  description: string
  flavor: string | null
  gearType: string
  gearCategoryId: string
  seq: number
  GP: number
  TYP: string | null
  ROA: number | null
  SKL?: number
  ATT: number | null
  ACT: number | null
  TO: number | null
  effects: string | null
  special: string | null
  isDefault: boolean
  gearCategory?: GearCategoryPlain
}

export class Gear {
  gearId: string
  gearName: string
  description: string
  flavor: string | null
  gearType: string
  gearCategoryId: string
  seq: number
  GP: number
  TYP: string | null
  ROA: number | null
  SKL?: number
  ATT: number | null
  ACT: number | null
  TO: number | null
  effects: string | null
  special: string | null
  isDefault: boolean
  gearCategory?: GearCategory

  constructor(data: {
    gearId: string,
    gearName: string,
    description: string,
    flavor: string | null
    gearType: string,
    gearCategoryId: string,
    seq: number,
    GP: number,
    TYP: string | null,
    ROA: number | null,
    SKL?: number,
    ATT: number | null,
    ACT: number | null,
    TO: number | null,
    effects: string | null,
    special: string | null,
    isDefault?: boolean,
    gearCategory?: GearCategory
  }) {
    this.gearId = data.gearId
    this.gearName = data.gearName
    this.description = data.description
    this.flavor = data.flavor
    this.gearType = data.gearType
    this.gearCategoryId = data.gearCategoryId
    this.seq = data.seq
    this.GP = data.GP
    this.TYP = data.TYP
    this.ROA = data.ROA
    this.SKL = data.SKL
    this.ATT = data.ATT
    this.ACT = data.ACT
    this.TO = data.TO
    this.effects = data.effects
    this.special = data.special
    this.isDefault = data.isDefault ?? false
    this.gearCategory = data.gearCategory
  }

  toPlain(): GearPlain {
    return {
      gearId: this.gearId,
      gearName: this.gearName,
      description: this.description,
      flavor: this.flavor,
      gearType: this.gearType,
      gearCategoryId: this.gearCategoryId,
      seq: this.seq,
      GP: this.GP,
      TYP: this.TYP,
      ROA: this.ROA,
      SKL: this.SKL,
      ATT: this.ATT,
      ACT: this.ACT,
      TO: this.TO,
      effects: this.effects,
      special: this.special,
      isDefault: this.isDefault,
      gearCategory: this.gearCategory?.toPlain()
    }
  }
}
