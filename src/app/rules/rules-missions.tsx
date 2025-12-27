import BattlefieldBlock from '@/components/shared/BattlefieldBlock'
import MissionBlock from '@/components/shared/MissionBlock'
import battlefields from '@/data/battlefields.json'
import missions from '@/data/missions.json'

export default async function RulesMissions({ num }: {num?: Number | null}) {
  return (
    <>
      <div className="section">
        <h2 className="text-center py-3 font-title"   id="missions">
          {num && `${num}. `}Missions
        </h2>

        <div className="section">
          <h3>Tactical Engagements Across a Galaxy in Ruins</h3>
          <div className="twocols">
            <div className="section flavor">
              <p className="mb-4">
                “We once believed war would end when the stars themselves dimmed. We were wrong.
                The stars are gone, and still we fight over scraps of metal, over relics of dead gods, over the idea that any of this still matters.
              </p>
              <p className="mb-4">
                Every mission you read in this record was real once. Squads bled for these orders.
                Some triumphed and carved their marks into the ruins; others vanished beneath the dust of worlds that no longer have names.
              </p>
              <p className="mb-4">
                If you are holding this field manual, you are part of what remains. Learn these operations well.
                Out there, knowing which ruin to hold (or which to burn) means the difference between survival and extinction.”
              </p>
              <strong className="mb-4">Excerpt from the Warfront Archives, Cycle 2279.6</strong>
            </div>
            <div className="section">
              <p className="mb-4">
                Across the shattered frontier of the galaxy, war is constant. Squads of elite operatives clash in the ruins of cities, alien jungles, desecrated temples, and endless wastelands, each battle a fleeting spark in the dark expanse of the Ruinstars.
                These are not grand crusades of empire, but desperate struggles fought by the few who dare to step onto the battlefield when hope has long since burned away.
              </p>
              <p className="mb-4">
                This section collects the missions, battlefields, and scripted operations that define warfare in the Ruinstars setting.
                Within these pages, commanders will find everything they need to wage battle, from quick-play engagements and solo challenges to full three-part operations and sprawling, multi-stage campaigns.
                Every victory and defeat shapes the next confrontation; every decision carries the weight of survival.
              </p>
              <p className="mb-4">
                Each mission offers unique tactical puzzles and narrative flavor, challenging you to adapt your strategy to shifting objectives and hostile environments.
                Scripted Operations weave these battles into connected arcs: mini-campaigns that tell stories of ambition, corruption, and sacrifice.
                Whether you fight for the glory of the Human Hegemony, the zeal of the Sanctified Legion, the hunger of the Swarm, or the whispers of the Silent Choir, every operation offers a chance to carve your name into the scars of the galaxy.
              </p>
            </div>
          </div>
        </div>

        <h2 className="mt-4">Playing a Mission</h2>
        <div className="section twocols">
          <div className="section">
            <p>
              Your Squad is deployed for desperate struggles fought by the few who dare to step onto the battlefield when hope has long since burned away.
              These missions are designed to be played as quick, one-off skirmishes perfect for pick-up or competitive play.
              <br/>
              Each Mission is a single battle pitting your Squad against its enemies, generally lasting 4 Turns. Victory in these engagements is typically decided by calculating the total Mission Points (MP) scored by each Squad at the end of Turn 4.
              <br/>
              Alternatively, you can use these missions to build your own <a className="underline" href="#campaigns">Campaign</a>.
              A full Campaign is structured into three distinct Operations, and each Operation is composed of three Missions, totaling nine confrontations.
              In Campaign play, the winning Squad selects one of the Mission rewards to apply to their Squad, while the losing Squad gains the remaining reward.
              These missions offer unique tactical puzzles and narrative flavor, challenging you to adapt your strategy to shifting objectives and hostile environments.
            </p>
            <br/><br/>
          </div>
          <div className="section">
            <p>
              Whether you are playing a quick one-off mission or a long, epic <a className="underline" href="#campaigns">campaign</a>, the rules for playing each Mission are the same:
            </p>
            
            <ol>
              <li>Select a Mission</li>
              {/* <li>(Optional) Select a Secondary Mission</li>*/}
              <li>Select a Battlefield</li>
              <li>Set up your Squads</li>
              <li>Play!</li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="section">
        <div className="section">
          <h3 className="text-center">Mission List</h3>
          <div className="twocols">
            {
              missions.filter((mission) => mission.active && (!mission.missionType || mission.missionType == 'Primary')).map((mission) => (
                <div className="section" key={mission.missionId}>
                  <MissionBlock mission={mission} showDescription={true} />
                </div>
              ))
            }
          </div>
        </div>

        <div className="" style={{pageBreakBefore: 'always'}}>
          <h3 id="battlefields" className="text-center">Battlefields</h3>
          <div className="twocols">
            After selecting a Mission, pick or randomly select one of the following battlefields. The Mission will be played on that Battlefield.<br/>
            The Galaxy is a dangerous and deadly place; each Battlefield has <strong>Effects</strong> that affect your Units or transform the Battlefield itself.<br/>
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

        <div className="section hidden">
          <h3 className="text-center">Secondary Missions</h3>
          <p>
            Secondary missions are optional secret missions that can be selected to add variety to your game.
            Each Squad selects or randomly picks a secondary mission before the game begins, and only reveals it to the opponent once the Mission ends.
            Each secondary mission has its own unique objective and can break a tie or steal victory from the jaws of defeat.
          </p>
        
          <div className="twocols">
            {
              missions.filter((mission) => mission.active && mission.missionType == 'Secondary').map((mission) => (
                <div className="section" key={mission.missionId}>
                  <MissionBlock mission={mission} showDescription={true} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )}
