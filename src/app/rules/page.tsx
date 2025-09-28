import ops from '@/data/scriptedOperations.json'
import { GAME } from '@/lib/config/game_config'
import RulesActions from './rules-actions_Squares'
import RulesCampaigns from './rules-campaigns'
import RulesCombat from './rules-combat_Squares'
import RulesCoreMechanics from './rules-coremechanics'
import RulesGameCycle from './rules-gamecycle'
import RulesGlossary from './rules-glossary'
import RulesHeader from './rules-header'
import RulesIntro from './rules-intro'
import RulesItems from './rules-items_Squares'
import RulesMissions from './rules-missions'
import RulesMovement from './rules-movement'
import RulesSquadTypes from './rules-squadtypes'
import RulesStatCards from './rules-statcards'
import RulesToc from './rules-toc'
import RulesYourSquad from './rules-yoursquad'

import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { SquadTypeService } from '@/services'
import Link from 'next/link'
import { ScriptedOperation } from '../scriptedoperations/page'
import RulesAI from './rules-ai'
import RulesInchesConversion from './rules-inchesconversion'
import RulesQuickRef from './rules-quickref'
import RulesScriptedOperations from './rules-scriptedoperations'

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

export default async function Home() {
  const operations = ops
  const squadTypes = await SquadTypeService.getAllSquadTypes()
  
  return (
    <>
      {/* Cover */}
      <img src="/img/rules/BookCover_Framed.webp" className="printonly fullpage overflow-y-hidden" style={{pageBreakAfter: 'always'}} />

      <div className="rules px-3 max-w-7xl mx-auto">
        <RulesHeader />

        <div className="text-center text-muted max-w-lg mx-auto noprint mt-4">
          Download the Rules:
          { ' ' }
          <Link className="underline" target="_blank" href="/assets/Ruinstars - The Rules - 20250919.pdf">Easy Print PDF</Link>
          { ' / ' }
          <Link className="underline" target="_blank" href="/assets/Ruinstars - The Rules - 20250919 - FullColor.pdf">Full Color PDF</Link>
        </div>
        <div className="text-center text-muted max-w-lg mx-auto noprint mt-4">
          Print the Tokens:
          { ' ' }
          <Link className="underline" target="_blank" href="/assets/tokens.pdf">Tokens PDF</Link>
        </div>

        <RulesToc />
        <RulesIntro showTitle={true} />

        <RulesAI />

        <hr />
        <RulesCoreMechanics />

        <hr />
        <RulesGameCycle />

        <hr />
        <RulesStatCards />

        <hr />
        <RulesActions />

        <hr />
        <RulesMovement />

        <hr />
        <RulesCombat />
      
        <hr />
        <RulesItems />

        <hr />
        <RulesYourSquad />

        <hr />
        <RulesMissions />

        <hr />
        <RulesCampaigns />

        <hr />
        <RulesScriptedOperations />
      
        <hr />
        <RulesGlossary />
      
        <hr />
        <RulesInchesConversion />
      
        <hr />
        <RulesQuickRef />
      
        <div className="printonly">
          <hr />
          <RulesSquadTypes />
          
          <hr />
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
              <ul>
                <li>Narrative arcs that tell a story through connected missions.</li>
                <li>Branching paths where success or failure leads to different challenges.</li>
                <li>Unique mechanics that go beyond simple control points: moving convoys, tug-of-war captives, collapsing strongpoints, dark rituals, and leader duels.</li>
                <li>Faction flavor that highlights the tactics, goals, and themes of each force.</li>
              </ul>
            </p>
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
          <div className="printonly p-6" style={{pageBreakBefore: 'always'}}>
            {operations.sort((a, b) => a.title.localeCompare(b.title)).map((op, idx) => {
              const isLast = idx === operations.length - 1
              return (
                <div className="m-6 p-6" key={op.slug} style={{ pageBreakAfter: isLast ? 'auto' : 'always' }}>
                  <ScriptedOperation op={op} squadTypes={squadTypes} />
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </>
  )
}
