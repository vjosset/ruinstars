import { MatchResultRepository } from '@/src/repositories/matchResult.repository'
import { MatchOutcome, MatchResult, MatchResultPlain, SquadIdentity } from '@/types'

export class MatchResultService {
  private static repository = new MatchResultRepository()

  static async getMatchResult(matchResultId: number): Promise<MatchResult | null> {
    return this.repository.getMatchResult(matchResultId)
  }

  /**
   * Records a match awaiting confirmation from Squad B's owner. Both squads are
   * snapshotted so the result stays readable if either is later deleted.
   * Callers are responsible for checking that the current user owns Squad A.
   */
  static async createPendingMatch(
    squadA: SquadIdentity,
    squadB: SquadIdentity,
    result: MatchOutcome
  ): Promise<MatchResult> {
    return this.repository.createMatchResult({
      squadAId: squadA.squadId,
      squadBId: squadB.squadId,
      result,
      squadASnapshot: squadA,
      squadBSnapshot: squadB,
    })
  }

  static async confirmMatch(matchResultId: number): Promise<MatchResult> {
    return this.repository.confirmMatch(matchResultId)
  }

  /**
   * Removes a pending match. The opponent rejecting the report (a dispute) and the
   * reporter retracting it (a delete) both mean the same thing to the data: a pending
   * match was never publicly visible and never counted toward a record.
   */
  static async deletePendingMatch(matchResultId: number): Promise<void> {
    await this.repository.deleteMatchResult(matchResultId)
  }

  /** `includeUnconfirmed` is for the squad's owner - see the repository. */
  static async getMatchResultsForSquad(squadId: string, includeUnconfirmed: boolean): Promise<MatchResultPlain[]> {
    const results = await this.repository.getMatchResultsForSquad(squadId, includeUnconfirmed)
    return results.map(r => r.toPlain())
  }
}
