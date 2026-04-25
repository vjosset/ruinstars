import FactionList from '@/components/faction/FactionList'
import Markdown from '@/components/ui/Markdown'
import PageBreak from '@/components/ui/PageBreak'
import UnitCard from '@/components/unit/UnitCard'
import { FactionService, SpecialService, SquadTypeService } from '@/services'
import Link from 'next/link'

export default async function RulesSquadTypes() {
  const factions = (await FactionService.getAllFactions()).filter((fa => fa.squadTypes.length > 0))

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

      <div className="section twocols">
        <div className="section">
          <h2>Introduction</h2>
          <div className="flavor">
            The galaxy is dying.
            <br/><br/>
            Empires rot from within, ancient horrors stir in the void, and the last habitable worlds are fought over like scraps of meat.
            There are no clean wars anymore. Only raids, interdictions, containment failures, and desperate last stands.
          </div>
        </div>
        <div className="section">
          <h2>Factions</h2>
          The factions of Ruinstars are not armies in the traditional sense.
          They are specialized forces, cult cells, strike teams, and expendable operatives sent where conventional power has already failed.
          Some fight to preserve order.
          Others to hasten collapse. Many simply fight to survive one more mission.
          <br/><br/>
          This book details those factions: who they are, how they fight, and what kinds of Units make up their squads.
        </div>
      </div>
      
      <div className="section">
        <h2>Building a Squad</h2>
        <div className="section twocols">
          <div className="section">
            <h3>Full Squads (100 GP)</h3>
            A Full Squad is the standard way to play Ruinstars.
            <ul>
              <li>You have 100GP to spend on Units and optional gear, weapons, and skills</li>
              <li>All Units and gear are selected by a single player</li>
              <li>This squad is used as-is for PvE, PvP, or Horde play</li>
            </ul>

            Full Squads are recommended for:            
            <ul>
              <li>Solo play</li>
              <li>One-player-per-side PvP</li>
              <li>Campaign play</li>
              <li>First-time players</li>
            </ul>

            A typical Full Squad consists of:
            <ul>
              <li>4-10 Units</li>
              <li>A mix of specialists and line Units</li>
              <li>Enough redundancy to absorb losses without immediate failure</li>
            </ul>
          </div>
          <div className="section">
            <h3>Mini Squads (Shared 100 GP)</h3>
            In games with multiple players on the same side, the squad can be split into <strong>Mini Squads</strong>.
            <ul>
              <li>2 Players → 50 GP each</li>
              <li>3 Players → 34 GP each</li>
              <li>4 Players → 25 GP each</li>
            </ul>
            Notes:
            <ul>
              <li>Units that are in different mini-Squads are considered to be Squadmates.</li>
              <li>Each Mini Squad may include a Leader. However, only one Leader counts for rolling TO dice. Before the mission begins, players agree on which Leader this is. That Leader is the <strong>Squad Leader</strong>.</li>
              <li>While the Squad Leader is Standing, roll 5 TO dice as normal. If the Squad Leader is Taken Out, roll 3 TO dice, regardless of whether other Leaders are still Standing.</li>
            </ul>
          </div>
          <div className="section">
            <h3>Unit and Gear Selection</h3>
            <ul>
              <li>
                <strong>Select Faction</strong><br/>
                Choose the <a className="underline" href="/factions">Faction</a> that fits the way you want to play.
                Build your squad using the <a className="underline" href="/me">App</a> or by filling out the cards at the end of this book.
              </li>
              <li>
                <strong>Select Units</strong><br/>
                Select 4-10 Units from that faction's Unit list. Your squad must include exactly one Leader.
                Units marked with an asterisk (<code>*</code>) are Unique: include at most one of each.
              </li>
              <li>
                <strong>Select Gear, Weapons, and Skills</strong><br/>
                Each unit card lists its available gear, weapons, and skills. Items with a GP cost are optional: add that cost to your total if selected.
                Items marked with an asterisk (<code>*</code>) are optional and Unique: only one unit in your squad may have it.
              All other items can be included at no cost except <strong>Spoils Of War</strong>, which are rewards earned in Campaign Play.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Factions</h2>
        <FactionList />
      </div>

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
