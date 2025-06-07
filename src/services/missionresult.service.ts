// @ts-nocheck
import { MissionResult } from '@/types'
import { MissionResultRepository } from '@/src/repositories/missionresult.repository'

export class MissionResultService {
  private static repository = new MissionResultRepository()

  static async getMissionResultRow(missionresultId: string): Promise<MissionResult | null> {
    const missionresult = await this.repository.getMissionResultRow(missionresultId)
    return missionresult ? new MissionResult(missionresult) : null
  }

  static async getMissionResult(missionresultId: string): Promise<MissionResult | null> {
    const missionresult = await this.repository.getMissionResult(missionresultId)
    return missionresult ? new MissionResult(missionresult) : null
  }

  static async createMissionResult(data: Partial<MissionResult>): Promise<MissionResult | null> {
    const missionresult = await this.repository.createMissionResult(data)
    
    if (!missionresult) throw new Error('Failed to create mission result')
    return await this.getMissionResult(missionresult.missionresultId)
  }

  static async confirmMissionResult(missionresultId: string, squadId: string): Promise<MissionResult | null> {
    const missionresult = await this.repository.getMissionResultRow(missionresultId)
    if (!missionresult) return null

    const updatedData: Partial<MissionResult> = {
      matchDate: new Date(),
      [`squad${missionresult.squadAId === squadId ? 'A' : 'B'}Confirmed`]: true,
    }

    const updatedMissionResult = await this.repository.updateMissionResult(missionresultId, updatedData)
    return updatedMissionResult ? new MissionResult(updatedMissionResult) : null
  }

  private readonly K_FACTOR = 32
  private readonly SCALING_DIVISOR = 400
  private readonly DEFAULT_ELO = 1000

  static getMissionResultNewElos(missionResult: MissionResult): {
    eloAfterA: number;
    eloAfterB: number;
  } {
    const { squadAScore, squadBScore } = missionResult

    // If Elo ratings are not provided, use default values
    const eloBeforeA = missionResult.eloBeforeA ?? this.DEFAULT_ELO
    const eloBeforeB = missionResult.eloBeforeB ?? this.DEFAULT_ELO

    const totalScore = squadAScore + squadBScore

    // Note this implementation is proportional to the score rather than binary win/loss
    // This means that a result of 10-1 will have more impact on Elo ratings than a result of 5-4
    const playerScoreA = totalScore > 0 ? squadAScore / totalScore : 0.5 // Avoid division by zero
    const playerScoreB = totalScore > 0 ? squadBScore / totalScore : 0.5 // Avoid division by zero

    // Calculate expected scores based on Elo ratings
    const expectedScoreA = 1 / (1 + Math.pow(10, (eloBeforeB - eloBeforeA) / this.SCALING_DIVISOR))
    const expectedScoreB = 1 / (1 + Math.pow(10, (eloBeforeA - eloBeforeB) / this.SCALING_DIVISOR))

    // Calculate new Elo ratings
    const eloAfterA = Math.round(eloBeforeA + this.K_FACTOR * (playerScoreA - expectedScoreA))
    const eloAfterB = Math.round(eloBeforeB + this.K_FACTOR * (playerScoreB - expectedScoreB))

    // All done
    return { eloAfterA, eloAfterB }
  }
}
