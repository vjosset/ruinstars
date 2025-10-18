
import MissionBlock from '@/components/shared/MissionBlock'
import pvemissions from '@/data/missions_pve.json'

<div className="section hidden">
  <h3 className="text-center">Solo/Co-op Missions</h3>
  <p>
            These missions are designed for Solo or Co-op play, with a single shared squad or partial squads per player.
  </p>
        
  <div className="twocols">
    {
      pvemissions.filter((mission) => mission.active).map((mission) => (
        <div className="section" key={mission.missionId}>
          <MissionBlock mission={mission} showDescription={true} />
        </div>
      ))
    }
  </div>
</div>