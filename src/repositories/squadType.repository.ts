import type { Prisma } from '@prisma/client'
import { Faction, Squad, SquadType, Unit, UnitType, User } from '@/types'
import { BaseRepository } from './base.repository'

type SquadTypeCtorInput = ConstructorParameters<typeof SquadType>[0]
type UnitTypeCtorInput = ConstructorParameters<typeof UnitType>[0]
type UnitCtorInput = ConstructorParameters<typeof Unit>[0]
type SquadCtorInput = ConstructorParameters<typeof Squad>[0]
type UserCtorInput = ConstructorParameters<typeof User>[0]

type PrismaSquadTypeRow = Prisma.SquadTypeGetPayload<{
  include: {
    faction: true
    unitTypes: true
    defaultSquad: true
  }
}>

type PrismaSquadTypeWithRelations = Prisma.SquadTypeGetPayload<{
  include: {
    unitTypes: {
      orderBy: [{ seq: 'asc' }, { unitTypeName: 'asc' }]
    }
    defaultSquad: true
    faction: {
      include: {
        squadTypes: {
          where: { isPublished: true }
          orderBy: { seq: 'asc' }
          include: { faction: true }
        }
      }
    }
    squads: {
      where: { isSpotlight: true }
      include: {
        user: true
        units: {
          include: { unitType: true }
          orderBy: { seq: 'asc' }
        }
      }
      orderBy: [{ seq: 'asc' }, { squadName: 'asc' }]
    }
  }
}>

export class SquadTypeRepository extends BaseRepository {
  async getSquadTypeRow(squadTypeId: string): Promise<SquadType | null> {
    const row = await this.prisma.squadType.findUnique({
      where: { squadTypeId },
      include: {
        faction: true,
        unitTypes: true,
        defaultSquad: true
      }
    })

    return row ? new SquadType(this.toSquadTypeCtorInput(row, [])) : null
  }

  async getSquadType(squadTypeId: string): Promise<SquadType | null> {
    const row = await this.prisma.squadType.findUnique({
      where: { squadTypeId },
      include: {
        unitTypes: {
          orderBy: [
            {seq: 'asc'},
            {unitTypeName: 'asc'}
          ]
        },
        defaultSquad: true,
        faction: {
          include: {
            squadTypes: {
              where: { isPublished: true },
              orderBy: { seq: 'asc' },
              include: {
                faction: true
              }
            }
          }
        },
        squads: {
          where: { isSpotlight: true },
          include: {
            user: true,
            units: {
              include: { unitType: true },
              orderBy: { seq: 'asc' }
            }
          },
          orderBy: [
            { seq: 'asc' },
            { squadName: 'asc' }
          ]
        }
      }
    })

    if (!row) return null
    return new SquadType(this.toSquadTypeCtorInput(row, row.squads ?? []))
  }

  async getAllSquadTypes(): Promise<SquadType[]> {
    const rows = await this.prisma.squadType.findMany({
      include: {
        unitTypes: {
          orderBy: [
            {seq: 'asc'},
            {unitTypeName: 'asc'}
          ]
        },
        defaultSquad: true,
        faction: true
      },
      where: {
        isPublished: true
      },
      orderBy: { seq: 'asc' },
    })

    return rows.map(row => new SquadType(this.toSquadTypeCtorInput(row, [])))
  }

  private toUnitType(row: {
    unitTypeId: string
    squadTypeId: string
    seq: number
    unitTypeName: string
    description: string | null
    ACT: number
    MOV: number
    MSK: number
    RSK: number
    ARM: number
    HIT: number
    special: string
    GP: number
    nameType: string
    gearIds: string | null
  }): UnitType {
    const input: UnitTypeCtorInput = {
      unitTypeId: row.unitTypeId,
      squadTypeId: row.squadTypeId,
      seq: row.seq,
      unitTypeName: row.unitTypeName,
      description: row.description ?? null,
      ACT: row.ACT,
      MOV: row.MOV,
      MSK: row.MSK,
      RSK: row.RSK,
      ARM: row.ARM,
      HIT: row.HIT,
      special: row.special,
      GP: row.GP,
      nameType: row.nameType,
      gearIds: row.gearIds ?? undefined,
      gears: null,
      weapons: null,
      skills: null,
      squadType: null
    }

    return new UnitType(input)
  }

  private toUser(row: {
    userId: string
    email: string | null
    userName: string
  }): User {
    const input: UserCtorInput = {
      userId: row.userId,
      email: row.email,
      userName: row.userName,
      squads: []
    }
    return new User(input)
  }

