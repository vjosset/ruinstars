import { GAME } from '@/lib/config/game_config'
import RulesHeader from '../../rules/rules-header'
import RulesSquadTypes from '../../rules/rules-squadtypes'

import { generatePageMetadata } from '@/lib/utils/generateMetadata'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Factions and SquadTypes',
    description: `SauadTypes and stat cards for all ${GAME.NAME} factions, a free miniatures sci-fi skirmish wargame.`,
    images: [{
      url: '/icons/icon-big.png',
    }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules'
  })
}

export default async function SquadTypesBook() {
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
          Factions<br/>
          Version {versionTimestamp}
        </div>
      </div>

      <div className="rules px-3 max-w-7xl mx-auto">
        <RulesHeader title="Factions" />

        <hr />
        <RulesSquadTypes />
          
      </div>
    </>
  )
}
