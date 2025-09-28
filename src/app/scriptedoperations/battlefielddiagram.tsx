
/**
 * Ruinstars Battlefield Diagram — Safe Renderer + Inline Tests
 * ------------------------------------------------------------
 * Fixes:
 * - Guards against undefined/null `layout` (prevents "cannot read rows of undefined").
 * - Defaults rows/cols to 15 and all collections to [] when missing.
 * - Skips invalid coordinates gracefully instead of throwing.
 *
 * This file is self‑contained: it includes the renderer AND several inline
 * sample layouts so you can preview in this window without importing anything else.
 */

// ===================== Helpers =====================
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function isAlgebraic(c: any) {
  return typeof c === 'string'
}

function algebraicToXYSafe(c: string) {
  if (!c || typeof c !== 'string') return null
  const m = c.toUpperCase().match(/^([A-O])(\d{1,2})$/) // clamp to 15x15 (A..O, 1..15)
  if (!m) return null
  const col = LETTERS.indexOf(m[1])
  const row = parseInt(m[2], 10) - 1
  if (col < 0 || col > 14 || row < 0 || row > 14) return null
  return { x: col, y: row }
}

function toXY(c: string) {
  if (isAlgebraic(c)) return algebraicToXYSafe(c)
  if (c && typeof c.x === 'number' && typeof c.y === 'number') {
    // clamp into board just in case
    const x = Math.max(0, Math.min(14, c.x))
    const y = Math.max(0, Math.min(14, c.y))
    return { x, y }
  }
  return null
}

function squareCenter(x: number, y: number, cell: number) {
  return { cx: x * cell + cell / 2, cy: y * cell + cell / 2 }
}

// Turn an array-of-arrays (15x15) of string codes into colored zones
export function gridToZones(grid: string | any[], mapping: { [x: string]: {}; OBJ?: { name: string; color: string; opacity: number } }) {
  const buckets = {}
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y]
    for (let x = 0; x < row.length; x++) {
      const code = row[x]
      if (!code) continue
      const meta = mapping[code] || {}
      if (!buckets[code]) {
        buckets[code] = {
          id: meta.id || code,
          name: meta.name,
          color: meta.color || '#4f46e5',
          opacity: meta.opacity ?? 0.15,
          stroke: meta.stroke,
          strokeDasharray: meta.strokeDasharray,
          squares: [],
        }
      }
      buckets[code].squares.push({ x, y })
    }
  }
  return Object.values(buckets)
}

export function rectSquares(a, b) {
  const A = toXY(a)
  const B = toXY(b)
  if (!A || !B) return []
  const x0 = Math.min(A.x, B.x)
  const x1 = Math.max(A.x, B.x)
  const y0 = Math.min(A.y, B.y)
  const y1 = Math.max(A.y, B.y)
  const out = []
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) out.push({ x, y })
  }
  return out
}

function buildTileRects(cell) {
  const tileSize = 5 * cell
  const rects = []
  const names = [
    ['NW', 'N', 'NE'],
    ['W', 'C', 'E'],
    ['SW', 'S', 'SE'],
  ]
  for (let ty = 0; ty < 3; ty++) {
    for (let tx = 0; tx < 3; tx++) {
      rects.push({ x: tx * tileSize, y: ty * tileSize, w: tileSize, h: tileSize, label: names[ty][tx] })
    }
  }
  return rects
}

