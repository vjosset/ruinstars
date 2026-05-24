import { BaseRepository } from './base.repository'
import type { Prisma, Unit as PrismaUnit } from '@prisma/client'
import { Squad, Unit, UnitType } from '@/types'

type UnitCtorInput = ConstructorParameters<typeof Unit>[0]
type PrismaUnitWithRelations = Prisma.UnitGetPayload<{
  include: {
    squad: true
    unitType: true
  }
}>

export class UnitRepository extends BaseRepository {
  async getUnitRow(unitId: string): Promise<Unit | null> {
    const row = await this.prisma.unit.findUnique({
      where: { unitId }
    })

    return row ? new Unit(this.toUnitCtorInput(row)) : null
  }

  async getUnit(unitId: string): Promise<Unit | null> {
    const row = await this.prisma.unit.findUnique({
      where: { unitId },
      include: {
        squad: true,
        unitType: true,
      }
    })

    return row ? new Unit(this.toUnitCtorInput(row)) : null
  }

  async createUnit(data: Partial<Unit>): Promise<Unit> {
    const row = await this.prisma.unit.create({
      data: this.toCreateInput(data)
    })

    return new Unit(this.toUnitCtorInput(row))
  }

  async updateUnit(unitId: string, data: Partial<Unit>): Promise<Unit> {
    const row = await this.prisma.unit.update({
      where: { unitId },
      data: this.toUpdateInput(data)
    })

    return new Unit(this.toUnitCtorInput(row))
  }

  async deleteUnit(unitId: string) {
    return this.prisma.unit.delete({
      where: { unitId }
    })
  }

  private toUnitCtorInput(row: PrismaUnitWithRelations | PrismaUnit): UnitCtorInput {
    return {
      unitId: row.unitId,
      squadId: row.squadId,
      seq: row.seq ?? 0,
      unitName: row.unitName,
      unitTypeId: row.unitTypeId,
      currHIT: row.currHIT ?? 0,
      isActivated: row.isActivated ?? false,
      hasCustomPortrait: row.hasCustomPortrait ?? false,
      portraitUpdatedAt: row.portraitUpdatedAt ?? undefined,
      gearIds: row.gearIds ?? null,
      medalIds: row.medalIds ?? null,
      squad: 'squad' in row && row.squad
        ? new Squad({
          ...row.squad,
          description: row.squad.description,
          notes: row.squad.notes,
          spawnTable: row.squad.spawnTable,
          portraitUpdatedAt: row.squad.portraitUpdatedAt ?? undefined,
          eloRating: row.squad.eloRating ?? undefined,
          campaign: row.squad.campaign
        })
        : null,
      unitType: 'unitType' in row && row.unitType
        ? new UnitType({
          ...row.unitType,
          description: row.unitType.description,
          gearIds: row.unitType.gearIds
        })
        : null
    }
  }

  private toCreateInput(data: Partial<Unit>): Prisma.UnitUncheckedCreateInput {
    if (!data.unitId || !data.squadId || !data.unitTypeId || data.seq === undefined) {
      throw new Error('Missing required unit fields for create')
    }

    return {
      unitId: data.unitId,
      squadId: data.squadId,
      unitTypeId: data.unitTypeId,
      seq: data.seq,
      unitName: data.unitName ?? '',
      currHIT: data.currHIT ?? 0,
      isActivated: data.isActivated ?? false,
      hasCustomPortrait: data.hasCustomPortrait ?? false,
      portraitUpdatedAt: data.portraitUpdatedAt,
      gearIds: data.gearIds ?? null,
      medalIds: data.medalIds ?? null
    }
  }

  private toUpdateInput(data: Partial<Unit>): Prisma.UnitUncheckedUpdateInput {
    const input: Prisma.UnitUncheckedUpdateInput = {}

    if (data.squadId !== undefined) input.squadId = data.squadId
    if (data.seq !== undefined) input.seq = data.seq
    if (data.unitName !== undefined) input.unitName = data.unitName
    if (data.unitTypeId !== undefined) input.unitTypeId = data.unitTypeId
    if (data.currHIT !== undefined) input.currHIT = data.currHIT
    if (data.isActivated !== undefined) input.isActivated = data.isActivated
    if (data.hasCustomPortrait !== undefined) input.hasCustomPortrait = data.hasCustomPortrait
    if (data.portraitUpdatedAt !== undefined) input.portraitUpdatedAt = data.portraitUpdatedAt
    if (data.gearIds !== undefined) input.gearIds = data.gearIds ?? null
    if (data.medalIds !== undefined) input.medalIds = data.medalIds ?? null

    return input
  }
}
