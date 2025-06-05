// @ts-nocheck
import { Unit, Squad, UnitType, Medal } from '@/types'
import { UnitRepository } from '@/src/repositories/unit.repository'
import { nanoid } from 'nanoid'
import { GearService } from './gear.service'
import { MedalService } from './medal.service'

export class UnitService {
  private static repository = new UnitRepository()

  static async getUnitRow(unitId: string): Promise<Unit | null> {
    const unit = await this.repository.getUnitRow(unitId)
    return unit ? new Unit(unit) : null
  }

  static async getUnit(unitId: string): Promise<Unit | null> {
    const raw = await this.repository.getUnit(unitId)
    if (!raw) return null

    const unit = raw ? new Unit(raw) : null
    await GearService.loadUnitGear(unit)

    await MedalService.loadUnitMedals(unit)

    unit.weapons = unit.gears.filter(gear => gear.gearType == "W")
    unit.skills = unit.gears.filter(gear => gear.gearType != "W")
    
    // Now that we have the unit's gear loaded, let's apply the mods
    this.applyGearMods(unit)

    return unit
  }

  static async createUnit(data: Partial<Unit>): Promise<Unit | null> {
    data.unitId = nanoid(8)
    const raw = await this.repository.createUnit(data)
    if (!raw) throw new Error('Failed to create unit')
    return await this.getUnit(data.unitId)
  }

  static async updateUnit(unitId: string, data: Partial<Unit>): Promise<Unit | null> {
    const unit = await this.repository.updateUnit(unitId, data)
    return await this.getUnit(unitId)
  }

  static async deleteUnit(unitId: string): Promise<void> {
    await this.repository.deleteUnit(unitId)
  }
  
  static applyGearMods(unit: Unit): void {
    // First, copy base stats from UnitType to this Unit
    unit.ACT = unit.unitType?.ACT
    unit.MOV = unit.unitType?.MOV
    unit.MSK = unit.unitType?.MSK
    unit.RSK = unit.unitType?.RSK
    unit.ARM = unit.unitType?.ARM
    unit.HIT = unit.unitType?.HIT

    if (!unit.gears?.length) return

    // Now parse each gear for effects
    unit.gears.forEach(gear => {
      if (!gear.effects) return
      const effects = gear.effects.split(',')

      effects.forEach(effect => {
        const params = effect.trim().split(':')

        switch (params[0]) {
          case 'UNIT':
            switch (params[1]) {
              case 'ACT':
                unit.ACT = Math.min(unit.ACT + Number(params[2]), 5)
                break
              case 'MOV':
                unit.MOV = Math.min(unit.MOV + Number(params[2]), 5)
                break
              case 'MSK':
                unit.MSK = Math.min(unit.MSK + Number(params[2]), 5)
                break
              case 'RSK':
                unit.RSK = Math.min(unit.RSK + Number(params[2]), 5)
                break
              case 'ARM':
                unit.ARM = Math.min(unit.ARM + Number(params[2]), 5)
                break
              case 'HIT':
                unit.HIT += Number(params[2])
                break
              case 'SPECIAL':
                if (params[2].startsWith('-')) {
                  unit.special = unit.special?.replace(params[2].substring(1), '').trim()
                } else {
                  if (!unit.special?.includes(params[2])) {
                    unit.special = `${unit.special || ''} ${params[2]}`.trim()
                  }
                }
                break
            }
            break

          case 'WEPTYPE':
            unit.weapons?.forEach(weapon => {
              if (weapon.gearType === 'W' && weapon.TYP === params[1]) {
                this.applyWeaponMod(weapon, params[2], params[3])
              }
            })
            break

          case 'WEPNAME':
            unit.weapons?.forEach(weapon => {
              if (weapon.gearType === 'W' &&
                  weapon.gearName.toLowerCase().includes(params[1].toLowerCase())) {
                this.applyWeaponMod(weapon, params[2], params[3])
              }
            })
            break

          case 'WEPID':
            unit.weapons?.forEach(weapon => {
              if (weapon.gearType === 'W' &&
                  weapon.gearId.toLowerCase().includes(params[1].toLowerCase())) {
                this.applyWeaponMod(weapon, params[2], params[3])
              }
            })
            break
        }
      })
    })

    unit.special = unit.special?.trim()
    unit.gears?.forEach(gear => {
      gear.special = gear.special?.trim()
    })
  }

  private static applyWeaponMod(weapon: Gear, field: string, value: string): void {
    switch (field) {
      case 'ROA':
        weapon.ROA = (weapon.ROA || 0) + Number(value)
        break
      case 'SKL':
        weapon.SKL = (weapon.SKL || 0) + Number(value)
        break
      case 'ATT':
        weapon.ATT = (weapon.ATT || 0) + Number(value)
        break
      case 'SPECIAL':
        if (value.startsWith('-')) {
          weapon.special = weapon.special?.replace(value.substring(1), '').trim()
        } else {
          if (!weapon.special?.includes(value)) {
            weapon.special = `${weapon.special || ''} ${value}`.trim()
          }
        }
        break
    }
  }
}
