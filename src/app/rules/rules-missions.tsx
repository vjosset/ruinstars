import { SquadTypeLink } from '@/components/nav/Links'
import BattlefieldBlock from '@/components/shared/BattlefieldBlock'
import MissionBlock from '@/components/shared/MissionBlock'
import battlefields from '@/data/battlefields.json'
import missions from '@/data/missions.json'

export default async function RulesMissions() {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="missions">
        10. Missions
      </h2>

      <p>
        A Mission is a single battle played between two (or more) Squads.<br/>
        Whether you are playing a one-off Quick Play mission, a <a className="underline" href="#scriptedoperations">Scripted Operation</a>, or a long, epic <a className="underline" href="#campaigns">campaign</a>, the rules for playing each Mission are the same:
      </p>
        
      <ol>
        <li>Select a Primary Mission</li>
        <li>(Optional) Select a Secondary Mission</li>
        <li>Select a Battlefield</li>
        <li>Set up your Squads</li>
        <li>Play!</li>
      </ol>
      
      <h3>Quick-Play Missions</h3>
      <p>
        Quick-Play missions are perfect for pick-up or competitive play.
        You can also use these missions to build your own custom <a className="underline" href="#campaigns">campaign</a>.<br/>
        For more narrative play, see <a className="underline" href="#scriptedoperations">Scripted Operations</a>.
      </p>
      Each Primary mission is a single battle pitting your Squad against its enemies. Select (or randomly pick) a Mission from the list of standard missions below:
      <div className="">
        <h3>Primary Missions</h3>
        <div className="twocols">
          {
            missions.filter((mission) => !mission.missionType || mission.missionType == 'Primary').map((mission) => (
              <div className="section" key={mission.missionId}>
                <MissionBlock mission={mission} showDescription={true} />
              </div>
            ))
          }
        </div>
      </div>

      <div className="section hidden">
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

      <div className="section">
        <h3 id="battlefields">Battlefields</h3>
        <div className="section twocols">
        After selecting a Mission, pick or randomly select one of the following battlefields. The Mission will be played on that Battlefield.<br/>
        The Galaxy is a dangerous and deadly place; each Battlefield has <strong>Effects</strong> that affect your Units.<br/>
        Use your own battlemats, or use our print-at-home <a className="underline" href="/tools">Battlefields</a> with the tiles and Paces pre-marked in a grid.
              
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
      
      <div className="section">
        <h3>NPC Mode</h3>
        <strong>NPC Mode</strong> allows players to face an automated enemy Squad, either solo or cooperatively.
        This mode uses standard game rules, with additional behavior guidelines for AI-controlled Units.<br/>
        When playing in NPC Mode, you will need at least one <SquadTypeLink squadTypeId='NPC' squadTypeName='NPC'/> Squad.

        <h4>NPC Behavior</h4>
        Each NPC Unit Type has a defined Behavior Profile that determines how it acts during play.
        Follow the listed priorities in that profile to decide how the Unit moves, targets, and performs actions.

        <h4>Activating NPC Units</h4>
        After each player Unit activation, that same player immediately activates the next NPC Unit and follows its Behavior Profile.
        Continue alternating in this way until all Units have been activated for the Turn.

        <h4>Cooperative Play</h4>
        NPC Mode can be played solo or cooperatively.
        When playing cooperatively, players may choose one of the following formats:
        <ul>
          <li><strong>Full Squads:</strong><br/> 
            Each player deploys a full 100 GP Squad.
            For each player Squad, deploy one full 100 GP NPC Squad as the enemy.
          </li>
          <li><strong>Shared Squad:</strong><br/>
            Players share control of one full 100 GP Squad.
            Players take turns activating Units in that Squad.
            Deploy one full 100 GP NPC Squad as the enemy.
          </li>
          <li><strong>Mini Squads:</strong><br/>
            Each player deploys a reduced-size Squad:
            <ul>
              <li>2 Players → 50 GP each</li>
              <li>3 Players → 34 GP each</li>
              <li>4 Players → 25 GP each</li>
            </ul>
            Field one full 100 GP NPC Squad as the enemy.
          </li>
        </ul>
        When playing in cooperative mode, note that Units that are on the same side but not part of the same Squad are not Squadmates nor Enemies.
      </div>
    </div>
  )}
