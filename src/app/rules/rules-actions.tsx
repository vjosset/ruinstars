import { GAME } from '@/lib/config/game_config'

export default async function RulesActions() {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="actions">
        5. Actions
      </h2>
      <div className="section twocols">
        <p>
          During its activation, a Unit can perform a number of Actions up to its <code>ACT</code> stat <em>(see <a href="#stat-cards">StatCards</a>)</em>.<br/>
          Each Action costs a number of Action Points or <code>ACT</code>.</p>
        <p>Actions with an <code>ACT</code> cost can be performed by spending the Unit's <code>ACT</code> Action Points or the Squad's <a href="#tactical-orders">Tactical Orders</a>, or any combination of the two (for example, if a Unit's skill costs <code>2 ACT</code>, you can spend 1 <code>ACT</code> + 1 <code>TO</code> to perform that action).<br/>
          Actions with a <code>TO</code> cost can only be performed by spending the Squad's <a href="#tactical-orders">Tactical Orders</a>.<br/><br/>
          Each action costs its listed number of <code>ACT</code> the first time it is performed in a Unit's Activation. Each time that same action is repeated in the same Activation, it costs one additional <code>ACT</code>.<br/>
          For example, a Unit with 3 <code>ACT</code> may perform 2 Moves in its Activation. The first Move costs 1 <code>ACT</code>, and the second one costs 2 <code>ACT</code>.
        </p>
        <h3 id="basic-actions">Basic Actions</h3>
        <p>All Units can perform the following Actions during their Activation:</p>
        <table>
          <thead>
            <tr className="line-bottom-light"><th>Action</th><th>&nbsp;&nbsp;ACT&nbsp;&nbsp;</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><th>Move</th><td className="text-center">1</td><td>The Unit <a href="#movement">moves</a> up to 6".</td></tr>
            <tr><th>Dash</th><td className="text-center">1</td><td>The Unit moves up to 2", following the same rules as a <a href="#movement">Move</a>.</td></tr>
            <tr><th>Ranged Combat</th><td className="text-center">1</td><td>The Unit makes a Ranged attack against a valid target. See <a href="#combat">Ranged Combat</a>.</td></tr>
            <tr><th>Melee Combat</th><td className="text-center">1</td><td>The Unit makes a Melee attack against an Adjacent target. See <a href="#combat">Melee Combat</a>.</td></tr>
            <tr><th>Pick Up</th><td className="text-center">1</td><td>The Unit picks up a marker or token that is Adjacent.</td></tr>
            <tr><th>Drop</th><td className="text-center">1</td><td>The Unit drops a marker or token in an Adjacent space.</td></tr>
            <tr><th>Give</th><td className="text-center">1</td><td>The Unit passes a marker or token to an Adjacent Squadmate. Neither Unit can be <a href="#adjacent">Adjacent</a> to any enemy Units.</td></tr>
            <tr><th>Open/Close Door</th><td className="text-center">1</td><td>The Unit opens or closes an Adjacent door.</td></tr>
            <tr><th>Mission Action</th><td className="text-center">-</td><td>A special action defined by the current the Mission Briefing.</td></tr>
          </tbody>
        </table>
        <h3 id="tactical-orders">Tactical Orders</h3>
        <p>At the start of each turn, each player rolls <code>3D{GAME.DICE_BASIS}</code> and adds 1 die for each of the Squad's Units' <code>Leader x</code> Special Rule. For example, if your Leader is still in play and has the <code>Leader 2</code> Special Rule, you would roll <code>5D{GAME.DICE_BASIS}</code> for Tactical Orders (3 base dice for Tactical Orders plus 2 dice provided by your Leader).<br/>
        If you do not have a Unit with the <code>Leader</code> Special Rule on the Battlefield, you do not get their Tactical Order bonus and just roll <code>3D{GAME.DICE_BASIS}</code>.</p>
        <p>For each die result of <code>1-3</code>, you will have one Tactical Order. Tactical Orders allow Units to perform more Actions than their <code>ACT</code> Action limit.</p>
        <p>At the end of each Turn, any unused Tactical Orders are lost; they do not carry over to the following Turn.</p>
        <p>Note that rolling for Tactical Orders cannot be modified by using Tactical Orders.</p>
        <div className="nopagebreak">
          <h5 id="using-tactical-orders">Using Tactical Orders</h5>
          <p>During a Unit's activation, you may spend any number of Tactical Orders you obtained for that Turn on more actions for that Unit.</p>
          <p>Tactical Orders may be spent to:</p>
          <ul>
            <li>Perform a Unit's <code>TO</code> Skill. Unless otherwise indicated, <code>TO</code> skills cannot be performed more than once per Turn</li>
            <li>Perform an Additional Basic Action (Move, Dash, Shoot, Melee, etc.) during a Unit's Activation.</li>
            <li>Re-roll any one die for any of your rolls (including during one of your opponent's Units' Activations, for example during Melee combat).</li>
            <li>
              Change the result of one of your rolled dice by +/- 1.
              Note that this is stackable; you can spend 2 <code>TO</code> to reduce the result of a die by 2, or spend multiple <code>TO</code> on multiple dice in a given roll.
              Modifying a die roll in this way does not trigger roll-specific effects (e.g. reducing an Attack die roll of <code>2</code> to <code>1</code> does not mean it is a Critical success).
            </li>
          </ul>
        </div>
        <h3 id="mission-actions">Mission Actions</h3>
        <p>Certain Missions will define special Actions that can be performed by Units. Read the Mission Briefing to determine if the Mission defines any such Actions.</p>
      </div>
    </div>
  )}
