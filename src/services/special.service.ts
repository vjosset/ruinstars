// @ts-nocheck
import { Special } from '@/types/special.model'
import { SpecialRepository } from '@/src/repositories/special.repository'

export class SpecialService {
  private static repository = new SpecialRepository()

  static async getSpecialRow(specialId: string): Promise<Special | null> {
    const special = await this.repository.getSpecialRow(specialId)
    return special ? new Special(special) : null
  }

  static async getSpecial(specialId: string): Promise<Special | null> {
    const special = await this.repository.getSpecial(specialId)
    return special ? new Special(special) : null
  }

  static async getAllSpecials(): Promise<Special[]> {
    const specials = await this.repository.getAllSpecials()
    return specials.map(special => new Special(special))
  }
}
