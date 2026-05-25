import { FactionLink } from '../nav/Links'

const FACTION_NAMES: Record<string, string> = {
  HEG: 'Hegemony',
  SWM: 'The Swarm',
  OCL: 'Outer Claim',
  CRS: 'Crimson Shroud',
  GRU: 'Grutak',
  EIR: 'Eidolon Revenants',
}

// Tailwind bg classes for each faction - kept explicit so Tailwind purge retains them
const FACTION_COLORS: Record<string, string> = {
  HEG: 'bg-blue-500',
  SWM: 'bg-green-500',
  OCL: 'bg-amber-500',
  CRS: 'bg-purple-500',
  GRU: 'bg-red-500',
  EIR: 'bg-cyan-500',
}

// Dimmer variant for the legend dot
const FACTION_COLORS_DIM: Record<string, string> = {
  HEG: 'bg-blue-700',
  SWM: 'bg-green-700',
  OCL: 'bg-amber-700',
  CRS: 'bg-purple-700',
  GRU: 'bg-red-700',
  EIR: 'bg-cyan-700',
}

const BATTLEFIELD_LABELS: Record<string, string> = {
  facility: 'Facility',
  ruined_city: 'Ruined City',
  alien_hive: 'Alien Hive',
  jungle: 'Jungle',
  cursed_temple: 'Cursed Temple',
  rift: 'Rift',
}


export type Location = {
  id: string
  name: string
  battlefield: string
  x: number
  y: number
  faction_scores: Record<string, number>
  situation: string
}

type LocationCardProps = {
  location: Location
  compact?: boolean
  selected?: boolean
  onClick?: () => void
}

/**
 * Render a 10-pip segmented control bar. Factions are sorted by score descending
 * so the dominant faction always anchors the left. Each pip is a small colored
 * block; pips within the same faction are adjacent. Gap between faction groups
 * gives a subtle separation without breaking the bar feel.
 */
function ControlBar({ factionScores }: { factionScores: Record<string, number> }) {
  // Sort factions by score descending
  const sorted = Object.entries(factionScores).sort(([, a], [, b]) => b - a)

  // Build an array of 10 pip entries: { factionId, isLastInGroup }
  const pips: { factionId: string; isLastInGroup: boolean }[] = []
  sorted.forEach(([factionId, score], groupIdx) => {
    for (let i = 0; i < score; i++) {
      pips.push({
        factionId,
        isLastInGroup: i === score - 1 && groupIdx < sorted.length - 1,
      })
    }
  })

  return (
    <div className="flex gap-px" role="img" aria-label="Control bar">
      {pips.map((pip, i) => {
        const color = FACTION_COLORS[pip.factionId] ?? 'bg-zinc-500'
        const isFirst = i === 0
        const isLast = i === pips.length - 1
        // Small gap after last pip in a group (except the overall last)
        const marginRight = pip.isLastInGroup ? 'mr-0.5' : ''
        const roundedLeft = isFirst ? 'rounded-l-sm' : ''
        const roundedRight = isLast ? 'rounded-r-sm' : ''
        return (
          <div
            key={i}
            className={`h-3 flex-1 ${color} ${roundedLeft} ${roundedRight} ${marginRight}`}
            title={`${FACTION_NAMES[pip.factionId] ?? pip.factionId}`}
          />
        )
      })}
    </div>
  )
}

/**
 * Legend row: one entry per faction sorted score-desc, showing a color dot,
 * short faction name, and score out of 10.
 */
function ControlLegend({ factionScores }: { factionScores: Record<string, number> }) {
  const sorted = Object.entries(factionScores).sort(([, a], [, b]) => b - a)

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
      {sorted.map(([factionId, score], i) => {
        const dotColor = FACTION_COLORS_DIM[factionId] ?? 'bg-zinc-500'
        const isLeader = i === 0
        return (
          <div key={factionId} className="flex items-center gap-1.5">
            <span className={`inline-block w-2 h-2 rounded-sm ${dotColor}`} />
            <FactionLink factionId={factionId} factionName={FACTION_NAMES[factionId]} />
            <span className={`font-mono text-xs tabular-nums ${isLeader ? 'text-orange-400' : 'text-zinc-500'}`}>
              {score}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function LocationCard({ location, compact = false, selected = false, onClick }: LocationCardProps) {
  const battlefieldLabel = BATTLEFIELD_LABELS[location.battlefield] ?? location.battlefield

  if (compact) {
    return (
      <div
        onClick={onClick}
        className={`bg-card border rounded p-2 cursor-pointer transition-colors ${
          selected ? 'border-orange-500' : 'border-zinc-700 hover:border-zinc-500'
        }`}
      >
        <div className="text-sm font-heading uppercase text-main leading-tight mb-2">{location.name}</div>
        <ControlBar factionScores={location.faction_scores} />
      </div>
    )
  }

  return (
    <div className="bg-card border border-main rounded">
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-1 border-b border-zinc-700">
        <span className="text-xs font-mono text-muted">{location.id}</span>
        <span className="text-xs font-mono uppercase text-muted">{battlefieldLabel}</span>
      </div>

      {/* Name */}
      <div className="px-3 py-2">
        <h2 className="text-2xl font-title uppercase text-main">{location.name}</h2>
      </div>

      {/* Control bar + legend */}
      <div className="px-3 pb-3">
        <ControlBar factionScores={location.faction_scores} />
        <ControlLegend factionScores={location.faction_scores} />
      </div>

      {/* Situation */}
      <div className="px-3 pb-3 border-t border-zinc-800 pt-3">
        <div className="flavor">
          {location.situation}
        </div>
      </div>
    </div>
  )
}
