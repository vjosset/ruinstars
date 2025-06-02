//@ts-nocheck
import { Squad } from '@/types'
import { SquadRepository } from '@/src/repositories/squad.repository'
import { GearService } from './gear.service'
import { UnitService } from './unit.service'
import { nanoid } from 'nanoid'
import { UserService } from './user.service'

export class SquadService {
  private static repository = new SquadRepository()

  static async getSquadRow(squadId: string): Promise<Squad | null> {
    const raw = await this.repository.getSquadRow(squadId)
    return raw ? new Squad(raw) : null
  }

  static async getSquad(squadId: string): Promise<Squad | null> {
    const raw = await this.repository.getSquad(squadId)
    if (!raw) return null
    const squad = raw ? new Squad(raw) : null
    await Promise.all(squad.units.map(async unit => {
      await GearService.loadUnitGear(unit)
      await UnitService.applyGearMods(unit)
    }))
    return squad
  }

  static async createSquad(data: Partial<Squad>): Promise<Squad | null> {
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

    // Reset all units' activation and currHIT
    await Promise.all(squad.units.map(async unit => {
      await UnitService.updateUnit(unit.unitId, { currHIT: unit.HIT, isActivated: false})
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
      factionId: newSquad.factionId,
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
}
