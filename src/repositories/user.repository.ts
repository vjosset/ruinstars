import { Faction, Squad, SquadType, Unit, UnitType, User } from '@/types'
import { BaseRepository } from './base.repository'

export class UserRepository extends BaseRepository {
  async getUserRow(userId: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({
      where: { userId }
    })

    return row
      ? new User({
        userId: row.userId,
        email: row.email,
        userName: row.userName,
        squads: []
      })
      : null
  }

  async getUser(userId: string): Promise<User | null> {
    const row = await this.prisma.user.findFirst({
      where: { userId },
      include: {
        squads: {
          include: {
            squadType: {
              include: {
                faction: true
              }
            },
            units: {
              include: {
                unitType: true
              },
              orderBy: { seq: 'asc' }
            }
          },
          orderBy: { seq: 'asc' }
        }
      }
    })

    return row
      ? new User({
        userId: row.userId,
        email: row.email,
        userName: row.userName,
        squads: row.squads.map(squad => this.toSquad(squad))
      })
      : null
  }

  async getUserByUsername(userName: string): Promise<User | null> {
    const normalized = userName.trim()
    const row = await this.prisma.user.findFirst({
      where: { userName: { equals: normalized } },
      include: {
        squads: {
          include: {
            squadType: {
              include: {
                faction: true
              }
            },
            units: {
              include: {
                unitType: true
              },
              orderBy: { seq: 'asc' }
            }
          },
          orderBy: { seq: 'asc' }
        }
      }
    })

    return row
      ? new User({
        userId: row.userId,
        email: row.email,
        userName: row.userName,
        squads: row.squads.map(squad => this.toSquad(squad))
      })
      : null
  }

  async getAllUsers(): Promise<User[]> {
    const rows = await this.prisma.user.findMany()
    return rows.map(row => new User({
      userId: row.userId,
      email: row.email,
      userName: row.userName,
      squads: []
    }))
  }

  async fixSquadSeqs(userId: string) {
    // Reorder/re-seq the user's squads
    if (!userId) {
      throw 'Missing required input userId'
    }
    const squads = await this.prisma.squad.findMany({
      where: { userId: userId },
      orderBy: [{ seq: 'asc' }, { createdAt: 'asc' }]
    })

    await Promise.all(
      squads.map((squad, index) =>
        this.prisma.squad.update({
          where: { squadId: squad.squadId },
          data: { seq: index + 1 }
        })
      )
    )
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
    return new UnitType({
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
    })
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
    unitType: {
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
    return new Unit({
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
      unitType: this.toUnitType(row.unitType),
      squad: null
    })
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
    squadType: {
      squadTypeId: string
      factionId: string
      seq: number
      squadTypeName: string
      tagline: string
      description: string
      lore: string
      isPublished: boolean
      defaultSquadId: string | null
      faction: {
        factionId: string
        seq: number
        factionName: string
        tagline: string
        description: string
        lore: string
      }
    }
    units: Array<{
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
      unitType: {
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
    return new Squad({
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
      units: row.units.map(unit => this.toUnit(unit)),
      user: null,
      squadType: new SquadType({
        ...row.squadType,
        faction: new Faction({
          ...row.squadType.faction,
          squadTypes: []
        }),
        unitTypes: [],
        defaultSquad: null,
        spotlights: []
      })
    })
  }
}
