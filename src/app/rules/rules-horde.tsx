import MissionBlock from '@/components/shared/MissionBlock'
import UnitCard from '@/components/unit/UnitCard'
import hordemaps from '@/data/hordemaps.json'
import { SpecialService, SquadService } from '@/services'

export default async function RulesHorde({ num }: {num?: Number | null}) {
  const hordeUnits = await SquadService.getSquad('HRD')
  const allSpecials = await SpecialService.getAllSpecials()

  return (
    <div className="section">
      <h3 className="text-center py-3 font-title"   id="horde">
        {num && `${num}. `}Horde Mode
      </h3>

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
          <br/>
          Unlike standard Missions, Horde Mode has no fixed objective beyond survival.
          Waves only end when all Horde Units are Taken Out, and difficulty steadily rises as the battle grinds on.
          Special Turn Events, supply drops, reinforcements, and Boss encounters ensure that no two runs play the same.
          Victory comes by finding how long your Squad can stand before being overwhelmed.
        </p>
      </div>

      <div className="section twocols">
        <div className="section">
          <h3>The Game Cycle</h3>
          <ol>
            <li>Set up battlefield</li>
            <li>Deploy Player Squad</li>
            <li>
              <strong>Waves</strong>
              <ol>
                {/* <li>Roll Wave mod</li> */}
                <li>Spawn Horde Units (see Wave table below)</li>
                <li>Roll Wave Objective</li>
                <li>
                  <strong>Turns</strong>
                  <ol>
                    <li>Roll Tactical Orders (TO)</li>
                    <li>Turns 1-4: Roll Turn Event</li>
                    <li>Turns 5+: <strong>Containment Breach</strong> - Turn Event is "Enemy Reinforcements"</li>
                    <li>
                      Activations
                      <ul>
                        <li>Activate a Player Unit</li>
                        <li>Activate a Horde Unit (follow its &quot;Behavior&quot; skill). If there is a Horde Boss, that Boss should be the first Horde Unit to activate.</li>
                        <li>Repeat until all Units have been activated</li>
                      </ul>
                    </li>
                    <li>
                      End of Turn
                      <ul>
                        <li>If there are no Standing Horde Units, the Wave ends.<br/>Spend MP on Upgrades (see "Upgrades" below) and prepare for the next Wave.</li>
                        <li>
                          If this is the end of Turn 4 for the Wave and there are any Standing Horde Units:
                          <ul>
                            <li>The Wave enters <strong>Containment Breach</strong> mode</li>
                            <li>All Turn Events for the remainder of this Wave are treated as "Reinforcements"</li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ol>
                </li>
              </ol>
            </li>
          </ol>
        </div>

        <div className="section">
          <div className="section">
            <h3>Player Squads</h3>

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
                  <li>
                    Each mini-squad may have a Leader, but their Leader effect is ignored and each mini-squad rolls <code>1D3</code> for TO.
                    <ul>
                      <li>
                        Alternatively, select one mini-squad to have the sole leader, and roll TO normally (including the Leader's <code>Leader x</code> skill).
                        In this case, all mini-squads share the obtained TO.
                      </li>
                    </ul>
                  </li>
                  <li>Units that are in different mini-Squads are considered to be Squadmates.</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="section">
            <h3>Downed Units</h3>
            When a Player Unit reaches zero <code>HIT</code>, do not remove it from the battlefield.
            Instead, set it on its side to indicate its <strong>Downed</strong> status.
            Downed Units are ignored by Horde Units, cannot be targeted in combat, and do not take any Damage.
            <br/>
            During their activation, Downed Units may only perform the Dash action. <br/>
            A Standing Unit may revive a Downed Unit it Controls (<code>2 ACT</code> Mission Action): The Downed Unit returns as Standing with <code>1 HIT</code> remaining.
            <br/>
            Whenever a Downed Unit is revived, it gains one random Injury. If that Injury is one that the Unit already has, the Unit is Deceased and removed from the battlefield.
            <br/>
            If all Player Units are Downed or Deceased, the Mission ends in failure.
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Battlefields</h3>

        <div className="twocols">
          {hordemaps.map((map) => {
            return (
              <MissionBlock key={map.missionId} mission={map} showDescription={true} />
            )
          })}
        </div>
      </div>

      <div className="section twocols">
        <div className="section">
          <h3>Spawning Horde Units</h3>
          At the start of each wave, roll <code>3D6</code>. Each die result maps to a Horde Unit and its quantity to Spawn.
          <br/>
          For example, in Wave 5, we roll <code>3D6</code> and get 1, 3, and 6. This maps to:
          <ul>
            <li>4 Ruin Stalkers (<code>1, 3</code>, each mapping to 2 Ruin Stalkers)</li>
            <li>1 Razorhowl Reaver (<code>6</code>)</li>
          </ul>
          When placing Spawned Units, place the first Unit Adjacent to the first Spawn point, the second Unit Adjacent to the second Spawn point, etc.
          If you run out of Spawn points, just start back on the first one.
          <br/>
          For Boss Waves (4, 8, and 12), select a random Boss Unit and follow its Spawn instructions for placement and other rules.
          If you already fought the selected Boss in a previous Wave, re-roll until you get a Boss you haven't fought yet.
        </div>
      </div>
      <div className="section">
        <h3>Wave Table</h3>

        <div className="columns-3">
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
                  <td>2x Carrion Leech</td>
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
                  <td>1x Ruin Fiend</td>
                </tr>
                <tr className="border-t border-border">
                  <td style={{textAlign: 'center'}}><strong>Wave 2</strong></td>
                  <td style={{textAlign: 'center'}}>1-4</td>
                  <td>2x Toxin Spitter</td>
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
                  <td>2x Toxin Spitter</td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{textAlign: 'center'}}>5</td>
                  <td>2x Blight Herald</td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{textAlign: 'center'}}>6</td>
                  <td>1x Ruin Fiend</td>
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
                  <td>2x Toxin Spitter</td>
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
                  <td>2x Ruin Fiend</td>
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
                  <td>2x Ashline Gunner</td>
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
                  <td>3x Ruin Fiend</td>
                  <th>10</th>
                </tr>
                <tr>
                  <td></td>
                  <td style={{textAlign: 'center'}}>3-4</td>
                  <td>2x Ashline Gunner</td>
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
                  <td>3x Ruin Fiend</td>
                  <th>14</th>
                </tr>
                <tr>
                  <td></td>
                  <td style={{textAlign: 'center'}}>3-4</td>
                  <td>2x Ashline Gunner</td>
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
                  <td>2x Razorhowl Reaver</td>
                  <th>12</th>
                </tr>
                <tr>
                  <td></td>
                  <td style={{textAlign: 'center'}}>5</td>
                  <td>2x Last-Light Executioner</td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{textAlign: 'center'}}>6</td>
                  <td>2x Last-Light Executioner</td>
                </tr>
                <tr className="border-t border-border">
                  <td style={{textAlign: 'center'}}><strong>Wave 10</strong></td>
                  <td style={{textAlign: 'center'}}>1-4</td>
                  <td>2x Graveward Sentinel</td>
                  <th>13</th>
                </tr>
                <tr>
                  <td></td>
                  <td style={{textAlign: 'center'}}>5</td>
                  <td>2x Last-Light Executioner</td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{textAlign: 'center'}}>6</td>
                  <td>2x Last-Light Executioner</td>
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
                  <td>2x Graveward Sentinel</td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{textAlign: 'center'}}>5</td>
                  <td>2x Last-Light Executioner</td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{textAlign: 'center'}}>6</td>
                  <td>2x Last-Light Executioner</td>
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
                  <td>2x Graveward Sentinel</td>
                </tr>
                <tr>
                  <td></td>
                  <td style={{textAlign: 'center'}}>5-6</td>
                  <td>2x Last-Light Executioner</td>
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
              If the Wave is in <strong>Containment Breach</strong> mode (Wave is in Turn 5 or later), do not roll Turn Events and use the Enemy Reinforcements event instead.
            </p>
            <div>
              <strong>2: Second Wind</strong>
              <div className="ml-4">A Downed Unit returns as Standing with <code>1 HIT</code> remaining.</div>
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
              <strong>7: Relentless Advance</strong>
              <div className="ml-4">The Horde presses on (no special event this Turn).</div>
            </div>
            <div>
              <strong>8: Scrambled Comms</strong>
              <div className="ml-4">Player Squad loses <code>-2 TO</code> (minimum 0).</div>
            </div>
            <div>
              <strong>9: Encroaching Threat</strong>
              <div className="ml-4">Each time a Horde Unit performs a Move Action during this Turn, it may move 1 additional Pace.</div>
            </div>
            <div>
              <strong>10: Enemy Reinforcements</strong>
              <div className="ml-4">Roll <code>1D6</code> and Spawn Horder Units according to the Wave table for this Wave.</div>
            </div>
            <div>
              <strong>11: Coordinated Assault</strong>
              <div className="ml-4">Horde Units have <code>+1 ACT</code> this Turn.</div>
            </div>
            <div>
              <strong>12: Overrun</strong>
              <div className="ml-4">All Horde Units immediately perform 1 Action according to their Behavior.</div>
            </div>
          </div>
        </div>

        <div className="section">
          <h3>Wave Objectives</h3>
          <p>At the start of each Wave, roll <code>1D6</code> to determine the Wave's Objective. If a Wave Objective is not completed by the end of the Wave, that Wave Objective is failed.</p>

          <h4>Objectives</h4>
          <div>
            <strong>1: Battlefield Control</strong>
            <div className="ml-4">
              <strong>Victory:</strong> At the end of the Wave, there is at least one Standing Player Unit on the NW, NE, SW, and SE Tiles.
            </div>
          </div>
          <div>
            <strong>2: Destroy Nexus</strong>
            <div className="ml-4">
              <strong>Setup:</strong> Place 3 Nexus markers as close as possible to the center of the West, Center, and East Tiles.<br/>
              <strong>Special:</strong> Nexus Markers are items with <code>ARM 3</code> and <code>HIT 2</code> and can be targeted in combat.<br/>
              <strong>Victory:</strong> All Nexus Markers Taken Out by the end of the Wave.
            </div>
          </div>
          <div>
            <strong>3: Overwhelming Force</strong>
            <div className="ml-4">
              <strong>Victory:</strong> End the Wave within 2 Turns.
            </div>
          </div>
          <div>
            <strong>4: Protect The Asset</strong>
            <div className="ml-4">
              <strong>Setup:</strong> Place an Asset marker as close as possible to the Center of a random Tile (excluding the player deployment Tile). Assets are Items with <code>ARM 4 HIT 4</code>.<br/>
              <strong>Special:</strong> Horde Units will always prioritize targeting the Asset instead of Player Units in combat.<br/>
              <strong>Victory:</strong> The Asset still has at least 1 <code>HIT</code> at the end of the Wave.
            </div>
          </div>
          <div>
            <strong>5: Suppression Field</strong>
            <div className="ml-4">
              <strong>Setup:</strong> Place 3 Disruptor Pylons as close as possible to the center of three random Tiles.<br/>
              <strong>Mission Action - Calibrate Pylon (2ACT):</strong> A Unit that Controls a Pylon calibrates it. Remove that Pylon from the battlefield.<br/>
              <strong>Victory:</strong> All 3 Pylons have been calibrated.
            </div>
          </div>
          <div>
            <strong>6: The Artifact</strong>
            <div className="ml-4">
              <strong>Setup:</strong> Place 3 Search Markers in the center of three random Tiles.<br/>
              <strong>Mission Action - Search (2ACT):</strong> A Unit that Controls a Search Marker searches it. Roll <code>1D6</code>: On a 1 or 2, the Artifact is found. This roll cannot be modified or re-rolled using TO.<br/>
              <strong>Victory:</strong> The Artifact is found.
            </div>
          </div>

          <h4>Rewards</h4>
          <p>Once a Wave Objective's Victory condition is met, the Player Squad immediately selects one reward from the list below:</p>
          <ul>
            <li>+4 MP</li>
            <li>+4 TO. If this Wave Objective's Victory is determined at the end of the Wave, those TO are given in the first Turn of the next Wave, after resolving Turn events.</li>
            <li>One Downed Unit immediately returns to Standing with <code>1 HIT</code> remaining.</li>
            <li>One Standing Unit immediately gains one Spoil of War</li>
            <li><code>1D3</code> Player Units perform a free Move action</li>
          </ul>
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
            <li><strong>Ammunition (2 MP):</strong><br/> One Unit's Limited (<code>LIM</code>) weapon or "once per mission" ability can be used one additional time</li>
            <li><strong>Heal (4MP):</strong><br/> One Unit immediately regains up to 2 lost <code>HIT</code></li>
            <li><strong>Grenade (4 MP):</strong><br/> One Unit gains a Grenade that can be used once for <code>1 ACT</code>: Throw grenade within 3 Paces. Deals 3 Ranged Damage to all Adjacent Units.</li>
            <li><strong>Medpack (4MP):</strong><br/> One Unit gains a Medpack that can be used once for <code>1 ACT</code>: The Unit or a Squadmate it Controls regains <code>1D3</code> lost <code>HIT</code>.</li>
            <li><strong>Turret (6 MP):</strong><br/> One Unit gains a portable Turret it can place once for <code>1 ACT</code>: Place Turret Adjacent to Unit. Player Units that Control the Turret can use it instead of their Ranged Weapon(s) when performing a Ranged Combat attack, using <code>ATT 4 SKL 5</code>. When using the Turret, draw Line of Sight from the Turret instead of the active Unit. No <code>ACT</code> penalty for multiple uses in same activation. Remove the Turret from the battlefield once it has been used 5 times.</li>
            <li><strong>Spoil Of War (8 MP):</strong><br/> One Standing Unit gains one Spoil Of War</li>
            <li><strong>Reinforcements (8 MP):</strong><br/> One Downed Unit returns to Standing with all its HIT remaining</li>
            <li><strong>Battlefield Chirurgy (8 MP):</strong><br/> Remove one Injury from one Standing Unit</li>
          </ul>
        </div>

        <div className="section">
          <h3>Crates</h3>
          <p>
          Crate contents are unknown until they are opened.
          Crates can be targeted in combat, causing explosions dealing 3 Damage to all Adjacent Units. <code>ARM 3 HIT 1</code>.
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
            <div className="ml-4">Causes an explosion dealing 3 Damage to all Adjacent Units.</div>
          </div>
        </div>
      </div>

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
              allMedals={[]}
            />
          ))}
        </div>
      </div>
    </div>
  )}
