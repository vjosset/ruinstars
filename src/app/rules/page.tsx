import ops from '@/data/scriptedOperations.json'
import { GAME } from '@/lib/config/game_config'
import RulesActions from './rules-actions'
import RulesCampaigns from './rules-campaigns'
import RulesCombat from './rules-combat'
import RulesCoreMechanics from './rules-coremechanics'
import RulesGameCycle from './rules-gamecycle'
import RulesGlossary from './rules-glossary'
import RulesHeader from './rules-header'
import RulesIntro from './rules-intro'
import RulesItems from './rules-items'
import RulesMissions from './rules-missions'
import RulesMovement from './rules-movement'
import RulesSquadTypes from './rules-squadtypes'
import RulesStatCards from './rules-statcards'
import RulesToc from './rules-toc'
import RulesYourSquad from './rules-yoursquad'

import ScriptedOperationsList from '@/components/shared/ScriptedOperationsList'
import PageBreak from '@/components/ui/PageBreak'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { FactionService } from '@/services'
import Link from 'next/link'
import { ScriptedOperation } from '../scriptedoperations/page'
import RulesAI from './rules-ai'
import RulesOutro from './rules-outro'
import RulesPlayingOnAGrid from './rules-playingonagrid'
import RulesQuickRef from './rules-quickref'
import RulesScriptedOperations from './rules-scriptedoperations'

export const revalidate = 86400

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Rules',
    description: `The complete rules for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{
      url: '/icons/icon-big.png',
    }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules'
  })
}

export default async function Rules({ searchParams }: { searchParams?: Promise<{ print?: string }> }) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const operations = ops
  const factions = await FactionService.getAllFactions()
  const versionTimestamp = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date()).replaceAll('-', '')
  const showPrintSections = resolvedSearchParams?.print === '1'
  
  return (
    <>
      {showPrintSections && (
        <>
          {/* Cover */}
          <img src="/img/rules/BookCover_Framed.webp" className="printonly fullpage overflow-y-hidden" style={{pageBreakAfter: 'always'}} />
          <div className="printonly absolute left-1/2 top-1/4 -translate-x-1/2">
            <div className="text-white font-title text-2xl tracking-wide bg-black/70 px-6 py-3 rounded-lg shadow-lg">
              Version {versionTimestamp}
            </div>
          </div>
        </>
      )}

      <div className="rules px-3 max-w-7xl mx-auto">
        <RulesHeader />

        <div className="text-center text-muted max-w-lg mx-auto noprint mt-4">
          Download the Rules:
          { ' ' }
          <Link className="underline" target="_blank" href="/assets/Ruinstars_Rules.pdf">Easy Print PDF</Link>
          { ' / ' }
          <Link className="underline" target="_blank" href="/assets/Ruinstars_Rules_FullColor.pdf">Full Color PDF</Link>
        </div>
        <div className="text-center text-muted max-w-lg mx-auto noprint mt-4">
          Print the Tokens:
          { ' ' }
          <Link className="underline" target="_blank" href="/assets/Ruinstars_Tokens.pdf">Tokens PDF</Link>
        </div>

        <RulesToc />
        <RulesIntro showTitle={true} num={1} />

        <RulesAI />
        <hr />

        <RulesCoreMechanics num={2} />
        <hr />

        <RulesGameCycle num={3} />
        <hr />

        <RulesStatCards num={4} />
        <hr />

        <RulesActions num={5} />
        <hr />

        <RulesMovement num={6} />
        <hr />

        <RulesCombat num={7} />
        <hr />
      
        <RulesItems num={8} />
        <hr />

        <RulesYourSquad num={9} />
        <hr />

        <RulesMissions num={10} />
        <hr />

        <RulesCampaigns num={11} />
        <hr />

        <RulesScriptedOperations num={12} />
        <hr />
      
        <RulesGlossary num={13} />
        <hr />
      
        <RulesPlayingOnAGrid num={14} />
        <hr />
      
        <RulesQuickRef num={15} />
      
        {showPrintSections && (
          <>
            <div className="printonly">
              <hr />

              {/* Full SquadTypes for printed book */}
              <RulesSquadTypes />
              <hr />
              
              {/* Full ScriptedOps for printed book */}
              <h1 className="text-center pt-48 mb-10 font-title"   id="allscriptedoperations" style={{position: 'relative', top: '50%' }}>
                Scripted Operations
              </h1>
              <div className="twocols">
                <div className="mb-8 text-muted">
                  <p className="mb-4">
                    War rages across the stars. Squads clash in ruined cities, cursed temples, alien jungles, and forgotten fortresses.
                    Yet not every battle is random. Some are part of carefully planned operations, chains of missions where each outcome shapes the next, where victory builds momentum, and defeat forces desperate gambits.
                  </p>
                  <p className="mb-4">
                    This section collects a series of tailor-made mini-campaigns for Ruinstars, each designed around specific factions and their rivalries.<br/>
                  </p>
                  <p className="hidden">
                    These operations offer:
                  </p>
                  <ul className="hidden">
                    <li>Narrative arcs that tell a story through connected missions.</li>
                    <li>Branching paths where success or failure leads to different challenges.</li>
                    <li>Unique mechanics that go beyond simple control points: moving convoys, tug-of-war captives, collapsing strongpoints, dark rituals, and leader duels.</li>
                    <li>Faction flavor that highlights the tactics, goals, and themes of each force.</li>
                  </ul>
                  <p className="mb-4">
                    Whether you're playing a quick three-mission arc or stringing multiple operations into a larger campaign, these scenarios bring new life and variety to your battles.<br/>
                    Use them as written, adapt them to your campaign, or draw inspiration to create your own.
                  </p>
                </div>
                <div>
                  <h4 className="font-title text-main">From the Archives of the Warfront</h4>
                  <div className="flavor mb-4">
                    “Records tell us that history turns not on grand crusades, but on knife fights in forgotten ruins. A convoy lost. A leader enthralled. A shrine defiled.
                    These are the sparks that ignite empires, the stains that never wash clean. Each squad is a thread in the weave of destiny, each skirmish a test of survival.
                    Do not mistake these operations for small affairs; they are the crucibles where factions rise or die.”
                    <br/><br/>
                    - Fragment of intercepted broadcast, author unknown
                  </div>
                </div>
              </div>
              <ScriptedOperationsList operations={operations} factions={factions} />

              <PageBreak />
              <div className="printonly p-6">
                {operations.sort((a, b) => a.title.localeCompare(b.title)).map((op, idx) => {
                  const isLast = idx === operations.length - 1
                  return (
                    <div className="m-6 p-6" key={op.slug} style={{ pageBreakAfter: isLast ? 'auto' : 'always' }}>
                      <ScriptedOperation op={op} factions={factions} />
                    </div>
                  )
                })}
              </div>
            </div>

            <RulesOutro />
          </>
        )}
      
      </div>
    </>
  )
}
