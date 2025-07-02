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
        faction: true
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
        faction: true
      },
      orderBy: { seq: 'asc' },
    })
  }
}
