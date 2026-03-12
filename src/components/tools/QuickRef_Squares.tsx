
export default function QuickRef() {
  return (
    <div className="rules">
      <div className="section">
        <h3>Crates</h3>
        Roll 1D6, then remove the Crate from the Battlefield:
        <ol>
          <li>
            <strong>TO</strong><br/>The Unit's Squad immediately gains 1 Tactical Order.
          </li>
          <li>
            <strong>Relay Order</strong><br/>The Unit may immediately perform a free Basic or Mission Action.
          </li>
          <li>
            <strong>Map</strong><br/>The Unit or one of its Squadmates may immediately perform a Move Action.
          </li>
          <li>
            <strong>MedPack</strong><br/>The Unit gains a MedPack. This MedPack can be used for <code>1 ACT</code> during any of this Unit's activations. When used, the Unit or an Adjacent Squadmate regain <code>1D3</code> lost <code>HIT</code>. The MedPack may not be used if this Unit or the selected Squadmate are Adjacent to any Enemy Units. Once used, remove the MedPack from the Unit.
          </li>
          <li>
            <strong>Nothing</strong><br/>The Crate is empty, nothing happens.
          </li>
          <li>
            <strong>Booby Trap</strong><br/>The crate explodes, dealing 2 Ranged Damage to all Adjacent Units.
          </li>
        </ol>
      </div>

      <div className="section">
        <h3>Barrels</h3>
        <p>
        If you choose to play with Barrels, randomly place 5 on the battlefield.
        Barrels may be attacked in Ranged or Melee combat. The Barrel is a Unit that cannot roll Armor Saves; if it is attacked in combat and at least one strike is successful, it explodes.
        When a Barrel explodes, it causes an explosion dealing 2 Ranged Damage to all Adjacent Units, then it is removed from the Battlefield.
        </p>
      </div>
      
      <div className="section">
        <h3>Ranged Combat</h3>
        <ol>
          <li>Select Target: Must be in range, in LoS, not Adjacent to attacker.</li>
          <li>Roll <code>ATT</code> dice: Dice at or below <code>SKL</code> deal 1 damage (<code>1</code> = Crit: 2 damage).</li>
          <li>Target Rolls <code>ARM</code> saves per damage: Dice at or below <code>ARM</code> save 1 damage.</li>
          <li>Critical Save: Blocks 2 damage.</li>
          <li>Cover: Target gains 1 auto-save if partially obscured.</li>
          <li>High Ground: Attacker 2+ levels higher than Target negates cover.</li>
        </ol>
      </div>

      <div className="section">
        <h3>Melee Combat</h3>
        <ol>
          <li>Select Target: Must be adjacent.</li>
          <li>Roll <code>ATT</code> dice: Dice at or below <code>SKL</code> deal 1 damage (<code>1</code> = Crit: 2 damage).</li>
          <li>Target Rolls <code>ARM</code> saves per damage: Dice at or below <code>ARM</code> save 1 damage.</li>
          <li>Critical Save: Blocks 1 damage <em>and</em> inflicts 1 Melee damage back (can chain).</li>
          <li>Support - Attacker: +1 attack re-roll per adjacent squadmate vs target.</li>
          <li>Support - Target: +1 save re-roll per adjacent squadmate.</li>
        </ol>
      </div>

      <div className="section">
        <h3>Campaign Homebase</h3>
        <ul>
          <li>Remove all Deceased Units from your Squad</li>
          <li>Add 2 GP to your Squad's Max GP</li>
          <li>Add 2 GP for each Victory in the previous Operation</li>
          <li>Remove one Injury from remaining Units</li>
          <li>Make changes to your Squad's selected Gear</li>
          <li>Add Spoils Of War to eligible Units</li>
          <li>Recruit new Units into the Squad</li>
        </ul>
      </div>
    </div>
  )
}
