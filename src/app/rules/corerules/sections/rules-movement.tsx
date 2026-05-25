import BattlefieldDiagram from '@/components/shared/BattlefieldDiagram'
import { adjacencyDiagram, rangeDiagram, verticalMovementDiagram } from '@/src/data/corerulesdiagrams'

export default async function RulesMovement({ num }: {num?: number | null}) {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title" id="movement">
        {num && `${num}. `}Movement
      </h2>
      <div className="section twocols">
        <div className="section">
          <p>
            When a Unit performs a Move Action, the maximum distance it can travel is <code>6"</code>.
          </p>
          <p>
            A Unit may not move in a way that would require its base to cover an enemy Unit's base at any point in the movement.<br/>
          </p>
        </div>
        
        <div className="section">
          <h4 id="adjacent">Adjacent</h4>
          Two Units or Items are considered to be <strong>Adjacent</strong> if:
          <ul>
            <li>The closest edges of their bases are within 1" of each other,</li>
            <li>They are on the same elevation, and</li>
            <li>There is no wall between them.</li>
          </ul>
          <BattlefieldDiagram diagram={adjacencyDiagram} />
        </div>
        
        <div className="section">
          <h4 id="control">Control</h4>
          A Unit <strong>Controls</strong> a marker, Unit, or objective if all the following conditions are met:
          <ul>
            <li>The Unit is Adjacent to that item,</li>
            <li>The Unit is not Adjacent to any enemy Units, and</li>
            <li>The item is not Adjacent to any enemy Units</li>
          </ul>
        </div>

        <div className="section">
          <h4 id="attack-of-opportunity">Attacks of Opportunity</h4>
          <p>
            When a Unit Moves or Dashes out of Adjacency to an enemy Unit, that enemy may immediately perform a free Melee attack against the moving Unit.
            This is called an <strong>Attack of Opportunity</strong>.<br/>
            If the moving Unit is Adjacent to multiple enemies, only one of those enemies may perform an Attack of Opportunity, though they still get support in the Melee Combat Action.<br/>
            The moving Unit may choose to spend some or all of its movement inches to blunt the attack.
            For each 2" of movement it spends in this way, reduce the number of attack dice the enemy rolls (the weapon's <code>ATT</code> stat) by <code>1</code>.<br/>
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
            The target is considered to be in range of that weapon if the distance between the two closest points of their bases is equal to or lower than the weapon's range.<br/>
            If a Ranged weapon does not have a specified Range (<code>RNGx</code>), its range is infinite.
          </p>
          <BattlefieldDiagram diagram={rangeDiagram} />
          <br/>
          <em>The soldier has a Ranged weapon with a range of <code>6"</code> (<code>RNG6</code>).
          The bugs marked in <strong>green</strong> are within range, while the bugs marked in <strong>red</strong> are out of range.</em>
        </div>
        <div className="section">
          <h4 id="vertical-movement">Vertical Movement</h4>
          <p>
            <strong>Climbing Up:</strong><br/>
            When a Unit climbs vertical terrain, it spends movement distance inch-for-inch on the vertical height, then spends an additional 1" to move onto the top of the terrain. All of this distance counts toward the Unit's total movement for the action.

            A wall or surface may only be climbed if all players agree it is Climbable at the start of the battle. Climbable terrain should be clearly identifiable, such as by ladders, handholds, or similar features.
            <br/>
            <strong>Climbing Down:</strong><br/>
            Climbing down follows the same rules, but vertical distance costs 2" less (to a minimum of 0"), representing controlled descent.
          </p>
          <BattlefieldDiagram diagram={verticalMovementDiagram} />
        </div>
      </div>
    </div>
  )}
