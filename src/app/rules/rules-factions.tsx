import FactionCard from '@/components/faction/FactionCard'
import Markdown from '@/components/ui/Markdown'
import UnitCard from '@/components/unit/UnitCard'
import { FactionService, SpecialService } from '@/services'
import { UnitType } from '@/types'

export default async function RulesFactions() {
  const factions = await FactionService.getAllFactions()
  const allFactions = []

  for (const faction of factions) {
    allFactions.push(await FactionService.getFaction(faction.factionId) ?? faction)
  }
    
  const allSpecials = await SpecialService.getAllSpecials()

  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="allfactions">
        Factions
      </h2>
      <p>
        Select the <a href="/factions">Faction</a> that best fits the way you want to play and build your squad using the <a href="/u">App</a>.
        Squads are typically built with a maximum value of 100 total GP (including all unit and gear costs).<br/>
        Your Squad can only include one Leader (with the <code>LDRx</code> Special), and it cannot include more than 1 of each Unique Unit (marked with an asterisk <code>*</code>).<br/>
        When selecting Gear for your Squad (Weapons, Equipment, etc), any item whose name ends with an asterisk (<code>*</code>) is Unique and cannot be added more than once to your squad.
      </p>
      <br/><br/><br/><br/><br/>
      
      {allFactions.map((faction) => (
        <div className="mb-4">
          <FactionCard
            key={faction.factionId}
            faction={faction}
          />
        </div>
      ))}
      
      {allFactions.map((faction) => (
        <div className="section">
          <div className="relative min-h-[150px] md:h-[200px] flex items-center justify-center py-12">
            <div 
              className="absolute inset-0 bg-cover bg-top"
              style={{ backgroundImage: `url(/img/factions/${faction.factionId}.webp)` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
            </div>
            <div className="relative flex flex-col items-center justify-center px-8 pt-48 w-full">
              <div className="flex items-center gap-x-4 mb-4">
                <img 
                  className="h-10 w-10 grunge mb-3" 
                  src={`/img/factions/${faction.factionId}-icon.webp`} 
                  alt={`${faction.factionName} icon`}
                />
                <h1 className="text-center text-4xl text-white mb-2">{faction.factionName}</h1>
              </div>
              <p className="text-white max-w-2xl text-center">
                {faction.description}
              </p>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto p-2">
            {faction.unitTypes.map((u) => (
              <div>
                <UnitCard
                  key={u.unitTypeId}
                  seq={1}
                  unit={u.toPlain()}
                  isOwner={false}
                  allSpecials={allSpecials.map((spec) => spec.toPlain())}
                  allMedals={[]}
                />
              </div>
            ))}
          </div>

          {/* Show the distinct skills for units in this faction */}
          <div className="section">
            <h4>Skills</h4>
            <ul className="twocols">
              {Array.from(new Set(
                faction.unitTypes
                  .flatMap(u => u.skills || [])
                  .filter(s => s?.gearId)
                  .map(s => s?.gearId)
              )).map(gearId => {
                const skill = faction.unitTypes
                  .flatMap(u => u.skills || [])
                  .find(s => s?.gearId === gearId)

                if (skill?.gearCategory?.isNarrative) return

                return (
                  <li key={gearId} className="section">
                    {skill?.gearName}<br/>
                    <Markdown className="text-sm text-muted" children={skill?.description ?? ''} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )}
