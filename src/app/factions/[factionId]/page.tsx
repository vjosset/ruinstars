import { SquadLink } from '@/components/shared/Links'
import Markdown from '@/components/ui/Markdown'
import PageTitle from '@/components/ui/PageTitle'
import UnitCard from '@/components/unit/UnitCard'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { FactionService, SpecialService } from '@/src/services'
import { UnitType } from '@/src/types'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ factionId: string }>  }) {
  const { factionId } = await params
  const faction = await FactionService.getFaction(factionId)
  
  if (!faction) return {}

  return generatePageMetadata({
    title: `${faction.factionName}`,
    description: `${faction.description}`,
    image: {
      url: `/img/factions/${factionId}.webp`,
    },
    keywords: ['home', 'squad builder', 'battle tracker', 'faction', faction.factionId, faction.factionName],
    pagePath: `/factions/${faction.factionId}`
  })
}

export default async function FactionPage({ params }: { params: Promise<{ factionId: string }> }) {
  const { factionId } = await params
  const faction = await FactionService.getFaction(factionId)
  
  const allSpecials = await SpecialService.getAllSpecials()

  if (!faction) notFound()

  return (
    <div className="max-w-full">
      <div className="relative min-h-[200px] md:h-[300px] flex items-center justify-center"
        style={{ backgroundImage: `url(/img/factions/${faction.factionId}.webp)`, backgroundAttachment: '', backgroundPosition: 'top', backgroundSize: 'cover' }}>
        <div 
          className="absolute inset-0 bg-cover bg-top"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        </div>
        <div className="relative flex flex-col items-center justify-center px-8 pt-36 w-full">
          <div className="flex items-center gap-x-4 mb-4">
            <PageTitle>{faction.factionName}</PageTitle>
          </div>
          <div className="text-white max-w-2xl text-center">
            <Markdown>{faction.description}</Markdown>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="p-2">
          <SquadLink squadId={faction.factionId} squadName={'Default Squad'} />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2">
          {faction.unitTypes.map((unitType: UnitType) => (
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
  