import { Faction, SquadType } from '@/types'
import { BaseRepository } from './base.repository'

export class FactionRepository extends BaseRepository {
  async getFactionRow(factionId: string): Promise<Faction | null> {
    const row = await this.prisma.faction.findUnique({
      where: { factionId }
    })

    return row
      ? new Faction({
        factionId: row.factionId,
        seq: row.seq,
        factionName: row.factionName,
        tagline: row.tagline,
        description: row.description,
        lore: row.lore,
        squadTypes: []
      })
      : null
  }

  async getFaction(factionId: string): Promise<Faction | null> {
    const row = await this.prisma.faction.findUnique({
      where: { factionId },
      include: {
        squadTypes: {
          where: {
            isPublished: true
          },
          orderBy: [
            {seq: 'asc'},
            {squadTypeName: 'asc'}
          ]
        }
      }
    })

    if (!row) return null

    return new Faction({
      factionId: row.factionId,
      seq: row.seq,
      factionName: row.factionName,
      tagline: row.tagline,
      description: row.description,
      lore: row.lore,
      squadTypes: row.squadTypes.map(squadType => new SquadType({
        ...squadType,
        defaultSquadId: squadType.defaultSquadId ?? null,
        faction: new Faction({
          factionId: row.factionId,
          seq: row.seq,
          factionName: row.factionName,
          tagline: row.tagline,
          description: row.description,
          lore: row.lore,
          squadTypes: []
        }),
        unitTypes: [],
        defaultSquad: null,
        spotlights: []
      }))
    })
  }

  async getAllFactions(): Promise<Faction[]> {
    const rows = await this.prisma.faction.findMany({
      include: {
        squadTypes: {
          where: {
            isPublished: true
          },
          orderBy: [
            {seq: 'asc'},
            {squadTypeName: 'asc'}
          ]
        }
      },
      orderBy: { seq: 'asc' },
    })

    return rows.map(row => new Faction({
      factionId: row.factionId,
      seq: row.seq,
      factionName: row.factionName,
      tagline: row.tagline,
      description: row.description,
      lore: row.lore,
      squadTypes: row.squadTypes.map(squadType => new SquadType({
        ...squadType,
        defaultSquadId: squadType.defaultSquadId ?? null,
        faction: new Faction({
          factionId: row.factionId,
          seq: row.seq,
          factionName: row.factionName,
          tagline: row.tagline,
          description: row.description,
          lore: row.lore,
          squadTypes: []
        }),
        unitTypes: [],
        defaultSquad: null,
        spotlights: []
      }))
    }))
  }
}
