export const MATCH_OUTCOME = {
  A: 'A', // Squad A won
  B: 'B', // Squad B won
  D: 'D', // Draw
} as const

export type MatchOutcome = typeof MATCH_OUTCOME[keyof typeof MATCH_OUTCOME]

export type MatchResultSquadInfo = {
  squadId: string
  squadName: string
  userId: string
  userName: string
}

export type MatchResultPlain = {
  missionResultId: number
  squadAId: string
  squadBId: string
  result: string
  squadAConfirmed: boolean
  squadBConfirmed: boolean
  matchDate: Date
  eloBeforeA?: number | null
  eloBeforeB?: number | null
  eloAfterA?: number | null
  eloAfterB?: number | null
  squadA?: MatchResultSquadInfo | null
  squadB?: MatchResultSquadInfo | null
}

export class MatchResult {
  missionResultId: number
  squadAId: string
  squadBId: string
  result: string
  squadAConfirmed: boolean
  squadBConfirmed: boolean
  matchDate: Date
  eloBeforeA?: number | null
  eloBeforeB?: number | null
  eloAfterA?: number | null
  eloAfterB?: number | null
  squadA?: MatchResultSquadInfo | null
  squadB?: MatchResultSquadInfo | null

  constructor(data: {
    missionResultId: number
    squadAId: string
    squadBId: string
    result: string
    squadAConfirmed: boolean
    squadBConfirmed: boolean
    matchDate: Date
    eloBeforeA?: number | null
    eloBeforeB?: number | null
    eloAfterA?: number | null
    eloAfterB?: number | null
    squadA?: MatchResultSquadInfo | null
    squadB?: MatchResultSquadInfo | null
  }) {
    this.missionResultId = data.missionResultId
    this.squadAId = data.squadAId
    this.squadBId = data.squadBId
    this.result = data.result
    this.squadAConfirmed = data.squadAConfirmed
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
    return this.squadAConfirmed && this.squadBConfirmed
  }

  toPlain(): MatchResultPlain {
    return {
      missionResultId: this.missionResultId,
      squadAId: this.squadAId,
      squadBId: this.squadBId,
      result: this.result,
      squadAConfirmed: this.squadAConfirmed,
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
