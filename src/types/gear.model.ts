import { GearCategory, GearCategoryPlain } from "."

export type GearPlain = {
  gearId: string
  gearName: string
  description: string
  gearType: string
  gearCategoryId: string
  seq: number
  GP: number
  TYP?: string
  ROA?: number
  ATT?: number
  ACT?: number
  TO?: number
  effects?: string
  special?: string
  isDefault: boolean
  gearCategory?: GearCategoryPlain
}

export class Gear {
  gearId: string
  gearName: string
  description: string
  gearType: string
  gearCategoryId: string
  seq: number
  GP: number
  TYP?: string
  ROA?: number
  ATT?: number
  ACT?: number
  TO?: number
  effects?: string
  special?: string
  isDefault: boolean
  gearCategory?: GearCategory

  constructor(data: {
    gearId: string,
    gearName: string,
    description: string,
    gearType: string,
    gearCategoryId: string,
    seq: number,
    GP: number,
    TYP?: string,
    ROA?: number,
    ATT?: number,
    ACT?: number,
    TO?: number,
    effects?: string,
    special?: string,
    isDefault?: boolean,
    gearCategory?: GearCategory
  }) {
    this.gearId = data.gearId
    this.gearName = data.gearName
    this.description = data.description
    this.gearType = data.gearType
    this.gearCategoryId = data.gearCategoryId
    this.seq = data.seq
    this.GP = data.GP
    this.TYP = data.TYP
    this.ROA = data.ROA
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
      gearType: this.gearType,
      gearCategoryId: this.gearCategoryId,
      seq: this.seq,
      GP: this.GP,
      TYP: this.TYP,
      ROA: this.ROA,
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
