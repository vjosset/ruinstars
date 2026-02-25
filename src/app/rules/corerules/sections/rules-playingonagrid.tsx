import BattlefieldDiagram from '@/components/shared/BattlefieldDiagram'
import { adjacencyDiagram, coverDiagram, lineOfSightDiagram, lineOfSightSpecialDiagram, movementDiagram, rangeDiagram, verticalMovementDiagram } from '@/src/data/griddiagrams'
import Link from 'next/link'

export default async function RulesPlayingOnAGrid({ num }: {num?: number | null}) {
  return (
    <>
      <div className="section">
        <h2 className="text-center py-3 font-title"   id="playingonagrid">
          {num && `${num}. `}Playing On a Grid
        </h2>
        <div className="twocols">
          <p>
            Ruinstars supports two ways to play: freeform measurement in inches, and squares. Both are fully supported. Neither is a simplified version of the other. If you're new to the game, or just prefer not to reach for a ruler, the grid is a clean on-ramp with no mechanical trade-offs.
            <br/>
            The print-at-home <Link href="/rules#battlefields">Battlefields</Link> tile into a 12x12 grid of 2" squares across nine letter- or A4-sized pages. Printed and assembled, the board is 24"x24".
          </p>
          <h3>Grid Rules</h3>
          <div className="section">
            <h4>General Rules</h4>
            To keep things simple, treat each <code>square</code> as <code>2"</code>.
            This applies to weapon ranges (so a weapon with <code>RNG6"</code> has a range of <code>3 squares</code>) and abilities that have a <code>within x"</code> requirement.
            Similarly, the Move action is 3 Squares (= 6") and the Dash action is 1 Square (= 2").
          </div>
          <div className="section">
            <h4>Adjacency</h4>
            <div className="columns-2">
              <div>
                Two units are Adjacent if they occupy contiguous squares on the same level with no wall between them. Diagonal squares count as contiguous.<br/>
                All rules that depend on Adjacency, including Control, apply unchanged.
              </div>
              <div>
                <BattlefieldDiagram diagram={adjacencyDiagram} />
              </div>
            </div>
          </div>
          <div className="section">
            <h4>Movement</h4>
            <div className="columns-2">
              <div>
                A Move action allows up to 3 squares of movement. A Dash allows 1 square.
              </div>
              <div>
                <BattlefieldDiagram diagram={movementDiagram} />
              </div>
            </div>
            <div className="columns-2">
              <div className="section">
                <strong>Climbing Up:</strong> Each square of vertical height costs 1 square of movement. Cresting the top or going over an edge onto the lower surface costs 1 additional square horizontally.<br/>
                <strong>Climbing Down:</strong> Same as climbing up, but the first square of vertical descent is free (minimum 0).
              </div>
              <div>
                <BattlefieldDiagram diagram={verticalMovementDiagram} />
              </div>
            </div>
          </div>
          <div className="section">
            <h4>Range</h4>
            <div className="columns-2">
              <div>
                Count squares between the Attacker and its Target, as if the Attacker was moving horizontally (ignore vertical distance).
                <br/>
                <em>Unit <code>A</code> has a weapon with range 6" (<code>RNG6"</code>), which translates to <code>3 Squares</code>.
                Target 1 is in range, and Target 2 is out of range (4 Squares away).</em>
              </div>
              <div>
                <BattlefieldDiagram diagram={rangeDiagram} />
              </div>
            </div>
          </div>
          <div className="section">
            <h4>Line of Sight</h4>
            Draw two uninterrupted lines from any corner of the attacker's square to the two nearest corners of the target's square. If both lines reach their destination without crossing a wall, the target is in line of sight.
            <div className="columns-2">
              <BattlefieldDiagram diagram={lineOfSightDiagram} />
              <BattlefieldDiagram diagram={lineOfSightSpecialDiagram} />
            </div>
          </div>
          <div className="section">
            <h4>Cover</h4>
            <div className="columns-2">
              <div>
                A target is in Cover if a wall occupies any edge of the square it occupies.
              </div>
              <div>
                <BattlefieldDiagram diagram={coverDiagram} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
