import SquadTypeCard from '@/components/squadType/SquadTypeCard'
import PageTitle from '@/components/ui/PageTitle'
import { GAME } from '@/lib/config/game_config'
import { SquadTypeService } from '@/services/squadType.service'

export const metadata = {
  title: `SquadTypes - ${GAME.NAME}`,
  description: `Browse all squadTypes in ${GAME.NAME} and choose your squad’s allegiance.`,
}

export default async function SquadTypesPage() {
  const squadTypes = await SquadTypeService.getAllSquadTypes()

  return (
    <div className="px-1 py-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <PageTitle>SquadTypes</PageTitle>
        <p className="text-muted mt-2 max-w-xl mx-auto">
          {GAME.NAME} is home to rival powers vying for dominance. Each squadType brings unique tactics, units, and strategies.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {squadTypes.map((squadType) => {
          return <SquadTypeCard key={squadType.squadTypeId} squadType={squadType} />
        })}
      </div>
    </div>
  )
}
