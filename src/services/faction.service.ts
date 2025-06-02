// @ts-nocheck
import { Faction } from '@/types'
import { FactionRepository } from '@/src/repositories/faction.repository'
import { GearService } from './gear.service'

export class FactionService {
  private static repository = new FactionRepository()

  static async getFactionRow(factionId: string): Promise<Faction | null> {
    const faction = await this.repository.getFactionRow(factionId)
    return faction ? new Faction(faction) : null
  }

  static async getFaction(factionId: string): Promise<Faction | null> {
    const faction = await this.repository.getFaction(factionId)
    await Promise.all(faction.unitTypes.map(async unitType => {
      await GearService.loadUnitGear(unitType)
    }))
    return faction ? new Faction(faction) : null
  }

  static async getAllFactions(): Promise<Faction[]> {
    const factions = await this.repository.getAllFactions()
    return factions.map(faction => new Faction(faction))
  }
}
