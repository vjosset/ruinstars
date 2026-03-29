import { GAME } from '@/lib/config/game_config'
import Link from 'next/link'

export default async function RulesIntro({ num, showTitle }: {num?: number | null, showTitle: boolean | false }) {
  return (
    <>
      <div className="section">
        {showTitle && (
          <h2 className="text-center py-3 font-title"   id="introduction">
            {num && `${num}. `}Introduction
          </h2>
        )}
        <div className="twocols">
          <div className="section">
            <h3>The galaxy is in ruins</h3>
            <div className="flavor">
              The stars are going out. The great empires are gone or gutted, their borders redrawn in ash.
              The ruins are the prize now, and there is no shortage of takers.
              <br/><br/>
              The galaxy is dying. War lives on.
            </div>
          </div>
          <div className="section">
            <h3>What Is This Game?</h3>
            <p>
              {GAME.NAME} is a narrative sci-fi skirmish wargame about elite squads on dark-ops missions, and the brutal choices that decide who gets to walk away.
              Fast, lethal, and objective-driven. Built for solo, co-op, and competitive play.
            </p>
            <ul>
              <li><strong>Squad-Scale Tactics:</strong> Command 4-10 Units in tight, terrain-heavy fights where positioning and timing matter more than raw stats.</li>
              <li><strong>Narrative Without the Bloat:</strong> Campaign play adds scars, rewards, and hard choices, without turning your table into bookkeeping.</li>
              <li><strong>Play Modes:</strong> PvE solo or co-op campaigns, PvP, and Horde Mode.</li>
            </ul>
          </div>
        </div>
        <div className="twocols">
          <div className="section">
            <h3 className="py-3 font-title" id="introduction">
              At A Glance
            </h3>
            <ul>
              <li><strong>Players:</strong> 1-4 (PvE), or 2 (PvP)</li>
              <li><strong>Sessions:</strong> ~45-90 minutes</li>
              <li><strong>Dice:</strong> <code>D6</code></li>
              <li><strong>Table Size:</strong> 2' x 2'</li>
              <li><strong>Free:</strong> Download the <Link href="/rules">complete rules</Link></li>
            </ul>
          </div>
          <div className="section">
            <h3 className="py-3 font-title" id="introduction">
              Getting Started
            </h3>
            <ol>
              <li>Download the <Link className="underline" target="_blank" href="/assets/books/Core Rules - Ruinstars.pdf">Core Rules</Link></li>
              <li>Gather some dice (<code>D{GAME.DICE_BASIS}</code>) and your miniatures</li>
              <li>Play the Intro Mission (in the Core Rules, p. 10)</li>
              <li>Select your <Link className="underline" href="/factions">Faction</Link> and build your Squad</li>
              <li>Play your first PvP Mission, start your PvE Campaign, or test your mettle in Horde Mode</li>
            </ol>
          </div>
          <div className="section">
            <h3>The App</h3>
            Draft a Squad, manage your GP budget, and share it with a link.<br/>
            <Link className="section underline" href="/auth/signup">Create a free account</Link> to get started.
          </div>
        </div>
      </div>
    </>
  )}
