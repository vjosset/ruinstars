import { User } from '@/types'
import { BaseRepository } from './base.repository'

export class UserRepository extends BaseRepository {
  async getUser(userId: string): Promise<User | null> {
    const row = await this.prisma.user.findUnique({
      select: { userId: true, userName: true },
      where: { userId }
    })

    return row
      ? new User({ userId: row.userId, userName: row.userName, squads: [] })
      : null
  }

  async getUserByUsername(userName: string): Promise<User | null> {
    const normalized = userName.trim()
    const row = await this.prisma.user.findFirst({
      select: { userId: true, userName: true },
      where: { userName: { equals: normalized } }
    })

    return row
      ? new User({ userId: row.userId, userName: row.userName, squads: [] })
      : null
  }
}