// ===================== Renderer =====================
export function BattlefieldDiagram({
  layout,
  cellPx = 36,
  showCoords = false,
  showGrid = true,
  className,
  style,
}) {
  // Guard against undefined layout
  if (!layout) {
    console.warn('BattlefieldDiagram: missing layout prop — rendering empty 15x15 grid.')
  }

  const rows = layout?.rows ?? 15
  const cols = layout?.cols ?? 15
  const w = cols * cellPx
  const h = rows * cellPx

  const zones = layout?.zones ?? []
  const terrain = layout?.terrain ?? []
  const markers = layout?.markers ?? []
  const arrows = layout?.arrows ?? []
  const labels = layout?.labels ?? []
  const tiles = layout?.tiles ?? { show: false }

  const tileOverlay = tiles.show ? buildTileRects(cellPx) : []

  return (
    <div className={className} style={style}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width={w}
        height={h}
        className="rounded-2xl shadow border border-neutral-300 bg-white"
        role="img"
        aria-label="Ruinstars Battlefield Diagram"
      >
        <rect x={0} y={0} width={w} height={h} fill="#fafafa" />

        {/* 3x3 tile overlay (5x5 each) */}
        {tiles.show && (
          <g>
            {tileOverlay.map((r, i) => (
              <g key={`tile-${i}`}>
                <rect
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  fill="none"
                  stroke={tiles.stroke ?? '#bbb'}
                  strokeDasharray={tiles.strokeDasharray ?? '6 6'}
                />
                {tiles.label && (
                  <text
                    x={r.x + r.w / 2}
                    y={r.y + r.h / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={12}
                    fill="#888"
                  >
                    {r.label}
                  </text>
                )}
              </g>
            ))}
          </g>
        )}

        {/* Grid lines */}
        {showGrid && (
          <g stroke="#ddd">
            {Array.from({ length: cols + 1 }).map((_, c) => (
              <line key={`vc-${c}`} x1={c * cellPx} y1={0} x2={c * cellPx} y2={h} />
            ))}
            {Array.from({ length: rows + 1 }).map((_, r) => (
              <line key={`hr-${r}`} x1={0} y1={r * cellPx} x2={w} y2={r * cellPx} />
            ))}
          </g>
        )}

        {/* Zones */}
        {zones.map((z) => (
          <g key={z.id} opacity={z.opacity ?? 0.15}>
            {(z.squares || []).map((c, i) => {
              const p = toXY(c)
              if (!p) return null
              return (
                <rect
                  key={`${z.id}-${i}`}
                  x={p.x * cellPx}
                  y={p.y * cellPx}
                  width={cellPx}
                  height={cellPx}
                  fill={z.color ?? '#4f46e5'}
                  stroke={z.stroke}
                  strokeDasharray={z.strokeDasharray}
                />
              )
            })}
          </g>
        ))}

        {/* Terrain */}
        {terrain.map((t, i) => {
          if (t.kind === 'rect') {
            const p = toXY(t.at)
            if (!p) return null
            const sx = p.x * cellPx
            const sy = p.y * cellPx
            const cx = sx + (t.w * cellPx) / 2
            const cy = sy + (t.h * cellPx) / 2
            const r = t.r ?? 6
            return (
              <rect
                key={`ter-${i}`}
                x={sx}
                y={sy}
                width={(t.w || 1) * cellPx}
                height={(t.h || 1) * cellPx}
                transform={t.rotate ? `rotate(${t.rotate}, ${cx}, ${cy})` : undefined}
                fill={t.fill ?? '#444'}
                stroke={t.stroke ?? '#333'}
                rx={r}
                ry={r}
              />
            )
          }
          if (t.kind === 'circle') {
            const p = toXY(t.at)
            if (!p) return null
            const { cx, cy } = squareCenter(p.x, p.y, cellPx)
            return (
              <circle
                key={`ter-${i}`}
                cx={cx}
                cy={cy}
                r={(t.r ?? 0.45) * cellPx}
                fill={t.fill ?? '#555'}
                stroke={t.stroke ?? '#333'}
              />
            )
          }
          // polygon
          const pts = (t.points || [])
            .map((c) => {
              const p = toXY(c)
              if (!p) return null
              const { cx, cy } = squareCenter(p.x, p.y, cellPx)
              return `${cx},${cy}`
            })
            .filter(Boolean)
            .join(' ')
          if (!pts) return null
          return <polygon key={`ter-${i}`} points={pts} fill={t.fill ?? '#666'} stroke={t.stroke ?? '#333'} />
        })}

        {/* Markers */}
        {markers.map((m) => {
          const p = toXY(m.at)
          if (!p) return null
          const { cx, cy } = squareCenter(p.x, p.y, cellPx)
          const size = m.size ?? Math.max(8, cellPx * 0.35)
          const half = size / 2
          const stroke = m.stroke ?? '#111'
          const fill = m.fill ?? '#f59e0b'

          let glyph = null
          switch (m.shape ?? 'dot') {
          case 'dot':
            glyph = <circle cx={cx} cy={cy} r={half} fill={fill} stroke={stroke} />
            break
          case 'ring':
            glyph = <circle cx={cx} cy={cy} r={half} fill="none" stroke={stroke} strokeWidth={2} />
            break
          case 'diamond':
            glyph = (
              <polygon
                points={`${cx},${cy - half} ${cx + half},${cy} ${cx},${cy + half} ${cx - half},${cy}`}
                fill={fill}
                stroke={stroke}
              />
            )
            break
          case 'cross':
            glyph = (
              <g stroke={stroke} strokeWidth={2}>
                <line x1={cx - half} y1={cy - half} x2={cx + half} y2={cy + half} />
                <line x1={cx + half} y1={cy - half} x2={cx - half} y2={cy + half} />
              </g>
            )
            break
          case 'star':
            glyph = (
              <g>
                <circle cx={cx} cy={cy} r={half * 0.9} fill={fill} stroke={stroke} />
                <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize={size * 0.7} fill="#111">★</text>
              </g>
            )
            break
          }

          return (
            <g key={m.id}>
              {glyph}
              {m.label && (
                <text x={cx} y={cy + size} textAnchor="middle" dominantBaseline="hanging" fontSize={12} fill="#111">
                  {m.label}
                </text>
              )}
            </g>
          )
        })}

        {/* Arrows */}
        {arrows.map((a) => {
          const p1 = toXY(a.from)
          const p2 = toXY(a.to)
          if (!p1 || !p2) return null
          const s1 = squareCenter(p1.x, p1.y, cellPx)
          const s2 = squareCenter(p2.x, p2.y, cellPx)
          const stroke = a.stroke ?? '#0ea5e9'
          const width = a.width ?? 3
          let path = `M ${s1.cx} ${s1.cy} L ${s2.cx} ${s2.cy}`
          if (a.curved) {
            const mx = (s1.cx + s2.cx) / 2
            const my = (s1.cy + s2.cy) / 2 - cellPx * 0.8
            path = `M ${s1.cx} ${s1.cy} Q ${mx} ${my} ${s2.cx} ${s2.cy}`
          }
          return (
            <g key={a.id}>
              <defs>
                <marker id={`arrow-${a.id}`} markerWidth="10" markerHeight="10" refX="7" refY="3" orient="auto">
                  <polygon points="0 0, 8 3, 0 6" fill={stroke} />
                </marker>
              </defs>
              <path d={path} stroke={stroke} fill="none" strokeWidth={width} markerEnd={`url(#arrow-${a.id})`} />
            </g>
          )
        })}

        {/* Labels */}
        {labels.map((l) => {
          const p = toXY(l.at)
          if (!p) return null
          const { cx, cy } = squareCenter(p.x, p.y, cellPx)
          const dx = l.dx ?? 0
          const dy = l.dy ?? 0
          const size = l.size ?? 12
          const weight = l.weight ?? 600
          const anchor = l.align === 'left' ? 'start' : l.align === 'right' ? 'end' : 'middle'
          return (
            <text
              key={l.id}
              x={cx + dx}
              y={cy + dy}
              textAnchor={anchor}
              dominantBaseline="middle"
              fontSize={size}
              fontWeight={weight}
              fill={l.color ?? '#111'}
            >
              {l.text}
            </text>
          )
        })}

        {/* Coordinate labels */}
        {showCoords && (
          <g fontSize={10} fill="#888">
            {Array.from({ length: cols }).map((_, x) => (
              <text key={`col-${x}`} x={x * cellPx + cellPx / 2} y={10} textAnchor="middle">
                {LETTERS[x]}
              </text>
            ))}
            {Array.from({ length: rows }).map((_, y) => (
              <text key={`row-${y}`} x={10} y={y * cellPx + cellPx / 2} dominantBaseline="middle">
                {y + 1}
              </text>
            ))}
          </g>
        )}

        {/* Visual hint if layout was missing */}
        {!layout && (
          <text x={w / 2} y={h / 2} textAnchor="middle" dominantBaseline="middle" fontSize={14} fill="#888">
            (no layout provided)
          </text>
        )}
      </svg>
    </div>
  )
}

// ===================== Inline Test Layouts =====================
export const bareLayout = {
  tiles: { show: true, label: true },
  markers: [{ id: 'obj', at: 'H8', shape: 'diamond', label: 'Objective' }],
}

export const inlineLayout = {
  tiles: { show: true, label: false, stroke: '#222', strokeDasharray: '6 6' },
  terrain: [
    { kind: 'rect',   at: 'F6', w: 2, h: 3, fill: '#6b7280' },
    { kind: 'circle', at: 'J10', r: 1.5,     fill: '#4b5563' },
  ],
  zones: [
    {
      id: 'DEPLOY_TOP',
      color: '#22c55e',
      opacity: 0.5,
      squares: [
        'A1','B1','C1','D1','E1','F1','G1','H1','I1','J1','K1','L1','M1','N1','O1',
        'A2','B2','C2','D2','E2','F2','G2','H2','I2','J2','K2','L2','M2','N2','O2',
      ],
    },
    {
      id: 'DEPLOY_BOTTOM',
      color: '#ef4444',
      opacity: 0.5,
      squares: [
        'A14','B14','C14','D14','E14','F14','G14','H14','I14','J14','K14','L14','M14','N14','O14',
        'A15','B15','C15','D15','E15','F15','G15','H15','I15','J15','K15','L15','M15','N15','O15',
      ],
    },
    {
      id: 'DEFEND',
      color: '#6078e4ff',
      opacity: 0.5,
      squares: [
        'F6','G6','H6','I6','J6',
        'F7','G7','H7','I7','J7',
        'F8','G8','H8','I8','J8',
        'F9','G9','H9','I9','J9',
        'F10','G10','H10','I10','J10',
      ],
    },
  ],
  markers: [
    { id: 'search-west', at: 'C8', shape: 'diamond',   label: 'Search' },
    { id: 'search-center', at: 'H8', shape: 'diamond',   label: 'Search' },
    { id: 'search-east',   at: 'M8', shape: 'diamond',   label: 'Search' },
  ]
}

export const exampleFromGrid = (() => {
  const emptyRow = Array(15).fill('')
  const grid = Array.from({ length: 15 }, () => [...emptyRow])
  // 5x5 central objective area
  for (let y = 5; y < 10; y++) {
    for (let x = 5; x < 10; x++) grid[y][x] = 'OBJ'
  }
  const zones = gridToZones(grid, { OBJ: { name: 'Objective Area', color: '#3b82f6', opacity: 0.15 } })
  return {
    tiles: { show: true, label: false },
    zones,
    markers: [{ id: 'obj', at: 'H8', shape: 'diamond', label: 'Objective' }],
  }
})()

// Test: intentionally pass undefined layout to prove no crash
export const undefinedLayout = undefined

// ===================== Demo Page (Inline Tests) =====================
export default function TestHarness() {
  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Battlefield Diagram — Safe Renderer Tests</h2>

      <section className="space-y-2">
        <h3 className="font-semibold">Test A — Missing Layout (should render empty grid, no crash)</h3>
        <BattlefieldDiagram layout={undefinedLayout} cellPx={40} />
      </section>

      <section className="space-y-2">
        <h3 className="font-semibold">Test B — Minimal Marker Only</h3>
        <BattlefieldDiagram layout={bareLayout} cellPx={40} />
      </section>

      <section className="space-y-2">
        <h3 className="font-semibold">Test C — Inline Layout (deploy bands + markers + terrain)</h3>
        <BattlefieldDiagram layout={inlineLayout} cellPx={40} />
      </section>

      <section className="space-y-2">
        <h3 className="font-semibold">Test D — Zones From Grid Codes</h3>
        <BattlefieldDiagram layout={exampleFromGrid} cellPx={40} />
      </section>
    </div>
  )
}
