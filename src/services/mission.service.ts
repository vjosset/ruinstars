// @ts-nocheck
import { Mission } from '@/types'
import { MissionRepository } from '@/src/repositories/mission.repository'

type Campaign = {
  campaignName?: string
  operations: Operation[]
}

type Operation = {
  operationName?: string
  missions: Mission[]
}

export class MissionService {
  private static repository = new MissionRepository()

  static async getMissionRow(missionId: number): Promise<Mission | null> {
    const mission = await this.repository.getMissionRow(missionId)
    return mission ? new Mission(mission) : null
  }

  static async getMission(missionId: number): Promise<Mission | null> {
    const mission = await this.repository.getMission(missionId)
    return mission ? new Mission(mission) : null
  }

  static async getAllMissions(): Promise<Mission[]> {
    const missions = await this.repository.getAllMissions()
    return missions.map(mission => new Mission(mission))
  }

  static async getRandomCampaign(): Promise<Mission[] | null> {
    const missions = await this.repository.getAllMissions()
    if (missions.length === 0) return null

    const campaign: Campaign = {
      campaignName: 'Random Campaign',
      operations: []
    }
    
    const operationsCount = 3
    const missionsPerOperation = 3
    const totalMissionsNeeded = operationsCount * missionsPerOperation

    // Get all primary missions and shuffle them
    const shuffledMissions = missions
      .filter(m => m.missionType === 'Primary')
      .sort(() => Math.random() - 0.5)

    // Make sure we have enough missions
    if (shuffledMissions.length < totalMissionsNeeded) return null

    // Take first 9 missions
    const selectedMissions = shuffledMissions.slice(0, totalMissionsNeeded)

    // Create 3 operations with 3 missions each
    for (let i = 0; i < operationsCount; i++) {
      const operation: Operation = {
        operationName: `Operation ${i + 1}`,
        missions: selectedMissions
          .slice(i * missionsPerOperation, (i + 1) * missionsPerOperation)
          .map(m => new Mission(m))
      }
      campaign.operations.push(operation)
    }

    // Done
    return campaign
  }
}
