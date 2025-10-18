import RulesActions from '@/app/rules/rules-actions'
import RulesAI from '@/app/rules/rules-ai'
import RulesCampaigns from '@/app/rules/rules-campaigns'
import RulesCombat from '@/app/rules/rules-combat'
import RulesCoreMechanics from '@/app/rules/rules-coremechanics'
import RulesGameCycle from '@/app/rules/rules-gamecycle'
import RulesGlossary from '@/app/rules/rules-glossary'
import RulesHeader from '@/app/rules/rules-header'
import RulesIntro from '@/app/rules/rules-intro'
import RulesItems from '@/app/rules/rules-items'
import RulesMissions from '@/app/rules/rules-missions'
import RulesMovement from '@/app/rules/rules-movement'
import RulesPlayingOnAGrid from '@/app/rules/rules-playingonagrid'
import RulesQuickRef from '@/app/rules/rules-quickref'
import RulesStatCards from '@/app/rules/rules-statcards'
import RulesToc from '@/app/rules/rules-toc'
import RulesYourSquad from '@/app/rules/rules-yoursquad'
import { GAME } from '@/lib/config/game_config'
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
    pagePath: '/rules'
  })
}

export default async function Rules() {
  const versionTimestamp = new Intl.DateTimeFormat('en-US', {
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
        <div className="text-white font-title text-2xl tracking-wide bg-black/70 px-6 py-3 rounded-lg shadow-lg">
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
        <RulesGlossary num={12} />
      
        <hr />
        <RulesPlayingOnAGrid num={13} />
      
        <hr />
        <RulesQuickRef num={14} />
      </div>
    </>
  )
}
