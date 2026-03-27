import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import Link from 'next/link'
import { IconType } from 'react-icons'
import { BsBox, BsHexagon, BsFilePdf, BsMap, BsPersonVcard, BsRulers } from 'react-icons/bs'
import { FiDownload, FiExternalLink } from 'react-icons/fi'
import { SiDiscord, SiGithub, SiItchdotio } from 'react-icons/si'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Rules',
    description: `Get the complete rules for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{ url: '/icons/icon-big.png', width: 512, height: 512 }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules'
  })
}

const RULE_BOOKS = [
  { num: '01', title: 'Core Rules', desc: 'Everything you need to start playing.', href: '/assets/books/Core Rules - Ruinstars.pdf', icon: BsFilePdf, highlight: true },
  { num: '02', title: 'Factions', desc: 'Choose a faction and build your squad.', href: '/assets/books/Factions - Ruinstars.pdf', icon: BsFilePdf },
  { num: '03', title: 'PvE Missions', desc: 'Solo/co-op missions against NPC squads.', href: '/assets/books/PvE Missions - Ruinstars.pdf', icon: BsFilePdf },
  { num: '04', title: 'PvP Missions', desc: 'Competitive missions for two players.', href: '/assets/books/PvP Missions - Ruinstars.pdf', icon: BsFilePdf },
  { num: '05', title: 'Horde Mode', desc: 'Solo/coop survival mode.', href: '/assets/books/Horde Mode - Ruinstars.pdf', icon: BsFilePdf },
]

const QUICK_REFS: { title: string; href: string; icon: IconType }[] = [
  { title: 'Core Rules Quick Ref', href: '/assets/books/Quick Ref - Ruinstars.pdf', icon: BsFilePdf },
  { title: 'PvE Missions Quick Ref', href: '/assets/books/PvE Missions - Quick Ref - Ruinstars.pdf', icon: BsFilePdf },
  { title: 'Horde Mode Quick Ref', href: '/assets/books/Horde Mode - Quick Ref - Ruinstars.pdf', icon: BsFilePdf },
]

const TOOLS: { title: string; href: string; icon: IconType }[] = [
  { title: 'Fillable Squad Sheet (US Letter PDF)', href: '/assets/tools/Ruinstars_SquadSheet.pdf', icon: BsPersonVcard },
  { title: 'Tokens (US Letter PDF)', href: '/assets/tools/Tokens - Ruinstars.pdf', icon: BsHexagon },
  { title: 'Tokens (A4 PDF)', href: '/assets/tools/Tokens - Ruinstars - A4.pdf', icon: BsHexagon },
  //{ title: 'Tokens (STL)', href: '/assets/tools/Tokens - Ruinstars.stl', icon: BsBox },
  { title: '6" Gauge (US Letter PDF)', href: '/assets/tools/Ruinstars_Gauge_Letter.pdf', icon: BsRulers },
  { title: '6" Gauge (A4 PDF)', href: '/assets/tools/Ruinstars_Gauge_A4.pdf', icon: BsRulers },
  { title: '6" Gauge (STL)', href: '/assets/tools/Ruinstars Gauge 6x1.stl', icon: BsBox },
]

const BATTLEFIELDS: { title: string; href: string; icon: IconType }[] = [
  { title: 'The Ruined City (US Letter)', href: '/assets/battlefields/TheRuinedCity_Letter.pdf', icon: BsMap },
  { title: 'The Ruined City (A4)', href: '/assets/battlefields/TheRuinedCity_A4.pdf', icon: BsMap },
  { title: 'The Facility (US Letter)', href: '/assets/battlefields/TheFacility_Letter.pdf', icon: BsMap },
  { title: 'The Facility (A4)', href: '/assets/battlefields/TheFacility_A4.pdf', icon: BsMap },
]

const COMMUNITY_LINKS: { label: string; desc: string; href: string; icon: IconType }[] = [
  { label: 'Discord', desc: 'Come say hi!', href: 'https://discord.gg/Rh8vJzkCrT', icon: SiDiscord },
  { label: 'itch.io', desc: 'Dev logs and discussions', href: 'https://ruinstars.itch.io/ruinstars', icon: SiItchdotio },
  { label: 'BGG', desc: 'BoardgameGeek listing', href: 'https://boardgamegeek.com/boardgame/454226/ruinstars', icon: FiExternalLink },
  { label: 'WargameVault', desc: 'Download on WargameVault', href: 'https://www.wargamevault.com/en/product/528452/ruinstars', icon: FiExternalLink },
  { label: 'GitHub', desc: 'Open source', href: 'https://github.com/vjosset/ruinstars', icon: SiGithub },
]

export default async function Rules() {
  return (
    <div className="max-w-full rules">
      <div className="relative min-h-[200px] flex items-center justify-center mb-4"
        style={{ backgroundImage: 'url(/img/rules/PrintableStuff.jpg)', backgroundPosition: 'top', backgroundSize: 'cover' }}>
        <div 
          className="absolute inset-0 bg-cover bg-top"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        </div>
        <div className="relative flex flex-col items-center justify-center px-8 pt-36 w-full">
          <div className="flex items-center gap-x-4 mb-4">
            <h2>Rules & Resources</h2>
          </div>
        </div>
      </div>

      <div className="px-3 max-w-7xl mx-auto">
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
                  <book.icon className="text-xl shrink-0" />
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
                  <item.icon className="shrink-0" />
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
                  <item.icon className="shrink-0" />
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
                  <item.icon className="shrink-0" />
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
                  className="flex items-center gap-3 px-3 py-2.5 hover:text-main transition-colors"
                >
                  <link.icon className="shrink-0" />
                  <span className="flex-1 font-heading uppercase">{link.label}</span>
                  <span className="text-muted text-sm">{link.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
