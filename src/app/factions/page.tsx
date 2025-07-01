import SquadTypeCard from '@/components/squadType/SquadTypeCard'
import PageTitle from '@/components/ui/PageTitle'
import { GAME } from '@/lib/config/game_config'
import { FactionService } from '@/services/faction.service'
import Link from 'next/link'

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

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {factions.map((faction) => (
          <div key={faction.factionName}>
            <Link href={`/factions/${faction.factionId}`}>
              <h4>{faction.factionName}</h4>
            </Link>
            
            <div className="gap-2">
              {faction.squadTypes.map((squadType) => {
                return <SquadTypeCard key={squadType.squadTypeId} squadType={squadType} />
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
