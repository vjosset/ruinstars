import Link from 'next/link'
import { SectionTitle } from '../ui'

export default function Resources() {
  return (
    <div className="space-y-4">
      <div className="section">
        <SectionTitle>Resources</SectionTitle>
        <p className="text-muted">
          Print-at-home resources for Ruinstars, including PDFs for the rules and battlefields, and STLs for 3D printing tiles and terrain.
        </p>
        <div>
          <h6>Rules</h6>
          <ul>
            <li><Link className="underline" target="_blank" href="/assets/Ruinstars_Rules.pdf">Easy Print</Link></li>
            <li><Link className="underline" target="_blank" href="/assets/Ruinstars_Rules_FullColor.pdf">Full Color</Link></li>
          </ul>
        </div>
        <div>
          <h6>Tokens</h6>
          <ul>
            <li><Link className="underline" target="_blank" href="/assets/Ruinstars_Tokens.pdf">Tokens</Link></li>
          </ul>
        </div>
        <div>
          <h6>Gauges</h6>
          <ul>
            <li>
              <Link className="underline" target="_blank" href="/assets/Ruinstars_Gauge_Letter.pdf">Gauge (US Letter)</Link>
            </li>
            <li>
              <Link className="underline" target="_blank" href="/assets/Ruinstars_Gauge_A4.pdf">Gauge (A4)</Link>
            </li>
            <li>
              <Link className="underline" target="_blank" href="https://www.thingiverse.com/thing:7162556">STL</Link> (for 3d printing)
            </li>
          </ul>
        </div>
        <div>
          <h6>Battlefields</h6>
          <ul>
            <li>The Ruined City: { ' ' }
              <Link className="underline" target="_blank" href="/assets/battlefields\TheRuinedCity_Letter.pdf">US Letter</Link>
              { ' / ' }
              <Link className="underline" target="_blank" href="/assets/battlefields\TheRuinedCity_A4.pdf">A4</Link>
            </li>
            <li>The Facility: { ' ' }
              <Link className="underline" target="_blank" href="/assets/battlefields\TheFacility_Letter.pdf">US Letter</Link>
              { ' / ' }
              <Link className="underline" target="_blank" href="/assets/battlefields\TheFacility_A4.pdf">A4</Link>
            </li>
            <li>No Man's Land:  { ' ' }
              <Link className="underline" target="_blank" href="/assets/battlefields\NoMansLand_Letter.pdf">US Letter</Link>
              { ' / ' }
              <Link className="underline" target="_blank" href="/assets/battlefields\NoMansLand_A4.pdf">A4</Link>
            </li>
          </ul>
          These PDFs are composed of 9 tiles of 20cm x 20cm each with grid lines marking the Paces/Squares.
          Print them at home at 100% scale, cut them out, and glue them to cardboard, foamboard, or wood for a sturdy battlefield.
        </div>
      </div>
      <div className="section">
        <SectionTitle>Community</SectionTitle>
        <p className="text-muted">
          This is a community-driven project, and we welcome contributions, feedback, and suggestions.
          If you have ideas for new features, improvements, or just want to chat about the game, please join our community channels.
        </p>
        <ul>
          <li><Link href="https://discord.gg/Rh8vJzkCrT" target="_blank" className="underline">Discord</Link></li>
          <li><Link href="https://ruinstars.itch.io/ruinstars" target="_blank" className="underline">itch.io</Link> - Includes devlogs for the game</li>
          <li><Link href="https://github.com/vjosset/ruinstars" target="_blank" className="underline">GitHub</Link></li>
        </ul>
      </div>
    </div>
  )
}