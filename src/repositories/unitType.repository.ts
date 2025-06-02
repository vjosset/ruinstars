import { BaseRepository } from './base.repository'
import type { UnitType } from '@prisma/client'

export class UnitTypeRepository extends BaseRepository {
  async getUnitTypeRow(unitTypeId: string): Promise<UnitType | null> {
    return this.prisma.unitType.findUnique({
      where: { unitTypeId }
    })
  }

  async getUnitType(unitTypeId: string) {
    return this.prisma.unitType.findUnique({
      where: { unitTypeId },
      include: {
        faction: true,
        Unit: true
      }
    })
  }

  async getAllUnitTypes() {
    return this.prisma.unitType.findMany()
  }
}
