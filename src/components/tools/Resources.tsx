import { SectionTitle } from "../ui"
import Link from "next/link"

export default function Resources() {
  return  (
    <div className="space-y-4">
      <div className="section">
        <SectionTitle>Resources</SectionTitle>
        <p className="text-muted">
          Print-at-home resources for Ruinstars, including PDFs for the rules and battlefields, and STLs for 3D printing tiles and terrain.
        </p>
        <ul>
          <li>
            Rules:
            <ul>
              <li><Link className="underline" target="_blank" href="/assets/RuinStars - The Rules - 20250523.pdf">Easy Print</Link></li>
              <li><Link className="underline" target="_blank" href="/assets/RuinStars - The Rules - 20250523 - FullColor.pdf">Full Color</Link></li>
            </ul>
          </li>
          <li>Battlefield PDFs: <em>Coming soon!</em></li>
          <li>STLs for 3D Printing: <em>Coming soon!</em></li>
        </ul>
      </div>
      <div className="section">
        <SectionTitle>Community</SectionTitle>
        <p className="text-muted">
          This is a community-driven project, and we welcome contributions, feedback, and suggestions.
          If you have ideas for new features, improvements, or just want to chat about the game, please join our community channels.
        </p>
        <ul>
          <li><Link href="https://discord.gg/Rh8vJzkCrT" target="_blank" className="underline">Discord</Link></li>
          <li><Link href="https://ruinstars.itch.io/ruinstars" target="_blank" className="underline">itch.io</Link></li>
          <li><Link href="https://github.com/vjosset/ruinstars" target="_blank" className="underline">GitHub</Link></li>
        </ul>
      </div>
    </div>
  )
}