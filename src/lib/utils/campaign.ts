import { MissionBattlefields } from '@/data/mission_battlefields'
import { MissionDeployments } from '@/data/mission_deployments'
import { MissionObjectives } from '@/data/mission_objectives'
import type { SquadCampaign, SquadCampaignMission, SquadCampaignOperation } from '@/types'

export const CAMPAIGN_OPERATION_COUNT = 3
export const CAMPAIGN_MISSIONS_PER_OPERATION = 3

/** Returns a float in [0, 1). Injectable so rolls can be reproduced. */
export type Rng = () => number

export type ObjectiveCount = 1 | 2

export type CampaignObjective = {
  objectiveId: string
  title: string
  archetypeId: string
  archetypeTitle: string
}

const battlefieldsById = new Map(MissionBattlefields.map(b => [b.battlefieldId, b]))
const deploymentsById = new Map(MissionDeployments.map(d => [d.deploymentId, d]))
const objectivesById = new Map<string, CampaignObjective>(
  MissionObjectives.flatMap(archetype =>
    archetype.variations.map(v => [v.objectiveId, {
      objectiveId: v.objectiveId,
      title: v.title,
      archetypeId: archetype.objectiveArchetypeId,
      archetypeTitle: archetype.title,
    }] as const)
  )
)

export const getBattlefield = (battlefieldId: string) => battlefieldsById.get(battlefieldId) ?? null
export const getDeployment = (deploymentId: string) => deploymentsById.get(deploymentId) ?? null
export const getObjective = (objectiveId: string) => objectivesById.get(objectiveId) ?? null

function pick<T>(items: readonly T[], rng: Rng): T {
  if (items.length === 0) throw new Error('Cannot pick from an empty list')
  return items[Math.floor(rng() * items.length)]
}

export type RollAvoidOptions = {
  /** Never picked unless it is the only option, e.g. the current selection so a re-roll changes it */
  excludeId?: string | null
  /** Skipped while other options remain, e.g. picks already used by other Operations */
  avoidIds?: readonly (string | null)[]
}

/** Picks from `ids`, relaxing `avoidIds` and then `excludeId` only when nothing else is left */
function pickAvoiding(ids: readonly string[], { excludeId = null, avoidIds = [] }: RollAvoidOptions, rng: Rng): string {
  const candidates = [
    ids.filter(id => id !== excludeId && !avoidIds.includes(id)),
    ids.filter(id => id !== excludeId),
    ids,
  ].find(tier => tier.length > 0) ?? []
  return pick(candidates, rng)
}

// ---------------------------------------------------------------------------
// Rolls
// ---------------------------------------------------------------------------

export function rollBattlefieldId(options: RollAvoidOptions = {}, rng: Rng = Math.random): string {
  return pickAvoiding(MissionBattlefields.map(b => b.battlefieldId), options, rng)
}

export function rollDeploymentId(options: RollAvoidOptions = {}, rng: Rng = Math.random): string {
  return pickAvoiding(MissionDeployments.map(d => d.deploymentId), options, rng)
}

/** Order-insensitive identity of a Mission's Objectives, e.g. ['C1', 'A1'] and ['A1', 'C1'] match */
export const objectiveCombinationKey = (objectiveIds: readonly string[]) => [...objectiveIds].sort().join('+')

const objectiveList = [...objectivesById.values()]

/** Every valid two-Objective combination (different Archetypes), as combination keys */
const objectivePairKeys = objectiveList.flatMap((first, i) =>
  objectiveList
    .slice(i + 1)
    .filter(second => second.archetypeId !== first.archetypeId)
    .map(second => objectiveCombinationKey([first.objectiveId, second.objectiveId]))
)

export type ObjectiveRollOptions = {
  /** The Mission's other Objective, if any; its Archetype is never picked */
  pairedObjectiveId?: string | null
  /** Never picked unless it is the only option, e.g. the current selection so a re-roll changes it */
  excludeId?: string | null
  /** Objective combinations to avoid while alternatives remain, e.g. other Missions' in the Operation */
  avoidCombinations?: readonly (readonly string[])[]
}

