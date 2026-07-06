import FactionList from '@/components/faction/FactionList'
import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import BlogCard from '@/components/nav/BlogCard'
import RulesIntro from './rules/corerules/sections/rules-intro'
import { SquadService } from '@/services/squad.service'
import SquadSpotlightSection from '@/components/home/SquadSpotlightSection'

export async function generateMetadata() {
  return generatePageMetadata({
    title: '',
    description: 'Free sci-fi skirmish wargame with solo and co-op PvE campaigns, PvP missions and campaigns, and Horde Mode. Miniatures-agnostic, D6 only, 45-90 minutes. Download the rules and start playing today.',
    images: [{ url: '/img/hero01_wideB.webp', width: 1080, height: 506 }],
    keywords: ['home', 'squad builder', 'battle tracker'],
    pagePath: '/'
  })
}

export default async function Home() {
  const spotlight = await SquadService.getRandomSpotlightSquad()
  const recentPosts = getAllPosts().slice(0, 3)

  return (
    <>
      <div
        className="relative m-0 p-0"
        style={{
          backgroundImage: 'url(\'/img/ui/mech02.png\')',
          backgroundPosition: 'center top',
          WebkitBackgroundSize: 'cover',
          MozBackgroundSize: 'cover',
          backgroundSize: 'cover',
        }}>
        {/* Add an overlay div for the gradient */}
        <div className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 1))',
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
            <Link href="/rules" className="py-1 px-2 rounded text-md transition focus:outline-none inline-flex gap-2 items-center bg-main text-white hover:bg-main/90">
              <h5>Download The Rules</h5>
            </Link>
          </div>
          <br/><br/>
        </div>
      </div>

      {/* About/Intro */}
      <div className="px-2 py-8 rules section max-w-7xl mx-auto">
        <RulesIntro showTitle={false} />
      </div>

      {/* Random Spotlight */}
      {spotlight && (
        <SquadSpotlightSection initialSquad={spotlight.toPlain()} />
      )}

      {/* SquadTypes List */}
      <div className="px-2 py-8 max-w-7xl mx-auto">
        <h2 className="text-center text-main font-title mb-4">Factions</h2>
        <em className="text-muted">What's left is worth fighting over. Pick your side.</em>
        <FactionList />
      </div>

      {/* News */}
      <div className="max-w-3xl mx-auto p-4">
        <Link href="/blog"><h3 className="text-main font-title mb-4">What's New</h3></Link>
        {recentPosts.map((post) => (
          <BlogCard key={post.title} post={post} />
        ))}
        <Link href="/blog">More blogs &rarr;</Link>
      </div>
    </>
  )
}
