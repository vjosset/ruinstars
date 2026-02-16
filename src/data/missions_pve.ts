import { MissionPlain } from '@/types'

const dedent = (value: string) => {
  const lines = value.replace(/^\n/, '').replace(/\n\s*$/, '').split('\n')
  const nonEmpty = lines.filter((line) => line.trim().length > 0)
  const minIndent = nonEmpty.length
    ? Math.min(...nonEmpty.map((line) => (line.match(/^\s*/)?.[0].length ?? 0)))
    : 0
  return lines.map((line) => line.slice(minIndent)).join('\n')
}

const missions_pve = [
  {
    missionId: '1',
    missionType: 'Control - 3 Obj',
    seq: 1,
    title: 'Triangulate Fire',
    active: true,
    description: dedent(`
"Paint the horizon. Let the guns speak."

Forward observers race to lock three points at once. Hold them together long enough and the sky answers.
`),
    setup: 'Place 3 Beacon markers on the NW, N, and NE Anchors.',
    deployment: 'Deploy the Player Squad on the Southern battlefield edge. Deploy the NPC Squad on the Northern battlefield edge.',
    victory: 'Player Squad wins if it controls all three Beacons at the end of Turn 4.',
    special: 'NPC Units prioritize moving toward and contesting Beacon markers whenever possible.',
    rewards: [],
    diagram: {
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_p1_npc',
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
          id: 'mrect_p1_player',
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
          id: 'mrect_p1_o1',
          type: 'rect',
          xIn: 5.5,
          yIn: 5.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_p1_o2',
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
          id: 'mrect_p1_o3',
          type: 'rect',
          xIn: 17.5,
          yIn: 5.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        { type: 'callout', id: 'p1-o1-x', x1In: 6, y1In: 7, x2In: 12, y2In: 7, text: '6"', labelSizeIn: 1 },
        { type: 'callout', id: 'p1-o2-x', x1In: 12, y1In: 7, x2In: 18, y2In: 7, text: '6"', labelSizeIn: 1 },
      ],
      legend: {
        DP: {
          label: 'Player Deployment',
          color: '#2563eb'
        },
        DN: {
          label: 'NPC Deployment',
          color: '#dc2626'
        },
        O1: {
          label: 'Beacon 1',
          color: '#2b7c2b'
        },
        O2: {
          label: 'Beacon 2',
          color: '#2b7c2b'
        },
        O3: {
          label: 'Beacon 3',
          color: '#2b7c2b'
        }
      }
    }
  },
  {
    missionId: '2',
    missionType: 'Control - Track',
    seq: 2,
    title: 'Signal Sweep',
    active: true,
    description: dedent(`
"Keep the relays alive long enough to scream."

A fractured array flickers across the center line. Every turn you hold it, more of the message gets out.
`),
    setup: 'Place 3 Relay markers equally spaced (6" apart) along the battlefield center line. Set up a Tracker starting at zero.',
    deployment: 'Deploy the Player Squad on the Southern battlefield edge. Deploy the NPC Squad on the Northern battlefield edge.',
    victory: 'Player Squad wins if the Tracker is at 6 or more at the end of Turn 4.',
    special: dedent(`- At the end of each Turn, increase the Tracker by 1 for each Relay the Player Squad controls.  
- At the end of each Turn, if the Player Squad controls zero Relay markers, decrease the Tracker by 2.`),
    rewards: [],
    diagram: {
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_p2_npc',
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
          id: 'mrect_p2_player',
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
          id: 'mrect_p2_o1',
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
          id: 'mrect_p2_o2',
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
          id: 'mrect_p2_o3',
          type: 'rect',
          xIn: 17.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        { type: 'callout', id: 'p2-o1-x', x1In: 6, y1In: 13, x2In: 12, y2In: 13, text: '6"', labelSizeIn: 1 },
        { type: 'callout', id: 'p2-o2-x', x1In: 12, y1In: 13, x2In: 18, y2In: 13, text: '6"', labelSizeIn: 1 },
      ],
      legend: {
        DP: {
          label: 'Player Deployment',
          color: '#2563eb'
        },
        DN: {
          label: 'NPC Deployment',
          color: '#dc2626'
        },
        O1: {
          label: 'Relay 1',
          color: '#2b7c2b'
        },
        O2: {
          label: 'Relay 2',
          color: '#2b7c2b'
        },
        O3: {
          label: 'Relay 3',
          color: '#2b7c2b'
        }
      }
    }
  },
  {
    missionId: '3',
    missionType: 'Control - Center',
    seq: 3,
    title: 'Stabilize the Rift',
    active: true,
    description: dedent(`
"Hold the center. Two turns. No mistakes."

The breach flexes like a wound. If you keep a stabilizer online long enough, reality seals itself.
`),
    setup: 'Place a Stabilizer marker on the Center Anchor. Track Stabilization starting at zero.',
    deployment: 'Deploy the Player Squad on the Southern battlefield edge. Deploy the NPC Squad on the Northern battlefield edge.',
    victory: dedent(`
At the end of each Turn, if the Player Squad controls the Stabilizer, increase Stabilization by 1. Otherwise, Stabilization resets to zero.

The Player Squad wins if Stabilization is at 2 or higher at the end of Turn 4.
`),
    special: 'NPC Units prioritize entering the Center Anchor area and contesting the Stabilizer.',
    rewards: [],
    diagram: {
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_p3_npc',
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
          id: 'mrect_p3_player',
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
          id: 'mrect_p3_o1',
          type: 'rect',
          xIn: 11.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
      ],
      legend: {
        DP: {
          label: 'Player Deployment',
          color: '#2563eb'
        },
        DN: {
          label: 'NPC Deployment',
          color: '#dc2626'
        },
        O1: {
          label: 'Stabilizer',
          color: '#2b7c2b'
        }
      }
    }
  },
  {
    missionId: '4',
    missionType: 'Activate - 3 Obj',
    seq: 4,
    title: 'Plant Charges',
    active: true,
    description: dedent(`
"Set the timers. Run like hell."

Demolition points are scattered across the zone. Arm them before the perimeter collapses.
`),
    setup: 'Place 3 Charge Site markers on the NW, Center, and SE Anchors.',
    deployment: 'Deploy the Player Squad on the Southern battlefield edge. Deploy the NPC Squad on the Northern battlefield edge.',
    victory: 'All 3 Charge Site markers have been Activated by the end of Turn 4.',
    special: dedent(`
**Mission Action: Arm Charge (2 ACT):** A Unit that controls a Charge Site activates it. Remove that marker from the battlefield.

When a Charge Site is activated, immediately spawn 1 random NPC Unit (from the Spawn table, ignoring quantities) Adjacent to the nearest Anchor.
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
          id: 'mrect_p4_npc',
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
          id: 'mrect_p4_player',
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
          id: 'mrect_p4_o1',
          type: 'rect',
          xIn: 5.5,
          yIn: 5.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_p4_o2',
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
          id: 'mrect_p4_o3',
          type: 'rect',
          xIn: 17.5,
          yIn: 17.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
      ],
      legend: {
        DP: {
          label: 'Player Deployment',
          color: '#2563eb'
        },
        DN: {
          label: 'NPC Deployment',
          color: '#dc2626'
        },
        O1: {
          label: 'Charge Site 1',
          color: '#2b7c2b'
        },
        O2: {
          label: 'Charge Site 2',
          color: '#2b7c2b'
        },
        O3: {
          label: 'Charge Site 3',
          color: '#2b7c2b'
        }
      }
    }
  },
  {
    missionId: '5',
    missionType: 'Activate - Sequence',
    seq: 5,
    title: 'Sequential Uplink',
    active: true,
    description: dedent(`
"One node at a time. Don't skip steps."

The network is brittle. Each console must come online in sequence, or the whole chain fails.
`),
    setup: 'Place 3 Console markers equally spaced (6" apart) along the battlefield center line. Consoles must be Activated in order: 1, then 2, then 3.',
    deployment: 'Deploy the Player Squad on the Southern battlefield edge. Deploy the NPC Squad on the Northern battlefield edge.',
    victory: 'All 3 Consoles have been Activated in order by the end of Turn 4.',
    special: dedent(`
**Mission Action: Uplink (2 ACT):** A Unit that controls a Console activates it.

If a Unit attempts to Uplink a Console out of order, the action has no effect (ACT is still spent).
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
          id: 'mrect_p5_npc',
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
          id: 'mrect_p5_player',
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
          id: 'mrect_p5_o1',
          type: 'rect',
          xIn: 5.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          label: 'O1',
          showInLegend: false
        },
        {
          id: 'mrect_p5_o2',
          type: 'rect',
          xIn: 11.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          label: 'O3',
          showInLegend: false
        },
        {
          id: 'mrect_p5_o3',
          type: 'rect',
          xIn: 17.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          label: 'O2',
          showInLegend: false
        },
        { type: 'callout', id: 'p5-o1-x', x1In: 6, y1In: 13, x2In: 12, y2In: 13, text: '6"', labelSizeIn: 1 },
        { type: 'callout', id: 'p5-o2-x', x1In: 12, y1In: 13, x2In: 18, y2In: 13, text: '6"', labelSizeIn: 1 },
      ],
      legend: {
        DP: {
          label: 'Player Deployment',
          color: '#2563eb'
        },
        DN: {
          label: 'NPC Deployment',
          color: '#dc2626'
        },
        O1: {
          label: 'Console 1',
          color: '#2b7c2b'
        },
        O2: {
          label: 'Console 2',
          color: '#2b7c2b'
        },
        O3: {
          label: 'Console 3',
          color: '#2b7c2b'
        }
      }
    }
  },
  {
    missionId: '6',
    missionType: 'Activate - Hold 2',
    seq: 6,
    title: 'Hold the Channel',
    active: true,
    description: dedent(`
"Keep two nodes lit when the clock hits."

The signal is unstable. Activations decay each turn. The only thing that matters is what's live at the end.
`),
    setup: 'Place 3 Transmitter markers on the W, Center, and E Anchors along the battlefield center line. All Transmitters start Inactive.',
    deployment: 'Deploy the Player Squad on the Southern battlefield edge. Deploy the NPC Squad on the Northern battlefield edge.',
    victory: 'At the end of Turn 4, at least 2 Transmitters are Active and controlled by the Player Squad.',
    special: dedent(`
At the end of each Turn, all Transmitters become Inactive.

**Mission Action: Activate Transmitter (2 ACT):** A Unit that controls a Transmitter makes it Active until end of Turn.
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
          id: 'mrect_p6_npc',
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
          id: 'mrect_p6_player',
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
          id: 'mrect_p6_o1',
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
          id: 'mrect_p6_o2',
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
          id: 'mrect_p6_o3',
          type: 'rect',
          xIn: 17.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
      ],
      legend: {
        DP: {
          label: 'Player Deployment',
          color: '#2563eb'
        },
        DN: {
          label: 'NPC Deployment',
          color: '#dc2626'
        },
        O1: {
          label: 'Transmitter 1',
          color: '#2b7c2b'
        },
        O2: {
          label: 'Transmitter 2',
          color: '#2b7c2b'
        },
        O3: {
          label: 'Transmitter 3',
          color: '#2b7c2b'
        }
      }
    }
  },
  {
    missionId: '7',
    missionType: 'Destroy - 1 Obj',
    seq: 7,
    title: 'Breach and Infiltrate',
    active: true,
    description: dedent(`
"The door isn't locked. It's defended."

A hardened seal blocks the route forward. Crack it open before the zone swallows you.
`),
    setup: 'Place a Gate marker on the Center Anchor. The Gate is an Item with `ARM 4 / HIT 4` and can be targeted in Combat.',
    deployment: 'Deploy the Player Squad on the Southern battlefield edge. Deploy the NPC Squad on the Northern battlefield edge.',
    victory: 'Player Squad wins if the Gate is Taken Out by the end of Turn 4 and at least one Player Unit controls it.',
    special: 'The Gate can be targeted in combat as if it were a Unit, but never performs actions.',
    rewards: [],
    diagram: {
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_p7_npc',
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
          id: 'mrect_p7_player',
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
          id: 'mrect_p7_o1',
          type: 'rect',
          xIn: 11.5,
          yIn: 11.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
      ],
      legend: {
        DP: {
          label: 'Player Deployment',
          color: '#2563eb'
        },
        DN: {
          label: 'NPC Deployment',
          color: '#dc2626'
        },
        O1: {
          label: 'Gate (ARM 4 / HIT 4)',
          color: '#2b7c2b'
        }
      }
    }
  },
  {
    missionId: '8',
    missionType: 'Destroy - 3 Obj',
    seq: 8,
    title: 'Purge the Nests',
    active: true,
    description: dedent(`
"Burn the roots. The rest dies screaming."

Spawn sites pulse across the zone. If you leave one alive, it will fill the field.
`),
    setup: 'Place 3 Nest markers on 3 random Anchors. Each Nest is an Item with `ARM 3 / HIT 2`.',
    deployment: 'Deploy the Player Squad on the Southern battlefield edge. Deploy the NPC Squad on the Northern battlefield edge.',
    victory: 'Player Squad wins if all Nest markers are Taken Out by the end of Turn 4.',
    special: dedent(`
At the start of each Turn after the first, for each Nest still on the battlefield, spawn 1 NPC Unit (use the NPC Spawn Table, ignoring quantities) Adjacent to that Nest.  
If a Nest is targeted in combat but is not Taken Out as a result of that combat, it returns to full HIT.
NPC Units prioritize staying Adjacent to Nests when not Engaged.
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
          id: 'mrect_p8_npc',
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
          id: 'mrect_p8_player',
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
          id: 'mrect_p8_o1',
          type: 'rect',
          xIn: 5.5,
          yIn: 5.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
        {
          id: 'mrect_p8_o2',
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
          id: 'mrect_p8_o3',
          type: 'rect',
          xIn: 5.5,
          yIn: 17.5,
          wIn: 1,
          hIn: 1,
          color: '#2b7c2b',
          showLabel: false,
          showInLegend: false
        },
      ],
      legend: {
        DP: {
          label: 'Player Deployment',
          color: '#2563eb'
        },
        DN: {
          label: 'NPC Deployment',
          color: '#dc2626'
        },
        O1: {
          label: 'Nest 1',
          color: '#2b7c2b'
        },
        O2: {
          label: 'Nest 2',
          color: '#2b7c2b'
        },
        O3: {
          label: 'Nest 3',
          color: '#2b7c2b'
        }
      }
    }
  },
  {
    missionId: '9',
    missionType: 'Destroy - 3/5 Obj',
    seq: 9,
    title: 'Collapse Supports',
    active: true,
    description: dedent(`
"Drop three pillars and the whole ruin comes down."

The structure is already failing. You don't need to level it — just hit the right supports.
`),
    setup: 'Place 5 Support markers on the NW, NE, W, E, and Center Anchors. Each Support is an Item with `ARM 3 / HIT 3`.',
    deployment: 'Deploy the Player Squad on the Southern battlefield edge. Deploy the NPC Squad on the Northern battlefield edge.',
    victory: 'Player Squad wins if at least 3 Support markers are Taken Out by the end of Turn 4.',
    special: null,
    rewards: [],
    diagram: {
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        {
          id: 'mrect_p9_npc',
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
          id: 'mrect_p9_player',
          type: 'rect',
          xIn: 0,
          yIn: 23,
          wIn: 24,
          hIn: 1,
          color: '#2563eb',
          showLabel: false,
          showInLegend: false
        },
        { id: 'mrect_p9_o1', type: 'rect', xIn: 5.5, yIn: 5.5, wIn: 1, hIn: 1, color: '#2b7c2b', showLabel: false, showInLegend: false },
        { id: 'mrect_p9_o2', type: 'rect', xIn: 17.5, yIn: 5.5, wIn: 1, hIn: 1, color: '#2b7c2b', showLabel: false, showInLegend: false },
        { id: 'mrect_p9_o3', type: 'rect', xIn: 5.5, yIn: 11.5, wIn: 1, hIn: 1, color: '#2b7c2b', showLabel: false, showInLegend: false },
        { id: 'mrect_p9_o4', type: 'rect', xIn: 17.5, yIn: 11.5, wIn: 1, hIn: 1, color: '#2b7c2b', showLabel: false, showInLegend: false },
        { id: 'mrect_p9_o5', type: 'rect', xIn: 11.5, yIn: 11.5, wIn: 1, hIn: 1, color: '#2b7c2b', showLabel: false, showInLegend: false },
      ],
      legend: {
        DP: { label: 'Player Deployment', color: '#2563eb' },
        DN: { label: 'NPC Deployment', color: '#dc2626' },
        O1: { label: 'Support 1', color: '#2b7c2b' },
        O2: { label: 'Support 2', color: '#2b7c2b' },
        O3: { label: 'Support 3', color: '#2b7c2b' },
        O4: { label: 'Support 4', color: '#2b7c2b' },
        O5: { label: 'Support 5', color: '#2b7c2b' }
      }
    }
  },
  {
    missionId: '10',
    missionType: 'Kill - Leader',
    seq: 10,
    title: 'Decapitation',
    active: true,
    description: dedent(`
"Cut the head. Let the body panic."

A single commander holds the pack together. Find them. End them. Then get out.
`),
    setup: 'After generating the NPC Squad, designate the highest-FV NPC Unit as the Leader. If there are multiple with the same FV, pick a random one.',
    deployment: 'Deploy the Player Squad on the Southern battlefield edge. Deploy the NPC Squad on the Northern battlefield edge.',
    victory: 'Player Squad wins if the Leader is Taken Out by the end of Turn 4.',
    special: 'While the Leader is Standing, NPC Units have `+1 ATT` on their Melee and Ranged weapons.',
    rewards: [],
    diagram: {
      board: {
        widthIn: 24,
        heightIn: 24
      },
      showCenterLines: true,
      elements: [
        { id: 'mrect_p10_npc', type: 'rect', xIn: 0, yIn: 0, wIn: 24, hIn: 1, color: '#dc2626', showLabel: false, showInLegend: false },
        { id: 'mrect_p10_player', type: 'rect', xIn: 0, yIn: 23, wIn: 24, hIn: 1, color: '#2563eb', showLabel: false, showInLegend: false }
      ],
      legend: {
        DP: { label: 'Player Deployment', color: '#2563eb' },
        DN: { label: 'NPC Deployment', color: '#dc2626' }
      }
    }
  },
  {
    // TODO: REVIEW
    missionId: '11',
    missionType: 'Kill - Elite',
    seq: 11,
    title: 'Bring It Down',
    active: false,
    description: dedent(`
"It isn't fast. It isn't subtle. It is coming anyway."

A heavy asset anchors the enemy line. Kill it, and everything else becomes survivable.
`),
    setup: 'After generating the NPC Squad, designate the highest-GP NPC Unit as the Elite.',
    deployment: 'Deploy the Player Squad on the Southern battlefield edge. Deploy the NPC Squad on the Northern battlefield edge.',
    victory: 'The Elite is Taken Out by the end of Turn 4.',
    special: 'NPC Units prioritize protecting the Elite by moving Adjacent to it when possible.',
    rewards: [],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        { id: 'mrect_p11_npc', type: 'rect', xIn: 0, yIn: 0, wIn: 24, hIn: 1, color: '#dc2626', showLabel: false, showInLegend: false },
        { id: 'mrect_p11_player', type: 'rect', xIn: 0, yIn: 23, wIn: 24, hIn: 1, color: '#2563eb', showLabel: false, showInLegend: false },
        { id: 'mrect_p11_hint', type: 'rect', xIn: 11.5, yIn: 8.5, wIn: 1, hIn: 1, color: '#2b7c2b', showLabel: false, showInLegend: false },
      ],
      legend: {
        DP: { label: 'Player Deployment', color: '#2563eb' },
        DN: { label: 'NPC Deployment', color: '#dc2626' },
        O1: { label: 'Elite (designate)', color: '#2b7c2b' }
      }
    }
  },
  {
    missionId: '12',
    missionType: 'Kill - 50%',
    seq: 12,
    title: 'Break the Line',
    active: true,
    description: dedent(`
"Make them bleed. Make them retreat."

You don't need to wipe the force. You need to hurt it enough that it can't hold the field.
`),
    setup: 'After deploying the NPC Squad, count the total FV of NPC Units (starting FV).',
    deployment: 'Deploy the Player Squad on the Southern battlefield edge. Deploy the NPC Squad on the Northern battlefield edge.',
    victory: 'Player Squad wins the mission if the total FV of Standing NPC Units is less than half the starting FV at the end of Turn 4.',
    special: null,
    rewards: [],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        { id: 'mrect_p12_npc', type: 'rect', xIn: 0, yIn: 0, wIn: 24, hIn: 1, color: '#dc2626', showLabel: false, showInLegend: false },
        { id: 'mrect_p12_player', type: 'rect', xIn: 0, yIn: 23, wIn: 24, hIn: 1, color: '#2563eb', showLabel: false, showInLegend: false },
      ],
      legend: {
        DP: { label: 'Player Deployment', color: '#2563eb' },
        DN: { label: 'NPC Deployment', color: '#dc2626' }
      }
    }
  },
  {
    missionId: '13',
    missionType: 'Find - 3 Obj - Dice Success',
    seq: 13,
    title: 'Investigate',
    active: true,
    description: dedent(`
"Three readings. One truth."

Something in the ruins is broadcasting through meat and stone. Find the source before it finds you.
`),
    setup: 'Place 3 Scan markers on 3 random Anchors.',
    deployment: 'Deploy the Player Squad on the Southern battlefield edge. Deploy the NPC Squad on the Northern battlefield edge.',
    victory: 'Player Squad wins if the Anomaly is Found by the end of Turn 4.',
    special: dedent(`
**Mission Action: Scan (2 ACT):** A Unit that controls a Scan marker may perform this Action. Roll 1D6:
- First Scan performed this mission: The anomaly is found on a \`1\`
- Second Scan performed this mission: The anomaly is found on a \`1-2\`
- Third Scan performed this mission: The anomaly is found automatically

After scanning a marker, remove it from the battlefield.
`),
    rewards: [],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        { id: 'mrect_p13_npc', type: 'rect', xIn: 0, yIn: 0, wIn: 24, hIn: 1, color: '#dc2626', showLabel: false, showInLegend: false },
        { id: 'mrect_p13_player', type: 'rect', xIn: 0, yIn: 23, wIn: 24, hIn: 1, color: '#2563eb', showLabel: false, showInLegend: false },
        { id: 'mrect_p13_o1', type: 'rect', xIn: 5.5, yIn: 11.5, wIn: 1, hIn: 1, color: '#2b7c2b', showLabel: false, showInLegend: false },
        { id: 'mrect_p13_o2', type: 'rect', xIn: 11.5, yIn: 5.5, wIn: 1, hIn: 1, color: '#2b7c2b', showLabel: false, showInLegend: false },
        { id: 'mrect_p13_o3', type: 'rect', xIn: 17.5, yIn: 17.5, wIn: 1, hIn: 1, color: '#2b7c2b', showLabel: false, showInLegend: false },
      ],
      legend: {
        DP: { label: 'Player Deployment', color: '#2563eb' },
        DN: { label: 'NPC Deployment', color: '#dc2626' },
        O1: { label: 'Scan 1', color: '#2b7c2b' },
        O2: { label: 'Scan 2', color: '#2b7c2b' },
        O3: { label: 'Scan 3', color: '#2b7c2b' }
      }
    }
  },
  {
    missionId: '14',
    missionType: 'Find - Grab and Control',
    seq: 14,
    title: 'Secure the Relic',
    active: true,
    description: dedent(`
"Get it in your hands. Keep it there."

The relic isn't heavy. The attention it draws is.
`),
    setup: 'Place a Relic marker on the Center Anchor.',
    deployment: 'Deploy the Player Squad on the Southern battlefield edge. Deploy the NPC Squad on the Northern battlefield edge.',
    victory: 'Player Squad wins if a Standing Player Unit is carrying the Relic at the end of Turn 4.',
    special: dedent(`
The Relic is a marker that can be Picked Up.

**Mission Action: Pick Up Relic (1 ACT):** A Unit that controls the Relic may pick it up.

While carrying the Relic, Units have -1 ACT (minimum 1).
`),
    rewards: [],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        { id: 'mrect_p14_npc', type: 'rect', xIn: 0, yIn: 0, wIn: 24, hIn: 1, color: '#dc2626', showLabel: false, showInLegend: false },
        { id: 'mrect_p14_player', type: 'rect', xIn: 0, yIn: 23, wIn: 24, hIn: 1, color: '#2563eb', showLabel: false, showInLegend: false },
        { id: 'mrect_p14_o1', type: 'rect', xIn: 11.5, yIn: 11.5, wIn: 1, hIn: 1, color: '#2b7c2b', showLabel: false, showInLegend: false },
      ],
      legend: {
        DP: { label: 'Player Deployment', color: '#2563eb' },
        DN: { label: 'NPC Deployment', color: '#dc2626' },
        O1: { label: 'Relic', color: '#2b7c2b' }
      }
    }
  },
  {
    missionId: '15',
    missionType: 'Find - Kill and Grab',
    seq: 15,
    title: 'Intercept Courier',
    active: true,
    description: dedent(`
"It runs. You chase. The clock laughs."

A courier is crossing the zone with a sealed packet. Stop it, take the intel, and survive the exit.
`),
    setup: 'After generating the NPC Squad, designate a random NPC Unit as the Courier. The Courier begins the mission carrying the Intel.',
    deployment: 'Deploy the Player Squad on the Southern battlefield edge. Deploy the NPC Squad on the Northern battlefield edge.',
    victory: 'Player Squad wins if a Standing Player Unit is carrying the Intel at the end of Turn 4.',
    special: dedent(`
The Intel is a marker that can be Picked Up.

If the Courier is Taken Out, place the Intel marker in its space.

**Mission Action: Pick Up Intel (1 ACT):** A Player Unit that controls the Intel may pick it up.

Courier Override: During the Courier's activation, it moves toward the North battlefield edge. If it can Dash, it Dashes.
`),
    rewards: [],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        { id: 'mrect_p15_npc', type: 'rect', xIn: 0, yIn: 0, wIn: 24, hIn: 1, color: '#dc2626', showLabel: false, showInLegend: false },
        { id: 'mrect_p15_player', type: 'rect', xIn: 0, yIn: 23, wIn: 24, hIn: 1, color: '#2563eb', showLabel: false, showInLegend: false }
      ],
      legend: {
        DP: { label: 'Player Deployment', color: '#2563eb' },
        DN: { label: 'NPC Deployment', color: '#dc2626' }
      }
    }
  },
  {
    missionId: '16',
    missionType: 'Survive - FV in Zone',
    seq: 16,
    title: 'Hold for Evac',
    active: true,
    description: dedent(`
"Get to the line. Hold it. Don't get dragged back."

The evac window is narrow. If the enemy floods the zone, you're done.
`),
    setup: 'Mark the Evac Zone as an 8" square in the center of the battlefield.',
    deployment: 'Deploy the Player Squad within the Evac Zone. Deploy the NPC Squad on any battlefield edge.',
    victory: 'Player Squad wins if the total FV of Standing Player Units in the Evac Zone is higher than the total FV of Standing NPC Units in the Evac Zone.',
    special: 'NPC Units prioritize moving into the Evac Zone whenever possible.',
    rewards: [],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        { id: 'mrect_p16_npcn', type: 'rect', xIn: 0, yIn: 0, wIn: 24, hIn: 1, color: '#dc2626', showLabel: false, showInLegend: false },
        { id: 'mrect_p16_npcw', type: 'rect', xIn: 0, yIn: 1, wIn: 1, hIn: 22, color: '#dc2626', showLabel: false, showInLegend: false },
        { id: 'mrect_p16_npce', type: 'rect', xIn: 23, yIn: 1, wIn: 1, hIn: 22, color: '#dc2626', showLabel: false, showInLegend: false },
        { id: 'mrect_p16_npcs', type: 'rect', xIn: 0, yIn: 23, wIn: 24, hIn: 1, color: '#dc2626', showLabel: false, showInLegend: false },
        { id: 'mrect_p16_evac', type: 'rect', xIn: 8, yIn: 8, wIn: 8, hIn: 8, color: '#2563eb', showLabel: false, showInLegend: false }
      ],
      legend: {
        DP: { label: 'Evac Zone', color: '#2563eb' },
        DN: { label: 'NPC Deployment', color: '#dc2626' }
      }
    }
  },
  {
    // TODO: REVIEW
    missionId: '17',
    missionType: 'Survive - x Standing',
    seq: 17,
    title: 'Keep Breathing',
    active: true,
    description: dedent(`
"Four turns. Three bodies still moving."

Sometimes the only mission is getting out with enough of the Squad left to matter.
`),
    setup: null,
    deployment: 'Deploy the Player Squad on the Southern battlefield edge. Deploy the NPC Squad on the Northern battlefield edge.',
    victory: 'At the end of Turn 4, at least 3 Player Units are Standing.',
    special: null,
    rewards: [],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        { id: 'mrect_p17_npc', type: 'rect', xIn: 0, yIn: 0, wIn: 24, hIn: 1, color: '#dc2626', showLabel: false, showInLegend: false },
        { id: 'mrect_p17_player', type: 'rect', xIn: 0, yIn: 23, wIn: 24, hIn: 1, color: '#2563eb', showLabel: false, showInLegend: false },
      ],
      legend: {
        DN: { label: 'NPC Deployment', color: '#dc2626' },
        DP: { label: 'Player Deployment', color: '#2563eb' }
      }
    }
  },
  {
    missionId: '18',
    missionType: 'Survive - Protect VIP',
    seq: 18,
    title: 'Protect the Specialist',
    active: true,
    description: dedent(`
"If the Specialist drops, the mission dies with them."

A single operative holds the key: codes, medicine, a map through the dark. Keep them Standing until extraction.
`),
    setup: 'Before deployment, designate one Player Unit as the Specialist. The Specialist cannot be the Player Squad Leader.',
    deployment: 'Deploy the Player Squad on the Southern battlefield edge. Deploy the NPC Squad on the Northern battlefield edge.',
    victory: 'Player Squad wins if the Specialist is Standing at the end of Turn 4.',
    special: 'NPC Units treat the Specialist as their Priority Enemy whenever possible.',
    rewards: [],
    diagram: {
      board: { widthIn: 24, heightIn: 24 },
      showCenterLines: true,
      elements: [
        { id: 'mrect_p18_npc', type: 'rect', xIn: 0, yIn: 0, wIn: 24, hIn: 1, color: '#dc2626', showLabel: false, showInLegend: false },
        { id: 'mrect_p18_player', type: 'rect', xIn: 0, yIn: 23, wIn: 24, hIn: 1, color: '#2563eb', showLabel: false, showInLegend: false }
      ],
      legend: {
        DN: { label: 'NPC Deployment', color: '#dc2626' },
        DP: { label: 'Player Deployment', color: '#2563eb' }
      }
    }
  },
] satisfies MissionPlain[]

export default missions_pve
