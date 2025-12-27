import PageBreak from '@/components/ui/PageBreak'
import IgnoreFirstMission from './rules-ignorefirstmission'

export default async function RulesActions({ num }: {num?: Number | null}) {
  return (
    <>
      <PageBreak />
      <div className="section">
        <h2 className="text-center py-3 font-title"   id="actions">
          {num && `${num}. `}Actions
        </h2>
        <div className="section twocols">
          <p>
            During its activation, a Unit can perform a number of Actions up to its <code>ACT</code> stat (see <a className="underline" href="#stat-cards">StatCards</a>).<br/>
            Each Action costs a number of Action Points or <code>ACT</code>.</p>
          <p>Actions with an <code>ACT</code> cost can be performed by spending the Unit's <code>ACT</code> Action Points or the Squad's <a className="underline" href="#tactical-orders">Tactical Orders</a>, or any combination of the two (for example, if a Unit's skill costs <code>2 ACT</code>, you can spend 1 <code>ACT</code> + 1 <code>TO</code> to perform that action).<br/>
            Actions with a <code>TO</code> cost can only be performed by spending the Squad's <a className="underline" href="#tactical-orders">Tactical Orders</a>.<br/><br/>
            Each action costs its listed number of <code>ACT</code> the first time it is performed in a Unit's Activation. Each time that same action is repeated in the same Activation, it costs one additional <code>ACT</code>.<br/>
            For example, a Unit with 3 <code>ACT</code> may perform 2 Moves in its Activation. The first Move costs 1 <code>ACT</code>, and the second one costs 2 <code>ACT</code>.
          </p>
          <h3 id="basic-actions">Basic Actions</h3>
          <p>All Units can perform the following Actions during their Activation:</p>
          <table>
            <thead>
              <tr className="border-b border-border"><th>Action</th><th>&nbsp;&nbsp;ACT&nbsp;&nbsp;</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><th>Move</th><td className="text-center">1</td><td>The Unit <a className="underline" href="#movement">moves</a> up to <strong>3</strong> Paces.</td></tr>
              <tr><th>Dash</th><td className="text-center">1</td><td>The Unit moves up to <strong>1</strong> Pace. This movement follows the same rules as a <a className="underline" href="#movement">normal Move</a>.</td></tr>
              <tr><th>Ranged Combat</th><td className="text-center">1</td><td>The Unit makes a Ranged attack against a valid target. See <a className="underline" href="#combat">Ranged Combat</a>.</td></tr>
              <tr><th>Melee Combat</th><td className="text-center">1</td><td>The Unit makes a Melee attack against an Adjacent target. See <a className="underline" href="#combat">Melee Combat</a>.</td></tr>
              <tr><th>Pick Up</th><td className="text-center">1</td><td>The Unit picks up an Adjacent marker or token.</td></tr>
              <tr><th>Drop</th><td className="text-center">1</td><td>The Unit drops a marker or token it is carrying in a position Adjacent to the Unit.</td></tr>
              <tr><th>Give</th><td className="text-center">1</td><td>The Unit passes a marker or token to an Adjacent Squadmate. The Unit cannot perform this Action if either Unit is <a className="underline" href="#adjacent">Adjacent</a> to any enemy Units.</td></tr>
              <tr><th>Open/Close Door</th><td className="text-center">1</td><td>The Unit opens or closes an Adjacent door.</td></tr>
              <tr><th>Mission Action</th><td className="text-center">-</td><td>Mission Actions are special mission-specific Actions that can be performed according to the Mission Briefing.</td></tr>
            </tbody>
          </table>

          <em>Unfamiliar terms and weapon specials are defined in the <a className="underline" href="#glossary">Glossary</a>.</em>

          <h3 id="mission-actions">Mission Actions</h3>
          <p>Certain Missions will define special Actions that can be performed by Units. Read the Mission Briefing to determine if the Mission defines any such Actions.</p>
        
          <h3 id="tactical-orders">Tactical Orders</h3>
          <IgnoreFirstMission keyword="Tactical Orders" />
          <p>
            At the start of each Turn, players roll for <strong>Tactical Orders</strong> (<code>TO</code>).
            Each roll of 1-3 is a success and give that Squad 1 <code>TO</code>.
            The number of dice to roll is:
          </p>
          <ul>
            <li><strong>Base:</strong> <code>3D6</code>. All Squads roll at least 3 dice for Tactical Orders.</li>
            <li><strong>Leader:</strong> If the Squad's Leader is still Standing, add dice for its Leader skill (e.g. "Leader 2" means roll an additional 2 dice for Tactical Orders, for a total of 5).</li>
            <li><strong>Taken Out:</strong> For each Unit that was Taken Out during the Mission, the Squad gains 1 additional Tactical Order die (e.g. if 2 Units were Taken Out, the Squad gains 2 Tactical Orders on top of the results of the roll).</li>
          </ul>
          <p>At the end of each Turn, any unused Tactical Orders are lost; they do not carry over to the following Turn.</p>
          <p>Note that rolling for Tactical Orders cannot be modified by using Tactical Orders.</p>
          <div className="nopagebreak">
            <h4 id="using-tactical-orders">Using Tactical Orders</h4>
            <p>Tactical Orders may be spent to:</p>
            <ul>
              <li>Perform a Unit's <code>TO</code> Skill. Unless otherwise indicated, <code>TO</code> skills cannot be performed more than once per Turn</li>
              <li>Perform an Additional Basic or Mission Action during a Unit's Activation.</li>
              <li>Re-roll any one die for any of your rolls (including during one of your opponent's Units' Activations, for example during Melee combat).</li>
              <li>
                Change the result of one of your rolled dice by +/- 1.
                Note that this is stackable; you can spend 2 <code>TO</code> to reduce the result of a die by 2, or spend multiple <code>TO</code> on multiple dice in a given roll.
                Modifying a die roll in this way does not trigger roll-specific effects (e.g. reducing an Attack die roll of <code>2</code> to <code>1</code> does not mean it is a Critical success).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )}
