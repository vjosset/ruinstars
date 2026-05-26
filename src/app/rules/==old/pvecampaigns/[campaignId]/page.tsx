import { notFound } from 'next/navigation'
import MissionCard from '@/components/shared/MissionCard'
import Markdown from '@/components/ui/Markdown'
import campaigns from '@/data/pvecampaigns'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'

export function generateStaticParams() {
  return campaigns.map((c) => ({ campaignId: c.campaignId }))
}

export async function generateMetadata({ params }: { params: Promise<{ campaignId: string }> }) {
  const { campaignId } = await params
  const campaign = campaigns.find((c) => c.campaignId === campaignId)
  if (!campaign) return {}
  return generatePageMetadata({
    title: campaign.title,
    description: campaign.subtitle ?? campaign.title,
    images: [{ url: '/icons/icon-big.png', width: 512, height: 512 }],
    keywords: ['campaigns', 'pve', 'rules', 'narrative'],
    pagePath: `/rules/pvecampaigns/${campaignId}`
  })
}

const THREAT_LABEL: Record<1 | 2 | 3, string> = { 1: 'I', 2: 'II', 3: 'III' }

export default async function CampaignPage({ params }: { params: Promise<{ campaignId: string }> }) {
  const { campaignId } = await params
  const campaign = campaigns.find((c) => c.campaignId === campaignId)
  if (!campaign) notFound()

  return (
    <div className="rules px-3 max-w-7xl mx-auto">
      <div className="section">
        <h1 className="text-center pt-48 mb-4 font-title">{campaign.title}</h1>
        {campaign.subtitle && (
          <p className="text-center text-muted mb-12 uppercase">
            {campaign.subtitle}
          </p>
        )}

        {campaign.lore && (
          <div className="flavor">
            <Markdown>{campaign.lore}</Markdown>
          </div>
        )}
      </div>

      {campaign.operations.map((operation) => (
        <div key={operation.operationId} className="mt-8">
          <h3>{operation.title}</h3>

          <div className="flex flex-wrap gap-x-6 gap-y-1 my-2 border-l-4 border-l-main pl-3">
            <span><strong>Enemy:</strong> {operation.enemyFaction}</span>
            <span><strong>Threat Level:</strong> {THREAT_LABEL[operation.threatLevel]}</span>
          </div>

          {operation.lore && (
            <div className="section flavor">
              <Markdown>{operation.lore}</Markdown>
            </div>
          )}

          <div className="mt-4">
            {operation.missions.map((mission) => (
              <MissionCard key={mission.missionId} mission={mission} showDescription={false} showId={false} layout="horizontal" />
            ))}
            {operation.homebase && (
              <div className="bg-card border border-main p-1 rounded mb-2 section">
                <h4>Homebase</h4>
                <div className="flavor">
                  <Markdown>{operation.homebase}</Markdown>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {campaign.conclusion && (
        <div className="section mt-8">
          <h3>Conclusion</h3>
          <div className="flavor">
            <Markdown>{campaign.conclusion}</Markdown>
          </div>
        </div>
      )}
    </div>
  )
}
