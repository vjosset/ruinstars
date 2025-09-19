import BattlefieldBlock from '@/components/shared/BattlefieldBlock'
import MissionBlock from '@/components/shared/MissionBlock'
import { BattlefieldService } from '@/services/battlefield.service'
import { MissionService } from '@/services/mission.service'

export default async function RulesMissions() {
  const missions = await MissionService.getAllMissions()
  const battlefields = await(BattlefieldService.getAllBattlefields())

  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="missions">
        10. Missions
      </h2>

      <p>
        A Mission is a single battle played between two (or more) Squads.<br/>
        Whether you are playing a one-off Quick Play mission, a <a className="underline" href="#scriptedoperations">Scripted Operation</a>, or a long, epic <a className="underline" href="#campaigns">campaign</a>, the rules for playing each Mission are the same:
        <ol>
          <li>Select a Primary Mission</li>
          <li>(Optional) Select a Secondary Mission</li>
          <li>Select a Battlefield</li>
          <li>Set up your Squads</li>
          <li>Play!</li>
        </ol>
      </p>
      
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

      <div className="section">
        <h3 id="battlefields">Battlefields</h3>
        <div className="section twocols">
        After selecting a Mision, pick or randomly select one of the following battlefields. The Mission will be played on that Battlefield.<br/>
        The Galaxy is a dangerous and deadly place; each Battlefield has <strong>Effects</strong> that affect your Units.<br/>
        Use your own battlemats, or use our print-at-home <a className="underline" href="/tools">Battlefields</a> with the tiles and Squares ready to go.
              
          {/* Battlefields List */}
          {
            battlefields.map((battlefield) => (
              <div className="section" key={battlefield.battlefieldId}>
                <BattlefieldBlock key={`bf_${battlefield.battlefieldId}`} battlefield={battlefield} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )}
