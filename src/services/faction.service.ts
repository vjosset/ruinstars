import { FactionRepository } from '@/src/repositories/faction.repository'
import { Faction } from '@/types'

export class FactionService {
  private static repository = new FactionRepository()

  static async getFactionRow(factionId: string): Promise<Faction | null> {
    return this.repository.getFactionRow(factionId)
  }

  static async getFaction(factionId: string): Promise<Faction | null> {
    return this.repository.getFaction(factionId)
  }

  static async getAllFactions(): Promise<Faction[]> {
    return this.repository.getAllFactions()
  }
}
