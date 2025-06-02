import { BaseRepository } from './base.repository'
import type { Mission } from '@prisma/client'

export class MissionRepository extends BaseRepository {
  async getMissionRow(missionId: number): Promise<Mission | null> {
    return this.prisma.mission.findUnique({
      where: { missionId }
    })
  }

  async getMission(missionId: number) {
    return this.prisma.mission.findUnique({
      where: { missionId }
    })
  }

  async getAllMissions() {
    return this.prisma.mission.findMany({
      orderBy: [{ missionType: 'asc'}, {seq: 'asc'} ],
    })
  }
}
