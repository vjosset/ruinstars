// @ts-nocheck
import { Gear, Unit, UnitType, GearCategory } from '@/types'
import { GearRepository } from '@/src/repositories/gear.repository'

export class GearService {
  private static repository = new GearRepository()

  static async getGearRow(gearId: string): Promise<Gear | null> {
    const gear = await this.repository.getGearRow(gearId)
    return gear ? new Gear(gear) : null
  }

  static async getGear(gearId: string): Promise<Gear | null> {
    const gear = await this.repository.getGear(gearId)
    return gear ? new Gear(gear) : null
  }

  static async getAllGears(): Promise<Gear[]> {
    const gears = await this.repository.getAllGears()

    // Convert the raw Prisma objects to Gear instances
    return gears.map(gear => {
      // Ensure gearCategory is properly instantiated
      const gearWithCategory = {
        ...gear,
        gearCategory: gear.gearCategory ? new GearCategory(gear.gearCategory) : undefined
      }
      return new Gear(gearWithCategory)
    })
  }

  static async loadUnitGear(unit: Unit): Promise<Gear[]> {

    if (!unit.gearIds) return []
    
    const gearIds = unit.gearIds.split(',').filter(gearId => gearId.trim());
    
    if (gearIds.length === 0) return []

    const allGears = await this.getAllGears();

    unit.gears = gearIds
        .map(gearId => allGears.find(gear => gear.gearId === gearId))
        .filter((gear): gear is Gear => gear !== undefined);
    
    unit.weapons = unit.gears.filter(gear => gear.gearType === "W");
    unit.skills = unit.gears.filter(gear => gear.gearType !== "W");

    return unit.gears;
  }

  static async loadUnitTypeGear(unitType: UnitType): Promise<Gear[]> {
    if (!unitType.gearIds) return []
    
    const gearIds = unitType.gearIds.split(',').filter(gearId => gearId.trim())
    
    if (gearIds.length === 0) return []

    const allGears = await this.getAllGears()
    unitType.gears = gearIds
      .map(gearId => allGears.find(gear => gear.gearId === gearId))
      .filter((gear): gear is Gear => gear !== undefined)
    
    unit.weapons = unit.gears.filter(gear => gear.gearType == "W")
    unit.skills = unit.gears.filter(gear => gear.gearType != "W")
    
    return unitType.gears
  }
}
