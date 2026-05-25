export type MissionObjectiveArchetype = {
  objectiveArchetypeId: string
  title: string
  description: string
  variations: MissionObjective[]
}

export type MissionObjective = {
  objectiveId: string
  title: string
  setup?: string
  special?: string
  victory?: string
}

export const MissionObjectives : MissionObjectiveArchetype[] = [
  {
    objectiveArchetypeId: '1-2',
    title: 'Control',
    description: '',
    variations: [
      {
        objectiveId: 'Control 1-2',
        title: 'Hold The Line',
        setup: 'Place 3 Objectives on random anchors',
        victory: 'Control all three Objectives at the end of any one Turn.'
      },
      {
        objectiveId: 'Control 3-4',
        title: 'Sustained Hold',
        setup: 'Place 3 Objectives on random anchors',
        victory: 'Control two or more Objectives at the end of two consecutive Turns.'
      },
      {
        objectiveId: 'Control 5-6',
        title: 'Clear And Move',
        setup: 'Place 3 Objectives on random anchors',
        special: 'At the end of each Turn, remove one Objective you control.',
        victory: 'All three Objectives removed.'
      },
    ]
  },
  {
    objectiveArchetypeId: '3-4',
    title: 'Activate',
    description: '',
    variations: [
      {
        objectiveId: 'Activate 1-2',
        title: 'Full Access',
        setup: 'Place three Objective markers on three random anchors',
        special: '**Activate - Mission Action (2 ACT):** A Unit Activates an Objective it controls',
        victory: 'Activate all three Objectives in any order. Place all three at mission start.'
      },
      {
        objectiveId: 'Activate 3-4',
        title: 'Sequence',
        setup: 'Place one Objective marker on a random anchor',
        special: '**Activate - Mission Action (2 ACT):** A Unit Activates an Objective it controls. Each time an Objective is activated, place the next one on a different random unoccupied Anchor.',
        victory: 'Activate three Objectives in order.'
      },
      {
        objectiveId: 'Activate 5-6',
        title: 'Search and Recover',
        setup: 'Place 3 Objectives on random anchors',
        special: '**Activate - Mission Action (2 ACT):** A Unit Activates an Objective it controls. On Activation, roll `1D6`: First activation: The item is found on `1`. Second activation: The item is found on `1-2`. Third activation: The item is found automatically. This roll cannot be modified or re-rolled using TO. The Unit that finds the item now carries it (can be dropped or passed to a Squadmate for 1 ACT).',
        victory: 'The carrying Unit must extract successfully to complete the Objective.'
      },
    ]
  },
  {
    objectiveArchetypeId: '5-6',
    title: 'Destroy',
    description: '',
    variations: [
      {
        objectiveId: 'Destroy 1-2',
        title: 'Full Denial',
        setup: 'Place three Objectives on three random Anchors.',
        special: 'Objectives are items with `ARM 4 HIT 3`.',
        victory: 'Destroy all three Objectives.'
      },
      {
        objectiveId: 'Destroy 3-4',
        title: 'High-Value Target',
        setup: 'Place one Objective on a random Anchor.',
        special: 'Objective is an item with `ARM 4 HIT 6`.',
        victory: 'Destroy the Objective.'
      },
      {
        objectiveId: 'Destroy 5-6',
        title: 'Attrition',
        setup: 'Place three Objectives on three random Anchors.',
        special: 'Objectives are items with `ARM 4 HIT 3`. At the end of each Turn, remaining Objectives regain 1 lost `HIT`.',
        victory: 'Destroy two of three Objectives.'
      },
    ]
  },
]
