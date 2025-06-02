// @ts-nocheck
import { Mission } from '@/types'
import { MissionRepository } from '@/src/repositories/mission.repository'

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
}
