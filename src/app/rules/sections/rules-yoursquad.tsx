import FactionList from '@/components/faction/FactionList'
import { PDFLink } from '@/components/nav/Links'
import Link from 'next/link'

export default async function RulesYourSquad({ num }: {num?: Number | null}) {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="buildingsquad">
        {num && `${num}. `}Building Your Squad
      </h2>
      <div className="section">
        <p>
          A standard Squad is typically composed of 4-10 Units, built from your chosen Faction's available Units.  
          Selections should total <strong>100 GP</strong>, including all Unit and gear selections.<br/>
          Will you select a few elite Units armed to the teeth, or opt for many grunts to overwhelm the battlefield and establish board control?
        </p>
        <br/>
        <p>
          Full Faction lists are available in the <PDFLink href="/assets/Ruinstars_Factions.pdf" title="Factions" /> or on the <Link className="underline" href="/factions">Factions Page</Link>.
          <br/>
          For your first mission, use the Starter Squad at the end of this book.
          The Starter Squad is a multi-purpose Squad of Hegemony Interdictors that exposes the core principles of the game.
        </p>
        <p>
          Select the <a href="/factions">Faction</a> that best fits the way you want to play and build your squad using the <a href="/me">App</a>.
          Squads are typically built with a maximum value of 100 total GP (including all unit and gear costs).<br/>
          Your Squad can only include one Leader, and it cannot include more than 1 of each Unique Unit (marked with an asterisk <code>*</code>).<br/>
          When selecting Gear for your Squad (Weapons, Equipment, etc), any item whose name ends with an asterisk (<code>*</code>) is Unique and cannot be added more than once to your squad.
        </p>
        <p>
          You can build your squad in the <Link className="underline" href="/">app/site</Link>, or print and fill your own <Link className="underline" href="/assets/Ruinstars_SquadSheet.pdf">Squad Sheet</Link>.
        </p>
        <h3>Factions</h3>
        
        <FactionList />
      </div>
    </div>
  )}
