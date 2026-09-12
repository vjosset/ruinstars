import { SquadRepository } from '@/src/repositories/squad.repository'
import { UserRepository } from '@/src/repositories/user.repository'
import { CampaignValidationResult, parseSquadCampaign, validateSquadCampaign } from '@/lib/utils/campaign'
import { SquadIdentity } from '@/types'

/** Owner of the NPC Squads - same lookup as the Missions book */
const NPC_USER = 'pve'

export class CampaignService {
  private static squadRepository = new SquadRepository()
  private static userRepository = new UserRepository()

  static async getNpcSquads(): Promise<SquadIdentity[]> {
    const npcUser = (await this.userRepository.getUserByUsername(NPC_USER)) ?? (await this.userRepository.getUser(NPC_USER))
    return npcUser ? this.squadRepository.getSquadIdentitiesByUserId(npcUser.userId) : []
  }

  /**
   * Validates and saves a Squad's Campaign. NPC Squads must be current NPC Squads, except ones the
   * saved Campaign already uses, so a since-deleted NPC Squad doesn't block recording MP.
   */
  static async saveSquadCampaign(squadId: string, input: unknown): Promise<CampaignValidationResult> {
    const squad = await this.squadRepository.getSquadRow(squadId)
    if (!squad) return { campaign: null, error: 'Squad not found' }

    const savedNpcSquadIds = (parseSquadCampaign(squad.campaign)?.operations ?? [])
      .map(operation => operation.npcSquadId)
      .filter((id): id is string => id !== null)
    const currentNpcSquadIds = (await this.getNpcSquads()).map(npcSquad => npcSquad.squadId)

    const result = validateSquadCampaign(input, [...currentNpcSquadIds, ...savedNpcSquadIds])
    if (result.campaign) {
      await this.squadRepository.updateSquad(squadId, { campaign: JSON.stringify(result.campaign) })
    }
    return result
  }

  static async deleteSquadCampaign(squadId: string): Promise<void> {
    await this.squadRepository.updateSquad(squadId, { campaign: null })
  }
}
