import FactionList from '@/components/faction/FactionList'
import Markdown from '@/components/ui/Markdown'
import PageBreak from '@/components/ui/PageBreak'
import UnitCard from '@/components/unit/UnitCard'
import { FactionService, SpecialService, SquadTypeService } from '@/services'
import Link from 'next/link'

export default async function RulesSquadTypes() {
  const factions = await FactionService.getAllFactions()

  for (const faction of factions) {
    for (let squadType of faction.squadTypes) {
      squadType = await SquadTypeService.getSquadType(squadType.squadTypeId) ?? squadType
    }
  }
    
  const allSpecials = await SpecialService.getAllSpecials()

  return (
    <div className="section">
      <h1 className="text-center pt-48 mb-12 font-title"   id="allsquadTypes" style={{position: 'relative', top: '50%' }}>
        Factions
      </h1>
      <p className="mb-8">
        Select the <a className="underline" href="/factions">Faction</a> that best fits the way you want to play and build your squad using the <a href="/me">App</a>.
        Squads are typically built with a maximum value of 100 total GP (including all unit and gear costs).<br/>
        Your Squad can only include one Leader (with the <code>Leader x</code> Special), and it cannot include more than 1 of each Unique Unit (marked with an asterisk <code>*</code>).<br/>
        When selecting Gear for your Squad (Weapons, Equipment, etc), any item whose name ends with an asterisk (<code>*</code>) is Unique and cannot be added more than once to your squad.
      </p>
      <FactionList />

      {factions.map((faction) => (
        <div className="section" id={`faction-${faction.factionId}`} key={`faction-${faction.factionId}`}>
          <h1 className="text-main text-center">{faction.factionName}</h1>
          <Markdown className="flavor_disabled">{faction.lore}</Markdown>
          
          {faction.squadTypes.map(async (st, idx) => {
            const squadType = await SquadTypeService.getSquadType(st.squadTypeId)

            if (!squadType) {
              return null
            }

            return (
              <div
                key={squadType.squadTypeId}
                id={squadType.squadTypeId}
              >
                {idx > 0 && <PageBreak />}
                <h2 className="font-heading text-main">
                  <Link href={`/squadTypes/${squadType.squadTypeId}`}>{squadType.squadTypeName}</Link>
                </h2>
                <div className="section twocols">
                  <div className="section">
                    <Link href={`/squadTypes/${squadType.squadTypeId}`}>
                      <img
                        src={`/img/squadTypes/${squadType.squadTypeId}.webp`}
                        alt={`${squadType.squadTypeName} Portrait`}
                        className="rounded-xl border border-main"
                      />
                    </Link>
                  </div>
                  <div className="section">
                    <Markdown>{squadType.description}</Markdown>
                    <Markdown className="flavor">{squadType.lore}</Markdown>
                  </div>
                </div>
                <h3 className="font-heading text-main">
                  Unit Types
                </h3>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {squadType.unitTypes.map((u) => (
                    <UnitCard
                      key={u.unitTypeId}
                      seq={1}
                      unit={u.toPlain()}
                      isOwner={false}
                      allSpecials={allSpecials.map((spec) => spec.toPlain())}
                      allMedals={[]}
                    />
                  ))}
                </div>

                {/* Show the distinct skills for units in this squadType */}
                <div className="section">
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
            )})}
        </div>
      ))}
    </div>
  )}