/** Equivalent to 2D3 (Archetype, then Variation): every allowed Objective is equally likely */
export function rollObjectiveId(
  { pairedObjectiveId = null, excludeId = null, avoidCombinations = [] }: ObjectiveRollOptions = {},
  rng: Rng = Math.random
): string {
  const pairedArchetypeId = pairedObjectiveId ? (getObjective(pairedObjectiveId)?.archetypeId ?? null) : null
  const allowedIds = objectiveList.filter(o => o.archetypeId !== pairedArchetypeId).map(o => o.objectiveId)
  const avoidKeys = new Set(avoidCombinations.map(objectiveCombinationKey))
  const avoidIds = allowedIds.filter(id =>
    avoidKeys.has(objectiveCombinationKey(pairedObjectiveId ? [id, pairedObjectiveId] : [id]))
  )
  return pickAvoiding(allowedIds, { excludeId, avoidIds }, rng)
}

/**
 * One Objective, or two of different Archetypes, avoiding `avoidCombinations` while alternatives remain.
 * Every valid combination is equally likely, as with rolling 2D3 twice and re-rolling a matching Archetype.
 */
export function rollObjectiveIds(
  count: ObjectiveCount,
  avoidCombinations: readonly (readonly string[])[] = [],
  rng: Rng = Math.random
): string[] {
  if (count === 1) return [rollObjectiveId({ avoidCombinations }, rng)]

  const pair = pickAvoiding(objectivePairKeys, { avoidIds: avoidCombinations.map(objectiveCombinationKey) }, rng).split('+')
  // Keys are sorted, so shuffle which Objective is listed first
  return rng() < 0.5 ? pair : pair.reverse()
}

/** Null when there are no NPC Squads to pick from */
export function rollNpcSquadId(
  npcSquadIds: readonly string[],
  options: RollAvoidOptions = {},
  rng: Rng = Math.random
): string | null {
  return npcSquadIds.length > 0 ? pickAvoiding(npcSquadIds, options, rng) : null
}

// ---------------------------------------------------------------------------
// Building and randomizing
// ---------------------------------------------------------------------------

export const isMissionPlayed = (mission: SquadCampaignMission) => mission.mp !== null

export const isOperationStarted = (operation: SquadCampaignOperation) => operation.missions.some(isMissionPlayed)

/** An unplayed Mission whose Deployment and Objective combination avoid `otherMissions`' while there are enough to go around */
function rollMission(
  objectiveCount: ObjectiveCount,
  otherMissions: readonly SquadCampaignMission[],
  rng: Rng
): SquadCampaignMission {
  return {
    deploymentId: rollDeploymentId({ avoidIds: otherMissions.map(other => other.deploymentId) }, rng),
    objectiveIds: rollObjectiveIds(objectiveCount, otherMissions.map(other => other.objectiveIds), rng),
    mp: null,
  }
}

/** A new Operation's Missions, each avoiding the Deployments and Objective combinations of those before it */
function rollMissions(objectiveCount: ObjectiveCount, rng: Rng): SquadCampaignMission[] {
  const missions: SquadCampaignMission[] = []
  for (let i = 0; i < CAMPAIGN_MISSIONS_PER_OPERATION; i++) {
    missions.push(rollMission(objectiveCount, missions, rng))
  }
  return missions
}

/** Re-rolls items in order; each re-roll sees the locked items plus those already re-rolled, so it can avoid their picks */
function rerollInOrder<T>(items: readonly T[], isLocked: (item: T) => boolean, reroll: (item: T, settled: T[]) => T): T[] {
  const locked = items.map(isLocked)
  const result = [...items]
  for (const [index, item] of items.entries()) {
    result[index] = reroll(item, result.filter((_, i) => i !== index && (locked[i] || i < index)))
  }
  return result
}

/**
 * A fully rolled Campaign. One Objective per Mission means no NPC opponent.
 * Each Operation gets a different Battlefield and NPC Squad while there are enough to go around.
 */
export function createRandomCampaign(
  objectiveCount: ObjectiveCount,
  npcSquadIds: readonly string[],
  rng: Rng = Math.random
): SquadCampaign {
  const operations: SquadCampaignOperation[] = []
  for (let i = 0; i < CAMPAIGN_OPERATION_COUNT; i++) {
    operations.push({
      battlefieldId: rollBattlefieldId({ avoidIds: operations.map(operation => operation.battlefieldId) }, rng),
      npcSquadId: objectiveCount === 2
        ? rollNpcSquadId(npcSquadIds, { avoidIds: operations.map(operation => operation.npcSquadId) }, rng)
        : null,
      missions: rollMissions(objectiveCount, rng),
    })
  }
  return { version: 1, operations }
}

