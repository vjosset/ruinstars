export default async function RulesPlayingOnAGrid() {
  return (
    <>
      <div className="section">
        <h2 className="text-center py-3 font-title"   id="playingonagrid">
          14. Playing On a Grid
        </h2>
        <div className="twocols">
          <div className="section">
            <p>
              While Ruinstars is designed for freeform placement and movement on the battlefield, you can also play on a grid to simplify movement and measurements.
            </p>
          </div>
          <div className="section">
            <h3>Battlefield</h3>
            <p>
              The Battlefield is a 15x15 grid of 40mm or 1.5in Squares. All movement and distance/range measurements are done by counting Squares.<br/>
              You can bring your own battlefield, or use our print-at-home <a className="underline" href="/tools">Battlefields</a> with the tiles and Squares ready to go.
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
            <p>
              All movement and distance measurements are measured in Squares. No need for tape measures, gauges, or rulers!<br/>
              Using a grid provides simplicity of movement and measurement and avoids imprecision in moving miniatures and checking weapon ranges.
            </p>
          </div>
          <div className="section">
            <h4 id="adjacent-squares">Adjacent Squares</h4>
            <p>
              All 8 Squares surrounding a given Square are considered to be <strong>Adjacent</strong> to that Square. When selecting a valid target for <a className="underline" href="#combat">Melee combat</a>, the attacker and its target must be in Adjacent Squares.
              Two Squares that are on different elevations are not considered to be Adjacent.<br/>
              If a wall that is 1 Square or taller is between two Squares, those two Squares are not considered to be Adjacent.
            </p>
            <img src="/img/rules/Adjacent.webp" style={{width: '35%'}} />
            <em>The Squares marked <strong>A</strong> are Adjacent to the Unit. The Squares marked <strong>NA</strong> are blocked by a wall and are not Adjacent to the Unit.</em>
          </div>
        </div>
      </div>
    </>
  )
}
