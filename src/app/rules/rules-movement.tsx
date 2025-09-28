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
            The Battlefield is a 15x15 grid of 40mm or 1.5in Squares. All movement and distance/range measurements are done by counting Squares.<br/>
            You can bring your own battlefield, or use our print-at-home <a className="underline" href="/tools">Battlefields</a> with the tiles and Squares ready to go.
          </p>
          <p>
            If you prefer to play without a grid, see <a className="underline" href="#inchesconversion">Playing Without a Grid</a> for details.
          </p>
          <h4 id="tiles">Tiles</h4>
          <p>
            The Battlefield is divided into 9 equal Tiles, each composed of 5x5 Squares.<br/>
            Some missions may describe their setup in terms of a Tile's position (e.g. "Western Tile", "Center Tile", "SouthEast Tile").
            Before the mission, both players should agree which way is North on the Battlefield, then refer to this diagram to find the right Tile.
            <img src="/img/rules/Tiles.jpg" style={{width: '35%'}} />
          </p>
          <h4 id="movement">Movement</h4>
          <p>When a Unit moves on the Battlefield, the maximum distance it can travel is <code>3</code> Squares. Movement can be done along any cardinal direction (North, South, East, West) or in diagonal (North-East, North-West, South-East, South-West).</p>
        </div>
        
        <div className="section">
          <h4 id="squares">Squares</h4>
          <p>All movement and distance measurements are measured in Squares. No need for tape measures, gauges, or rulers!<br/>
          Using a grid provides simplicity of movement and measurement and avoids imprecision in moving miniatures and checking weapon ranges.
          If you don't have a gridded play area, you can use a ruler and convert each Square to 2in.</p>
        </div>
        <div className="section">
          <h4 id="adjacent-squares">Adjacent Squares</h4>
          <p>All 8 Squares surrounding a given Square are considered to be <strong>Adjacent</strong> to that Square. When selecting a valid target for <a className="underline" href="#combat">Melee combat</a>, the attacker and its target must be in Adjacent Squares.
          Two Squares that are on different elevations are not considered to be Adjacent.<br/>
          If a wall that is 1 Square or taller is between two Squares, those two Squares are not considered to be Adjacent.</p>
          <img src="/img/rules/Adjacent.webp" style={{width: '35%'}} />
          <em>The Squares marked <strong>A</strong> are Adjacent to the Unit. The Squares marked <strong>NA</strong> are blocked by a wall and are not Adjacent to the Unit.</em>
        </div>
        <div className="section">
          <h4 id="attack-of-opportunity">Attack of Opportunity</h4>
          <p>
            When a Unit Moves or Dashes out of a Square that is Adjacent to an enemy Unit, that enemy may immediately perform a free Melee attack against the moving Unit.
            This is called an <strong>Attack of Opportunity</strong>.<br/>
            If the moving Unit is Adjacent to multiple enemies, only one of those enemies may perform an Attack of Opportunity, though they still get support in the Melee Combat Action.<br/>
            The moving Unit may choose to spend some or all of its remaining movement Squares to blunt the attack.
            For each Square of movement it spends in this way, reduce the number of attack dice the enemy rolls (the weapon's <code>ATT</code> stat) by <code>1</code>.<br/>
            Each Unit can perform only one Attack of Opportunity per Turn.
          </p>
        </div>
        <div className="section">
          <h4 id="distances-and-range">Distances And Range</h4>
          <p>To measure the distance between two Squares (for example, to check if a target is within the Range of a given Ranged Weapon), only measure on the Horizontal plane; ignore vertical distance.</p>
          <p>
            The target is considered to be in range of that weapon if the distance in Squares is equal to or lower than the weapon's range.<br/>
            If a Ranged weapon does not have a specified Range (<code>RNGx</code>), its range is infinite.
          </p>
          <img src="/img/rules/Range.webp" style={{width: '35%'}} /><br/>
          <em>The Unit has a Ranged weapon with a range of <code>3</code>.
          The bugs marked in <strong>green</strong> are within range, while the bugs marked in <strong>red</strong> are out of range.</em>
        </div>
        <div className="section">
          <h4 id="occupied-squares">Occupied Squares</h4>
          <p>Two Units cannot share the same Square; each Square can only be occupied by a maximum of 1 Unit.<br/>
          A Unit cannot pass through a Square that is occupied by an enemy Unit. A Unit may pass through a Square that is occupied by a Squadmate, but cannot end its move on that Square.
          A Unit may end their movement in a Square that is Adjacent to an enemy Unit (to prepare for Melee Combat).</p>
        </div>
        <div className="section hidden">
          <h4 id="difficult-terrain">Difficult Terrain</h4>
          <p>Some Squares will be marked as &quot;Difficult&quot;, indicating that they take more effort to traverse. Entering a Difficult Square only costs 1 Square (as normal), but leaving that Square to another Square costs 2 Squares.<br/>If a Unit moves from one Difficult Square to another Difficult Square, cost remains 2 Squares.</p>
        </div>
        <div className="section">
          <h4 id="vertical-movement">Vertical Movement</h4>
          <p>If there is a wall 1 Square high between two Squares (and they are on the same level), moving across that wall costs 2 Squares.<br/>
          Climbing up vertical terrain costs 1 Square per vertical Square, plus 1 Square for the horizontal direction desired.<br/>
          Note that for a Unit to climb a wall, that wall must be mutually agreed by all players to be Climbable at the start of the battle. Generally these walls will be easily identifiable with a ladder or other visual marker indicating it is climbable.<br/>
          Climbing down a wall follows the same rules as climbing up, but vertical movement costs 1 less Square.</p>
          <img className="inline px-2" src="/img/rules/ClimbUp.webp" style={{width: '35%'}} />
          <img className="inline px-2" src="/img/rules/ClimbDown.webp" style={{width: '35%'}} />
        </div>
      </div>
    </div>
  )}
