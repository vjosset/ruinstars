import { UnitType } from '@/types/unitType.model'
import { UnitTypeRepository } from '@/src/repositories/unitType.repository'

export class UnitTypeService {
  private static repository = new UnitTypeRepository()

  static async getUnitTypeRow(unitTypeId: string): Promise<UnitType | null> {
    return this.repository.getUnitTypeRow(unitTypeId)
  }

  static async getUnitType(unitTypeId: string): Promise<UnitType | null> {
    return this.repository.getUnitType(unitTypeId)
  }

  static async getAllUnitTypes(): Promise<UnitType[]> {
    return this.repository.getAllUnitTypes()
  }
}
