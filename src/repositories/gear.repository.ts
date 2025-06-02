import { BaseRepository } from './base.repository'
import type { Gear } from '@prisma/client'

export class GearRepository extends BaseRepository {
  async getGearRow(gearId: string): Promise<Gear | null> {
    return this.prisma.gear.findUnique({
      where: { gearId }
    })
  }

  async getGear(gearId: string) {
    return this.prisma.gear.findUnique({
      where: { gearId },
      include: {
        gearCategory: true
      }
    })
  }

  async getAllGears() {
    return this.prisma.gear.findMany({ include: { gearCategory: true } })
  }
}
