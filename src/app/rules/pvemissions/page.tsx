import BattlefieldDiagram, { type BattlefieldDiagramConfig } from '@/components/shared/BattlefieldDiagram'
import Markdown from '@/components/ui/Markdown'
import PageBreak from '@/components/ui/PageBreak'
import { GAME } from '@/lib/config/game_config'
import missions_pve from '@/src/data/missions_pve'

import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { GearCategoryService, SpecialService, UserService } from '@/services'
import UnitCard from '@/components/unit/UnitCard'
import MissionCard from '@/components/shared/MissionCard'

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
  
  const objectiveDiagram = {
    board: { widthIn: 24, heightIn: 24 },
    elements: [
      { type: 'marker', id: 'NW', xIn: 6, yIn: 6, label: 'NW', showInLegend: false },
      { type: 'marker', id: 'N', xIn: 12, yIn: 6, label: 'N', showInLegend: false },
      { type: 'marker', id: 'NE', xIn: 18, yIn: 6, label: 'NE', showInLegend: false },
      { type: 'marker', id: 'W', xIn: 6, yIn: 12, label: 'W', showInLegend: false },
      { type: 'marker', id: 'C', xIn: 12, yIn: 12, label: 'C', showInLegend: false },
      { type: 'marker', id: 'E', xIn: 18, yIn: 12, label: 'E', showInLegend: false },
      { type: 'marker', id: 'SW', xIn: 6, yIn: 18, label: 'SW', showInLegend: false },
      { type: 'marker', id: 'S', xIn: 12, yIn: 18, label: 'S', showInLegend: false },
      { type: 'marker', id: 'SE', xIn: 18, yIn: 18, label: 'SE', showInLegend: false },

      { type: 'callout', id: 'h1', x1In: 0, y1In: 6, x2In: 6, y2In: 6, text: '6"' },
      { type: 'callout', id: 'h2', x1In: 0, y1In: 12, x2In: 6, y2In: 12, text: '6"' },
      { type: 'callout', id: 'h3', x1In: 0, y1In: 18, x2In: 6, y2In: 18, text: '6"' },
      { type: 'callout', id: 'v1', x1In: 6, y1In: 0, x2In: 6, y2In: 6, text: '6"' },
      { type: 'callout', id: 'v2', x1In: 6, y1In: 18, x2In: 6, y2In: 24, text: '6"' },

      { type: 'callout', id: 'h4', x1In: 18, y1In: 6, x2In: 24, y2In: 6, text: '6"' },
      { type: 'callout', id: 'h5', x1In: 18, y1In: 12, x2In: 24, y2In: 12, text: '6"' },
      { type: 'callout', id: 'h6', x1In: 18, y1In: 18, x2In: 24, y2In: 18, text: '6"' },
      { type: 'callout', id: 'v3', x1In: 18, y1In: 0, x2In: 18, y2In: 6, text: '6"' },
      { type: 'callout', id: 'v4', x1In: 18, y1In: 18, x2In: 18, y2In: 24, text: '6"' },

      { type: 'rect', id: 'PD', xIn: 0, yIn: 0, wIn: 24, hIn: 2, label: 'NPC Squad Deployment', showInLegend: false },
      { type: 'rect', id: 'ND', xIn: 0, yIn: 22, wIn: 24, hIn: 2, label: 'Player Squad Deployment', showInLegend: false }
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
            <h2>The Game Cycle</h2>
            <div className="twocols">
              <div className="section">
                <ol className="border border-main rounded-md m-2 mx-4 xl:mx-24">
                  <li>Roll Objectives</li>
                  <li>Select Threat Level and NPC Faction</li>
                  <li>Set up battlefield</li>
                  <li>Deploy NPC Squad</li>
                  <li>Deploy Player Squad</li>
                  <li>Play Mission</li>
                  <li>Extract and resolve consequences</li>
                </ol>

                <strong>Roll Objectives</strong>
                <p className="ml-4">
                  Roll <code>1D6</code> (re-roll duplicates) and consult the <strong>Objectives</strong> below. 
                  These two results will be the objectives for the mission.
                </p>

                <strong>Select Threat Level and NPC Faction</strong>
                <p className="ml-4">
                  Select the enemy faction for the NPC Squad, and select a Threat Level (1-3).
                  If playing a Campaign, the Threat Level should be the same as the Operation number.<br/>
                  Roll <code>3D6</code> to identify the NPC Units to deploy for this Mission (see <strong>NPC Units</strong> below).
                </p>

                <strong>Set up Battlefield</strong>
                <p className="ml-4">
                  Set up the battlefield according to the rolled objectives and deploy the NPC Squad.
                </p>

                <strong>Deploy the NPC Squad</strong>
                <p className="ml-4">
                  Deploy all NPC Units on the Northern edge of the battlefield.
                </p>

                <strong>Deploy the Player Squad</strong>
                <p className="ml-4">
                  Deploy all Player Units on the Southern edge of the battlefield.
                </p>
              </div>
              <div className="section">
                <strong>Play the Mission</strong>
                <div>
                  Turn Sequence:
                  <ol>
                    <li>Roll Tactical Orders (TO)</li>
                    <li>
                      Turn Event<br/>
                      For Turns 1-4 of the Mission, roll on the <strong>Turn Events</strong> table.<br/>
                      For Turns 5+ of the Mission, the Turn Event is always <strong>Enemy Reinforcements</strong>.
                    </li>
                    <li>
                      Activations
                      <ul>
                        <li>Player Squad always has initiative</li>
                        <li>Activate one Player Unit</li>
                        <li>
                          Activate one NPC Unit. Follow that Unit's <strong>Behavior</strong> skill.<br/>
                        </li>
                        <li>Repeat until all Units have activated</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
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
          <div className="section">
            <div className="section twocols">
              <div className="section">
                <h2>Objectives</h2>
                <div>
                  <strong>1: Battlefield Control</strong>
                  <div className="ml-4">
                    <strong>Victory:</strong> At the end of Turn 4, all four corner Anchors (NW, NE, SW, SE) are controlled by Player Units.
                  </div>
                </div>
                <div>
                  <strong>2: Destroy Nexus</strong>
                  <div className="ml-4">
                    <strong>Setup:</strong> Place a Nexus marker on 3 random Anchors.<br/>
                    <strong>Special:</strong> Nexus Markers are items with <code>ARM 3</code> and <code>HIT 2</code> and can be targeted in combat.<br/>
                    <strong>Victory:</strong> All Nexus Markers are Taken Out.
                  </div>
                </div>
                <div>
                  <strong>3: No Survivors</strong>
                  <div className="ml-4">
                    <strong>Victory:</strong> All enemy Units Taken Out.
                  </div>
                </div>
                <div>
                  <strong>4: Protect The Asset</strong>
                  <div className="ml-4">
                    <strong>Setup:</strong> Place an Asset marker as close as possible to the Center of the battlefield. Assets are Items with <code>ARM 3 HIT 3</code> and can be targeted in Combat.<br/>
                    <strong>Special:</strong> NPC Units always prioritize targeting the Asset instead of Player Units.<br/>
                    <strong>Victory:</strong> The Asset still has at least 1 <code>HIT</code> at the end of Turn 4.
                  </div>
                </div>
                <div>
                  <strong>5: Disruption Field</strong>
                  <div className="ml-4">
                    <strong>Setup:</strong> Place a Disruptor Pylon on 3 random Anchors.<br/>
                    <strong>Mission Action - Calibrate Pylon (2ACT):</strong> A Unit that Controls a Disruptor Pylon calibrates it. Remove that Pylon from the battlefield.<br/>
                    <strong>Victory:</strong> All 3 Disruptor Pylons have been calibrated.
                  </div>
                </div>
                <div>
                  <strong>6: The Artifact</strong>
                  <div className="ml-4">
                    <strong>Setup:</strong> Place 3 Search Markers on 3 random Anchors.<br/>
                    <strong>Mission Action - Search (2ACT):</strong> A Unit that Controls a Search Marker searches it. Roll <code>1D6</code>: On a 1 or 2, the Artifact is found. This roll cannot be modified or re-rolled using TO.<br/>
                    <strong>Victory:</strong> The Artifact is found.
                  </div>
                </div>
                <div className="center">
                  <h4>Anchors</h4>
                  <p>
                    Some Objectives and Events include placing markers or tokens on "Anchors".
                    Anchors are simply evenly-spaced spots (6" apart) on the battlefield as illustrated below.<br/>
                    When placing a marker on a random Anchor, roll <code>1D10</code> and use the diagram. On a <code>10</code>, select one anchor of your choice.<br/>
                    If an Objective instructs you to place a marker on an Anchor that is already occupied, re-roll that placement.
                  </p>
                  <BattlefieldDiagram diagram={objectiveDiagram} className="max-w-md" />
                </div>
              </div>
              <div className="section">
                <h2>Turn Events</h2>
                <p>
                  At the start of each Turn, roll <code>1D6</code> to determine a special event for the Turn.
                  If the Mission is in Turn 5 or later, do not roll Turn Events and apply the <strong>Enemy Reinforcements</strong> event instead.
                </p>
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
                  <div className="ml-4">Roll <code>1D6</code> and Spawn NPC Units Adjacent to a random Anchor according to the current Threat Level.</div>
                </div>
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
          <div className="section">
            <h2>NPC Units</h2>
            {!pveSquads.length && (
              <p className="text-sm text-muted">No NPC squads found for user <strong>pve</strong>.</p>
            )}
            {pveSquads.map((squad) => (
              <div key={squad.squadId} className="section">
                <h3 className="text-main font-semibold">{squad.squadName}</h3>
                <h4>Spawn Table</h4>
                {squad.spawnTable && (
                  <div className="mb-3">
                    <Markdown>{squad.spawnTable}</Markdown>
                  </div>
                )}
                <h4>Units</h4>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
            ))}
          </div>
        </div>
        <div className='twocols'>
          {
            missions_pve.filter((mission) => mission.active).map((mission) => (
              <div className="section" key={mission.missionId}>
                <MissionCard mission={mission} showDescription={true} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
