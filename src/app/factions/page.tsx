import FactionList from '@/components/faction/FactionList'
import PageTitle from '@/components/ui/PageTitle'
import { GAME } from '@/lib/config/game_config'
import { FactionService } from '@/services/faction.service'

export const metadata = {
  title: `Factions - ${GAME.NAME}`,
  description: `Browse all Factions and Squad Types in ${GAME.NAME} and choose your squad’s allegiance.`,
}

export default async function FactionsPage() {
  const factions = await FactionService.getAllFactions()

  return (
    <div className="px-1 py-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <PageTitle>Factions</PageTitle>
        <p className="text-muted mt-2 max-w-xl mx-auto">
          {GAME.NAME} is home to rival powers vying for dominance. Each faction and squad type brings unique tactics, units, and strategies.
        </p>
      </div>

      <FactionList factions={factions} />
    </div>
  )
}
