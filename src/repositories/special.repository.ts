import { BaseRepository } from './base.repository'
import { Special } from '@/types/special.model'

export class SpecialRepository extends BaseRepository {
  async getSpecialRow(specialId: string): Promise<Special | null> {
    const row = await this.prisma.special.findUnique({
      where: { specialId }
    })

    return row
      ? new Special({
        specialId: row.specialId,
        scope: row.scope,
        code: row.code,
        specialName: row.specialName,
        description: row.description ?? ''
      })
      : null
  }

  async getSpecial(specialId: string): Promise<Special | null> {
    const row = await this.prisma.special.findUnique({
      where: { specialId }
    })

    return row
      ? new Special({
        specialId: row.specialId,
        scope: row.scope,
        code: row.code,
        specialName: row.specialName,
        description: row.description ?? ''
      })
      : null
  }

  async getAllSpecials(): Promise<Special[]> {
    const rows = await this.prisma.special.findMany()
    return rows.map(row => new Special({
      specialId: row.specialId,
      scope: row.scope,
      code: row.code,
      specialName: row.specialName,
      description: row.description ?? ''
    }))
  }
}
