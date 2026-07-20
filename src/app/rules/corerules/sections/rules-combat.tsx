import BattlefieldDiagram from '@/components/shared/BattlefieldDiagram'
import { aooDiagram, coverDiagram, lineOfSightDiagram, lineOfSightSpecialDiagram } from '@/src/data/corerulesdiagrams'
import { GAME } from '@/lib/config/game_config'

export default async function RulesCombat({ num }: {num?: number | null}) {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title" id="combat">
        {num && `${num}. `}Combat
      </h2>
      <div className="twocols">
        <div>
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
                    <li>Be within the Weapon's range (<code>RNGx</code>)</li>
                    <li>Be in the Attacker's <a className="underline" href="#line-of-sight">Line of Sight</a></li>
                  </ul>
                  A Unit may not perform this action if it is <a className="underline" href="#adjacent">Adjacent</a> to any enemy Units.
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
                <li>The Target rolls one die per successful attack die. Note that a Critical Strike counts as <b>one</b> successful attack die.</li>
                <li>
                  Each result equal to or less than the Target's <code>ARM</code> (Armor) is a successful Save.<br/>
                  A roll of <code>1</code> is a <strong>Critical Save</strong>. The Target immediately chooses one of the following:
                  <ul>
                    <li><strong>Block 2: </strong>Block 2 points of Damage</li>
                    <li><strong>Sidestep: </strong>Block 1 point of Damage and Target performs a free Dash Action</li>
                  </ul>
                </li>
                <li>A roll of <code>{GAME.DICE_BASIS}</code> is always a failure</li>
                <li>Each unsaved point of Damage causes the Target to lose 1 <code>HIT</code></li>
                <li>If a Unit reaches zero <code>HIT</code>, it is Taken Out and removed from the battlefield.</li>
              </ol>
            </li>
          </ol>
          <div className="section">
            <h4>Modifiers</h4>
            <table>
              <thead>
                <tr className="border-b border-border">
                  <th className="px-1">Condition</th>
                  <th className="px-1">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className="px-1">Cover</th>
                  <td className="px-1">If the Target is in <a className="underline" href="#cover">cover</a>, the Target may re-roll one Save die.</td>
                </tr>
                <tr>
                  <th className="px-1">High&nbsp;Ground</th>
                  <td className="px-1">If the Attacker is at least 4" higher than its Target, the Target does not benefit from Cover</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="section">
            <h4 id="line-of-sight">Line of Sight</h4>
            A Target is said to be in an Attacker's <strong>Line of Sight</strong> if two uninterrupted lines can be drawn from one of the point of the Attacker's base to two opposite edges of the Target's base.<br/>
            A Unit cannot target an enemy Unit for Ranged Combat if there are other Units on that Line of Sight (i.e. a Unit cannot shoot &quot;through&quot; other Units).  
          
            <h6>Special Cases</h6>
            These rules mean that in some cases, a Unit may be able to target an enemy Unit even if that Unit cannot target them in return.
            <div className="columns-2">
              <BattlefieldDiagram diagram={lineOfSightDiagram} />
              <BattlefieldDiagram diagram={lineOfSightSpecialDiagram} />
            </div>
          </div>
          <div className="section">
            <h4 id="cover">Cover</h4>
            <div className="columns-2">
              <p className="section">
                If a Target is only partially visible to the Attacker (for example, there is a short wall between the two Units), that Target is said to be in cover.
                Cover only applies to Ranged attacks; there is no Cover benefit for Melee attacks.<br/>
                A Target is in Cover if a piece of terrain blocks the Attacker's full view of the Target and that terrain is within 1" of the Target.
              </p>
              <BattlefieldDiagram diagram={coverDiagram} />
            </div>
          </div>
        </div>
      </div>
      <div className="section twocols">
        <div className="section">
          <h3>Melee Combat</h3>
          <h4>Sequence</h4>
          <ol>
            <li>
              <strong>Select Target</strong>
              <ol>
                <li>The Attacker selects one of their Melee weapons to use</li>
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
                <li>The Target rolls one die per successful attack die. Note that a Critical Strike counts as <b>one</b> successful attack die.</li>
                <li>
                  Each result equal to or less than the Target's <code>ARM</code> (Armor) is a successful Save.<br/>
                  A roll of <code>1</code> is a <strong>Critical Save</strong>. The target immediately chooses one of the following:
                  <ul>
                    <li><strong>Block 2: </strong>Block 2 points of Damage</li>
                    <li><strong>Retaliate: </strong>Block 1 point of Damage and inflict 1 point of Damage on the Attacker (see <a className="underline" href="#retaliation">Retaliation</a>)</li>
                    <li><strong>Pushback: </strong>Block 1 point of Damage and push the Attacker back (see <a className="underline" href="#pushback">Pushback</a>)</li>
                  </ul>
                </li>
                <li>A roll of <code>{GAME.DICE_BASIS}</code> is always a failure</li>
                <li>Each unsaved point of Damage causes the Target to lose 1 <code>HIT</code></li>
                <li>If a Unit reaches zero <code>HIT</code>, it is Taken Out and removed from the battlefield.</li>
              </ol>
            </li>
          </ol>

          <h4>Modifiers</h4>
          <table>
            <thead>
              <tr className="border-b border-border">
                <th className="px-1">Condition</th>
                <th className="px-1">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="px-1">Support - Attacker</th>
                <td className="px-1">For each of the Attacker's Squadmates Adjacent to the Target, the Attacker may re-roll one Attack die.</td>
              </tr>
              <tr>
                <th className="px-1">Support - Target</th>
                <td className="px-1">For each of the Target's Squadmates Adjacent to the Target, the Target may re-roll one Save die.</td>
              </tr>
            </tbody>
          </table>

          <div className="section">
            <h4 id="retaliation">Retaliation</h4>
            <p>
              When a defender chooses to block 1 point of Damage and inflict 1 point of Damage on the Attacker, the Attacker immediately rolls one Armor Save for that returned Damage.
            </p>
            <ul>
              <li>A successful Save blocks the Damage. The exchange ends.</li>
              <li>A failed Save causes the Attacker to lose 1 <code>HIT</code>. The exchange ends.</li>
              <li>A Critical Save reflects 1 point of Damage back to the original defender, who then rolls one Armor Save. This continues until one combatant rolls a normal Save or a failure.</li>
            </ul>
            <p>During Retaliation, Critical Saves only reflect Damage. The block decision does not apply.</p>
          </div>

          <div className="section">
            <h4 id="pushback">Pushback</h4>
            <p>
              This option is only available to the primary target of the Melee attack.
              Secondary targets (e.g. from Chain Reaction/CHR) cannot choose Pushback.
            </p>
            <ul>
              <li>Move the Attacker directly away from the Target, in a straight line, up to 2". This follows normal Movement rules: the Attacker cannot be moved through terrain or other Units' bases. If there is not enough room to move the full 2", move the Attacker as far as the space allows. This may be 0".</li>
              <li>This movement does not trigger an Attack of Opportunity.</li>
              <li>If this movement causes the Attacker to fall off terrain, it takes Damage equal to the vertical distance it fell, in inches, divided by 2.</li>
              <li>Pushback can only happen once per Melee attack. If the Target rolls more than one Critical Save in the same attack and chooses Pushback on more than one of them, each still blocks 1 point of Damage as normal, but the Attacker is only moved once.</li>
            </ul>
          </div>
        </div>

        <div className="section">
          <h4 id="attack-of-opportunity">Attacks of Opportunity</h4>
          <p>
            When a Unit Moves or Dashes out of Adjacency to an enemy Unit, that enemy may immediately perform a free Melee attack against the moving Unit.
            This is called an <strong>Attack of Opportunity</strong>.<br/>
            If the moving Unit is Adjacent to multiple enemies, only one of those enemies may perform an Attack of Opportunity, though they still get support in the Melee Combat Action.<br/>
            The moving Unit may choose to spend some or all of its remaining movement inches to blunt the attack instead of moving.
            For each 2" of movement it spends in this way, reduce the number of attack dice the enemy rolls (the weapon's <code>ATT</code> stat) by <code>1</code>.<br/>
            Each Unit can perform only one Attack of Opportunity per Turn.
          </p>
          <BattlefieldDiagram diagram={aooDiagram} />
        </div>
      </div>
    </div>
  )}
