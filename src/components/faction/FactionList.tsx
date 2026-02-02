import { FactionService } from '@/services'
import { Faction } from '@/types'
import Link from 'next/link'
import SquadTypeCard from '../squadType/SquadTypeCard'

type FactionListProps = {
  factions?: Faction[] | null
}

export default async function FactionList({
  factions = null
}: FactionListProps) {
  if (!factions || factions.length == 0) {
    factions = await FactionService.getAllFactions()
    factions = factions.filter((fa) => fa.squadTypes.length > 0)
  }
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {factions.map((faction) => (
        <div key={faction.factionId}>
          <Link href={`/factions/${faction.factionId}`}>
            <h4 className="font-heading">{faction.factionName}</h4>
          </Link>
            
          <div className="grid gap-4 grid-cols-1">
            {faction.squadTypes.map((squadType) => {
              return <SquadTypeCard key={squadType.squadTypeId} squadType={squadType} />
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
