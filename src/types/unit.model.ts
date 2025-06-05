import { GearPlain, UnitTypePlain, SquadPlain, MedalPlain } from "."
import { Gear, UnitType, Squad, Medal } from "."

export type UnitPlain = {
  unitId: string
  squadId: string
  seq: number
  unitName: string
  ACT?: number | null
  MOV?: number | null
  MSK?: number | null
  RSK?: number | null
  ARM?: number | null
  HIT?: number | null
  currHIT: number
  special?: string | null
  unitTypeId: string
  isActivated: boolean
  hasCustomPortrait: boolean
  portraitUrl?: string | null
  gearIds?: string | null
  gears?: GearPlain[] | null
  weapons?: GearPlain[] | null
  skills?: GearPlain[] | null
  medalIds?: string | null
  medals?: MedalPlain[] | null
  unitType?: UnitTypePlain | null
  squad?: SquadPlain | null
  isUnitType: false
  totalGearGP: number
  totalMedalXP: number
  unitTypeName?: string
  GP?: number
};

export class Unit {
  unitId: string
  squadId: string
  seq: number
  unitName: string
  ACT?: number | null
  MOV?: number | null
  MSK?: number | null
  RSK?: number | null
  ARM?: number | null
  HIT?: number | null
  currHIT: number
  special?: string | null
  unitTypeId: string
  isActivated: boolean
  hasCustomPortrait: boolean
  portraitUrl?: string | null
  gearIds?: string | null
  gears?: Gear[] | []
  weapons?: Gear[] | null
  skills?: Gear[] | null
  medalIds?: string | null
  medals?: Medal[] | null
  unitType?: UnitType | null
  squad?: Squad | null
  isUnitType: boolean = false

  constructor(data: {
    unitId: string
    squadId: string
    seq: number
    unitName: string
    unitTypeId: string
    currHIT: number
    isActivated: boolean
    hasCustomPortrait: boolean
    portraitUrl?: string | null
    gearIds?: string | null
    gears?: Gear[] | null
    weapons?: Gear[] | null
    skills?: Gear[] | null
    medalIds?: string | null
    medals?: Medal[] | null
    unitType?: UnitType | null
    squad?: Squad | null

  }) {
    this.unitId = data.unitId;
    this.squadId = data.squadId;
    this.seq = data.seq;
    this.unitName = data.unitName;
    this.unitTypeId = data.unitTypeId;
    this.currHIT = data.currHIT;
    this.isActivated = data.isActivated;
    this.hasCustomPortrait = data.hasCustomPortrait;
    this.portraitUrl = data.portraitUrl;
    this.gearIds = data.gearIds;
    this.medalIds = data.medalIds;
    this.gears = data.gears || []
    this.weapons = data.weapons || null
    this.skills = data.skills || null
    this.medalIds = data.medalIds;
    this.medals = data.medals || null
    this.unitType = data.unitType ? (data.unitType instanceof UnitType ? data.unitType : new UnitType(data.unitType)) : null
    this.squad = data.squad ? (data.squad instanceof Squad ? data.squad : new Squad(data.squad)) : null
    this.isUnitType = false

    // Copy the fields from unitType to this instance
    if (this.unitType) {
      this.ACT = this.unitType.ACT;
      this.MOV = this.unitType.MOV;
      this.MSK = this.unitType.MSK;
      this.RSK = this.unitType.RSK;
      this.ARM = this.unitType.ARM;
      this.HIT = this.unitType.HIT;
      this.special = this.unitType.special;
    }
  }

  totalGearGP(): number {
    if (!this.gears) return 0;
    return this.gears.reduce((total, gear) => total + (gear.GP || 0), 0);
  }

  totalMedalXP(): number {
    if (!this.medals) return 0;
    return this.medals.reduce((total, medal) => total + (medal.XP || 0), 0);
  }

  toPlain(): UnitPlain {
    return {
      unitId: this.unitId,
      squadId: this.squadId,
      seq: this.seq,
      unitName: this.unitName,
      unitTypeId: this.unitTypeId,
      currHIT: this.currHIT,
      isActivated: this.isActivated,
      hasCustomPortrait: this.hasCustomPortrait,
      portraitUrl: this.portraitUrl,
      gearIds: this.gearIds,
      unitType: this.unitType?.toPlain ? this.unitType?.toPlain() : null,
      squad: this.squad?.toPlain(),
      special: this.special,
      ACT: this.ACT,
      MOV: this.MOV,
      MSK: this.MSK,
      RSK: this.RSK,
      ARM: this.ARM,
      HIT: this.HIT,
      isUnitType: false,
      gears: this.gears ? this.gears.map(gear => gear.toPlain()) : null,
      weapons: this.weapons ? this.weapons.map(gear => gear.toPlain()) : null,
      skills: this.skills ? this.skills.map(gear => gear.toPlain()) : null,
      medalIds: this.medalIds,
      medals: this.medals ? this.medals.map(medal => medal.toPlain()) : null,
      totalGearGP: this.totalGearGP(),
      totalMedalXP: this.totalMedalXP(),
      unitTypeName: this.unitType?.unitTypeName,
      GP: this.unitType?.GP,
    };
  }
}
