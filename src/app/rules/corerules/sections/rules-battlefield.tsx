import Link from 'next/link'
import RulesAnchors from '../../sections/rules-anchors'

export default async function RulesBattlefield({ num }: {num?: number | null}) {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title" id="combat">
        {num && `${num}. `}The Battlefield
      </h2>
      <div className="twocols">
        <h3>Battlefield Size</h3>
        <p>
          The standard battlefield is <strong>2' x 2' (60cm x 60cm)</strong>.
          Other valid formats include <strong>3' x 3'</strong>, <strong>2' x 3'</strong>, and <strong>30" x 22"</strong>.<br/>
          Use any flat surface with enough room for terrain and maneuvering.
          Ruinstars also provides <Link className="underline" href="/rules">print-at-home battlefields</Link> with a pre-marked grid.<br/>
          If you prefer to play on a grid, see <Link className="underline" href="#playingonagrid">Playing on a Grid</Link>.
        </p>
        
        <h3>Terrain</h3>
        <p>
          Terrain is any physical object placed on the battlefield before the game begins: ruins, walls, crates, elevated platforms, doors.
          Terrain creates cover, blocks line of sight, and adds vertical space to fight over.<br/>
          Before the game begins, all players agree on what terrain is present and how it behaves.
          A surface can only be climbed if all players agree it is climbable, and it should be clearly identifiable as such: ladders, handholds, or similar features.
          A door can only be opened or closed if all players agree it is operable.<br/>
          Terrain does not move or change during the mission unless a rule explicitly causes it to.
        </p>
        
        <h3>Anchors</h3>
        <RulesAnchors />
      </div>
    </div>
  )}
