export default async function RulesMovement() {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title" id="movement">
        6. Movement
      </h2>
      <div className="section twocols">
        <div className="section">
          <h3>Battlefield</h3>
          <p>
            The Battlefield is where your Squad executes its Missions. The Ruinstars battlefield is typically 60cm x 60cm, or 2' x 2'.<br/>
            <h4>Tiles</h4>
            <p>
              Divide the battlefield into nine equal Tiles:
              West/Center/East by North/Center/South.
              Each Tile measures 5x5 Paces (or 20cm x 20cm/8" x 8").
              <br/>
              Some missions reference a Zone by its position (e.g., “Western Tile,” “Center Tile,” “South-East Tile").
              Before the game, agree which table edge is North.
              <img src="/img/rules/Tiles.jpg" style={{width: '35%'}} />
            </p>
          </p>
          <h4>Measuring Distance</h4>
          <p>
            Ruinstars measures all distances in <strong>Paces</strong>.
            One Pace is 40mm or about 1.5".
            All the rules, abilities, and missions use Paces to measure and define distances.

            Play on any table: Set your terrain and measure Paces with a ruler or our printable Pace Gauges
            <span className="printonly">at the end of this rulebook or</span>
            { ' ' }available as PDFs or STLs on the <a className="underline" href="/tools">Tools</a> page.
            
            <div className="block">
              <strong>Grid Mode</strong><br/>
              Rather than using our gauges or a tape measure, you can also play on a 15x15 grid of 40 mm squares.
              In Grid Mode, each Unit or item occupies one square, and movement can be done in orthogonal or diagonal directions.<br/>
              See the <a className="underline" href="/tools">Tools</a> for print-at-home battlefields with the grid superimposed.<br/>
            </div>
          </p>

          <h4>Distances And Range</h4>
          To measure the distance between two Units or Items (for example, to check if a target is within a weapon's Range),
          only measure on the horizontal plane; ignore vertical distance.<br/>

          The target is considered to be in range of that weapon if the distance in Paces is equal to or lower than the weapon's range.
          If a Ranged weapon does not have a specified Range (<code>RNGx</code>), its range is infinite.

          <div className="section">
            <h4 id="adjacent">Adjacency</h4>
            <p>Units are considered to be <strong>Adjacent</strong> when the two closest points of their bases are less than 1 Pace apart.
            Two Units that are on different elevations are not considered Adjacent.<br/>
            If a wall stands between two Units, those Units are not Adjacent.</p>
          </div>
        </div>
        <div className="section">
          <h3>Movement</h3>
          <p>
            When Units Move, they travel up to <code>3</code> Paces along any path.
            A Unit may move through Squadmates, but may not move through enemy Units.
            A Unit may not move along a path if that path would have its base cover any part of an enemy Unit's base at any point.

            <div className="block">
              <strong>Grid Mode</strong><br/>
              Move the Unit <code>3</code> squares orthogonally or diagonally.
              A Unit may not move diagonally between two enemy Units, or through an enemy-occupied square.
            </div>
          </p>
          
          <h4>Vertical Movement</h4>
          Climbing up vertical terrain costs 1 Pace per vertical Pace, plus 1 Pace for the horizontal direction desired.
          Note that for a Unit to climb a wall, that wall must be mutually agreed by all players to be Climbable at the start of the battle.
          Generally these walls will be easily identifiable with a ladder or other visual marker indicating it is climbable.
          Climbing down a wall follows the same rules as climbing up, but the first vertical Pace is free.<br/>
          <img className="inline px-2" src="/img/rules/ClimbUp.webp" style={{width: '35%'}} />
          <img className="inline px-2" src="/img/rules/ClimbDown.webp" style={{width: '35%'}} />

          <h4>Attack of Opportunity</h4>
          When a Unit Moves or Dashes out of a position that is Adjacent to an enemy Unit, that enemy may immediately perform a free Melee attack against the moving Unit. This is called an <strong>Attack of Opportunity</strong>.<br/>
          If the moving Unit is Adjacent to multiple enemies, only one of those enemies may perform an Attack of Opportunity, though they still get support in the Melee Combat Action.
          The moving Unit may choose to spend some or all of its remaining movement Paces to blunt the attack. For each Pace of movement it spends in this way, reduce the number of attack dice the enemy rolls (the weapon's <code>ATT</code> stat) by 1.<br/>
          Each Unit can perform only one Attack of Opportunity per Turn.
        </div>
      </div>
    </div>
  )}
