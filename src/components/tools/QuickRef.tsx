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
        <h4>Sequence</h4>
        <ol>
          <li>
            <strong>Select Target</strong>
            <ol>
              <li>The Attacker selects one of their Ranged weapons to use</li>
              <li>
                The Attacker selects a valid Target. The Target must:
                <ul>
                  <li>Not be Adjacent to the Attacker or the Attacker's Squadmates</li>
                  <li>Be within the Weapon&#39;s range (<code>RNGx</code>)</li>
                  <li>Be in the Attacker&#39;s <a href="#line-of-sight">Line Of Sight</a></li>
                </ul>
                A Unit may not perform this action if it is <a href="#adjacent">Adjacent</a> to any enemy Units.
              </li>
            </ol>
          </li>
          <li>
            <strong>Roll Attacks</strong>
            <ol>
              <li>Roll a number of dice equal to the weapon's <code>ATT</code> (Attacks).</li>
              <li>
                Each die result equal to or less than the weapon's <code>SKL</code> (Skill) is a successful strike and inflicts 1 point of Damage on the Target.
                <ul>
                  <li>A roll of <code>1</code> is a <strong>Critical Strike</strong> and inflicts 2 points of Damage</li>
                  <li>A roll of <code>{GAME.DICE_BASIS}</code> is always a failure</li>
                </ul>
              </li>
            </ol>
          </li>
          <li>
            <strong>Roll Armor Saves</strong>
            <ol>
              <li>The Target rolls one die per point of Damage inflicted.</li>
              <li>
                Each result equal to or less than the Target's <code>ARM</code> (Armor) is a successful Save.
                <ul>
                  <li>A roll of <code>1</code> is a <strong>Critical Save</strong> and counts as 2 Saves</li>
                  <li>A roll of <code>{GAME.DICE_BASIS}</code> is always a failure</li>
                </ul>
              </li>
              <li>Each unsaved point of Damage causes the Target to lose 1 <code>HIT</code></li>
              <li>If a Unit reaches zero <code>HIT</code>, it is Taken Out and removed from the battlefield.</li>
            </ol>
          </li>
        </ol>
        <h4>Modifiers</h4>
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
              <td className="px-1">If the Target is in <a href="#cover">cover</a>, the Target gets one automatic Armor Save (without having to roll it)</td>
            </tr>
            <tr>
              <th className="px-1">High&nbsp;Ground</th>
              <td className="px-1">If the Attacker is at least 4" above the Target, the Target does not benefit from Cover</td>
            </tr>
          </tbody>
        </table>
        
        <div className="section">
          <h4 id="line-of-sight">Line Of Sight</h4>
          <p>
            A Target is in an Attacker&#39;s <strong>Line of Sight</strong> if two uninterrupted lines can be drawn from one point of the Attacker's base to two opposite points of the Target's base.<br/>
            A Unit cannot shoot through other Units.<br/>
            <img src="/img/rules/LineOfSight.jpg" width="50%" />
          </p>
        </div>
        <div className="section">
          <h4 id="cover">Cover</h4>
          A Target is in Cover if:
          <ul>
            <li>
              A terrain element is Adjacent to the Target, and the Attacker can see no more than two of the following parts of the Target:
              <ul>
                <li>Target's Legs</li>
                <li>Target's Torso</li>
                <li>Target's Head</li>
              </ul>
              If none of these are visible in full, the Target cannot be targeted. If all three are visible, the target does not benefit from Cover.<br/>
              Cover only applies to Ranged attacks; there is no Cover benefit for Melee attacks.
            </li>
          </ul>
        </div>
      </div>

      <div className="section">
          <h3>Melee Combat</h3>
          <h4>Sequence</h4>
          <ol>
            <li>
              <strong>Select Target</strong>
              <ol>
                <li>The Attacker selects one of their Ranged weapons to use</li>
                <li>The Target must be Adjacent to the Attacker</li>
              </ol>
            </li>
            <li>
              <strong>Roll Attacks</strong>
              <ol>
                <li>Roll a number of dice equal to the weapon's <code>ATT</code> (Attacks).</li>
                <li>
                  Each die result equal to or less than the weapon's <code>SKL</code> (Skill) is a successful strike and inflicts 1 point of Damage on the Target.
                  <ul>
                    <li>A roll of <code>1</code> is a <strong>Critical Strike</strong> and inflicts 2 points of Damage</li>
                    <li>A roll of <code>{GAME.DICE_BASIS}</code> is always a failure</li>
                  </ul>
                </li>
              </ol>
            </li>
            <li>
              <strong>Roll Armor Saves</strong>
              <ol>
                <li>The Target rolls one die per point of Damage inflicted.</li>
                <li>
                  Each result equal to or less than the Target's <code>ARM</code> (Armor) is a successful Save.
                  <ul>
                    <li>
                      A roll of <code>1</code> is a <strong>Critical Save</strong>:
                      <ul>
                        <li>It blocks 1 point of Damage, and</li>
                        <li>Inflicts 1 point of Melee Damage on the Attacker. The Attacker then rolls their own Armor Saves for that returned Damage.</li>
                        <li>This effect can chain: if the Attacker then rolls a Critical Save, they return damage to the Target, and so on.</li>
                      </ul>
                    </li>
                    <li>A roll of <code>{GAME.DICE_BASIS}</code> is always a failure</li>
                  </ul>
                </li>
                <li>Each unsaved point of Damage causes the Target to lose 1 <code>HIT</code></li>
                <li>If a Unit reaches zero <code>HIT</code>, it is Taken Out and removed from the battlefield.</li>
              </ol>
            </li>
          </ol>
          <h4>Modifiers</h4>
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
                <td className="px-1">For each of the Attacker&#39;s Squadmates Adjacent to the Target, the Attacker may re-roll one Attack die.</td>
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
