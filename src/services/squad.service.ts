//@ts-nocheck
import { SquadRepository } from '@/src/repositories/squad.repository'
import { Squad } from '@/types'
import fs from 'fs/promises'
import { nanoid } from 'nanoid'
import path from 'path'
import { GearService } from './gear.service'
import { MedalService } from './medal.service'
import { UnitService } from './unit.service'
import { UserService } from './user.service'

export class SquadService {
  private static repository = new SquadRepository()

  static async getSquadRow(squadId: string): Promise<Squad | null> {
    const row = await this.repository.getSquadRow(squadId)
    return row ? new Squad(row) : null
  }

  static async getSquad(squadId: string): Promise<Squad | null> {
    const raw = await this.repository.getSquad(squadId)
    if (!raw) return null
    const squad = raw ? new Squad(raw) : null

    if (squad?.units && squad.units.length > 0) {
      await Promise.all(squad.units.map(async unit => {
        await GearService.loadUnitGear(unit)
        await MedalService.loadUnitMedals(unit)
        await UnitService.applyGearMods(unit)
      }))
    }
    return squad
  }

  static async createSquad(data: Partial<Squad>): Promise<Squad | null> {
    if (!data || !data.userId) throw new Error('No data provided')

    data.squadId = nanoid(8)

    // Always make the new squad the first one in the user's list
    data.seq = -1
    const raw = await this.repository.createSquad(data)
    if (!raw) throw new Error('Failed to create squad')
  
    // Reorder/re-seq the user's squads
    await UserService.fixSquadSeqs(data.userId)

    // Done -  Return latest version of the new squad
    return await this.getSquad(data.squadId)
  }

  static async updateSquad(squadId: string, data: Partial<Squad>): Promise<Squad | null> {
    // Get original squad's state
    const originalSquad = await this.getSquadRow(squadId)

    if (!originalSquad) return null

    // Reset unit activation if this is the next Turn
    const resetSquadActivation = !!data.turn && data.turn > originalSquad.turn
    if (resetSquadActivation) {
      // Next turn - Reset unit activation and squad TOs
      await this.resetSquadActivation(squadId)
      data.TO = 0
    }

    // Apply updates
    const raw = await this.repository.updateSquad(squadId, data)
    if (!raw) throw new Error('Failed to update squad')

    // Get the new squad
    return await this.getSquad(squadId)
  }

  static async deleteSquad(squadId: string): Promise<void> {
    const squad = await this.getSquadRow(squadId)
    if (!squad) return
    await this.repository.deleteSquad(squadId)
    await UserService.fixSquadSeqs(squad.userId)
  }

  static async resetSquadActivation(squadId: string): Promise<Squad | null> {
    await this.repository.resetSquadActivation(squadId)
    return await this.getSquad(squadId)
  }

  static async updateSquadTurn(squadId: string, turn: number): Promise<Squad | null> {
    const squad = await this.getSquad(squadId)
    if (!squad) throw new Error('Squad not found')

    const resetSquadActivation = turn > squad.turn
    if (resetSquadActivation) {
      // Next turn - Reset unit activation
      await this.resetSquadActivation(squadId)
    }

    return await this.getSquad(squadId)
  }

  static async resetSquad(squadId: string): Promise<Squad | null> {
    const squad = await this.getSquad(squadId)
    if (!squad) throw new Error('Squad not found')

    // Reset squad trackers
    await this.repository.updateSquad(squadId, {
      turn: 1,
      MP: 0,
      TO: 0
    })

    if (!squad.units || squad.units.length === 0) return squad
    
    // Reset all units' activation and currHIT
    await Promise.all(squad.units.map(async unit => {
      // If the Unit is Deceased (has GearID INJ-DC), don't reset its HIT
      const newHIT = unit.gearIds?.includes('INJ-DC') ? 0 : unit.HIT
      await UnitService.updateUnit(unit.unitId, { currHIT: newHIT, isActivated: false})
    }))

    // Return the update squad
    return await this.getSquad(squadId)
  }

  static async cloneSquad(sourceSquadId: string, destUserId: string, destSquadName: string): Promise<Squad | null> {
    // Get Squad to clone
    const squadRow = await SquadService.getSquadRow(sourceSquadId)
    if (!squadRow) return null
    
    // Get the full squad
    const squad = await SquadService.getSquad(sourceSquadId)
    if (!squad) return null
    
    // Prepare a deep-copy clone of the squad
    const newSquad = JSON.parse(JSON.stringify(squad))

    // Update its fields
    newSquad.userId = destUserId
    newSquad.name = destSquadName

    // Prepare the units
    for(const unit of newSquad.units) {
      unit.squadId = newSquad.squadId
      unit.unitId = nanoid(8)
    }

    const newSquadRow = {
      userId: destUserId,
      squadTypeId: newSquad.squadTypeId,
      seq: -1,
      squadName: newSquad.name,
    }

    // Now create the squad and its units
    const createdSquad = await SquadService.createSquad(newSquadRow)
    if (!createdSquad) {
      return null
    }
    
    // Create all the units
    for(const unit of newSquad.units) {
      const unitRow = {
        unitId: unit.unitId,
        squadId: createdSquad.squadId,
        unitName: unit.unitName,
        unitTypeId: unit.unitTypeId,
        seq: unit.seq,
        gearIds: unit.gearIds,
        medalIds: '', // Don't clone medals
        currHIT: unit.currHIT,
        isActivated: unit.isActivated
      }
      await UnitService.createUnit(unitRow)
    }

    // Get the finalized squad with all its stuff
    const finalSquad = await SquadService.getSquad(createdSquad.squadId)

    if (!finalSquad) return null

    // Done
    return finalSquad
  }
  
  static async deleteSquadPortrait(squadId: string): Promise<Squad | null> {
    const squad = await this.getSquadRow(squadId)
    if (!squad) throw new Error('Squad not found')

    // Update DB first (don't wait for file system to succeed)
    const updatedSquad = await this.updateSquad(squadId, { hasCustomPortrait: false })

    try {
      const uploadDir = process.env.UPLOADS_DIR!
      const filePath = path.resolve(
        uploadDir,
        `user_${squad.userId}`,
        `squad_${squad.squadId}`,
        `squad_${squad.squadId}.jpg`
      )

      await fs.unlink(filePath)
    } catch (ex) {
      // Log but don't block flow
      console.warn(`Could not delete portrait file for squad ${squadId}:`, ex)
    }

    return updatedSquad
  }
}
