import BattlefieldDiagram from '@/components/shared/BattlefieldDiagram'
import Markdown from '@/components/ui/Markdown'
import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { MissionBattlefields } from '@/data/mission_battlefields'
import { MissionDeployments } from '@/data/mission_deployments'
import { MissionObjectives } from '@/data/mission_objectives'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Reference Cards',
    description: `Print-at-home reference cards for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [],
    keywords: ['free', 'rules', 'pdf', 'cards', 'reference'],
    pagePath: '/rules/cards'
  })
}

function CardBack({ deck }: { deck: 'Deployment' | 'Objective' | 'Battlefield' }) {
  return (
    <div className="refcard bg-background border-2 border-main p-1.5 flex">
      <div className="flex-1 flex flex-col items-center justify-center gap-4 p-4">
        <img src="/icons/icon-big.png" className="w-48 h-48 object-contain" alt="Ruinstars" />
        <div className="w-full" />
        <h2 className="font-title text-center leading-none">
          {deck}
        </h2>
      </div>
    </div>
  )
}

export default function CardsPage() {
  return (
    <>
      <style>{'@media print { @page { size: 11in 8.5in; margin: 0.5in; } }'}</style>
      <div className="rules print-landscape max-w-7xl mx-auto">
        <div className="section">
          <div className="flex flex-wrap gap-0">

            {MissionBattlefields.map((b) => (
              <div key={b.battlefieldId} className="flex">
                <CardBack deck="Battlefield" />
                <div className="refcard border border-main p-2 flex flex-col overflow-hidden">
                  <h2 className="flex-shrink-0">{b.title}</h2>
                  <h4>{b.effectName}</h4>
                  <Markdown>{b.effect}</Markdown>
                </div>
              </div>
            ))}

            {MissionDeployments.map((d) => (
              <div key={d.deploymentId} className="flex">
                <CardBack deck="Deployment" />
                <div className="refcard border border-main p-2 flex flex-col overflow-hidden">
                  <h2 className="flex-shrink-0">{d.title}</h2>
                  <Markdown>{d.description}</Markdown>
                  <BattlefieldDiagram diagram={{ ...d.diagram, legend: {} }} className="mt-auto" />
                </div>
              </div>
            ))}

            {MissionObjectives.map((archetype) =>
              archetype.variations.map((v) => (
                <div key={v.objectiveId} className="flex">
                  <CardBack deck="Objective" />
                  <div className="refcard border border-main p-2 flex flex-col overflow-hidden">
                    <h2 className="flex-shrink-0">{v.title}</h2>
                    <em className="flex-shrink-0">Objective - {v.objectiveId}</em>
                    {v.setup && (
                      <div>
                        <h6>Setup</h6>
                        <Markdown>{v.setup}</Markdown>
                      </div>
                    )}
                    {v.special && (
                      <div>
                        <h6>Special</h6>
                        <Markdown>{v.special}</Markdown>
                      </div>
                    )}
                    {v.victory && (
                      <div>
                        <h6>Victory</h6>
                        <Markdown>{v.victory}</Markdown>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}

          </div>
        </div>
      </div>
    </>
  )
}
