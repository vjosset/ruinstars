import { FactionLink, OperationsLink } from '@/components/nav/Links'
import Markdown from '@/components/ui/Markdown'
import PageTitle from '@/components/ui/PageTitle'
import UnitCard from '@/components/unit/UnitCard'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { SpecialService, SquadTypeService } from '@/src/services'
import { UnitType } from '@/src/types'
import { notFound } from 'next/navigation'

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

export default async function SquadTypePage({ params }: { params: Promise<{ squadTypeId: string }> }) {
  const { squadTypeId } = await params
  const squadType = await SquadTypeService.getSquadType(squadTypeId)
  
  const allSpecials = await SpecialService.getAllSpecials()

  if (!squadType) notFound()

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
        {squadType.squadTypeId != 'NPC' && (
          <div className="p-2 justify-center gap-4 flex flex-center">
            <FactionLink factionId={squadType.factionId} factionName={squadType.faction.factionName} />

            <OperationsLink factionId={squadType.factionId} />
          </div>
        )}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2">
          {squadType.unitTypes.map((unitType: UnitType) => (
            <UnitCard
              key={unitType.unitTypeId}
              seq={1}
              unit={unitType.toPlain()}
              isOwner={false}
              allSpecials={allSpecials.map((spec) => spec.toPlain())}
              allMedals={[]}
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
      </div>
    </div>
  )
}
  