import { SquadService, UserService } from '@/services'
import { BattlefieldService } from '@/services/battlefield.service'
import artifactNames from './data/artifactNames.json'
import campaignNames from './data/campaignNames.json'
import missions from './data/missions.json'
import operationNames from './data/operationNames.json'
import sectors from './data/sectors.json'
import subsectors from './data/subsectors.json'

const battlefields = await BattlefieldService.getAllBattlefields()
const playerSquad = await SquadService.getSquad('VgL2Y')
const enemySquads = (await UserService.getUserByUsername('Ruinstars'))?.squads?.filter((s) => s.squadTypeId != playerSquad?.squadTypeId && s.squadTypeId != 'NPC') ?? []

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateArtifactName() {
  const prefix = getRandom(artifactNames.prefixes)
  const root = getRandom(artifactNames.roots)
  return `${prefix} ${root}`.trim()
}

function generateCampaignTitle(): string {
  const prefix = getRandom(campaignNames.prefixes) + ' '
  const descriptor = getRandom(campaignNames.adjectives) + ' '
  const placeType = getRandom(campaignNames.nouns)
  return (prefix + descriptor + placeType).trim()
}

function generateOperationTitle(): string {
  const prefix = getRandom(operationNames.prefixes) + ' '
  const descriptor = getRandom(operationNames.adjectives) + ' '
  const placeType = getRandom(operationNames.nouns)
  return (prefix + descriptor + placeType).trim()
}

function generateSectorName(): string {
  const prefix = getRandom(sectors.prefixes) + ' '
  const descriptor = getRandom(sectors.descriptors) + ' '
  const placeType = getRandom(sectors.placeTypes)
  return (prefix + descriptor + placeType).trim()
}

function generateSubsectorName(): string {
  const prefix = getRandom(subsectors.prefixes) + ' '
  const descriptor = getRandom(subsectors.descriptors) + ' '
  const placeType = getRandom(subsectors.suffixes)
  return (prefix + descriptor + placeType).trim()
}

// Tracks how many times each mission has been used across the campaign
const missionUsage: Record<string, number> = {}

// Selects a mission that hasn't yet been used
function selectUniqueMission(): any {
  const missionCandidates = missions.filter((mission) => {
    const usedCount = missionUsage[mission.title] || 0
    return usedCount === 0
  })

  if (missionCandidates.length === 0) {
    throw new Error('All missions have already been used.')
  }

  const selectedMission = getRandom(missionCandidates)
  const selectedBattlefield = getRandom(battlefields)
  const description = getRandom(selectedMission.descriptions)
  missionUsage[selectedMission.title] = 1
  return {...selectedMission, description, battlefield: selectedBattlefield.title, battlefieldName: getRandom(selectedBattlefield.battlefieldNames?.split(',') ?? [''])}
}

// Generate one operation with 3 completely unique missions
function generateOperation(index: number) {
  const subsector = generateSubsectorName()
  const enemySquad = getRandom(enemySquads)

  const missionsForOp = [0, 1, 2].map(() => selectUniqueMission())

  return {
    title: generateOperationTitle(),
    enemy: enemySquad,
    subsector,
    description: `Placeholder operation description for ${subsector}, a key site within the campaign.`,
    missions: missionsForOp
  }
}

// Placeholders for lore and descriptions
function replacePlaceholders(text: string, values: Record<string, string>): string {
  return text.replace(/{{(.*?)}}/g, (_, key) => {
    const placeholder = `{{${key.trim()}}}`
    return values[placeholder] ?? ''
  })
}

// Main campaign generation
export function generateCampaign() {
  // Reset mission usage tracker for each new generation
  for (const key of Object.keys(missionUsage)) {
    missionUsage[key] = 0
  }

  const campaignSector = generateSectorName()
  const campaignTitle = generateCampaignTitle()

  const campaign = {
    title: campaignTitle,
    sector: campaignSector,
    description: `A procedurally generated campaign set in the ${campaignSector}.`,
    operations: [0, 1, 2].map(generateOperation)
  }

  // Build placeholders
  const campaignPlaceholders = {
    'campaignTitle': campaignTitle,
    'campaignSector': campaignSector
  }

  // Replace placeholders
  campaign.description = replacePlaceholders(campaign.description, campaignPlaceholders)

  // Now do Operations
  campaign.operations = campaign.operations.map((op, opIdx) => {
    const operationPlaceholders = {
      '{{operationIndex}}': `${opIdx + 1}`,
      '{{operationTitle}}': op.title,
      '{{subsector}}': op.subsector,
      '{{enemySquadName}}': op.enemy.squadName,
      '{{enemyFactionName}}': op.enemy.squadType?.faction.factionName ?? 'enemyFactionName',
      '{{enemySquadLeader}}': op.enemy.units?.[0].unitName ?? 'enemyLeaderName',
      ...campaignPlaceholders
    }

    return {
      ...op,
      description: replacePlaceholders(op.description, operationPlaceholders),
      missions: op.missions.map((m, mIdx) => {
        const missionPlaceholders = {
          '{{missionIndex}}': `${opIdx + 1}.${mIdx + 1}`,
          '{{missionTitle}}': m.title,
          '{{battlefieldName}}': m.battlefieldName,
          ...campaignPlaceholders,
          ...operationPlaceholders,
          '{{artifactName}}': generateArtifactName(),
          '{{agentCodename}}': '[TBD]',
        }

        return {
          ...m,
          description: replacePlaceholders(m.description, missionPlaceholders)
        }
      })
    }
  })
  
  // Done
  return campaign
}
