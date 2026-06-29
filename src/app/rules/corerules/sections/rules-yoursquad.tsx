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
            A standard Squad is 4-10 Units built from your chosen Faction's available Units, with a total cost of <strong>100 GP</strong>, including all units and gear.
            Full Faction lists are available in the <PDFLink href="/assets/books/Factions - Ruinstars.pdf" title="Factions" /> or on the <Link className="underline" href="/factions">Factions Page</Link>.
          </p>
          <p className="section rounded border border-main mx-8 p-2 mt-4">
            <strong>For your <a className="underline" href="#firstmission">first mission</a></strong>, use the Starter Squad provided: a multi-purpose Hegemony Interdictor squad that covers the core rules in play.
          </p>
        </div>
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
          </ul>

          A typical Full Squad consists of:
          <ul>
            <li>4-10 Units</li>
            <li>A mix of specialists and line Units</li>
            <li>Enough redundancy to absorb losses without immediate failure</li>
          </ul>
          <p>
            Build your Squad using the <Link className="underline" href="/me">app</Link>, or print and fill your own <PDFLink href="/assets/tools/Ruinstars_SquadSheet.pdf" title="Squad Sheet" />.
          </p>
        </div>
        <div className="section">
          <h3>Unit and Gear Selection</h3>
          <ul>
            <li>
              <strong>Select Units</strong><br/>
              Select 4-10 Units from that faction's Unit list. Your squad must include exactly one Leader.
              Units marked with an asterisk (<code>*</code>) are Unique: include at most one of each.
            </li>
            <li>
              <strong>Select Gear, Weapons, and Skills</strong><br/>
              Each unit card lists its available gear, weapons, and skills. Items with a GP cost are optional: add that cost to your total if selected.
              Items marked with an asterisk (<code>*</code>) are optional and Unique: only one unit in your squad may have it.<br/>
              <strong>Squad Specialties</strong> are are common skills for all Units within a Squad. If your Squad has multiple options, select one and apply it to all Units.<br/>
              All other items can be included at no cost except <strong>Spoils Of War</strong>, which are rewards earned in Campaign Play.
            </li>
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
      </div>

      <h3>Factions</h3>
      <FactionList />
    </div>
  )}
