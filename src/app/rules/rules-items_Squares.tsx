import { GAME } from '@/lib/config/game_config'

export default async function RulesItems() {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="items">
        8. Items
      </h2>
      <div className="section twocols">
        <p>
          You may choose to add items to the battlefield that have special purposes and behaviors, and some missions may require the placement of items.
        </p>

        <div className="section">
          <h4>Crates</h4>
          <p>
            If you choose to play with Crates, place 4 Crates on the battlefield in random Squares.
            To open a crate, a Unit must occupy the same Square as the crate and spend 1 ACT to open it. This counts as a Mission action.
            When opened, roll 1D{GAME.DICE_BASIS} to determine the contents of that Crate, then remove it from the Battlefield:
          </p>
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
      <div className="section">
        <h4>Barrels</h4>
        <p>
          Barrels are explosive containers that can be attacked, causing an explosion.<br/>
          If you choose to play with Barrels, randomly place 5 Barrels on the battlefield:<br/>
          <img src="/img/rules/BarrelPlacement.jpg" width="50%" /><br/>
          Barrels may be attacked in Ranged or Melee combat. The Barrel is a Unit that cannot roll Armor Saves; if it is attacked in combat and at least one strike is successful, it explodes.
          When a Barrel explodes, it causes an explosion dealing 2 Ranged Damage to all Units in its current Square and all Adjacent Squares, then it is removed from the Battlefield.<br/>
        </p>
      </div>
    </div>
  )}
