import { FactionLink, SquadLink } from '@/components/nav/Links'
import Markdown from '@/components/ui/Markdown'
import PageTitle from '@/components/ui/PageTitle'
import UnitCard from '@/components/unit/UnitCard'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { SpecialService, SquadTypeService } from '@/src/services'
import { UnitType } from '@/src/types'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ squadTypeId: string }>  }) {
  const { squadTypeId } = await params
  const squadType = await SquadTypeService.getSquadType(squadTypeId)
  
  if (!squadType) return {}

  return generatePageMetadata({
    title: `${squadType.squadTypeName}`,
    description: `${squadType.lore}`,
    image: {
      url: `/img/squadTypes/${squadTypeId}.webp`,
    },
    keywords: ['squadType', squadType.squadTypeId, squadType.squadTypeName, squadType.factionId, squadType.faction.factionName],
    pagePath: `/squadTypes/${squadType.squadTypeId}`
  })
}

export default async function SquadTypePage({ params }: { params: Promise<{ squadTypeId: string }> }) {
  const { squadTypeId } = await params
  const squadType = await SquadTypeService.getSquadType(squadTypeId)
  
  const allSpecials = await SpecialService.getAllSpecials()

  if (!squadType) notFound()

  return (
    <div className="max-w-full">
      <div className="relative min-h-[200px] flex items-center justify-center mb-4"
        style={{ backgroundImage: `url(/img/squadTypes/${squadType.squadTypeId}.webp)`, backgroundAttachment: '', backgroundPosition: 'top', backgroundSize: 'cover' }}>
        <div 
          className="absolute inset-0 bg-cover bg-top"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        </div>
        <div className="relative flex flex-col items-center justify-center px-8 pt-36 w-full">
          <div className="flex items-center gap-x-4 mb-4">
            <PageTitle>{squadType.squadTypeName}</PageTitle>
          </div>
          <div className="text-white max-w-2xl text-center m-4">
            <Markdown className="flavor_disabled">{squadType.description}</Markdown>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="p-2 flex items-center justify-center gap-4">
          <div>
            <FactionLink factionId={squadType.factionId} factionName={squadType.faction.factionName} />
          </div>
          <div>
            <SquadLink squadId={squadType.squadTypeId} squadName={squadType.squadTypeName} />
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2">
          {squadType.unitTypes.map((unitType: UnitType) => (
            <UnitCard
              key={unitType.unitTypeId}
              seq={1}
              unit={unitType.toPlain()}
              squad={null}
              isOwner={false}
              allSpecials={allSpecials.map((spec) => spec.toPlain())}
              allMedals={[]}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
  