import FactionCard from '@/components/faction/FactionCard'
import { FactionService } from '@/services'

export default async function RulesYourSquad() {
  const factions = await FactionService.getAllFactions()
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="buildingsquad">
        8. Your Squad
      </h2>
      <div className="section">
        <p>
          Select the <a href="/factions">Faction</a> that best fits the way you want to play and build your squad using the <a href="/u">App</a>.
          Squads are typically built with a maximum value of 100 total GP (including all unit and gear costs).<br/>
          Your Squad can only include one Leader (with the <code>LDRx</code> Special), and it cannot include more than 1 of each Unique (<code>UNQ</code>) Unit.<br/>
          When selecting Gear for your Squad (Weapons, Equipment, etc), any item whose name ends with an asterisk (<code>*</code>) is Unique and cannot be added more than once to your squad.
        </p>
        <h3>Factions</h3>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {factions.map((faction) => (
            <FactionCard key={faction.factionId} faction={faction} />
          ))}
        </div>
      </div>
    </div>
  )}
