import ops from '@/data/scriptedOperations.json'
import { GAME } from '@/lib/config/game_config'
import RulesActions from '../sections/rules-actions'
import RulesCampaigns from '../sections/rules-campaigns'
import RulesCombat from '../sections/rules-combat'
import RulesCoreMechanics from '../sections/rules-coremechanics'
import RulesGameCycle from '../sections/rules-gamecycle'
import RulesGlossary from '../sections/rules-glossary'
import RulesHeader from '../sections/rules-header'
import RulesIntro from '../sections/rules-intro'
import RulesItems from '../sections/rules-items'
import RulesMissions from '../sections/rules-missions'
import RulesMovement from '../sections/rules-movement'
import RulesSquadTypes from '../sections/rules-squadtypes'
import RulesStatCards from '../sections/rules-statcards'
import RulesToc from '../sections/rules-toc'
import RulesYourSquad from '../sections/rules-yoursquad'

import ScriptedOperationsList from '@/components/shared/ScriptedOperationsList'
import PageBreak from '@/components/ui/PageBreak'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { FactionService } from '@/services'
import Link from 'next/link'
import { ScriptedOperation } from '../../scriptedoperations/page'
import RulesAI from '../sections/rules-ai'
import RulesHorde from '../sections/rules-horde'
import RulesIntroMission from '../sections/rules-intromission'
import RulesOutro from '../sections/rules-outro'
import RulesPlayingOnAGrid from '../sections/rules-playingonagrid'
import RulesQuickRef from '../sections/rules-quickref'
import RulesScriptedOperations from '../sections/rules-scriptedoperations'

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

        <div className="text-left text-muted mx-auto noprint mt-4">
          Download the PDFs:
          <ul className="columns-2 md:columns-4">
            <li><Link className="underline" target="_blank" href="/assets/Ruinstars_Rules.pdf">Complete Rulebook</Link> (77 pages - Easy Print)</li>
            <li><Link className="underline" target="_blank" href="/assets/Ruinstars_Rules_FullColor.pdf">Complete Rulebook</Link> (77 pages - Full Color)</li>
            <li><Link className="underline" target="_blank" href="/assets/Ruinstars_CoreRules.pdf">Core Rules</Link> (15 pages)</li>
            <li><Link className="underline" target="_blank" href="/assets/Ruinstars_FirstMission.pdf">First Mission</Link> (1 page)</li>
            <li><Link className="underline" target="_blank" href="/assets/Ruinstars_SquadSheet.pdf">Fillable Squad Sheet</Link> (2 pages)</li>
            <li><Link className="underline" target="_blank" href="/assets/Ruinstars_Factions.pdf">Factions</Link> (21 pages)</li>
            <li><Link className="underline" target="_blank" href="/assets/Ruinstars_Missions.pdf">Missions</Link> (12 pages)</li>
            <li><Link className="underline" target="_blank" href="/assets/Ruinstars_ScriptedOperations.pdf">Scripted Operations</Link> (20 pages)</li>
            <li><Link className="underline" target="_blank" href="/assets/Ruinstars_HordeMode.pdf">Horde Mode</Link> (8 pages)</li>
          </ul>
        </div>

        <RulesToc />

        <RulesIntro showTitle={true} num={1} />

        <RulesAI />

        <RulesCoreMechanics num={2} />

        <RulesGameCycle num={3} />

        <RulesIntroMission num={4} />

        <RulesStatCards num={5} />

        <RulesActions num={6} />

        <RulesMovement num={7} />

        <RulesCombat num={8} />
      
        <RulesItems num={9} />

        <RulesYourSquad num={10} />

        <RulesMissions num={11} />

        <RulesCampaigns num={12} />

        <RulesScriptedOperations num={13} />

        <RulesHorde num={14} />
      
        <RulesGlossary num={15} />
      
        <RulesPlayingOnAGrid num={16} />
      
        <RulesQuickRef num={17} />

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
          </>
        )}
        
        <RulesOutro />
      
      </div>
    </>
  )
}
