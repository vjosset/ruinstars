/**
 * A Squad's Campaign: three Operations of three Missions each, stored as JSON in `Squad.campaign`.
 * Threat Level is positional (Operation index + 1) and is never stored.
 */
export type SquadCampaign = {
  version: 1
  operations: SquadCampaignOperation[]
}

export type SquadCampaignOperation = {
  /** Battlefield from `MissionBattlefields`, shared by all three Missions */
  battlefieldId: string
  /** Squad owned by the `pve` user; null when there is no NPC opponent */
  npcSquadId: string | null
  missions: SquadCampaignMission[]
}

export type SquadCampaignMission = {
  /** Deployment from `MissionDeployments` */
  deploymentId: string
  /** One or two Objective IDs from `MissionObjectives`; two must be of different Archetypes */
  objectiveIds: string[]
  /** MP scored; null until the Mission has been played */
  mp: number | null
}
