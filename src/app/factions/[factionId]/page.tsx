import { SquadTypeLink } from '@/components/shared/Links'
import Markdown from '@/components/ui/Markdown'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { FactionService } from '@/src/services'
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
    keywords: ['home', 'squad builder', 'battle tracker', 'faction', 'lore', faction.factionId, faction.factionName],
    pagePath: `/factions/${faction.factionId}/lore`
  })
}

export default async function FactionPage({ params }: { params: Promise<{ factionId: string }> }) {
  const { factionId } = await params
  const faction = await FactionService.getFaction(factionId)

  if (!faction) notFound()

  return (
    <div
      className="max-w-full h-full flex items-center justify-center">
      
      <div className="lore max-w-7xl flex flex-col items-center justify-center gap-x-2 m-4 p-2">
        <div className="flex items-center gap-x-3 mb-4 pt-12">
          <h1>{faction.factionName}</h1>
        </div>
        <div className="text-foreground">
          <img
            src={`/img/factions/${faction.factionId}.webp`}
            alt={`${faction.factionName} Portrait`}
            className="w-full rounded-xl shadow-lg mt-1 mr-2 mb-2 md:w-auto md:max-w-[50%] max-h-[50%] md:float-left"
          />
          <Markdown>{faction.lore}</Markdown>

          {faction.squadTypes.map((squadType) => (
            <div>
              <h3 id={squadType.squadTypeId}>
                <SquadTypeLink squadTypeId={squadType.squadTypeId} squadTypeName={squadType.squadTypeName} />
              </h3>
              <Markdown>{squadType.lore}</Markdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
  