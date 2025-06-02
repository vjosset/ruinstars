import { BaseRepository } from './base.repository'
import type { Special } from '@prisma/client'

export class SpecialRepository extends BaseRepository {
  async getSpecialRow(specialId: string): Promise<Special | null> {
    return this.prisma.special.findUnique({
      where: { specialId }
    })
  }

  async getSpecial(specialId: string) {
    return this.prisma.special.findUnique({
      where: { specialId }
    })
  }

  async getAllSpecials() {
    return this.prisma.special.findMany()
  }
}
