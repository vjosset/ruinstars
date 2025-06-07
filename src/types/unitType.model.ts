import { Faction, FactionPlain, Gear, GearPlain } from '.'

export type UnitTypePlain = {
  unitTypeId: string
  factionId: string
  seq: number
  unitTypeName: string
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
  faction?: FactionPlain | null
  currHIT?: number
  isActivated?: boolean
  unitName?: string
  unitType: null
  unitId?: string | null
}

export class UnitType {
  unitTypeId: string
  factionId: string
  seq: number
  unitTypeName: string
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
  faction?: Faction | null

  constructor(data: {
    unitTypeId: string
    factionId: string
    seq: number
    unitTypeName: string
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
    faction?: Faction | null
  }) {
    this.unitTypeId = data.unitTypeId
    this.factionId = data.factionId
    this.seq = data.seq
    this.unitTypeName = data.unitTypeName
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
    this.faction = data.faction ? new Faction(data.faction) : null
  }

  toPlain(): UnitTypePlain {
    return {
      unitTypeId: this.unitTypeId,
      factionId: this.factionId,
      seq: this.seq,
      unitTypeName: this.unitTypeName,
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
      faction: this.faction ? this.faction.toPlain() : null,
      // Helper fields to map to Unit
      isActivated: false,
      currHIT: this.HIT,
      unitName: this.unitTypeName,
      unitType: null,
      unitId: null
    }
  }
}
