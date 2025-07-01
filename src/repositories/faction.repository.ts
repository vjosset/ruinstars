import type { Faction } from '@prisma/client'
import { BaseRepository } from './base.repository'

export class FactionRepository extends BaseRepository {
  async getFactionRow(factionId: string): Promise<Faction | null> {
    return this.prisma.faction.findUnique({
      where: { factionId }
    })
  }

  async getFaction(factionId: string) {
    return this.prisma.faction.findUnique({
      where: { factionId },
      include: {
        squadTypes: {
          orderBy: [
            {seq: 'asc'},
            {squadTypeName: 'asc'}
          ]
        }
      }
    })
  }

  async getAllFactions() {
    return this.prisma.faction.findMany({
      include: { squadTypes: true },
      orderBy: { seq: 'asc' },
    })
  }
}
