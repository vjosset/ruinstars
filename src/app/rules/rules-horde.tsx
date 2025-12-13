import MissionBlock from '@/components/shared/MissionBlock'
import UnitCard from '@/components/unit/UnitCard'
import hordemaps from '@/data/hordemaps.json'
import { SpecialService, SquadService } from '@/services'

export default async function RulesHorde({ num }: {num?: Number | null}) {
  const hordeUnits = await SquadService.getSquad('HRD')
  const allSpecials = await SpecialService.getAllSpecials()

  return (
    <div>
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
          Victory comes only by enduring to the final Boss, or by finding how long your Squad can stand before being overwhelmed.
        </p>
      </div>

      <div className="section">
        <h3>The Game Cycle</h3>
        <ol>
          <li>Set up battlefield<ul>
            <li>Define deployment and spawn zones</li>
            <li>Place Upgrade Console</li>
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
                <li>Player has initiative in each Turn, unless otherwise specified in a Turn event</li>
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
        <h3>Battlefields</h3>

        {hordemaps.map((map) => {
          return (
            <MissionBlock key={map.missionId} mission={map} showDescription={true} />
          )
        })}
      </div>

      <div className="section">
        <h3>Spawning Horde Units</h3>
        <p>
          For non-Boss Waves, roll the specified number of dice and add the Difficulty to each result.
          Each result gives the Spawn Value of a Horde Unit to spawn (see Horde Units below).
        </p>
        <p>For Boss Waves, roll for a random Boss Unit and follow its Spawn instructions for placement and other rules.</p>
        <p>
          When placing Spawned Units, place the first one on the first Spawn point, the second on the second one, etc. If you run out of Spawn points, just start back on the first one.
        </p>
        <table>
          <thead>
            <tr>
              <th className="text-center"><strong>Wave</strong></th>
              <th><strong>What To Spawn</strong></th>
              <th className="text-center"><strong>Difficulty</strong></th>
              <th className="text-center"><strong>Regroup ACT</strong></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center">1</td>
              <td>4 Units</td>
              <td className="text-center">0</td>
              <td className="text-center">2</td>
            </tr>
            <tr>
              <td className="text-center">2</td>
              <td>5 Units</td>
              <td className="text-center">0</td>
              <td className="text-center">2</td>
            </tr>
            <tr>
              <td className="text-center">3</td>
              <td>6 Units</td>
              <td className="text-center">0</td>
              <td className="text-center">2</td>
            </tr>
            <tr>
              <td className="text-center">4</td>
              <td><strong>Boss</strong></td>
              <td className="text-center">0</td>
              <td className="text-center">3</td>
            </tr>
            <tr>
              <td className="text-center">5</td>
              <td>5 Units</td>
              <td className="text-center">2</td>
              <td className="text-center">3</td>
            </tr>
            <tr>
              <td className="text-center">6</td>
              <td>6 Units</td>
              <td className="text-center">2</td>
              <td className="text-center">3</td>
            </tr>
            <tr>
              <td className="text-center">7</td>
              <td>7 Units</td>
              <td className="text-center">2</td>
              <td className="text-center">3</td>
            </tr>
            <tr>
              <td className="text-center">8</td>
              <td><strong>Boss</strong></td>
              <td className="text-center">2</td>
              <td className="text-center">4</td>
            </tr>
            <tr>
              <td className="text-center">9</td>
              <td>6 Units</td>
              <td className="text-center">4</td>
              <td className="text-center">4</td>
            </tr>
            <tr>
              <td className="text-center">10</td>
              <td>7 Units</td>
              <td className="text-center">4</td>
              <td className="text-center">4</td>
            </tr>
            <tr>
              <td className="text-center">11</td>
              <td>8 Units</td>
              <td className="text-center">4</td>
              <td className="text-center">4</td>
            </tr>
            <tr>
              <td className="text-center">12</td>
              <td><strong>Boss</strong></td>
              <td className="text-center">4</td>
              <td className="text-center">-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Wave Mods</h3>
        <p>Roll 1D6 to determine a modifier for this wave.</p>
        <p>As Difficulty increases, lower Wave Mods become impossible and extreme events become more common.</p>
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
        <h3>Wave Objectives</h3>
        <p>At the start of each Wave, roll 1D6 to determine the Wave's Objective. If a Wave Objective is not completed by the end of the Wave, that Wave Objective is failed.</p>
        <p>Once a Wave Objective's Victory condition is met, the player Squad immediately gains one reward from the list below:</p>
        <ul>
          <li>+4 MP</li>
          <li>+4 TO</li>
          <li>One Downed Unit immediately returns to Standing with 1D3 <code>HIT</code> remaining</li>
          <li>One Standing Unit immediately gains one Spoil of War</li>
          <li>1D3 Player Units perform a free Move action</li>
        </ul>
        <h4>Objectives</h4>
        <ol className="twocols">
          <li className="section"><strong>Battlefield Control:</strong>
            <ul>
              <li><strong>Victory:</strong> At the end of the Wave, there is at least one Standing Player Unit on 4 different Tiles.</li>
            </ul>
          </li>
          <li className="section"><strong>Destroy Nexus:</strong>
            <ul>
              <li><strong>Setup:</strong> Place 3 Nexus markers in the center of the West, Center, and East Tiles.</li>
              <li><strong>Special:</strong> Nexus Markers are items with <code>ARM 3</code> and <code>HIT 2</code> and can be targeted in combat.</li>
              <li><strong>Victory:</strong> All Nexus Markers Taken Out.</li>
            </ul>
          </li>
          <li className="section"><strong>Overwhelming Force:</strong>
            <ul>
              <li><strong>Victory:</strong> End the Wave within 3 Turns of its start.</li>
            </ul>
          </li>
          <li className="section"><strong>Extract Sample:</strong>
            <ul>
              <li><strong>Victory:</strong> Once in this Wave, when a Player Unit deals unsaved Melee damage against a Horde Unit, instead of reducing that Unit's <code>HIT</code>, score 1 MP for each point of unsaved damage.</li>
            </ul>
          </li>
          <li className="section"><strong>Suppression Field:</strong>
            <ul>
              <li><strong>Setup:</strong> Place 3 Disruptor Pylons in the center of three random Tiles.</li>
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

      <div className="section">
        <h3>Turn Events</h3>
        <p>Roll 1D6 and add Difficulty.</p>
        <p>As Difficulty increases, lower Turn Events become impossible and extreme events become more common.</p>
        <ol className="twocols">
          <li><strong>Strategic Command:</strong><br/> Player Squad gains +2 TOs</li>
          <li><strong>Scrambled Comms:</strong><br/> Player Squad cannot use TOs this Turn.</li>
          <li><strong>Supply drop:</strong><br/> Place 3 crates in random places on the board. If a crate lands on a Unit, immediately treat it as a "Booby Trap" crate and deal damage accordingly. Do not place that crate on the battlefield.</li>
          <li><strong>Enemy Reinforcements:</strong><br/> Spawn 1D3 new Horde Units using current difficulty. Reinforcements count as part of the current Wave and must be Taken Out for the Wave to end.</li>
          <li><strong>Overrun:</strong><br/> All Melee behavior Horde Units immediately perform a move followed by a melee attack.</li>
          <li><strong>Second Wind:</strong><br/> A Downed Unit returns as Standing with 1D3 <code>HIT</code> remaining.</li>
          <li><strong>Fog of War:</strong><br/> Until the end of the Turn, all Ranged weapons get -2 SKL (minimum 1).</li>
          <li><strong>Field Dressing:</strong><br/> Two Units regain 1 lost <code>HIT</code>, or one Unit regains 2 lost <code>HIT</code>.</li>
          <li><strong>Firefight:</strong><br/> All Units gain +1 <code>SKL</code> on their Ranged weapons.</li>
          <li><strong>Bloodlust:</strong><br/> All Units gain +1 <code>SKL</code> on their Melee weapons.</li>
        </ol>
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
          <li><strong>Medpack:</strong> <em>(see upgrades)</em></li>
          <li><strong>Grenade:</strong> <em>(see upgrades)</em></li>
          <li><strong>Turret:</strong> <em>(see upgrades)</em></li>
          <li><strong>Barbed Wire:</strong> <em>(see upgrades)</em></li>
          <li><strong>Barricade:</strong> <em>(see upgrades)</em></li>
          <li><strong>Refill:</strong> <em>(see upgrades)</em></li>
          <li><strong>Spoil of War:</strong> Unit gains one Spoil of War until end of Mission</li>
          <li><strong>Booby Trap:</strong> Causes explosions dealing 3 DAM to all Adjacent Units</li>
        </ol>
      </div>

      <div className="section">
        <h3>Purchasing Upgrades and Defenses</h3>
        <p>Spend MP on upgrades and defenses during the Regroup phase, but only if Unit controls the Upgrade Console.</p>
        <p>MPs are gained in the following ways:</p>
        <ul>
          <li>For each Horde Unit Taken Out, the Player Squad gains MPs equal to that Unit's Force Value</li>
          <li>Completing Wave Objectives</li>
          <li>Opening a Crate and rolling &quot;Stockpile&quot;</li>
        </ul>

        <strong>Console Upgrades:</strong>
        <ul>
          <li><strong>SoW (4MP):</strong> Unit gains one SoW</li>
          <li><strong>Heal (2MP):</strong> Unit regains 2 lost HIT</li>
          <li><strong>Barbed Wire (1 MP):</strong> Place barbed wire Adjacent to Unit (can be placed later)</li>
          <li><strong>Turret (4 MP):</strong> Place Gun Turret Adjacent to Unit (can be placed later). Adjacent Units can use it 5 times for 1 ACT each. No ACT penalty for multiple uses in same activation. Remove from battlefield once it has been used 5 times. <code>5 ATT 4 SKL</code>.</li>
          <li><strong>Barricade (2 MP):</strong> Place barricade 1 Pace wide Adjacent to Unit (can be placed later)</li>
          <li><strong>Grenade (2 MP):</strong> Throw grenade within 3 Paces. Deals 3 Dam to all Adjacent Units. One use.</li>
          <li><strong>Refill (1 MP):</strong> A Unit's Limited weapon can be used one additional time</li>
          <li><strong>Medpack (2MP):</strong> Unit has a Medpack it can use (once) for 1 ACT: The Unit or an Adjacent Squadmate regains 1D3 lost HIT.</li>
        </ul>
      </div>

      <div className="section">
        <h3>Downed Units</h3>
        <p>When a player Unit is Taken Out, don't remove it from the battlefield. Instead it is Downed. Set it on its side.</p>
        <p>Downed Units are ignored by Horde Units, cannot be targeted in combat, and do not take any Damage.</p>
        <p>At the start of each Turn, Downed Units may perform a free Dash. This does not trigger an Attack of Opportunity. Downed Units don't activate during the Turn.</p>
        <p>A Standing Unit may revive a Downed Unit it Controls (<code>2 ACT</code>): Downed Unit returns as Standing with 1D3 <code>HIT</code> remaining.</p>
        <p>If all Units are Downed, the Mission ends in failure.</p>
      </div>

      <div className="section">
        <h3>Ending the Mission</h3>
        <p>A Horde mission ends in the following conditions:</p>
        <ul>
          <li>All player Units are Downed (failure)</li>
          <li>After ending any Boss wave, player Units may choose to extract (victory)</li>
        </ul>
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
