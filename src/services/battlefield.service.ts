// @ts-nocheck
import { Battlefield } from '@/types'
import { BattlefieldRepository } from '@/src/repositories/battlefield.repository'

export class BattlefieldService {
  private static repository = new BattlefieldRepository()

  static async getBattlefieldRow(battlefieldId: number): Promise<Battlefield | null> {
    const battlefield = await this.repository.getBattlefieldRow(battlefieldId)
    return battlefield ? new Battlefield(battlefield) : null
  }

  static async getBattlefield(battlefieldId: number): Promise<Battlefield | null> {
    const battlefield = await this.repository.getBattlefield(battlefieldId)
    return battlefield ? new Battlefield(battlefield) : null
  }

  static async getAllBattlefields(): Promise<Battlefield[]> {
    const battlefields = await this.repository.getAllBattlefields()
    return battlefields.map(battlefield => new Battlefield(battlefield))
  }
}
