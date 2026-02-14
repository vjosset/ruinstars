import Markdown from '@/components/ui/Markdown'
import { MissionPlain } from '@/types'
import BattlefieldDiagram from './BattlefieldDiagram'

export default function MissionCard({mission}: { mission: MissionPlain, showDescription: boolean }) {
  return (
    <div className="bg-card border border-main p-1 rounded mb-2 section">
      <h4 className="text-main font-semibold mb-1">
        {mission.missionId} - {mission.title}
      </h4>

      <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-start print:flex-row print:items-start">
        <div className="flex-1 min-w-0">
          {mission.description && (
            <div className="flavor mx-4">
              <Markdown>{mission.description}</Markdown>
            </div>
          )}
          {mission.setup && (
            <>
              <h6 className="text-main">Setup</h6>
              <div className="ml-2">
                <Markdown>{mission.setup}</Markdown>
              </div>
            </>
          )}
          {mission.deployment && (
            <>
              <h6 className="text-main">Deployment</h6>
              <div className="ml-2">
                <Markdown>{mission.deployment}</Markdown>
              </div>
            </>
          )}
          {mission.special && (
            <>
              <h6 className="text-main">Special</h6>
              <div className="ml-2">
                <Markdown>{mission.special}</Markdown>
              </div>
            </>
          )}
          {mission.victory && (
            <>
              <h6 className="text-main">Victory</h6>
              <div className="ml-2">
                <Markdown>{mission.victory}</Markdown>
              </div>
            </>
          )}
          {/*
          {mission.rewards && mission.rewards.length > 0 && (
            <>
              <h6 className="text-main">Campaign Rewards</h6>
              <ul className="ml-2">
                {mission.rewards.map((r, idx) =>
                  <li key={`mrew_${idx}`}><strong>{r.name}:</strong> {r.effect}</li>
                )}
              </ul>
            </>
          )}
          */}
        </div>

        {mission.diagram && (
          <div className="lg:w-1/2 lg:max-w-md print:w-1/2 section">
            <div className="ml-2">
              <BattlefieldDiagram diagram={mission.diagram} className="max-w-full" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
