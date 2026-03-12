
export default async function RulesGameCycle({ num }: {num?: number | null}) {
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
                Earn MP
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
              Follow the Mission's briefing to deploy your Units and spawn enemy Units.
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
                <li>Each player rolls <code>1D6</code>. The Squad with the lowest result wins Initiative and chooses which Squad activates first this Turn. On a tie, re-roll.</li>
              </ol>
            </li>
            <li>
              <strong>Activate Units</strong><br/>
              The Squad with Initiative activates one unit.
              Squads then alternate activating units until all units have been activated.
              How opposing units are controlled depends on your play mode.
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
              Determine success or failure of the Mission.
            </li>
            <li>
              <strong>Earn MP</strong><br/>
              Player Squad gains MP according to the mission briefing.<br/>
              Mission Points are a campaign resource earned at the end of each mission.
              How MP is scored and spent is defined in your chosen play mode book.
            </li>
            <li>
              <strong>Apply Injuries</strong><br/>
              Roll <code>1D6</code> for each Unit that was Taken Out during the Mission, and apply the corresponding Injury.<br/>
              Injury resolution varies by play mode. The full Injury table and rules are defined in your chosen play mode book (PvE Missions, PvP Missions, or Horde Mode).
            </li>
          </ol>
        </div>
        <div className="section">
          <h3 id="activations">Alternating Activations</h3>
          <div>
            Each turn, squads alternate activating one unit at a time.
            The squad with Initiative activates first.
            This continues until all units on the battlefield have been activated.
            In PvP, each player controls their own squad.
            In PvE and Horde Mode, opposing units are controlled by NPC rules defined in the relevant play mode book.
          </div>
        </div>
      </div>
    </div>
  )}
