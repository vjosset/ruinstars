import { GearCategory } from '@/types/gearCategory.model'
import { GearCategoryRepository } from '@/src/repositories/gear-category.repository'

export class GearCategoryService {
  private static repository = new GearCategoryRepository()

  static async getGearCategoryRow(gearCategoryId: string): Promise<GearCategory | null> {
    return this.repository.getGearCategoryRow(gearCategoryId)
  }

  static async getGearCategory(gearCategoryId: string): Promise<GearCategory | null> {
    return this.repository.getGearCategory(gearCategoryId)
  }

  static async getAllGearCategories(): Promise<GearCategory[]> {
    return this.repository.getAllGearCategories()
  }
}
