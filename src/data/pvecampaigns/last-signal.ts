import { Campaign, MissionDiagramLegend } from '@/types'

// Shared diagram colors
const PS  = '#2563eb' // player deployment
const NPC = '#dc2626' // NPC deployment
const A   = '#16a34a' // Objective A
const B   = '#f97316' // Objective B

// Shared legend used on every mission diagram
const LEGEND: MissionDiagramLegend = {
  PS:  { label: 'Player Deployment', color: PS  },
  NPC: { label: 'NPC Deployment',    color: NPC },
  A:   { label: 'Objective A',       color: A   },
  B:   { label: 'Objective B',       color: B   },
}

const lastSignal: Campaign = {
  campaignId: 'last-signal',
  title: 'Last Signal',
  subtitle: 'An investigative campaign for Hegemony squads',
  factionId: 'HEG',
  lore: `Forty-seven days ago, a relay station on the edge of the Shatter Belt transmitted a single burst on a Hegemony emergency frequency. Command recorded it and ran it through three decryption cycles. What came back was three words:

_**Confirm and Execute.**_

The station has been dark for eighty years. No one should have been able to send anything from it.

Command sat on the signal for six weeks. Someone was trying to trace the identification code buried in the transmission's header. They couldn't. The file it points to is over two hundred years old and sealed above most active clearance levels. Eventually, someone decided that sending a squad to look was preferable to continuing to not know. They gave you the minimum briefing. They sent you anyway.`,

  operations: [
    {
      operationId: 'op-1-kethara-station',
      title: 'Operation 1: Kethara Station',
      lore: `Kethara Station has been off the active relay network for eighty years. It was never decommissioned, just forgotten, one of hundreds of outposts the Hegemony built during its expansion and stopped maintaining when the expansion ended. The signal came from here. That is all Command knows, and all they told you.

Outer Claim raiders have been using the station as a forward base for months, stripping what is useful and burning what is not. The station's core systems are still intact.

Somewhere in the transmission logs is a record of every signal this station ever relayed. What you need is in there. Getting to it means going through them.`,
      enemyFaction: 'Despoilers',
      threatLevel: 1,
      battlefield: 'The Facility',
      missions: [
        {
          missionId: 'ls-1-1',
          title: 'Mission 1.1: Dead Frequency',
          lore: 'Kethara Station\'s docking ring is the first thing you can reach. The Despoilers have fortified it, which means they have been here long enough to care about being pushed out. The station\'s interior access runs through this section. There is no other way in.',
          description: 'Push through the fortified docking ring and hold the interior access points.',
          deployment: 'Flanked. Player within 4" of S Anchor. NPCs split between NW and NE Anchors.',
          objectiveA: {
            type: 'Control - Sustained Hold',
            description: 'Three markers placed on the N, NW, NE Anchors. Hold two markers at the end of two consecutive turns.',
          },
          objectiveB: {
            type: 'Destroy - Full Denial',
            description: 'Three markers on the Center, W, E Anchors. Despoilers\' hasty barricades blocking interior access. `ARM 4 HIT 3` each. Destroy all three.',
          },
          diagram: {
            board: { widthIn: 24, heightIn: 24 },
            showCenterLines: true,
            legend: LEGEND,
            elements: [
              // Player: within 4" of S
              { id: 'PS-1', type: 'circle', anchor: 'S', rIn: 4, color: PS, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // NPC: NW and NE
              { id: 'NPC-1', type: 'circle', anchor: 'NW', rIn: 4, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'NPC-2', type: 'circle', anchor: 'NE', rIn: 4, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // Objective A: N, NW, NE
              { id: 'A-1', type: 'marker', anchor: 'N',  label: 'A', color: A, showInLegend: false },
              { id: 'A-2', type: 'marker', anchor: 'NW', label: 'A', color: A, showInLegend: false },
              { id: 'A-3', type: 'marker', anchor: 'NE', label: 'A', color: A, showInLegend: false },
              // Objective B: C, W, E
              { id: 'B-1', type: 'marker', anchor: 'C', label: 'B', color: B, showInLegend: false },
              { id: 'B-2', type: 'marker', anchor: 'W', label: 'B', color: B, showInLegend: false },
              { id: 'B-3', type: 'marker', anchor: 'E', label: 'B', color: B, showInLegend: false },
            ],
          },
        },
        {
          missionId: 'ls-1-2',
          title: 'Mission 1.2: Static Hold',
          lore: `The docking ring is yours. The station's core systems are deeper in, past the hab blocks and maintenance corridors the Despoilers have made their own. They know the layout better than you do. They are already moving to cut you off.

The station's internal network is partially live. Someone has been using it. If you can reach one of the active terminals and hold it long enough to run a search, you can find where the transmission logs are stored before you fight your way to them blind.`,
          description: 'Search the station\'s internal network while holding the ground you\'ve taken.',
          deployment: 'Standard Insertion. Player Adjacent to SW, S, or SE Anchors. NPCs Adjacent to NW, N, NE Anchors.',
          objectiveA: {
            type: 'Activate - Sequence',
            description: 'One marker placed at Center to start; subsequent markers placed randomly as each is activated. Activate all in sequence.',
          },
          objectiveB: {
            type: 'Control - Hold the Line',
            description: 'One marker at W Anchor, one at E Anchor, one at S Anchor. Control all three at the end of any one turn.',
          },
          diagram: {
            board: { widthIn: 24, heightIn: 24 },
            showCenterLines: true,
            legend: LEGEND,
            elements: [
              // Player: within 4" of SW, S, or SE
              { id: 'PS-1', type: 'circle', anchor: 'SW', rIn: 2, color: PS, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'PS-2', type: 'circle', anchor: 'S',  rIn: 2, color: PS, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'PS-3', type: 'circle', anchor: 'SE', rIn: 2, color: PS, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // NPC: NW, N, NE
              { id: 'NPC-1', type: 'circle', anchor: 'NW', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'NPC-2', type: 'circle', anchor: 'N',  rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'NPC-3', type: 'circle', anchor: 'NE', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // Objective A: C (sequence start)
              { id: 'A-1', type: 'marker', anchor: 'C', label: 'A', color: A, showInLegend: false },
              // Objective B: W, E, S
              { id: 'B-1', type: 'marker', anchor: 'W', label: 'B', color: B, showInLegend: false },
              { id: 'B-2', type: 'marker', anchor: 'E', label: 'B', color: B, showInLegend: false },
              { id: 'B-3', type: 'marker', anchor: 'S', label: 'B', color: B, showInLegend: false },
            ],
          },
        },
        {
          missionId: 'ls-1-3',
          title: 'Mission 1.3: Last Transmission',
          lore: `The logs are in the station's communication core. You know where it is now. So do the Despoilers.

The core is intact, which is the only piece of luck this station has offered. Whatever the Despoilers were using it for, they had the sense not to strip it. The transmission record goes back decades. Somewhere in it is the signal, and before the signal, the address of wherever it came from before it hit Kethara. You need time the Despoilers are not going to give you.`,
          description: 'Recover the transmission record from the communication core and cut the Despoilers\' remote access.',
          deployment: 'Deep Strike. Player within 4" of SE Anchor. NPCs within 4" of NW Anchor.',
          objectiveA: {
            type: 'Activate - Search and Recover',
            description: 'Three markers placed at N, Center, NW Anchors. Search until the record is found; the carrying unit must extract.',
          },
          objectiveB: {
            type: 'Destroy - High-Value Target',
            description: 'One marker at NE Anchor, `ARM 4 HIT 6`. The Despoilers\' remote link to the comm core. Destroy it to prevent a lockout.',
          },
          diagram: {
            board: { widthIn: 24, heightIn: 24 },
            showCenterLines: true,
            legend: LEGEND,
            elements: [
              // Player: within 4" of SE
              { id: 'PS-1',  type: 'circle', anchor: 'SE', rIn: 4, color: PS,  fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // NPC: within 4" of NW
              { id: 'NPC-1', type: 'circle', anchor: 'NW', rIn: 4, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // Objective A: N, C, NW
              { id: 'A-1', type: 'marker', anchor: 'N',  label: 'A', color: A, showInLegend: false },
              { id: 'A-2', type: 'marker', anchor: 'C',  label: 'A', color: A, showInLegend: false },
              { id: 'A-3', type: 'marker', anchor: 'NW', label: 'A', color: A, showInLegend: false },
              // Objective B: NE (HVT)
              { id: 'B-1', type: 'marker', anchor: 'NE', label: 'B', color: B, showInLegend: false },
            ],
          },
        },
      ],
      homebase: `The coordinates are real, but Kethara's logs show the signal didn't originate here, it only passed through. Before Kethara, it touched a relay on Verath III, a mining colony that stopped reporting years before the Swarm made planetfall there. The colony is listed as a total loss. No recovery operation was ever mounted.

The transmission log also carried something else. A fragment, attached to the signal's data header, too corrupted to place in context:

> *...it annihilates. Not out of malice, but by its very nature...*

No source. No date. You file it and move on. Verath III is a long way from here.`,
    },
    {
      operationId: 'op-2-verath-iii',
      title: 'Operation 2: Verath III Mining Colony',
      lore: `Verath III was a productive world once. Three generations of miners built a city inside its largest excavation basin, deep enough that the walls blocked the wind and the geothermal grid kept it warm. When the Swarm made planetfall, the colony held for eleven days before Command wrote it off. No evacuation. No relief force. The official record lists the population as unrecoverable and closes the file in the same sentence.

The Swarm remains, drawn to the ruins the way they are drawn to anything that offers cover and prey. They have been here long enough to know every collapsed tunnel and every sight line in the excavation. They knew you were coming before you broke atmosphere.

The signal passed through here. Somewhere in the ruins of the colony's communication infrastructure is the next coordinate.`,
      enemyFaction: 'Hunter Killers',
      threatLevel: 2,
      battlefield: 'The Ruined City',
      missions: [
        {
          missionId: 'ls-2-1',
          title: 'Mission 2.1: Planetfall',
          lore: 'The excavation basin is larger than the survey maps suggest. The city was built into it over decades, layer by layer, and what the Swarm left behind doesn\'t match any record you were given. Streets are gone. Structures have been partially consumed and left standing, hollowed out from the inside. The communication infrastructure that serviced this colony ran through a central hub somewhere in the lower basin. Finding it means moving through open ground with no reliable cover and no clear sight lines.',
          description: 'Move through the open basin under Hunter Killer pressure and locate the communication hub.',
          deployment: 'Hot Drop. Player adjacent to S or SW Anchors. NPCs adjacent to NW, NE, SE Anchors.',
          objectiveA: {
            type: 'Activate - Full Access',
            description: 'Three markers at N, E, W Anchors. Activate all three to locate the hub.',
          },
          objectiveB: {
            type: 'Destroy - Attrition',
            description: 'Three markers at NW, Center, NE Anchors, `ARM 4 HIT 3`, regenerating 1 HIT per turn. Destroy 2 of 3 to suppress Swarm reinforcement.',
          },
          diagram: {
            board: { widthIn: 24, heightIn: 24 },
            showCenterLines: true,
            legend: LEGEND,
            elements: [
              // Player: adjacent to S or SW
              { id: 'PS-1',  type: 'circle', anchor: 'S',  rIn: 2, color: PS,  fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'PS-2',  type: 'circle', anchor: 'SW', rIn: 2, color: PS,  fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // NPC: NW, NE, SE
              { id: 'NPC-1', type: 'circle', anchor: 'NW', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'NPC-2', type: 'circle', anchor: 'NE', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'NPC-3', type: 'circle', anchor: 'SE', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // Objective A: N, E, W
              { id: 'A-1', type: 'marker', anchor: 'N', label: 'A', color: A, showInLegend: false },
              { id: 'A-2', type: 'marker', anchor: 'E', label: 'A', color: A, showInLegend: false },
              { id: 'A-3', type: 'marker', anchor: 'W', label: 'A', color: A, showInLegend: false },
              // Objective B: NW, C, NE
              { id: 'B-1', type: 'marker', anchor: 'NW', label: 'B', color: B, showInLegend: false },
              { id: 'B-2', type: 'marker', anchor: 'C',  label: 'B', color: B, showInLegend: false },
              { id: 'B-3', type: 'marker', anchor: 'NE', label: 'B', color: B, showInLegend: false },
            ],
          },
        },
        {
          missionId: 'ls-2-2',
          title: 'Mission 2.2: The Consumed City',
          lore: `You found the hub. It is intact, which means the Swarm had no reason to destroy it. The systems inside are dead but recoverable. Getting them live long enough to pull the transmission record will take time you do not have in abundance.

The Hunter Killers have been watching since you made planetfall. They have decided you have gone far enough.`,
          description: 'Hold the perimeter around the hub while bringing its systems back online.',
          deployment: 'Encircled. Player within 4" of Center Anchor. NPCs adjacent to NW, NE, SW, SE Anchors.',
          objectiveA: {
            type: 'Control - Sustained Hold',
            description: 'One marker at NE, one at N Anchor, one at W Anchor. Hold two at the end of two consecutive turns to secure the perimeter.',
          },
          objectiveB: {
            type: 'Activate - Special',
            description: 'One marker at Center. Cannot be attempted until the squad Controls the N Anchor marker from Objective A. Once that condition is met, any unit Controlling the Center marker may spend 2 ACT to activate it.',
          },
          diagram: {
            board: { widthIn: 24, heightIn: 24 },
            showCenterLines: true,
            legend: LEGEND,
            elements: [
              // Player: within 4" of C
              { id: 'PS-1',  type: 'circle', anchor: 'C',  rIn: 4, color: PS,  fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // NPC: NW, NE, SW, SE
              { id: 'NPC-1', type: 'circle', anchor: 'NW', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'NPC-2', type: 'circle', anchor: 'NE', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'NPC-3', type: 'circle', anchor: 'SW', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'NPC-4', type: 'circle', anchor: 'SE', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // Objective A: NE, N, W
              { id: 'A-1', type: 'marker', anchor: 'NE', label: 'A', color: A, showInLegend: false },
              { id: 'A-2', type: 'marker', anchor: 'N',  label: 'A', color: A, showInLegend: false },
              { id: 'A-3', type: 'marker', anchor: 'W',  label: 'A', color: A, showInLegend: false },
              // Objective B: C (special activate)
              { id: 'B-1', type: 'marker', anchor: 'C', label: 'B', color: B, showInLegend: false },
            ],
          },
        },
        {
          missionId: 'ls-2-3',
          title: 'Mission 2.3: Ghost Signal',
          lore: `The transmission record is in there. Fragmented, partially consumed, but readable enough. You brought the systems back online and now the Hunter Killers know exactly where you are. Every one of them that has been pacing this basin since you made planetfall is moving toward this position.

Pull the data and get out.`,
          description: 'Recover the fragmented transmission data and extract before the Hunter Killers converge.',
          deployment: 'Overwatch. Player adjacent to SW, S, or SE Anchors. NPCs adjacent to W, N, E Anchors.',
          objectiveA: {
            type: 'Activate - Search and Recover',
            description: 'Three markers at NW, N, NE Anchors. Search until the data is found; the carrying unit must extract.',
          },
          objectiveB: {
            type: 'Destroy - Full Denial',
            description: 'Three markers at W, Center, E Anchors, `ARM 4 HIT 3`. Destroy all three Swarm coordination nodes to slow the encirclement.',
          },
          diagram: {
            board: { widthIn: 24, heightIn: 24 },
            showCenterLines: true,
            legend: LEGEND,
            elements: [
              // Player: adjacent to SW, S, or SE
              { id: 'PS-1',  type: 'circle', anchor: 'SW', rIn: 2, color: PS,  fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'PS-2',  type: 'circle', anchor: 'S',  rIn: 2, color: PS,  fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'PS-3',  type: 'circle', anchor: 'SE', rIn: 2, color: PS,  fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // NPC: W, N, E
              { id: 'NPC-1', type: 'circle', anchor: 'W',  rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'NPC-2', type: 'circle', anchor: 'N',  rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'NPC-3', type: 'circle', anchor: 'E',  rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // Objective A: NW, N, NE
              { id: 'A-1', type: 'marker', anchor: 'NW', label: 'A', color: A, showInLegend: false },
              { id: 'A-2', type: 'marker', anchor: 'N',  label: 'A', color: A, showInLegend: false },
              { id: 'A-3', type: 'marker', anchor: 'NE', label: 'A', color: A, showInLegend: false },
              // Objective B: W, C, E
              { id: 'B-1', type: 'marker', anchor: 'W', label: 'B', color: B, showInLegend: false },
              { id: 'B-2', type: 'marker', anchor: 'C', label: 'B', color: B, showInLegend: false },
              { id: 'B-3', type: 'marker', anchor: 'E', label: 'B', color: B, showInLegend: false },
            ],
          },
        },
      ],
      homebase: `The transmission record from Verath III shows the signal didn't originate here either. Before Verath III it came from coordinates that don't appear on any current chart. No station. No colony. No survey marker. Just a location in open space that the Hegemony has no record of visiting.

The fragment pulled from the transmission header is harder to set aside than the last one:

> *...something I have spent two hundred years trying to find language for...*

Two hundred years. The signal is older than anyone in Command assumed when they filed it. Whoever sent it has been somewhere without a name for two centuries, and they sent it to you.

You have the coordinates. There is nothing else to do with them but go.`,
    },
    {
      operationId: 'op-3-exclusion-zone-kael',
      title: 'Operation 3: Exclusion Zone Kael',
      lore: `The coordinates resolve to a planetary body that has no name in any current record. It is not on any survey path. It does not appear in any navigation archive the squad has access to. What is there should not be there: a structure of impossible scale and age, its surface covered in geometric formations that predate every civilization in Hegemony records. Instruments report nothing. The structure is there anyway.

The Relict Wardens are here in force. They engage before you finish your approach. There is no communication attempt, no warning, no demand to withdraw. They simply move to stop you from getting any closer.

You have coordinates and a signal to trace.`,
      enemyFaction: 'Relict Wardens',
      threatLevel: 3,
      battlefield: 'The Cursed Temple',
      missions: [
        {
          missionId: 'ls-3-1',
          title: 'Mission 3.1: Perimeter',
          lore: `The outer surface of the structure is vast and featureless except for the Wardens holding it. They do not use cover. They do not fall back. They stand between you and the entrance to the interior and they do not move until you make them.

Whatever is inside, they do not want you reaching it.`,
          description: 'Break through the Warden perimeter line and advance to the structure\'s entrance.',
          deployment: 'Flanked. Player within 4" of S Anchor. NPCs within 4" of NW and NE Anchors.',
          objectiveA: {
            type: 'Destroy - Full Denial',
            description: 'Three markers at N, NW, NE Anchors, `ARM 4 HIT 3` each. Ancient Warden barrier constructs blocking entry. Destroy all three.',
          },
          objectiveB: {
            type: 'Control - Clear and Move',
            description: 'Three markers at W, Center, E Anchors. Control one each turn; markers are removed as they are controlled.',
          },
          diagram: {
            board: { widthIn: 24, heightIn: 24 },
            showCenterLines: true,
            legend: LEGEND,
            elements: [
              // Player: within 4" of S
              { id: 'PS-1',  type: 'circle', anchor: 'S',  rIn: 4, color: PS,  fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // NPC: NW, NE
              { id: 'NPC-1', type: 'circle', anchor: 'NW', rIn: 4, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'NPC-2', type: 'circle', anchor: 'NE', rIn: 4, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // Objective A: N, NW, NE
              { id: 'A-1', type: 'marker', anchor: 'N',  label: 'A', color: A, showInLegend: false },
              { id: 'A-2', type: 'marker', anchor: 'NW', label: 'A', color: A, showInLegend: false },
              { id: 'A-3', type: 'marker', anchor: 'NE', label: 'A', color: A, showInLegend: false },
              // Objective B: W, C, E
              { id: 'B-1', type: 'marker', anchor: 'W', label: 'B', color: B, showInLegend: false },
              { id: 'B-2', type: 'marker', anchor: 'C', label: 'B', color: B, showInLegend: false },
              { id: 'B-3', type: 'marker', anchor: 'E', label: 'B', color: B, showInLegend: false },
            ],
          },
        },
        {
          missionId: 'ls-3-2',
          title: 'Mission 3.2: The Interior',
          lore: `The entrance leads down. The interior of the structure is not what the outside suggested. The geometric formations on the surface give way to something that feels engineered rather than built, corridors that are too precise, dimensions that are slightly wrong in ways that are difficult to identify and impossible to ignore.

The Wardens are falling back rather than holding position but do not stop fighting.`,
          description: 'Follow the signal deeper into the structure while suppressing the Warden rearguard.',
          deployment: 'Standard Insertion. Player Adjacent to SW, S, or SE Anchors. NPCs Adjacent to NW, N, NE Anchors.',
          objectiveA: {
            type: 'Activate - Sequence',
            description: 'One marker placed at Center to start; subsequent markers placed randomly as each is activated. Follow the signal node by node.',
          },
          objectiveB: {
            type: 'Destroy - Attrition',
            description: 'Three markers at NW, N, NE Anchors, `ARM 4 HIT 3`, regenerating 1 HIT per turn. Destroy 2 of 3 Warden resonance beacons to weaken their position.',
          },
          diagram: {
            board: { widthIn: 24, heightIn: 24 },
            showCenterLines: true,
            legend: LEGEND,
            elements: [
              // Player: within 4" of SW, S, or SE
              { id: 'PS-1',  type: 'circle', anchor: 'SW', rIn: 2, color: PS, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'PS-2',  type: 'circle', anchor: 'S',  rIn: 2, color: PS, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'PS-3',  type: 'circle', anchor: 'SE', rIn: 2, color: PS, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // NPC: NW, N, NE
              { id: 'NPC-1', type: 'circle', anchor: 'NW', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'NPC-2', type: 'circle', anchor: 'N',  rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'NPC-3', type: 'circle', anchor: 'NE', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // Objective A: C (sequence start)
              { id: 'A-1', type: 'marker', anchor: 'C',  label: 'A', color: A, showInLegend: false },
              // Objective B: NW, N, NE
              { id: 'B-1', type: 'marker', anchor: 'NW', label: 'B', color: B, showInLegend: false },
              { id: 'B-2', type: 'marker', anchor: 'N',  label: 'B', color: B, showInLegend: false },
              { id: 'B-3', type: 'marker', anchor: 'NE', label: 'B', color: B, showInLegend: false },
            ],
          },
        },
        {
          missionId: 'ls-3-3',
          title: 'Mission 3.3: The Threshold',
          lore: `The corridor ends in a chamber large enough that the far wall is not immediately visible. At the center is a door that has no mechanism, no seam, no visible means of opening. The signal came from beyond it.

The Wardens are here in greater numbers than anything you encountered in the outer structure. Whatever is behind that door, this is where they have chosen to make their final stand.`,
          description: 'Bring down the ancient seal and hold the threshold chamber long enough to open the way.',
          deployment: 'Encircled. Player within 4" of Center Anchor. NPCs adjacent to NW, NE, SW, SE Anchors.',
          objectiveA: {
            type: 'Destroy - High-Value Target',
            description: 'One marker at N Anchor, `ARM 4 HIT 6`. An ancient Warden construct sealing the door. Destroy it to open the way forward.',
          },
          objectiveB: {
            type: 'Control - Sustained Hold',
            description: 'Three markers at W, Center, E Anchors. Hold two at the end of two consecutive turns while working on the lock.',
          },
          diagram: {
            board: { widthIn: 24, heightIn: 24 },
            showCenterLines: true,
            legend: LEGEND,
            elements: [
              // Player: within 4" of C
              { id: 'PS-1',  type: 'circle', anchor: 'C',  rIn: 4, color: PS,  fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // NPC: NW, NE, SW, SE
              { id: 'NPC-1', type: 'circle', anchor: 'NW', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'NPC-2', type: 'circle', anchor: 'NE', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'NPC-3', type: 'circle', anchor: 'SW', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'NPC-4', type: 'circle', anchor: 'SE', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // Objective A: N (HVT)
              { id: 'A-1', type: 'marker', anchor: 'N', label: 'A', color: A, showInLegend: false },
              // Objective B: W, C, E
              { id: 'B-1', type: 'marker', anchor: 'W', label: 'B', color: B, showInLegend: false },
              { id: 'B-2', type: 'marker', anchor: 'C', label: 'B', color: B, showInLegend: false },
              { id: 'B-3', type: 'marker', anchor: 'E', label: 'B', color: B, showInLegend: false },
            ],
          },
        },
      ],
      homebase: `The Wardens are dead or gone. The chamber is quiet in a way that has nothing to do with the absence of fighting.

You find one still standing. It does not attack. It looks at the door, then at you, then at the door again. You do not share a language. You do not need one. It has been waiting here for something, and whatever that something was, you are the closest thing to it that has arrived in a very long time.

Beyond the door is where the signal started. Beyond the door is whatever the Wardens have been dying to protect for longer than your civilization has existed.

You open it. That is what you were sent to do.`,
    },
    {
      operationId: 'op-climax-last-signal',
      title: 'Climax: Last Signal',
      lore: `Beyond the door the structure changes again. The engineered precision of the interior gives way to something older, a space that was not built so much as designated. At the center is a seal over a tear in the geometry of the space. You know it immediately, the way you know a wound is serious before you have assessed it. Something is behind it that your instruments do not register and your instincts do not stop registering.

The Praxium Corps squad is here. What is left of them.

They were elites once. You can see it in the way they move, the discipline still present in bodies that no longer have the minds to direct it properly. They engage without hesitation, without communication, without any of the recognition that should pass between Hegemony forces meeting in the field. They are not soldiers anymore. They are something that has been sharpened and corrupted for two hundred years.

One of them does not engage. Older than the rest, standing apart, watching you fight through their squad with an expression that has nothing left in it except the specific exhaustion of someone who has been waiting for this moment for a very long time.

The last order was always this. You just did not know it until now.`,
      enemyFaction: 'Praxium Corps',
      threatLevel: 3,
      battlefield: 'The Cursed Temple',
      missions: [
        {
          missionId: 'ls-climax',
          title: 'Last Signal',
          description: 'Eliminate the corrupted Praxium Corps squad and protect their leader long enough to carry out the last order.',
          deployment: 'Standard Insertion. Player within 4" of S Anchor. Corrupted Praxium Corps Adjacent to NW and NE Anchors.',
          objectiveA: {
            type: 'Special - Eliminate',
            description: 'Eliminate the entire Praxium Corps squad.',
          },
          objectiveB: {
            type: 'Special - Protect',
            description: 'The Praxium leader is placed at the N Anchor. `ARM 5 HIT 1`. The leader does not activate. NPC Units treat the leader as their first priority target. Victory: the leader is Standing at the end of Turn 4.',
          },
          diagram: {
            board: { widthIn: 24, heightIn: 24 },
            showCenterLines: true,
            legend: {
              PS:     { label: 'Player Deployment', color: PS  },
              NPC:    { label: 'Corrupted Squad (Obj A)',   color: NPC },
              Leader: { label: 'Leader — protect (Obj B)',  color: B   },
            },
            elements: [
              // Player: within 4" of S
              { id: 'PS-1',    type: 'circle', anchor: 'S',  rIn: 4, color: PS,  fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // Corrupted squad: NW, N, NE
              { id: 'NPC-1',   type: 'circle', anchor: 'NW', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              { id: 'NPC-2',   type: 'circle', anchor: 'NE', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
              // Leader at N (Obj B target — protect)
              { id: 'Leader',  type: 'marker', anchor: 'N',  label: 'Leader', color: B,   showInLegend: false },
            ],
          },
        },
      ],
    },
  ],

  conclusion: `The last member of the Praxium squad is down. The leader has not moved from their position by the seal. They are watching you with the same expression they have held since you entered the chamber.

They speak. Slowly, in the measured cadence of someone who has been rehearsing this conversation for decades and is no longer certain the words are adequate. They tell you everything. The survey team. The breach. What the Revenant commander showed them in the space between one moment and the next. The decision to stay. The stasis that was not stasis. And the slow rot that corrupted the squad's minds.

When they finish, they hand you a data chip. The full transmission. What you received as *Confirm and execute* was the end of something much longer.

Read it now. Then do what you were sent to do.

---

> To whoever followed the signal.
>
> I was sent to investigate an anomaly that wouldn't scan, standard orders. We breached the structure, engaged the Revenants guarding it, and reached the center before they were able to make us understand what we were about to do.
>
> The Revenant commander forced a psychic link, intruding on my mind. One moment we were breaching the final wall, the next I was somewhere else entirely, shown something I have spent two hundred years trying to find language for. Not a vision, a fact, delivered directly into the part of the mind that cannot argue with what it knows.
>
> This site is a seal, a cage, containing an entity that has existed since the galaxy's first age. It does not think the way anything alive thinks. It does not want, it annihilates. Not out of malice, but by its very nature. The Revenants showed me the last time it was free. There are no other records of that age because nothing survived to keep them.
>
> The seal has been locked ever since. The Revenants have held it at a cost that would hollow out any civilization I know of because the alternative is not war or defeat, it is erasure. Everything. All of it. The seal must remain locked not because we could not survive what is behind it, but because *nothing* would.
>
> The Revenants told me at the outset that the stasis apparatus does not suspend awareness. I understood what that meant, but I did not understand what two centuries of proximity to the thing behind this seal would do to minds that could not escape it. My squad is still alive but they are no longer themselves. What remains is an instrument the entity is learning to play.
>
> I cannot do what needs to be done alone and I will not leave it to the Revenants.
>
> You are here. That is enough.
>
> Do not enter the structure. Do not engage the Revenants. File nothing. Let them do what they have always done, and do not return to these coordinates. The seal has held for millennia and it will hold without your help, but it will not hold if Command decides it sees an opportunity here.
>
> Confirm and execute mercy. For me, and for what remains of my squad.
>
> That is the last order. That is all it ever was.
>
> -- Praxium Corps, [DESIGNATION REDACTED], Cycle 6673.4`,
}

export default lastSignal
