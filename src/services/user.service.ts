// @ts-nocheck
import { User } from '@/types'
import { UserRepository } from '@/src/repositories/user.repository'

export class UserService {
  private static repository = new UserRepository()

  static async getUserRow(userId: string): Promise<User | null> {
    const user = await this.repository.getUserRow(userId)
    if (!user) return null
    return new User(user)
  }

  static async getUser(userId: string): Promise<User | null> {
    const user = await this.repository.getUser(userId)
    return user ? new User(user) : null
  }

  static async getAllUsers(): Promise<User[]> {
    const users = await this.repository.getAllUsers()
    return users.map(user => new User(user))
  }

  static async getUserByUsername(userName: string): Promise<User | null> {
    const user = await this.repository.getUserByUsername(userName)
    return user ? new User(user) : null
  }

  static async fixSquadSeqs(userId: string): Promise<null> {
    // Reorder/re-seq the user's squads
    await this.repository.fixSquadSeqs(userId)
  }
}
