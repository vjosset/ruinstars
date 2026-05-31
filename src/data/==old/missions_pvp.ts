import { MissionPlain } from '@/types'

const dedent = (value: string) => {
  const lines = value.replace(/^\n/, '').replace(/\n\s*$/, '').split('\n')
  const nonEmpty = lines.filter((line) => line.trim().length > 0)
  const minIndent = nonEmpty.length
    ? Math.min(...nonEmpty.map((line) => (line.match(/^\s*/)?.[0].length ?? 0)))
    : 0
  return lines.map((line) => line.slice(minIndent)).join('\n')
}

const STANDARD_DEPLOYMENT = 'Both Squads deploy before Turn 1. One Squad deploys Adjacent to the NW, N, and NE Anchors; the other deploys Adjacent to the SW, S, and SE Anchors.'

// Deployment zone colors
const A   = '#dc2626' // Squad A / Attacker
const B   = '#2563eb' // Squad B / Defender
const OBJ = '#2b7c2b' // Objectives

// Standard deployment zone circles: Squad A on north anchors, Squad B on south anchors
const STD_DEPLOY = [
  { id: 'A-NW', type: 'circle' as const, anchor: 'NW' as const, rIn: 2, color: A, fillOpacity: 0.15, showLabel: false, showInLegend: false },
  { id: 'A-N',  type: 'circle' as const, anchor: 'N'  as const, rIn: 2, color: A, fillOpacity: 0.15, showLabel: false, showInLegend: false },
  { id: 'A-NE', type: 'circle' as const, anchor: 'NE' as const, rIn: 2, color: A, fillOpacity: 0.15, showLabel: false, showInLegend: false },
  { id: 'B-SW', type: 'circle' as const, anchor: 'SW' as const, rIn: 2, color: B, fillOpacity: 0.15, showLabel: false, showInLegend: false },
  { id: 'B-S',  type: 'circle' as const, anchor: 'S'  as const, rIn: 2, color: B, fillOpacity: 0.15, showLabel: false, showInLegend: false },
  { id: 'B-SE', type: 'circle' as const, anchor: 'SE' as const, rIn: 2, color: B, fillOpacity: 0.15, showLabel: false, showInLegend: false },
]

const STD_LEGEND = {
  DA: { label: 'Deployment Zone A', color: A },
  DB: { label: 'Deployment Zone B', color: B },
}

