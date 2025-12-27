import { GAME } from '@/lib/config/game_config'

export default async function RulesGameCycle({ num }: {num?: Number | null}) {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title" id="game-cycle">
        {num && `${num}. `}Game Cycle
      </h2>
      <div className="section">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="border border-main rounded-md p-2">
            <h3 className="text-center font-title tracking-wide mb-2">MISSION START</h3>
            
            <div className="grid gap-y-4 px-8">
              <div className="rounded-md bg-main px-3 py-2 text-center text-sm uppercase tracking-wide">
                Select Mission
              </div>
              <div className="rounded-md bg-main px-3 py-2 text-center text-sm uppercase tracking-wide">
                Prepare Battlefield
              </div>
              <div className="rounded-md bg-main px-3 py-2 text-center text-sm uppercase tracking-wide">
                Deploy Units
              </div>
            </div>
          </div>
          <div className="border border-main rounded-md p-2">
            <h3 className="text-center font-title tracking-wide mb-2">TURNS (1-4)</h3>
            
            <div className="grid gap-4 px-8">
              <div className="rounded-md bg-main px-3 py-2 text-center text-sm uppercase tracking-wide">
                Start of Turn
              </div>
              <div className="rounded-md bg-main px-3 py-2 text-center text-sm uppercase tracking-wide">
                Activate Units
              </div>
              <div className="rounded-md bg-main px-3 py-2 text-center text-sm uppercase tracking-wide">
                End of Turn
              </div>
            </div>
          </div>
          <div className="border border-main rounded-md p-2">
            <h3 className="text-center font-title tracking-wide mb-2">MISSION END</h3>
            
            <div className="grid gap-4 px-8">
              <div className="rounded-md bg-main px-3 py-2 text-center text-sm uppercase tracking-wide">
                Victory
              </div>
              <div className="rounded-md bg-main px-3 py-2 text-center text-sm uppercase tracking-wide">
                Earn XP
              </div>
              <div className="rounded-md bg-main px-3 py-2 text-center text-sm uppercase tracking-wide">
                Apply Injuries
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section twocols">
        <div className="section">
          <h3>Mission Start</h3>
          <ol>
            <li>
              <strong>Select Mission</strong><br/>
              Select a Mission, scripted operation, or Horde mode
            </li>
            <li>
              <strong>Prepare Battlefield</strong><br/>
              Prepare the battlefield as defined by the selected mission. Place terrain, markers, and items such as crates and barrels.
            </li>
            <li>
              <strong>Deploy Units</strong><br/>
              Before deployment begins, both players roll off. The player who wins the roll-off then chooses which Squad gains the Initiative for Turn 1.  
              Follow the Mission's briefing to deploy your Units. If both teams "deploy before Turn 1," players take turns placing one Unit at a time on the Battlefield, starting with the player who does not have the Turn 1 Initiative.  
              The Squad with the Turn 1 Initiative will activate their Unit first in the Alternating Activations sequence.
            </li>
          </ol>
        </div>
        <div className="section">
          <h3>Turns</h3>
          <em>Missions typically have four Turns, but some Missions may have different conditions.</em>
          <ol>
            <li>
              <strong>Start of Turn</strong><br/>
              <ol>
                <li>Mark all Units as Ready (not Activated)</li>
                <li>Resolve all &quot;Start of Turn&quot; skills or events</li>
                <li>
                  Roll-off for Initiative.
                  Lowest roll wins Initiative and will Activate first.
                </li>
                <li>Roll for <a className="underline" href="#tactical-orders">Tactical Orders</a> for the Turn</li>
                <li>The Squad with the Initiative rolls for the Battlefield's Events (if any) for this Turn</li>
              </ol>
            </li>
            <li>
              <strong>Activate Units</strong><br/>
              The Squad with the Initiative activates their first Unit, then Squads alternate activating their Units until all Units have been activated.<br/>
              See also <a className="underline" href="#alternating-activations">Alternating Activations</a>.
            </li>
            <li>
              <strong>End of Turn</strong><br/>
              Resolve all &quot;End of Turn&quot; actions or events. Score Mission Points according to the selected Mission.
            </li>
          </ol>
        </div>
        <div className="section">
          <h3>Mission End</h3>
          <ol>
            <li>
              <strong>Victory</strong><br/>
              Determine the winner of the Mission according to the Mission briefing.
            </li>
            <li>
              <strong>Earn XP</strong><br/>
              If playing a Campaign or Operation mission, apply XP and Medals to the Units.
              See also <a href="#campaigns" className="underline">Campaigns</a>.
            </li>
            <li>
              <strong>Apply Injuries</strong><br/>
              If playing a Campaign or Operation mission, roll <code>1D6</code> for each Unit that was Taken Out at the end of the Mission, and apply the corresponding Injury.
              See also <a href="#campaigns" className="underline">Campaigns</a>.
            </li>
          </ol>
        </div>
        <div className="section">
          <h3 id="alternating-activations">Alternating Activations</h3>
          <p>
            {GAME.NAME} uses <strong>Alternating Activations</strong>:<br/>
            During each Turn, Squads take turns Activating one Unit that has not yet been activated: Player 1 activates their first Unit, then player 2 activates their first Unit, followed by player 1 activating their second Unit etc. 
            This ensures dynamic play and avoids having to wait long periods of time before you can actually <em>do</em> something with your Squad.
          </p>
          <p>
            Each player takes alternating turns activating the Units in their Squad. For example, in order:
          </p>
          <ol>
            <li>Player 1 activates their first Unit</li>
            <li>Player 2 activates their first Unit</li>
            <li>Player 1 activates their second Unit</li>
            <li>Player 2 activates their second Unit</li>
            <li>(etc)</li>
          </ol>
          <p>At the start of each Turn, all Units are marked as "Ready". As each Unit completes their Activation, they are marked as "Activated".</p>
          <p>
            If one Squad has at least 2 more Standing Units than the other, the Squad with fewer Standing Units may choose to delay one activation once per Turn. 
            In that case, the Squad with more Units activates two of its Units in a row, then alternating Activations resume normally.
          </p>
        </div>
        <div className="section">
          <h3 id="mission-points">Mission Points</h3>
          <p>
            Mission Points (MP) determine the winner of the battle. Each Mission will define conditions under which a Squad can score Mission Points.
            At the end of the Mission, the Squad with the most MP wins.
          </p>
        </div>
      </div>


    </div>
  )}
