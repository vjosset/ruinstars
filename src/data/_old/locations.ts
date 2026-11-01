import { MissionPlain } from '@/types'

export type OperationalZone = {
  zoneId: string
  name: string
  description: string
  npcSquadId: string
  missions: MissionPlain[]
}

export type Location = {
  locationId: string
  name: string
  operationalZones: OperationalZone[]
}

const locations = [
  {
    locationId: 'LOC-ISHTAR',
    name: 'Ishtar\'s Cradle',
    operationalZones: [
      {
        zoneId: 'ZONE-TWISTING-WOODS',
        name: 'The Twisting Woods',
        description: '',
        npcSquadId: 'CULT-ONE-MOTHER',
        missions: [
          {
            missionId: 'ISHTAR-WOODS-M01',
            missionType: 'Location',
            seq: 1,
            title: 'Bug Bounty',
            active: true,
            description: '"The hive stirs. Kill them before they overwhelm us." Something ancient erupted from below. The battlefield is a feeding ground; every shot is a battle against extinction.',
            setup: 'Deploy a Spawn Point in the center of 3 random Tiles.',
            deployment: 'Player Units deploy from the Southern battlefield edge before Turn 1.',
            victory: 'At the end of Turn 4, if all Spawn Points have been Taken Out, your Squad wins.',
            special: 'Spawn x Bugs Adjacent to each Spawn Point at start of Turn, where x is the Turn number. Bugs activate after each player Unit.',
            rewards: []
          },
          {
            missionId: 'ISHTAR-WOODS-M02',
            missionType: 'Location',
            seq: 2,
            title: 'Extract Sample',
            active: true,
            description: 'The flora is as deadly as the enemy. We need genetic material from the high-threat biomass within the Psycho-Tropics.',
            setup: 'Standard setup with Psycho-Tropics Battlefield Effects: roll for Confused tokens on a 1 or Disarmed status on a 10.',
            deployment: 'Standard North/South edge selection.',
            victory: 'When a Player Unit deals unsaved Melee damage, instead of reducing HIT, score 1 MP for each point of damage.',
            special: 'Psychotropic Hazards: Roll 1D6 for movement at the start of Turn 4 due to slithering vines.',
            rewards: []
          }
        ]
      }
    ]
  },
  {
    locationId: 'LOC-AETHELGARD',
    name: 'Aethelgard Prime',
    operationalZones: [
      {
        zoneId: 'ZONE-SECTOR-TECH',
        name: 'Sector-Tech Plant',
        description: '',
        npcSquadId: 'HUMAN-HEGEMONY',
        missions: [
          {
            missionId: 'AETHEL-TECH-M01',
            missionType: 'Location',
            seq: 1,
            title: 'Commitment Protocol',
            active: true,
            description: '"Power must build before the final strike." High-tech nodes are gathering data packets for a final uplink.',
            setup: 'Place 2 Uplink Nodes in West/East tiles and 1 Transmit Beacon in the center. Set Data Packet tracker to zero.',
            deployment: 'Standard one-line deployment before Turn 1.',
            victory: 'At end of Turn 4, the Squad that scored the highest total MP from Transmit actions scores an additional 6 MP.',
            special: '**Mission Action: Uplink (1 ACT):** Control node to gain +1 Data Packet. **Mission Action: Transmit (1 ACT):** Control Beacon in Turns 3-4 to spend 1 Packet for 1 MP.',
            rewards: []
          },
          {
            missionId: 'AETHEL-TECH-M02',
            missionType: 'Location',
            seq: 2,
            title: 'Asset Denial',
            active: true,
            description: 'Command prefers the facility destroyed over it falling into enemy hands. Breach the perimeter and start the self-destruct.',
            setup: 'Set Gate at Northern edge, Console at Eastern edge, and Extraction Zone at Western edge.',
            deployment: 'Deploy within 2 Paces of the Western edge.',
            victory: 'Gate breached, Console activated, and all Standing Units extracted before the 2-turn countdown ends.',
            special: '**Mission Action: Activate Console (2 ACT):** Starts a 2-turn self-destruct clock.',
            rewards: []
          }
        ]
      }
    ]
  },
  {
    locationId: 'LOC-VOID-SCARRED',
    name: 'The Void-Scarred Wrecks',
    operationalZones: [
      {
        zoneId: 'ZONE-DERELICT-WARSHIP',
        name: 'The Derelict Warship',
        description: '',
        npcSquadId: 'CRIMSON-SHROUD',
        missions: [
          {
            missionId: 'VOID-WRECK-M01',
            missionType: 'Location',
            seq: 1,
            title: 'Search and Recover',
            active: true,
            description: 'Valuable intel lies scattered among the ruins of this ancient vessel fallen from warp-space.',
            setup: 'Place 3 Objective markers in the center of the West, Center, and East tiles.',
            deployment: 'Standard North/South edge selection.',
            victory: 'Standard Mission Points (MP) at the end of Turn 4.',
            special: 'Gloom: Maximum visibility is restricted to 1D6+8 Paces.',
            rewards: []
          }
        ]
      },
      {
        zoneId: 'ZONE-FIRE-MOON',
        name: 'The Fire Moon Station',
        description: '',
        npcSquadId: 'NPC-NEUTRAL',
        missions: [
          {
            missionId: 'VOID-FIRE-M01',
            missionType: 'Location',
            seq: 1,
            title: 'Destroy Nexus',
            active: true,
            description: 'This remote research station is a potential treasure trove, but it is criss-crossed by rivers of lava.',
            setup: 'Place 3 Nexus markers in West, Center, and East tiles [Horde Notes].',
            deployment: 'Standard North/South edge selection.',
            victory: 'All Nexus Markers Taken Out.',
            special: 'Nexus markers have ARM 3 and HIT 2. Rivers of Lava: Roll 1D10 on a 10 to flood a section of the board; any model touched is slain.',
            rewards: []
          }
        ]
      }
    ]
  }
] satisfies Location[]

export default locations