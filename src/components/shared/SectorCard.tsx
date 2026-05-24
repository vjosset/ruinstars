import { FactionLink } from '../nav/Links'
import { PveBattlefields } from '@/data/pve_battlefields'

/** Lookup battlefield display title by ID (e.g. 'FAC' → 'The Facility') */
const BATTLEFIELD_TITLE: Record<string, string> = Object.fromEntries(
  PveBattlefields.map(b => [b.battlefieldId, b.title])
)

const FACTION_NAMES: Record<string, string> = {
  HEG: 'Hegemony',
  SWM: 'The Swarm',
  OCL: 'Outer Claim',
  CRS: 'Crimson Shroud',
  GRU: 'Grutak',
  EIR: 'Eidolon Revenants',
}

// Tailwind bg classes for each faction — kept explicit so Tailwind purge retains them
const FACTION_COLORS: Record<string, string> = {
  HEG: 'bg-blue-500',
  SWM: 'bg-green-500',
  OCL: 'bg-amber-500',
  CRS: 'bg-purple-500',
  GRU: 'bg-red-500',
  EIR: 'bg-cyan-500',
}

// Text color variant for inline faction score labels
const FACTION_TEXT_COLORS: Record<string, string> = {
  HEG: 'text-blue-400',
  SWM: 'text-green-400',
  OCL: 'text-amber-400',
  CRS: 'text-purple-400',
  GRU: 'text-red-400',
  EIR: 'text-cyan-400',
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


export type SectorLocation = {
  id: string
  name: string
  battlefield: string
  faction_scores: Record<string, number>
}

export type Sector = {
  id: string
  name: string
  x: number
  y: number
  description: string
  faction_scores: Record<string, number>
  locations: SectorLocation[]
}

/**
 * Render a segmented control bar. Factions are sorted by score descending
 * so the dominant faction always anchors the left. Each pip is a small colored
 * block; pips within the same faction are adjacent.
 */
function ControlBar({ factionScores, pipHeight = 'h-3' }: { factionScores: Record<string, number>; pipHeight?: string }) {
  const sorted = Object.entries(factionScores).sort(([, a], [, b]) => b - a)

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
        const marginRight = pip.isLastInGroup ? 'mr-0.5' : ''
        const roundedLeft = isFirst ? 'rounded-l-sm' : ''
        const roundedRight = isLast ? 'rounded-r-sm' : ''
        return (
          <div
            key={i}
            className={`${pipHeight} flex-1 ${color} ${roundedLeft} ${roundedRight} ${marginRight}`}
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

/**
 * Compact inline score row used inside the per-location breakdown.
 * Shows faction abbreviations in faction color + score, no links.
 */
function LocationScores({ factionScores }: { factionScores: Record<string, number> }) {
  const sorted = Object.entries(factionScores).sort(([, a], [, b]) => b - a)
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
      {sorted.map(([factionId, score], i) => {
        const textColor = FACTION_TEXT_COLORS[factionId] ?? 'text-zinc-400'
        const isLeader = i === 0
        return (
          <span key={factionId} className="font-mono text-xs tabular-nums">
            <span className={textColor}>{factionId}</span>
            <span className={isLeader ? 'text-orange-400' : 'text-zinc-500'}>&nbsp;{score}</span>
          </span>
        )
      })}
    </div>
  )
}

type SectorCardProps = {
  sector: Sector
}

export default function SectorCard({ sector }: SectorCardProps) {
  return (
    <div className="bg-card border border-main rounded">
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-1 border-b border-zinc-700">
        <span className="text-xs font-mono text-muted">{sector.id}</span>
        <span className="text-xs font-mono uppercase text-muted">{sector.locations.length} locations</span>
      </div>

      {/* Name */}
      <div className="px-3 py-2">
        <h2 className="text-2xl font-title uppercase text-main">{sector.name}</h2>
      </div>

      {/* Sector-level control bar + legend */}
      <div className="px-3 pb-3">
        <ControlBar factionScores={sector.faction_scores} />
        <ControlLegend factionScores={sector.faction_scores} />
      </div>

      {/* Description */}
      <div className="px-3 pb-3 border-t border-zinc-800 pt-3">
        <div className="flavor">
          {sector.description}
        </div>
      </div>

      {/* Per-location breakdown */}
      {sector.locations.length > 0 && (
        <div className="px-3 pb-3 border-t border-zinc-800 pt-3">
          <div className="text-xs font-mono uppercase text-muted mb-2">Locations</div>
          <ul className="space-y-3">
            {sector.locations.map(loc => (
              <li key={loc.id}>
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <span className="text-xs font-mono text-zinc-200 leading-tight">{loc.name}</span>
                  <span className="text-xs font-mono text-zinc-600 shrink-0">
                    {BATTLEFIELD_TITLE[loc.battlefield] ?? loc.battlefield}
                  </span>
                </div>
                <ControlBar factionScores={loc.faction_scores} pipHeight="h-2" />
                <LocationScores factionScores={loc.faction_scores} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
