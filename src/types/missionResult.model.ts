export type MissionResultPlain = {
  missionresultId: string;
  squadAId: string;
  squadBId: string;
  squadAScore: number;
  squadBScore: number;
  squadAConfirmed: boolean;
  squadBConfirmed: boolean;
  matchDate: Date;
  eloBeforeA: number;
  eloBeforeB: number;
  eloAfterA: number;
  eloAfterB: number;
  missionId: number;
};

export class MissionResult {
  missionresultId: string
  squadAId: string
  squadBId: string
  squadAScore: number
  squadBScore: number
  squadAConfirmed: boolean
  squadBConfirmed: boolean
  matchDate: Date
  eloBeforeA: number
  eloBeforeB: number
  eloAfterA: number
  eloAfterB: number
  missionId: number

  constructor(data: {
    missionresultId: string;
    squadAId: string;
    squadBId: string;
    squadAScore: number;
    squadBScore: number;
    squadAConfirmed: boolean;
    squadBConfirmed: boolean;
    matchDate: Date;
    eloBeforeA: number;
    eloBeforeB: number;
    eloAfterA: number;
    eloAfterB: number;
    missionId: number;
  }) {
    this.missionresultId = data.missionresultId
    this.squadAId = data.squadAId
    this.squadBId = data.squadBId
    this.squadAScore = data.squadAScore
    this.squadBScore = data.squadBScore
    this.squadAConfirmed = data.squadAConfirmed
    this.squadBConfirmed = data.squadBConfirmed
    this.matchDate = data.matchDate
    this.eloBeforeA = data.eloBeforeA
    this.eloBeforeB = data.eloBeforeB
    this.eloAfterA = data.eloAfterA
    this.eloAfterB = data.eloAfterB
    this.missionId = data.missionId
  }

  toPlain(): MissionResultPlain {
    return {
      missionresultId: this.missionresultId,
      squadAId: this.squadAId,
      squadBId: this.squadBId,
      squadAScore: this.squadAScore,
      squadBScore: this.squadBScore,
      squadAConfirmed: this.squadAConfirmed,
      squadBConfirmed: this.squadBConfirmed,
      matchDate: this.matchDate,
      eloBeforeA: this.eloBeforeA,
      eloBeforeB: this.eloBeforeB,
      eloAfterA: this.eloAfterA,
      eloAfterB: this.eloAfterB,
      missionId: this.missionId
    }
  }
}
