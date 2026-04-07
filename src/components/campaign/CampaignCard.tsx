import { Campaign } from '@/types'
import Link from 'next/link'

type CampaignCardProps = {
  campaign: Campaign
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <Link
      className="group grid grid-cols-[135px_1fr] bg-card border border-border rounded hover:border-main transition h-[90px] overflow-hidden"
      href={`/rules/pvecampaigns/${campaign.campaignId}`}
    >
      {/* Image section - left side */}
      <div className="relative overflow-hidden border-r border-border">
        <div
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500 overflow-hidden printbg"
          style={{ backgroundImage: `url(/img/factions/${campaign.factionId}.webp)` }}
        />
      </div>

      {/* Content section - right side */}
      <div className="relative p-2 flex flex-col justify-between h-full min-w-0">
        <h5 className="font-heading text-main text-xl truncate overflow-hidden whitespace-nowrap w-full">
          {campaign.title}
        </h5>
        {campaign.subtitle && (
          <div className="text-muted text-sm line-clamp-2">{campaign.subtitle}</div>
        )}
      </div>
    </Link>
  )
}
