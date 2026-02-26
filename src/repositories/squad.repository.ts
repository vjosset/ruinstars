import type { Prisma } from '@prisma/client'
import { Squad, User } from '@/types'
import { BaseRepository } from './base.repository'

type PrismaSquadWithRelations = Prisma.SquadGetPayload<{
  include: {
    squadType: {
      include: {
        faction: true
      }
    }
    user: {
      select: {
        userId: true
        userName: true
      }
    }
    units: {
      include: {
        unitType: true
      }
      orderBy: {
        seq: 'asc'
      }
    }
  }
}>

type SquadCtorInput = ConstructorParameters<typeof Squad>[0]

export class SquadRepository extends BaseRepository {
  async getSquadRow(squadId: string): Promise<Squad | null> {
    const row = await this.prisma.squad.findUnique({
      where: { squadId }
    })

    return row ? new Squad(this.toSquadCtorInput(row)) : null
  }

  async getSquad(squadId: string): Promise<Squad | null> {
    const row = await this.prisma.squad.findUnique({
      where: { squadId },
      include: {
        squadType: {
          include: {
            faction: true
          }
        },
        user: {
          select: {
            userId: true,
            userName: true
          }
        },
        units: {
          include: {
            unitType: true
          },
          orderBy: {seq: 'asc'}
        }
      }
    })

    if (!row) return null
    return new Squad(this.toSquadCtorInput(row))
  }

  async createSquad(data: Partial<Squad>): Promise<Squad> {
    const row = await this.prisma.squad.create({
      data: this.toCreateInput(data)
    })

    return new Squad(this.toSquadCtorInput(row))
  }

  async updateSquad(squadId: string, data: Partial<Squad>): Promise<Squad> {
    const row = await this.prisma.squad.update({
      where: { squadId },
      data: this.toUpdateInput(data)
    })

    return new Squad(this.toSquadCtorInput(row))
  }

  async getRandomSpotlightSquad(): Promise<Squad | null> {
    const rows = await this.prisma.squad.findMany({
      where: { isSpotlight: true },
      include: {
        squadType: {
          include: {
            faction: true
          }
        },
        user: {
          select: {
            userId: true,
            userName: true
          }
        },
        units: {
          include: {
            unitType: true
          },
          orderBy: { seq: 'asc' }
        }
      }
    })

    if (!rows.length) return null
    const row = rows[Math.floor(Math.random() * rows.length)]
    return new Squad(this.toSquadCtorInput(row))
  }

  async deleteSquad(squadId: string): Promise<void> {
    await this.prisma.squad.delete({ where: { squadId } })
  }

  async resetSquadActivation(squadId: string): Promise<void> {
    await this.prisma.unit.updateMany({
      where: { squadId },
      data: { isActivated: false }
    })
  }

  private toSquadCtorInput(row: PrismaSquadWithRelations | Prisma.SquadUncheckedCreateInput | any): SquadCtorInput {
    return {
      squadId: row.squadId,
      userId: row.userId,
      squadTypeId: row.squadTypeId,
      seq: row.seq ?? 0,
      squadName: row.squadName,
      description: row.description ?? undefined,
      spawnTable: row.spawnTable ?? undefined,
      isSpotlight: row.isSpotlight ?? false,
      hasCustomPortrait: row.hasCustomPortrait ?? false,
      portraitUpdatedAt: row.portraitUpdatedAt ?? undefined,
      viewCount: row.viewCount ?? 0,
      importCount: row.importCount ?? 0,
      createdAt: row.createdAt ?? new Date(),
      updatedAt: row.updatedAt ?? new Date(),
      turn: row.turn ?? 1,
      MP: row.MP ?? 0,
      TO: row.TO ?? 0,
      maxGP: row.maxGP ?? 100,
      eloRating: row.eloRating ?? undefined,
      campaign: row.campaign ?? undefined,
      // Keep nested records as-is; Squad constructor will recursively wrap them.
      units: row.units ?? null,
      user: row.user ? new User({ userId: row.user.userId, userName: row.user.userName, email: null }) : null,
      squadType: row.squadType
        ? {
          ...row.squadType,
          // Faction/SquadType constructors currently require nested arrays.
          faction: row.squadType.faction
            ? {
              ...row.squadType.faction,
              squadTypes: row.squadType.faction.squadTypes ?? []
            }
            : row.squadType.faction,
          unitTypes: row.squadType.unitTypes ?? [],
          spotlights: row.squadType.spotlights ?? []
        }
        : null
    }
  }

  private toCreateInput(data: Partial<Squad>): Prisma.SquadUncheckedCreateInput {
    if (!data.squadId || !data.userId || !data.squadTypeId || !data.squadName) {
      throw new Error('Missing required squad fields for create')
    }

    return {
      squadId: data.squadId,
      userId: data.userId,
      squadTypeId: data.squadTypeId,
      squadName: data.squadName,
      seq: data.seq ?? 0,
      description: data.description ?? null,
      spawnTable: data.spawnTable ?? null,
      isSpotlight: data.isSpotlight ?? false,
      hasCustomPortrait: data.hasCustomPortrait ?? false,
      portraitUpdatedAt: data.portraitUpdatedAt,
      viewCount: data.viewCount ?? 0,
      importCount: data.importCount ?? 0,
      turn: data.turn ?? 1,
      MP: data.MP ?? 0,
      TO: data.TO ?? 0,
      maxGP: data.maxGP ?? 100,
      eloRating: data.eloRating ?? 1000,
      campaign: data.campaign ?? null
    }
  }

  private toUpdateInput(data: Partial<Squad>): Prisma.SquadUncheckedUpdateInput {
    const input: Prisma.SquadUncheckedUpdateInput = {}

    if (data.userId !== undefined) input.userId = data.userId
    if (data.squadTypeId !== undefined) input.squadTypeId = data.squadTypeId
    if (data.seq !== undefined) input.seq = data.seq
    if (data.squadName !== undefined) input.squadName = data.squadName
    if (data.description !== undefined) input.description = data.description ?? null
    if (data.spawnTable !== undefined) input.spawnTable = data.spawnTable ?? null
    if (data.isSpotlight !== undefined) input.isSpotlight = data.isSpotlight
    if (data.hasCustomPortrait !== undefined) input.hasCustomPortrait = data.hasCustomPortrait
    if (data.portraitUpdatedAt !== undefined) input.portraitUpdatedAt = data.portraitUpdatedAt
    if (data.viewCount !== undefined) input.viewCount = data.viewCount
    if (data.importCount !== undefined) input.importCount = data.importCount
    if (data.turn !== undefined) input.turn = data.turn
    if (data.MP !== undefined) input.MP = data.MP
    if (data.TO !== undefined) input.TO = data.TO
    if (data.maxGP !== undefined) input.maxGP = data.maxGP
    if (data.eloRating !== undefined) input.eloRating = data.eloRating
    if (data.campaign !== undefined) input.campaign = data.campaign ?? null

    return input
  }
}
