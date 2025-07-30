import { SquadService, UserService } from '@/services'
import { BattlefieldService } from '@/services/battlefield.service'
import artifactNames from './data/artifactNames.json'
import campaignNames from './data/campaignNames.json'
import missions from './data/missions.json'
import operationNames from './data/operationNames.json'
import sectors from './data/sectors.json'
import subsectors from './data/subsectors.json'

// --- Helpers ---
function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function shuffle<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
}

function expandToLength<T>(baseArray: T[], requiredLength: number): T[] {
  const result: T[] = []
  while (result.length < requiredLength) {
    result.push(...shuffle(baseArray))
  }
  return result.slice(0, requiredLength)
}

function replacePlaceholders(text: string, values: Record<string, string>): string {
  return text.replace(/{{(.*?)}}/g, (_, key) => values[`{{${key.trim()}}}`] ?? '')
}

function generateArtifactName() {
  return `${getRandom(artifactNames.prefixes)} ${getRandom(artifactNames.roots)}`.trim()
}

function generateTitle(nameSet: { prefixes: string[]; adjectives: string[]; nouns: string[] }) {
  return `${getRandom(nameSet.prefixes)} ${getRandom(nameSet.adjectives)} ${getRandom(nameSet.nouns)}`.trim()
}

function generateLocationName(nameSet: { prefixes: string[]; descriptors: string[]; placeTypes: string[] }) {
  return `${getRandom(nameSet.prefixes)} ${getRandom(nameSet.descriptors)} ${getRandom(nameSet.placeTypes)}`.trim()
}

function generateSubsectorName() {
  return `${getRandom(subsectors.prefixes)} ${getRandom(subsectors.descriptors)} ${getRandom(subsectors.suffixes)}`.trim()
}

// --- Load data ---
const battlefields = await BattlefieldService.getAllBattlefields()
const playerSquad = await SquadService.getSquad('VgL2Y')
const enemySquads = (await UserService.getUserByUsername('NPC'))?.squads?.filter(
  (s) => s.squadTypeId !== playerSquad?.squadTypeId && s.squadTypeId !== 'NPC'
) ?? []

export function generateCampaign(operationsPerCampaign:number, missionsPerOperation: number) {
  const campaignTitle = generateTitle(campaignNames)
  const campaignSector = generateLocationName(sectors)

  const totalMissions = operationsPerCampaign * missionsPerOperation

  // Generate a random list of missions, battlefields, and enemy squads with as little repetition as possible
  const campaignMissions = expandToLength(missions.filter((m) => m.enabled), totalMissions)
  const campaignBattlefields = expandToLength(battlefields, totalMissions)
  const campaignEnemySquads = expandToLength(enemySquads, operationsPerCampaign)

  // Build the operations
  const operations = Array.from({ length: operationsPerCampaign }, (_, opIdx) => {
    const subsector = generateSubsectorName()
    const enemy = campaignEnemySquads[opIdx]
    const title = generateTitle(operationNames)

    // Build the missions
    const opMissions = Array.from({ length: missionsPerOperation }, (_, mIdx) => {
      const index = opIdx * missionsPerOperation + mIdx
      const mission = campaignMissions[index]
      const battlefield = campaignBattlefields[index]

      const battlefieldName = getRandom(battlefield.battlefieldNames?.split(',') ?? [''])
      const description = getRandom(mission.descriptions)

      const placeholders = {
        '{{missionIndex}}': `${opIdx + 1}.${mIdx + 1}`,
        '{{missionTitle}}': mission.title,
        '{{battlefieldName}}': battlefieldName,
        '{{artifactName}}': generateArtifactName(),
        '{{agentCodename}}': '[TBD]',
        '{{campaignTitle}}': campaignTitle,
        '{{campaignSector}}': campaignSector,
        '{{operationIndex}}': `${opIdx + 1}`,
        '{{operationTitle}}': title,
        '{{subsector}}': subsector,
        '{{enemySquadName}}': enemy.squadName,
        '{{enemyFactionName}}': enemy.squadType?.faction.factionName ?? 'enemyFactionName',
        '{{enemySquadLeader}}': enemy.units?.[0].unitName ?? 'enemyLeaderName'
      }

      // Final mission
      return {
        ...mission,
        description: replacePlaceholders(description, placeholders),
        battlefield: battlefield.title,
        battlefieldName
      }
    })

    // Final operation
    return {
      title,
      subsector,
      enemy,
      description: replacePlaceholders(
        `Placeholder operation description for ${subsector}, a key site within the campaign.`,
        {
          '{{campaignTitle}}': campaignTitle,
          '{{campaignSector}}': campaignSector,
          '{{operationIndex}}': `${opIdx + 1}`,
          '{{operationTitle}}': title,
          '{{subsector}}': subsector,
          '{{enemySquadName}}': enemy.squadName,
          '{{enemyFactionName}}': enemy.squadType?.faction.factionName ?? 'enemyFactionName',
          '{{enemySquadLeader}}': enemy.units?.[0].unitName ?? 'enemyLeaderName'
        }
      ),
      missions: opMissions
    }
  })

  // Done
  return {
    title: campaignTitle,
    sector: campaignSector,
    description: `A procedurally generated campaign set in the ${campaignSector}.`,
    operations
  }
}
