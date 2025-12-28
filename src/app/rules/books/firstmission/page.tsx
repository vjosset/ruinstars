import { GAME } from '@/lib/config/game_config'

import RulesFirstMission from '@/app/rules/rules-firstmission'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'First Mission',
    description: `A beginner mission for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame. This mission introduces the core concepts of the game in a one-page, easy to follow document.`,
    images: [{
      url: '/icons/icon-big.png',
    }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules/books/firstmission'
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
              <h1>First Mission</h1>
              Version {versionTimestamp}
            </div>
          </div>
        </>
      )}

      <div className="rules px-3 max-w-7xl mx-auto">
        <RulesFirstMission />
      </div>
    </>
  )
}
