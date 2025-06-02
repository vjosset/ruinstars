// @ts-nocheck
import { GearCategory } from '@/types/gearCategory.model'
import { GearCategoryRepository } from '@/src/repositories/gear-category.repository'

export class GearCategoryService {
  private static repository = new GearCategoryRepository()

  static async getGearCategoryRow(gearCategoryId: string): Promise<GearCategory | null> {
    const gearCategory = await this.repository.getGearCategoryRow(gearCategoryId)
    return gearCategory ? new GearCategory(gearCategory) : null
  }

  static async getGearCategory(gearCategoryId: string): Promise<GearCategory | null> {
    const gearCategory = await this.repository.getGearCategory(gearCategoryId)
    return gearCategory ? new GearCategory(gearCategory) : null
  }

  static async getAllGearCategories(): Promise<GearCategory[]> {
    const gearCategories = await this.repository.getAllGearCategories()
    return gearCategories.map(gearCategory => new GearCategory(gearCategory))
  }
}
