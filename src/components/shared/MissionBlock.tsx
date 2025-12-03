import Markdown from '@/components/ui/Markdown'
import { Mission, MissionPlain } from '@/types'

export default function MissionBlock({mission, showDescription}: { mission: Mission | MissionPlain, showDescription: boolean }) {
  return (
    <div className="bg-card border border-main p-1 rounded mb-2">
      <h4 className="text-main font-semibold mb-1">
        {mission.missionId} - {mission.title}
      </h4>
      
      {showDescription && mission.description && (
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
    </div>
  )
}
