import ops from '@/data/scriptedOperations.json'
import { GAME } from '@/lib/config/game_config'
import RulesCampaigns from '../../rules/rules-campaigns'
import RulesHeader from '../../rules/rules-header'
import RulesMissions from '../../rules/rules-missions'
import { ScriptedOperation } from '../../scriptedoperations/page'

import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { FactionService } from '@/services'
import PageBreak from '../PageBreak'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Missions',
    description: `Missions, campaigns, and Scripted Operations for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{
      url: '/icons/icon-big.png',
    }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules'
  })
}

export default async function MissionsBook() {
  const versionTimestamp = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date()).replaceAll('-', '')
  
  const factions = await FactionService.getAllFactions()
  
  return (
    <>
      {/* Cover */}
      <img src="/img/rules/BookCover_Framed.webp" className="printonly fullpage overflow-y-hidden" style={{pageBreakAfter: 'always'}} />
      <div className="printonly absolute left-1/2 top-1/4 -translate-x-1/2">
        <div className="text-white font-title text-2xl tracking-wide bg-black/70 px-6 py-3 rounded-lg shadow-lg text-center">
          Missions<br/>
          Version {versionTimestamp}
        </div>
      </div>

      <div className="rules px-3 max-w-7xl mx-auto">
        <RulesHeader />

        <RulesMissions />

        <RulesCampaigns />

        <div className="section">
          <h1 className="text-center pt-48 mb-24 font-title"   id="allscriptedoperations" style={{position: 'relative', top: '50%' }}>
            Scripted Operations
          </h1>
          <div className="mb-8 text-muted">
            <p className="mb-4">
              War rages across the stars. Squads clash in ruined cities, cursed temples, alien jungles, and forgotten fortresses.
              Yet not every battle is random. Some are part of carefully planned operations, chains of missions where each outcome shapes the next, where victory builds momentum, and defeat forces desperate gambits.
            </p>
            <p className="mb-4">
              This section collects a series of tailor-made mini-campaigns for Ruinstars, each designed around specific factions and their rivalries.<br/>
              These operations offer:
            </p>
            <ul>
              <li>Narrative arcs that tell a story through connected missions.</li>
              <li>Branching paths where success or failure leads to different challenges.</li>
              <li>Unique mechanics that go beyond simple control points: moving convoys, tug-of-war captives, collapsing strongpoints, dark rituals, and leader duels.</li>
              <li>Faction flavor that highlights the tactics, goals, and themes of each force.</li>
            </ul>

            <p className="mb-4">
              Whether you're playing a quick three-mission arc or stringing multiple operations into a larger campaign, these scenarios bring new life and variety to your battles.<br/>
              Use them as written, adapt them to your campaign, or draw inspiration to create your own.
            </p>
            <h4 className="font-title text-main">From the Archives of the Warfront</h4>
            <div className="flavor mb-4">
              “Records tell us that history turns not on grand crusades, but on knife fights in forgotten ruins. A convoy lost. A leader enthralled. A shrine defiled.
              These are the sparks that ignite empires, the stains that never wash clean. Each squad is a thread in the weave of destiny, each skirmish a test of survival.
              Do not mistake these operations for small affairs; they are the crucibles where factions rise or die.”
              <br/><br/>
              - Fragment of intercepted broadcast, author unknown
            </div>
          </div>
          {/* For print, list ALL operations in full detail */}
          <PageBreak />
          <div className="p-6">
            {ops.sort((a, b) => a.title.localeCompare(b.title)).map((op, idx) => {
              const isLast = idx === ops.length - 1
              return (
                <div className="m-6 p-6" key={op.slug} style={{ pageBreakAfter: isLast ? 'auto' : 'always' }}>
                  <ScriptedOperation op={op} factions={factions} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
