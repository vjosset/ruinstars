import { Faction, FactionPlain, Unit, UnitPlain, User, UserPlain } from '.'

export type SquadPlain = {
  squadId: string
  userId: string
  factionId: string
  seq: number
  squadName: string
  description?: string
  hasCustomPortrait: boolean
  portraitUrl?: string
  viewCount: number
  importCount: number
  createdAt: Date
  updatedAt: Date
  turn: number
  MP: number
  TO: number
  maxGP: number
  eloRating?: number
  units?: UnitPlain[]
  user?: UserPlain
  faction?: FactionPlain
}

export class Squad {
  squadId: string
  userId: string
  factionId: string
  seq: number
  squadName: string
  description?: string
  hasCustomPortrait: boolean
  portraitUrl?: string
  viewCount: number
  importCount: number
  createdAt: Date
  updatedAt: Date
  turn: number
  MP: number
  TO: number
  maxGP: number
  eloRating?: number
  units?: Unit[] | null
  user?: User | null
  faction?: Faction | null

  constructor(data: {
    squadId: string
    userId: string
    factionId: string
    seq: number
    squadName: string
    description?: string
    hasCustomPortrait: boolean
    portraitUrl?: string
    viewCount: number
    importCount: number
    createdAt: Date
    updatedAt: Date
    turn: number
    MP: number
    TO: number
    maxGP: number
    eloRating?: number
    units?: Unit[] | null
    user?: User | null
    faction?: Faction | null
  }) {
    this.squadId = data.squadId
    this.userId = data.userId
    this.factionId = data.factionId
    this.seq = data.seq
    this.squadName = data.squadName
    this.description = data.description
    this.hasCustomPortrait = data.hasCustomPortrait
    this.portraitUrl = data.portraitUrl
    this.viewCount = data.viewCount
    this.importCount = data.importCount
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.turn = data.turn
    this.MP = data.MP
    this.TO = data.TO
    this.maxGP = data.maxGP
    this.eloRating = data.eloRating
    this.units = data.units?.map(unit => unit instanceof Unit ? unit : new Unit(unit))
    this.user = data.user ? (data.user instanceof User ? data.user : new User(data.user)) : null
    this.faction = data.faction ? (data.faction instanceof Faction ? data.faction : new Faction(data.faction)) : null
  }

  toPlain(): SquadPlain {
    return {
      squadId: this.squadId,
      userId: this.userId,
      factionId: this.factionId,
      seq: this.seq,
      squadName: this.squadName,
      description: this.description,
      hasCustomPortrait: this.hasCustomPortrait,
      portraitUrl: this.portraitUrl,
      viewCount: this.viewCount,
      importCount: this.importCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      turn: this.turn,
      MP: this.MP,
      TO: this.TO,
      maxGP: this.maxGP,
      eloRating: this.eloRating,
      units: this.units?.map(unit => unit.toPlain()),
      user: this.user?.toPlain(),
      faction: this.faction?.toPlain(),
    }
  }
}
