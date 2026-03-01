import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import Link from 'next/link'
import { BsFilePdf } from 'react-icons/bs'
import { FiDownload } from 'react-icons/fi'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Rules',
    description: `Get the complete rules for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{ url: '/icons/icon-big.png' }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules'
  })
}

const RULE_BOOKS = [
  { num: '01', title: 'Core Rules', desc: 'Everything you need to start playing.', href: '/assets/books/Core Rules - Ruinstars.pdf', highlight: true },
  { num: '02', title: 'Factions', desc: 'Choose a faction and build your squad.', href: '/assets/books/Factions - Ruinstars.pdf' },
  { num: '03', title: 'PvE Missions', desc: 'Solo/co-op missions against NPC squads.', href: '/assets/books/PvE Missions - Ruinstars.pdf' },
  { num: '04', title: 'PvP Missions', desc: 'Competitive missions for two players.', href: '/assets/books/PvP Missions - Ruinstars.pdf' },
  { num: '05', title: 'Horde Mode', desc: 'Standalone solo/coop survival mode.', href: '/assets/books/Horde Mode - Ruinstars.pdf' },
]

const QUICK_REFS = [
  { title: 'Core Rules Quick Ref', href: '/assets/books/Quick Ref - Ruinstars.pdf' },
  { title: 'PvE Missions Quick Ref', href: '/assets/books/PvE Missions - Quick Ref - Ruinstars.pdf' },
  { title: 'Horde Mode Quick Ref', href: '/assets/books/Horde Mode - Quick Ref - Ruinstars.pdf' },
]

const TOOLS = [
  { title: 'Fillable Squad Sheet/Unit Cards', href: '/assets/tools/Ruinstars_SquadSheet.pdf' },
  { title: 'Tokens', href: '/assets/tools/Tokens - Ruinstars.pdf' },
  { title: '6" Gauge (Letter)', href: '/assets/tools/Ruinstars_Gauge_Letter.pdf' },
  { title: '6" Gauge (A4)', href: '/assets/tools/Ruinstars_Gauge_A4.pdf' },
  { title: '6" Gauge - STL', href: '/assets/tools/Ruinstars Gauge 6x1.stl' },
]

const BATTLEFIELDS = [
  { title: 'The Ruined City (Letter)', href: '/assets/battlefields/TheRuinedCity_Letter.pdf'},
  { title: 'The Ruined City (A4)', href: '/assets/battlefields/TheRuinedCity_A4.pdf'},
  { title: 'The Facility (Letter)', href: '/assets/battlefields/TheFacility_Letter.pdf'},
  { title: 'The Facility (A4)', href: '/assets/battlefields/TheFacility_A4.pdf'}
]

const COMMUNITY_LINKS = [
  { label: 'Discord', desc: 'Come say hi!', href: 'https://discord.gg/Rh8vJzkCrT' },
  { label: 'itch.io', desc: 'Dev logs and discussions', href: 'https://ruinstars.itch.io/ruinstars' },
  { label: 'GitHub', desc: 'Open source', href: 'https://github.com/vjosset/ruinstars' },
]

export default async function Rules() {
  return (
    <div className="rules px-3 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1>Rules</h1>
      </div>
      
      <div className="twocols">
        {/* Rule Books */}
        <div className="mb-8 section">
          <h5 className="text-main">Rule Books</h5>
          <em className="text-muted">
            The main rulebooks for the game
          </em>
          <div className="space-y-1 ml-2">
            {RULE_BOOKS.map((book) => (
              <Link
                key={book.num}
                href={book.href}
                target="_blank"
                className={`relative flex items-center gap-3 bg-card border rounded px-3 py-3 transition-colors group ${book.highlight ? 'border-main' : 'border-border hover:border-main'}`}
              >
                <span className="font-stat text-sm w-6 shrink-0 text-center">{book.num}</span>
                <BsFilePdf className="text-xl shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-heading text-main uppercase">{book.title}</div>
                  <div className="text-sm font-main normal-case">{book.desc}</div>
                </div>
                {book.highlight && (
                  <span className="absolute top-0 right-8 bg-main text-black text-xs font-heading uppercase px-2 py-0.5 leading-tight">
                    Start Here
                  </span>
                )}
                <FiDownload className="text-muted shrink-0 group-hover:text-main transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Reference */}
        <div className="mb-8 section">
          <h5 className="text-main">Quick Reference (1 Page)</h5>
          <em className="text-muted">
            One-page reference documents for the core rules and main play modes
          </em>
          <div className="border border-border rounded divide-y divide-border ml-2">
            {QUICK_REFS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                target="_blank"
                className="flex items-center gap-3 px-3 py-2.5 hover:text-main transition-colors group"
              >
                <BsFilePdf className="shrink-0" />
                <span className="flex-1 font-heading uppercase">{item.title}</span>
                <FiDownload className="text-muted shrink-0 group-hover:text-main transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="mb-8 section">
          <h5 className="text-main">Tools</h5>
          <em className="text-muted">
            Gauges and Tokens
          </em>
          <div className="border border-border rounded divide-y divide-border ml-2">
            {TOOLS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                target="_blank"
                className="flex items-center gap-3 px-3 py-2.5 hover:text-main transition-colors group"
              >
                <BsFilePdf className="shrink-0" />
                <span className="flex-1 font-heading uppercase">{item.title}</span>
                <FiDownload className="text-muted shrink-0 group-hover:text-main transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Battlefields */}
        <div className="mb-8 section" id="battlefields">
          <h5 className="text-main">Battlefields</h5>
          <em className="text-muted">
            Print-at-home battlefields with grids
          </em>
          <div className="border border-border rounded divide-y divide-border ml-2">
            {BATTLEFIELDS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                target="_blank"
                className="flex items-center gap-3 px-3 py-2.5 hover:text-main transition-colors group"
              >
                <BsFilePdf className="shrink-0" />
                <span className="flex-1 font-heading uppercase">{item.title}</span>
                <FiDownload className="text-muted shrink-0 group-hover:text-main transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Community */}
        <div className="mb-8 section">
          <h5 className="text-main">Community</h5>
          <div className="border border-border rounded divide-y divide-border ml-2">
            {COMMUNITY_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                className="flex items-center justify-between px-3 py-2.5 hover:text-main transition-colors"
              >
                <span className="font-heading uppercase">{link.label}</span>
                <span className="text-muted text-sm">{link.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
