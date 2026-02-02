import { GAME } from '@/lib/config/game_config'

export default async function RulesAI() {
  return (
    <div className="rounded border border-main mx-8 p-2 mt-4">
      <h4>Note on Use of AI</h4>
      <p>
        {GAME.NAME} is still in beta and includes select concept art and visuals generated with the aid of AI image tools.
            While these assets support visual development and thematic exploration, they are not final and
            all images will be replaced with art created by actual artists by the time the game is released.
      </p>
    </div>
  )
}
