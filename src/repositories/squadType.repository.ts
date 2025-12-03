import type { SquadType } from '@prisma/client'
import { BaseRepository } from './base.repository'

export class SquadTypeRepository extends BaseRepository {
  async getSquadTypeRow(squadTypeId: string): Promise<SquadType | null> {
    return this.prisma.squadType.findUnique({
      where: { squadTypeId }
    })
  }

  async getSquadType(squadTypeId: string) {
    return this.prisma.squadType.findUnique({
      where: { squadTypeId },
      include: {
        unitTypes: {
          orderBy: [
            {seq: 'asc'},
            {unitTypeName: 'asc'}
          ]
        },
        defaultSquad: true,
        faction: {
          include: {
            squadTypes: {
              where: { isPublished: true },
              orderBy: { seq: 'asc' },
              include: {
                faction: true
              }
            }
          }
        },
        squads: {
          where: { isSpotlight: true },
          include: {
            user: true,
            units: {
              include: { unitType: true },
              orderBy: { seq: 'asc' }
            }
          },
          orderBy: [
            { seq: 'asc' },
            { squadName: 'asc' }
          ]
        }
      }
    }).then(squadType => {
      if (!squadType) return null
      const { squads, ...rest } = squadType
      return {
        ...rest,
        spotlights: squads
      }
    })
  }

  async getAllSquadTypes() {
    return this.prisma.squadType.findMany({
      include: {
        unitTypes: {
          orderBy: [
            {seq: 'asc'},
            {unitTypeName: 'asc'}
          ]
        },
        defaultSquad: true,
        faction: true
      },
      where: {
        isPublished: true
      },
      orderBy: { seq: 'asc' },
    })
  }
}
