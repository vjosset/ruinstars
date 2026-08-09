export const MATCH_OUTCOME = {
  A: 'A', // Squad A won
  B: 'B', // Squad B won
  D: 'D', // Draw
} as const

export type MatchOutcome = typeof MATCH_OUTCOME[keyof typeof MATCH_OUTCOME]

/**
 * One side of a match, as displayed. Resolved from the live Squad relation when the
 * squad still exists, otherwise from the snapshot columns on the MatchResult row.
 * `squadId` / `userId` are null when the squad has been deleted - the names still
 * render, but there is nothing left to link to.
 */
export type MatchResultSquadInfo = {
  squadId: string | null
  squadName: string
  userId: string | null
  userName: string
  squadTypeId: string
  squadTypeName: string
}

export type MatchResultPlain = {
  matchResultId: number
  squadAId: string | null
  squadBId: string | null
  result: MatchOutcome
  squadBConfirmed: boolean
  matchDate: Date
  eloBeforeA: number | null
  eloBeforeB: number | null
  eloAfterA: number | null
  eloAfterB: number | null
  squadA: MatchResultSquadInfo
  squadB: MatchResultSquadInfo
}

export class MatchResult {
  matchResultId: number
  squadAId: string | null
  squadBId: string | null
  result: MatchOutcome
  squadBConfirmed: boolean
  matchDate: Date
  eloBeforeA: number | null
  eloBeforeB: number | null
  eloAfterA: number | null
  eloAfterB: number | null
  // Not optional relations: always resolvable from the row's snapshot columns
  squadA: MatchResultSquadInfo
  squadB: MatchResultSquadInfo

  constructor(data: {
    matchResultId: number
    squadAId: string | null
    squadBId: string | null
    result: MatchOutcome
    squadBConfirmed: boolean
    matchDate: Date
    eloBeforeA: number | null
    eloBeforeB: number | null
    eloAfterA: number | null
    eloAfterB: number | null
    squadA: MatchResultSquadInfo
    squadB: MatchResultSquadInfo
  }) {
    this.matchResultId = data.matchResultId
    this.squadAId = data.squadAId
    this.squadBId = data.squadBId
    this.result = data.result
    this.squadBConfirmed = data.squadBConfirmed
    this.matchDate = data.matchDate
    this.eloBeforeA = data.eloBeforeA
    this.eloBeforeB = data.eloBeforeB
    this.eloAfterA = data.eloAfterA
    this.eloAfterB = data.eloAfterB
    this.squadA = data.squadA
    this.squadB = data.squadB
  }

  get isPending(): boolean {
    return !this.squadBConfirmed
  }

  get isConfirmed(): boolean {
    return this.squadBConfirmed
  }

  toPlain(): MatchResultPlain {
    return {
      matchResultId: this.matchResultId,
      squadAId: this.squadAId,
      squadBId: this.squadBId,
      result: this.result,
      squadBConfirmed: this.squadBConfirmed,
      matchDate: this.matchDate,
      eloBeforeA: this.eloBeforeA,
      eloBeforeB: this.eloBeforeB,
      eloAfterA: this.eloAfterA,
      eloAfterB: this.eloAfterB,
      squadA: this.squadA,
      squadB: this.squadB,
    }
  }
}

/** Runtime narrowing for the `result` column, which Prisma types as a bare string. */
export function isMatchOutcome(value: string): value is MatchOutcome {
  return value === MATCH_OUTCOME.A || value === MATCH_OUTCOME.B || value === MATCH_OUTCOME.D
}
