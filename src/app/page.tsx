import FactionCard from '@/components/faction/FactionCard'
import AuthButtons from '@/components/home/HomeAuthButtons'
import news from '@/content/news.json'
import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { FactionService } from '@/services/faction.service'
import NewsCard from '@/src/components/home/NewsCard'
import Link from 'next/link'
import RulesIntro from './rules/rules-intro'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Home',
    description: `${GAME.NAME} is a free fast-paced miniatures-agnostic sci-fi skirmish wargame set in a galaxy filled with dangers. Build your squads. Track your battles. Dominate the stars.`,
    image: {
      url: '/img/hero01_wideB.webp',
    },
    keywords: ['home', 'squad builder', 'battle tracker'],
  })
}

export default async function Home() {
  const factions =  await FactionService.getAllFactions()

  return (
    <>
      <div
        className="relative m-0 p-0"
        style={{
          backgroundImage: 'url(\'/img/hero01_wideB.webp\')',
          backgroundPosition: 'center top',
          WebkitBackgroundSize: 'cover',
          MozBackgroundSize: 'cover',
          backgroundSize: 'cover',
        }}>
        {/* Add an overlay div for the gradient */}
        <div className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to bottom, rgba(16, 16, 16, 0.1), rgba(16, 16, 16, 0.75), rgba(16, 16, 16, 1))',
            pointerEvents: 'none',
          }}
        />
        
        <div className="relative pt-48">
          <div className="flex items-center justify-center gap-4 max-w-lg mx-auto">
            {/*<div className="h-12 w-12 mb-2 rounded-2xl glowbox">
              <img className="h-12 w-12" src="/icons/icon-big.png" />
            </div>*/}
            <h1 className="glowtext">{GAME.NAME}</h1>
          </div>
          <p className="text-center text-muted max-w-lg mx-auto mt-2">
            {GAME.NAME} is a free fast-paced miniatures-agnostic sci-fi skirmish wargame set in a galaxy filled with dangers.<br/>
            Build your squads. Track your battles. Dominate the stars.
          </p>
          
          <div className="text-center text-muted max-w-lg mx-auto noprint mt-4">
            Download the Rules:
            { ' ' }
            <Link className="underline" target="_blank" href="/assets/RuinStars - The Rules - 20250607.pdf">Easy Print</Link>
            { ' / ' }
            <Link className="underline" target="_blank" href="/assets/RuinStars - The Rules - 20250607 - FullColor.pdf">Full Color</Link>
          </div>
          
          <AuthButtons />
          
        </div>
      </div>

      {/* About/Intro */}
      <div className="px-2 py-8 rules section max-w-7xl mx-auto">
        <RulesIntro showTitle={false} />
      </div>

      {/* Factions List */}
      <div className="px-2 py-8 max-w-7xl mx-auto">
        <h2 className="text-center text-main font-title mb-4">Factions</h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {factions.map((faction) => (
            <FactionCard key={faction.factionId} faction={faction} />
          ))}
        </div>
      </div>

      {/* News */}
      <div className="max-w-3xl mx-auto p-4 news">
        <h3 className="text-main font-title mb-4">Latest News</h3>
        {news.map((item, idx) => (
          <NewsCard key={idx} item={item} />
        ))}
      </div>
    </>
  )
}
