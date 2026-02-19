import MissionCard from '@/components/shared/MissionCard'
import missions_pvp from '@/data/missions_pvp'
import { GAME } from '@/lib/config/game_config'

import { generatePageMetadata } from '@/lib/utils/generateMetadata'

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
