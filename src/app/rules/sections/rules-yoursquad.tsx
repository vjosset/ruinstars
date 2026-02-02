import FactionList from '@/components/faction/FactionList'
import Link from 'next/link'

export default async function RulesYourSquad({ num }: {num?: Number | null}) {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="buildingsquad">
        {num && `${num}. `}Building Your Squad
      </h2>
      <div className="section">
        <p>
          A standard Squad is typically compose of 4-10 Units, built from your chosen Faction's available Units. 
          Actual Squad size depdends on your selected faction and how you choose to compose it.
          Selections should total <strong>100 GP</strong>, including all Unit and gear selections.<br/>
          Will you select a few elite Units armed to the teeth, or opt for many grunts to overwhelm the battlefield and establish board control?
        </p>
        <p>
          Full Faction lists are available in the <Link href="/assets/Ruinstars-Factions.pdf">Factions PDF</Link>.
          For your first mission, start with the Starter Squad at the end of this book.
          The Starter Squad is a solid, multi-purpose Squad of Hegemony Interdictors that exposes the core principles of the game without overloading players with synergies and complex abilities.
        </p>
        <p>
          Select the <a href="/squadTypes">SquadType</a> that best fits the way you want to play and build your squad using the <a href="/me">App</a>.
          Squads are typically built with a maximum value of 100 total GP (including all unit and gear costs).<br/>
          Your Squad can only include one Leader, and it cannot include more than 1 of each Unique Unit (marked with an asterisk <code>*</code>).<br/>
          When selecting Gear for your Squad (Weapons, Equipment, etc), any item whose name ends with an asterisk (<code>*</code>) is Unique and cannot be added more than once to your squad.
        </p>
        <p>
          You can build your squad in the <Link className="underline" href="/">App/Site</Link>, or print and fill your own <Link className="underline" href="/assets/Ruinstars_SquadSheet.pdf">Squad Sheet</Link>.
        </p>
        <h3>Factions</h3>
        
        <FactionList />
      </div>
    </div>
  )}
