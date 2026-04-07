import CampaignCard from '@/components/campaign/CampaignCard'
import campaigns from '@/data/pvecampaigns'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { GAME } from '@/lib/config/game_config'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Bespoke Campaigns',
    description: `Narrative bespoke campaigns for ${GAME.NAME} — faction-specific multi-operation PvE missions with branching objectives and lore.`,
    images: [{ url: '/icons/icon-big.png', width: 512, height: 512 }],
    keywords: ['campaigns', 'pve', 'rules', 'narrative'],
    pagePath: '/rules/pvecampaigns'
  })
}

export default function PvECampaigns() {
  return (
    <div className="rules px-3 max-w-7xl mx-auto">
      <div className="section">
        <h1 className="text-center pt-48 mb-12 font-title">Bespoke Campaigns</h1>

        <div className="section">
          <h3>Scripted Narrative PvE Operations</h3>
          <div className="twocols">
            <div className="section">
              <p className="mb-4">
                Bespoke Campaigns are fixed, authored PvE experiences, each one a complete narrative arc
                tied to a specific faction, enemy, and set of escalating operations. Unlike standard PvE
                missions, the objectives, deployments, and stakes in a Bespoke Campaign are handcrafted
                to tell a specific story from start to finish.
              </p>
              <p className="mb-4">
                Each Campaign is composed of three Operations, each containing three Missions,
                followed by a Climax. Operations escalate in threat and narrative weight: the enemy
                is different each time, the battlefield shifts, and what you learn in one Operation
                shapes what you face in the next.
              </p>
            </div>
            <div className="section">
              <h4>Each Mission</h4>
              <p className="mb-4">
                Every Mission presents two simultaneous Objectives. You do not need to complete both
                to win — but completing both earns the best outcome. Read both Objectives before
                deployment and plan accordingly.
              </p>
              <h4>Homebase</h4>
              <p className="mb-4">
                Between Operations, your Squad returns to Homebase. Heal injuries, consolidate
                what you have learned, and prepare for the next escalation. The narrative context
                at each Homebase reflects what the Operation revealed — read it before moving on.
              </p>
            </div>
          </div>
        </div>

        <div className="section mt-8">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <CampaignCard key={campaign.campaignId} campaign={campaign} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
