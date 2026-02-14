import { Squad, User } from '@/types'
import { UserRepository } from '@/src/repositories/user.repository'
import { GearService } from './gear.service'

export class UserService {
  private static repository = new UserRepository()

  static async getUserRow(userId: string): Promise<User | null> {
    return this.repository.getUserRow(userId)
  }

  static async getUser(userId: string): Promise<User | null> {
    const user = await this.repository.getUser(userId)
    if (!user) return null

    const squads = await this.hydrateSquads(user.squads)

    user.squads = squads
    return user
  }

  static async getAllUsers(): Promise<User[]> {
    return this.repository.getAllUsers()
  }

  static async getUserByUsername(userName: string): Promise<User | null> {
    const user = await this.repository.getUserByUsername(userName)
    if (!user) return null

    const squads = await this.hydrateSquads(user.squads)

    user.squads = squads
    return user
  }

  static async fixSquadSeqs(userId: string): Promise<void> {
    // Reorder/re-seq the user's squads
    await this.repository.fixSquadSeqs(userId)
  }

  private static async hydrateSquads(rawSquads?: Squad[] | null): Promise<Squad[]> {
    if (!rawSquads?.length) return []

    const squads = rawSquads

    await Promise.all(
      squads.map(async squad => {
        if (!squad.units?.length) return
        await Promise.all(squad.units.map(unit => GearService.loadUnitGear(unit)))
      })
    )

    return squads
  }
}
