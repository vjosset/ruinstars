import { MissionPlain } from '@/types'

const dedent = (value: string) => {
  const lines = value.replace(/^\n/, '').replace(/\n\s*$/, '').split('\n')
  const nonEmpty = lines.filter((line) => line.trim().length > 0)
  const minIndent = nonEmpty.length
    ? Math.min(...nonEmpty.map((line) => (line.match(/^\s*/)?.[0].length ?? 0)))
    : 0
  return lines.map((line) => line.slice(minIndent)).join('\n')
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
    setup: 'Place 3 Objective markers equally spaced (6" apart) along the center line.',
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
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
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_0_0_0_14_0',
          type: 'rect',
          xIn: 0,
          yIn: 0,
          wIn: 24,
          hIn: 1,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_4_0_14_14_14',
          type: 'rect',
          xIn: 0,
          yIn: 23,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_2_7_2_7',
          type: 'rect',
          xIn: 5.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_2_7_7_7_7',
          type: 'rect',
          xIn: 11.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_3_12_7_12_7',
          type: 'rect',
          xIn: 17.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        { type: 'callout', id: 'o2-x', x1In: 6, y1In: 13, x2In: 12, y2In: 13, text: '6"', labelSizeIn: 1 },
        { type: 'callout', id: 'o3-x', x1In: 12, y1In: 13, x2In: 18, y2In: 13, text: '6"', labelSizeIn: 1 },
      ],
      legend: {
        DA: {
          label: 'Deployment Zone A',
          color: '#dc2626'
        },
        DB: {
          label: 'Deployment Zone B',
          color: '#2563eb'
        },
        O1: {
          label: 'Objective 1',
          color: '#2b7c2b'
        },
        O2: {
          label: 'Objective 2',
          color: '#2b7c2b'
        },
        O3: {
          label: 'Objective 3',
          color: '#2b7c2b'
        }
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
    setup: 'Place two Objective markers 6" from the North and South battlefield edges.',
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
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
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_0_0_0_14_0',
          type: 'rect',
          xIn: 0,
          yIn: 0,
          wIn: 24,
          hIn: 1,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_7_2_7_2',
          type: 'rect',
          xIn: 11.5,
          yIn: 5.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_2_7_12_7_12',
          type: 'rect',
          xIn: 11.5,
          yIn: 17.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_3_0_14_14_14',
          type: 'rect',
          xIn: 0,
          yIn: 23,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        },
        { type: 'callout', id: 'o1-Y', x1In: 11, y1In: 0, x2In: 11, y2In: 6, text: '6"', labelSizeIn: 1 },
        { type: 'callout', id: 'o2-Y', x1In: 11, y1In: 24, x2In: 11, y2In: 18, text: '6"', labelSizeIn: 1 }
      ],
      legend: {
        DA: {
          label: 'Deployment Zone A',
          color: '#dc2626'
        },
        DB: {
          label: 'Deployment Zone B',
          color: '#2563eb'
        },
        O1: {
          label: 'Objective 1',
          color: '#2b7c2b'
        },
        O2: {
          label: 'Objective 2',
          color: '#2b7c2b'
        }
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
    setup: 'Place 3 Power Node markers 6" apart along the battlefield center line. All Power Nodes start the mission as "Inactive".',
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
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
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_0_0_0_14_0',
          type: 'rect',
          xIn: 0,
          yIn: 0,
          wIn: 24,
          hIn: 1,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_2_7_2_7',
          type: 'rect',
          xIn: 5.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_2_7_7_7_7',
          type: 'rect',
          xIn: 11.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_3_12_7_12_7',
          type: 'rect',
          xIn: 17.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_4_0_14_14_14',
          type: 'rect',
          xIn: 0,
          yIn: 23,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        },
        { type: 'callout', id: 'o2-x', x1In: 6, y1In: 13, x2In: 12, y2In: 13, text: '6"', labelSizeIn: 1 },
        { type: 'callout', id: 'o3-x', x1In: 12, y1In: 13, x2In: 18, y2In: 13, text: '6"', labelSizeIn: 1 },
      ],
      legend: {
        DA: {
          label: 'Deployment Zone A',
          color: '#dc2626'
        },
        DB: {
          label: 'Deployment Zone B',
          color: '#2563eb'
        },
        O1: {
          label: 'Power Node 1',
          color: '#2b7c2b'
        },
        O2: {
          label: 'Power Node 2',
          color: '#2b7c2b'
        },
        O3: {
          label: 'Power Node 3',
          color: '#2b7c2b'
        }
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

Place two larger structures in the West and East sides and one Sabotage marker at each corner of each structure.
`),
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
    victory: 'At the end of Turn 4, the Attacker scores 3 MP for each destroyed structure. Defender scores 3 MP for each remaining intact.',
    special: '**Mission Action: Sabotage (1 ACT):** An Attacker Unit that controls a Sabotage marker may perform this Action. Remove the sabotaged structure from the battlefield. All Units within or Adjacent to that structure take 2 Damage.',
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
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_0_0_0_14_0',
          type: 'rect',
          xIn: 0,
          yIn: 0,
          wIn: 24,
          hIn: 1,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_0_5_4_9',
          type: 'rect',
          xIn: 0,
          yIn: 8,
          wIn: 8,
          hIn: 8,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_10_5_14_9',
          type: 'rect',
          xIn: 16,
          yIn: 8,
          wIn: 8,
          hIn: 8,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_2_0_14_14_14',
          type: 'rect',
          xIn: 0,
          yIn: 23,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        },
        { type: 'callout', id: 'o1-x', x1In: 0, y1In: 7, x2In: 8, y2In: 7, text: '8"', labelSizeIn: 1 },
        { type: 'callout', id: 'o1-y', x1In: 9, y1In: 8, x2In: 9, y2In: 16, text: '8"', labelSizeIn: 1 },
        { type: 'callout', id: 'o2-x', x1In: 16, y1In: 7, x2In: 24, y2In: 7, text: '8"', labelSizeIn: 1 },
        { type: 'callout', id: 'o2-y', x1In: 15, y1In: 8, x2In: 15, y2In: 16, text: '8"', labelSizeIn: 1 },
      ],
      legend: {
        DA: {
          label: 'Attacker Deployment Zone',
          color: '#dc2626'
        },
        DD: {
          label: 'Defender Deployment Zone',
          color: '#2563eb'
        },
        S1: {
          label: 'Sabotage Target 1',
          color: '#dc2626'
        },
        S2: {
          label: 'Sabotage Target 2',
          color: '#dc2626'
        }
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
    setup: 'Place 3 Objectives: one centered on each Squad\'s Deployment edge and one at the exact center.',
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
    victory: 'At the end of each Turn, score 1 MP if you control your own Objective, 2 MP if you control the center, and 3 MP if you control the enemy\'s.',
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
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_0_0_0_6_0',
          type: 'rect',
          xIn: 0,
          yIn: 0,
          wIn: 24,
          hIn: 1,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_7_0_7_0',
          type: 'rect',
          xIn: 11.5,
          yIn: 0,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_2_7_7_7_7',
          type: 'rect',
          xIn: 11.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_3_0_14_6_14',
          type: 'rect',
          xIn: 0,
          yIn: 23,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_4_7_14_7_14',
          type: 'rect',
          xIn: 11.5,
          yIn: 23,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        }
      ],
      legend: {
        DA: {
          label: 'Deployment Zone A',
          color: '#dc2626'
        },
        DB: {
          label: 'Deployment Zone B',
          color: '#2563eb'
        },
        O1: {
          label: 'Objective 1',
          color: '#2b7c2b'
        },
        O2: {
          label: 'Objective 2',
          color: '#2b7c2b'
        },
        O3: {
          label: 'Objective 3',
          color: '#2b7c2b'
        }
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
    setup: 'Place 1 Objective at the exact center of the Battlefield.',
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
    victory: 'At the end of Turn 4, the Squad controlling the central Objective scores 6 MP.',
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
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_0_0_0_14_0',
          type: 'rect',
          xIn: 0,
          yIn: 0,
          wIn: 24,
          hIn: 1,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_7_7_7_7',
          type: 'rect',
          xIn: 11.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_2_0_14_14_14',
          type: 'rect',
          xIn: 0,
          yIn: 23,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        }
      ],
      legend: {
        DA: {
          label: 'Deployment Zone A',
          color: '#dc2626'
        },
        DB: {
          label: 'Deployment Zone B',
          color: '#2563eb'
        },
        O1: {
          label: 'Objective',
          color: '#2b7c2b'
        }
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
    setup: 'Place 3 Data Core markers along the center line of the battlefield.',
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
    victory: 'At the end of Turn 4, score 2 MP per Data Core carried by your Units.',
    special: '**Mission Action: Collect Intel (1 ACT):** A Unit that controls a Data Core may perform this action. That Unit now carries the Data Core. Units may only carry one Data Core each. If a carrier is Taken Out, the Data Core drops on that Units position.',
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
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_0_0_0_14_0',
          type: 'rect',
          xIn: 0,
          yIn: 0,
          wIn: 24,
          hIn: 1,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_2_7_2_7',
          type: 'rect',
          xIn: 5.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_2_7_7_7_7',
          type: 'rect',
          xIn: 11.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_3_12_7_12_7',
          type: 'rect',
          xIn: 17.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_4_0_14_14_14',
          type: 'rect',
          xIn: 0,
          yIn: 23,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        },
        { type: 'callout', id: 'o2-x', x1In: 6, y1In: 13, x2In: 12, y2In: 13, text: '6"', labelSizeIn: 1 },
        { type: 'callout', id: 'o3-x', x1In: 12, y1In: 13, x2In: 18, y2In: 13, text: '6"', labelSizeIn: 1 },
      ],
      legend: {
        DA: {
          label: 'Deployment Zone A',
          color: '#dc2626'
        },
        DB: {
          label: 'Deployment Zone B',
          color: '#2563eb'
        },
        O1: {
          label: 'Intel 1',
          color: '#2b7c2b'
        },
        O2: {
          label: 'Intel 2',
          color: '#2b7c2b'
        },
        O3: {
          label: 'Intel 3',
          color: '#2b7c2b'
        }
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
    deployment: 'Both Squads deploy before Turn 1. Defender deploys all their Units on the Western battlefield edge first. Then Attacker Squad deploys all their Units on the Northern or Southern edge of the battlefield, at least 8" from the Western edge.',
    victory: 'At the end of Turn 4, if the Defender Squad is carrying the Intel and the carrier is on the Eastern edge of the battlefield, Defender wins the mission. Attacker wins in all other cases.',
    special: 'When a Unit carrying the Intel is Taken Out, place the Core on its position. It can be recovered and carried off by any Unit.',
    rewards: [
      {
        name: 'Disruption Scan',
        effect: 'One Unit gains +1 MSK (Melee Skill) or +1 RSK (Ranged Skill) for the next mission.'
      },
      {
        name: 'Targeted Strike',
        effect: 'The enemy Leader gains -1 ARM (minimum 1) for the next mission.'
      }
    ],
    diagram: {
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_0_0_0_0_14',
          type: 'rect',
          xIn: 0,
          yIn: 0,
          wIn: 1,
          hIn: 24,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_5_0_14_0',
          type: 'rect',
          xIn: 8,
          yIn: 0,
          wIn: 16,
          hIn: 1,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_5_14_14_14',
          type: 'rect',
          xIn: 8,
          yIn: 23,
          wIn: 16,
          hIn: 1,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        { type: 'callout', id: 'dn1', x1In: 8, y1In: 2, x2In: 24, y2In: 2, text: '16"', labelSizeIn: 1 },
        { type: 'callout', id: 'dn2', x1In: 0, y1In: 2, x2In: 8, y2In: 2, text: '8"', labelSizeIn: 1 },
        { type: 'callout', id: 'ds1', x1In: 8, y1In: 22, x2In: 24, y2In: 22, text: '16"', labelSizeIn: 1 },
        { type: 'callout', id: 'ds2', x1In: 0, y1In: 22, x2In: 8, y2In: 22, text: '8"', labelSizeIn: 1 },
      ],
      legend: {
        DA: {
          label: 'Attacker Deployment Zone',
          color: '#dc2626'
        },
        DD: {
          label: 'Defender Deployment Zone',
          color: '#2563eb'
        }
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
    setup: 'Place one Beacon Objective at the Battlefield center.',
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
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
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_0_0_0_14_0',
          type: 'rect',
          xIn: 0,
          yIn: 0,
          wIn: 24,
          hIn: 1,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_7_7_7_7',
          type: 'rect',
          xIn: 11.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_2_0_14_14_14',
          type: 'rect',
          xIn: 0,
          yIn: 23,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        }
      ],
      legend: {
        DA: {
          label: 'Deployment Zone A',
          color: '#dc2626'
        },
        DB: {
          label: 'Deployment Zone B',
          color: '#2563eb'
        },
        O1: {
          label: 'Beacon',
          color: '#2b7c2b'
        }
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
    setup: 'Place 3 Search markers 6" apart along the center line of the battlefield.',
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
    victory: 'At the end of each Turn, the Squad carrying the artifact scores 2 MP.',
    special: dedent(`
**Mission Action: Search (2ACT)**  
A Unit that Controls a Search Marker may spend 2ACT to search it.
Roll 1D6. This roll cannot be modified or re-rolled by using TOs.

- On the first searched marker, the Artifact is found on a roll of 1
- On the second searched marker, the Artifact is found on a roll of 1 or 2
- On the third searched marker, the Artifact is found automatically

After searching a marker, remove it from the Battlefield.
Once found, the Artifact is carried by the Unit that found it.
`),
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
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_0_0_0_14_0',
          type: 'rect',
          xIn: 0,
          yIn: 0,
          wIn: 24,
          hIn: 1,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_2_7_2_7',
          type: 'rect',
          xIn: 5.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_2_7_7_7_7',
          type: 'rect',
          xIn: 11.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_3_12_7_12_7',
          type: 'rect',
          xIn: 17.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_4_0_14_14_14',
          type: 'rect',
          xIn: 0,
          yIn: 23,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        },
        { type: 'callout', id: 'o2-x', x1In: 6, y1In: 13, x2In: 12, y2In: 13, text: '6"', labelSizeIn: 1 },
        { type: 'callout', id: 'o3-x', x1In: 12, y1In: 13, x2In: 18, y2In: 13, text: '6"', labelSizeIn: 1 },
      ],
      legend: {
        DA: {
          label: 'Deployment Zone A',
          color: '#dc2626'
        },
        DB: {
          label: 'Deployment Zone B',
          color: '#2563eb'
        },
        O1: {
          label: 'Search 1',
          color: '#2b7c2b'
        },
        O2: {
          label: 'Search 2',
          color: '#2b7c2b'
        },
        O3: {
          label: 'Search 3',
          color: '#2b7c2b'
        }
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
    setup: 'Place 2 Uplink Node markers 6" from the center of the battlefield. Place one Transmit Beacon in the center of the battlefield. Set up a tracker for each Squad\'s Data Packets, starting at zero.',
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
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
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_0_0_0_14_0',
          type: 'rect',
          xIn: 0,
          yIn: 0,
          wIn: 24,
          hIn: 1,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_2_7_2_7',
          type: 'rect',
          xIn: 5.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_2_7_7_7_7',
          type: 'rect',
          xIn: 11.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_3_12_7_12_7',
          type: 'rect',
          xIn: 17.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_4_0_14_14_14',
          type: 'rect',
          xIn: 0,
          yIn: 23,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        },
        { type: 'callout', id: 'o2-x', x1In: 6, y1In: 13, x2In: 12, y2In: 13, text: '6"', labelSizeIn: 1 },
        { type: 'callout', id: 'o3-x', x1In: 12, y1In: 13, x2In: 18, y2In: 13, text: '6"', labelSizeIn: 1 },
      ],
      legend: {
        DA: {
          label: 'Deployment Zone A',
          color: '#dc2626'
        },
        DB: {
          label: 'Deployment Zone B',
          color: '#2563eb'
        },
        UA: {
          label: 'UA',
          color: '#2b7c2b'
        },
        UB: {
          label: 'UB',
          color: '#2b7c2b'
        },
        TB: {
          label: 'TB',
          color: '#2b7c2b'
        }
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
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
    victory: 'Each time a Unit is Taken Out, the enemy Squad scores MPs equal to that Unit\'s Force Value (FV).',
    special: null,
    rewards: [
      {
        name: 'Aggressive Momentum',
        effect: 'One Unit gains +1 MSK or +1 RSK the first time it performs a Ranged or Melee combat Action in the next mission.'
      },
      {
        name: 'Reinforced Armor',
        effect: 'One Unit gains +1 ARM (Armor) during Turn 1 of the next mission.'
      }
    ],
    diagram: {
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_0_0_0_14_0',
          type: 'rect',
          xIn: 0,
          yIn: 0,
          wIn: 24,
          hIn: 1,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_0_14_14_14',
          type: 'rect',
          xIn: 0,
          yIn: 23,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        }
      ],
      legend: {
        DA: {
          label: 'Deployment Zone A',
          color: '#dc2626'
        },
        DB: {
          label: 'Deployment Zone B',
          color: '#2563eb'
        }
      }
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
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
    victory: 'At the end of each Turn, the squad with the highest total FV of Standing Units scores 2 MP.',
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
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_0_0_0_14_0',
          type: 'rect',
          xIn: 0,
          yIn: 0,
          wIn: 24,
          hIn: 1,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_0_14_14_14',
          type: 'rect',
          xIn: 0,
          yIn: 23,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        }
      ],
      legend: {
        DA: {
          label: 'Deployment Zone A',
          color: '#dc2626'
        },
        DB: {
          label: 'Deployment Zone B',
          color: '#2563eb'
        }
      }
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
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
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
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_0_0_0_14_0',
          type: 'rect',
          xIn: 0,
          yIn: 0,
          wIn: 24,
          hIn: 1,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_0_14_14_14',
          type: 'rect',
          xIn: 0,
          yIn: 23,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        }
      ],
      legend: {
        DA: {
          label: 'Deployment Zone A',
          color: '#dc2626'
        },
        DB: {
          label: 'Deployment Zone B',
          color: '#2563eb'
        }
      }
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
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
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
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_0_0_0_14_0',
          type: 'rect',
          xIn: 0,
          yIn: 0,
          wIn: 24,
          hIn: 1,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_0_14_14_14',
          type: 'rect',
          xIn: 0,
          yIn: 23,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        }
      ],
      legend: {
        DA: {
          label: 'Deployment Zone A',
          color: '#dc2626'
        },
        DB: {
          label: 'Deployment Zone B',
          color: '#2563eb'
        }
      }
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
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
    victory: 'At the end of each Turn, the Squad with the highest total FV of Standing Units that are not Adjacent to any enemies and that are closer to the enemy deployment edge than their own deployment edge scores 2 MP.',
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
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_0_0_0_14_0',
          type: 'rect',
          xIn: 0,
          yIn: 0,
          wIn: 24,
          hIn: 1,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_0_14_14_14',
          type: 'rect',
          xIn: 0,
          yIn: 23,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        }
      ],
      legend: {
        DA: {
          label: 'Deployment Zone A',
          color: '#dc2626'
        },
        DB: {
          label: 'Deployment Zone B',
          color: '#2563eb'
        }
      }
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

The dropship waits only moments—reach it before the storm consumes the battlefield.
`),
    setup: dedent(`
Set up the Evac Zone as an 8" square at the center of the battlefield.

Select one Squad to be the Attacker, the other is the Defender.
`),
    deployment: dedent(`
Squads deploy before Turn 1. First, Defender Squad deploys all Units anywhere in the Evac Zone.

Then Attacker Squad deploys all Units on any battlefield edge.
`),
    victory: 'At the end of Turn 4, if the total FV of Standing Defender Units that are on the Evac Zone is equal to or higher than the total FV of Standing Attacker Units on the Evac Zone, Defender Squad wins the mission. Attacker Squad wins in all other cases.',
    special: null,
    rewards: [
      {
        name: 'Extraction Gear',
        effect: 'One Unit gains Grappling  Hook (ignore vertical distance when climbing up or down) in the next mission.'
      },
      {
        name: 'Resourceful Salvage',
        effect: 'One Unit gains a MedPack (spend 1 ACT to recover 1D3 lost HIT) to use once in the next mission.'
      }
    ],
    diagram: {
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_0_0_0_14_0',
          type: 'rect',
          xIn: 0,
          yIn: 0,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_0_0_14_14_14',
          type: 'rect',
          xIn: 0,
          yIn: 23,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_0_0_1_0_13',
          type: 'rect',
          xIn: 0,
          yIn: 1,
          wIn: 1,
          hIn: 22,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_0_14_1_14_13',
          type: 'rect',
          xIn: 23,
          yIn: 1,
          wIn: 1,
          hIn: 22,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_1_5_5_9_9',
          type: 'rect',
          xIn: 8,
          yIn: 8,
          wIn: 8,
          hIn: 8,
          color: '#dc2626',
          showLabel: false,
          showInLegend: false
        },
        { type: 'callout', id: 'boxn', x1In: 8, y1In: 7, x2In: 16, y2In: 7, text: '8"', labelSizeIn: 1 },
        { type: 'callout', id: 'boxw', x1In: 7, y1In: 8, x2In: 7, y2In: 16, text: '8"', labelSizeIn: 1 },
      ],
      legend: {
        DD: {
          label: 'Defender Deployment Zone',
          color: '#dc2626'
        },
        DA: {
          label: 'Attacker Deployment Zone',
          color: '#2563eb'
        }
      }
    }
  }
] satisfies MissionPlain[]

export default missions_pvp
