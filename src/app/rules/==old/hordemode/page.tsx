import { GAME } from '@/lib/config/game_config'

import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import MissionCard from '@/components/shared/MissionCard'
import Markdown from '@/components/ui/Markdown'
import PageBreak from '@/components/ui/PageBreak'
import PageTitle from '@/components/ui/PageTitle'
import UnitCard from '@/components/unit/UnitCard'
import HordeDeployments from '@/data/horde_deployments'
import { GearCategoryService, SpecialService, SquadService } from '@/services'
import HordeModeQuickRef from './sections/rules-horde-quickref'
import { PDFLink } from '@/components/nav/Links'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Horde Mode',
    description: `The rules for Horde Mode, a solo/coop mode for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{ url: '/icons/icon-big.png', width: 512, height: 512 }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules/books/hordemode'
  })
}

export default async function Rules() {
  const versionTimestamp = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date()).replaceAll('-', '')
  const hordeUnits = await SquadService.getSquad('HRD')
  const allSpecials = await SpecialService.getAllSpecials()
  const injuries = await GearCategoryService.getGearCategory('INJ')
  const spoilsOfWar = await GearCategoryService.getGearCategory('SOW')
  
  return (
    <>
      {/* Cover */}
      <img src="/img/rules/BookCover_Framed.webp" className="printonly fullpage overflow-y-hidden" style={{pageBreakAfter: 'always'}} loading="eager" decoding="async" />
      <div className="printonly absolute left-1/2 top-1/4 -translate-x-1/2">
        <div className="text-white text-center font-title text-2xl tracking-wide bg-black/70 px-6 py-3 rounded-lg shadow-lg">
          <h1>Horde Mode</h1>
          <p className="text-md">
            2nd Edition <span className="text-sm">v{versionTimestamp}</span>
          </p>
        </div>
      </div>

      <div className="rules px-3 max-w-7xl mx-auto">
        <div className="section">
          <h1 className="text-center py-3 font-title"   id="horde">
            Horde Mode
          </h1>

          <div className="twocols">
            <div className="flavor section">
              No extraction was planned. The signal was a lie, the drop zone already dead before the first boots hit ash.
              Now the horde is coming. Endless, relentless, testing the walls with teeth and claws and fire.
              Ammunition runs thin. Wounds pile up. Orders come through broken comms and half-functional consoles.
              Between each assault there is only enough time to drag the wounded clear, reinforce the barricades, and spend the last scraps of authority and materiel before the next wave hits harder than the last.
              <br/><br/>
              There is no triumph to be claimed here, only the mercy of a few stolen minutes.
            </div>
            <p className="section">
              <strong>Horde Mode</strong> is a solo or cooperative survival mode for Ruinstars in which one Squad fights against escalating waves of enemies.
              Each Wave brings new threats, stronger enemies, and unpredictable battlefield events.
              Players must balance aggression, positioning, resource management, and emergency recovery as the enemy pressure steadily increases.
              The Horde never stops coming; only brief respites between Waves allowing Units to patch wounds, recover supplies, and deploy defenses.
              <br/><br/>
              Unlike standard Missions, Horde Mode has no fixed objective beyond survival.
              Waves only end when all Horde Units are Taken Out, and difficulty steadily rises as the battle grinds on.
              Special Turn Events, supply drops, reinforcements, and Boss encounters ensure that no two runs play the same.
              Victory comes by finding how long your Squad can stand before being overwhelmed.
            </p>
            <p>
              Note you will need the <PDFLink href="/assets/books/Core Rules - Ruinstars.pdf" title='Core Rules' /> to play this mode.
            </p>
          </div>

          <h3>The Game Cycle</h3>
          <div className="twocols">
            <div className="section">
              <ol className="border border-main rounded-md m-2 mx-4 xl:mx-24">
                <li>Set up battlefield</li>
                <li>Deploy Player Squad</li>
                <li>
                  Play Waves
                  <ol>
                    <li>Spawn Horde Units</li>
                    <li>Roll Wave Objective</li>
                    <li>Play Turns until all Horde Units are Taken Out</li>
                    <li>Spend MP and prepare for the next Wave</li>
                  </ol>
                </li>
              </ol>
            </div>

            <div className="section">
              <h4>Set up Battlefield</h4>
              Set up the battlefield following its instructions. Define player deployment zones, enemy spawn zones, and place any terrain.
              See the battlefields listed below for details.
            </div>

            <div className="section">
              <h4>Deploy the Player Squad</h4>
              Deploy all Player Units in the battlefield's deployment zone.<br/>
              In Horde mode, players deploy a normal 100GP Squad.  
              When playing cooperatively, players may choose one of the following formats:
              <ul>
                <li>
                  <strong>Shared Squad:</strong><br/>
                  Players share control of one full 100 GP Squad.
                  Players take turns activating Units in that Squad.
                </li>
                <li>
                  <strong>Mini Squads:</strong><br/>
                  Each player deploys a reduced-size Squad:
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
                </li>
              </ul>
            </div>

            <div className="section">
              <h4>Playing a Wave</h4>
              Each Wave follows the same sequence:
              <ol>
                <li>
                  <strong>Spawn Horde Units</strong><br/>
                  Spawn Horde Units according to the Wave table below.
                </li>
                <li>
                  <strong>Roll Wave Objective</strong><br/>
                  Roll or select a Wave Objective (see below). This objective remains in effect for the duration of the Wave.
                </li>
                <li>
                  <strong>Play Turns</strong><br/>
                  Each Wave lasts for a series of Turns until all Horde Units are Taken Out.
                </li>
                <li>
                  <strong>Upgrades</strong><br/>
                  Earn the MP listed for the Wave and spend your earned MP on Upgrades (see below), then prepare for the next Wave.
                </li>
              </ol>
            </div>

            <div className="section">
              <h4>Turn Sequence</h4>
              <ol>
                <li>Roll Tactical Orders (TO)</li>
                <li>
                  Turn Event<br/>
                  For Turns 1-4 of a Wave, roll on the Turn Events table below.<br/>
                  For Turns 5+ of a Wave, the Turn Event is always <strong>Enemy Reinforcements</strong>.
                </li>
                <li>
                  Activations
                  <ul>
                    <li>Player Squad always has initiative</li>
                    <li>Activate one Player Unit</li>
                    <li>
                      Activate one Horde Unit. Follow that Unit's <strong>Behavior</strong> skill.<br/>
                      <u>Note:</u> If a Horde Boss is present, it activates first
                    </li>
                    <li>Repeat until all Units have activated</li>
                  </ul>
                </li>
                <li>
                  End of Turn<br/>
                  If there are no Standing Horde Units, the Wave ends.
                </li>
              </ol>
            </div>
          </div>

          <div className="section">
            <h3>Downed Units</h3>
            <div className="twocols">
              <div className="section">
                <p>
                  When a Player Unit reaches zero <code>HIT</code>, do not remove it from the battlefield.
                  Instead, set it on its side to indicate its <strong>Downed</strong> status.
                  Downed Units are ignored by Horde Units, cannot be targeted in combat, and do not take any Damage.
                  <br/>
                  During their activation, Downed Units may only perform the Move, Dash, or Revive actions. Move and Dash do not trigger Attacks of Opportunity.<br/>
                  If all Player Units are Downed or Deceased, the Mission ends in failure.
                </p>
              </div>
              <div className="section">
                <h5>Reviving Downed Units</h5>
                <p>
                  A Standing Unit may revive a Downed Squadmate it Controls, and a Downed Unit may revive itself if it Controls a Standing Squadmate.
                  
                  Whenever a Downed Unit is revived, it gains one random Injury (see Injuries below).<br/>
                  <strong>Mission Action - Revive - 2 ACT</strong>: The Downed Unit returns as Standing with <code>1 HIT</code> remaining.
                </p>
              </div>
            </div>
          </div>

          <div className="section">
            <h3>Deployments</h3>

            <div className="twocols">
              {HordeDeployments.map((mission) => (
                <MissionCard key={mission.missionId} mission={mission} showDescription={true} />
              ))}
            </div>
          </div>

          <PageBreak />
          <div className="section">
            <h3>Spawning Horde Units</h3>
            At the start of each wave, roll <code>3D6</code>. Each die result maps to a Horde Unit and its quantity to Spawn.
            <br/>
            For example, in Wave 5, we roll <code>3D6</code> and get <code>1, 3, 6</code>.
            This maps to:
            <ul>
              <li>6 Ruin Stalkers (<code>1</code> and <code>3</code>, each mapping to 3 Ruin Stalkers)</li>
              <li>1 Razorhowl Reaver (<code>6</code>)</li>
            </ul>
            When placing Spawned Units, place the first Unit Adjacent to the first Spawn point, the second Unit Adjacent to the second Spawn point, etc.
            If you run out of Spawn points, just start back on the first one.
            <br/><br/>
            For Boss Waves (4, 8, and 12), select a random Boss Unit and follow its Spawn instructions for placement and other rules.
            If you already fought the selected Boss in a previous Wave, re-roll until you get a Boss you haven't fought yet.
          </div>
          
          <div className="section">
            <h3>Wave Table</h3>

            <div style={{columns: '300px'}}>
              <div className="section">
                <h4 id="act-1-waves-1-4">ACT 1 - WAVES 1-4</h4>

                <table>
                  <thead>
                    <tr>
                      <th style={{textAlign: 'center'}}>Wave</th>
                      <th style={{textAlign: 'center'}}>Roll</th>
                      <th>Spawns</th>
                      <th>MP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{textAlign: 'center'}}><strong>Wave 1</strong></td>
                      <td style={{textAlign: 'center'}}>1-4</td>
                      <td>3x Carrion Leech</td>
                      <td>4</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>5</td>
                      <td>2x Blight Herald</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>6</td>
                      <td>1x Ruin Stalker</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td style={{textAlign: 'center'}}><strong>Wave 2</strong></td>
                      <td style={{textAlign: 'center'}}>1-4</td>
                      <td>3x Toxin Spitter</td>
                      <th>5</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>5</td>
                      <td>2x Blight Herald</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>6</td>
                      <td>1x Ashline Gunner</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td style={{textAlign: 'center'}}><strong>Wave 3</strong></td>
                      <td style={{textAlign: 'center'}}>1-2</td>
                      <td>3x Carrion Leech</td>
                      <th>6</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>3-4</td>
                      <td>3x Toxin Spitter</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>5</td>
                      <td>2x Blight Herald</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>6</td>
                      <td>1x Ruin Stalker</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td style={{textAlign: 'center'}}><strong>Wave 4</strong></td>
                      <td style={{textAlign: 'center'}}>1-2</td>
                      <td>3x Carrion Leech</td>
                      <th>10</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>3-4</td>
                      <td>3x Toxin Spitter</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>5</td>
                      <td>2x Blight Herald</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>6</td>
                      <td>1x Ruin Stalker</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}></td>
                      <td>+ 1 Random Boss</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="section">
                <h4 id="act-2-waves-5-8">ACT 2 - WAVES 5-8</h4>

                <table>
                  <thead>
                    <tr>
                      <th style={{textAlign: 'center'}}>Wave</th>
                      <th style={{textAlign: 'center'}}>Roll</th>
                      <th>Spawns</th>
                      <th>MP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{textAlign: 'center'}}><strong>Wave 5</strong></td>
                      <td style={{textAlign: 'center'}}>1-4</td>
                      <td>3x Ruin Stalker</td>
                      <th>8</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>5</td>
                      <td>2x Dustborn Thrall</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>6</td>
                      <td>1x Razorhowl Reaver</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td style={{textAlign: 'center'}}><strong>Wave 6</strong></td>
                      <td style={{textAlign: 'center'}}>1-4</td>
                      <td>3x Ashline Gunner</td>
                      <th>9</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>5</td>
                      <td>2x Dustborn Thrall</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>6</td>
                      <td>1x Graveward Sentinel</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td style={{textAlign: 'center'}}><strong>Wave 7</strong></td>
                      <td style={{textAlign: 'center'}}>1-2</td>
                      <td>3x Ruin Stalker</td>
                      <th>10</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>3-4</td>
                      <td>3x Ashline Gunner</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>5</td>
                      <td>2x Dustborn Thrall</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>6</td>
                      <td>1x Razorhowl Reaver</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td style={{textAlign: 'center'}}><strong>Wave 8</strong></td>
                      <td style={{textAlign: 'center'}}>1-2</td>
                      <td>3x Ruin Stalker</td>
                      <th>14</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>3-4</td>
                      <td>3x Ashline Gunner</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>5</td>
                      <td>2x Dustborn Thrall</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>6</td>
                      <td>1x Razorhowl Reaver</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}></td>
                      <td>+ 1 Random Boss</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="section">
                <h4 id="act-3-waves-9-12">ACT 3 - WAVES 9-12</h4>
                <table>
                  <thead>
                    <tr>
                      <th style={{textAlign: 'center'}}>Wave</th>
                      <th style={{textAlign: 'center'}}>Roll</th>
                      <th>Spawns</th>
                      <th>MP</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{textAlign: 'center'}}><strong>Wave 9</strong></td>
                      <td style={{textAlign: 'center'}}>1-4</td>
                      <td>3x Razorhowl Reaver</td>
                      <th>12</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>5-6</td>
                      <td>3x Last-Light Executioner</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td style={{textAlign: 'center'}}><strong>Wave 10</strong></td>
                      <td style={{textAlign: 'center'}}>1-4</td>
                      <td>3x Graveward Sentinel</td>
                      <th>13</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>5-6</td>
                      <td>3x Last-Light Executioner</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td style={{textAlign: 'center'}}><strong>Wave 11</strong></td>
                      <td style={{textAlign: 'center'}}>1-2</td>
                      <td>3x Razorhowl Reaver</td>
                      <th>14</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>3-4</td>
                      <td>3x Graveward Sentinel</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>5-6</td>
                      <td>3x Last-Light Executioner</td>
                    </tr>
                    <tr className="border-t border-border">
                      <td style={{textAlign: 'center'}}><strong>Wave 12</strong></td>
                      <td style={{textAlign: 'center'}}>1-2</td>
                      <td>3x Razorhowl Reaver</td>
                      <th>18</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>3-4</td>
                      <td>3x Graveward Sentinel</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}>5-6</td>
                      <td>3x Last-Light Executioner</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td style={{textAlign: 'center'}}></td>
                      <td>+ 1 Random Boss</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="section twocols">
            <div className="section">
              {/* <div className="section">
                <h3>Wave Mods</h3>
                <p>At the start of each Wave, before spawning Horde Units, roll <code>1D6</code> to determine a modifier for this wave.</p>
                
                <div>
                  <strong>1: Nothing</strong>
                  <div className="ml-4">Nothing special this Wave.</div>
                </div>
                <div>
                  <strong>2: Lull</strong>
                  <div className="ml-4">-1 difficulty for this wave (minimum 0).</div>
                </div>
                <div>
                  <strong>3: Surge</strong>
                  <div className="ml-4">After spawning Horde Units for this Wave, all Horde Units perform 1 free Action.</div>
                </div>
                <div>
                  <strong>4: Preempt</strong>
                  <div className="ml-4">After spawning Horde Units for this Wave, all Player Units may perform 1 free Action.</div>
                </div>
                <div>
                  <strong>5: Rage</strong>
                  <div className="ml-4">+1 difficulty for this wave (maximum 6).</div>
                </div>
                <div>
                  <strong>6: Clear Shots</strong>
                  <div className="ml-4">During the first Turn of this Wave, Player Units gain +1 <code>ATT</code> on their Ranged weapons.</div>
                </div>
              </div>
              */}
              <div className="section">
                <h3>Turn Events</h3>
                <p>
                  At the start of each Turn, roll <code>2D6</code> to determine a special event for the Turn.
                  If the Wave is in Turn 5 or later, do not roll Turn Events and apply the <strong>Enemy Reinforcements</strong> event instead.
                </p>
                <div>
                  <strong>2: Second Wind</strong>
                  <div className="ml-4">Select a Downed Unit. That Unit is Revived and returns as Standing with half its <code>HIT</code> remaining (round up). Apply one random Injury to that Unit.</div>
                </div>
                <div>
                  <strong>3: Field Dressing</strong>
                  <div className="ml-4">One Standing Player Unit regains 1 lost <code>HIT</code>.</div>
                </div>
                <div>
                  <strong>4: Opportunity</strong>
                  <div className="ml-4">One Player Unit may immediately spend up to <code>2 ACT</code> on actions before the start of the Turn. This does not count as that Unit's activation for the Turn.</div>
                </div>
                <div>
                  <strong>5: Supply Drop</strong>
                  <div className="ml-4">Place 3 crates in random places on the board. If a crate lands on a Unit, immediately treat it as a "Booby Trap" crate and deal damage accordingly. Do not place that crate on the battlefield.</div>
                </div>
                <div>
                  <strong>6: Strategic Command</strong>
                  <div className="ml-4">Player Squad gains <code>+2 TO</code>.</div>
                </div>
                <div>
                  <strong>7: Nominal</strong>
                  <div className="ml-4">The Horde presses on (no special event this Turn).</div>
                </div>
                <div>
                  <strong>8: Scrambled Comms</strong>
                  <div className="ml-4">Player Squad loses <code>-2 TO</code> (minimum 0).</div>
                </div>
                <div>
                  <strong>9: Encroaching Threat</strong>
                  <div className="ml-4">Each time a Horde Unit performs a Move Action during this Turn, it may move an additional 2".</div>
                </div>
                <div>
                  <strong>10: Enemy Reinforcements</strong>
                  <div className="ml-4">Roll <code>1D6</code> and Spawn 1 Horde Unit according to the Wave table for this Wave (ignore the Wave Table quantity).</div>
                </div>
                <div>
                  <strong>11: Coordinated Assault</strong>
                  <div className="ml-4">Horde Units have <code>+1 ATT</code> on their Melee and Ranged Weapons this Turn.</div>
                </div>
                <div>
                  <strong>12: Overrun</strong>
                  <div className="ml-4">All Horde Units immediately perform 1 Action according to their Behavior.</div>
                </div>
              </div>
            </div>

            <div className="section">
              <h3>Wave Objectives</h3>
              <p>Wave Objectives are optional bonuses; failure does not end the Wave.</p>
              <p>At the start of each Wave, roll <code>1D6</code> to determine the Wave's Objective. If a Wave Objective is not completed by the end of the Wave, that Wave Objective is failed.</p>
              <p>Once a Wave Objective is completed according to its Victory condition, select one of the rewards to apply to the Player Squad immediately.</p>
              <p>When placing Objectives, if an Anchor is already occupied, or is a Spawn Point, re-roll that placement.</p>
              <h4>Objectives</h4>
              <div>
                <strong>1: Battlefield Control</strong>
                <div className="ml-4">
                  <strong>Setup:</strong> Mark three random Anchors as Control points.<br/>
                  <strong>Victory:</strong> At the end of the Wave, the Player Squad controls all three Control points.<br/>
                  <strong>Rewards</strong> (pick one):
                  <ul>
                    <li>+4 MP</li>
                    <li>In the next Wave, roll <code>2D6</code> for Horde Spawns instead of <code>3D6</code>.</li>
                  </ul>
                </div>
              </div>
              <div>
                <strong>2: Destroy Nexus</strong>
                <div className="ml-4">
                  <strong>Setup:</strong> Place a Nexus marker on 3 random Anchors.<br/>
                  <strong>Special:</strong> Nexus Markers are items with <code>ARM 3</code> and <code>HIT 2</code> and can be targeted in combat.<br/>
                  <strong>Victory:</strong> All Nexus Markers Taken Out by the end of the Wave.<br/>
                  <strong>Rewards</strong> (pick one):
                  <ul>
                    <li>+4 MP</li>
                    <li>All Horde Units immediately take 2 damage.</li>
                  </ul>
                </div>
              </div>
              <div>
                <strong>3: Overwhelming Force</strong>
                <div className="ml-4">
                  <strong>Victory:</strong> End the Wave within 2 Turns.<br/>
                  <strong>Rewards</strong> (pick one):
                  <ul>
                    <li>+4 MP</li>
                    <li>One Standing Player Unit regains 1 lost <code>HIT</code>.</li>
                  </ul>
                </div>
              </div>
              <div>
                <strong>4: Protect The Asset</strong>
                <div className="ml-4">
                  <strong>Setup:</strong> Place an Asset marker on a random Anchor. Assets are Items with <code>ARM 3 HIT 3</code>.<br/>
                  <strong>Special:</strong> Horde Units will always prioritize targeting the Asset instead of Player Units in combat.<br/>
                  <strong>Victory:</strong> The Asset still has at least 1 <code>HIT</code> at the end of the Wave.<br/>
                  <strong>Rewards</strong> (pick one):
                  <ul>
                    <li>+4 MP</li>
                    <li>Player Squad gains +4 TO in the first Turn of the next Wave.</li>
                  </ul>
                </div>
              </div>
              <div>
                <strong>5: Disruption Field</strong>
                <div className="ml-4">
                  <strong>Setup:</strong> Place a Disruptor Pylon on 3 random Anchors.<br/>
                  <strong>Mission Action - Calibrate Pylon (2ACT):</strong> A Unit that Controls a Disruptor Pylon calibrates it. Remove that Pylon from the battlefield.<br/>
                  <strong>Victory:</strong> All 3 Disruptor Pylons have been calibrated.<br/>
                  <strong>Rewards</strong> (pick one):
                  <ul>
                    <li>+4 MP</li>
                    <li>All Horde Units lose -1 <code>ATT</code> (minimum 1) on their Ranged and Melee weapons until the end of the Wave.</li>
                  </ul>
                </div>
              </div>
              <div>
                <strong>6: The Artifact</strong>
                <div className="ml-4">
                  <strong>Setup:</strong> Place a Search Marker on 3 random Anchors.<br/>
                  <strong>Mission Action - Search (2ACT):</strong> A Unit that Controls a Search Marker searches it. Roll <code>1D6</code>: On a 1 or 2, the Artifact is found. This roll cannot be modified or re-rolled using TO.<br/>
                  <strong>Victory:</strong> The Artifact is found.<br/>
                  <strong>Rewards</strong> (pick one):
                  <ul>
                    <li>+4 MP</li>
                    <li>One Player Unit immediately gains 1 Spoil of War</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="section twocols">
            <div className="section">
              <h3>Purchasing Upgrades</h3>
              <p>At the end of each Wave, you may spend your earned Mission Points on upgrades.</p>
              <p>MP are gained in the following ways:</p>
              <ul>
                <li>Completing waves</li>
                <li>Completing Wave Objectives</li>
                <li>Opening a Crate and rolling &quot;Stockpile&quot;</li>
              </ul>

              <h4>Upgrades:</h4>
              <ul>
                <li><strong>Ammunition (2 MP):</strong><br/> One Unit's Limited (<code>LIM</code>) weapon or "once per mission" skill can be used one additional time</li>
                <li><strong>Heal (4MP):</strong><br/> One Unit immediately regains 1 lost <code>HIT</code></li>
                {/*<li><strong>Grenade (4 MP):</strong><br/> One Unit gains a Grenade that can be used once for <code>1 ACT</code>: Throw grenade within 3 Paces. Deals 2 Ranged Damage to all Adjacent Units.</li>*/}
                <li><strong>Grenade (4 MP):</strong><br/> One Unit gains a Grenade that can be used once for <code>1 ACT</code>: Throw grenade within 6". Deals 2 Ranged Damage to all Adjacent Units.</li>
                <li><strong>Medpack (4MP):</strong><br/> One Unit gains a Medpack that can be used once for <code>1 ACT</code>: The Unit or a Squadmate it Controls regains <code>1D3</code> lost <code>HIT</code>.</li>
                <li><strong>Turret (6 MP):</strong><br/> One Unit gains a portable Turret it can place once for <code>1 ACT</code>: Place Turret Adjacent to Unit. Player Units that Control the Turret can use it instead of their Ranged Weapon(s) when performing a Ranged Combat attack, using <code>ATT 4 SKL 5</code>. When using the Turret, draw Line of Sight from the Turret instead of the active Unit. No <code>ACT</code> penalty for multiple uses in same activation. Remove the Turret from the battlefield once it has been used 5 times.</li>
                <li><strong>Spoil Of War (8 MP):</strong><br/> One Standing Unit gains one Spoil Of War</li>
                <li><strong>Reinforcements (8 MP):</strong><br/> One Downed Unit returns to Standing with 1 <code>HIT</code>s remaining. Apply one random injury to that Unit.</li>
              </ul>
            </div>

            <div className="section">
              <h3>Crates</h3>
              <p>
                Crate contents are unknown until they are opened.
                Crates are items with <code>ARM 3 HIT 1</code> and can be targeted in combat. If a crate reaches 0 <code>HIT</code>, it causes an explosion dealing 2 Damage to all Adjacent Units, then remove it from the battlefield.
              </p>
              <strong>Mission Action - Open Crate (1 ACT):</strong> A Unit that Controls a Crate opens it. Roll to determine its contents, then remove that Crate from the battlefield.

              <div>
                <strong>1: Stockpile</strong>
                <div className="ml-4">Player Squad gains +3 MP.</div>
              </div>
              <div>
                <strong>2: Command Uplink</strong>
                <div className="ml-4">Player Squad gains +2 TO.</div>
              </div>
              <div>
                <strong>3: Map</strong>
                <div className="ml-4">One Standing Player Unit may immediately perform a free Move action.</div>
              </div>
              <div>
                <strong>4: Relay Order</strong>
                <div className="ml-4">One Standing Player Unit may immediately perform a free Basic or Mission action for <code>1 ACT</code>.</div>
              </div>
              <div>
                <strong>5: Upgrade</strong>
                <div className="ml-4">Select and apply one free Upgrade of your choice (see "Upgrades" above).</div>
              </div>
              <div>
                <strong>6: Booby Trap</strong>
                <div className="ml-4">Causes an explosion dealing 2 Damage to all Adjacent Units.</div>
              </div>
            </div>
          </div>

          <div className="section twocols">
            <div className="section">
              <h3>Injuries</h3>
              <p>
                Each time a Downed Unit is revived, roll <code>1D6</code> to determine the Injury this Unit received.
                If the rolled Injury is one that the Unit already had, that Unit is Deceased and removed from the Battlefield.
              </p>
              <ul>
                {/* Injuries List */}
                {
                  injuries?.gears.map((injury) => (
                    <li key={`inj_${injury.gearId}`}>
                      <h6>{injury.gearName}</h6>
                      <Markdown>{injury.description}</Markdown>
                    </li>
                  ))
                }
              </ul>
            </div>

            <div className="section">
              <h3>Spoils Of War</h3>
              <ul>
                {/* Spoils Of War List */}
                {
                  spoilsOfWar?.gears.map((sow) => (
                    <li key={`sow_${sow.gearId}`}>
                      <h6>{sow.gearName}</h6>
                      <Markdown>{sow.description}</Markdown>
                    </li>
                  ))
                }
              </ul>
            </div>
          </div>

          <PageBreak />
          <PageTitle>Quick Reference</PageTitle>
          <HordeModeQuickRef />

          <PageBreak />
          <div className="section">
            <h3>Horde Units</h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {hordeUnits?.units?.map((u) => (
                <UnitCard 
                  key={u.unitTypeId}
                  seq={u.seq}
                  unit={u.toPlain()}
                  isOwner={false}
                  allSpecials={allSpecials.map((spec) => spec.toPlain())}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
