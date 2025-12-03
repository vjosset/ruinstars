
import MissionBlock from '@/components/shared/MissionBlock'
import rawPveMissions from '@/data/missions_pve.json'
import { MissionPlain } from '@/types'

const pvemissions = (rawPveMissions as MissionPlain[]).map((m, idx) => ({
  ...m,
  missionId: m.missionId?.toString() || `${idx + 1}`
}))

export default function RulesMissionsSolo() {
  return (
    <div className="section hidden">
      <h3 className="text-center">Solo/Co-op Missions</h3>
      <p>
        These missions are designed for Solo or Co-op play, with a single shared squad or partial squads per player.
      </p>
            
      <div className="twocols">
        {
          pvemissions.filter((mission) => (mission as any).active).map((mission) => (
            <div className="section" key={mission.missionId}>
              <MissionBlock mission={mission} showDescription={true} />
            </div>
          ))
        }
      </div>
    </div>
  )
}
