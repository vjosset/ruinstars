import Markdown from '@/components/ui/Markdown'
import UnitCard from '@/components/unit/UnitCard'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { FactionService, SpecialService } from '@/src/services'
import { UnitType } from '@/src/types'
import Link from 'next/link'
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
    keywords: ['home', 'squad builder', 'battle tracker'],
  })
}

export default async function FactionPage({ params }: { params: Promise<{ factionId: string }> }) {
  const { factionId } = await params
  const faction = await FactionService.getFaction(factionId)
  
  const allSpecials = await SpecialService.getAllSpecials()

  if (!faction) notFound()

  return (
    <div className="max-w-full">
      <div className="relative min-h-[300px] md:h-[400px] flex items-center justify-center py-12">
        <div 
          className="absolute inset-0 bg-cover bg-top"
          style={{ backgroundImage: `url(/img/factions/${faction.factionId}.webp)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        </div>
        <div className="relative flex flex-col items-center justify-center px-8 pt-48 w-full">
          <div className="flex items-center gap-x-4 mb-4">
            <img 
              className="h-10 w-10 grunge mb-3 hidden" 
              src={`/img/factions/${faction.factionId}-icon.webp`} 
              alt={`${faction.factionName} icon`}
            />
            <h1 className="text-center text-4xl text-white mb-2">{faction.factionName}</h1>
          </div>
          <div className="text-white max-w-2xl text-center">
            <Markdown>{faction.description}</Markdown>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="p-2">
          <Link href={`/squads/${faction.factionId}`} className="underline hover:text-main">View Default Squad</Link>
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
  