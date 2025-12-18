import { Gear, GearPlain, SquadType, SquadTypePlain } from '.'

export type UnitTypePlain = {
  unitTypeId: string
  squadTypeId: string
  seq: number
  unitTypeName: string
  description?: string | null
  ACT: number
  MOV: number
  MSK: number
  RSK: number
  ARM: number
  HIT: number
  special: string
  GP: number
  nameType: string
  gearIds?: string
  isUnitType: true
  gears?: GearPlain[] | null
  weapons?: GearPlain[] | null
  skills?: GearPlain[] | null
  squadType?: SquadTypePlain | null
  currHIT?: number
  isActivated?: boolean
  unitName?: string
  unitType: null
  unitId?: string | null
}

export class UnitType {
  unitTypeId: string
  squadTypeId: string
  seq: number
  unitTypeName: string
  description?: string | null
  ACT: number
  MOV: number
  MSK: number
  RSK: number
  ARM: number
  HIT: number
  special: string
  GP: number
  nameType: string
  gearIds?: string
  isUnitType: boolean = true
  gears?: Gear[] | null
  weapons?: Gear[] | null
  skills?: Gear[] | null
  squadType?: SquadType | null

  constructor(data: {
    unitTypeId: string
    squadTypeId: string
    seq: number
    unitTypeName: string
    description?: string | null
    ACT: number
    MOV: number
    MSK: number
    RSK: number
    ARM: number
    HIT: number
    special: string
    GP: number
    nameType: string
    gearIds?: string
    gears?: Gear[] | null
    weapons?: Gear[] | null
    skills?: Gear[] | null
    squadType?: SquadType | null
  }) {
    this.unitTypeId = data.unitTypeId
    this.squadTypeId = data.squadTypeId
    this.seq = data.seq
    this.unitTypeName = data.unitTypeName
    this.description = data.description
    this.ACT = data.ACT
    this.MOV = data.MOV
    this.MSK = data.MSK
    this.RSK = data.RSK
    this.ARM = data.ARM
    this.HIT = data.HIT
    this.special = data.special
    this.GP = data.GP
    this.nameType = data.nameType
    this.gearIds = data.gearIds
    this.isUnitType = true
    this.gears = data.gears ?? null
    this.weapons = data.weapons ?? null
    this.skills = data.skills ?? null
    this.squadType = data.squadType ? new SquadType(data.squadType) : null
  }

  toPlain(): UnitTypePlain {
    return {
      unitTypeId: this.unitTypeId,
      squadTypeId: this.squadTypeId,
      seq: this.seq,
      unitTypeName: this.unitTypeName,
      description: this.description,
      ACT: this.ACT,
      MOV: this.MOV,
      MSK: this.MSK,
      RSK: this.RSK,
      ARM: this.ARM,
      HIT: this.HIT,
      special: this.special,
      GP: this.GP,
      nameType: this.nameType,
      gearIds: this.gearIds,
      isUnitType: true,
      gears: this.gears ? this.gears.map(gear => gear.toPlain()) : null,
      weapons: this.weapons ? this.weapons.map(gear => gear.toPlain()) : null,
      skills: this.skills ? this.skills.map(gear => gear.toPlain()) : null,
      squadType: this.squadType ? this.squadType.toPlain() : null,
      // Helper fields to map to Unit
      isActivated: false,
      currHIT: this.HIT,
      unitName: this.unitTypeName,
      unitType: null,
      unitId: null
    }
  }
}
