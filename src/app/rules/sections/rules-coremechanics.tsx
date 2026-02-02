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
            In cases where one Squad has at least 2 more Standing Units than the other, the Squad with fewer Units may choose to delay one activation once per Turn.
            In that case, the Squad with more Units activates two of its Units in a row.
          </div>
        </div>
        {/*
        <div className="section">
          <h3 id="paces">Paces</h3>
          <p>
            All movement and distance measurements are measured in <strong>Paces</strong>.<br/>
            A Pace is typically 40mm or about 1.5". Use a ruler, our use our print-at-home <a className="underline" href="/tools">Gauges</a> for quick measurement.
            If you prefer, playing on a <a className="underline" href="#playingonagrid">grid</a> simplifies movement and measurement and avoids imprecision in moving miniatures and checking weapon ranges.
          </p>
        </div>
        */}
      </div>

    </div>
  )}