/** Starting point for a manual build: the first option for everything, ready to edit */
export function createBlankCampaign(objectiveCount: ObjectiveCount, npcSquadIds: readonly string[]): SquadCampaign {
  const [firstArchetype, secondArchetype] = MissionObjectives
  const objectiveIds = objectiveCount === 2
    ? [firstArchetype.variations[0].objectiveId, secondArchetype.variations[0].objectiveId]
    : [firstArchetype.variations[0].objectiveId]

  return {
    version: 1,
    operations: Array.from({ length: CAMPAIGN_OPERATION_COUNT }, () => ({
      battlefieldId: MissionBattlefields[0].battlefieldId,
      npcSquadId: objectiveCount === 2 ? (npcSquadIds[0] ?? null) : null,
      missions: Array.from({ length: CAMPAIGN_MISSIONS_PER_OPERATION }, () => ({
        deploymentId: MissionDeployments[0].deploymentId,
        objectiveIds: [...objectiveIds],
        mp: null,
      })),
    })),
  }
}

/**
 * Re-rolls Deployment and Objectives, keeping the Objective count and avoiding `otherMissions`' picks
 * while there are enough to go around. Played Missions are returned unchanged.
 */
export function randomizeMission(
  mission: SquadCampaignMission,
  otherMissions: readonly SquadCampaignMission[] = [],
  rng: Rng = Math.random
): SquadCampaignMission {
  if (isMissionPlayed(mission)) return mission
  return rollMission(mission.objectiveIds.length === 2 ? 2 : 1, otherMissions, rng)
}

/**
 * Re-rolls an Operation's unplayed Missions. Battlefield and NPC Squad are kept once any of its
 * Missions has been played, and an Operation without an NPC Squad stays without one.
 * New picks avoid those used by `otherOperations` while there are enough to go around.
 */
export function randomizeOperation(
  operation: SquadCampaignOperation,
  npcSquadIds: readonly string[],
  otherOperations: readonly SquadCampaignOperation[] = [],
  rng: Rng = Math.random
): SquadCampaignOperation {
  const isStarted = isOperationStarted(operation)
  return {
    battlefieldId: isStarted
      ? operation.battlefieldId
      : rollBattlefieldId({ avoidIds: otherOperations.map(other => other.battlefieldId) }, rng),
    npcSquadId: isStarted || operation.npcSquadId === null
      ? operation.npcSquadId
      : (rollNpcSquadId(npcSquadIds, { avoidIds: otherOperations.map(other => other.npcSquadId) }, rng) ?? operation.npcSquadId),
    // Played Missions keep their picks, so unplayed ones roll around them
    missions: rerollInOrder(operation.missions, isMissionPlayed, (mission, settled) => randomizeMission(mission, settled, rng)),
  }
}

export function randomizeCampaign(
  campaign: SquadCampaign,
  npcSquadIds: readonly string[],
  rng: Rng = Math.random
): SquadCampaign {
  return {
    ...campaign,
    // Started Operations keep their Battlefield and NPC Squad, so the others roll around them
    operations: rerollInOrder(
      campaign.operations,
      isOperationStarted,
      (operation, settled) => randomizeOperation(operation, npcSquadIds, settled, rng)
    ),
  }
}

export function replaceOperation(
  campaign: SquadCampaign,
  operationIndex: number,
  operation: SquadCampaignOperation
): SquadCampaign {
  return {
    ...campaign,
    operations: campaign.operations.map((existing, i) => (i === operationIndex ? operation : existing)),
  }
}

export function replaceMission(
  campaign: SquadCampaign,
  operationIndex: number,
  missionIndex: number,
  mission: SquadCampaignMission
): SquadCampaign {
  const operation = campaign.operations[operationIndex]
  return replaceOperation(campaign, operationIndex, {
    ...operation,
    missions: operation.missions.map((existing, i) => (i === missionIndex ? mission : existing)),
  })
}

/** The first Mission without recorded MP, or null when the Campaign is complete */
export function getNextMission(campaign: SquadCampaign): { operationIndex: number; missionIndex: number } | null {
  for (const [operationIndex, operation] of campaign.operations.entries()) {
    const missionIndex = operation.missions.findIndex(mission => !isMissionPlayed(mission))
    if (missionIndex !== -1) return { operationIndex, missionIndex }
  }
  return null
}

