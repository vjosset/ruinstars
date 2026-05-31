import { GAME } from '@/lib/config/game_config'

export default async function RulesAI() {
  return (
    <div className="rounded border border-main mx-8 p-2 mt-4">
      <h4>Note on Use of AI</h4>
      <p>
        {GAME.NAME} includes select concept art and visuals generated with the aid of AI image tools.
        While these assets support visual development and thematic exploration, they are not final.
        Original commissioned art is in progress and will replace these placeholders as the game develops.
      </p>
    </div>
  )
}
