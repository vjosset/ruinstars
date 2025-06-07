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

  static async loadUnitMedals(unit: Unit): Promise<Medal[]> {

    if (!unit.medalIds) return []
    
    const medalIds = unit.medalIds.split(',').filter(medalId => medalId.trim())
    
    if (medalIds.length === 0) return []

    const allMedals = await this.getAllMedals()

    unit.medals = medalIds
      .map(medalId => allMedals.find(medal => medal.medalId === medalId))
      .filter((medal): medal is Medal => medal !== undefined)

    return unit.medals
  }
}
