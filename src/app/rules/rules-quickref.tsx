export default async function RulesQuickRef() {
  return (
    <>
      <div className="section">
        <h2 className="text-center py-3 font-title"   id="quickref">
          15. Quick Reference
        </h2>
        <div className="twocols">
          <div className="section">
            <h4>Turn Sequence</h4>
            <ol>
              <li><strong>Start of Turn:</strong> Each Squad performs its "Start of Turn" abilities (if any)</li>
              <li><strong>Tactical Orders:</strong> Each player rolls for Tactical Orders. Results of 1-3 are successes (+1 TO)</li>
              <li><strong>Initiative:</strong> Each player rolls-off for Initiative. Lowest result has the initiative</li>
              <li><strong>Battlefield Events:</strong> The player with the initiative resolves battlefield events</li>
              <li>
                <strong>Alternate Activations:</strong> Starting with the player with the initiative, players take turns activating one unit at a time until all units have activated.
                Once per Turn, the Squad with the fewest Standing Units may delay one of its activations.
              </li>
              <li><strong>End of Turn:</strong> Each Squad performs its "End of Turn" abilities (if any)</li>
              <li><strong>Reset:</strong> Reset Tactical Orders (TOs) to zero</li>
            </ol>
          </div>
          <div className="section">
            <h4>Basic Actions</h4>
            <ul>
              <li><strong>Move (1ACT):</strong> The Unit moves up to 3 Squares</li>
              <li><strong>Dash (1ACT):</strong> The Unit moves up to 1 Square</li>
              <li><strong>Ranged Combat (1ACT):</strong> The Unit performs a Ranged Combat attack against a valid target</li>
              <li><strong>Melee Combat (1ACT):</strong> The Unit performs a Melee Combat attack against a valid target</li>
            </ul>
            A Unit may perform the same Action multiple times during its activation, but it costs 1 additional ACT each time it is repeated.
          </div>

          <div className="section">
            <h4>Ranged Combat</h4>
            <ol>
              <li>Select target: must be in range, in LoS, not adjacent to attacker.</li>
              <li>Roll <code>ATT</code> dice: ≤ <code>SKL</code> = 1 damage (1 = crit, 6 = fail; crit = 2 damage).</li>
              <li>Target rolls <code>ARM</code> saves per damage: ≤ <code>ARM</code> = save (1 = 2 saves, 6 = fail).</li>
              <li>Cover: Target gains 1 auto-save if partially obscured.</li>
              <li>High Ground: Attacker 2+ levels higher negates cover.</li>
            </ol>
          </div>
          <div className="section">
            <h4>Melee Combat</h4>
            <ol>
              <li>Select target: must be adjacent.</li>
              <li>Roll <code>ATT</code> dice: ≤ <code>SKL</code> = damage (1 = crit, 6 = fail; crit = 2 damage).</li>
              <li>Target rolls <code>ARM</code> saves: ≤ <code>ARM</code> = save.</li>
              <li>Critical Save: blocks 1 damage <em>and</em> inflicts 1 Melee damage back (can chain).</li>
              <li>Support: +1 attack re-roll per adjacent squadmate vs target.</li>
            </ol>
          </div>
          <div className="section">
            <h4>Crates</h4>
            Roll 1D6, then remove the Crate from the Battlefield:
            <ol>
              <li>
                <strong>TO</strong>: The Unit's Squad immediately gains 1 TO.
              </li>
              <li>
                <strong>Stims</strong>: The Unit may immediately perform a free Basic or Mission Action.
              </li>
              <li>
                <strong>Map</strong>: The Unit or one of its Squadmates may immediately perform a Move Action.
              </li>
              <li>
                <strong>MedPack</strong>: The Unit gains a MedPack. This MedPack can be used for 1 ACT during any of this Unit's activations. When used, the Unit or an Adjacent Squadmate regain 1D3 lost HIT. The MedPack may not be used if this Unit or the selected Squadmate are Adjacent to any Enemy Units. Once used, remove the MedPack from the Unit.
              </li>
              <li>
                <strong>Nothing</strong>: The Crate is empty, nothing happens.
              </li>
              <li>
                <strong>Booby Trap</strong>: The crate explodes, dealing 2 Ranged Damage to all Units in its current Square and all Adjacent Squares.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </>
  )
}
