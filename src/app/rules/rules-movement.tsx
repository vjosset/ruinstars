export default async function RulesMovement({ num }: {num?: Number | null}) {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title" id="movement">
        {num && `${num}. `}Movement
      </h2>
      <div className="section twocols">
        <div className="section">
          <h3>Battlefield</h3>
          <p>
            The Battlefield is typically 2' by 2', or 60cm x 60cm.
            All movement and distance/range measurements are done by counting <strong>Paces</strong>.<br/>
            You can bring your own battlefield, or use our print-at-home <a className="underline" href="/tools">Battlefields</a> with the tiles and Paces pre-marked.
          </p>
          <p>
            If you prefer to play with a grid, see <a className="underline" href="#playingonagrid">Playing on a Grid</a> for details.
          </p>
          <h4 id="tiles">Tiles</h4>
          <p>
            The Battlefield is divided into 9 equal Tiles, each being 5x5 Paces (8" or 20cm to a side).<br/>
            Some missions may describe their setup in terms of a Tile's position (e.g. "Western Tile", "Center Tile", "SouthEast Tile").
            Before the mission, both players should agree which way is North on the Battlefield, then refer to this diagram to find the right Tile.
            <img src="/img/rules/Tiles.jpg" style={{width: '35%'}} />
          </p>

          <h4 id="paces">Paces</h4>
          <p>
            All movement and distance measurements are measured in <strong>Paces</strong>.<br/>
            A Pace is 40mm or about 1.5". Use a ruler, our use our print-at-home <a className="underline" href="/tools">Gauges</a> for quick measurement.
            If you prefer, playing on a <a className="underline" href="#playingonagrid">grid</a> provides simplicity of movement and measurement and avoids imprecision in moving miniatures and checking weapon ranges.
          </p>

          <h4 id="movement">Movement</h4>
          <p>
            When a Unit performs a Move Action, the maximum distance it can travel is <code>3</code> Paces.
            Movement should be made in increments of 1 Pace. If a Unit wants to move in one direction for less than 1 Pace, it still counts as 1 Pace.
          </p>
          <p>
            A Unit may not move in a way that would require its base to cover an enemy Unit's base at any point in the movement.<br/>
          </p>
        </div>
        
        <div className="section">
          <h4 id="adjacent">Adjacent</h4>
          Two Units or Items are considered to be <strong>Adjacent</strong> if:
          <ul>
            <li>The closest edges of their bases are within 1 Pace of each other,</li>
            <li>They are on the same elevation, and</li>
            <li>There is no wall between them.</li>
          </ul>
        </div>
        
        <div className="section">
          <h4 id="control">Control</h4>
          A Unit <strong>Controls</strong> a marker or objective if all the following conditions are met:
          <ul>
            <li>The Unit is Adjacent to that marker,</li>
            <li>The Unit is not Adjacent to any enemy Units, and</li>
            <li>The marker is not Adjacent to any enemy Units</li>
          </ul>
        </div>

        <div className="section">
          <h4 id="attack-of-opportunity">Attack of Opportunity</h4>
          <p>
            When a Unit Moves or Dashes out of Adjacency to an enemy Unit, that enemy may immediately perform a free Melee attack against the moving Unit.
            This is called an <strong>Attack of Opportunity</strong>.<br/>
            If the moving Unit is Adjacent to multiple enemies, only one of those enemies may perform an Attack of Opportunity, though they still get support in the Melee Combat Action.<br/>
            The moving Unit may choose to spend some or all of its remaining movement Paces to blunt the attack.
            For each Pace of movement it spends in this way, reduce the number of attack dice the enemy rolls (the weapon's <code>ATT</code> stat) by <code>1</code>.<br/>
            Each Unit can perform only one Attack of Opportunity per Turn.
          </p>
        </div>
        <div className="section">
          <h4 id="distances-and-range">Distances And Range</h4>
          <p>
            To measure the distance between two Units or Items (for example, to check if a target is within the Range of a given Ranged Weapon),
            only measure on the Horizontal plane; ignore vertical distance.
          </p>
          <p>
            The target is considered to be in range of that weapon if the distance in Paces is equal to or lower than the weapon's range.<br/>
            If a Ranged weapon does not have a specified Range (<code>RNGx</code>), its range is infinite.
          </p>
          <img src="/img/rules/Range.webp" style={{width: '35%'}} /><br/>
          <em>The soldier has a Ranged weapon with a range of <code>3</code> Paces (<code>RNG3</code>).
          The bugs marked in <strong>green</strong> are within range, while the bugs marked in <strong>red</strong> are out of range.</em>
        </div>
        <div className="section">
          <h4 id="vertical-movement">Vertical Movement</h4>
          <p>
            Climbing up vertical terrain costs 1 Pace per vertical Pace, plus 1 Pace for the horizontal direction desired.<br/>
            Note that for a Unit to climb a wall, that wall must be mutually agreed by all players to be Climbable at the start of the battle. Generally these walls will be easily identifiable with a ladder or other visual marker indicating it is climbable.<br/>
            Climbing down a wall follows the same rules as climbing up, but vertical movement costs 1 less Pace.
          </p>
          <img className="inline px-2" src="/img/rules/ClimbUp.webp" style={{width: '35%'}} />
          <img className="inline px-2" src="/img/rules/ClimbDown.webp" style={{width: '35%'}} />
        </div>
      </div>
    </div>
  )}
