import { BaseRepository } from './base.repository'
import type { Battlefield } from '@prisma/client'

export class BattlefieldRepository extends BaseRepository {
  async getBattlefieldRow(battlefieldId: number): Promise<Battlefield | null> {
    return this.prisma.battlefield.findUnique({
      where: { battlefieldId }
    })
  }

  async getBattlefield(battlefieldId: number) {
    return this.prisma.battlefield.findUnique({
      where: { battlefieldId }
    })
  }

  async getAllBattlefields() {
    return this.prisma.battlefield.findMany({
      orderBy: { battlefieldId: 'asc' },
    })
  }
}
