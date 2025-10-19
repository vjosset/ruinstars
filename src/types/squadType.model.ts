import { Faction, FactionPlain, UnitType, UnitTypePlain } from '.'

export type SquadTypePlain = {
  squadTypeId: string
  factionId: string
  seq: number
  squadTypeName: string
  description: string
  lore: string
  isPublished: boolean
  faction: FactionPlain
  unitTypes: UnitTypePlain[]
}

export class SquadType {
  squadTypeId: string
  factionId: string
  seq: number
  squadTypeName: string
  description: string
  lore: string
  isPublished: boolean
  faction: Faction
  unitTypes: UnitType[]

  constructor(data: {
    squadTypeId: string
    factionId: string
    seq: number
    squadTypeName: string
    description: string
    lore: string
    isPublished: boolean
    faction: Faction
    unitTypes: UnitType[]
  }) {
    this.squadTypeId = data.squadTypeId
    this.factionId = data.factionId
    this.seq = data.seq
    this.squadTypeName = data.squadTypeName
    this.description = data.description
    this.lore = data.lore
    this.isPublished = data.isPublished
    this.faction = data.faction instanceof Faction? data.faction : new Faction(data.faction)
    this.unitTypes = data.unitTypes?.map(unitType => unitType instanceof UnitType ? unitType : new UnitType(unitType))
  }

  toPlain(): SquadTypePlain {
    return {
      squadTypeId: this.squadTypeId,
      factionId: this.factionId,
      seq: this.seq,
      squadTypeName: this.squadTypeName,
      description: this.description,
      lore: this.lore,
      isPublished: this.isPublished,
      faction: this.faction.toPlain(),
      unitTypes: this.unitTypes?.map((unitType) => unitType.toPlain()),
    }
  }
}
