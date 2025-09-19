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
              While Ruinstars is designed for square-grid battlefields, you can also play on a traditional open table using rulers or tape measures.
              Use the following conversions and guidelines.
            </p>
          </div>
          <div className="section">
            <h4>Basic Conversion</h4>
            <ul>
              <li>1 Square = 2 inches (≈5 cm)</li>
              <li>Adjacency: Units are "adjacent" if their bases are within 1" of each other.</li>
            </ul>
          </div>
          <div className="section">
            <h4>Movement, Ranges, & Terrain</h4>
            <ul>
              <li>A Move action covers up to 6 inches</li>
              <li>A Dash action covers up to 2 inches</li>
              <li>
                Apply terrain effects normally:
                <ul>
                  <li>Difficult terrain adds +2 inches per move.</li>
                  <li>Impassable terrain cannot be crossed.</li>
                </ul>
              </li>
              <li>Weapon Ranges: Convert directly (e.g., <code>RNG3</code> = 6 inches)</li>
              <li>Blast: Affects the targeted Unit and all Adjacent Units</li>
              <li>Line of Sight: Draw a line from one point on the attacker's base to two opposite points on the target's base.</li>
              <li>Cover: A Unit may benefit from Cover only if it is within 1" of the obscuring terrain element</li>
            </ul>
          </div>
          <div className="section">
            <h4>Terrain Height</h4>
            <ul>
              <li>1 Level = 2 inches vertical distance.</li>
              <li>To climb up, add 2 inches of movement for each level.</li>
              <li>To climb down, the first 2 inches are free, but each additional level costs 2 inches.</li>
            </ul>
          </div>
          <div className="section">
            <p>
              Tip: When in doubt, round up. The goal is smooth play, not precise math. Both grid and measuring-table versions are fully supported; choose whichever is easiest for your group.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
