import { SquadTypeLink } from '@/components/nav/Links'
      
<div className="section hidden">
  <h3 className="text-center">NPC Mode</h3>
  <strong>NPC Mode</strong> allows players to face an automated enemy Squad, either solo or cooperatively.
          This mode uses standard game rules, with additional behavior guidelines for AI-controlled Units.<br/>
          When playing in NPC Mode, you will need at least one <SquadTypeLink squadTypeId='NPC' squadTypeName='NPC'/> Squad.

  <h4>NPC Behavior</h4>
          Each NPC Unit Type has a defined Behavior Profile that determines how it acts during play.
          Follow the listed priorities in that profile to decide how the Unit moves, targets, and performs actions.

  <h4>Activating NPC Units</h4>
          After each player Unit activation, that same player immediately activates the next NPC Unit and follows its Behavior Profile.
          Continue alternating in this way until all Units have been activated for the Turn.

  <h4>Cooperative Play</h4>
          NPC Mode can be played solo or cooperatively.
          When playing cooperatively, players may choose one of the following formats:
  <ul>
    <li>
      <strong>Full Squads:</strong><br/> 
              Each player deploys a full 100 GP Squad.
              For each player Squad, deploy one full 100 GP NPC Squad as the enemy.<br/>
              Notes:
      <ul>
        <li>Units that are in different Squads but on the same side are not Squadmates.</li>
      </ul>
    </li>
    <li>
      <strong>Shared Squad:</strong><br/>
              Players share control of one full 100 GP Squad.
              Players take turns activating Units in that Squad.
              Deploy one full 100 GP NPC Squad as the enemy.
    </li>
    <li>
      <strong>Mini Squads:</strong><br/>
              Each player deploys a reduced-size Squad:
      <ul>
        <li>2 Players → 50 GP each</li>
        <li>3 Players → 34 GP each</li>
        <li>4 Players → 25 GP each</li>
      </ul>
              Deploy one full 100 GP NPC Squad as the enemy.<br/>
              Notes:
      <ul>
        <li>Only one Player Unit is considered the Leader when it comes to rolling TOs, and all players share TOs in each Turn.</li>
        <li>Units that are in different Squads but on the same side are not Squadmates.</li>
      </ul>
    </li>
  </ul>
</div>