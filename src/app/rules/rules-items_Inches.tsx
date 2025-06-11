import { GAME } from '@/lib/config/game_config'

export default async function RulesItems() {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="items">
        12. Items
      </h2>
      <div className="section twocols">
        <p>
          You may choose to add items to the battlefield that have special purposes and behaviors, and some missions may require the placement of items.
        </p>

        <div className="section">
          <h5>Crates</h5>
          <p>
            If you choose to play with Crates, place 4 Crates in random spots on the battlefield.
            To open a crate, a Unit must be Adjacent to the crate and spend 1 ACT to open it. This counts as a Mission action.
            When opened, roll 1D{GAME.DICE_BASIS} to determine the contents of that Crate:
          </p>
          <ol>
            <li>
              <strong>MP</strong>: The Unit's Squad immediately gains 1 MP.
            </li>
            <li>
              <strong>TO</strong>: The Unit's Squad immediately gains 1 TO.
            </li>
            <li>
              <strong>Free Action</strong>: The Unit may immediately perform a free Basic or Mission Action.
            </li>
            <li>
              <strong>MedPack</strong>: The Unit gains a MedPack. This MedPack can be used for 1 <code>ACT</code> during this Unit's activation. When used, the Unit or an Adjacent Squadmate regain 1D3 lost <code>HIT</code>. Once used, remove the MedPack from the Unit.
            </li>
            <li>
              <strong>Nothing</strong>: The Crate is empty, nothing happens.
            </li>
            <li>
              <strong>Booby Trap</strong>: The crate explodes, dealing 2 Ranged Damage to all Units within 2" of its position, then it is removed from the battlefield.
            </li>
          </ol>
        </div>

        <h5>Barrels</h5>
        <p>
          Barrels are explosive containers that can be attacked, causing an explosion.<br/>
          If you choose to play with Barrels, randomly place 5 Barrels on the battlefield:<br/>
          <img src="/img/rules/BarrelPlacement.jpg" width="50%" /><br/>
          Barrels may be attacked in Ranged or Melee combat. The Barrel is a Unit that cannot roll Armor Saves; if it is attacked in combat and at least one strike is successful, it explodes.
          When a Barrel explodes, it causes an explosion dealing 2 Ranged Damage to all Units within 2" of its position, then it is removed from the Battlefield.<br/>
        </p>
      </div>
    </div>
  )}
