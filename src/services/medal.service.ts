// @ts-nocheck
import { Medal } from '@/types'
import { MedalRepository } from '@/src/repositories/medal.repository'

export class MedalService {
  private static repository = new MedalRepository()

  static async getMedalRow(medalId: string): Promise<Medal | null> {
    const medal = await this.repository.getMedalRow(medalId)
    return medal ? new Medal(medal) : null
  }

  static async getMedal(medalId: string): Promise<Medal | null> {
    const medal = await this.repository.getMedal(medalId)
    return medal ? new Medal(medal) : null
  }

  static async getAllMedals(): Promise<Medal[]> {
    const medals = await this.repository.getAllMedals()
    return medals.map(medal => new Medal(medal))
  }
}
