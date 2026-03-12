import { Faction, SquadType, UnitType } from '@/types'
import { BaseRepository } from './base.repository'

export class UnitTypeRepository extends BaseRepository {
  async getUnitTypeRow(unitTypeId: string): Promise<UnitType | null> {
    const row = await this.prisma.unitType.findUnique({
      where: { unitTypeId }
    })

    return row
      ? new UnitType({
        ...row,
        description: row.description ?? null,
        gearIds: row.gearIds ?? undefined,
        gears: null,
        weapons: null,
        skills: null,
        squadType: null
      })
      : null
  }

  async getUnitType(unitTypeId: string): Promise<UnitType | null> {
    const row = await this.prisma.unitType.findUnique({
      where: { unitTypeId },
      include: {
        squadType: {
          include: {
            faction: true
          }
        }
      }
    })

    if (!row) return null

    return new UnitType({
      ...row,
      description: row.description ?? null,
      gearIds: row.gearIds ?? undefined,
      gears: null,
      weapons: null,
      skills: null,
      squadType: row.squadType
        ? new SquadType({
          ...row.squadType,
          defaultSquadId: row.squadType.defaultSquadId ?? null,
          faction: new Faction({
            ...row.squadType.faction,
            squadTypes: []
          }),
          unitTypes: [],
          defaultSquad: null,
          spotlights: []
        })
        : null
    })
  }

  async getAllUnitTypes(): Promise<UnitType[]> {
    const rows = await this.prisma.unitType.findMany()
    return rows.map(row => new UnitType({
      ...row,
      description: row.description ?? null,
      gearIds: row.gearIds ?? undefined,
      gears: null,
      weapons: null,
      skills: null,
      squadType: null
    }))
  }
}
