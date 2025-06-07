import { BaseRepository } from './base.repository'
import type { MissionResult } from '@prisma/client'

export class MissionResultRepository extends BaseRepository {
  async getMissionResultRow(missionResultId: number): Promise<MissionResult | null> {
    return this.prisma.missionResult.findUnique({
      where: { missionResultId }
    })
  }

  async getMissionResult(missionResultId: number) {
    return this.prisma.missionResult.findUnique({
      where: { missionResultId }
    })
  }

  async createMissionResult(data: Partial<MissionResult>) {
    return this.prisma.missionResult.create({
      data: {
        squadAId: data.squadAId ?? '',
        squadBId: data.squadBId ?? '',
        squadAScore: data.squadAScore ?? 0,
        squadBScore: data.squadBScore ?? 0,
        squadAConfirmed: data.squadAConfirmed ?? true,
        squadBConfirmed: data.squadBConfirmed ?? false,
        matchDate: data.matchDate ?? new Date(),
        eloBeforeA: data.eloBeforeA ?? 0,
        eloBeforeB: data.eloBeforeB ?? 0,
        eloAfterA: data.eloAfterA ?? 0,
        eloAfterB: data.eloAfterB ?? 0,
        missionId: data.missionId ?? 0,
      }
    })
  }
}
