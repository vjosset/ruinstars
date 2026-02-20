import MissionCard from '@/components/shared/MissionCard'
import Markdown from '@/components/ui/Markdown'
import missions_pvp from '@/data/missions_pvp'
import { GAME } from '@/lib/config/game_config'

import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { GearCategoryService } from '@/services'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'PvP Missions',
    description: `The full list of PvP missions for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{
      url: '/icons/icon-big.png',
    }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules/pvpmissions'
  })
}

export default async function PvPMissions({ searchParams }: { searchParams?: Promise<{ print?: string }> }) {
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
      <img src="/img/rules/BookCover_Framed.webp" className="printonly fullpage overflow-y-hidden" style={{pageBreakAfter: 'always'}} />
      <div className="printonly absolute left-1/2 top-1/4 -translate-x-1/2">
        <div className="text-center text-white font-title text-2xl tracking-wide bg-black/70 px-6 py-3 rounded-lg shadow-lg">
          <h1>PvP Missions</h1>
          Version {versionTimestamp}
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
                  This section collects the missions, battlefields, and scripted operations that define warfare in the Ruinstars setting.
                  Within these pages, commanders will find everything they need to wage battle, from quick-play engagements and solo challenges to full three-part operations and sprawling, multi-stage campaigns.
                  Every victory and defeat shapes the next confrontation; every decision carries the weight of survival.
                </p>
                <p className="mb-4">
                  Each mission offers unique tactical puzzles and narrative flavor, challenging you to adapt your strategy to shifting objectives and hostile environments.
                  Scripted Operations weave these battles into connected arcs: mini-campaigns that tell stories of ambition, corruption, and sacrifice.
                  Whether you fight for the glory of the Human Hegemony, the hunger of the Swarm, or the whispers of the Silent Choir, every operation offers a chance to carve your name into the scars of the galaxy.
                </p>
              </div>
            </div>
          </div>

          <h2 className="mt-4">Playing a Mission</h2>
          <div className="section twocols">
            <div className="section">
              <p>
                Your Squad is deployed for desperate struggles fought by the few who dare to step onto the battlefield when hope has long since burned away.
                These missions are designed to be played as quick, one-off skirmishes perfect for pick-up or competitive play.
                <br/>
                Each Mission is a single battle pitting your Squad against its enemies, generally lasting 4 Turns. Victory in these engagements is typically decided by calculating the total Mission Points (MP) scored by each Squad at the end of Turn 4.
                <br/>
                Alternatively, you can use these missions to build your own <a className="underline" href="#campaigns">Campaign</a>.
                A full Campaign is structured into three distinct Operations, and each Operation is composed of three Missions, totaling nine confrontations.
                In Campaign play, the winning Squad selects one of the Mission rewards to apply to their Squad, while the losing Squad gains the remaining reward.
                These missions offer unique tactical puzzles and narrative flavor, challenging you to adapt your strategy to shifting objectives and hostile environments.
              </p>
              <br/><br/>
            </div>
            <div className="section">
              <p>
                Whether you are playing a quick one-off mission or a long, epic <a className="underline" href="#campaigns">campaign</a>, the rules for playing each Mission are the same:
              </p>
              
              <ol>
                <li>Select a Mission</li>
                {/* <li>(Optional) Select a Secondary Mission</li>*/}
                <li>Select a Battlefield</li>
                <li>Set up your Squads</li>
                <li>Play!</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="section" id="campaigns">
          <h2>Campaigns</h2>
          <div className="twocols">
            <div className="section">
              <p className="mb-4">
                Two squads. Nine missions. One climax. Whatever happened before the final battle is prologue.
              </p>
              <p className="mb-4">
                A PvP Campaign tracks the consequences of every fight across three Operations. Units get stronger. Units get hurt. Units die. What you arrive at the climax with depends on how well you fought to get there — but the climax decides everything.
              </p>

              <h3>Campaign Structure</h3>
              <p className="mb-4">
                A Campaign is composed of three Operations, each composed of three Missions, followed by a Climax that determines the winner. At the end of each Operation, both Squads return to Homebase to heal injuries and spend their earned Spoils of War.
              </p>
              <ol>
                <li>Operation 1 — Missions 1.1, 1.2, 1.3 — Homebase</li>
                <li>Operation 2 — Missions 2.1, 2.2, 2.3 — Homebase</li>
                <li>Operation 3 — Missions 3.1, 3.2, 3.3 — Homebase</li>
                <li>Climax Mission</li>
              </ol>

              <h3>Operations</h3>
              <p className="mb-4">
                An Operation is three sequential Missions. Once an Operation begins, Squads cannot change their Units or Gear between Missions. Missions may be agreed upon or rolled randomly from the PvP Mission pool.
              </p>
              <p className="mb-4">
                The Squad that won more Missions wins the Operation.
              </p>

              <h3>Campaign Rewards</h3>
              <p className="mb-4">
                Each Mission lists two Campaign Rewards. After each Mission, the winning Squad picks one reward first. The losing Squad receives the other. Both rewards apply immediately and last until the end of the next Mission, unless stated otherwise.
              </p>
            </div>

            <div className="section">
              <h3>Spoils of War</h3>
              <p className="mb-4">
                At the end of each Operation, both Squads receive Spoils of War based on the Operation result. Each Spoil of War is assigned permanently to one specific Unit.
              </p>
              <ul>
                <li>3-0 sweep: winning Squad receives 3 Spoils of War, losing Squad receives none.</li>
                <li>2-1 result: winning Squad receives 2 Spoils of War, losing Squad receives 1.</li>
              </ul>

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

              <h3>The Climax</h3>
              <p className="mb-4">
                After the third Homebase, both Squads play one final Mission drawn from the Climax Mission pool. The winner of the Climax Mission wins the Campaign.
              </p>
              <p className="mb-4">
                The Squad that won the most Operations selects which Climax Mission is played and receives the following advantages: they choose their Deployment Zone first and gain +1 TO at the start of the mission. If both Squads won the same number of Operations, the Climax Mission is selected randomly and neither advantage applies.
              </p>
              <p>
                No Campaign Rewards are earned from the Climax. No Injuries are rolled after it. The Climax is the end.
              </p>
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
        
        <div className="section">
          <div className="section">
            <h3 className="text-center">Mission List</h3>
            <div className='twocols'>
              {
                missions_pvp.filter((mission) => mission.active && (!mission.missionType || mission.missionType === 'Primary')).map((mission) => (
                  <div className="section" key={mission.missionId}>
                    <MissionCard mission={mission} showDescription={true} />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
