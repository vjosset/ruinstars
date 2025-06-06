// @ts-nocheck
import { Mission } from '@/types'
import { MissionRepository } from '@/src/repositories/mission.repository'
import { MdCampaign } from 'react-icons/md'

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

    for (let i = 0; i < operationsCount; i++) {
      const operationMissions = missions
        .filter(m => m.missionType === 'Primary')
        .sort(() => Math.random() - 0.5)
        .slice(0, missionsPerOperation)

      if (operationMissions.length === 0) return null

      // Create new Operation object
      const operation: Operation = {
        operationName: `Operation ${i + 1}`,
        missions: operationMissions.map(m => new Mission(m))
      }

      // Add operation to campaign
      campaign.operations.push(operation)
    }

    // Done
    return campaign
  }
}
