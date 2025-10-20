import { Faction, FactionPlain, Squad, SquadPlain, UnitType, UnitTypePlain } from '.'

export type SquadTypePlain = {
  squadTypeId: string
  factionId: string
  seq: number
  squadTypeName: string
  description: string
  lore: string
  isPublished: boolean
  defaultSquadId?: string | null
  faction: FactionPlain
  unitTypes: UnitTypePlain[]
  defaultSquad?: SquadPlain | null
}

export class SquadType {
  squadTypeId: string
  factionId: string
  seq: number
  squadTypeName: string
  description: string
  lore: string
  isPublished: boolean
  defaultSquadId?: string | null
  faction: Faction
  unitTypes: UnitType[]
  defaultSquad?: Squad | null

  constructor(data: {
    squadTypeId: string
    factionId: string
    seq: number
    squadTypeName: string
    description: string
    lore: string
    isPublished: boolean
    defaultSquadId?: string | null
    faction: Faction
    unitTypes: UnitType[]
    defaultSquad?: Squad | null
  }) {
    this.squadTypeId = data.squadTypeId
    this.factionId = data.factionId
    this.seq = data.seq
    this.squadTypeName = data.squadTypeName
    this.description = data.description
    this.lore = data.lore
    this.isPublished = data.isPublished
    this.defaultSquadId = data.defaultSquadId
    this.faction = data.faction instanceof Faction? data.faction : new Faction(data.faction)
    this.unitTypes = data.unitTypes?.map(unitType => unitType instanceof UnitType ? unitType : new UnitType(unitType))
    this.defaultSquad = data.defaultSquad ? (data.defaultSquad instanceof Squad? data.defaultSquad : new Squad(data.defaultSquad)) : null
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
      defaultSquadId: this.defaultSquadId,
      faction: this.faction.toPlain(),
      unitTypes: this.unitTypes?.map((unitType) => unitType.toPlain()),
      defaultSquad: this.defaultSquad?.toPlain() ?? null,
    }
  }
}
