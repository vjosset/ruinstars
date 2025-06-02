import { GAME } from "@/lib/config/game_config";

export default async function RulesCoreMechanics() {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="core-mechanics">
        2. Core Mechanics
      </h2>
      <div className="section twocols">
        <h3 id="dice-rolls">Dice Rolls</h3>
        <p>{GAME.NAME} uses {GAME.DICE_BASIS}-sided dice for all rolls. These will be indicated throughout the rules as <code>D{GAME.DICE_BASIS}</code>.<br/>
        Some rolls will require more than one die. For those, the number of dice to roll will be indicated before <code>D{GAME.DICE_BASIS}</code>.<br/>
        For example, to indicate a roll of 3 dice: <code>3D{GAME.DICE_BASIS}</code>. To indicate a roll of 1 die: <code>1D{GAME.DICE_BASIS}</code>.</p>
        <h5 id="successes-and-failures">Successes and Failures</h5>
        <p>
          When rolling against a character or weapon stat, a die roll is a success if its value is equal to or lower than that stat.<br/>
          Irrespective of any modifiers or Stats, a die roll of <code>{GAME.DICE_BASIS}</code> is always a failure.<br/>
          Die rolls of <code>1</code> are always Critical successes and may have special effects depending on the roll in question (see Combat).
        </p>
        <h5 id="re-rolls">Re-Rolls</h5>
        <p>
          Certain rules and events allow you to re-roll a die. In those cases, announce the die to be re-rolled, pick it up, and roll it again.
          Once a die is re-rolled, its result is final and it cannot be re-rolled again.
        </p>
      </div>

      <div className="section">
        <h3 id="activations">Alternating Activations</h3>
        <div>
          During each Turn, Squads will alternate Activating one Unit that has not yet been activated.<br/>
          For example, during each Turn:
          <ul className="section">
            <li>Squad A activates its first Unit and performs Actions</li>
            <li>Squad B activates its first Unit and performs Actions</li>
            <li>Squad A activates its second Unit and performs Actions</li>
            <li>Squad B activates its second Unit and performs Actions</li>
            <li>etc.</li>
          </ul>
          If it is a Squad's turn to activate a Unit but all its Units have already been activated and the enemy Squad has remaining Ready Units, that Squad may select one Unit to perform 1 Free Basic or Mission Action.
        </div>
      </div>
    </div>
)}
