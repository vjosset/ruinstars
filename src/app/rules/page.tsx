import PageTitle from '@/components/ui/PageTitle'
import { GAME } from '@/lib/config/game_config'

import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import Link from 'next/link'
import { BsFilePdf } from 'react-icons/bs'

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

          <ol className="text-left">
            <li>
              <Link className="underline" target="_blank" href="/assets/Ruinstars_CoreRules.pdf"><BsFilePdf className="inline-block" /> Core Rules</Link><br/>
              <strong>Start here</strong> - Everything you need to get started
            </li>
            <li>
              <Link className="underline" target="_blank" href="/assets/Ruinstars_Factions.pdf"><BsFilePdf className="inline-block" /> Factions</Link><br/>
              Choose a faction and build your Squad
            </li>
            <li>
              <Link className="underline" target="_blank" href="/assets/Ruinstars_Missions.pdf"><BsFilePdf className="inline-block" /> Missions</Link><br/>
              All core primary missions and objective types
            </li>
            <li>
              <Link className="underline" target="_blank" href="/assets/Ruinstars_CampaignsOperations.pdf"><BsFilePdf className="inline-block" /> Campaigns and Operations</Link><br/>
              Optional narrative campaigns and scripted operations
            </li>
            <li>
              <Link className="underline" target="_blank" href="/assets/Ruinstars_HordeMode.pdf"><BsFilePdf className="inline-block" /> Horde Mode</Link><br/>
              A standalone solo or co-op survival mode
            </li>
          </ol>

          <hr/>

          <div className="text-left">
            <h4>Quick Reference</h4>
          </div>
        </div>
      </div>
    </div>
  )
}
