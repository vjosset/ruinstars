// @ts-nocheck
import { SquadTypeRepository } from '@/src/repositories/squadType.repository'
import { SquadType } from '@/types'
import { GearService } from './gear.service'
import { MedalService } from './medal.service'
import { UnitService } from './unit.service'
import { SquadService } from './squad.service'

export class SquadTypeService {
  private static repository = new SquadTypeRepository()

  static async getSquadTypeRow(squadTypeId: string): Promise<SquadType | null> {
    const squadType = await this.repository.getSquadTypeRow(squadTypeId)
    return squadType ? new SquadType(squadType) : null
  }

  static async getSquadType(squadTypeId: string): Promise<SquadType | null> {
    const squadType = await this.repository.getSquadType(squadTypeId)
    
    if (!squadType) return null

    await Promise.all(squadType.unitTypes?.map(async unitType => {
      await GearService.loadUnitGear(unitType)
    }))

    if (squadType.spotlights?.length) {
      await Promise.all(squadType.spotlights.map(async squad => {
        if (!squad.units?.length) return

        await Promise.all(squad.units.map(async unit => {
          await GearService.loadUnitGear(unit)
          await MedalService.loadUnitMedals(unit)
          await UnitService.applyGearMods(unit)
        }))
      }))
    }

    // Ensure default squad is included first in spotlights
    if (squadType.defaultSquadId && !squadType.spotlights?.some(s => s.squadId === squadType.defaultSquadId)) {
      const defaultSquad = await SquadService.getSquad(squadType.defaultSquadId)
      if (defaultSquad) {
        if (!squadType.spotlights) squadType.spotlights = []
        squadType.spotlights = [defaultSquad, ...squadType.spotlights]

        if (defaultSquad.units?.length) {
          await Promise.all(defaultSquad.units.map(async unit => {
            await GearService.loadUnitGear(unit)
            await MedalService.loadUnitMedals(unit)
            await UnitService.applyGearMods(unit)
          }))
        }
      }
    }

    return squadType ? new SquadType(squadType) : null
  }

  static async getAllSquadTypes(): Promise<SquadType[]> {
    const squadTypes = await this.repository.getAllSquadTypes()
    return squadTypes.map(squadType => new SquadType(squadType))
  }
}
