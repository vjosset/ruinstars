import { GAME } from '@/lib/config/game_config'
import RulesActions from '../sections/rules-actions'
import RulesCombat from '../sections/rules-combat'
import RulesCoreMechanics from '../sections/rules-coremechanics'
import RulesGameCycle from '../sections/rules-gamecycle'
import RulesHeader from '../sections/rules-header'
import RulesIntro from '../sections/rules-intro'
import RulesMovement from '../sections/rules-movement'
import RulesStatCards from '../sections/rules-statcards'

import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import RulesAI from '../sections/rules-ai'
import RulesFirstMission from '../sections/rules-firstmission'
import RulesOutro from '../sections/rules-outro'
import RulesYourSquad from '../sections/rules-yoursquad'
import RulesQuickRef from '../sections/rules-quickref'
import PageBreak from '@/components/ui/PageBreak'
import PageTitle from '@/components/ui/PageTitle'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Core Rules',
    description: `The core rules for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{
      url: '/icons/icon-big.png',
    }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules/books/core'
  })
}

export default async function CoreRules() {
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
        <div className="text-white text-center font-title text-2xl tracking-wide bg-black/70 px-6 py-3 rounded-lg shadow-lg">
          <h1>Core Rules</h1>
          Version {versionTimestamp}
        </div>
      </div>

      <div className="rules px-3 max-w-7xl mx-auto">
        <RulesHeader />

        <RulesIntro showTitle={true} num={1} />

        <RulesAI />

        <RulesCoreMechanics num={2} />

        <RulesGameCycle num={3} />

        <RulesStatCards num={4} />

        <RulesYourSquad num={5} />

        <RulesActions num={6} />

        <RulesMovement num={7} />

        <RulesCombat num={8} />

        <RulesFirstMission num={9} />

        <PageBreak />

        <PageTitle>Quick Reference</PageTitle>
        <RulesQuickRef />
        
        <RulesOutro />
      
      </div>
    </>
  )
}
