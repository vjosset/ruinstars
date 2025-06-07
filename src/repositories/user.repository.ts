import { BaseRepository } from './base.repository'
import type { User } from '@prisma/client'

export class UserRepository extends BaseRepository {
  async getUserRow(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { userId }
    })
  }

  async getUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { userId },
      include: {
        squads: {
          include: {
            faction: true
          },
          orderBy: { seq: 'asc' }
        }
      }
    })
  }

  async getUserByUsername(userName: string) {
    return this.prisma.user.findUnique({
      where: { userName },
      include: {
        squads: {
          include: {
            faction: true
          },
          orderBy: { seq: 'asc' }
        }
      }
    })
  }

  async getAllUsers() {
    return this.prisma.user.findMany()
  }

  async fixSquadSeqs(userId: string) {
    // Reorder/re-seq the user's squads
    if (!userId) {
      throw 'Missing required input userId'
    }
    const squads = await this.prisma.squad.findMany({
      where: { userId: userId },
      orderBy: [{ seq: 'asc' }, { createdAt: 'asc' }]
    })

    await Promise.all(
      squads.map((squad, index) =>
        this.prisma.squad.update({
          where: { squadId: squad.squadId },
          data: { seq: index + 1 }
        })
      )
    )
  }
}
