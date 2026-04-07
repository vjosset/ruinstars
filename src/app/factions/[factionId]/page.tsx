import { SquadTypeLink } from '@/components/nav/Links'
import Markdown from '@/components/ui/Markdown'
import CampaignCard from '@/components/campaign/CampaignCard'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { FactionService } from '@/src/services'
import campaigns from '@/data/pvecampaigns'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ factionId: string }>  }) {
  const { factionId } = await params
  const faction = await FactionService.getFaction(factionId)
  
  if (!faction) return {}

  return generatePageMetadata({
    title: `${faction.factionName}`,
    description: `${faction.lore}`,
    images: [{ url: `/img/factions/${factionId}.webp`, width: 900, height: 600 }],
    keywords: ['faction', 'lore', faction.factionId, faction.factionName],
    pagePath: `/factions/${faction.factionId}`
  })
}

export default async function FactionPage({ params }: { params: Promise<{ factionId: string }> }) {
  const { factionId } = await params
  const faction = await FactionService.getFaction(factionId)

  if (!faction) notFound()

  const factionCampaigns = campaigns.filter((c) => c.factionId === factionId)

  return (
    <div
      className="max-w-full h-full flex items-center justify-center">
      
      <div className="max-w-7xl flex flex-col items-center justify-center gap-x-2 m-4 p-2">
        <div className="flex items-center gap-x-3 mb-4 pt-12">
          <h1 className="text-main">{faction.factionName}</h1>
        </div>
        <em>{faction.tagline}</em>
        <div className="text-foreground">
          <Markdown className="flavor">{faction.lore}</Markdown>

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
                <em>{squadType.tagline}</em>
                <div className={`flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} items-start gap-4`}>
                  <Link href={`/squadTypes/${squadType.squadTypeId}`}
                    className="w-full md:w-1/2">
                    <img
                      src={`/img/squadTypes/${squadType.squadTypeId}.webp`}
                      alt={`${squadType.squadTypeName} Portrait`}
                      className="rounded-xl border border-main"
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                  <div className="w-full md:w-1/2">
                    <SquadTypeLink squadTypeId={squadType.squadTypeId} squadTypeName={squadType.squadTypeName} />
                    <Markdown className="flavor">{squadType.lore}</Markdown>
                    <Markdown>{squadType.description}</Markdown>
                  </div>
                </div>
              </div>
            )})}
          {factionCampaigns.length > 0 && (
            <div className="mt-8">
              <h2 className="font-heading text-main">PvE Campaigns</h2>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {factionCampaigns.map((campaign) => (
                  <CampaignCard key={campaign.campaignId} campaign={campaign} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
  