  private toUnit(row: {
    unitId: string
    squadId: string
    seq: number
    unitName: string
    unitTypeId: string
    currHIT: number
    isActivated: boolean
    hasCustomPortrait: boolean
    portraitUpdatedAt: Date
    gearIds: string | null
    medalIds: string | null
    unitType?: {
      unitTypeId: string
      squadTypeId: string
      seq: number
      unitTypeName: string
      description: string | null
      ACT: number
      MOV: number
      MSK: number
      RSK: number
      ARM: number
      HIT: number
      special: string
      GP: number
      nameType: string
      gearIds: string | null
    }
  }): Unit {
    const input: UnitCtorInput = {
      unitId: row.unitId,
      squadId: row.squadId,
      seq: row.seq,
      unitName: row.unitName,
      unitTypeId: row.unitTypeId,
      currHIT: row.currHIT,
      isActivated: row.isActivated,
      hasCustomPortrait: row.hasCustomPortrait,
      portraitUpdatedAt: row.portraitUpdatedAt ?? undefined,
      gearIds: row.gearIds ?? null,
      medalIds: row.medalIds ?? null,
      gears: null,
      weapons: null,
      skills: null,
      medals: null,
      unitType: row.unitType ? this.toUnitType(row.unitType) : null,
      squad: null
    }
    return new Unit(input)
  }

  private toSquad(row: {
    squadId: string
    userId: string
    squadTypeId: string
    seq: number
    squadName: string
    description: string | null
    spawnTable: string | null
    isSpotlight: boolean
    hasCustomPortrait: boolean
    portraitUpdatedAt: Date
    viewCount: number
    importCount: number
    createdAt: Date
    updatedAt: Date
    turn: number
    MP: number
    TO: number
    maxGP: number
    eloRating: number
    campaign: string | null
    user?: { userId: string; email: string | null; userName: string }
    units?: Array<{
      unitId: string
      squadId: string
      seq: number
      unitName: string
      unitTypeId: string
      currHIT: number
      isActivated: boolean
      hasCustomPortrait: boolean
      portraitUpdatedAt: Date
      gearIds: string | null
      medalIds: string | null
      unitType?: {
        unitTypeId: string
        squadTypeId: string
        seq: number
        unitTypeName: string
        description: string | null
        ACT: number
        MOV: number
        MSK: number
        RSK: number
        ARM: number
        HIT: number
        special: string
        GP: number
        nameType: string
        gearIds: string | null
      }
    }>
  }): Squad {
    const input: SquadCtorInput = {
      squadId: row.squadId,
      userId: row.userId,
      squadTypeId: row.squadTypeId,
      seq: row.seq,
      squadName: row.squadName,
      description: row.description ?? undefined,
      spawnTable: row.spawnTable ?? undefined,
      isSpotlight: row.isSpotlight,
      hasCustomPortrait: row.hasCustomPortrait,
      portraitUpdatedAt: row.portraitUpdatedAt ?? undefined,
      viewCount: row.viewCount,
      importCount: row.importCount,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      turn: row.turn,
      MP: row.MP,
      TO: row.TO,
      maxGP: row.maxGP,
      eloRating: row.eloRating ?? undefined,
      campaign: row.campaign ?? undefined,
      units: row.units?.map(unit => this.toUnit(unit)) ?? [],
      user: row.user ? this.toUser(row.user) : null,
      squadType: null
    }
    return new Squad(input)
  }

  private toSquadTypeCtorInput(
    row: PrismaSquadTypeWithRelations | PrismaSquadTypeRow,
    spotlights: Array<PrismaSquadTypeWithRelations['squads'][number]>
  ): SquadTypeCtorInput {
    const faction = new Faction({
      factionId: row.faction.factionId,
      seq: row.faction.seq,
      factionName: row.faction.factionName,
      description: row.faction.description,
      lore: row.faction.lore,
      squadTypes: []
    })

    return {
      squadTypeId: row.squadTypeId,
      factionId: row.factionId,
      seq: row.seq,
      squadTypeName: row.squadTypeName,
      description: row.description,
      lore: row.lore,
      isPublished: row.isPublished,
      defaultSquadId: row.defaultSquadId ?? null,
      faction,
      unitTypes: row.unitTypes.map(unitType => this.toUnitType(unitType)),
      defaultSquad: row.defaultSquad ? this.toSquad(row.defaultSquad) : null,
      spotlights: spotlights.map(squad => this.toSquad(squad))
    }
  }
}
