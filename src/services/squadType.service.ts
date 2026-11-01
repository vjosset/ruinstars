import { SquadTypeRepository } from '@/src/repositories/squadType.repository'
import { SquadType } from '@/types'
import { GearService } from './gear.service'
import { UnitService } from './unit.service'
import { SquadService } from './squad.service'

export class SquadTypeService {
  private static repository = new SquadTypeRepository()

  static async getSquadTypeRow(squadTypeId: string): Promise<SquadType | null> {
    return this.repository.getSquadTypeRow(squadTypeId)
  }

  static async getSquadType(squadTypeId: string): Promise<SquadType | null> {
    const squadType = await this.repository.getSquadType(squadTypeId)
    
    if (!squadType) return null

    // Load the gear table once and share it across every unitType and unit on the page
    const allGears = await GearService.getAllGears()

    await Promise.all(squadType.unitTypes?.map(async unitType => {
      await GearService.loadUnitTypeGear(unitType, allGears)
    }))

    if (squadType.spotlights?.length) {
      await Promise.all(squadType.spotlights.map(async squad => {
        if (!squad.units?.length) return

        await Promise.all(squad.units.map(async unit => {
          await GearService.loadUnitGear(unit, allGears)
          await UnitService.applyGearMods(unit)
        }))
      }))
    }

    // Ensure default squad is included first in spotlights (getSquad already loads its units' gear)
    if (squadType.defaultSquadId && !squadType.spotlights?.some(s => s.squadId === squadType.defaultSquadId)) {
      const defaultSquad = await SquadService.getSquad(squadType.defaultSquadId, allGears)
      if (defaultSquad) {
        if (!squadType.spotlights) squadType.spotlights = []
        squadType.spotlights = [defaultSquad, ...squadType.spotlights]
      }
    }

    return squadType
  }

  static async getAllSquadTypes(): Promise<SquadType[]> {
    return this.repository.getAllSquadTypes()
  }
}
