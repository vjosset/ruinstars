// @ts-nocheck
import { UnitType } from '@/types/unitType.model'
import { UnitTypeRepository } from '@/src/repositories/unitType.repository'

export class UnitTypeService {
  private static repository = new UnitTypeRepository()

  static async getUnitTypeRow(unitTypeId: string): Promise<UnitType | null> {
    const unitType = await this.repository.getUnitTypeRow(unitTypeId)
    return unitType ? new UnitType(unitType) : null
  }

  static async getUnitType(unitTypeId: string): Promise<UnitType | null> {
    const unitType = await this.repository.getUnitType(unitTypeId)
    return unitType ? new UnitType(unitType) : null
  }

  static async getAllUnitTypes(): Promise<UnitType[]> {
    const unitTypes = await this.repository.getAllUnitTypes()
    return unitTypes.map(unitType => new UnitType(unitType))
  }
}
