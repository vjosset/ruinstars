import ops from '@/data/scriptedOperations.json'
import { GAME } from '@/lib/config/game_config'
import RulesActions from '../../rules/rules-actions'
import RulesCampaigns from '../../rules/rules-campaigns'
import RulesCombat from '../../rules/rules-combat'
import RulesCoreMechanics from '../../rules/rules-coremechanics'
import RulesGameCycle from '../../rules/rules-gamecycle'
import RulesGlossary from '../../rules/rules-glossary'
import RulesHeader from '../../rules/rules-header'
import RulesIntro from '../../rules/rules-intro'
import RulesItems from '../../rules/rules-items'
import RulesMissions from '../../rules/rules-missions'
import RulesMovement from '../../rules/rules-movement'
import RulesStatCards from '../../rules/rules-statcards'
import RulesToc from '../../rules/rules-toc'
import RulesYourSquad from '../../rules/rules-yoursquad'

import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { SquadTypeService } from '@/services'
import Link from 'next/link'
import RulesAI from '../../rules/rules-ai'
import RulesPlayingOnAGrid from '../../rules/rules-playingonagrid'
import RulesQuickRef from '../../rules/rules-quickref'
import RulesScriptedOperations from '../../rules/rules-scriptedoperations'

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

export default async function RuleBook() {
  const operations = ops
  const squadTypes = await SquadTypeService.getAllSquadTypes()
  const versionTimestamp = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'UTC',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date()).replaceAll('-', '')
  
  return (
    <>
      {/* Cover */}
      <img src="/img/rules/BookCover_Framed.webp" className="printonly fullpage overflow-y-hidden" style={{pageBreakAfter: 'always'}} />
      <div className="printonly absolute left-1/2 top-1/4 -translate-x-1/2">
        <div className="text-white font-title text-2xl tracking-wide bg-black/70 px-6 py-3 rounded-lg shadow-lg text-center">
          Version {versionTimestamp}
        </div>
      </div>

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
      </div>
    </>
  )
}
