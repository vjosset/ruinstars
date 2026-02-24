import FactionList from '@/components/faction/FactionList'
import AuthButtons from '@/components/home/HomeAuthButtons'
import { Button } from '@/components/ui'
import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import news from '@/public/news.json'
import NewsCard from '@/src/components/home/NewsCard'
import Link from 'next/link'
import RulesIntro from './rules/corerules/sections/rules-intro'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Home',
    description: `${GAME.NAME} is a free sci-fi skirmish wargame. Build your squads, download the rules, and play campaigns in a grimdark galaxy of ruins and horrors.`,
    images: [{
      url: '/img/hero01_wideB.webp',
    }],
    keywords: ['home', 'squad builder', 'battle tracker'],
    pagePath: '/'
  })
}

export default async function Home() {
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
          <p className="text-center max-w-lg mx-auto mt-2">
            <em>Squad operations in a dying galaxy.</em><br/>
            A free, fast-paced, miniatures-agnostic sci-fi skirmish wargame.<br/>
          </p>
          
          <div className="text-center max-w-lg mx-auto noprint mt-4">
            <Button>
              <Link href="/rules">
                <h5>Download The Rules</h5>
              </Link>
            </Button>
          </div>
          
          <AuthButtons />
          <br/><br/>
        </div>
      </div>

      {/* About/Intro */}
      <div className="px-2 py-8 rules section max-w-7xl mx-auto">
        <RulesIntro showTitle={false} />
      </div>

      {/* SquadTypes List */}
      <div className="px-2 py-8 max-w-7xl mx-auto">
        <h2 className="text-center text-main font-title mb-4">Factions</h2>

        <FactionList />
      </div>

      {/* News */}
      <div className="max-w-3xl mx-auto p-4 news">
        <h3 className="text-main font-title mb-4">Latest News</h3>
        {news.slice(0, 10).map((item, idx) => (
          <NewsCard key={idx} item={item} />
        ))}
      </div>
    </>
  )
}
