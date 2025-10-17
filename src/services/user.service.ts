// @ts-nocheck
import { Squad, User } from '@/types'
import { UserRepository } from '@/src/repositories/user.repository'
import { GearService } from './gear.service'

export class UserService {
  private static repository = new UserRepository()

  static async getUserRow(userId: string): Promise<User | null> {
    const user = await this.repository.getUserRow(userId)
    if (!user) return null
    return new User(user)
  }

  static async getUser(userId: string): Promise<User | null> {
    const user = await this.repository.getUser(userId)
    if (!user) return null

    const squads = await this.hydrateSquads(user.squads)

    return new User({
      userId: user.userId,
      email: user.email,
      userName: user.userName,
      squads
    })
  }

  static async getAllUsers(): Promise<User[]> {
    const users = await this.repository.getAllUsers()
    return users.map(user => new User(user))
  }

  static async getUserByUsername(userName: string): Promise<User | null> {
    const user = await this.repository.getUserByUsername(userName)
    if (!user) return null

    const squads = await this.hydrateSquads(user.squads)

    return new User({
      userId: user.userId,
      email: user.email,
      userName: user.userName,
      squads
    })
  }

  static async fixSquadSeqs(userId: string): Promise<null> {
    // Reorder/re-seq the user's squads
    await this.repository.fixSquadSeqs(userId)
  }

  private static async hydrateSquads(rawSquads?: any[]): Promise<Squad[]> {
    if (!rawSquads?.length) return []

    const squads = rawSquads.map(squad =>
      squad instanceof Squad ? squad : new Squad(squad)
    )

    await Promise.all(
      squads.map(async squad => {
        if (!squad.units?.length) return
        await Promise.all(squad.units.map(unit => GearService.loadUnitGear(unit)))
      })
    )

    return squads
  }
}
