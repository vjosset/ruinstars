import ScriptedOperationsList from '@/components/shared/ScriptedOperationsList'
import SquadCard from '@/components/squad/SquadCard'
import SquadTypeCard from '@/components/squadType/SquadTypeCard'
import Markdown from '@/components/ui/Markdown'
import PageTitle from '@/components/ui/PageTitle'
import UnitCard from '@/components/unit/UnitCard'
import ops from '@/data/scriptedOperations.json'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { FactionService, SpecialService, SquadTypeService } from '@/src/services'
import { UnitType } from '@/src/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiExternalLink } from 'react-icons/fi'

export async function generateMetadata({ params }: { params: Promise<{ squadTypeId: string }>  }) {
  const { squadTypeId } = await params
  const squadType = await SquadTypeService.getSquadType(squadTypeId)
  
  if (!squadType) return {}

  return generatePageMetadata({
    title: `${squadType.squadTypeName}`,
    description: `${squadType.lore}`,
    images: [{
      url: `/img/squadTypes/${squadTypeId}.webp`,
    }],
    keywords: ['squadType', squadType.squadTypeId, squadType.squadTypeName, squadType.factionId, squadType.faction.factionName],
    pagePath: `/squadTypes/${squadType.squadTypeId}`
  })
}

export default async function SquadTypePage({ params, searchParams }: { params: Promise<{ squadTypeId: string }>, searchParams?: Promise<{ tab?: string }> }) {
  const { squadTypeId } = await params
  const { tab: tabParam } = searchParams ? await searchParams : { tab: undefined }
  const squadType = await SquadTypeService.getSquadType(squadTypeId)
  const factions = await FactionService.getAllFactions()
  const factionsPlain = factions.map(f => f.toPlain ? f.toPlain() : f)

  if (!squadType) notFound()

  const hasSpotlights = (squadType.spotlights?.length ?? 0) > 0
  const scriptedOps = ops.filter(op => op.factions?.factionA === squadType.factionId || op.factions?.factionB === squadType.factionId)
  const hasOps = scriptedOps.length > 0

  const tabs = [
    { id: 'units' as const, label: 'Units', enabled: true },
    { id: 'about' as const, label: 'About', enabled: true },
    /* { id: 'ops' as const, label: 'Operations', enabled: hasOps }, */
    /* { id: 'squads' as const, label: 'Squads', enabled: hasSpotlights }, */
  ].filter(t => t.enabled)

  const requestedTab = tabs.find(t => t.id === tabParam)?.id
  const defaultTab = tabs.find(t => t.id === 'units')?.id || tabs[0]?.id || 'units'
  const activeTab = requestedTab || defaultTab
  const allSpecials = activeTab === 'units' ? await SpecialService.getAllSpecials() : []

  const tabHref = (tab: string) => {
    const params = new URLSearchParams()
    if (tab !== defaultTab) params.set('tab', tab)

    const qs = params.toString()
    return `/squadTypes/${squadType.squadTypeId}${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="max-w-full">
      <div className="relative min-h-[200px] flex items-center justify-center mb-4"
        style={{ backgroundImage: `url(/img/squadTypes/${squadType.squadTypeId}.webp)`, backgroundAttachment: '', backgroundPosition: 'top', backgroundSize: 'cover' }}>
        <div 
          className="absolute inset-0 bg-cover bg-top"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
        </div>
        <div className="relative flex flex-col items-center justify-center px-8 pt-36 w-full">
          <div className="flex items-center gap-x-4 mb-4">
            <PageTitle>{squadType.squadTypeName}</PageTitle>
          </div>
          <div className="text-white max-w-2xl text-center m-4">
            <Markdown className="flavor_disabled">{squadType.description}</Markdown>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/*
        squadType.squadTypeId != 'NPC' && (
          <div className="p-2 justify-center gap-4 flex flex-center">
            <FactionLink factionId={squadType.factionId} factionName={squadType.faction.factionName} />

            <OperationsLink factionId={squadType.factionId} />
          </div>
        )*/}
        {tabs.length > 1 && (
          <div className="flex items-center justify-center gap-8 border-b border-border mb-4 px-2">
            {tabs.map(tab => (
              <Link
                key={tab.id}
                href={tabHref(tab.id)}
                replace
                scroll={false}
                className={`pb-2 text-sm uppercase tracking-wide transition-colors ${activeTab === tab.id ? 'text-main border-b-2 border-main' : 'text-muted hover:text-foreground border-b-2 border-transparent'}`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'units' && (
          <>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2">
              {squadType.unitTypes.map((unitType: UnitType) => (
                <UnitCard
                  key={unitType.unitTypeId}
                  seq={1}
                  unit={unitType.toPlain()}
                  isOwner={false}
                  allSpecials={allSpecials.map((spec) => spec.toPlain())}
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
        )}

        {/*
        {activeTab === 'squads' && hasSpotlights && (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2">
            {squadType.spotlights.map((squad) => (
              <SquadCard
                key={squad.squadId}
                squad={squad.toPlain()}
                isOwner={false}
                showUserLink={true}
                showSquadTypeLink={false}
              />
            ))}
          </div>
        )}
        */}

        {activeTab === 'about' && (
          <div className="grid gap-6 p-2">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
              <div className="space-y-3">
                <h4 className="font-heading text-main">
                  {squadType.squadTypeName}
                </h4>
                <Markdown>{squadType.lore}</Markdown>
              </div>
              <div className="space-y-3">
                <Link href={`/factions/${squadType.factionId}`} className="inline-flex items-center gap-2">
                  <h4 className="font-heading text-main">{squadType.faction.factionName}</h4>
                  <FiExternalLink className="w-4 h-4 text-muted" />
                </Link>
                <Markdown>{squadType.faction.lore}</Markdown>
                
                {squadType.faction.squadTypes?.filter(st => st.squadTypeId !== squadType.squadTypeId).length > 0 && (
                  <div className="space-y-3">
                    <h5 className="font-heading text-main">Other {squadType.faction.factionName} Squad Types</h5>
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
        )}

        {/*
        {activeTab === 'ops' && hasOps && (
          <div className="p-2">
            <ScriptedOperationsList operations={scriptedOps} factions={factionsPlain} />
          </div>
        )}
        */}
      </div>
    </div>
  )
}
