import FactionList from '@/components/faction/FactionList'
import Link from 'next/link'

export default async function RulesYourSquad({ num }: {num?: Number | null}) {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="buildingsquad">
        {num && `${num}. `}Your Squad
      </h2>
      <div className="section">
        <p>
          Select the <a href="/squadTypes">SquadType</a> that best fits the way you want to play and build your squad using the <a href="/u">App</a>.
          Squads are typically built with a maximum value of 100 total GP (including all unit and gear costs).<br/>
          Your Squad can only include one Leader, and it cannot include more than 1 of each Unique Unit (marked with an asterisk <code>*</code>).<br/>
          When selecting Gear for your Squad (Weapons, Equipment, etc), any item whose name ends with an asterisk (<code>*</code>) is Unique and cannot be added more than once to your squad.
        </p>
        <p>
          You can build your squad in the <Link className="underline" href="/">App/Site</Link>, or print and fill your own <Link className="underline" href="/assets/Ruinstars_SquadSheet.pdf">Squad Sheet</Link>.
        </p>
        <p className="printonly">
          Refer to the end of this rule book for the complete list of factions, SquadTypes, Units, and Gear.
        </p>
        <h3>Factions</h3>
        
        <FactionList />
      </div>
    </div>
  )}
