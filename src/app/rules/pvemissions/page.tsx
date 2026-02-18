import BattlefieldDiagram, { type BattlefieldDiagramConfig } from '@/components/shared/BattlefieldDiagram'
import Markdown from '@/components/ui/Markdown'
import PageBreak from '@/components/ui/PageBreak'
import { GAME } from '@/lib/config/game_config'
import { Fragment } from 'react'

import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { GearCategoryService, SpecialService, UserService } from '@/services'
import UnitCard from '@/components/unit/UnitCard'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'PvE Missions',
    description: `The complete PvE Mission rules for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{
      url: '/icons/icon-big.png',
    }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules/pvemissions'
  })
}

export default async function PvEMissions() {
  const versionTimestamp = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date()).replaceAll('-', '')
  const injuries = await GearCategoryService.getGearCategory('INJ')
  const spoilsOfWar = await GearCategoryService.getGearCategory('SOW')
  const pveUser = (await UserService.getUserByUsername('pve')) ?? (await UserService.getUser('pve'))
  const pveSquads = (pveUser?.squads ?? []).slice().sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0))
  const allSpecials = await SpecialService.getAllSpecials()
  
  const anchorsDiagram = {
    board: { widthIn: 24, heightIn: 24 },
    elements: [
      { type: 'marker', id: 'NW', xIn: 4, yIn: 4, label: 'NW', showInLegend: false },
      { type: 'marker', id: 'N', xIn: 12, yIn: 6, label: 'N', showInLegend: false },
      { type: 'marker', id: 'NE', xIn: 20, yIn: 4, label: 'NE', showInLegend: false },
      { type: 'marker', id: 'W', xIn: 6, yIn: 12, label: 'W', showInLegend: false },
      { type: 'marker', id: 'C', xIn: 12, yIn: 12, label: 'C', showInLegend: false },
      { type: 'marker', id: 'E', xIn: 18, yIn: 12, label: 'E', showInLegend: false },
      { type: 'marker', id: 'SW', xIn: 4, yIn: 20, label: 'SW', showInLegend: false },
      { type: 'marker', id: 'S', xIn: 12, yIn: 18, label: 'S', showInLegend: false },
      { type: 'marker', id: 'SE', xIn: 20, yIn: 20, label: 'SE', showInLegend: false },

      { type: 'callout', id: 'h1', x1In: 0, y1In: 4, x2In: 4, y2In: 4, text: '4"' },
      { type: 'callout', id: 'h2', x1In: 0, y1In: 12, x2In: 6, y2In: 12, text: '6"' },
      { type: 'callout', id: 'h3', x1In: 0, y1In: 20, x2In: 4, y2In: 20, text: '4"' },
      { type: 'callout', id: 'v1', x1In: 4, y1In: 0, x2In: 4, y2In: 4, text: '4"' },
      { type: 'callout', id: 'v2', x1In: 12, y1In: 0, x2In: 12, y2In: 6, text: '6"' },
      { type: 'callout', id: 'v3', x1In: 4, y1In: 20, x2In: 4, y2In: 24, text: '4"' },

      { type: 'callout', id: 'h4', x1In: 20, y1In: 4, x2In: 24, y2In: 4, text: '4"' },
      { type: 'callout', id: 'h5', x1In: 18, y1In: 12, x2In: 24, y2In: 12, text: '6"' },
      { type: 'callout', id: 'h6', x1In: 20, y1In: 20, x2In: 24, y2In: 20, text: '4"' },
      { type: 'callout', id: 'v4', x1In: 20, y1In: 0, x2In: 20, y2In: 4, text: '4"' },
      { type: 'callout', id: 'v5', x1In: 12, y1In: 24, x2In: 12, y2In: 18, text: '6"' },
      { type: 'callout', id: 'v6', x1In: 20, y1In: 20, x2In: 20, y2In: 24, text: '4"' },

      //{ type: 'rect', id: 'PD', xIn: 0, yIn: 0, wIn: 24, hIn: 2, label: 'NPC Squad Deployment', showInLegend: false },
      //{ type: 'rect', id: 'ND', xIn: 0, yIn: 22, wIn: 24, hIn: 2, label: 'Player Squad Deployment', showInLegend: false }
    ]
  } satisfies BattlefieldDiagramConfig

  return (
    <>
      {/* Cover */}
      <img src="/img/rules/BookCover_Framed.webp" className="printonly fullpage overflow-y-hidden" style={{pageBreakAfter: 'always'}} />
      <div className="printonly absolute left-1/2 top-1/4 -translate-x-1/2">
        <div className="text-center text-white font-title text-2xl tracking-wide bg-black/70 px-6 py-3 rounded-lg shadow-lg">
          <h1>PvE Missions</h1>
          Version {versionTimestamp}
        </div>
      </div>

      <div className="rules px-3 max-w-7xl mx-auto">
        <div className="section">
          <h1 className="text-center pt-48 mb-12 font-title"   id="allsquadTypes" style={{position: 'relative', top: '50%' }}>
            PvE Missions
          </h1>

          <div className="section twocols">
            <div className="section">
              <h2>Introduction</h2>
              <div className="flavor">
                There are no fair fights left.
                <br/>
                The great wars are over, or so the histories claim. What remains are their consequences: quarantined sectors, broken supply lines, abandoned installations, and threats that cannot be destroyed, only contained, delayed, or outrun.
                <br/>
                PvE missions represent the work that never makes it into official records. Recovery operations that arrive too late. Containment efforts stretched past their breaking point. Raids launched not to win, but to buy time.
                <br/>
                Your squad is deployed with limited intelligence, incomplete objectives, and no guarantee of extraction. Every decision carries weight beyond the battlefield. What you secure, what you abandon, and who you leave behind will shape what comes next.
              </div>
            </div>
            <div className="section">
              <h2>About</h2>
              This book contains everything needed to play procedurally generated PvE missions in Ruinstars.
              <br/>
              PvE missions are designed to be playable solo or cooperatively, fast to set up, narrative-driven without requiring a dedicated game master, and meaningful across multiple missions and campaigns.
              <br/><br/>
              Each Mission is one engagement that sees your Squad face enemy forces and make difficult decisions on risks vs rewards.
              Each Mission has two objectives, but completing those objectives is not enough to ensure victory; your Squad must make it off the battlefield alive to reap the rewards.
              <br/><br/>
              PvE play emphasizes tactical restraint over reckless aggression, extraction as a strategic decision, not an afterthought, and long-term squad survival over single-mission dominance.
            </div>
          </div>

          <div className="section">
            <h2>Anchors</h2>
            <div className="twocols">
              <div className="section">
                Some Objectives and Events include placing markers or tokens on "Anchors". Anchors are nine fixed reference points arranged across the battlefield by compass direction: the four corners (NW, NE, SW, SE), the four edge midpoints (N, S, E, W), and the Center (C), as illustrated below.
                <br/>
                To place your Anchors, use the following measurements from the battlefield edges:
                <ul>
                  <li>Corner Anchors (NW, NE, SW, SE): 4" from each adjacent edge</li>
                  <li>Cardinal Anchors (N, S, E, W): 6" from their adjacent edge, centered on that edge</li>
                  <li>Center (C): The center of the battlefield</li>
                </ul>
                When an Objective or Event instructs you to place a marker on a random Anchor, roll 1D10 and consult the diagram below. On a 10, select any Anchor of your choice. If an Anchor is already occupied, re-roll that placement.
              </div>
              <div className="section">
                <BattlefieldDiagram diagram={anchorsDiagram} className="max-w-sm" />
              </div>
            </div>
          </div>

          <PageBreak />
          <div className="section">
            <h2>Mission Setup</h2>
            <div className="section twocols">
              <div className="section">
                Before the first turn begins, follow the steps below to generate your mission.
                Each mission is defined by
                two random <strong>Objectives</strong> that determine victory conditions,
                a Mission <strong>Modifier</strong> that alters battlefield conditions,
                and a <strong>Deployment</strong> variant that determines where both squads begin.
                <br/>
                For your first mission, skip steps 2 and 3; play with Standard Conditions and Standard Insertion to learn the core mechanics.
                Once you're comfortable, the Mission Modifiers and Deployment Variants add significant variety without increasing complexity.
                Optional rule: you may add the current Threat Level to your Mission Modifier roll (maximum 6) for increased difficulty.
              </div>
              <div className="section border border-main rounded-md px-6 py-2 mx-16">
                <h4>Mission Setup</h4>
                <ol className="ml-4">
                  <li>Roll 2 Objectives</li>
                  <li>Roll Mission Modifier</li>
                  <li>Roll Deployment</li>
                  <li>Roll NPC Squad Units</li>
                  <li>Deploy NPC Squad</li>
                  <li>Deploy Player Squad</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="twocols">
            {/* NPC Squads + TL */}
            <div className="section">
              <h3>NPC Squads</h3>
              Each mission is opposed by a single NPC faction.
              Select a faction from the NPC Units section at the back of this book, or choose one randomly.
              For variety, we recommend using the same faction for all three missions within an Operation, then switching factions for the next Operation.
              <br/>
              Each NPC Squad has a Spawn Table that determines which Units are deployed for a given mission.
              Before deploying the NPC Squad, select a Threat Level from 1 to 3.
              Threat Level represents the intensity of the opposition your Squad faces.
              Higher Threat Levels produce more dangerous Units and larger groups.
              If playing a Campaign, the Threat Level should match the current Operation number:
              TL1 for Operation 1, TL2 for Operation 2, TL3 for Operation 3.
              <br/>
              Once you have selected a faction and Threat Level, roll <code>3D6</code> and consult that faction's Spawn Table.
              Each die is resolved individually - look up each result in the column matching your current Threat Level to identify the Units spawned by that die.
            </div>
            {/* Objectives */}
            <div className="section">
              <h3>Objectives (D6)</h3>
              At the start of the Mission, roll <code>2D6</code> to determine two objectives for the mission (re-roll doubles).
              <div>
                <strong>1: Battlefield Control</strong>
                <div className="ml-4">
                  <strong>Victory:</strong> At the end of Turn 4, all four corner Anchors (NW, NE, SW, SE) are controlled by Player Units.
                  {/* 
                  <strong>Rewards (pick one):</strong>
                  <ul>
                    <li>
                      <strong>Forward Positioning</strong>
                      In the next Mission, one Player Unit may perform a free Move Action immediately after deployment.
                    </li>
                    <li>
                      <strong>Stabilized Zone</strong>
                      In the next Mission, you may re-roll one Turn Event roll.
                    </li>
                  </ul>
                  */}
                </div>
              </div>
              <div>
                <strong>2: Destroy Nexus</strong>
                <div className="ml-4">
                  <strong>Setup:</strong> Place a Nexus marker on 3 random Anchors.<br/>
                  <strong>Special:</strong> Nexus Markers are items with <code>ARM 3</code> and <code>HIT 2</code> and can be targeted in combat.<br/>
                  <strong>Victory:</strong> All Nexus Markers are Taken Out.
                  {/* 
                  <strong>Rewards (pick one):</strong>
                  <ul>
                    <li>
                      <strong>Stabilized Zone</strong>
                      In the next Mission, you may re-roll one Turn Event roll.
                    </li>
                    <li>
                      <strong>Fragmented Defense</strong>
                      In the next Mission, after deploying NPC Units, you may remove one NPC Unit from the battlefield.
                    </li>
                  </ul>
                  */}
                </div>
              </div>
              <div>
                <strong>3: No Survivors</strong>
                <div className="ml-4">
                  <strong>Victory:</strong> All enemy Units Taken Out.
                  {/* 
                  <strong>Rewards (pick one):</strong>
                  <ul>
                    <li>
                      <strong>Attrition</strong>
                      In the next Mission, you may choose one NPC Spawn die to spawn 1 less Unit.
                    </li>
                    <li>
                      <strong>Persistent Wound</strong>
                      In the next Mission, choose two NPC Units to start with -1 HIT.
                    </li>
                  </ul>
                  */}
                </div>
              </div>
              <div>
                <strong>4: Protect The Asset</strong>
                <div className="ml-4">
                  <strong>Setup:</strong> Place an Asset marker as close as possible to the Center of the battlefield. Assets are Items with <code>ARM 3 HIT 3</code> and can be targeted in Combat.<br/>
                  <strong>Special:</strong> NPC Units always prioritize targeting the Asset instead of Player Units.<br/>
                  <strong>Victory:</strong> The Asset still has at least 1 <code>HIT</code> at the end of Turn 4.
                  {/* 
                  <strong>Rewards (pick one):</strong>
                  <ul>
                    <li>
                      <strong>Medic</strong>
                      Remove one Injury from one Player Unit before the next Mission.
                    </li>
                    <li>
                      <strong>Extraction Support</strong>
                      In the next Mission, Player Squad may extract even if Adjacent to an enemy Unit
                    </li>
                  </ul>
                  */}
                </div>
              </div>
              <div>
                <strong>5: Disruption Field</strong>
                <div className="ml-4">
                  <strong>Setup:</strong> Place a Disruptor Pylon on 3 random Anchors.<br/>
                  <strong>Mission Action - Calibrate Pylon (2ACT):</strong> A Unit that Controls a Disruptor Pylon calibrates it. Remove that Pylon from the battlefield.<br/>
                  <strong>Victory:</strong> All 3 Disruptor Pylons have been calibrated.
                  {/* 
                  <strong>Rewards (pick one):</strong>
                  <ul>
                    <li>
                      <strong>Orbital Survey</strong>
                      In the next Mission, you may choose to ignore one Turn Event
                    </li>
                    <li>
                      <strong>Signal Advantage</strong>
                      In the next Mission, Player Squad gets +2 TO in the first Turn
                    </li>
                  </ul>
                  */}
                </div>
              </div>
              <div>
                <strong>6: The Artifact</strong>
                <div className="ml-4">
                  <strong>Setup:</strong> Place a Search Marker on 3 random Anchors.<br/>
                  <strong>Mission Action - Search (2ACT):</strong> A Unit that Controls a Search Marker searches it. Roll <code>1D6</code>: On a 1 or 2, the Artifact is found. This roll cannot be modified or re-rolled using TO.<br/>
                  <strong>Victory:</strong> The Artifact is found.
                  {/* 
                  <strong>Rewards (pick one):</strong>
                  <ul>
                    <li>
                      <strong>Strategic Forecast</strong>
                      In the next Mission, you may choose to ignore the Mission Modifier
                    </li>
                    <li>
                      <strong>Protection Aura</strong>
                      In the next Mission, select one Anchor. No NPC Units may come within 3" of that Anchor.
                    </li>
                  </ul>
                  */}
                </div>
              </div>
            </div>
            {/* Modifiers */}
            <div className="section">
              <h3>Mission Modifiers (D6)</h3>
              These Mission Modifiers are optional; you can choose to skip them.<br/>
              For an extra challenge, add the current Threat Level to your roll (maximum 6) for increased difficulty. Recommended for experienced Squads.
              <div>
                <strong>1: Standard Conditions</strong>
                <div className="ml-4">No additional battlefield conditions apply to this mission.</div>
              </div>
              <div>
                <strong>2: Fortified Position</strong>
                <div className="ml-4">
                  The enemy dug in before you arrived. All NPC Units are placed in Cover at deployment and remain in Cover until they move for the first time.
                </div>
              </div>
              <div>
                <strong>3: Fog of War</strong>
                <div className="ml-4">
                  Visibility is severely reduced. All Ranged combat is limited to a maximum range of 8". Weapons with a range shorter than 8" are unaffected. Weapons with infinite range are treated as RNG8" this mission.
                </div>
              </div>
              <div>
                <strong>4: Blackout</strong>
                <div className="ml-4">
                  Squad communications are jammed. The Player Squad cannot spend TO to change the result of dice by +/- 1 this mission. TO may still be spent on all other uses (actions, skills, re-rolls).
                </div>
              </div>
              <div>
                <strong>5: Hostile Environment</strong>
                <div className="ml-4">
                  The battlefield itself is killing you. At the end of each Turn, each Player Unit within 6" of the Center anchor takes 2 Damage.
                </div>
              </div>
              <div>
                <strong>6: Desperate Hour</strong>
                <div className="ml-4">
                  Command is screaming for results. The Player Squad must Extract by the end of Turn 3 instead of Turn 4. If no Units have Extracted by end of Turn 3, the mission ends and is considered a failure regardless of objectives completed.
                </div>
              </div>
            </div>
            {/* Deployments */}
            <div className="section">
              <h3>Deployments (D6)</h3>
              <div>
                <strong>1: Standard Insertion</strong>
                <div className="ml-4">Player Squad deploys on the Southern edge. NPC Squad deploys on the Northern edge.</div>
              </div>
              <div>
                <strong>2: Hot Drop</strong>
                <div className="ml-4">The insertion was faster than expected. Player Squad deploys within 4" of the Center anchor. NPC Squad deploys on the Northern edge.</div>
              </div>
              <div>
                <strong>3: Flanked</strong>
                <div className="ml-4">Intel was wrong. The enemy is coming from two directions. NPC Squad splits as evenly as possible and deploys on both the Eastern and Western edges. Player Squad deploys on the Southern edge.</div>
              </div>
              <div>
                <strong>4: Deep Strike</strong>
                <div className="ml-4">Both sides arrived at the same time. Both Player Squad and NPC Squad deploy within 8" of the Center anchor. Roll off to determine who deploys first.</div>
              </div>
              <div>
                <strong>5: Overwatch</strong>
                <div className="ml-4">The enemy holds the high ground and saw you coming. NPC Squad deploys anywhere on the Northern half of the battlefield, in Cover if possible. Player Squad deploys on the Southern edge.</div>
              </div>
              <div>
                <strong>6: Encircled</strong>
                <div className="ml-4">Extraction just got complicated. Player Squad deploys within 4" of the Center anchor. NPC Squad splits as evenly as possible across all four edges of the battlefield.</div>
              </div>
            </div>
          </div>

          <div className="section">
            <h2>Playing the Mission</h2>
            <div className="section twocols">
              {/* Turn Sequence */}
              <div className="section">
                <h3>Turn Sequence</h3>
                <ol>
                  <li>Roll TOs</li>
                  <li>Roll Turn Events</li>
                  <li>Resolve "Start of Turn" Events and Skills</li>
                  <li>Activate Units</li>
                  <li>Choose to Extract</li>
                </ol>
              </div>
              {/* Turn Events */}
              <div className="section">
                <h3>Turn Events (D6)</h3>
                At the start of each Turn, roll <code>1D6</code> to determine a special event for the Turn.
                If the Mission is in Turn 5 or later, do not roll Turn Events and apply the <strong>Enemy Reinforcements</strong> event instead.
                <div>
                  <strong>1: Opportunity</strong>
                  <div className="ml-4">One Player Unit may immediately spend up to <code>2 ACT</code> on actions before the start of the Turn. This does not count as that Unit's activation for the Turn.</div>
                </div>
                <div>
                  <strong>2: Field Dressing</strong>
                  <div className="ml-4">One Standing Player Unit regains 1 lost <code>HIT</code>.</div>
                </div>
                <div>
                  <strong>3: Strategic Command</strong>
                  <div className="ml-4">Player Squad gains <code>+2 TO</code>.</div>
                </div>
                <div>
                  <strong>4: Scrambled Comms</strong>
                  <div className="ml-4">Player Squad loses <code>-2 TO</code> (minimum 0).</div>
                </div>
                <div>
                  <strong>5: Overrun</strong>
                  <div className="ml-4">All NPC Units immediately perform 1 Action according to their Behavior.</div>
                </div>
                <div>
                  <strong>6: Enemy Reinforcements</strong>
                  <div className="ml-4">Roll <code>1D6</code> and consult the Spawn Table for the current Threat Level. Spawn one Unit of the indicated type Adjacent to a random Anchor.</div>
                </div>
              </div>
              {/* NPC Activations */}
              <div className="section">
                <h3>NPC Activations</h3>
                After each Player Unit activation, the same player activates a Ready NPC Unit.
                Each NPC Unit has a "Behavior" skill that describes how it spends its ACT.
                After each NPC Unit activation, the next Player activates a Player Unit and the cycle repeats until all Units have been activated.
              </div>
              {/* Extraction */}
              <div className="section">
                <h3>Extraction</h3>
                The Player Squad may <strong>Extract</strong> at the end of any Turn. To Extract, all Standing Units in the Squad must not be Adjacent to any enemy Units.
                Once a Squad extracts, the Mission ends.<br/>
                Upon extraction, the Squad scores <strong>Mission Points</strong> (MP) based on their objectives and the Threat Level:
                <ul>
                  <li>1 MP per Threat Level</li>
                  <li>3 MP per completed Objective</li>
                </ul>
                In Campaign play, MP can be spent on Rewards (see <strong>Campaigns</strong> below) for the Squad.
              </div>
            </div>
          </div>

          <PageBreak />
          <div>
            <h2>Campaigns</h2>
            <div className="twocols">
              <div className="section">
                <h3>Campaign Structure</h3>
                A Campaign is composed of three Operations, and each Operation is composed of three Missions.<br/>
                At the end of each Operation, your Squad returns to Homebase to heal injuries, resupply, and recruit new Units into the Squad.

                <h4>Sample Campaign</h4>
                <ul>
                  <li>
                    Operation 1<br/>
                    <em>Threat Level 1</em>
                    <ul>
                      <li>Mission 1.1</li>
                      <li>Mission 1.2</li>
                      <li>Mission 1.3</li>
                      <li>Homebase</li>
                    </ul>
                  </li>
                  <li>
                    Operation 2<br/>
                    <em>Threat Level 2</em>
                    <ul>
                      <li>Mission 2.1</li>
                      <li>Mission 2.2</li>
                      <li>Mission 2.3</li>
                      <li>Homebase</li>
                    </ul>
                  </li>
                  <li>
                    Operation 3<br/>
                    <em>Threat Level 3</em>
                    <ul>
                      <li>Mission 3.1</li>
                      <li>Mission 3.2</li>
                      <li>Mission 3.3</li>
                      <li>Homebase</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="section">
                <h3>Operations</h3>
                An Operation represents a critical deployment arc within the larger Campaign structure, and is composed of three sequential Missions.
                When the Operation begins, your Squad is considered in the field. While deployed in the field, the Squad cannot change its Units or Gear selections, and any Mission Points (MP) earned during these missions cannot be spent on new Units or Gear.<br/>
                Once the third Mission of an Operation is complete, your Squad returns to Homebase to heal Injuries, make new Gear selections, and recruit new Units by spending their hard-earned MP.
                
                <h4>Enemy Faction and Threat Level</h4>
                The Threat Level to use when building NPC Squads should be the same as the Operation number (i.e. TL1 for Missions in Operation 1, TL2 for Operation 2, TL3 for Operation 3).
                For simplicity, we also recommend using the same faction for all Missions in a given Operation but you may choose to change factions for each Mission.

                <h4>Homebase</h4>
                At the end of each Operation, after the third Mission, your Squad returns to Homebase to heal injuries, resupply, and utilize accrued resources.
                <ol>
                  <li>Remove all Deceased Units from your Squad.</li>
                  <li>Remove one Injury from remaining Units.</li>
                  <li>Recruit new Units into the Squad (to maximum 100 GP).</li>
                  <li>Make changes to your Squad's selected Gear and Spoils Of War.</li>
                </ol>
              </div>
            </div>
            <div className="section twocols">
              <div className="section">
                <h3>Injuries</h3>
                <p>
                  At the end of each Mission, each of your Units that was Taken Out during the mission may have a persistent injury.
                  Note that when playing a campaign, all Injuries (except Deceased) are removed from your Units when they return to Homebase at the end of each Operation.
                </p>
                <p>
                  At the end of each Mission, for each Player Unit that was Taken Out, roll <code>1D6</code> to determine the Injury this Unit received.<br/>
                  If the Injury is one that the Unit already had, that Unit is Deceased. Remove the Unit from the Squad. That Unit cannot be replaced until the Squad returns to Homebase at the end of the Operation.
                </p>
                <ul>
                  {/* Injuries List */}
                  {
                    injuries?.gears.map((injury) => (
                      <li key={`inj_${injury.gearId}`}>
                        <h6>{injury.gearName}</h6>
                        <Markdown>{injury.description}</Markdown>
                      </li>
                    ))
                  }
                </ul>
              </div>

              <div className="section">
                <h3>Spoils Of War</h3>
                When the Squad returns to Homebase, it can purchase Spoils of War by spending MP earned during the previous Operation.
                Each Spoil of War costs 6 MP and applies to one specific Player Unit.
                <ul>
                  {/* Spoils Of War List */}
                  {
                    spoilsOfWar?.gears.map((sow) => (
                      <li key={`sow_${sow.gearId}`}>
                        <h6>{sow.gearName}</h6>
                        <Markdown>{sow.description}</Markdown>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>
          
          <PageBreak />
          <div>
            {pveSquads.map((squad, idx) => (
              <Fragment key={squad.squadId}>
                {idx > 0 && 
                  <PageBreak />
                }
                <div>
                  <h3 className="text-main font-semibold">{squad.squadName}</h3>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {squad.spawnTable && (
                      <div className="bg-card border border-main p-1 rounded relative flex flex-col h-full unitcard">
                        <h4>Spawn Table - {squad.squadName}</h4>
                        <Markdown>{squad.spawnTable}</Markdown>
                      </div>
                    )}
                    {squad.units?.map((unit) => (
                      <UnitCard
                        key={unit.unitId}
                        seq={unit.seq}
                        unit={unit.toPlain()}
                        isOwner={false}
                        allSpecials={allSpecials.map((spec) => spec.toPlain())}
                      />
                    ))}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
