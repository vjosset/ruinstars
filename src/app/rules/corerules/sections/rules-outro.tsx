
import { getAllPosts } from '@/lib/posts'

export default async function RulesOutro({ num }: {num?: number | null}) {
  const posts = getAllPosts().slice(0, 8)

  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="outro">
        {num && `${num}. `}Afterword
      </h2>
      <div className="section twocols">
        <div className="section">
          <h3>Community</h3>
          This is a community-driven project, and we welcome contributions, feedback, and suggestions.
          If you have ideas for new features, improvements, or just want to chat about the game, please join our community channels.

          <ul>
            <li><a target="_blank" className="underline" href="https://ruinstars.com">Ruinstars.com</a> - Main website and app</li>
            <li><a target="_blank" className="underline" href="https://ruinstars.com/blog">Blog</a> - Dev blog, crafting notes, battle reports, and random ramblings</li>
            <li><a target="_blank" className="underline" href="https://discord.gg/Rh8vJzkCrT">Discord</a> - Come say hello!</li>
            <li><a target="_blank" className="underline" href="https://ruinstars.itch.io/ruinstars">itch.io</a> - Includes devlogs for the game</li>
            <li><a target="_blank" className="underline" href="https://github.com/vjosset/ruinstars">GitHub</a> - Full source code</li>
            <li><a target="_blank" className="underline" href="https://www.wargamevault.com/en/product/528452/Ruinstars">WargameVault</a></li>
            <li><a target="_blank" className="underline" href="https://boardgamegeek.com/boardgame/454226/ruinstars">BoardGameGeek</a></li>
          </ul>
        </div>
      </div>
    </div>
  )}
