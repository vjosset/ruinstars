import { SquadLink } from '@/components/shared/Links'
import Markdown from '@/components/ui/Markdown'
import PageTitle from '@/components/ui/PageTitle'
import UnitCard from '@/components/unit/UnitCard'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { SpecialService, SquadTypeService } from '@/src/services'
import { UnitType } from '@/src/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ squadTypeId: string }>  }) {
  const { squadTypeId } = await params
  const squadType = await SquadTypeService.getSquadType(squadTypeId)
  
  if (!squadType) return {}

  return generatePageMetadata({
    title: `${squadType.squadTypeName}`,
    description: `${squadType.description}`,
    image: {
      url: `/img/squadTypes/${squadTypeId}.webp`,
    },
    keywords: ['home', 'squad builder', 'battle tracker', 'squadType', squadType.squadTypeId, squadType.squadTypeName],
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
      <div className="relative min-h-[200px] md:h-[300px] flex items-center justify-center"
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
          <div className="text-white max-w-2xl text-center">
            <Markdown>{squadType.description}</Markdown>
          </div>
          <div className="text-white max-w-2xl text-center pt-4">
            <Link className="" href={`/squadTypes/${squadType.squadTypeId}/lore`}>Read more...</Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="p-2">
          <SquadLink squadId={squadType.squadTypeId} squadName={'Default Squad'} />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2">
          {squadType.unitTypes.map((unitType: UnitType) => (
            <UnitCard
              key={unitType.unitTypeId}
              seq={1}
              unit={unitType.toPlain()}
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
  