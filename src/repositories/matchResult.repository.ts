import type { Prisma } from '@prisma/client'
import { MatchOutcome, MatchResult, MatchResultSquadInfo, isMatchOutcome } from '@/types'
import { BaseRepository } from './base.repository'

type PrismaMatchResultWithRelations = Prisma.MatchResultGetPayload<{
  include: {
    squadA: {
      include: {
        user: { select: { userId: true; userName: true } }
        squadType: { select: { squadTypeId: true; squadTypeName: true } }
      }
    }
    squadB: {
      include: {
        user: { select: { userId: true; userName: true } }
        squadType: { select: { squadTypeId: true; squadTypeName: true } }
      }
    }
  }
}>

type LiveSquad = NonNullable<PrismaMatchResultWithRelations['squadA']>

/** The snapshot values written at report time, for one side of the match. */
export type MatchResultSquadSnapshot = {
  squadName: string
  userName: string
  squadTypeId: string
  squadTypeName: string
}

export class MatchResultRepository extends BaseRepository {
  async createMatchResult(data: {
    squadAId: string
    squadBId: string
    result: MatchOutcome
    squadASnapshot: MatchResultSquadSnapshot
    squadBSnapshot: MatchResultSquadSnapshot
  }): Promise<MatchResult> {
    const row = await this.prisma.matchResult.create({
      data: {
        squadAId: data.squadAId,
        squadBId: data.squadBId,
        result: data.result,
        squadBConfirmed: false,
        squadANameSnap: data.squadASnapshot.squadName,
        squadAUserNameSnap: data.squadASnapshot.userName,
        squadATypeIdSnap: data.squadASnapshot.squadTypeId,
        squadATypeNameSnap: data.squadASnapshot.squadTypeName,
        squadBNameSnap: data.squadBSnapshot.squadName,
        squadBUserNameSnap: data.squadBSnapshot.userName,
        squadBTypeIdSnap: data.squadBSnapshot.squadTypeId,
        squadBTypeNameSnap: data.squadBSnapshot.squadTypeName,
      },
      include: this.defaultInclude(),
    })

    return this.toMatchResult(row)
  }

  async getMatchResult(matchResultId: number): Promise<MatchResult | null> {
    const row = await this.prisma.matchResult.findUnique({
      where: { matchResultId },
      include: this.defaultInclude(),
    })

    return row ? this.toMatchResult(row) : null
  }

  /**
   * Every match involving this squad. `includeUnconfirmed` is for the squad's owner:
   * an unconfirmed result is an unverified claim by one party, so nobody else sees it.
   */
  async getMatchResultsForSquad(squadId: string, includeUnconfirmed: boolean): Promise<MatchResult[]> {
    const rows = await this.prisma.matchResult.findMany({
      where: {
        OR: [{ squadAId: squadId }, { squadBId: squadId }],
        ...(includeUnconfirmed ? {} : { squadBConfirmed: true }),
      },
      include: this.defaultInclude(),
      orderBy: { matchDate: 'desc' },
    })

    return rows.map(row => this.toMatchResult(row))
  }

  async confirmMatch(matchResultId: number): Promise<MatchResult> {
    const row = await this.prisma.matchResult.update({
      where: { matchResultId },
      data: { squadBConfirmed: true },
      include: this.defaultInclude(),
    })

    return this.toMatchResult(row)
  }

  async deleteMatchResult(matchResultId: number): Promise<void> {
    await this.prisma.matchResult.delete({
      where: { matchResultId },
    })
  }

  private defaultInclude() {
    return {
      squadA: {
        include: {
          user: { select: { userId: true, userName: true } },
          squadType: { select: { squadTypeId: true, squadTypeName: true } },
        },
      },
      squadB: {
        include: {
          user: { select: { userId: true, userName: true } },
          squadType: { select: { squadTypeId: true, squadTypeName: true } },
        },
      },
    } as const
  }

  /**
   * Prefer the live squad so renames show through; fall back to the snapshot taken at
   * report time once the squad has been deleted.
   */
  private toSquadInfo(live: LiveSquad | null, snapshot: MatchResultSquadSnapshot): MatchResultSquadInfo {
    if (live) {
      return {
        squadId: live.squadId,
        squadName: live.squadName,
        userId: live.user.userId,
        userName: live.user.userName,
        squadTypeId: live.squadType.squadTypeId,
        squadTypeName: live.squadType.squadTypeName,
      }
    }

    return {
      squadId: null,
      squadName: snapshot.squadName,
      userId: null,
      userName: snapshot.userName,
      squadTypeId: snapshot.squadTypeId,
      squadTypeName: snapshot.squadTypeName,
    }
  }

  private toMatchResult(row: PrismaMatchResultWithRelations): MatchResult {
    if (!isMatchOutcome(row.result)) {
      throw new Error(`Match result ${row.matchResultId} has an invalid result value: "${row.result}"`)
    }

    return new MatchResult({
      matchResultId: row.matchResultId,
      squadAId: row.squadAId,
      squadBId: row.squadBId,
      result: row.result,
      squadBConfirmed: row.squadBConfirmed,
      matchDate: row.matchDate,
      eloBeforeA: row.eloBeforeA,
      eloBeforeB: row.eloBeforeB,
      eloAfterA: row.eloAfterA,
      eloAfterB: row.eloAfterB,
      squadA: this.toSquadInfo(row.squadA, {
        squadName: row.squadANameSnap,
        userName: row.squadAUserNameSnap,
        squadTypeId: row.squadATypeIdSnap,
        squadTypeName: row.squadATypeNameSnap,
      }),
      squadB: this.toSquadInfo(row.squadB, {
        squadName: row.squadBNameSnap,
        userName: row.squadBUserNameSnap,
        squadTypeId: row.squadBTypeIdSnap,
        squadTypeName: row.squadBTypeNameSnap,
      }),
    })
  }
}
