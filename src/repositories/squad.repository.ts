// @ts-nocheck
import { BaseRepository } from './base.repository'
import type { Squad } from '@prisma/client'

export class SquadRepository extends BaseRepository {
  async getSquadRow(squadId: string): Promise<Squad | null> {
    return await this.prisma.squad.findUnique({
      where: { squadId }
    })
  }

  async getSquad(squadId: string): Promise<Squad | null> {
    return await this.prisma.squad.findUnique({
      where: { squadId },
      include: {
        faction: true,
        user: true,
        units: {
          include: {
            unitType: true
          },
          orderBy: {seq: 'asc'}
        }
      }
    })
  }

  async createSquad(data: Partial<Squad>): Promise<Squad> {
    return await this.prisma.squad.create({ data })
  }

  async updateSquad(squadId: string, data: Partial<Squad>): Promise<Squad | null> {
    return await this.prisma.squad.update({
      where: { squadId },
      data
    })
  }

  async deleteSquad(squadId: string): Promise<void> {
    await this.prisma.squad.delete({ where: { squadId } })
  }

  async resetSquadActivation(squadId: string): Promise<void> {
    await this.prisma.unit.updateMany({
      where: { squadId },
      data: { isActivated: false }
    })
  }
}
