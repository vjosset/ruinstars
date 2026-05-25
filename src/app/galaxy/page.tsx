import GalaxyMapClient from './GalaxyMapClient'
import PageTitle from '@/components/ui/PageTitle'
import galaxyData from '@/data/galaxy/galaxy.json'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import type { Sector } from '@/components/shared/SectorCard'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'The Galaxy',
    description: 'A living map of the dying galaxy. Track faction control across every contested sector as players report their victories and losses in the campaign.',
    keywords: ['galaxy map', 'campaign', 'faction control', 'sectors'],
    pagePath: '/galaxy',
  })
}

type RawLocation = {
  id: string
  name: string
  x: number
  y: number
  battlefield: string
  faction_scores: Record<string, number>
  situation: string
}

type RawSector = {
  id: string
  name: string
  x: number
  y: number
  description: string
  locations: RawLocation[]
}

/**
 * Aggregate location faction scores into a single sector-level score object,
 * normalized to a total of 10 using the largest-remainder method so that
 * rounded integers always sum to exactly 10.
 *
 * Example - The Kethara Corridor (3 locations):
 *   Raw sums: HEG 18, OCL 9, GRU 3  (total 30)
 *   Normalized: HEG 6, OCL 3, GRU 1
 */
function computeSectorFactionScores(locations: RawLocation[]): Record<string, number> {
  if (locations.length === 0) return {}

  // Sum raw scores across all locations
  const raw: Record<string, number> = {}
  for (const loc of locations) {
    for (const [faction, score] of Object.entries(loc.faction_scores)) {
      raw[faction] = (raw[faction] ?? 0) + score
    }
  }

  const total = Object.values(raw).reduce((a, b) => a + b, 0)
  if (total === 0) return {}

  const TARGET = 10

  // Compute exact proportions, then floor each
  const entries = Object.entries(raw).map(([faction, rawScore]) => {
    const exact = (rawScore / total) * TARGET
    return { faction, floor: Math.floor(exact), remainder: exact % 1 }
  })

  // Distribute any shortfall (caused by flooring) to factions with the largest remainders
  const floorsSum = entries.reduce((s, e) => s + e.floor, 0)
  const shortfall = TARGET - floorsSum
  entries.sort((a, b) => b.remainder - a.remainder)
  for (let i = 0; i < shortfall; i++) {
    entries[i].floor++
  }

  // Build result, omitting any factions that rounded down to 0
  const result: Record<string, number> = {}
  for (const { faction, floor } of entries) {
    if (floor > 0) result[faction] = floor
  }
  return result
}

const sectors: Sector[] = (galaxyData.sectors as RawSector[]).map(raw => ({
  id: raw.id,
  name: raw.name,
  x: raw.x,
  y: raw.y,
  description: raw.description,
  faction_scores: computeSectorFactionScores(raw.locations),
  locations: raw.locations.map(l => ({
    id: l.id,
    name: l.name,
    battlefield: l.battlefield,
    faction_scores: l.faction_scores,
  })),
}))

export default function GalaxyPage() {
  return (
    <div className="px-2 py-8 max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <PageTitle>The Galaxy</PageTitle>
      </div>
      <GalaxyMapClient sectors={sectors} />
    </div>
  )
}
