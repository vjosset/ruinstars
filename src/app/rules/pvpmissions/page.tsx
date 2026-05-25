import { PDFLink } from '@/components/nav/Links'
import Markdown from '@/components/ui/Markdown'
import { MissionDeployments } from '@/data/mission_deployments'
import { MissionObjectives } from '@/data/mission_objectives'
import { MissionBattlefields } from '@/data/mission_battlefields'
import { GAME } from '@/lib/config/game_config'

import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { GearCategoryService } from '@/services'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'PvP Missions',
    description: `The full list of PvP missions and campaign rules for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{ url: '/icons/icon-big.png', width: 512, height: 512 }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules/pvpmissions'
  })
}

export default async function PvPMissions() {
  const injuries = await GearCategoryService.getGearCategory('INJ')
  const spoilsOfWar = await GearCategoryService.getGearCategory('SOW')
  const versionTimestamp = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date()).replaceAll('-', '')
  
  return (
    <>
      {/* Cover */}
      <img src="/img/rules/BookCover_Framed.webp" className="printonly fullpage overflow-y-hidden" style={{pageBreakAfter: 'always'}} loading="eager" decoding="async" />
      <div className="printonly absolute left-1/2 top-1/4 -translate-x-1/2">
        <div className="text-center text-white font-title text-2xl tracking-wide bg-black/70 px-6 py-3 rounded-lg shadow-lg">
          <h1>PvP Missions</h1>
          <p className="text-md">
            2nd Edition <span className="text-sm">v{versionTimestamp}</span>
          </p>
        </div>
      </div>

      <div className="rules px-3 max-w-7xl mx-auto">
        <div className="section">
          <h1 className="text-center pt-48 mb-12 font-title"   id="allsquadTypes" style={{position: 'relative', top: '50%' }}>
            PvP Missions
          </h1>

          <div className="section">
            <h3>Tactical Engagements Across a Galaxy in Ruins</h3>
            <div className="twocols">
              <div className="section flavor">
                <p className="mb-4">
                  “We once believed war would end when the stars themselves dimmed. We were wrong.
                  The stars are gone, and still we fight over scraps of metal, over relics of dead gods, over the idea that any of this still matters.
                </p>
                <p className="mb-4">
                  Every mission you read in this record was real once. Squads bled for these orders.
                  Some triumphed and carved their marks into the ruins; others vanished beneath the dust of worlds that no longer have names.
                </p>
                <p className="mb-4">
                  If you are holding this field manual, you are part of what remains. Learn these operations well.
                  Out there, knowing which ruin to hold (or which to burn) means the difference between survival and extinction.”
                </p>
                <strong className="mb-4">Excerpt from the Warfront Archives, Cycle 2279.6</strong>
              </div>
              <div className="section">
                <p className="mb-4">
                  Across the shattered frontier of the galaxy, war is constant. Squads of elite operatives clash in the ruins of cities, alien jungles, desecrated temples, and endless wastelands, each battle a fleeting spark in the dark expanse of the Ruinstars.
                  These are not grand crusades of empire, but desperate struggles fought by the few who dare to step onto the battlefield when hope has long since burned away.
                </p>
                <p className="mb-4">
                  This section collects the missions and battlefields that define warfare in the Ruinstars setting.
                  Within these pages, commanders will find everything they need to wage battle, from quick-play engagements and solo challenges to full three-part operations and sprawling, multi-stage campaigns.
                  Every victory and defeat shapes the next confrontation; every decision carries the weight of survival.
                </p>
                <p className="mb-4">
                  Each mission offers unique tactical puzzles and narrative flavor, challenging you to adapt your strategy to shifting objectives and hostile environments.
                  Whether you fight for the glory of the Human Hegemony, the hunger of the Swarm, or the whispers of the Silent Choir, every operation offers a chance to carve your name into the scars of the galaxy.
                </p>
                <p>
                  Note you will need the <PDFLink href="/assets/books/Core Rules - Ruinstars.pdf" title='Core Rules' /> to play this mode.
                </p>
              </div>
            </div>
          </div>

          <h2 className="mt-4">Playing a Mission</h2>
          <div className="section twocols">
            <div className="section">
              <p>
                These missions are designed to be played as quick, one-off skirmishes perfect for pick-up or competitive play.
                <br/>
                Each Mission is a single battle between two Squads, typically lasting 4 Turns. Victory in these engagements is decided by calculating the total Mission Points (MP) scored by each Squad at the end of Turn 4.
                <br/>
                Alternatively, you can use these missions to build your own <a className="underline" href="#campaigns">Campaign</a>.
                A full Campaign is structured into three distinct Operations, and each Operation is composed of three Missions, totaling nine confrontations.
                These missions offer unique tactical puzzles and narrative flavor, challenging you to adapt your strategy to shifting objectives and hostile environments.
              </p>
              <br/><br/>
              <p>
                Whether you are playing a quick one-off mission or a long, epic <a className="underline" href="#campaigns">campaign</a>, the rules for playing each Mission are the same:
              </p>
              <ol>
                <li>Select a Battlefield</li>
                <li>Each Squad secretly rolls their Objective (1D6 Archetype + 1D6 Variation)</li>
                <li>Reveal Objectives simultaneously</li>
                <li>Set up your Squads (place markers per each Squad's Objective)</li>
                <li>Roll a random Deployment</li>
                <li>Play!</li>
              </ol>
            </div>
            
            {/* Battlefields */}
            <div className="section">
              <h3>Battlefields (D6)</h3>
              {MissionBattlefields.map((b) => (
                <div key={b.battlefieldId}>
                  <strong>{b.battlefieldId}: {b.title}</strong>
                  <div className="ml-4">
                    <strong>{b.effectName}</strong>
                    <Markdown>{b.effect}</Markdown>
                  </div>
                </div>
              ))}
            </div>
            {/* Deployments */}
            <div className="section">
              <h3>Deployments</h3>
              Each mission is played on one of the following standard deployments.
              At the start of each mission, before objectives are revealed, roll 1D6 to select a deployment.
              Each deployment defines two positions: <em>Squad A</em> and <em>Squad B</em>.
              Both players roll off; the winner chooses which squad they are.<br/>
              When a mission instructs both Squads to deploy at the same time (e.g. "before Turn 1"), players alternate placing one Unit at a time.
              The player without Turn 1 initiative deploys their first Unit, then the player with initiative deploys one Unit, and so on until all Units are deployed.
              The player with initiative activates first in Turn 1.
              {MissionDeployments.map((d) => (
                <div key={d.deploymentId}>
                  <strong>{d.deploymentId}: {d.title}</strong>
                  <div className="ml-4">{d.description}</div>
                </div>
              ))}
            </div>

            <div className="section">
              <h3>Objectives (2D6)</h3>
              <p className="mb-4">
                At mission start, each Squad secretly rolls their Objective using 2D6: roll 1D6 for the <strong>Archetype</strong>, then 1D6 for the <strong>Variation</strong>.
                Both Squads reveal their Objectives simultaneously. Each Squad pursues their own Objective independently.
              </p>
              <div className="twocols">
                {MissionObjectives.map((archetype) => (
                  <div key={archetype.objectiveArchetypeId}>
                    <h4>{archetype.objectiveArchetypeId}: {archetype.title}</h4>
                    <div className="ml-4">
                      {archetype.variations.map((v) => {
                        const rollRange = v.objectiveId.split(' ').slice(1).join(' ')
                        return (
                          <div key={v.objectiveId} className="mb-2">
                            <strong>{rollRange}: {v.title}</strong>
                            <div className="ml-4">
                              {v.setup && <Markdown>{`**Setup:** ${v.setup}`}</Markdown>}
                              {v.special && <Markdown>{`**Special:** ${v.special}`}</Markdown>}
                              {v.victory && <Markdown>{`**Victory:** ${v.victory}`}</Markdown>}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="section" id="campaigns">
          <h2>Campaigns</h2>
          <div className="twocols">
            <div className="section">
              <h3>Campaign Structure</h3>
              <p className="mb-4">
                A Campaign is composed of three Operations, each composed of three Missions.
                At the end of each Operation, both Squads return to Homebase to heal injuries and spend their earned Spoils of War.
              </p>
              <ol>
                <li>Operation 1 - Missions 1.1, 1.2, 1.3 - Homebase</li>
                <li>Operation 2 - Missions 2.1, 2.2, 2.3 - Homebase</li>
                <li>Operation 3 - Missions 3.1, 3.2, 3.3 - Homebase</li>
              </ol>
            </div>
            <div className="section">
              <h3>Operations</h3>
              <p className="mb-4">
                An Operation is three sequential Missions. When the Operation begins, both Squads are considered in the field.
                While deployed in the field, Squads cannot change their Units or Gear between Missions, and any Mission Points (MP) earned during these Missions cannot be spent on new Units or Gear.<br/>
                Once the third Mission of an Operation is complete, both Squads return to Homebase to heal Injuries, make new Gear selections, and recruit new Units by spending their hard-earned MP.
              </p>
            </div>
            <div className="section">
              <h3>Mission Scoring</h3>
              <p className="mb-4">
                At the end of each Mission, both Squads score MP as follows:
                <ul>
                  <li><strong>+2 MP</strong> for completing the mission (both Squads)</li>
                  <li><strong>+2 MP</strong> if your Squad achieved your Objective's Victory condition</li>
                  <li><strong>+2 MP</strong> if all enemy Units were Taken Out</li>
                </ul>

                If both Squads have all their Units Taken Out at the end of the Mission, both Squads score the +2 MP bonus.
                Each Squad's Objective is evaluated independently: it is possible for both, one, or neither Squad to score the Objective MP.
              </p>
            </div>
            <div className="section">
              <h3>Between Missions</h3>
              <p className="mb-4">
                After completing a Mission but before beginning the next one in the same Operation, each Squad may remove one Injury from any one of its Units (not one per Unit,  one total across the Squad).
                Deceased is not an Injury and cannot be removed this way; a Deceased Unit remains out of action and cannot be replaced until the Squad returns to Homebase.
              </p>
            </div>
            <div className="section">
              <h3>Homebase</h3>
              <p className="mb-4">
                At the end of each Operation, after the third Mission, both Squads return to Homebase simultaneously.
              </p>
              <ol>
                <li>Remove all Deceased Units from your Squad.</li>
                <li>Remove one Injury from each remaining Unit.</li>
                <li>Recruit new Units into the Squad (maximum 100 GP).</li>
                <li>Make changes to your Squad's selected Gear.</li>
                <li>Assign all earned Spoils of War to Units in your Squad.</li>
              </ol>
            </div>
            <div className="section">
              <h3>Spoils of War</h3>
              <p className="mb-4">
                When the Squad returns to Homebase, it can purchase Spoils of War by spending MP earned during the previous Operations.
                Each Spoil of War costs 3 MP and applies to one specific Unit.
              </p>
            </div>
            <div className="section">
              <h3>Injuries</h3>
              <p>
                At the end of each Mission, each of your Units that was Taken Out during the mission may have a persistent injury.
                Note that when playing a campaign, one Injury may be removed from each Unit (except Deceased) when they return to Homebase at the end of each Operation.
              </p>
              <p>
                At the end of each Mission, for each Player Unit that was Taken Out, roll <code>1D6</code> to determine the Injury this Unit received.<br/>
                If the Injury is one that the Unit already had, that Unit is Deceased. Remove the Unit from the Squad. That Unit cannot be replaced until the Squad returns to Homebase at the end of the Operation.
              </p>
            </div>
          </div>
          <div className="twocols section">
            <h3>Injuries List</h3>
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

            <h3>Spoils Of War List</h3>
            When the Squad returns to Homebase, it can purchase Spoils of War by spending its earned MP in previous Missions.
            Each Spoil of War costs <strong>3MP</strong> and applies to one Unit.
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
    </>
  )
}
