import { SquadTypeLink } from '@/components/nav/Links'
import Markdown from '@/components/ui/Markdown'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { FactionService } from '@/src/services'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ factionId: string }>  }) {
  const { factionId } = await params
  const faction = await FactionService.getFaction(factionId)
  
  if (!faction) return {}

  return generatePageMetadata({
    title: `${faction.factionName}`,
    description: `${faction.lore}`,
    image: {
      url: `/img/factions/${factionId}.webp`,
    },
    keywords: ['faction', 'lore', faction.factionId, faction.factionName],
    pagePath: `/factions/${faction.factionId}`
  })
}

export default async function FactionPage({ params }: { params: Promise<{ factionId: string }> }) {
  const { factionId } = await params
  const faction = await FactionService.getFaction(factionId)

  if (!faction) notFound()

  return (
    <div
      className="max-w-full h-full flex items-center justify-center">
      
      <div className="max-w-7xl flex flex-col items-center justify-center gap-x-2 m-4 p-2">
        <div className="flex items-center gap-x-3 mb-4 pt-12">
          <h1 className="text-main">{faction.factionName}</h1>
        </div>
        <div className="text-foreground">
          <Markdown className="flavor_disabled">{faction.lore}</Markdown>

          {faction.squadTypes.map((squadType, index) => {
            const isEven = index % 2 === 1
            return (
              <div
                key={squadType.squadTypeId}
                id={squadType.squadTypeId}
                className="my-8"
              >
                <h2 id={squadType.squadTypeId} className="font-heading text-main">
                  <Link href={`/squadTypes/${squadType.squadTypeId}`}>{squadType.squadTypeName}</Link>
                </h2>
                <div className={`flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} items-start gap-4`}>
                  <Link href={`/squadTypes/${squadType.squadTypeId}`}
                    className="w-full md:w-1/2">
                    <img
                      src={`/img/squadTypes/${squadType.squadTypeId}.webp`}
                      alt={`${squadType.squadTypeName} Portrait`}
                      className="rounded-xl border border-main"
                    />
                  </Link>
                  <div className="w-full md:w-1/2">
                    <SquadTypeLink squadTypeId={squadType.squadTypeId} squadTypeName={squadType.squadTypeName} />
                    <Markdown>{squadType.description}</Markdown>
                    <Markdown className="flavor">{squadType.lore}</Markdown>
                  </div>
                </div>
              </div>
            )})}
        </div>
      </div>
    </div>
  )
}
  