import { BaseRepository } from './base.repository'
import type { Medal } from '@prisma/client'

export class MedalRepository extends BaseRepository {
  async getMedalRow(medalId: string): Promise<Medal | null> {
    return this.prisma.medal.findUnique({
      where: { medalId }
    })
  }

  async getMedal(medalId: string) {
    return this.prisma.medal.findUnique({
      where: { medalId }
    })
  }

  async getAllMedals() {
    return this.prisma.medal.findMany({
      orderBy: { medalId: 'asc' },
    })
  }
}
