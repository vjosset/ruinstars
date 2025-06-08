import { GAME } from '@/lib/config/game_config'

export default async function RulesCombat() {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title" id="combat">
        7. Combat
      </h2>
      <div className="twocols">
        <div className="">
          <h3>Ranged Combat</h3>
          <h4>Sequence</h4>
          <ol>
            <li>
              <strong>Select Target</strong>
              <ol>
                <li>The Attacker selects one of its Ranged weapons for use in this attack</li>
                <li>
                  The Attacker selects a valid target. The target must be:
                  <ul>
                    <li>Not Adjacent to the Attacker or the Attacker's Squadmates</li>
                    <li>Within the Weapon's range (<code>RNGx</code>)</li>
                    <li>In the Attacker's <a href="#line-of-sight">Line Of Sight</a></li>
                  </ul>
                  Note that a Unit may not perform this action if it is <a href="#adjacent">Adjacent</a> to any enemy Units.
                </li>
              </ol>
            </li>
            <li>
              <strong>Roll Attacks</strong> - Determine if the Attacker's weapon reached the Target
              <ol>
                <li>Attacker rolls one Attack die for each of the selected weapon's <code>ATT</code> (Attacks).</li>
                <li>
                  Each Attack die result that is equal to or lower than the Weapon's <code>SKL</code> Skill is a successful strike.
                  Attack rolls of <code>1</code> are Critical successes and count as two successful strikes, and die results of {GAME.DICE_BASIS} are always failures.
                </li>
                <li>Each successful strike inflicts 1 Damage on the Target (so two successful strikes means 2 total Damage).</li>
              </ol>
            </li>
            <li>
              <strong>Roll Armor Saves</strong> - Determine how much Damage the Attacker inflicted on the Target<ol>
                <li>The Target rolls one die for each point of Damage inflicted by the Attacker's weapon.</li>
                <li>
                  If an Armor Save die result is equal to or lower than the Target's <code>ARM</code>, then the Target's Armor absorbs the damage from this strike.<br/>
                  Armor Save rolls of <code>1</code> are Critical Saves and count as two saves.
                </li>
                <li>If an Armor Save die result is higher than the target's <code>ARM</code>, the save is failed and the target loses 1 <code>HIT</code> for each failed save.</li>
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
                <td className="px-1">If the Target is in <a href="#cover">cover</a> (only partially visible to the Attacker), the Target gets one automatic Armor Save (without having to roll it)</td>
              </tr>
              <tr>
                <th className="px-1">High&nbsp;Ground</th>
                <td className="px-1">If the Attacker is at least 2 Squares higher than its Target, the Target does not benefit from Cover</td>
              </tr>
            </tbody>
          </table>
          
          <div className="section">
            <h4 id="line-of-sight">Line Of Sight</h4>
            <p>
              A Target is said to be in an Attacker's <strong>Line of Sight</strong> if two uninterrupted lines can be drawn from one of the corners of the Square occupied by the Attacker to the two closest corners of the Square occupied by the Target.<br/>
              A Unit cannot target an enemy Unit for Ranged Combat if there are other Units on that Line of Sight (i.e. a Unit cannot shoot &quot;through&quot; other Units).<br/>
              <img src="/img/rules/LineOfSight.jpg" width="50%" />
            </p>
          </div>
          <div className="section">
            <h4 id="cover">Cover</h4>
            <p>
              If a Target is only partially visible to the Attacker (for example, there is a short wall between the two Units), that Target is said to be in cover.
              Cover only applies to Ranged attacks; there is no Cover benefit for Melee attacks.<br/>
              To determine whether a Target is in Cover, the following conditions must be met:
            </p>
            <ul>
              <li>
                  The piece of terrain blocking the Attacker's full view of the Target occupies at least one side of the Target Square.
              </li>
              <li>
                The Attacker can "see" no more than 2 of the following: The Target's legs, the Target's torso, the Target's head.<br/>
                If the Attacker can see none of these in full, the Attacker cannot fire its weapon at the Target.<br/>
                If the Attacker can see all three of these in full, the Target does not get the benefit of cover.
              </li>
            </ul>
          
            <div className="grid grid-cols-2 gap-4">
              <div>
                <img 
                  src="/img/rules/Cover01.jpg" 
                  className="mb-2" 
                  alt="Example of unit in cover" 
                />
                The targeted enemy is in Cover because the blocking terrain element occupies on of its Square's edges.
              </div>
              <div>
                <img 
                  src="/img/rules/Cover02.jpg" 
                  className="mb-2" 
                  alt="Example of unit not in cover" 
                />
                The targeted enemy is not in Cover because the blocking terrain element does not occupy any of the Target Square's edges.
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <h3>Melee Combat</h3>
          <h4>Sequence</h4>
          <ol>
            <li>
              <strong>Select Target</strong>
              <ol>
                <li>The Attacker selects one of their Melee weapons for use in this attack</li>
                <li>
                  The Attacker selects a valid target. The target must be Adjacent to the Attacker.
                </li>
              </ol>
            </li>
            <li>
              <strong>Roll Attacks</strong> - Determine if the Attacker's weapon reached the Target
              <ol>
                <li>Attacker rolls one Attack die for each of the selected weapon's <code>ATT</code> (Attacks).</li>
                <li>
                  Each Attack die result that is equal to or lower than the Weapon's <code>SKL</code> Skill is a successful strike.
                  Attack rolls of <code>1</code> are Critical successes and count as two successful strikes, and die results of {GAME.DICE_BASIS} are always failures.
                </li>
                <li>Each successful strike inflicts 1 Damage on the Target (so two successful strikes means 2 total Damage).</li>
              </ol>
            </li>
            <li>
              <strong>Roll Armor Saves</strong> - Determine how much Damage the Attacker inflicted on the Target
              <ol>
                <li>The Target rolls one die for each point of Damage inflicted by the Attacker's weapon.</li>
                <li>
                  If an Armor Save die result is equal to or lower than the Target's <code>ARM</code>, then the Target's Armor absorbs the damage from this strike.<br/>
                  Armor Save rolls of <code>1</code> are Critical Saves. In Melee combat, a Critical Save counts as one save but inflicts 1 Melee Damage on the Attacker.<br/>
                  These Critical Saves can chain back and forth between the Attacker and the Target, so if the Attacker rolls a Critical Save, it can inflict 1 Damage on the Target, which in turn can roll a Critical Save and inflict 1 Damage on the Attacker, and so on.
                </li>
                <li>If an Armor Save die result is higher than the target's <code>ARM</code>, the save is failed and the target loses 1 <code>HIT</code> for each failed save.</li>
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
                <td className="px-1">For each of the Attacker's Squadmates Adjacent to the Target, the Attacker may re-roll one Attack die.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )}
