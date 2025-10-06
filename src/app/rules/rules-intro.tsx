import { getAuthSession } from '@/lib/auth'
import { GAME } from '@/lib/config/game_config'
import Link from 'next/link'

export default async function RulesIntro({ showTitle = false }) {
  const session = await getAuthSession()
  const isAuth = !!session?.user?.userId
  return (
    <>
      <div className="section">
        {showTitle && (
          <h2 className="text-center py-3 font-title"   id="introduction">
          1. Introduction
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
          </div>
          <div className="section">
            <h3>What Is This Game?</h3>
            <p>
              {GAME.NAME} is an open-source, fast-paced, miniatures-agnostic tabletop skirmish game set during the final age of the galaxy.<br/>
              Players command small, hardened squads in high-lethality black ops missions across fractured star systems.<br/>
              Fight in the shadows of dying gods, decaying empires, and forgotten horrors as the last battles rage.
            </p>
            <h3 className="py-3 font-title" id="introduction">
              Getting Started
            </h3>
            <ol>
              <li>
                Download the <Link className="underline" target="_blank" href="/assets/Ruinstars_Rules_FullColor.pdf">Rules</Link>
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
              <li>Play your first Mission!</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  )}
