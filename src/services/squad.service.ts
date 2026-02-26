import { SquadRepository } from '@/src/repositories/squad.repository'
import { Squad } from '@/types'
import fs from 'fs/promises'
import { generateId } from '@/lib/id'
import path from 'path'
import { GearService } from './gear.service'
import { UnitService } from './unit.service'

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
        await UnitService.applyGearMods(unit)
      }))
    }
    return squad
  }

  static async getRandomSpotlightSquad(): Promise<Squad | null> {
    const raw = await this.repository.getRandomSpotlightSquad()
    if (!raw) return null
    const squad = new Squad(raw)

    if (squad.units && squad.units.length > 0) {
      await Promise.all(squad.units.map(async unit => {
        await GearService.loadUnitGear(unit)
        await UnitService.applyGearMods(unit)
      }))
    }
    return squad
  }

  static async createSquad(data: Partial<Squad>): Promise<Squad | null> {
    if (!data || !data.userId) throw new Error('No data provided')

    data.squadId = generateId(8)

    // Always make the new squad the first one in the user's list
    data.seq = -1
    const raw = await this.repository.createSquad(data)
    if (!raw) throw new Error('Failed to create squad')
  
    // Reorder/re-seq the user's squads
    await this.repository.fixSquadSeqs(data.userId)

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

    const uploadDir = process.env.UPLOADS_DIR
    const squadPortraitDir = uploadDir
      ? path.resolve(uploadDir, `user_${squad.userId}`, `squad_${squad.squadId}`)
      : null

    await this.repository.deleteSquad(squadId)
    await this.repository.fixSquadSeqs(squad.userId)

    if (squadPortraitDir) {
      try {
        await fs.rm(squadPortraitDir, { recursive: true, force: true })
      } catch (error) {
        console.warn(`Failed to delete portrait directory for squad ${squadId}:`, error)
      }
    }
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
      const newHIT = unit.gearIds?.includes('INJ-DC') ? 0 : (unit.HIT ?? unit.currHIT)
      await UnitService.updateUnit(unit.unitId, { currHIT: newHIT, isActivated: false})
    }))

    // Return the update squad
    return await this.getSquad(squadId)
  }

  static async cloneSquad(sourceSquadId: string, destUserId: string, destSquadName: string): Promise<Squad | null> {
    const sourceSquad = await SquadService.getSquad(sourceSquadId)
    if (!sourceSquad) return null

    const createdSquad = await SquadService.createSquad({
      userId: destUserId,
      squadTypeId: sourceSquad.squadTypeId,
      seq: -1,
      squadName: destSquadName,
      description: '', // Do not copy description from source
      campaign: sourceSquad.campaign,
    })

    if (!createdSquad) {
      return null
    }

    const uploadDir = process.env.UPLOADS_DIR
    const sourcePortraitDir = uploadDir
      ? path.resolve(uploadDir, `user_${sourceSquad.userId}`, `squad_${sourceSquad.squadId}`)
      : null
    const destPortraitDir = uploadDir
      ? path.resolve(uploadDir, `user_${destUserId}`, `squad_${createdSquad.squadId}`)
      : null

    if (sourceSquad.hasCustomPortrait && sourcePortraitDir && destPortraitDir) {
      const copied = await this.copyPortraitAsset(
        path.resolve(sourcePortraitDir, `squad_${sourceSquad.squadId}.jpg`),
        path.resolve(destPortraitDir, `squad_${createdSquad.squadId}.jpg`)
      )

      if (copied) {
        await this.updateSquad(createdSquad.squadId, {
          hasCustomPortrait: true,
          portraitUpdatedAt: sourceSquad.portraitUpdatedAt ?? new Date()
        })
      }
    }

    const sourceUnits = sourceSquad.units ?? []
    for (const unit of sourceUnits) {
      const unitRow = {
        squadId: createdSquad.squadId,
        unitName: unit.unitName,
        unitTypeId: unit.unitTypeId,
        seq: unit.seq,
        gearIds: unit.gearIds,
        medalIds: '', // Don't clone medals
        currHIT: unit.currHIT,
        isActivated: unit.isActivated
      }

      const createdUnit = await UnitService.createUnit(unitRow)
      if (!createdUnit) continue

      if (unit.hasCustomPortrait && sourcePortraitDir && destPortraitDir) {
        const copied = await this.copyPortraitAsset(
          path.resolve(sourcePortraitDir, `unit_${unit.unitId}.jpg`),
          path.resolve(destPortraitDir, `unit_${createdUnit.unitId}.jpg`)
        )

        if (copied) {
          await UnitService.updateUnit(createdUnit.unitId, {
            hasCustomPortrait: true,
            portraitUpdatedAt: unit.portraitUpdatedAt ?? new Date()
          })
        }
      }
    }

    const finalSquad = await SquadService.getSquad(createdSquad.squadId)
    if (!finalSquad) return null

    return finalSquad
  }

  private static async copyPortraitAsset(sourcePath: string, destPath: string): Promise<boolean> {
    try {
      await fs.access(sourcePath)
    } catch {
      console.warn(`Portrait source not found: ${sourcePath}`)
      return false
    }

    try {
      await fs.mkdir(path.dirname(destPath), { recursive: true })
      await fs.copyFile(sourcePath, destPath)
      return true
    } catch (error) {
      console.warn(`Failed to copy portrait from ${sourcePath} to ${destPath}`, error)
      return false
    }
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
