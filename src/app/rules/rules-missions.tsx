import MissionBlock from '@/components/shared/MissionBlock'
import ops from '@/data/scriptedOperations.json'
import { SquadTypeService } from '@/services'
import { MissionService } from '@/services/mission.service'

export default async function RulesMissions() {
  const missions = await MissionService.getAllMissions()
  const operations = ops.sort((a, b) => a.title.localeCompare(b.title))
  const squadTypes = await SquadTypeService.getAllSquadTypes()

  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="missions">
        10. Missions
      </h2>
      
      <h3>Quick-Play Missions</h3>
      <p>
        Quick-Play missions are perfect for pick-up or competitive play.
        You can also use these missions to build your own custom <a className="underline" href="#campaigns">campaign</a>.<br/>
        For more narrative play, see <a className="underline" href="#scriptedoperations">Scripted Operations</a>.
      </p>
      Each Primary mission is a single battle pitting your Squad against its enemies. Select (or randomly pick) a Mission from the list of standard missions below:
      <div className="section">
        <h3>Primary Missions</h3>
        <div className="twocols">
          {
            missions.filter((mission) => mission.missionType == 'Primary').map((mission) => (
              <div className="section" key={mission.missionId}>
                <MissionBlock mission={mission} showDescription={true} />
              </div>
            ))
          }
        </div>
      </div>
      <div className="section">
        <h3>Secondary Missions</h3>
        <p>
            Secondary missions are optional secret missions that can be selected to add variety to your game.
            Each Squad selects or randomly picks a secondary mission before the game begins, and only reveals it to the opponent once the Mission ends.
            Each secondary mission has its own unique objective and can break a tie or steal victory from the jaws of defeat.
        </p>
        
        <div className="twocols">
          {
            missions.filter((mission) => mission.missionType == 'Secondary').map((mission) => (
              <div className="section" key={mission.missionId}>
                <MissionBlock mission={mission} showDescription={true} />
              </div>
            ))
          }
        </div>

        <div className="section hidden">
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
