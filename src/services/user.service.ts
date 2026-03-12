import { Squad, User } from '@/types'
import { UserRepository } from '@/src/repositories/user.repository'
import { SquadRepository } from '@/src/repositories/squad.repository'
import { GearService } from './gear.service'

export class UserService {
  private static repository = new UserRepository()
  private static squadRepository = new SquadRepository()

  static async getUser(userId: string): Promise<User | null> {
    const user = await this.repository.getUser(userId)
    if (!user) return null

    user.squads = await this.hydrateSquads(
      await this.squadRepository.getSquadsByUserId(userId)
    )
    return user
  }

  static async getUserByUsername(userName: string): Promise<User | null> {
    const user = await this.repository.getUserByUsername(userName)
    if (!user) return null

    user.squads = await this.hydrateSquads(
      await this.squadRepository.getSquadsByUserId(user.userId)
    )
    return user
  }

  private static async hydrateSquads(squads: Squad[]): Promise<Squad[]> {
    await Promise.all(
      squads.map(async squad => {
        if (!squad.units?.length) return
        await Promise.all(squad.units.map(unit => GearService.loadUnitGear(unit)))
      })
    )
    return squads
  }
}
