import { Squad, SquadPlain } from '.'

export type UserPlain = {
  userId: string
  email?: string | null
  userName?: string | null
  squads?: SquadPlain[] | null
}

export class User {
  userId: string
  email?: string | null
  userName: string
  squads?: Squad[] | null

  constructor(data: {
    userId: string
    email: string | null
    userName: string
    squads?: Squad[] | null
  }) {
    this.userId = data.userId
    this.email = data.email
    this.userName = data.userName
    this.squads = data.squads ?? [] // Provide default empty array
  }

  toPlain(): UserPlain {
    return {
      userId: this.userId,
      email: this.email,
      userName: this.userName,
      squads: this.squads?.map((squad) => squad.toPlain()),
    }
  }
}
