import FactionList from '@/components/faction/FactionList'
import { PDFLink } from '@/components/nav/Links'
import Link from 'next/link'

export default async function RulesYourSquad({ num }: {num?: number | null}) {
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="buildingsquad">
        {num && `${num}. `}Building Your Squad
      </h2>
      <div className="section twocols">
        <div className="section">
          <p>
            A standard Squad is 4-10 Units built from your chosen Faction's available Units, with a total cost of <strong>100 GP</strong>, including all units and gear. Full Faction lists are available in the <PDFLink href="/assets/Factions - Ruinstars.pdf" title="Factions" /> or on the <Link className="underline" href="/factions">Factions Page</Link>.
          </p>
          <p>
            <strong>For your <a className="underline" href="#firstmission">first mission</a></strong>, use the Starter Squad provided: a multi-purpose Hegemony Interdictor squad that covers the core rules in play.
          </p>
          <p>
            When building your squad, keep these rules in mind:
          </p>
          <ul>
            <li>
              Your squad must include exactly one Leader.
            </li>
            <li>
              Units, Skills, and Weapons marked with an asterisk (<code>*</code>) are Unique: your squad may only include one of each.
            </li>
            <li>
              Each unit card lists its available gear, weapons, and skills. Items with a GP cost are optional; add that cost to your total if selected.<br/>
              Items marked with an asterisk (<code>*</code>) are also optional and Unique: only one Unit in your Squad may have it.
            </li>
          </ul>
          <p>
            Build your Squad using the <Link className="underline" href="/me">app</Link>, or print and fill your own <PDFLink href="/assets/Ruinstars_SquadSheet.pdf" title="Squad Sheet PDF" />.
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
