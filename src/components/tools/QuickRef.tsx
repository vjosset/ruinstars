import { GAME } from "@/lib/config/game_config";

export default function QuickRef() {
  return (
    <div className="rules">
      <h3>Crates</h3>

      <p>
        If you choose to play with Crates, place 4 Crates in random spots on the battlefield.
        To open a crate, a Unit must be Adjacent to the crate and spend 1 ACT to open it. This counts as a Mission action.
        When opened, roll 1D{GAME.DICE_BASIS} to determine the contents of that Crate:
      </p>
      <ol>
        <li><strong>MP</strong>: The Unit's Squad immediately gains 1 MP.</li>
        <li><strong>TO</strong>: The Unit's Squad immediately gains 1 TO.</li>
        <li><strong>Stims</strong>: The Unit may immediately perform one free Basic or Mission Action.</li>
        <li><strong>MedPack</strong>: The Unit gains a MedPack. This MedPack can be used for 1 ACT during and of this Unit's activations. When used, the Unit or an Adjacent Squadmate regain 1D3 lost HIT. Once used, remove the MedPack from the Unit.</li>
        <li><strong>Nothing</strong>: The crate is empty. Nothing happens.</li>
        <li><strong>Booby Trap</strong>: The crate explodes, dealing 2 Ranged Damage to all Units within 2" of its position, then it is removed from the battlefield.</li>
      </ol>

      <h3>Barrels</h3>
      <p>
        If you choose to play with Barrels, randomly place 5 on the battlefield.
        Barrels may be attacked in Ranged or Melee combat. The Barrel is a Unit that cannot roll Armor Saves; if it is attacked in combat and at least one strike is successful, it explodes.
        When a Barrel explodes, it causes an explosion dealing 2 Ranged Damage to all Units within 2" of its position, then it is removed from the Battlefield.
      </p>
      
      <div className="section">
        <h3>Ranged Combat</h3>
        <ol>
          <li>
            <strong>Select Target</strong>
            <ol>
              <li>Select one Ranged weapon</li>
              <li>
                Select a valid target:<br/>
                Not Adjacent to Attacker or its Squadmates, within the Weapon&#39;s range (<code>RNGx</code>), in the Attacker&#39;s Line Of Sight.<br/>
                Note that a Unit may not perform this action if it is <a href="#adjacent">Adjacent</a> to any enemy Units.
              </li>
            </ol>
          </li>
          <li>
            <strong>Roll Attacks</strong>
            <ol>
              <li>Roll one die for each of the selected weapon&#39;s <code>ATT</code>.</li>
              <li>
                Each Attack die result that is equal to or lower than the Weapon's <code>SKL</code>Skill is a successful strike.
                Critical rolls count as two successful strikes.
              </li>
              <li>Each successful strike inflicts 1 Damage on the Target.</li>
            </ol>
          </li>
          <li>
            <strong>Roll Armor Saves</strong>
            <ol>
              <li>Target rolls one die for each point of Damage.</li>
              <li>
                Armor rolls equal to or lower than the Target&#39;s <code>ARM</code> are successful.<br/>
                Armor Save rolls of <code>1</code> are Critical Saves and count as two saves.
              </li>
              <li>Remove 1 <code>HIT</code> from the Target for each point of unsaved Damage.</li>
            </ol>
          </li>
        </ol>
        <h5>Modifiers</h5>
        <table>
          <thead>
            <tr className="line-bottom-light">
              <th className="px-1">Condition</th>
              <th className="px-1">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="px-1">Cover</th>
              <td className="px-1">If the Target is in <a href="#cover">cover</a> (only partially visible to the Attacker), the Target gets one automatic Armor Save (without having to roll it)</td>
            </tr>
            <tr>
              <th className="px-1">High&nbsp;Ground</th>
              <td className="px-1">If the Attacker is at least 4" higher than target, the Target does not benefit from Cover</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Melee Combat</h3>
        <ol>
          <li>
            <strong>Select Target</strong>
            <ol>
              <li>Select one Melee weapon</li>
              <li>Select a valid target Adjacent to the Attacker.</li>
            </ol>
          </li>
          <li>
            <strong>Roll Attacks</strong>
            <ol>
              <li>Roll one die for each of the selected weapon&#39;s <code>ATT</code>.</li>
              <li>
                Each Attack die result that is equal to or lower than the Weapon's <code>SKL</code>Skill is a successful strike.
                Critical rolls count as two successful strikes.
              </li>
              <li>Each successful strike inflicts 1 Damage on the Target.</li>
            </ol>
          </li>
          <li>
            <strong>Roll Armor Saves</strong> - Determine how much Damage the Attacker inflicted on the Target
            <ol>
              <li>Target rolls one die for each point of Damage.</li>
              <li>
                Armor rolls equal to or lower than the Target&#39;s <code>ARM</code> are successful.<br/>
                Armor Save rolls of <code>1</code> are successful saves and deal 1 Melee Damage to the Attacker.
              </li>
              <li>Remove 1 <code>HIT</code> from the Target for each point of unsaved Damage.</li>
            </ol>
          </li>
        </ol>
        <h5>Modifiers</h5>
        <table>
          <thead>
            <tr className="line-bottom-light">
              <th className="px-1">Condition</th>
              <th className="px-1">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="px-1">Support</th>
              <td className="px-1">For each of the Attacker&#39;s Squadmates Adjacent to the Target, the Attacker gets one automatic successful strike without having to roll it.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Campaign Homebase</h3>
        <ul>
          <li>Add 2 GP to your Squad's Max GP, plus 2 GP for each Victory in the previous Operation.</li>
          <li>Remove all Injuries (except Deceased) from all Units</li>
          <li>Recruit new Units into the Squad</li>
          <li>Make changes to your Squad's selected Gear</li>
          <li>Add Spoils Of War to eligible Units (one Spoil Of War per 5 XP)</li>
        </ul>
      </div>
    </div>
  )
}
