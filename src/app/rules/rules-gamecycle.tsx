import { GAME } from "@/lib/config/game_config";

export default async function RulesGameCycle() {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title" id="game-cycle">
        3. Game Cycle
      </h2>
      <div className="section twocols">
        <p>A game of {GAME.NAME} is played in the following order:</p>
        <ol>
          <li>
            <strong>Mission Start</strong>
            <ol>
              <li><strong>Select <a href="2.Missions">Mission</a></strong><br/>
                Select a Mission to play. All players must reach consensus on the Mission to play.
              </li>
              <li><strong>Select <a href="#squads-and-units">Squad</a></strong><br/>
                Select one of your Squads to take on the Mission
              </li>
              <li><strong>Prepare Battlefield</strong><br/>
                Set up your Battlefield according to the Mission&#39;s briefing. This includes placing buildings and other terrain features, placing objectives, and any other actions defined by the selected Mission.
              </li>
            </ol>
          </li>
          <li>
            <strong>Turns</strong>
            <ol>
              <li>Turn 1</li>
              <li>Turn 2</li>
              <li>Turn 3</li>
              <li>Turn 4</li>
            </ol>
          </li>
          <li><strong>Mission End</strong><br/>
            At the end of Turn 4, tally the total Mission Points for each Squad. The Squad with the highest number of Mission Points is declared the winner of the battle.
          </li>
        </ol>
        <h3 id="turns">Turns</h3>
        <p>During each Turn:</p>
        <ol>
          <li>
            Reset Tactical Orders to zero for both Squads (Tactical Orders do not carry over from Turn to Turn).
          </li>
          <li>
            Start of Turn
            <ol>
              <li>Mark all Units as Ready (not Activated)</li>
              <li>Resolve all &quot;Start of Turn&quot; actions or events</li>
              <li>
                Roll-off for Initiative:<br/>
                Lowest score wins Initiative and will Activate first; both sides re-roll any ties until a winner is determined
              </li>
              <li>Roll for <a href="#tactical-orders">Tactical Orders</a> for the Turn</li>
              <li>The Squad with the Initiative rolls for the Mission&#39;s Events (if any) for this Turn</li>
            </ol>
          </li>
          <li>
            Unit activations
            <ol>
              <li>
                The Squad with the Initiative activates their first Unit, then Squads alternate activating their Units until all Units have been activated.<br/>
                See also <a href="#alternate-activations">Alternate Activations</a>.
              </li>
            </ol>
          </li>
          <li>
            End Of Turn
            <ol>
              <li>Resolve all &quot;End of Turn&quot; actions or events</li>
              <li>Score Mission Points according to the selected Mission</li>
            </ol>
          </li>
        </ol>
        <div className="section">
          <h3 id="alternate-activations">Alternate Activations</h3>
          <p>{GAME.NAME} uses Alternate Activations:<br/>
          During each turn, players take alternating turns to Activate their Squad&#39;s Units. So player 1 activates their first Unit, then player 2 activates their first Unit, followed by player 1 activating their second Unit etc. This ensures dynamic play and avoids having to wait long periods of time before you can actually <em>do</em> something with your Squad.</p>
          <p>Each player takes alternating turns activating the Units in their Squad. For example, in order:</p>
          <ol>
            <li>Player 1 activates their first Unit</li>
            <li>Player 2 activates their first Unit</li>
            <li>Player 1 activates their second Unit</li>
            <li>Player 2 activates their second Unit</li>
            <li>Player 1 activates their third Unit</li>
            <li>Player 2 activates their third Unit</li>
            <li>(etc)</li>
          </ol>
          <p>At the start of each Turn, all Units are marked as "Ready". As each Unit completes their Activation, they are marked as "Activated".</p>
          <p>
            In cases where one Squad has at least 2 more Standing Units than the other, the Squad with fewer Units may choose to delay one activation once per Turn.
            In that case, the Squad with more Units activates two of its Units in a row.
          </p>
        </div>

        <h3 id="mission-points">Mission Points</h3>
        <p>
          Mission Points (MP) determine the winner of the battle. Each Mission will define conditions under which a Squad can score Mission Points. At the end of the Mission, the Squad with the most MP wins.<br/>
          Each Battlefield will have Objectives placed on it. Depending on the mission, these Objectives may need to be controlled to score Mission Points.<br/>
          A Unit is said to control an Objective if it is Adjacent to that Objective and if the Unit is not <a href="#adjacent">Adjacent</a> to any enemy Units.<br/>
          At the end of each Turn, your Squad scores one Mission Point for each Objective that one of your Units controls.<br/>
          <img src="/img/rules/ObjectivePlacement.jpg" width="50%" />
        </p>
      </div>
    </div>
)}
