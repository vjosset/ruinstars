import { GAME } from '@/lib/config/game_config'

export default async function RulesCoreMechanics({ num }: {num?: Number | null}) {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="core-mechanics">
        {num && `${num}. `}Core Mechanics
      </h2>
      <div className="section twocols">
        <div className="section">
          <h3 id="dice-rolls">Dice Rolls</h3>
          <p>
            {GAME.NAME} uses {GAME.DICE_BASIS}-sided dice for all rolls. These will be indicated throughout the rules as <code>D{GAME.DICE_BASIS}</code>.<br/>
            Some rolls will require more than one die. For those, the number of dice to roll will be indicated before <code>D{GAME.DICE_BASIS}</code>.<br/>
            For example, to indicate a roll of 3 dice: <code>3D{GAME.DICE_BASIS}</code>. To indicate a roll of 1 die: <code>1D{GAME.DICE_BASIS}</code>.
          </p>
          <p>
            Some rules and abilities will include rolling a `D3`. To rall a `D3`, simply roll a normal `D6` and divide the result by 2, rounding up.
          </p>
          <table>
            <thead>
              <tr className="border-border border-b">
                <th><code>D6</code> Roll</th>
                <th><code>D3</code> Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1-2</th>
                <td>1</td>
              </tr>
              <tr>
                <th>3-4</th>
                <td>2</td>
              </tr>
              <tr>
                <th>5-6</th>
                <td>3</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="section">
          <h4 id="successes-and-failures">Successes and Failures</h4>
          <p>
            When rolling against a Unit or weapon stat, a die roll is a success if its value is equal to or lower than that stat.<br/>
            Irrespective of any modifiers or Stats, a die roll of <code>{GAME.DICE_BASIS}</code> is always a failure.<br/>
            Die rolls of <code>1</code> are always Critical successes and may have special effects depending on the roll in question (see Combat).
          </p>
          <h4 id="re-rolls">Re-Rolls</h4>
          <p>
            Certain rules and events allow you to re-roll a die. In those cases, announce the die to be re-rolled, pick it up, and roll it again.
            Once a die is re-rolled, its result is final and it cannot be re-rolled again.
          </p>
        </div>
      </div>
    </div>
  )}
