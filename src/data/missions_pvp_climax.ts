import { MissionPlain } from '@/types'

const missions_pvp_climax = [
  {
    missionId: 'C1',
    missionType: 'Climax',
    seq: 1,
    title: 'Scorched Earth',
    active: true,
    description: 'There is no extraction. There is no next mission. There is only this.',
    setup: '',
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
    special: 'Leaders gain +1 ACT for this mission.',
    victory: 'The mission has no turn limit. The Squad with at least one Standing Unit when all enemy Units have been Taken Out wins the Campaign. If the last Standing Units on both sides are Taken Out simultaneously, the Campaign ends in a draw.',
    rewards: [],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        {
          id: 'da',
          type: 'rect',
          xIn: 0, yIn: 0, wIn: 24, hIn: 1,
          color: '#dc2626',
          label: 'Deployment Zone A', showInLegend: false
        },
        {
          id: 'db',
          type: 'rect',
          xIn: 0, yIn: 23, wIn: 24, hIn: 1,
          color: '#2563eb',
          label: 'Deployment Zone B', showInLegend: false
        }
      ],
      legend: {
        DA: { label: 'Deployment Zone A', color: '#dc2626' },
        DB: { label: 'Deployment Zone B', color: '#2563eb' }
      }
    }
  },
  {
    missionId: 'C2',
    missionType: 'Climax',
    seq: 2,
    title: 'Last Signal',
    active: true,
    description: 'One transmission. One chance. Make it count.',
    setup: 'Place two Signal Beacon markers 6" from the center of the battlefield, one to the East and one to the West.',
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
    special: `At the start of each Turn, both Signal Beacons return to unclaimed state.

**Mission Action - Claim Beacon (2 ACT):** A Unit that Controls a Signal Beacon claims it for its Squad.`,
    victory: 'The mission has no turn limit. At the end of any Turn, if both Signal Beacons are claimed by the same Squad and neither Beacon is Controlled by any enemy Unit, that Squad wins the Campaign.',
    rewards: [],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        {
          id: 'da',
          type: 'rect',
          xIn: 0, yIn: 0, wIn: 24, hIn: 1,
          color: '#dc2626',
          label: 'Deployment Zone A', showInLegend: false
        },
        {
          id: 'db',
          type: 'rect',
          xIn: 0, yIn: 23, wIn: 24, hIn: 1,
          color: '#2563eb',
          label: 'Deployment Zone B', showInLegend: false
        },
        // Signal Beacon West: 6" from center = at x:6, y:12
        {
          id: 'b1',
          type: 'rect',
          xIn: 5.5, yIn: 11.5, wIn: 1, hIn: 1,
          color: '#d97706',
          label: 'B1', showInLegend: false
        },
        // Signal Beacon East: 6" from center = at x:18, y:12
        {
          id: 'b2',
          type: 'rect',
          xIn: 17.5, yIn: 11.5, wIn: 1, hIn: 1,
          color: '#d97706',
          label: 'B2', showInLegend: false
        },
        { type: 'callout', id: 'b1-b2', x1In: 6, y1In: 13.5, x2In: 18, y2In: 13.5, text: '12"', labelSizeIn: 1 }
      ],
      legend: {
        DA: { label: 'Deployment Zone A', color: '#dc2626' },
        DB: { label: 'Deployment Zone B', color: '#2563eb' },
        B1: { label: 'Signal Beacon 1', color: '#d97706' },
        B2: { label: 'Signal Beacon 2', color: '#d97706' }
      }
    }
  },
  {
    missionId: 'C3',
    missionType: 'Climax',
    seq: 3,
    title: 'The Flag',
    active: true,
    description: 'Hold it. Carry it. Get it home. Everything else is noise.',
    setup: 'Place the Flag marker at the exact center of the battlefield.',
    deployment: 'Both Squads deploy on their battlefield edge (North or South) before Turn 1.',
    special: `The Flag is an Item that can be picked up.

**Mission Action - Pick Up Flag (2 ACT):** A Unit that Controls the Flag picks it up. That Unit is now the Flag carrier.

While carrying the Flag, a Unit moves 2" less per Move action.

If the Flag carrier is Taken Out, the Flag drops on that Unit's position.`,
    victory: 'At the end of Turn 4, measure the distance from the Flag to each Squad\'s deployment edge. The Squad whose deployment edge is closer to the Flag wins the Campaign.',
    rewards: [],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        {
          id: 'da',
          type: 'rect',
          xIn: 0, yIn: 0, wIn: 24, hIn: 1,
          color: '#dc2626',
          label: 'Deployment Zone A', showInLegend: false
        },
        {
          id: 'db',
          type: 'rect',
          xIn: 0, yIn: 23, wIn: 24, hIn: 1,
          color: '#2563eb',
          label: 'Deployment Zone B', showInLegend: false
        },
        // Flag at exact center
        {
          id: 'flag',
          type: 'rect',
          xIn: 11.5, yIn: 11.5, wIn: 1, hIn: 1,
          color: '#7c3aed',
          label: 'F', showInLegend: false
        }
      ],
      legend: {
        DA: { label: 'Deployment Zone A', color: '#dc2626' },
        DB: { label: 'Deployment Zone B', color: '#2563eb' },
        F: { label: 'The Flag', color: '#7c3aed' }
      }
    }
  }
] satisfies MissionPlain[]

export default missions_pvp_climax
