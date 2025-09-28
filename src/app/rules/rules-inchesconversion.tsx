export default async function RulesInchesConversion() {
  return (
    <>
      <div className="section">
        <h2 className="text-center py-3 font-title"   id="inchesconversion">
          14. Playing Without a Grid
        </h2>
        <div className="twocols">
          <div className="section">
            <p>
              Ruinstars measures every distance in <strong>Paces</strong>. One Pace is 40mm (about 1.5 inches), and Pace gauges make freeform play quick and consistent.<br/>
              Download printable gauge sets (PDF or STL) from our <a className="underline" href="/tools">Tools</a> page, lay the gauge along the path you want to travel (or use a ruler marked in 40mm steps), and move the model the listed number of Paces.
            </p>
          </div>
          <div className="section">
            <h4>Core Measurements</h4>
            <ul>
              <li>1 Pace = 40mm (≈1.5 inches)</li>
              <li>Move Action: up to 3 Paces</li>
              <li>Dash Action: up to 1 Pace</li>
              <li>Adjacency: Units are Adjacent when their bases are within 1 Pace</li>
            </ul>
          </div>
          <div className="section">
            <h4>Ranges & Terrain</h4>
            <ul>
              <li>Weapon ranges use Paces directly (e.g., <code>RNG3</code> = 3 Paces)</li>
              <li>Difficult terrain adds +1 Pace to leave it</li>
              <li>Impassable terrain cannot be crossed</li>
              <li>Blast affects the target Unit and all Adjacent Units</li>
              <li>Line of Sight: draw from one point on the attacker's base to two opposite points on the target's base</li>
              <li>Cover: stay within 1 Pace of the obscuring terrain to claim Cover</li>
            </ul>
          </div>
          <div className="section">
            <h4>Terrain Height</h4>
            <ul>
              <li>1 Level = 1 Pace of vertical distance</li>
              <li>Climbing up: add 1 Pace of movement per level</li>
              <li>Climbing down: the first level is free; each additional level costs 1 Pace</li>
            </ul>
          </div>
          <div className="section">
            <p>
              Tip: When in doubt, round in favor of smooth play. The goal is to keep the action moving instead of pausing for fine measurements.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
