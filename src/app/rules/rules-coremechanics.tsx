import { GAME } from '@/lib/config/game_config'

export default async function RulesCoreMechanics() {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="core-mechanics">
        2. Core Mechanics
      </h2>
      <div className="section twocols">
        <div className="section">
          <h3 id="dice-rolls">Dice Rolls</h3>
          <p>{GAME.NAME} uses {GAME.DICE_BASIS}-sided dice for all rolls. These will be indicated throughout the rules as <code>D{GAME.DICE_BASIS}</code>.<br/>
        Some rolls will require more than one die. For those, the number of dice to roll will be indicated before <code>D{GAME.DICE_BASIS}</code>.<br/>
        For example, to indicate a roll of 3 dice: <code>3D{GAME.DICE_BASIS}</code>. To indicate a roll of 1 die: <code>1D{GAME.DICE_BASIS}</code>.</p>
          <h4 id="successes-and-failures">Successes and Failures</h4>
          <p>
          When rolling against a character or weapon stat, a die roll is a success if its value is equal to or lower than that stat.<br/>
          Irrespective of any modifiers or Stats, a die roll of <code>{GAME.DICE_BASIS}</code> is always a failure.<br/>
          Die rolls of <code>1</code> are always Critical successes and may have special effects depending on the roll in question (see Combat).
          </p>
          <h4 id="re-rolls">Re-Rolls</h4>
          <p>
          Certain rules and events allow you to re-roll a die. In those cases, announce the die to be re-rolled, pick it up, and roll it again.
          Once a die is re-rolled, its result is final and it cannot be re-rolled again.
          </p>
        </div>
        
        <div className="section">
          <h3 id="activations">Alternating Activations</h3>
          <div>
            During each Turn, Squads take turns Activating one Unit that has not yet been activated.<br/>
            For example, during each Turn:
            <ul className="section">
              <li>Squad A activates its first Unit and performs Actions</li>
              <li>Squad B activates its first Unit and performs Actions</li>
              <li>Squad A activates its second Unit and performs Actions</li>
              <li>Squad B activates its second Unit and performs Actions</li>
              <li>etc.</li>
            </ul>
            Once per Turn, if a Squad has fewer Standing Units than its opponent, it may choose to delay its next Activation.
            In this case, the Squad with more Standing Units activates its next Unit instead, then alternating Activations resume normally.
          </div>
        </div>
      </div>

    </div>
  )}
