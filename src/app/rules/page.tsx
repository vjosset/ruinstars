import { PDFLink } from '@/components/nav/Links'
import PageTitle from '@/components/ui/PageTitle'
import { GAME } from '@/lib/config/game_config'

import { generatePageMetadata } from '@/lib/utils/generateMetadata'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Rules',
    description: `Get the complete rules for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{
      url: '/icons/icon-big.png',
    }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules'
  })
}

export default async function Rules() {
  
  return (
    <div className="px-1 py-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <PageTitle>Rules</PageTitle>
        <div className="rules px-3 max-w-7xl mx-auto">
          <p className="mb-4">
            <strong>You only need the Core Rules to play Ruinstars.</strong><br/>
            Everything else below is optional and expands how you play.
          </p>

          <div className="twocols">
            <div className="section">
              <h4>Rule Books</h4>
              <ol className="text-left">
                <li>
                  <PDFLink href="/assets/Core Rules - Ruinstars.pdf" title="Core Rules" /><br/>
                  <strong>Start here</strong> - Everything you need to get started
                </li>
                <li>
                  <PDFLink href="/assets/Factions - Ruinstars.pdf" title="Factions" /><br/>
                  Choose a faction and build your Squad
                </li>
                <li>
                  <PDFLink href="/assets/PvE Missions - Ruinstars.pdf" title="PvE Missions" /><br/>
                  PvE Missions for solo/coop play, including campaign rules
                </li>
                <li>
                  <PDFLink href="/assets/PvP Missions - Ruinstars.pdf" title="PvP Missions" /><br/>
                  PvP Missions for competitive play, including campaign rules
                </li>
                <li>
                  <PDFLink href="/assets/Horde Mode - Ruinstars.pdf" title="Horde Mode" /><br/>
                  A standalone solo or co-op survival mode
                </li>
              </ol>
            </div>
            <div className="section">
              <h4>Quick Reference (1 Page)</h4>
              <ul>
                <li>
                  <PDFLink href="/assets/Quick Ref - Ruinstars.pdf" title="Core Rules QuicK Ref" />
                </li>
                <li>
                  <PDFLink href="/assets/PvE Missions - Quick Ref - Ruinstars.pdf" title="PvE Missions QuicK Ref" />
                </li>
                <li>
                  <PDFLink href="/assets/Horde Mode - Quick Ref - Ruinstars.pdf" title="Horde Mode QuicK Ref" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
