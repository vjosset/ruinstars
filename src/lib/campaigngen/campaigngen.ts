import { SquadService, UserService } from '@/services'
import { BattlefieldService } from '@/services/battlefield.service'
import artifactNames from './data/artifactNames.json'
import campaignNames from './data/campaignNames.json'
import missions from './data/missions.json'
import operationNames from './data/operationNames.json'
import sectors from './data/sectors.json'
import subsectors from './data/subsectors.json'

// Helpers
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

// Text generators
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

// Load data
const battlefields = await BattlefieldService.getAllBattlefields()
const playerSquad = await SquadService.getSquad('VgL2Y')
const enemySquads = (await UserService.getUserByUsername('NPC'))?.squads?.filter(
  (s) => s.squadTypeId !== playerSquad?.squadTypeId && s.squadTypeId !== 'NPC'
) ?? []

// Main Campaign Generator
export function generateCampaign(operationsPerCampaign: number, missionsPerOperation: number) {
  const campaignTitle = generateTitle(campaignNames)
  const campaignSector = generateLocationName(sectors)

  const enabledMissions = missions.filter((m) => m.enabled)
  const availableMissions: typeof enabledMissions = []

  // Shuffle missions multiple times to create a long randomized pool
  for (let i = 0; i < 100; i++) {
    availableMissions.push(...shuffle([...enabledMissions]))
  }

  const battlefieldsShuffled = expandToLength(battlefields, operationsPerCampaign * missionsPerOperation)
  const enemySquadsShuffled = expandToLength(enemySquads, operationsPerCampaign)

  const operations = Array.from({ length: operationsPerCampaign }, (_, opIdx) => {
    const subsector = generateSubsectorName()
    const enemy = enemySquadsShuffled[opIdx]
    const operationTitle = generateTitle(operationNames)
    const selectedMissions: typeof enabledMissions = []

    // Select first mission: seqs includes 1
    const firstIndex = availableMissions.findIndex(
      (m) => m.seqs.includes(1) && !selectedMissions.some((s) => s.title === m.title)
    )
    const firstMission = availableMissions[firstIndex]
    if (!firstMission) {
      console.error('Could not build first mission. Available selections:', availableMissions.length)
    }
    selectedMissions.push(firstMission)
    availableMissions.splice(0, firstIndex + 1)

    // Select second mission: seqs includes 2 + followup match
    const secondIndex = availableMissions.findIndex(
      (m) =>
        m.seqs.includes(2) &&
        firstMission.followupMissions?.includes(m.title) &&
        !selectedMissions.some((s) => s.title === m.title)
    )
    const secondMission = availableMissions[secondIndex]
    if (!secondMission) {
      console.error('Could not build second mission. Available selections:', availableMissions.length)
    }
    selectedMissions.push(secondMission)
    availableMissions.splice(0, secondIndex + 1)

    // Select third mission: seqs includes 3 + followup match
    const thirdIndex = availableMissions.findIndex(
      (m) =>
        m.seqs.includes(3) &&
        secondMission.followupMissions?.includes(m.title) &&
        !selectedMissions.some((s) => s.title === m.title)
    )
    const thirdMission = availableMissions[thirdIndex]
    selectedMissions.push(thirdMission)
    availableMissions.splice(0, thirdIndex + 1)

    const opMissions = selectedMissions.map((mission, mIdx) => {
      const battlefield = battlefieldsShuffled[opIdx * missionsPerOperation + mIdx]
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
        '{{operationTitle}}': operationTitle,
        '{{subsector}}': subsector,
        '{{enemySquadName}}': enemy.squadName,
        '{{enemyFactionName}}': enemy.squadType?.faction.factionName ?? 'enemyFactionName',
        '{{enemySquadLeader}}': enemy.units?.[0].unitName ?? 'enemyLeaderName'
      }

      return {
        ...mission,
        description: replacePlaceholders(description, placeholders),
        battlefield: battlefield.title,
        battlefieldName
      }
    })

    return {
      title: operationTitle,
      subsector,
      enemy,
      description: replacePlaceholders(
        `Placeholder operation description for ${subsector}, a key site within the campaign.`,
        {
          '{{campaignTitle}}': campaignTitle,
          '{{campaignSector}}': campaignSector,
          '{{operationIndex}}': `${opIdx + 1}`,
          '{{operationTitle}}': operationTitle,
          '{{subsector}}': subsector,
          '{{enemySquadName}}': enemy.squadName,
          '{{enemyFactionName}}': enemy.squadType?.faction.factionName ?? 'enemyFactionName',
          '{{enemySquadLeader}}': enemy.units?.[0].unitName ?? 'enemyLeaderName'
        }
      ),
      missions: opMissions
    }
  })

  return {
    title: campaignTitle,
    sector: campaignSector,
    description: `A procedurally generated campaign set in the ${campaignSector}.`,
    operations
  }
}

export function testCampaignGen() {
  const runs = 100

  for (let i = 0; i < runs; i++) {
    safeGenerateCampaign(3, 3)
  }
}

export function safeGenerateCampaign(operationsPerCampaign: number, missionsPerOperation: number) {
  const runs = 10

  // Run up to 10 attempts
  //  Depending on how the missions, their seqs, and their follow-up missions are built, we can end up in a dead end, resulting in a crash in generateCampaign()
  for (let i = 0; i < runs; i++) {
    try {
      const c = generateCampaign(operationsPerCampaign, missionsPerOperation)
      return c
    } catch {
      //console.error('  Campaign generation crashed on attempt #', i + 1)
    }
  }
}