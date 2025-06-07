import { MissionService } from '@/services/mission.service'
import MissionBlock from '@/components/shared/MissionBlock'
export default async function RulesMissions() {
  const missions = await MissionService.getAllMissions()

  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="missions">
        9. Missions
      </h2>
      
      Each Primary mission is a single battle pitting your Squad against its enemies. Select (or randomly pick) a Mission from the list of standard missions below:
      <div className="twocols">
        {/* Missions List */}
        <div>
          <h3>Primary Missions</h3>
          {
            missions.filter((mission) => mission.missionType == 'Primary').map((mission) => (
              <div className="section" key={mission.missionId}>
                <MissionBlock mission={mission} showDescription={true} />
              </div>
            ))
          }
        </div>
        
        <div className="section">
          <h3>Secondary Missions</h3>
          <p>
            Secondary missions are optional secret missions that can be selected to add variety to your game.
            Each Squad selects or randomly picks a secondary mission before the game begins, and only reveals it to the opponent once the Mission ends.
            Each secondary mission has its own unique objective and can break a tie or steal victory from the jaws of defeat.
          </p>
          {
            missions.filter((mission) => mission.missionType == 'Secondary').map((mission) => (
              <div className="section" key={mission.missionId}>
                <MissionBlock mission={mission} showDescription={true} />
              </div>
            ))
          }
        </div>

        <div className="section">
          <h3>NPC Mode</h3>
          NPC Mode provides rules and instructions to play against an automated enemy Squad.<br/>
          This allows you to play solo against the automated enemy, or join forces with another player against that enemy.<br/>
          For each player Squad on the mission, field one <a href="/fa/NPC">NPC Squad</a> of the same GP value.
          <h4>NPC Behavior</h4>
          Each Unit type has its own defined NPC Behavior. This behavior dictates how an AI-controlled Unit behaves.
          <h4>Activating NPC Units</h4>
          After each player activation, that same player activates the next NPC Unit and follows its NPC Behavior.
        </div>
      </div>
    </div>
  )}
