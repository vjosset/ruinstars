import { Gear, Unit, UnitType } from '@/types'
import { GearRepository } from '@/src/repositories/gear.repository'
import { SpecialService } from './special.service'
import { resolveGearDescription } from '@/lib/utils/gearDescriptions'

export class GearService {
  private static repository = new GearRepository()

  static async getGearRow(gearId: string): Promise<Gear | null> {
    return this.repository.getGearRow(gearId)
  }

  static async getGear(gearId: string): Promise<Gear | null> {
    const gear = await this.repository.getGear(gearId)
    if (!gear) return null

    const allSpecials = await SpecialService.getAllSpecials()
    gear.description = resolveGearDescription(gear.description, allSpecials)
    return gear
  }

  static async getAllGears(): Promise<Gear[]> {
    const gears = await this.repository.getAllGears()
    const allSpecials = await SpecialService.getAllSpecials()

    return gears.map(gear => {
      gear.description = resolveGearDescription(gear.description, allSpecials)
      return gear
    })
  }

  static async loadUnitGear(unit: Unit): Promise<Gear[]> {

    if (!unit.gearIds) return []
    
    const gearIds = unit.gearIds.split(',').filter(gearId => gearId.trim())
    
    if (gearIds.length === 0) return []

    const allGears = await this.getAllGears()

    unit.gears = gearIds
      .map(gearId => allGears.find(gear => gear.gearId === gearId))
      .filter((gear): gear is Gear => gear !== undefined)
    
    unit.weapons = unit.gears.filter(gear => gear.gearType === 'W')
    unit.skills = unit.gears.filter(gear => gear.gearType !== 'W')

    return unit.gears
  }

  static async loadUnitTypeGear(unitType: UnitType): Promise<Gear[]> {
    if (!unitType.gearIds) return []
    
    const gearIds = unitType.gearIds.split(',').filter(gearId => gearId.trim())
    
    if (gearIds.length === 0) return []

    const allGears = await this.getAllGears()
    unitType.gears = gearIds
      .map(gearId => allGears.find(gear => gear.gearId === gearId))
      .filter((gear): gear is Gear => gear !== undefined)
    
    unitType.weapons = unitType.gears.filter(gear => gear.gearType === 'W')
    unitType.skills = unitType.gears.filter(gear => gear.gearType !== 'W')
    
    return unitType.gears
  }
}
