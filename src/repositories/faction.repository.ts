import { BaseRepository } from './base.repository'
import type { Faction } from '@prisma/client'

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
        unitTypes: {
          orderBy: [
            {seq: 'asc'},
            {unitTypeName: 'asc'}
          ]
        }
      }
    })
  }

  async getAllFactions() {
    return this.prisma.faction.findMany({
      include: { unitTypes: true },
      orderBy: { seq: 'asc' },
    })
  }
}
