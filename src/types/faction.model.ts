import { SquadType, SquadTypePlain } from '.'

export type FactionPlain = {
  factionId: string
  seq: number
  factionName: string
  tagline: string
  description: string
  lore: string
  squadTypes: SquadTypePlain[]
}

export class Faction {
  factionId: string
  seq: number
  factionName: string
  tagline: string
  description: string
  lore: string
  squadTypes: SquadType[]

  constructor(data: {
    factionId: string
    seq: number
    factionName: string
    tagline: string
    description: string
    lore: string
    squadTypes: SquadType[]
  }) {
    this.factionId = data.factionId
    this.seq = data.seq
    this.factionName = data.factionName
    this.tagline = data.tagline
    this.description = data.description
    this.lore = data.lore
    this.squadTypes = data.squadTypes?.map(squadType => squadType instanceof SquadType ? squadType : new SquadType(squadType))
  }

  toPlain(): FactionPlain {
    return {
      factionId: this.factionId,
      seq: this.seq,
      factionName: this.factionName,
      tagline: this.tagline,
      description: this.description,
      lore: this.lore,
      squadTypes: this.squadTypes?.map((squadType) => squadType.toPlain()),
    }
  }
}
