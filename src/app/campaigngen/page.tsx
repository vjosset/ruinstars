import Markdown from '@/components/ui/Markdown'
import PageTitle from '@/components/ui/PageTitle'
import { generateCampaign } from '@/lib/campaigngen/campaigngen'
import { GAME } from '@/lib/config/game_config'

export const metadata = {
  title: `Campaign Generator - ${GAME.NAME}`,
  description: `Generate a new ${GAME.NAME} campaign`,
}

export default async function CampaignGen() {
  const campaign = generateCampaign()
  return (
    <div className="px-4 py-10 max-w-7xl mx-auto text-foreground">
      <PageTitle>{campaign.title}</PageTitle>
      <p className="text-xl font-medium text-center text-muted-foreground mb-2">
        Sector: <span className="text-foreground font-bold">{campaign.sector}</span>
      </p>
      <Markdown className="flavor text-center mb-8 text-lg max-w-3xl mx-auto">
        {campaign.description}
      </Markdown>

      {campaign.operations.map((op, opIdx) => (
        <div
          key={`op_${opIdx}`}
          className="mb-12 border border-border rounded-xl p-6 shadow-md bg-background"
        >
          <h2 className="text-2xl font-semibold mb-1">
            Operation {opIdx + 1}: {op.title}
          </h2>
          <p className="text-muted-foreground italic mb-4">
            Subsector: <span className="text-foreground font-medium">{op.subsector}</span>
          </p>

          <Markdown className="flavor mb-4 text-base">
            {op.description}
          </Markdown>

          <div className="mb-4">
            <strong className=" text-muted-foreground">Enemy Faction:</strong>
            <p className="text-md font-semibold">{op.enemy.squadType?.faction.factionName}</p>
            <p className=" italic text-muted-foreground">{op.enemy.squadName}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {op.missions.map((m, mIdx) => (
              <div
                key={`mission_${opIdx}_${mIdx}`}
                className="rounded-lg border border-border p-4 shadow-sm"
              >
                <h3 className="text-lg font-bold mb-1">
                  Mission {opIdx + 1}.{mIdx + 1}: {m.title}
                </h3>
                <p className=" text-muted-foreground mb-2 italic">
                  Goal: {m.goal}
                </p>
                <p className=" text-muted-foreground mb-2">
                  <strong>Battlefield:</strong> {m.battlefieldName} <em>({m.battlefield})</em>
                </p>
                <Markdown className="flavor  mb-2">{m.description}</Markdown>

                <div className=" text-muted-foreground mb-2">
                  <strong>Victory:</strong> {m.victory}
                </div>
                <div className=" text-green-600 mb-1">
                  <strong>Success:</strong> {m.successresult}
                </div>
                <div className=" text-red-600">
                  <strong>Failure:</strong> {m.failureresult}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
