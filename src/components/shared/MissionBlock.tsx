import Markdown from '@/components/ui/Markdown'
import { Mission, MissionPlain } from '@/types'

export default function MissionBlock({mission, showDescription}: { mission: Mission | MissionPlain, showDescription: boolean }) {
  return (
    <>
      <h4 className="text-main font-semibold mb-1">
        {mission.missionType}: {mission.seq} - {mission.title}
      </h4>
      
      {showDescription && mission.description && (
      <div className="flavor mx-4">
        <Markdown>{mission.description}</Markdown>
      </div>
      )}
      {mission.setup && (
        <>
          <h6>Setup</h6>
          <div className="ml-2">
            <Markdown>{mission.setup}</Markdown>
          </div>
        </>
      )}
      {mission.deployment && (
        <>
          <h6>Deployment</h6>
          <div className="ml-2">
            <Markdown>{mission.deployment}</Markdown>
          </div>
        </>
      )}
      {mission.victory && (
        <>
          <h6>Victory</h6>
          <div className="ml-2">
            <Markdown>{mission.victory}</Markdown>
          </div>
        </>
      )}
      {mission.special && (
        <>
          <h6>Special</h6>
          <div className="ml-2">
            <Markdown>{mission.special}</Markdown>
          </div>
        </>
      )}
    </>
  )
}