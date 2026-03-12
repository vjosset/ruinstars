import { MatchResult, MatchResultPlain, MATCH_OUTCOME } from '@/types'
import { MatchResultRepository } from '@/repositories/matchResult.repository'
import { SquadRepository } from '@/repositories/squad.repository'

const matchResultRepo = new MatchResultRepository()
const squadRepo = new SquadRepository()

const VALID_OUTCOMES = new Set([MATCH_OUTCOME.A, MATCH_OUTCOME.B, MATCH_OUTCOME.D])

export class MatchResultService {
  static async createPendingMatch(
    squadAId: string,
    squadBId: string,
    result: string,
    userId: string
  ): Promise<MatchResult> {
    if (!VALID_OUTCOMES.has(result as typeof MATCH_OUTCOME[keyof typeof MATCH_OUTCOME])) {
      throw new Error('Invalid result value. Must be "A", "B", or "D".')
    }

    const [squadA, squadB] = await Promise.all([
      squadRepo.getSquadRow(squadAId),
      squadRepo.getSquadRow(squadBId),
    ])

    if (!squadA) throw new Error('Squad A not found.')
    if (!squadB) throw new Error('Squad B not found.')
    if (squadA.userId !== userId) throw new Error('You do not own Squad A.')
    if (squadA.userId === squadB.userId) throw new Error('Cannot record a match against your own squad.')

    return matchResultRepo.createMatchResult({ squadAId, squadBId, result })
  }

  static async confirmMatch(matchResultId: number, userId: string): Promise<MatchResult> {
    const match = await matchResultRepo.getMatchResult(matchResultId)
    if (!match) throw new Error('Match not found.')
    if (match.squadB?.userId !== userId) throw new Error('You do not own Squad B.')
    if (match.squadBConfirmed) throw new Error('Match already confirmed.')

    return matchResultRepo.confirmMatch(matchResultId)
  }

  static async disputeMatch(matchResultId: number, userId: string): Promise<void> {
    const match = await matchResultRepo.getMatchResult(matchResultId)
    if (!match) throw new Error('Match not found.')
    if (match.squadB?.userId !== userId) throw new Error('You do not own Squad B.')
    if (match.squadBConfirmed) throw new Error('Cannot dispute an already-confirmed match.')

    await matchResultRepo.deleteMatchResult(matchResultId)
  }

  static async getPendingMatchesForUser(userId: string): Promise<MatchResultPlain[]> {
    const results = await matchResultRepo.getPendingMatchesForUser(userId)
    return results.map(r => r.toPlain())
  }

  static async getMatchHistoryForSquad(squadId: string): Promise<MatchResultPlain[]> {
    const results = await matchResultRepo.getMatchHistoryForSquad(squadId)
    return results.map(r => r.toPlain())
  }
}