const missions_pvp = [
  {
    missionId: '1',
    missionType: 'Primary',
    seq: 1,
    title: 'Secure the Zone',
    active: true,
    description: dedent(`
"Claim ground, hold fast."

Throughout the battle, both sides contest key areas of the warzone. Whoever can consistently secure ground will dictate the flow of the fight.
`),
    setup: 'Place 3 Objectives at the W, C, and E Anchors.',
    deployment: STANDARD_DEPLOYMENT,
    victory: 'At the end of each Turn, Squads score 1 MP per Objective they control.',
    special: 'If a Squad controls all 3 Objectives at the end of any Turn, they gain +1 MP immediately (max once per mission).',
    rewards: [
      {
        name: 'Field Stabilizers',
        effect: 'One Unit gains +1 ARM during Turn 1 of its next mission.'
      },
      {
        name: 'Forward Command',
        effect: '+1 TO during any Turn in the next mission.'
      }
    ],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        ...STD_DEPLOY,
        { id: 'W', type: 'marker' as const, anchor: 'W' as const, label: 'W', color: OBJ, showInLegend: false },
        { id: 'C', type: 'marker' as const, anchor: 'C' as const, label: 'C', color: OBJ, showInLegend: false },
        { id: 'E', type: 'marker' as const, anchor: 'E' as const, label: 'E', color: OBJ, showInLegend: false },
      ],
      legend: {
        ...STD_LEGEND,
        W: 'West Objective',
        C: 'Center Objective',
        E: 'East Objective',
      }
    }
  },
  {
    missionId: '2',
    missionType: 'Primary',
    seq: 2,
    title: 'Hold the Line',
    active: true,
    description: dedent(`
"The enemy breaks upon our wall."

Victory favors the steadfast. The longer you hold, the stronger your claim.
`),
    setup: 'Place two Objectives at the N and S Anchors.',
    deployment: STANDARD_DEPLOYMENT,
    victory: 'At the end of each turn after the first, Squads score 2 MP per Objective they control.',
    special: 'Units in cover Adjacent to an Objective gain +1 ARM against ranged attacks.',
    rewards: [
      {
        name: 'Tactical Resupply',
        effect: 'Select one Unit to be always treated as in Cover for the next mission.'
      },
      {
        name: 'Healed Injury',
        effect: 'One Unit may immediately remove one Injury (excluding Deceased).'
      }
    ],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        ...STD_DEPLOY,
        { id: 'N', type: 'marker' as const, anchor: 'N' as const, label: 'N', color: OBJ, showInLegend: false },
        { id: 'S', type: 'marker' as const, anchor: 'S' as const, label: 'S', color: OBJ, showInLegend: false },
      ],
      legend: {
        ...STD_LEGEND,
        N: 'North Objective',
        S: 'South Objective',
      }
    }
  },
  {
    missionId: '3',
    missionType: 'Primary',
    seq: 3,
    title: 'Power Cycle',
    active: true,
    description: dedent(`
"Reactivate the grid before the enemy shuts it down."

A dormant facility flickers to life. Reactors surge, systems fail, and both sides fight to keep control of unstable nodes.
`),
    setup: 'Place 3 Power Nodes at the W, C, and E Anchors. All Power Nodes start the mission as "Inactive".',
    deployment: STANDARD_DEPLOYMENT,
    victory: 'At the end of each Turn, Squads score 1 MP per Active Node they control.',
    special: dedent(`
At the start of each Turn, all Power Nodes are reset to "Inactive" state.

**Mission Action: Toggle Node (1 ACT):** The Unit toggles the Active state of a Node they control. Active Nodes emit dangerous radiation: At the end of each Turn, all Units Adjacent to an Active node take 1 Damage.
`),
    rewards: [
      {
        name: 'Voltage Spikes',
        effect: 'Select one Unit\'s weapon to gain RLT (Relentless) or RND1 (Rending 1) in the next mission.'
      },
      {
        name: 'Technician Assist',
        effect: 'Select one Unit to gain Technician 1 (perform one Mission action for 1 less ACT) for the next mission.'
      }
    ],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        ...STD_DEPLOY,
        { id: 'W', type: 'marker' as const, anchor: 'W' as const, label: 'W', color: OBJ, showInLegend: false },
        { id: 'C', type: 'marker' as const, anchor: 'C' as const, label: 'C', color: OBJ, showInLegend: false },
        { id: 'E', type: 'marker' as const, anchor: 'E' as const, label: 'E', color: OBJ, showInLegend: false },
      ],
      legend: {
        ...STD_LEGEND,
        W: 'Power Node (W)',
        C: 'Power Node (C)',
        E: 'Power Node (E)',
      }
    }
  },
  {
    missionId: '4',
    missionType: 'Primary',
    seq: 4,
    title: 'Sabotage',
    active: true,
    description: dedent(`
"They built it. You break it."

A vital structure powers the enemy advance. One force must destroy it; the other, defend it at all costs.
`),
    setup: dedent(`
Select one Squad to be the Defender, the other the Attacker.

Place two large terrain pieces centered on the W and E Anchors.
`),
    deployment: 'Both Squads deploy before Turn 1. The Attacker deploys Adjacent to the NW, N, and NE Anchors; the Defender deploys Adjacent to the SW, S, and SE Anchors.',
    victory: 'At the end of Turn 4, the Attacker scores 3 MP for each destroyed terrain piece. Defender scores 3 MP for each remaining terrain piece.',
    special: '**Mission Action: Sabotage (1 ACT):** An Attacker Unit that Controls the W or E Anchor may perform this Action. Remove that terrain piece from the battlefield. All Units within 4" of that Anchor take 2 Damage.',
    rewards: [
      {
        name: 'Demo Expert',
        effect: 'One Unit gains "Demo charge" (a free Grenade action) to use once in the next mission.'
      },
      {
        name: 'Quick Prep',
        effect: 'One Unit gains +1 ACT in Turn 1 of the next mission.'
      }
    ],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        { id: 'AT-NW', type: 'circle' as const, anchor: 'NW' as const, rIn: 2, color: A, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'AT-N',  type: 'circle' as const, anchor: 'N'  as const, rIn: 2, color: A, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'AT-NE', type: 'circle' as const, anchor: 'NE' as const, rIn: 2, color: A, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'DE-SW', type: 'circle' as const, anchor: 'SW' as const, rIn: 2, color: B, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'DE-S',  type: 'circle' as const, anchor: 'S'  as const, rIn: 2, color: B, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'DE-SE', type: 'circle' as const, anchor: 'SE' as const, rIn: 2, color: B, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'W', type: 'marker' as const, anchor: 'W' as const, label: 'W', color: '#b45309', showInLegend: false },
        { id: 'E', type: 'marker' as const, anchor: 'E' as const, label: 'E', color: '#b45309', showInLegend: false },
      ],
      legend: {
        DA: { label: 'Attacker Deployment Zone', color: A },
        DD: { label: 'Defender Deployment Zone', color: B },
        W: 'Sabotage Target (W Anchor)',
        E: 'Sabotage Target (E Anchor)',
      }
    }
  },
  {
    missionId: '5',
    missionType: 'Primary',
    seq: 5,
    title: 'Push the Line',
    active: true,
    description: dedent(`
"Drive them back step by step."

Advance across the battlefield and seize ground from the enemy.
`),
    setup: 'Place 3 Objectives at the N, C, and S Anchors.',
    deployment: STANDARD_DEPLOYMENT,
    victory: 'At the end of each Turn, score 1 MP if you control the Objective at your own deployment edge, 2 MP if you control the Center, and 3 MP if you control the Objective at the enemy\'s deployment edge.',
    special: 'If you control the enemy Objective at the end of Turn 3 or earlier, gain an additional +1 MP bonus (once per game).',
    rewards: [
      {
        name: 'Aggressive Push',
        effect: 'One Unit gains +1 ACT in Turn 1 of the next mission.'
      },
      {
        name: 'Rapid Deployment',
        effect: 'One Unit may perform a free move after its deployment. If the next mission deploys Units before Turn 1, perform this move after all Units have been deployed, before Turn 1.'
      }
    ],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        ...STD_DEPLOY,
        { id: 'N', type: 'marker' as const, anchor: 'N' as const, label: 'N', color: OBJ, showInLegend: false },
        { id: 'C', type: 'marker' as const, anchor: 'C' as const, label: 'C', color: OBJ, showInLegend: false },
        { id: 'S', type: 'marker' as const, anchor: 'S' as const, label: 'S', color: OBJ, showInLegend: false },
      ],
      legend: {
        ...STD_LEGEND,
        N: 'North Objective',
        C: 'Center Objective',
        S: 'South Objective',
      }
    }
  },
  {
    missionId: '6',
    missionType: 'Primary',
    seq: 6,
    title: 'Centerpoint',
    active: true,
    description: dedent(`
"All roads lead to ruin."

The battle converges on a single decisive location.
`),
    setup: 'Place 1 Objective at the C Anchor.',
    deployment: STANDARD_DEPLOYMENT,
    victory: 'At the end of Turn 4, the Squad controlling the C Anchor scores 6 MP.',
    special: null,
    rewards: [
      {
        name: 'Decisive Strike',
        effect: 'One Unit gets one Spoil of War for the next mission.'
      },
      {
        name: 'Weapon Calibration',
        effect: 'Select one Unit\'s weapon to gain RLT (Relentless) or RND1 (Rending 1) in the next mission.'
      }
    ],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        ...STD_DEPLOY,
        { id: 'C', type: 'marker' as const, anchor: 'C' as const, label: 'C', color: OBJ, showInLegend: false },
      ],
      legend: {
        ...STD_LEGEND,
        C: 'Objective',
      }
    }
  },
  {
    missionId: '7',
    missionType: 'Primary',
    seq: 7,
    title: 'Recover Intel',
    active: true,
    description: dedent(`
"Retrieve the data before the uplink burns."

Valuable intel lies scattered among the ruins.
`),
    setup: 'Place 3 Data Core markers at the W, C, and E Anchors.',
    deployment: STANDARD_DEPLOYMENT,
    victory: 'At the end of Turn 4, score 2 MP per Data Core carried by your Units.',
    special: '**Mission Action: Collect Intel (1 ACT):** A Unit that controls a Data Core may perform this action. That Unit now carries the Data Core. Units may only carry one Data Core each. If a carrier is Taken Out, the Data Core drops on that Unit\'s position.',
    rewards: [
      {
        name: 'Intelligence Priority',
        effect: 'Start the next mission with +1 TO. Once during the next mission, you may re-roll any number of your TO dice.'
      },
      {
        name: 'Treasure Trove',
        effect: 'The Squad may spend an additional 5GP on Weapons and Skills for the next mission. At the end of that mission, remove the added Gear.'
      }
    ],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        ...STD_DEPLOY,
        { id: 'W', type: 'marker' as const, anchor: 'W' as const, label: 'W', color: OBJ, showInLegend: false },
        { id: 'C', type: 'marker' as const, anchor: 'C' as const, label: 'C', color: OBJ, showInLegend: false },
        { id: 'E', type: 'marker' as const, anchor: 'E' as const, label: 'E', color: OBJ, showInLegend: false },
      ],
      legend: {
        ...STD_LEGEND,
        W: 'Intel 1',
        C: 'Intel 2',
        E: 'Intel 3',
      }
    }
  },
  {
    missionId: '8',
    missionType: 'Primary',
    seq: 8,
    title: 'Ambush',
    active: true,
    description: dedent(`
"Intercept the courier before they vanish into the wasteland."

One side must extract a critical asset; the other must stop them.
`),
    setup: dedent(`
Select one Squad to be the Defender, the other the Attacker.

Defender secretly selects one Unit (excluding the Leader) to be the carrier of the Intel.
`),
    deployment: 'Both Squads deploy before Turn 1. The Defender deploys all their Units Adjacent to the NW, W, or SW Anchors. The Attacker deploys all their Units Adjacent to the N, NE, S, or SE Anchors.',
    victory: 'At the end of Turn 4, if the Defender Squad is carrying the Intel and the carrier is on the Eastern edge of the battlefield, Defender wins the mission. Attacker wins in all other cases.',
    special: 'When a Unit carrying the Intel is Taken Out, place the Core on its position. It can be recovered and carried off by any Unit.',
    rewards: [
      {
        name: 'Disruption Scan',
        effect: 'One Unit gains +1 SKL on its Melee or Ranged weapons (pick one) for the next mission.'
      },
      {
        name: 'Targeted Strike',
        effect: 'The enemy Leader gains -1 ARM (minimum 1) for the next mission.'
      }
    ],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        { id: 'DE-NW', type: 'circle' as const, anchor: 'NW' as const, rIn: 2, color: B, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'DE-W',  type: 'circle' as const, anchor: 'W'  as const, rIn: 2, color: B, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'DE-SW', type: 'circle' as const, anchor: 'SW' as const, rIn: 2, color: B, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'AT-N',  type: 'circle' as const, anchor: 'N'  as const, rIn: 2, color: A, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'AT-NE', type: 'circle' as const, anchor: 'NE' as const, rIn: 2, color: A, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'AT-S',  type: 'circle' as const, anchor: 'S'  as const, rIn: 2, color: A, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'AT-SE', type: 'circle' as const, anchor: 'SE' as const, rIn: 2, color: A, fillOpacity: 0.15, showLabel: false, showInLegend: false },
      ],
      legend: {
        DA: { label: 'Attacker Deployment Zone', color: A },
        DD: { label: 'Defender Deployment Zone', color: B },
      }
    }
  },
  {
    missionId: '9',
    missionType: 'Primary',
    seq: 9,
    title: 'Relay Run',
    active: true,
    description: dedent(`
"Grab the beacon and get it home."

A beacon must be secured and relayed back to command.
`),
    setup: 'Place one Beacon at the C Anchor.',
    deployment: STANDARD_DEPLOYMENT,
    victory: 'A Squad scores 6 MP if any Unit exits their own Battlefield edge carrying the Beacon.',
    special: 'The Beacon is a marker that can be Picked Up. While carrying the Beacon, Units have -1 ACT (minimum 1).',
    rewards: [
      {
        name: 'TO Optimization',
        effect: 'During the next mission, the Squad may re-roll TOs once.'
      },
      {
        name: 'Swift Runner',
        effect: 'One Unit gains Swift (first Dash action costs 0 ACT) in the next mission.'
      }
    ],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        ...STD_DEPLOY,
        { id: 'C', type: 'marker' as const, anchor: 'C' as const, label: 'C', color: OBJ, showInLegend: false },
      ],
      legend: {
        ...STD_LEGEND,
        C: 'Beacon',
      }
    }
  },
  {
    missionId: '10',
    missionType: 'Primary',
    seq: 10,
    title: 'Search and Recover',
    active: true,
    description: dedent(`
"A powerful artifact is buried here. Find it before the enemy does."

You don't know where it is, but the longer you search, the better your odds.
`),
    setup: 'Place 3 Search markers at the W, C, and E Anchors.',
    deployment: STANDARD_DEPLOYMENT,
    victory: 'At the end of each Turn, the Squad carrying the artifact scores 2 MP.',
    special: dedent(`
**Mission Action: Search (2ACT)**
A Unit that Controls a Search Marker may spend 2ACT to search it.
Roll 1D6. This roll cannot be modified or re-rolled by using TOs.

If the roll is less than or equal to the current Turn number, the Artifact is found. Remove all other search markers, and the Artifact is carried by the Unit that found it.

After searching a marker, remove it from the Battlefield.`),
    rewards: [
      {
        name: 'Ancient Artifact',
        effect: 'The carrier gains one Spoil of War. If it is not Taken Out by the end of the mission, it may keep that Spoil of War. If the Unit is Taken Out by the end of the mission, remove that Spoil of War.'
      },
      {
        name: 'Preemptive Strike',
        effect: 'Select one enemy Unit to start the mission with -1 HIT.'
      }
    ],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        ...STD_DEPLOY,
        { id: 'W', type: 'marker' as const, anchor: 'W' as const, label: 'W', color: OBJ, showInLegend: false },
        { id: 'C', type: 'marker' as const, anchor: 'C' as const, label: 'C', color: OBJ, showInLegend: false },
        { id: 'E', type: 'marker' as const, anchor: 'E' as const, label: 'E', color: OBJ, showInLegend: false },
      ],
      legend: {
        ...STD_LEGEND,
        W: 'Search 1',
        C: 'Search 2',
        E: 'Search 3',
      }
    }
  },
  {
    missionId: '11',
    missionType: 'Primary',
    seq: 11,
    title: 'Commitment Protocol',
    active: true,
    description: dedent(`
"Power must build before the final strike."

Energy charges build throughout the fight until a decisive moment of release.
`),
    setup: 'Place 2 Uplink Nodes at the W and E Anchors. Place 1 Transmit Beacon at the C Anchor. Set up a tracker for each Squad\'s Data Packets, starting at zero.',
    deployment: STANDARD_DEPLOYMENT,
    victory: 'At the end of Turn 4, the Squad with the most MP wins the Mission. In case of a tie, the Squad with the highest remaining Data Packets wins the mission.',
    special: dedent(`
**Mission Action: Uplink (1ACT):** A Unit that Controls an Uplink Node increases its Squad's Data Packets by 1.

**Mission Action: Transmit (1 ACT):** A Unit that Controls the Transmit Beacon reduces its Squad's Data Packets by 1 and scores 1 MP. This can only be done in Turns 3 and 4.
`),
    rewards: [
      {
        name: 'Energy Overflow',
        effect: 'One Unit gains +1 ACT in any one Turn in the next Mission (announce when activating).'
      },
      {
        name: 'Tactical Reversal',
        effect: 'Once in the next mission, any Unit may spend 1 ACT to add 2 TOs to its Squad.'
      }
    ],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        ...STD_DEPLOY,
        { id: 'W', type: 'marker' as const, anchor: 'W' as const, label: 'W', color: OBJ,      showInLegend: false },
        { id: 'C', type: 'marker' as const, anchor: 'C' as const, label: 'C', color: '#7c3aed', showInLegend: false },
        { id: 'E', type: 'marker' as const, anchor: 'E' as const, label: 'E', color: OBJ,      showInLegend: false },
      ],
      legend: {
        ...STD_LEGEND,
        W: 'Uplink Node (W)',
        C: 'Transmit Beacon (C)',
        E: 'Uplink Node (E)',
      }
    }
  },
  {
    missionId: '12',
    missionType: 'Primary',
    seq: 12,
    title: 'Attrition',
    active: true,
    description: dedent(`
"No prisoners."

Your orders are simple: outkill the enemy.
`),
    setup: null,
    deployment: STANDARD_DEPLOYMENT,
    victory: 'Each time a Unit is Taken Out, the enemy Squad scores MPs equal to that Unit\'s starting HIT.',
    special: null,
    rewards: [
      {
        name: 'Aggressive Momentum',
        effect: 'One Unit gains +1 SKL on its Weapons the first time it performs a Ranged or Melee combat Action in the next mission.'
      },
      {
        name: 'Reinforced Armor',
        effect: 'One Unit gains +1 ARM (Armor) during Turn 1 of the next mission.'
      }
    ],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [ ...STD_DEPLOY ],
      legend: { ...STD_LEGEND }
    }
  },
  {
    missionId: '13',
    missionType: 'Primary',
    seq: 13,
    title: 'Last Stand',
    active: true,
    description: dedent(`
"Stand your ground until nothing moves."

The battle grinds to dust. Only the unbroken remain.
`),
    setup: null,
    deployment: STANDARD_DEPLOYMENT,
    victory: 'At the end of each Turn, the squad with the highest total remaining HIT of Standing Units scores 2 MP.',
    special: null,
    rewards: [
      {
        name: 'Veteran Status',
        effect: 'One Unit permanently gains +1 SKL on its Melee weapons.'
      },
      {
        name: 'Urgent Treatment',
        effect: 'One Unit may immediately heal one of its Injuries.'
      }
    ],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [ ...STD_DEPLOY ],
      legend: { ...STD_LEGEND }
    }
  },
  {
    missionId: '14',
    missionType: 'Primary',
    seq: 14,
    title: 'Assassinate',
    active: true,
    description: dedent(`
"Cut off the head, the body dies."

Hunt down the enemy commander.
`),
    setup: null,
    deployment: STANDARD_DEPLOYMENT,
    victory: 'If the enemy Leader is Taken Out, your Squad immediately scores 6 MP.',
    special: 'Leaders gain +1 ACT for this mission.',
    rewards: [
      {
        name: 'Intel Leak',
        effect: 'In the next mission, enemy Leader gains -1 ARM (minimum 1).'
      },
      {
        name: 'Strategize Bonus',
        effect: 'Once during the next mission, a Unit may spend 1 ACT to gain 2 TOs.'
      }
    ],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [ ...STD_DEPLOY ],
      legend: { ...STD_LEGEND }
    }
  },
  {
    missionId: '15',
    missionType: 'Primary',
    seq: 15,
    title: 'Rivals',
    active: true,
    description: dedent(`
"Settle the score."

Two Units meet on the battlefield, bound by vengeance or destiny.
`),
    setup: 'Each Squad secretly selects one Rival Unit (not the Leader). Reveal simultaneously after deployment.',
    deployment: STANDARD_DEPLOYMENT,
    victory: 'If your Rival Takes Out the enemy Rival, score 6 MP. If both Rivals are still Standing at the end of the mission, the mission is a draw (randomly select rewards).',
    special: 'Rivals\' weapons gain +1 ATT and +1 SKL against each other. In addition, Rivals may only be targeted in combat by the enemy Rival.',
    rewards: [
      {
        name: 'Personal Vendetta',
        effect: 'In the next mission, select one enemy Unit (excluding the Leader). Your Units gain +1 SKL (Ranged or Melee Skill) each time that enemy is targeted in combat.'
      },
      {
        name: 'Defensive Stance',
        effect: 'One Unit gains Tough 1 (re-roll 1 Melee Save die) in the next mission.'
      }
    ],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [ ...STD_DEPLOY ],
      legend: { ...STD_LEGEND }
    }
  },
  {
    missionId: '16',
    missionType: 'Primary',
    seq: 16,
    title: 'Encroach',
    active: true,
    description: dedent(`
"Push deep and hold the line."

Dominate enemy territory with strength of arms.
`),
    setup: null,
    deployment: STANDARD_DEPLOYMENT,
    victory: 'At the end of each Turn, the Squad with the highest total remaining HIT of Standing Units that are not Adjacent to any enemies and that are closer to the enemy deployment edge than their own deployment edge scores 2 MP.',
    special: null,
    rewards: [
      {
        name: 'Overwhelming Presence',
        effect: 'Once in the next mission, instead of rolling for TOs, get 4 TOs.'
      },
      {
        name: 'Deep Strike',
        effect: 'One Unit may perform a free move after its deployment. If the next mission deploys Units before Turn 1, perform this move after all Units have been deployed.'
      }
    ],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [ ...STD_DEPLOY ],
      legend: { ...STD_LEGEND }
    }
  },
  {
    missionId: '17',
    missionType: 'Primary',
    seq: 17,
    title: 'Evac Point',
    active: true,
    description: dedent(`
"Rendezvous or die trying."

The dropship waits only moments. Reach it before the storm consumes the battlefield.
`),
    setup: dedent(`
Set up the Evac Zone within 4" of the C Anchor.

Select one Squad to be the Attacker, the other is the Defender.
`),
    deployment: dedent(`
Squads deploy before Turn 1. The Defender deploys all Units within the Evac Zone (within 4" of the C Anchor).

The Attacker deploys all Units Adjacent to any Anchor on any battlefield edge.
`),
    victory: 'At the end of Turn 4, if the total remaining HIT of Standing Defender Units within 4" of the C Anchor is equal to or higher than the total remaining HIT of Standing Attacker Units within 4" of the C Anchor, Defender Squad wins the mission. Attacker Squad wins in all other cases.',
    special: null,
    rewards: [
      {
        name: 'Extraction Gear',
        effect: 'One Unit gains Grappling Hook (ignore vertical distance when climbing up or down) in the next mission.'
      },
      {
        name: 'Resourceful Salvage',
        effect: 'One Unit gains a MedPack (spend 1 ACT to recover 1D3 lost HIT) to use once in the next mission.'
      }
    ],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        { id: 'AT-NW', type: 'circle' as const, anchor: 'NW' as const, rIn: 2, color: B, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'AT-N',  type: 'circle' as const, anchor: 'N'  as const, rIn: 2, color: B, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'AT-NE', type: 'circle' as const, anchor: 'NE' as const, rIn: 2, color: B, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'AT-E',  type: 'circle' as const, anchor: 'E'  as const, rIn: 2, color: B, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'AT-SE', type: 'circle' as const, anchor: 'SE' as const, rIn: 2, color: B, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'AT-S',  type: 'circle' as const, anchor: 'S'  as const, rIn: 2, color: B, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'AT-SW', type: 'circle' as const, anchor: 'SW' as const, rIn: 2, color: B, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'AT-W',  type: 'circle' as const, anchor: 'W'  as const, rIn: 2, color: B, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'evac',  type: 'circle' as const, anchor: 'C'  as const, rIn: 4, color: A, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'C',     type: 'marker' as const, anchor: 'C'  as const, label: 'C', color: A, showInLegend: false },
      ],
      legend: {
        DD: { label: 'Evac Zone (Defender Deploys Here)', color: A },
        DA: { label: 'Attacker Deployment Zone',         color: B },
      }
    }
  }
] satisfies MissionPlain[]

export default missions_pvp
