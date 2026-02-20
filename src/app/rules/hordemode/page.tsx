import { GAME } from '@/lib/config/game_config'

import RulesHorde from '@/app/rules/hordemode/sections/rules-horde'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Horde Mode',
    description: `The rules for Horde Mode, a solo/coop mode for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{
      url: '/icons/icon-big.png',
    }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules/books/hordemode'
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
              <h1>Horde Mode</h1>
              Version {versionTimestamp}
            </div>
          </div>
        </>
      )}

      <div className="text-center">
        <h1>MP</h1>
        <h1>TO</h1>
        <h1>MV</h1>
        <h1>RO</h1>
        <h1>UP</h1>
        <h1>TR</h1>
      </div>

      <div className="rules px-3 max-w-7xl mx-auto">
        <RulesHorde />
      </div>
    </>
  )
}
