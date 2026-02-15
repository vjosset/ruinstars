import RulesMissions from '@/app/rules/sections/rules-missions'
import { GAME } from '@/lib/config/game_config'

import { generatePageMetadata } from '@/lib/utils/generateMetadata'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Core Missions',
    description: `The core missions for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{
      url: '/icons/icon-big.png',
    }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules/books/missions'
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
              <h1>Missions</h1>
              Version {versionTimestamp}
            </div>
          </div>
        </>
      )}

      <div className="rules px-3 max-w-7xl mx-auto">
        <RulesMissions />
      </div>
    </>
  )
}
