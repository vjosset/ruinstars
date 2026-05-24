import { Gear, GearPlain } from '.'

export type GearCategoryPlain = {
  gearCategoryId: string
  gearCategoryName: string
  description: string | null
  seq: number
  isNarrative: boolean
  gears: GearPlain[]
};

export class GearCategory {
  gearCategoryId: string
  gearCategoryName: string
  description: string | null
  seq: number
  isNarrative: boolean
  gears: Gear[]

  constructor(data: {gearCategoryId: string, gearCategoryName: string, description: string | null, seq: number, isNarrative: boolean, gears: Gear[]}) {
    this.gearCategoryId = data.gearCategoryId
    this.gearCategoryName = data.gearCategoryName
    this.description = data.description
    this.seq = data.seq
    this.isNarrative = data.isNarrative
    this.gears = data.gears
  }

  toPlain(): GearCategoryPlain {
    return {
      gearCategoryId: this.gearCategoryId,
      gearCategoryName: this.gearCategoryName,
      description: this.description,
      seq: this.seq,
      isNarrative: this.isNarrative,
      gears: this.gears?.map((gear) => gear.toPlain())
    }
  }
}