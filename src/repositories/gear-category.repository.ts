import { BaseRepository } from './base.repository'
import type { GearCategory } from '@prisma/client'

export class GearCategoryRepository extends BaseRepository {
  async getGearCategoryRow(gearCategoryId: string): Promise<GearCategory | null> {
    return this.prisma.gearCategory.findUnique({
      where: { gearCategoryId }
    })
  }

  async getGearCategory(gearCategoryId: string) {
    return this.prisma.gearCategory.findUnique({
      where: { gearCategoryId },
      include: {
        gears: {
          orderBy: [ { seq: 'asc' }, { gearName: 'asc' } ]
        }
      }
    })
  }

  async getAllGearCategories() {
    return this.prisma.gearCategory.findMany()
  }
}
