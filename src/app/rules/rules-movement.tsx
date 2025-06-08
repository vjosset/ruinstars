import ImageModal from '@/components/ui/ImageModal'

export default async function RulesMovement() {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title" id="movement">
        6. Movement
      </h2>
      <div className="section twocols">
        <div className="section">
          <h3>Movement</h3>
          <p>When a Unit moves on the Battlefield, the maximum distance it can travel is 6".</p>

          <h4 id="vertical-movement">Vertical Movement</h4>
          <p>Units may climb over obstacles that are less than 2" tall without penalty. Climbing over a short wall that is 2" tall costs 2" of movement.<br/>
          When climbing up vertical terrain simply measure the vertical and horizontal distance and add them up.<br/>
          Note that for a Unit to climb a wall, that wall must be mutually agreed by all players to be Climbable at the start of the battle. Generally these walls will be easily identifiable with a ladder or other visual marker indicating it is climbable.<br/>
          Climbing down a wall follows the same rules as climbing up, but vertical movement includes 2" of free movement.</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <ImageModal 
                src="/img/rules/ClimbUp.webp" 
                alt="Climbing Up"
                className="mb-2"
              />
            Climbing up terrain
            </div>
            <div>
              <ImageModal 
                src="/img/rules/ClimbDown.webp" 
                alt="Climbing Down"
                className="mb-2"
              />
            Climbing down terrain
            </div>
          </div>
          
          <h4 id="move-through">Moving Through Units</h4>
          <p>Two Units cannot have their bases overlap.<br/>
          A Unit cannot move past an enemy Unit within 1". A Unit may move past a Squadmate within 1", but cannot end its move overlapping that Squadmate's base.
          A Unit may end their movement Adjacent to an enemy Unit (to prepare for Melee Combat).</p>

          <h4 id="adjacent">Adjacent</h4>
          <p>Two Units are considered to be <strong>Adjacent</strong> if they are within 1" of each other.
          When selecting a valid target for <a href="#combat">Melee combat</a>, the attacker and its target must be Adjacent.
          Units that are on different elevations are not considered to be Adjacent.<br/>
          If a wall that is 2" or taller is between two Units, those two Units are not considered to be Adjacent.</p>
        </div>

        <div className="section">
          <h3>Battlefield</h3>
          <p>
            The Battlefield is an area of 2'x2' (24"x24") or larger, divided into 9 equal tiles.<br/>
            Some missions may describe their setup in terms of a Tile's position (e.g. "Western Tile", "Center Tile", "Southeast Tile").
            Before the mission, both players should agree which way is North on the Battlefield, then refer to this diagram to find the right Tile.
            <ImageModal 
              src="/img/rules/Tiles.jpg" 
              alt="The battlefield's 9 tiles"
              className="mb-2 w-1/2"
            />
          </p>
        </div>

        <div className="section">
          <h4 id="distances-and-range">Distances And Range</h4>
          <p>To measure the distance between two Units or Items (for example, to check if a target is within the Range of a given Ranged Weapon),
            only measure on the Horizontal plane; ignore vertical distance.<br/>
            Measure the distance between the Units' closest points on their bases.</p>
          <p>
            The target is considered to be in range of that weapon if the distance between the two closest points on eachis equal to or lower than the weapon's range.<br/>
            If a Ranged weapon does not have a specified Range (<code>RNGx</code>), its range is infinite.
          </p>
          <ImageModal 
            src="/img/rules/Range.webp" 
            alt="Measuring range and distance between Units"
            className="mb-2 w-1/2"
          />
          <em>Remus' pistol has a range of 6" (<code>RNG6"</code>). He can target this Unit in ranged combat.</em>
        </div>
      </div>
    </div>
  )}
