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
          The Horde never stops coming; only brief Regroup windows between Waves allow Units to patch wounds, recover supplies, and deploy defenses.
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
            <li>Set up battlefield<ul>
              <li>Define deployment and spawn zones</li>
            </ul>
            </li>
            <li>Deploy</li>
            <li>Start Wave 1: Spawn Horde Units (no Wave mod in Wave 1)</li>
            <li>
            Turns
              <ul>
                <li>Start Turn</li>
                <li>Roll Turn Events</li>
                <li>Roll TOs</li>
                <li>Activations<ul>
                  <li>Player has initiative in each Turn</li>
                  <li>Activate a player Unit</li>
                  <li>If all Horde Units are Taken Out, Turn immediately ends</li>
                  <li>Activate a Horde Unit (follow its &quot;Behavior&quot; skill)</li>
                  <li>Activate next player Unit</li>
                </ul>
                </li>
                <li>End of Turn</li>
                <li>If all Horde Units are Taken Out
                  <ul>
                    <li>Regroup:<ul>
                      <li>Spend the Wave's &quot;Regroup ACT&quot; as shared ACT between Units to do what they need to do. Regroup ACT may be spent by any Units in the Player Squad in any combination.</li>
                      <li>Spend MP on upgrades</li>
                    </ul>
                    </li>
                    <li>Start next Wave: Roll Wave Mod and Spawn Horde Units</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ol>
        </div>

        <div className="section">
          <div className="section">
            <h3>Player Squads</h3>

            In Horde mode, players use a normal 100GP Squad.  
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
                    Each mini-squad may have a Leader, but their Leader effect is ignored and each mini-squad rolls 1D3 for TOs.
                    <ul>
                      <li>Alternatively, select one mini-squad to have the sole leader, and roll TOs normally. In this case, all mini-squads share the obtained TOs.</li>
                    </ul>
                  </li>
                  <li>Units that are in different mini-Squads are considered to be Squadmates.</li>
                </ul>
              </li>
            </ul>
          </div>

          <div className="section">
            <h3>Downed Units</h3>
            When a Player Unit reaches zero <code>HIT</code>, don't remove it from the battlefield. Instead, set it on its side to indicate its <strong>Downed</strong> status.
            Downed Units are ignored by Horde Units, cannot be targeted in combat, and do not take any Damage.
            <br/>
            At the start of each Turn, Downed Units may perform a free Dash. This does not trigger an Attack of Opportunity. Downed Units don't activate during the Turn.
            A Standing Unit may revive a Downed Unit it Controls (<code>2 ACT</code> Mission Action): The Downed Unit returns as Standing with 1D3 <code>HIT</code> remaining.
            <br/>
            Whenever a Downed Unit is revived, it gains one random Injury.
            <br/>
            If all Units are Downed, the Mission ends in failure.
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

      <div className="section">
        <h3>Spawning Horde Units</h3>
        For each enemy to Spawn in the current wave, roll <code>1D3</code> and add the Wave's Difficulty.
        The result indicates the Horde Unit to Spawn (see Horde Units' "Spawn" skill below).
        <br/>
        For example, in Wave 5, we will roll <code>4D3</code> (4 enemies) and add <code>3</code> (difficulty) to each result.
        If the results are <code>1, 2, 2, 3</code>, we add the difficulty to end up with <code>4, 5, 5, 6</code> which maps to:
        <ul>
          <li>1 Ruin Stalker (<code>4</code>)</li>
          <li>2 Ashline Gunners (<code>5, 5</code>)</li>
          <li>1 Dustborn Thrall (<code>6</code>)</li>
        </ul>
        
        For Boss Waves, roll for a random Boss Unit and follow its Spawn instructions for placement and other rules.
        <br/>
        When placing Spawned Units, place the first Adjacent to the first Spawn point, the second Unit Adjacent to the second Spawn point, etc.
        If you run out of Spawn points, just start back on the first one.
        <table>
          <thead>
            <tr>
              <th className="text-center">Wave</th>
              <th className="text-center">Difficulty</th>
              <th>Enemies</th>
              <th className="text-center">Regroup ACT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="text-center">Wave 1</th>
              <td className="text-center">0</td>
              <td>4 Units</td>
              <td className="text-center">2</td>
            </tr>
            <tr>
              <th className="text-center">Wave 2</th>
              <td className="text-center">1</td>
              <td>5 Units</td>
              <td className="text-center">2</td>
            </tr>
            <tr>
              <th className="text-center">Wave 3</th>
              <td className="text-center">2</td>
              <td>6 Units</td>
              <td className="text-center">2</td>
            </tr>
            <tr className="border-b border-border">
              <th className="text-center">Wave 4</th>
              <td className="text-center">2</td>
              <td><strong>Boss</strong> + 4 Units</td>
              <td className="text-center">3</td>
            </tr>
            <tr>
              <th className="text-center">Wave 5</th>
              <td className="text-center">3</td>
              <td>4 Units</td>
              <td className="text-center">3</td>
            </tr>
            <tr>
              <th className="text-center">Wave 6</th>
              <td className="text-center">4</td>
              <td>5 Units</td>
              <td className="text-center">3</td>
            </tr>
            <tr>
              <th className="text-center">Wave 7</th>
              <td className="text-center">5</td>
              <td>6 Units</td>
              <td className="text-center">3</td>
            </tr>
            <tr className="border-b border-border">
              <th className="text-center">Wave 8</th>
              <td className="text-center">5</td>
              <td><strong>Boss</strong> + 4 Units</td>
              <td className="text-center">4</td>
            </tr>
            <tr>
              <th className="text-center">Wave 9</th>
              <td className="text-center">6</td>
              <td>4 Units</td>
              <td className="text-center">4</td>
            </tr>
            <tr>
              <th className="text-center">Wave 10</th>
              <td className="text-center">6</td>
              <td>5 Units</td>
              <td className="text-center">4</td>
            </tr>
            <tr>
              <th className="text-center">Wave 11</th>
              <td className="text-center">6</td>
              <td>6 Units</td>
              <td className="text-center">4</td>
            </tr>
            <tr className="border-b border-border">
              <th className="text-center">Wave 12</th>
              <td className="text-center">6</td>
              <td><strong>Boss</strong> + 4 Units</td>
              <td className="text-center">-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section twocols">
        <div className="section">
          <div className="section">
            <h3>Wave Mods</h3>
            <p>At the start of each Wave, before spawning Horde Units, roll 1D6 to determine a modifier for this wave.</p>
            <ol>
              <li><strong>Nothing:</strong> Nothing special this Wave</li>
              <li><strong>Lull:</strong> -1 difficulty for this wave (min 0)</li>
              <li><strong>Surge:</strong> After spawning Horde Units for this Wave, all Horde Units perform 1 free Action</li>
              <li><strong>Preempt:</strong> After spawning Horde Units for this Wave, all player Units may perform 1 free Action</li>
              <li><strong>Rage:</strong> +1 difficulty for this wave (max 6)</li>
              <li><strong>Clear Shots:</strong> During the first Turn of this Wave, Player Units gain +1 <code>ATT</code> on their Ranged weapons</li>
            </ol>
          </div>

          <div className="section">
            <h3>Turn Events</h3>
            <p>At the start of each Turn, roll 1D6 and add Difficulty.</p>
            <p>As Difficulty increases, lower Turn Events become impossible and extreme events become more common.</p>
            <ol className="twocols">
              <li><strong>Strategic Command:</strong><br/> Player Squad gains +2 TOs</li>
              <li><strong>Supply drop:</strong><br/> Place 3 crates in random places on the board. If a crate lands on a Unit, immediately treat it as a "Booby Trap" crate and deal damage accordingly. Do not place that crate on the battlefield.</li>
              <li><strong>Enemy Reinforcements:</strong><br/> Spawn <code>1D3 + Wave Difficulty</code> new Horde Units. Reinforcements count as part of the current Wave and must be Taken Out for the Wave to end.</li>
              <li><strong>Second Wind:</strong><br/> A Downed Unit returns as Standing with 1D3 <code>HIT</code> remaining.</li>
              <li><strong>Overrun:</strong><br/> All Horde Units that don't have a Ranged weapon immediately perform a move followed by a melee attack.</li>
              <li><strong>Field Dressing:</strong><br/> Two Player Units regain 1 lost <code>HIT</code>, or one Player Unit regains 2 lost <code>HIT</code>.</li>
              <li><strong>Firefight:</strong><br/> All Units gain +1 <code>ATT</code> on their Ranged weapons.</li>
              <li><strong>Bloodlust:</strong><br/> All Units gain +1 <code>ATT</code> on their Melee weapons.</li>
              <li><strong>Fog of War:</strong><br/> Until the end of the Turn, all Ranged weapons get -2 <code>SKL</code> (min 1).</li>
              <li><strong>Scrambled Comms:</strong><br/> Player Squad cannot use TOs this Turn.</li>
            </ol>
          </div>
        </div>

        <div className="section">
          <h3>Wave Objectives</h3>
          <p>At the start of each Wave, roll 1D6 to determine the Wave's Objective. If a Wave Objective is not completed by the end of the Wave, that Wave Objective is failed.</p>
          <p>Once a Wave Objective's Victory condition is met, the player Squad immediately selects one reward from the list below:</p>
          <ul>
            <li>+4 MP</li>
            <li>+4 TO - If this Wave Objective is determined at the end of the Wave, those TO are given in the next Turn.</li>
            <li>One Downed Unit immediately returns to Standing with 1D3 <code>HIT</code> remaining</li>
            <li>One Standing Unit immediately gains one Spoil of War</li>
            <li>1D3 Player Units perform a free Move action</li>
          </ul>
        </div>

        <div className="section">
          <h4>Objectives</h4>
          <ol>
            <li className="section"><strong>Battlefield Control:</strong>
              <ul>
                <li><strong>Victory:</strong> At the end of the Wave, there is at least one Standing Player Unit on the NW, NE, SW, and SE Tiles.</li>
              </ul>
            </li>
            <li className="section"><strong>Destroy Nexus:</strong>
              <ul>
                <li><strong>Setup:</strong> Place 3 Nexus markers as close as possible to the center of the West, Center, and East Tiles.</li>
                <li><strong>Special:</strong> Nexus Markers are items with <code>ARM 3</code> and <code>HIT 2</code> and can be targeted in combat.</li>
                <li><strong>Victory:</strong> All Nexus Markers Taken Out by the end of the Wave.</li>
              </ul>
            </li>
            <li className="section"><strong>Overwhelming Force:</strong>
              <ul>
                <li><strong>Victory:</strong> End the Wave within 2 Turns.</li>
              </ul>
            </li>
            <li className="section"><strong>Protect The Asset:</strong>
              <ul>
                <li><strong>Setup:</strong> Place a Asset marker in the Center of a random Tile (excluding the player deployment Tile). Assets are Items with <code>ARM 4 HIT 4</code>.</li>
                <li><strong>Special:</strong> Horde Units will always prioritize targeting the Asset instead of Player Units in combat.</li>
                <li><strong>Victory:</strong> The Asset still has at least 1 <code>HIT</code> at the end of the Wave.</li>
              </ul>
            </li>
            <li className="section"><strong>Suppression Field:</strong>
              <ul>
                <li><strong>Setup:</strong> Place 3 Disruptor Pylons as close as possible to the center of three random Tiles.</li>
                <li><strong>Mission Action - Calibrate Pylon (2ACT):</strong> A Unit that Controls a Pylon calibrates it. Gain 1 MP and remove that Pylon from the battlefield.</li>
                <li><strong>Victory:</strong> All 3 Pylons have been calibrated by the end of the Wave.</li>
              </ul>
            </li>
            <li className="section">
              <strong>The Artifact:</strong>
              <ul>
                <li><strong>Setup:</strong> Place 3 Search Markers in the center of three random Tiles.</li>
                <li><strong>Mission Action - Search (2ACT):</strong> A Unit that Controls a Search Marker searches it. On a 1 or 2, the Artifact is found.</li>
                <li><strong>Victory:</strong> The Artifact is found by the end of the Wave.</li>
              </ul>
            </li>
          </ol>
        </div>
      </div>

      <div className="section twocols">
        <div className="section">
          <h3>Purchasing Upgrades and Defenses</h3>
          <p>During the Regroup phase, after spending your Regroup `ACT`, you may spend your earned MP on upgrades.</p>
          <p>MPs are gained in the following ways:</p>
          <ul>
            <li>For each Horde Unit Taken Out, the Player Squad gains MPs equal to that Unit's Force Value</li>
            <li>Completing Wave Objectives</li>
            <li>Opening a Crate and rolling &quot;Stockpile&quot;</li>
          </ul>

          <strong>Available Upgrades:</strong>
          <ul>
            <li><strong>Refill (2 MP):</strong> One Unit's Limited (<code>LIM</code>) weapon can be used one additional time</li>
            <li><strong>Heal (4MP):</strong> One Unit immediately regains up to 2 lost HIT</li>
            <li><strong>Grenade (4 MP):</strong> One Unit gains a Grenade that can be used once for 1 ACT: Throw grenade within 3 Paces (1 ACT). Deals 3 Ranged Damage to all Adjacent Units.</li>
            <li><strong>Medpack (4MP):</strong> One Unit gains a Medpack that can be used once for 1 ACT: The Unit or a Squadmate it Controls regains 1D3 lost HIT.</li>
            <li><strong>Turret (6 MP):</strong> One Unit gains a portable Turret it can place once for 1 ACT: Place Gun Turret Adjacent to Unit. Player Units that Control the Gun Turret can use it instead of their Ranged Weapon(s) when performing a Ranged Combat attack, using <code>ATT 4 - SKL 5</code>. No ACT penalty for multiple uses in same activation. Remove the Gun Turret from the battlefield once it has been used 5 times.</li>
            <li><strong>Spoil Of War (8 MP):</strong> One Unit gains one Spoil Of War</li>
            <li><strong>Reinforcements (8 MP):</strong> One Downed Unit returns to Standing with all its HIT remaining.</li>
          </ul>
        </div>

        <div className="section">
          <h3>Crates</h3>
          <p>
          Crate contents are unknown until they are opened.
          Crates can be targeted in combat, causing explosions dealing 3 DAM to all Adjacent Units. <code>ARM 3 HIT 1</code>.
          </p>
          <strong>Mission Action - Open Crate (1 ACT):</strong> A Unit that Controls a Crate opens it. Roll to determine its contents.
          <ol>
            <li><strong>Stockpile:</strong> +3 MP</li>
            <li><strong>Command Uplink:</strong> +2 TO</li>
            <li><strong>Map:</strong> Free Move for any Unit</li>
            <li><strong>Relay Order:</strong> Free Action for any Unit</li>
            <li><strong>Upgrade:</strong> Select and apply one free Upgrade of your choice (see "Upgrades" below)</li>
            <li><strong>Booby Trap:</strong> Causes explosions dealing 3 DAM to all Adjacent Units</li>
          </ol>
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