export function getCampaignTotalMP(campaign: SquadCampaign): number {
  return campaign.operations.reduce(
    (total, operation) => total + operation.missions.reduce((sum, mission) => sum + (mission.mp ?? 0), 0),
    0
  )
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

export type CampaignValidationResult =
  | { campaign: SquadCampaign; error: null }
  | { campaign: null; error: string }

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

/**
 * Checks untrusted input against the Campaign shape and the mission data, returning a clean copy
 * that holds only known fields. Pass `npcSquadIds` to also require each NPC Squad to be one of them.
 */
export function validateSquadCampaign(
  input: unknown,
  npcSquadIds: readonly string[] | null = null
): CampaignValidationResult {
  const fail = (error: string): CampaignValidationResult => ({ campaign: null, error })

  if (!isRecord(input)) return fail('Campaign must be an object')
  if (input.version !== 1) return fail('Unsupported Campaign version')
  if (!Array.isArray(input.operations) || input.operations.length !== CAMPAIGN_OPERATION_COUNT) {
    return fail(`Campaign must have ${CAMPAIGN_OPERATION_COUNT} Operations`)
  }

  const operations: SquadCampaignOperation[] = []
  for (const [operationIndex, operation] of input.operations.entries()) {
    const operationLabel = `Operation ${operationIndex + 1}`
    if (!isRecord(operation)) return fail(`${operationLabel} is invalid`)

    const { battlefieldId, npcSquadId, missions } = operation
    if (typeof battlefieldId !== 'string' || !battlefieldsById.has(battlefieldId)) {
      return fail(`${operationLabel} has an unknown Battlefield`)
    }
    if (npcSquadId !== null && typeof npcSquadId !== 'string') {
      return fail(`${operationLabel} has an invalid NPC Squad`)
    }
    if (typeof npcSquadId === 'string' && npcSquadIds !== null && !npcSquadIds.includes(npcSquadId)) {
      return fail(`${operationLabel} has an unknown NPC Squad`)
    }
    if (!Array.isArray(missions) || missions.length !== CAMPAIGN_MISSIONS_PER_OPERATION) {
      return fail(`${operationLabel} must have ${CAMPAIGN_MISSIONS_PER_OPERATION} Missions`)
    }

    const cleanMissions: SquadCampaignMission[] = []
    for (const [missionIndex, mission] of missions.entries()) {
      const missionLabel = `Mission ${operationIndex + 1}.${missionIndex + 1}`
      if (!isRecord(mission)) return fail(`${missionLabel} is invalid`)

      const { deploymentId, objectiveIds, mp } = mission
      if (typeof deploymentId !== 'string' || !deploymentsById.has(deploymentId)) {
        return fail(`${missionLabel} has an unknown Deployment`)
      }
      if (!Array.isArray(objectiveIds) || objectiveIds.length < 1 || objectiveIds.length > 2) {
        return fail(`${missionLabel} must have 1 or 2 Objectives`)
      }
      const cleanObjectiveIds = objectiveIds.filter((id): id is string => typeof id === 'string' && objectivesById.has(id))
      if (cleanObjectiveIds.length !== objectiveIds.length) {
        return fail(`${missionLabel} has an unknown Objective`)
      }
      if (cleanObjectiveIds.length === 2 && getObjective(cleanObjectiveIds[0])?.archetypeId === getObjective(cleanObjectiveIds[1])?.archetypeId) {
        return fail(`${missionLabel} Objectives must be of different Archetypes`)
      }
      if (mp !== null && (typeof mp !== 'number' || !Number.isInteger(mp) || mp < 0)) {
        return fail(`${missionLabel} MP must be a whole number, 0 or more`)
      }

      cleanMissions.push({ deploymentId, objectiveIds: cleanObjectiveIds, mp: typeof mp === 'number' ? mp : null })
    }

    operations.push({
      battlefieldId,
      npcSquadId: typeof npcSquadId === 'string' ? npcSquadId : null,
      missions: cleanMissions,
    })
  }

  return { campaign: { version: 1, operations }, error: null }
}

/** Reads `Squad.campaign`. Missing or unreadable JSON is treated as no Campaign. */
export function parseSquadCampaign(raw: string | null): SquadCampaign | null {
  if (raw === null || raw.trim() === '') return null
  try {
    return validateSquadCampaign(JSON.parse(raw)).campaign
  } catch {
    return null
  }
}
