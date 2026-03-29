import type { Prisma } from '@prisma/client'
import { MatchResult, MatchResultSquadInfo } from '@/types'
import { BaseRepository } from './base.repository'

type PrismaMatchResultWithRelations = Prisma.MissionResultGetPayload<{
  include: {
    squadA: {
      include: {
        user: {
          select: { userId: true; userName: true }
        }
      }
    }
    squadB: {
      include: {
        user: {
          select: { userId: true; userName: true }
        }
      }
    }
  }
}>

export class MatchResultRepository extends BaseRepository {
  async createMatchResult(data: {
    squadAId: string
    squadBId: string
    result: string
  }): Promise<MatchResult> {
    const row = await this.prisma.missionResult.create({
      data: {
        squadAId: data.squadAId,
        squadBId: data.squadBId,
        result: data.result,
        squadAConfirmed: true,
        squadBConfirmed: false,
      },
      include: this.defaultInclude(),
    })

    return this.toMatchResult(row)
  }

  async getMatchResult(matchResultId: number): Promise<MatchResult | null> {
    const row = await this.prisma.missionResult.findUnique({
      where: { missionResultId: matchResultId },
      include: this.defaultInclude(),
    })

    return row ? this.toMatchResult(row) : null
  }

  async getPendingMatchesForUser(userId: string): Promise<MatchResult[]> {
    const rows = await this.prisma.missionResult.findMany({
      where: {
        squadBConfirmed: false,
        squadB: { userId },
      },
      include: this.defaultInclude(),
      orderBy: { matchDate: 'desc' },
    })

    return rows.map(row => this.toMatchResult(row))
  }

  async getMatchHistoryForSquad(squadId: string): Promise<MatchResult[]> {
    const rows = await this.prisma.missionResult.findMany({
      where: {
        OR: [
          // Matches submitted by this squad - show regardless of confirmation status
          { squadAId: squadId },
          // Matches where this squad is the opponent - only show once confirmed
          { squadBId: squadId, squadBConfirmed: true },
        ],
      },
      include: this.defaultInclude(),
      orderBy: { matchDate: 'desc' },
    })

    return rows.map(row => this.toMatchResult(row))
  }

  async confirmMatch(matchResultId: number): Promise<MatchResult> {
    const row = await this.prisma.missionResult.update({
      where: { missionResultId: matchResultId },
      data: { squadBConfirmed: true },
      include: this.defaultInclude(),
    })

    return this.toMatchResult(row)
  }

  async deleteMatchResult(matchResultId: number): Promise<void> {
    await this.prisma.missionResult.delete({
      where: { missionResultId: matchResultId },
    })
  }

  private defaultInclude() {
    return {
      squadA: {
        include: {
          user: {
            select: { userId: true, userName: true },
          },
        },
      },
      squadB: {
        include: {
          user: {
            select: { userId: true, userName: true },
          },
        },
      },
    } as const
  }

  private toSquadInfo(squad: { squadId: string; squadName: string; user: { userId: string; userName: string } }): MatchResultSquadInfo {
    return {
      squadId: squad.squadId,
      squadName: squad.squadName,
      userId: squad.user.userId,
      userName: squad.user.userName,
    }
  }

  private toMatchResult(row: PrismaMatchResultWithRelations): MatchResult {
    return new MatchResult({
      missionResultId: row.missionResultId,
      squadAId: row.squadAId,
      squadBId: row.squadBId,
      result: row.result,
      squadAConfirmed: row.squadAConfirmed,
      squadBConfirmed: row.squadBConfirmed,
      matchDate: row.matchDate,
      eloBeforeA: row.eloBeforeA,
      eloBeforeB: row.eloBeforeB,
      eloAfterA: row.eloAfterA,
      eloAfterB: row.eloAfterB,
      squadA: row.squadA ? this.toSquadInfo(row.squadA) : null,
      squadB: row.squadB ? this.toSquadInfo(row.squadB) : null,
    })
  }
}
