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
              The stars are dying, the gods are silent, and the empires that once ruled the galaxy have crumbled into ash and echoes.<br/>
              Across a fractured void of decaying worlds and haunted relics, scattered fireteams carry out the final orders of long-dead masters.<br/>
              There is no hope of victory - only duty and the bitter certainty that each mission may be the last.<br/>
              In the shadows of ancient horrors and cursed machines, elite squads wage desperate black ops in a war that has lost all meaning...
            </div>
          </div>
          <div className="section">
            <h3>What Is This Game?</h3>
            <p>
              {GAME.NAME} is a narrative sci-fi skirmish wargame about doomed squads on dark-ops missions, and the brutal choices that decide who gets to walk away.
              Fast, lethal, objective-driven skirmishes with campaign persistence, built for solo and co-op play.
            </p>
            <ul>
              <li><strong>Squad-Scale Tactics:</strong> Command 4-10 Units in tight, terrain-heavy fights where positioning and timing matter more than raw stats.</li>
              <li><strong>Lethal & Decisive:</strong> Fast and brutal combat rewards tactical decisions.</li>
              <li><strong>Mission First:</strong> Every game is a mission with a clear payoff and consequences.</li>
              <li><strong>Narrative Without the Bloat:</strong> Campaign play adds scars, rewards, and hard choices, without turning your table into bookkeeping.</li>
              <li><strong>Play How You Like:</strong> Designed for one-off missions, narrative campaigns, or the gauntlet that is Horde Mode.</li>
            </ul>
          </div>
        </div>
        <div className="twocols">
          <div className="section">
            <h3 className="py-3 font-title" id="introduction">
              At A Glance
            </h3>
            <ul>
              <li><strong>Players:</strong> 1-4 in PvE solo/co-op, or 2 in PvP</li>
              <li><strong>Session Length:</strong> ~30-60 minutes depending on mission and squad size</li>
              <li><strong>Model Count:</strong> 4-10 per side</li>
              <li><strong>Dice:</strong> <code>D6</code>-based core resolution</li>
              <li><strong>Table Size:</strong> Works on compact tables with dense terrain, typically 2' x 2'</li>
              <li><strong>Play Modes:</strong> PvE solo or co-op campaigns, Horde Mode, and PvP</li>
            </ul>
          </div>
          <div className="section">
            <h3 className="py-3 font-title" id="introduction">
              Getting Started
            </h3>
            <ol>
              <li>Download the <Link className="underline" target="_blank" href="/assets/Core Rules - Ruinstars.pdf">Core Rules</Link></li>
              <li>Gather some dice (<code>D{GAME.DICE_BASIS}</code>) and your miniatures</li>
              <li>Play the introductory first Mission</li>
              <li>Select your <Link className="underline" href="/factions">Faction</Link> and build your Squad</li>
              <li>Play your first Core Mission, start your Campaign, or test your mettle in Horde Mode!</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  )}
