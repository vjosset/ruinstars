import SquadSpotlightCard from '@/components/squad/SquadSpotlightCard'
import SquadTypeCard from '@/components/squadType/SquadTypeCard'
import SquadTypeTabs from '@/components/squadType/SquadTypeTabs'
import Markdown from '@/components/ui/Markdown'
import PageTitle from '@/components/ui/PageTitle'
import UnitCard from '@/components/unit/UnitCard'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { squadHasRealart } from '@/lib/utils/imageUrls'
import { SpecialService, SquadTypeService } from '@/src/services'
import { UnitType } from '@/src/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { FiExternalLink } from 'react-icons/fi'

// generateMetadata and the page share one load per request
const getSquadType = cache((squadTypeId: string) => SquadTypeService.getSquadType(squadTypeId))

export async function generateMetadata({ params }: { params: Promise<{ squadTypeId: string }>  }) {
  const { squadTypeId } = await params
  const squadType = await getSquadType(squadTypeId)
  
  if (!squadType) return {}

  return generatePageMetadata({
    title: `${squadType.squadTypeName}`,
    description: `${squadType.lore}`,
    images: [{ url: `/img/squadTypes/${squadTypeId}.webp`, width: 900, height: 600 }],
    keywords: ['squadType', squadType.squadTypeId, squadType.squadTypeName, squadType.factionId, squadType.faction.factionName],
    pagePath: `/squadTypes/${squadType.squadTypeId}`
  })
}

export default async function SquadTypePage({ params, searchParams }: { params: Promise<{ squadTypeId: string }>, searchParams?: Promise<{ tab?: string }> }) {
  const { squadTypeId } = await params
  const { tab: tabParam } = searchParams ? await searchParams : { tab: undefined }
  const [squadType, allSpecials] = await Promise.all([
    getSquadType(squadTypeId),
    SpecialService.getAllSpecials(),
  ])

  const hasSpotlights = squadType?.spotlights && squadType.spotlights.length > 0

  if (!squadType) notFound()

  // Serialize once and share the same array across every UnitCard so the page payload only carries one copy
  const specials = allSpecials.map((spec) => spec.toPlain())

  const unitsTab = (
    <>
      <div className="grid gap-x-0 gap-y-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {squadType.unitTypes.map((unitType: UnitType) => (
          <UnitCard
            key={unitType.unitTypeId}
            seq={1}
            unit={unitType.toPlain()}
            isOwner={false}
            allSpecials={specials}
          />
        ))}
      </div>

      {/* Show the distinct skills for units in this squadType */}
      <div className="section printonly">
        <h4>Skills</h4>
        <ul className="twocols">
          {(() => {
            // Gather all skills across unit types
            const allSkills = squadType.unitTypes
              .flatMap(u => u.skills || [])
    
            // Keep only skills with a gearId and exclude narrative-only skills
            const nonNarrativeSkills = allSkills
              .filter(s => s?.gearId && !s?.gearCategory?.isNarrative)
    
            // De-duplicate by gearId (Map keeps last seen, order not important before sorting)
            const uniqueSkills = Array.from(
              new Map(nonNarrativeSkills.map(s => [s.gearId, s])).values()
            )
    
            // Sort alphabetically by gearName for display
            uniqueSkills.sort((a, b) => (a?.gearName || '').localeCompare(b?.gearName || ''))
    
            // Render the sorted, unique list
            return uniqueSkills.map(skill => (
              <li key={`squadTypeSkill_${skill?.gearId}`} className="section">
                {skill?.gearName}<br/>
                <Markdown className="text-sm text-muted" children={skill?.description ?? ''} />
              </li>
            ))
          })()}
        </ul>
      </div>
    </>
  )

  const aboutTab = (
    <div className="grid gap-6 p-2">
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="space-y-3">
          <Markdown className="flavor">{squadType.lore}</Markdown>
          <Markdown>{squadType.description}</Markdown>
          <img
            src={`/img/squadTypes/${squadType.squadTypeId}.webp`}
            alt={`${squadType.squadTypeName} Portrait`}
            className="rounded-xl border border-main"
            loading="lazy"
            decoding="async"
          />
          {squadHasRealart(squadType.squadTypeId) && 
            <em className="text-xs text-muted">Art by <Link className="underline" href="https://helgecbalzer.com/" target="_blank">Helge C. Balzer</Link></em>
          }
        </div>
        <div className="space-y-3">
          <Link href={`/factions/${squadType.factionId}`} className="inline-flex items-center gap-2">
            <h4 className="font-heading text-main">{squadType.faction.factionName}</h4>
            <FiExternalLink className="w-4 h-4 text-muted" />
          </Link><br/>
          <em>{squadType.faction.tagline}</em>
          
          {squadType.faction.squadTypes?.filter(st => st.squadTypeId !== squadType.squadTypeId).length > 0 && (
            <div className="space-y-3">
              <h5 className="font-heading text-main">Also in {squadType.faction.factionName}</h5>
              <div className="grid gap-4 grid-cols-1">
                {squadType.faction.squadTypes
                  .filter(st => st.squadTypeId !== squadType.squadTypeId)
                  .map(st => (
                    <SquadTypeCard key={st.squadTypeId} squadType={st} />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const squadsTab = hasSpotlights && (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2">
      {squadType.spotlights.map((squad) => (
        <SquadSpotlightCard
          key={squad.squadId}
          squad={squad.toPlain()}
          isOwner={false}
          showUserLink={true}
          showSquadTypeLink={false}
        />
      ))}
    </div>
  )

  // First tab is the default (no ?tab= in the URL)
  const tabs = [
    { id: 'units', label: 'Units', content: unitsTab },
    { id: 'about', label: 'About', content: aboutTab },
    { id: 'squads', label: 'Showcase', content: squadsTab },
  ]
  const initialTab = tabs.find(t => t.id === tabParam)?.id ?? tabs[0].id

  return (
    <div className="max-w-full mb-8">
      <div className="relative min-h-[200px] flex items-center justify-center mb-4"
        style={{ backgroundImage: `url(/img/squadTypes/${squadType.squadTypeId}.webp)`, backgroundAttachment: '', backgroundPosition: 'top', backgroundSize: 'cover' }}>
        <div className="absolute inset-0 bg-cover bg-top">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
        </div>
        <div className="relative flex flex-col items-center justify-center px-8 pt-36 w-full">
          <div className="flex items-center gap-x-4 mb-4">
            <PageTitle>{squadType.squadTypeName}</PageTitle>
          </div>
          <em>{squadType.tagline}</em>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <SquadTypeTabs tabs={tabs} initialTab={initialTab} />
      </div>
    </div>
  )
}
