import { MissionPlain } from '@/types'

const dedent = (value: string) => {
  const lines = value.replace(/^\n/, '').replace(/\n\s*$/, '').split('\n')
  const nonEmpty = lines.filter((line) => line.trim().length > 0)
  const minIndent = nonEmpty.length
    ? Math.min(...nonEmpty.map((line) => (line.match(/^\s*/)?.[0].length ?? 0)))
    : 0
  return lines.map((line) => line.slice(minIndent)).join('\n')
}

const missions_intro = [
  {
    missionId: '1',
    missionType: 'PvE',
    seq: 1,
    title: 'Survive',
    active: true,
    description: '',
    setup: 'Place three Nests on the S, NE, and NW Anchors. Spawn 2 Bugs Adjacent to each Nest.',
    deployment: 'Player Units deploy anywhere within 4" of the center of the battlefield',
    victory: 'At the end of Turn 4, if all Nests have been Taken Out, your Squad wins the mission.',
    special: dedent(`
At the start of each Turn (except the first), spawn 1 Bug Adjacent to each remaining Nest.

Bug Units are activated after each player Unit activation.

|**Unit**|**ACT**|**ARM**|**HIT**|
|-----|:---:|:---:|:---:|
|Bug|2|3|1|
|**Weapon**||**ATT**|**SKL**|
|(M) Bite||3|3|

Nests are treated as items and can be targeted in combat. Nests cannot be targeted in ranged combat if there is at least one Bug Adjacent to that Nest.

|**Item**|**ACT**|**ARM**|**HIT**|
|-----|:---:|:---:|:---:|
|Nest|-|4|1|
`),
    rewards: [],
    diagram: {
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          type: 'circle',
          id: 'DU',
          cxIn: 12,
          cyIn: 12,
          rIn: 4,
          label: 'DU',
          color: '#2563eb'
        },
        {
          type: 'marker',
          id: 'N1',
          xIn: 3,
          yIn: 3,
          label: 'N1',
          color: '#dc2626'
        },
        {
          type: 'marker',
          id: 'N2',
          xIn: 21,
          yIn: 3,
          label: 'N2',
          color: '#dc2626'
        },
        {
          type: 'marker',
          id: 'N3',
          xIn: 12,
          yIn: 21,
          label: 'N3',
          color: '#dc2626'
        },
        {
          type: 'callout',
          id: 'N1-x',
          x1In: 0,
          y1In: 3.7,
          x2In: 3,
          y2In: 3.7,
          text: '3"'
        },
        {
          type: 'callout',
          id: 'N1-y',
          x1In: 3.7,
          y1In: 0,
          x2In: 3.7,
          y2In: 3,
          text: '3"'
        },
        {
          type: 'callout',
          id: 'N2-x',
          x1In: 24,
          y1In: 3.7,
          x2In: 21,
          y2In: 3.7,
          text: '3"'
        },
        {
          type: 'callout',
          id: 'N2-y',
          x1In: 20.3,
          y1In: 0,
          x2In: 20.3,
          y2In: 3,
          text: '3"'
        },
        {
          type: 'callout',
          id: 'N3-y',
          x1In: 12.7,
          y1In: 24,
          x2In: 12.7,
          y2In: 21,
          text: '3"'
        },
        {
          type: 'callout',
          id: 'D-rad',
          x1In: 12,
          y1In: 12.7,
          x2In: 16,
          y2In: 12.7,
          text: '4"'
        }
      ],
      legend: {
        DU: 'Player Squad Deployment Zone',
        N1: 'Nest 1',
        N2: 'Nest 2',
        N3: 'Nest 3'
      }
    }
  },
  {
    missionId: '2',
    missionType: 'PvE',
    seq: 2,
    title: 'Bug Bounty',
    active: true,
    description: dedent(`
*"The hive stirs. Kill them before they overwhelm us."*

Something is stirring beneath the battlefield - something ancient, hungry, and unstoppable. A horde of alien creatures has erupted from below, their chitinous bodies swarming over the land, attacking anything that moves. Both squads find themselves trapped in a desperate fight for survival. The mission? Kill as many of these creatures as possible before they are overrun. The battlefield is a feeding ground, and every shot fired is a battle against extinction.
`),
    setup: 'Deploy a Nest in the center of 3 random Tiles.',
    deployment: 'Player Units deploy from the Southern battlefield edge before Turn 1.',
    victory: 'At the end of Turn 4, if all Nests have been Taken Out, your Squad wins the mission.',
    special: dedent(`
- At the start of each Turn, spawn \`x\` Bugs Adjacent to each Nest, where \`x\` is the Turn number (i.e. one bug in Turn 1, two bugs in Turn 2, etc.).

|**Unit**|**ACT**|**ARM**|**HIT**|
|-----|:---:|:---:|:---:|
|Bug|2|3|1|
|**Weapon**||**ATT**|**SKL**|
|(M) Bite (Rending 1)||3|5|

Bug Units are activated after each player Unit activation, alternating player control.

|**Item**|**ACT**|**ARM**|**HIT**|
|-----|:---:|:---:|:---:|
|Nest|-|4|1|

Nests are treated as items and can be targeted in combat. Nests cannot be targeted in ranged combat if there is at least one Bug Adjacent to that Nest.
If a Nest is targeted in combat and is not Taken Out as a result, spawn one Bug Adjacent to that Nest.
`),
    rewards: []
  },
  {
    missionId: '3',
    missionType: 'PvE',
    seq: 3,
    title: 'Asset Denial',
    active: true,
    description: 'Command has instructed your Squad to oversee and ensure the complete destruction of a critical facility that is being overrun by the enemy. Command would rather destroy the facility than let it fall into enemy hands. Breach the facility, start the self-destruct sequence, and extract with your Squad.',
    setup: dedent(`
- Set your Tiles up as described in the diagram
- Place objective markers:
  - **Gate:** ("G" on the map) Middle of the Northern edge of the Northern Tile in Zone 1.
  - **Console:** ("C" on the map) Middle of the Eastern edge of the Eastern Tile in Zone 2.
  - **Extraction Zone:** ("Extract" on the map) Within 2 Paces of the Eastern edge of Zone 3.
- Place Nests 1, 2, and 3 ("S" on the map) 
`),
    deployment: 'Before Turn 1, deploy your Units within 2 Paces of the Western edge of Zone 1.',
    victory: 'Your Squad wins the Mission if the Gate has been breached, the Console has been activated, and all your Standing Units are within the Extraction zone before the self-destruct sequence completes.',
    special: dedent(`
- Instead of deploying an NPC Squad, play the Bugs as the NPCs
- Unlike most other Missions, this Mission is not limited to 4 Turns.
- At the start of each Turn, spawn Bugs Adjacent to each Nest: one bug in Turn 1, two bugs in Turn 2, three bugs in Turn 3, and four bugs on Turns 4 and later.
- **Gate:** At the start of the Mission, the Gate is closed, preventing your Units from entering Zone 2. The Gate is an Item with \`ARM\` **4** and \`HIT\` **4** and can be targeted in Combat. Once the Gate is Taken Out, it is Breached and the path clears for your Units to move into Zone 2.
- **Mission Action: Activate Console (2 ACT):** A Unit Adjacent to the Console may Activate it for 2 ACT. Once the Console is Activated, your Squad has 2 Turns to get to the extraction zone or risk being caught in the explosion. For example, if the Console is Activated in Turn 3, your Units must extract by the end of Turn 5.  
A Unit may not perform this Action if it is Adjacent to any enemy Units.

|**Unit**|**ACT**|**ARM**|**HIT**|
|-----|:---:|:---:|:---:|
|Bug|2|3|1|
|**Weapon**||**ATT**|**SKL**|
|(M) Bite||3|5|

Bug Units are activated after each player Unit activation, alternating player control.

|**Item**|**ACT**|**ARM**|**HIT**|
|-----|:---:|:---:|:---:|
|Nest|-|4|2|

Nests are treated as items. Nests cannot be targeted in ranged combat if there is at least one Bug Adjacent to that Nest.
If a Nest is targeted in combat and is not Taken Out as a result, it regains all of its \`HIT\`.
Each time a Nest is targeted in combat and is not Taken out as a result, for each saved successful strike, spawn one Bug Adjacent to that Nest.
Bugs cannot traverse from one Zone to another. So if a Bug spawned inside Zone 2, it cannot "see" your Units in Zones 1 or 3; when selecting targets for NPC behavior, ignore player Units that are not in the same Zone as the Bug.
`),
    rewards: []
  },
  {
    missionId: '4',
    missionType: 'PvE',
    seq: 4,
    title: 'Deliver The Payload',
    active: true,
    description: 'A tide-turning weapon has been activated, but requires time to charge. Your Squad is being sent to ensure the complete delivery of the weapon\'s payload while the enemy attempts to destroy its critical infrastructure.',
    setup: dedent(`
- Place Station markers:
  - **Station Alpha:** Center of the Western Tile.
  - **Station Beta:** Center of the Northern Tile.
  - **Station Gamma:** Center of the Eastern Tile.
- Place Nests:
  - **Nest 1:** Middle of the Western edge of the Western Tile.
  - **Nest 2:** Middle of the Northern edge of the Northern Tile.
  - **Nest 3:** Middle of the Eastern edge of the Eastern Tile.
`),
    deployment: 'Before Turn 1, deploy your Units on the Southern edge of the battlefield.',
    victory: 'Your Squad wins the Mission if all Stations are Standing by the end of Turn 6.',
    special: dedent(`
- Instead of deploying an NPC Squad, play the Bugs as the NPCs
- At the start of each Turn, spawn \`x\` Bugs Adjacent to each Nest, where \`x\` is the Turn number (i.e. one bug in Turn 1, two bugs in Turn 2, etc.).
- At the start of each Turn after the first, roll \`1D3\` to determine which Station is Active. The previously-Active Station (if any) is no longer Active.
- **Stations:** Stations are Items with \`ARM\` **4** and \`HIT\` **4** and can be targeted in Combat. If any Station is Taken Out, your Squad loses the Mission.

**Bugs**:

|**Unit**|**ACT**|**ARM**|**HIT**|
|-----|:---:|:---:|:---:|
|Bug|2|3|1|
|**Weapon**||**ATT**|**SKL**|
|(M) Bite||3|5|

Bug Units are activated after each player Unit activation, alternating player control.

|**Item**|**ACT**|**ARM**|**HIT**|
|-----|:---:|:---:|:---:|
|Nest|-|4|2|

Nests are treated as items. Nests cannot be targeted in ranged combat if there is at least one Bug Adjacent to that Nest.
If a Nest is targeted in combat and is not Taken Out as a result, it regains all of its \`HIT\`.
Each time a Nest is targeted in combat and is not Taken out as a result, for each saved successful strike, spawn one Bug Adjacent to that Nest.

**Behavior:** To determine Bug targets:
- Turn 1: Bugs target the closest player Unit as normal
- Turns 2+: If a Bug is Adjacent to a player Unit, it will target that Unit in combat. If a Bug is not Adjacent to any player Units, it will target the Active Station instead.
`),
    rewards: []
  }
] satisfies MissionPlain[]

export default missions_intro
