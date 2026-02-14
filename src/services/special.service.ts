import { Special } from '@/types/special.model'
import { SpecialRepository } from '@/src/repositories/special.repository'

export class SpecialService {
  private static repository = new SpecialRepository()

  static async getSpecialRow(specialId: string): Promise<Special | null> {
    return this.repository.getSpecialRow(specialId)
  }

  static async getSpecial(specialId: string): Promise<Special | null> {
    return this.repository.getSpecial(specialId)
  }

  static async getAllSpecials(): Promise<Special[]> {
    return this.repository.getAllSpecials()
  }
}
