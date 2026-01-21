import RulesActions from '@/app/rules/rules-actions'
import RulesCampaigns from '@/app/rules/rules-campaigns'
import RulesCombat from '@/app/rules/rules-combat'
import RulesCoreMechanics from '@/app/rules/rules-coremechanics'
import RulesGameCycle from '@/app/rules/rules-gamecycle'
import RulesGlossary from '@/app/rules/rules-glossary'
import RulesHeader from '@/app/rules/rules-header'
import RulesIntro from '@/app/rules/rules-intro'
import RulesItems from '@/app/rules/rules-items'
import RulesMovement from '@/app/rules/rules-movement'
import RulesStatCards from '@/app/rules/rules-statcards'
import RulesToc from '@/app/rules/rules-toc'
import RulesYourSquad from '@/app/rules/rules-yoursquad'
import { GAME } from '@/lib/config/game_config'

import RulesAI from '@/app/rules/rules-ai'
import RulesIntroMission from '@/app/rules/rules-intromission'
import RulesOutro from '@/app/rules/rules-outro'
import RulesPlayingOnAGrid from '@/app/rules/rules-playingonagrid'
import RulesQuickRef from '@/app/rules/rules-quickref'
import RulesScriptedOperations from '@/app/rules/rules-scriptedoperations'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import Link from 'next/link'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Rules',
    description: `The complete rules for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{
      url: '/icons/icon-big.png',
    }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules/core'
  })
}

export default async function Rules({ searchParams }: { searchParams?: Promise<{ print?: string }> }) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
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
            <div className="text-white text-center font-title text-2xl tracking-wide bg-black/70 px-6 py-3 rounded-lg shadow-lg">
              <h1>Core Rules</h1>
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

        <RulesIntro showTitle={true} num={1} showIntroIgnore={true} />

        <RulesAI />
        <hr />

        <RulesCoreMechanics num={2} />
        <hr />

        <RulesGameCycle num={3} />
        <hr />

        <RulesIntroMission num={4} />
        <hr />

        <RulesStatCards num={5} />
        <hr />

        <RulesActions num={6} />
        <hr />

        <RulesMovement num={7} />
        <hr />

        <RulesCombat num={8} />
        <hr />
      
        <RulesItems num={9} />
        <hr />

        <RulesYourSquad num={10} />
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
        
        <RulesOutro />
      
      </div>
    </>
  )
}
