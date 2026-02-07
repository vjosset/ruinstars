import FactionList from '@/components/faction/FactionList'
import { PDFLink } from '@/components/nav/Links'
import Link from 'next/link'

export default async function RulesYourSquad({ num }: {num?: Number | null}) {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="buildingsquad">
        {num && `${num}. `}Building Your Squad
      </h2>
      <div className="section twocols">
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
            <strong>For your <a className="underline" href="#firstmission">first mission</a></strong>, use the Starter Squad at the end of this book.
            The Starter Squad is a multi-purpose Squad of Hegemony Interdictors that exposes the core principles of the game.
          </p>
          <p>
            For your next Mission, select the <a href="/factions">Faction</a> that best fits the way you want to play and build your Squad using the <a href="/me">Squad Builder</a>.
            Squads are typically built with a maximum value of <strong>100 total GP</strong> (including all unit and gear costs).<br/>
            Your Squad can only include one Leader, and it cannot include more than 1 of each Unique Unit (marked with an asterisk <code>*</code>).<br/>
            When selecting Gear for your Squad (Weapons, Equipment, etc), any item whose name ends with an asterisk (<code>*</code>) is Unique and cannot be added more than once to your squad.
          </p>
          <p>
            You can build your squad in the <Link className="underline" href="/">app/site</Link>, or print and fill your own <PDFLink href="/assets/Ruinstars_SquadSheet.pdf" title="Squad Sheet" />.
          </p>
        </div>
        <div className="section">
          When playing cooperatively, players may choose one of the following formats:
          <ul>
            <li>
              <strong>Shared Squad:</strong><br/>
              Players share control of one full 100 GP Squad.
              Players take turns activating Units in that Squad.
            </li>
            <li>
              <strong>Mini Squads:</strong><br/>
              Each player deploys a reduced-size Squad from any faction:
              <ul>
                <li>2 Players → 50 GP each</li>
                <li>3 Players → 34 GP each</li>
                <li>4 Players → 25 GP each</li>
              </ul>
              Notes:
              <ul>
                <li>Only one Unit across mini squads may be the Leader</li>
                <li>Units that are in different mini-Squads are considered to be Squadmates.</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <h3>Factions</h3>
      
      <FactionList />
    </div>
  )}
