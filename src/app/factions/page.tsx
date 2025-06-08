import FactionCard from '@/components/faction/FactionCard'
import PageTitle from '@/components/ui/PageTitle'
import { GAME } from '@/lib/config/game_config'
import { FactionService } from '@/services/faction.service'

export const metadata = {
  title: `Factions - ${GAME.NAME}`,
  description: `Browse all factions in ${GAME.NAME} and choose your squad’s allegiance.`,
}

export default async function FactionsPage() {
  const factions = await FactionService.getAllFactions()

  return (
    <div className="px-1 py-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <PageTitle>Factions</PageTitle>
        <p className="text-muted mt-2 max-w-xl mx-auto">
          {GAME.NAME} is home to rival powers vying for dominance. Each faction brings unique tactics, units, and strategies.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {factions.map((faction) => {
          return <FactionCard key={faction.factionId} faction={faction} />
        })}
      </div>
    </div>
  )
}
