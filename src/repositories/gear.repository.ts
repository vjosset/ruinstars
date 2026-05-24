import { BaseRepository } from './base.repository'
import { Gear, GearCategory } from '@/types'

export class GearRepository extends BaseRepository {
  async getGearRow(gearId: string): Promise<Gear | null> {
    const row = await this.prisma.gear.findUnique({
      where: { gearId }
    })

    return row ? this.toGear(row) : null
  }

  async getGear(gearId: string): Promise<Gear | null> {
    const row = await this.prisma.gear.findUnique({
      where: { gearId },
      include: {
        gearCategory: true
      }
    })

    return row ? this.toGear(row, row.gearCategory) : null
  }

  async getAllGears(): Promise<Gear[]> {
    const rows = await this.prisma.gear.findMany({ include: { gearCategory: true } })
    return rows.map(row => this.toGear(row, row.gearCategory))
  }

  private toGear(
    row: {
      gearId: string
      gearName: string
      description: string
      flavor: string | null
      gearType: string
      gearCategoryId: string
      seq: number
      GP: number
      TYP: string | null
      ROA: number | null
      ATT: number | null
      ACT: number | null
      TO: number | null
      effects: string | null
      special: string | null
      isDefault: boolean
    },
    gearCategory?: {
      gearCategoryId: string
      gearCategoryName: string
      description: string | null
      seq: number
      isNarrative: boolean
    }
  ): Gear {
    return new Gear({
      ...row,
      gearCategory: gearCategory
        ? new GearCategory({
          gearCategoryId: gearCategory.gearCategoryId,
          gearCategoryName: gearCategory.gearCategoryName,
          description: gearCategory.description,
          seq: gearCategory.seq,
          isNarrative: gearCategory.isNarrative,
          gears: []
        })
        : undefined
    })
  }
}
