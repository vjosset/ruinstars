import { getAuthSession } from '@/lib/auth'
import { GAME } from '@/lib/config/game_config'
import Link from 'next/link'
import IgnoreFirstMission from './rules-ignorefirstmission'

export default async function RulesIntro({ num, showTitle }: {num?: number | null, showTitle: boolean | false }) {
  const session = await getAuthSession()
  const isAuth = !!session?.user?.userId
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
              In the shadows of ancient horrors and cursed machines, elite squads wage desperate black ops in a war that has lost all meaning... but not all purpose.<br/>
              <br/>
              Welcome to {GAME.NAME} - where only ruins remain, and only war endures.
            </div>
            <h3>What Is This Game?</h3>
            <p>
              {GAME.NAME} is a squad-scale sci-fi skirmish wargame about doomed squads, impossible missions, and the brutal choices that decide who gets to walk away.<br/>
              The stars are dying. The empires are ash. Your Squad is what remains.
            </p>
            <p >
              Fast, lethal, objective-driven skirmishes with campaign persistence, built for PvP, solo, and co-op play.
              <br/><br/>
            </p>
            <ul>
              <li><strong>Squad-Scale Tactics:</strong> Command 4-10 Units in tight, terrain-heavy fights where positioning and timing matter more than raw stats.</li>
              <li><strong>Lethal & Decisive:</strong> Units don't sponge damage. Mistakes get punished. Victories are earned.</li>
              <li><strong>Mission First:</strong> Ruinstars is built around objectives, not just body counts. Every game is a mission with a clear payoff and consequences.</li>
              <li><strong>Narrative Without the Bloat:</strong> Campaign play adds scars, rewards, and hard choices, without turning your table into bookkeeping.</li>
              <li><strong>Play How You Like:</strong> Designed for head-to-head, solo, or co-op using NPC behaviors, campaign and operation structure, and Horde Mode.</li>
            </ul>
          </div>
          <div className="section">
            <h3 className="py-3 font-title" id="introduction">
              At A Glance
            </h3>
            <ul>
              <li><strong>Players:</strong> 2 (PvP) • 1-2 (Solo/Co-op)</li>
              <li><strong>Session Length:</strong> ~45-90 minutes depending on mission and squad size</li>
              <li><strong>Model Count:</strong> 4-10 per side</li>
              <li><strong>Dice:</strong> <code>D6</code>-based core resolution</li>
              <li><strong>Table Size:</strong> Works on compact tables with dense terrain, typically 2' x 2'</li>
              <li><strong>Campaign:</strong> Missions link into Operations: your Squad evolves, and the war remembers</li>
              <li><strong>Horde Mode:</strong> A solo or co-op mode where your Squad faces increasingly tough waves of enemies</li>
            </ul>
            <h3 className="py-3 font-title" id="introduction">
              Getting Started
            </h3>
            <ol>
              <li>
                Download the <Link className="underline" target="_blank" href="/assets/Ruinstars_Rules_FullColor.pdf">Rules</Link> { ' ' }
                (or <Link className="underline" target="_blank" href="/assets/Ruinstars_Rules.pdf">Printer-Friendly Version</Link>)
              </li>
              <li>Select your <Link className="underline" href="/factions">Faction</Link></li>
              {!isAuth && (
                <li>
                  Use a <Link href="/users/ruinstars" className="underline">sample squad</Link> or { ' ' }
                  <Link className="underline" href="/auth/signup">Sign Up</Link> to start building your own squads
                </li>
              )}
              {isAuth && (
                <li>Build your <Link className="underline" href="/me">Squads</Link></li>
              )}
              <li>Gather some dice (<code>D{GAME.DICE_BASIS}</code>), your miniatures, and <Link className="underline" target="_blank" href="/assets/Ruinstars_Tokens.pdf">tokens</Link></li>
              <li>Play your <Link className="underline" href="/rules#firstmission">first Mission</Link>!</li>
            </ol>
            <IgnoreFirstMission keyword="Tactical Orders, Unit Skills, and Weapon Specials" />
          </div>
        </div>
      </div>
    </>
  )}
