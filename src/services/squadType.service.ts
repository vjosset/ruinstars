// @ts-nocheck
import { SquadTypeRepository } from '@/src/repositories/squadType.repository'
import { SquadType } from '@/types'
import { GearService } from './gear.service'

export class SquadTypeService {
  private static repository = new SquadTypeRepository()

  static async getSquadTypeRow(squadTypeId: string): Promise<SquadType | null> {
    const squadType = await this.repository.getSquadTypeRow(squadTypeId)
    return squadType ? new SquadType(squadType) : null
  }

  static async getSquadType(squadTypeId: string): Promise<SquadType | null> {
    const squadType = await this.repository.getSquadType(squadTypeId)
    await Promise.all(squadType.unitTypes.map(async unitType => {
      await GearService.loadUnitGear(unitType)
    }))
    return squadType ? new SquadType(squadType) : null
  }

  static async getAllSquadTypes(): Promise<SquadType[]> {
    const squadTypes = await this.repository.getAllSquadTypes()
    return squadTypes.map(squadType => new SquadType(squadType))
  }
}
