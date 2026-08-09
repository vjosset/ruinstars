import { SquadType, SquadTypePlain, Unit, UnitPlain, User, UserPlain } from '.'

/** Who a squad is, in one flat object: its name, its owner, and its archetype. */
export type SquadIdentity = {
  squadId: string
  userId: string
  squadName: string
  userName: string
  squadTypeId: string
  squadTypeName: string
}

export type SquadPlain = {
  squadId: string
  userId: string
  squadTypeId: string
  seq: number
  squadName: string
  description: string | null
  notes: string | null
  spawnTable: string | null
  isSpotlight: boolean
  hasCustomPortrait: boolean
  portraitUpdatedAt?: Date
  viewCount: number
  importCount: number
  createdAt: Date
  updatedAt: Date
  turn: number
  MP: number
  TO: number
  maxGP: number
  eloRating?: number
  campaign: string | null
  units?: UnitPlain[]
  user?: UserPlain
  squadType?: SquadTypePlain
  unitCount?: number
  totalUnitGP?: number
}

export class Squad {
  squadId: string
  userId: string
  squadTypeId: string
  seq: number
  squadName: string
  description: string | null
  notes: string | null
  spawnTable: string | null
  isSpotlight: boolean
  hasCustomPortrait: boolean
  portraitUpdatedAt?: Date
  viewCount: number
  importCount: number
  createdAt: Date
  updatedAt: Date
  turn: number
  MP: number
  TO: number
  maxGP: number
  eloRating?: number
  campaign: string | null
  units?: Unit[] | null
  user?: User | null
  squadType?: SquadType | null

  constructor(data: {
    squadId: string
    userId: string
    squadTypeId: string
    seq: number
    squadName: string
    description: string | null
    notes: string | null
    spawnTable: string | null
    isSpotlight: boolean
    hasCustomPortrait: boolean
    portraitUpdatedAt?: Date
    viewCount: number
    importCount: number
    createdAt: Date
    updatedAt: Date
    turn: number
    MP: number
    TO: number
    maxGP: number
    eloRating?: number
    campaign: string | null
    units?: Unit[] | null
    user?: User | null
    squadType?: SquadType | null
  }) {
    this.squadId = data.squadId
    this.userId = data.userId
    this.squadTypeId = data.squadTypeId
    this.seq = data.seq
    this.squadName = data.squadName
    this.description = data.description
    this.notes = data.notes
    this.spawnTable = data.spawnTable
    this.isSpotlight = data.isSpotlight
    this.hasCustomPortrait = data.hasCustomPortrait
    this.portraitUpdatedAt = data.portraitUpdatedAt
    this.viewCount = data.viewCount
    this.importCount = data.importCount
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
    this.turn = data.turn
    this.MP = data.MP
    this.TO = data.TO
    this.maxGP = data.maxGP
    this.eloRating = data.eloRating
    this.campaign = data.campaign
    this.units = data.units?.map(unit => unit instanceof Unit ? unit : new Unit(unit))
    this.user = data.user ? (data.user instanceof User ? data.user : new User(data.user)) : null
    this.squadType = data.squadType ? (data.squadType instanceof SquadType ? data.squadType : new SquadType(data.squadType)) : null
  }

  get unitCount(): number {
    return this.units?.length ?? 0
  }

  get totalUnitGP(): number {
    if (!this.units?.length) return 0

    return this.units.reduce((total, unit) => {
      const baseGP = unit.unitType?.GP ?? 0
      const gearGP = typeof unit.totalGearGP === 'function' ? unit.totalGearGP() : 0
      return total + baseGP + gearGP
    }, 0)
  }

  toPlain(): SquadPlain {
    return {
      squadId: this.squadId,
      userId: this.userId,
      squadTypeId: this.squadTypeId,
      seq: this.seq,
      squadName: this.squadName,
      description: this.description,
      notes: this.notes,
      spawnTable: this.spawnTable,
      isSpotlight: this.isSpotlight,
      hasCustomPortrait: this.hasCustomPortrait,
      portraitUpdatedAt: this.portraitUpdatedAt,
      viewCount: this.viewCount,
      importCount: this.importCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      turn: this.turn,
      MP: this.MP,
      TO: this.TO,
      maxGP: this.maxGP,
      eloRating: this.eloRating,
      campaign: this.campaign,
      units: this.units?.map(unit => unit.toPlain()),
      user: this.user?.toPlain(),
      squadType: this.squadType?.toPlain(),
      unitCount: this.unitCount,
      totalUnitGP: this.totalUnitGP,
    }
  }
}
