'use client'

import dynamic from 'next/dynamic'
import { type Sector } from './SectorCard'

// GalaxyBackground uses Math.sin/cos/exp/sqrt in rejection-sampling loops.
// These transcendental functions are implementation-defined and can produce
// slightly different results on Node (SSR) vs browser V8, which shifts the
// star array indices and causes hydration mismatches. Skipping SSR entirely
// is the correct fix - the background is purely decorative.
const GalaxyBackground = dynamic(() => import('./GalaxyBackground'), { ssr: false })

const CELL = 35
const COLS = 16
const SIZE = COLS * CELL  // 560
const CENTER = SIZE / 2   // 280

/**
 * SVG hex values - kept in sync with FACTION_COLORS in SectorCard.tsx.
 * SVG fill attributes can't use Tailwind class names, so we duplicate these here.
 *   HEG blue-500, SWM green-500, OCL amber-500, CRS purple-500, GRU red-500, EIR cyan-500
 */
const FACTION_HEX: Record<string, string> = {
  HEG: '#3b82f6',
  SWM: '#22c55e',
  OCL: '#f59e0b',
  CRS: '#a855f7',
  GRU: '#ef4444',
  EIR: '#06b6d4',
}

const FACTION_LABELS: Record<string, string> = {
  HEG: 'Hegemony',
  SWM: 'The Swarm',
  OCL: 'Outer Claim',
  CRS: 'Crimson Shroud',
  GRU: 'Grutak',
  EIR: 'Eidolon Revenants',
}

/** Convert a 0-15 grid coordinate to the SVG pixel center of that cell. */
function px(coord: number) {
  return coord * CELL + CELL / 2
}

type Props = {
  sectors: Sector[]
  selected: Sector | null
  onSelect: (sector: Sector) => void
}

export default function GalaxyMap({ sectors, selected, onSelect }: Props) {
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      width="100%"
      className="block"
      role="img"
      aria-label="Galaxy map showing all campaign sectors"
    >
      <defs>
        <clipPath id="galaxy-clip">
          <circle cx={CENTER} cy={CENTER} r={224} />
        </clipPath>
      </defs>

      <rect width={SIZE} height={SIZE} fill="transparent" />

      {/* Decorative background - edit GalaxyBackground.tsx to change this layer */}
      <GalaxyBackground />

      {/* Galaxy boundary */}
      <circle cx={CENTER} cy={CENTER} r={224} fill="none" stroke="#888" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />

      {/* Core dead zone */}
      <circle cx={CENTER} cy={CENTER} r={56} fill="none" stroke="#888" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.2" />

      {/* Grid lines clipped to galaxy boundary */}
      <g clipPath="url(#galaxy-clip)" stroke="#888" strokeWidth="0.5" opacity="0.08">
        {Array.from({ length: COLS - 1 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={(i + 1) * CELL} x2={SIZE} y2={(i + 1) * CELL} />
        ))}
        {Array.from({ length: COLS - 1 }, (_, i) => (
          <line key={`v${i}`} x1={(i + 1) * CELL} y1={0} x2={(i + 1) * CELL} y2={SIZE} />
        ))}
      </g>

      {/* Influence disks - rendered before dots so they sit underneath */}
      {sectors.map(sector => {
        const [dominantFaction, dominantScore] = Object.entries(sector.faction_scores)
          .sort(([, a], [, b]) => b - a)[0] ?? ['', 0]

        // Sectors with a majority score below the threshold are too hotly contested to have real influence
        if (dominantScore <= 2) return null

        const color = FACTION_HEX[dominantFaction] ?? '#71717a'
        // Radius scales linearly with control score; score 10 = 1 full cell radius
        const r = dominantScore * (CELL / 5)

        return (
          <circle
            key={`influence-${sector.id}`}
            cx={px(sector.x)}
            cy={px(sector.y)}
            r={r}
            fill={color}
            opacity={0.25}
            style={{ pointerEvents: 'none' }}
          />
        )
      })}

      {/* Sector dots */}
      {sectors.map(sector => {
        const cx = px(sector.x)
        const cy = px(sector.y)
        const dominantFaction = Object.entries(sector.faction_scores)
          .sort(([, a], [, b]) => b - a)[0]?.[0] ?? ''
        const color = FACTION_HEX[dominantFaction] ?? '#71717a'
        const factionLabel = FACTION_LABELS[dominantFaction] ?? dominantFaction
        const isSelected = selected?.id === sector.id

        return (
          <g
            key={sector.id}
            transform={`translate(${cx}, ${cy})`}
            onClick={() => onSelect(sector)}
            className="cursor-pointer group"
          >
            {/* Selected: orange ring */}
            {isSelected && (
              <circle r={11} fill="none" stroke="#f97316" strokeWidth="1.5" />
            )}

            {/* Main dot */}
            <circle r={6} fill={color} />

            {/* Hover: subtle expand ring */}
            <circle
              r={9}
              fill="none"
              stroke={color}
              strokeWidth="1"
              className="opacity-0 group-hover:opacity-50 transition-opacity duration-150"
            />

            {/* Hover labels: sector name + dominant faction - shown above the dot */}
            <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none">
              <text
                y={-13}
                textAnchor="middle"
                fontSize={7.5}
                fontFamily="ui-monospace, monospace"
                stroke="#09090b"
                strokeWidth="3.5"
                strokeLinejoin="round"
                fill="white"
                style={{ paintOrder: 'stroke' } as React.CSSProperties}
              >
                {sector.name}
              </text>
              <text
                y={-4}
                textAnchor="middle"
                fontSize={6.5}
                fontFamily="ui-monospace, monospace"
                stroke="#09090b"
                strokeWidth="3"
                strokeLinejoin="round"
                fill={color}
                style={{ paintOrder: 'stroke' } as React.CSSProperties}
              >
                {factionLabel}
              </text>
            </g>
          </g>
        )
      })}

      {/* Core marker */}
      <circle cx={CENTER} cy={CENTER} r={2} fill="#888" opacity="0.3" />
      <text x={CENTER + 5} y={CENTER + 4} fontSize={8} fill="#888" opacity="0.35" fontFamily="ui-monospace, monospace">
        core
      </text>
    </svg>
  )
}
