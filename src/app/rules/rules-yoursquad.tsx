import SquadTypeCard from '@/components/squadType/SquadTypeCard'
import { SquadTypeService } from '@/services'

export default async function RulesYourSquad() {
  const squadTypes = await SquadTypeService.getAllSquadTypes()
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="buildingsquad">
        8. Your Squad
      </h2>
      <div className="section">
        <p>
          Select the <a href="/squadTypes">SquadType</a> that best fits the way you want to play and build your squad using the <a href="/u">App</a>.
          Squads are typically built with a maximum value of 100 total GP (including all unit and gear costs).<br/>
          Your Squad can only include one Leader, and it cannot include more than 1 of each Unique Unit (marked with an asterisk <code>*</code>).<br/>
          When selecting Gear for your Squad (Weapons, Equipment, etc), any item whose name ends with an asterisk (<code>*</code>) is Unique and cannot be added more than once to your squad.
        </p>
        <h3>SquadTypes</h3>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {squadTypes.map((squadType) => (
            <SquadTypeCard key={squadType.squadTypeId} squadType={squadType} />
          ))}
        </div>
      </div>
    </div>
  )}
