import Markdown from '@/components/ui/Markdown'
import { MissionPlain } from '@/types'
import BattlefieldDiagram from './BattlefieldDiagram'

type MissionCardProps = {
  mission: MissionPlain
  showDescription?: boolean
  showId?: boolean
  layout?: 'vertical' | 'horizontal'
}

function MissionDetails({ mission }: { mission: MissionPlain }) {
  return (
    <>
      {mission.setup && (
        <>
          <h6 className="text-main">Setup</h6>
          <div className="ml-2"><Markdown>{mission.setup}</Markdown></div>
        </>
      )}
      {mission.battlefield && (
        <>
          <h6 className="text-main">Battlefield</h6>
          <div className="ml-2">{mission.battlefield}</div>
        </>
      )}
      {mission.deployment && (
        <>
          <h6 className="text-main">Deployment</h6>
          <div className="ml-2"><Markdown>{mission.deployment}</Markdown></div>
        </>
      )}
      {mission.special && (
        <>
          <h6 className="text-main">Special</h6>
          <div className="ml-2"><Markdown>{mission.special}</Markdown></div>
        </>
      )}
      {mission.objectiveA && (
        <>
          <h6 className="text-main">Objective A - {mission.objectiveA.type}</h6>
          <div className="ml-2"><Markdown>{mission.objectiveA.description}</Markdown></div>
        </>
      )}
      {mission.objectiveB && (
        <>
          <h6 className="text-main">Objective B - {mission.objectiveB.type}</h6>
          <div className="ml-2"><Markdown>{mission.objectiveB.description}</Markdown></div>
        </>
      )}
      {mission.victory && (
        <>
          <h6 className="text-main">Victory</h6>
          <div className="ml-2"><Markdown>{mission.victory}</Markdown></div>
        </>
      )}
      {mission.rewards && mission.rewards.length > 0 && (
        <>
          <h6 className="text-main">Campaign Rewards</h6>
          <ul className="ml-2">
            {mission.rewards.map((r, idx) => (
              <li key={`mrew_${idx}`}>
                <strong>{r.name}:</strong> {r.effect}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default function MissionCard({ mission, showDescription = true, showId = true, layout = 'vertical' }: MissionCardProps) {
  const title = (
    <>
      <h3 className="text-main font-semibold mb-1">
        {showId ? `${mission.missionId} - ` : ''}{mission.title}
      </h3>
    </>
  )

  const loreBlock = mission.lore && (
    <div className="flavor mx-4 mb-2">
      <Markdown>{mission.lore}</Markdown>
    </div>
  )

  const descriptionBlock = mission.description && showDescription && (
    <div className="flavor mx-4 mb-2">
      <Markdown>{mission.description}</Markdown>
    </div>
  )

  if (layout === 'horizontal') {
    return (
      <div className="bg-card border border-main p-1 rounded mb-2 section">
        {title}
        {descriptionBlock}
        <div className="flex gap-3 mt-2 min-w-0">
          <div className="flex-1 min-w-0">
            {loreBlock}
            <MissionDetails mission={mission} />
          </div>
          {mission.diagram && (
            <div className="flex-1 min-w-0">
              <BattlefieldDiagram diagram={mission.diagram} className="max-h-full" legendPosition="bottom" />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card border border-main p-1 rounded mb-2 section">
      {title}
      <div className="mt-2 flex flex-col gap-3">
        {loreBlock}
        {descriptionBlock}
        {mission.diagram && (
          <div className="section">
            <h6 className="text-main">Battlefield</h6>
            <div className="mx-1 sm:mx-2">
              <BattlefieldDiagram diagram={mission.diagram} className="max-w-full" />
            </div>
          </div>
        )}
        <div className="min-w-0">
          <MissionDetails mission={mission} />
        </div>
      </div>
    </div>
  )
}
