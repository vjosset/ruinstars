import { UnitType, UnitTypePlain } from '.'

export type FactionPlain = {
  factionId: string
  seq: number
  factionName: string
  description: string
  lore: string
  unitTypes: UnitTypePlain[]
}

export class Faction {
  factionId: string
  seq: number
  factionName: string
  description: string
  lore: string
  unitTypes: UnitType[]

  constructor(data: {
    factionId: string
    seq: number
    factionName: string
    description: string
    lore: string
    unitTypes: UnitType[]
  }) {
    this.factionId = data.factionId
    this.seq = data.seq
    this.factionName = data.factionName
    this.description = data.description
    this.lore = data.lore
    this.unitTypes = data.unitTypes?.map(unitType => unitType instanceof UnitType ? unitType : new UnitType(unitType))
  }

  toPlain(): FactionPlain {
    return {
      factionId: this.factionId,
      seq: this.seq,
      factionName: this.factionName,
      description: this.description,
      lore: this.lore,
      unitTypes: this.unitTypes?.map((unitType) => unitType.toPlain()),
    }
  }
}
