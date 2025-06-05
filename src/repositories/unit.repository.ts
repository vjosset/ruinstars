import { BaseRepository } from './base.repository'
import type { Unit } from '@prisma/client'

export class UnitRepository extends BaseRepository {
  async getUnitRow(unitId: string): Promise<Unit | null> {
    return this.prisma.unit.findUnique({
      where: { unitId }
    })
  }

  async getUnit(unitId: string) {
    return this.prisma.unit.findUnique({
      where: { unitId },
      include: {
        squad: true,
        unitType: true,
      }
    })
  }

  async createUnit(data: Partial<Unit>) {
    return this.prisma.unit.create({
      data: {
        unitId: data.unitId ?? '',
        currHIT: data.currHIT ?? 0,
        unitName: data.unitName ?? '',
        seq: data.seq,
        gearIds: data.gearIds,
        medalIds: data.medalIds ?? '',
        squad: {
          connect: {
            squadId: data.squadId
          }
        },
        unitType: {
          connect: {
            unitTypeId: data.unitTypeId
          }
        },
      }
    })
  }

  async updateUnit(unitId: string, data: Partial<Unit>) {
    return this.prisma.unit.update({
      where: { unitId },
      data
    })
  }

  async deleteUnit(unitId: string) {
    return this.prisma.unit.delete({
      where: { unitId }
    })
  }
}
