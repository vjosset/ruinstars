import { BaseRepository } from './base.repository'
import { Gear, GearCategory } from '@/types'

export class GearCategoryRepository extends BaseRepository {
  async getGearCategoryRow(gearCategoryId: string): Promise<GearCategory | null> {
    const row = await this.prisma.gearCategory.findUnique({
      where: { gearCategoryId }
    })

    return row
      ? new GearCategory({
        gearCategoryId: row.gearCategoryId,
        gearCategoryName: row.gearCategoryName,
        description: row.description,
        seq: row.seq,
        isNarrative: row.isNarrative,
        gears: []
      })
      : null
  }

  async getGearCategory(gearCategoryId: string): Promise<GearCategory | null> {
    const row = await this.prisma.gearCategory.findUnique({
      where: { gearCategoryId },
      include: {
        gears: {
          orderBy: [ { seq: 'asc' }, { gearName: 'asc' } ]
        }
      }
    })

    return row
      ? new GearCategory({
        gearCategoryId: row.gearCategoryId,
        gearCategoryName: row.gearCategoryName,
        description: row.description,
        seq: row.seq,
        isNarrative: row.isNarrative,
        gears: row.gears.map(gear => new Gear({
          ...gear,
          gearCategory: undefined
        }))
      })
      : null
  }

  async getAllGearCategories(): Promise<GearCategory[]> {
    const rows = await this.prisma.gearCategory.findMany()
    return rows.map(row => new GearCategory({
      gearCategoryId: row.gearCategoryId,
      gearCategoryName: row.gearCategoryName,
      description: row.description,
      seq: row.seq,
      isNarrative: row.isNarrative,
      gears: []
    }))
  }
}
