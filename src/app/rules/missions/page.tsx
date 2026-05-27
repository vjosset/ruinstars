import Markdown from '@/components/ui/Markdown'
import PageBreak from '@/components/ui/PageBreak'
import { GAME } from '@/lib/config/game_config'

import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { GearCategoryService, SpecialService, UserService } from '@/services'
import UnitCard from '@/components/unit/UnitCard'
import { PDFLink } from '@/components/nav/Links'
import { MissionBattlefields } from '@/data/mission_battlefields'
import { MissionObjectives } from '@/data/mission_objectives'
import { MissionDeployments } from '@/data/mission_deployments'
import Link from 'next/link'
import MissionsQuickRef from './quickref/missions-quickref'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Missions',
    description: `The complete PvP and PvE Mission rules for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{ url: '/icons/icon-big.png', width: 512, height: 512 }],
    keywords: ['free', 'rules', 'missions', 'campaigns', 'pdf'],
    pagePath: '/rules/missions'
  })
}

export default async function Missions() {
  const versionTimestamp = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date()).replaceAll('-', '')
  const injuries = await GearCategoryService.getGearCategory('INJ')
  const spoilsOfWar = await GearCategoryService.getGearCategory('SOW')
  const pveUser = (await UserService.getUserByUsername('pve')) ?? (await UserService.getUser('pve'))
  const pveSquads = (pveUser?.squads ?? []).slice().sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0))
  const allSpecials = await SpecialService.getAllSpecials()

  // Remove SoWs, "Leader*", and "Brutal" skills from PvE units for clarity
  pveSquads.forEach((squad) => {
    squad.units?.forEach((unit) => {
      unit.skills = unit.skills?.filter(
        skill => skill.gearName !== 'Leader*' && skill.gearName !== 'Brutal' && skill.gearName !== 'Relentless (Melee)'
      ) ?? null

      unit.skills?.forEach((sk) => sk.GP = 0)
      unit.weapons?.forEach((wep) => wep.GP = 0)
    })
  })

  return (
    <>
      {/* Cover */}
      <img src="/img/rules/BookCover_Framed.webp" className="printonly fullpage overflow-y-hidden" style={{pageBreakAfter: 'always'}} loading="eager" decoding="async" />
      <div className="printonly absolute left-1/2 top-1/4 -translate-x-1/2">
        <div className="text-center text-white font-title text-2xl tracking-wide bg-black/70 px-6 py-3 rounded-lg shadow-lg">
          <h1>Missions</h1>
          <p className="text-md">
            2nd Edition <span className="text-sm">v{versionTimestamp}</span>
          </p>
        </div>
      </div>

      <div className="rules px-3 max-w-7xl mx-auto">
        {/* Cover */}
        <div className="section">
          <h1 className="text-center pt-48 mb-12 font-title"   id="allsquadTypes" style={{position: 'relative', top: '50%' }}>
            Missions
          </h1>

          {/* Intro */}
          <h3>Tactical Engagements Across a Galaxy in Ruins</h3>
          <div className="section twocols">
            <div className="section">
              <div className="flavor">
                <p className="mb-4">
                  “We once believed war would end when the stars themselves dimmed. We were wrong.
                  The stars are gone, and still we fight over scraps of metal, over relics of dead gods, over the idea that any of this still matters.
                </p>
                <p className="mb-4">
                  Every mission you read in this record was real once. Squads bled for these orders.
                  Some triumphed and carved their marks into the ruins; others vanished beneath the dust of worlds that no longer have names.
                </p>
                <p className="mb-4">
                  If you are holding this field manual, you are part of what remains. Learn these operations well.
                  Out there, knowing which ruin to hold (or which to burn) means the difference between survival and extinction.”
                </p>
                <strong className="mb-4">Excerpt from the Warfront Archives, Cycle 2279.6</strong>
              </div>
            </div>
            <div className="section">
              <h2>About</h2>
              <p className="mb-4">
                Across the shattered frontier of the galaxy, war is constant. Squads of elite operatives clash in the ruins of cities, alien jungles, desecrated temples, and endless wastelands, each battle a fleeting spark in the dark expanse of the Ruinstars.
                These are not grand crusades of empire, but desperate struggles fought by the few who dare to step onto the battlefield when hope has long since burned away.
              </p>
              <p className="mb-4">
                Each mission offers unique tactical puzzles and narrative flavor, challenging you to adapt your strategy to shifting objectives and hostile environments.
                Whether you fight for the glory of the Human Hegemony, the hunger of the Swarm, or the whispers of the Silent Choir, every operation offers a chance to carve your name into the scars of the galaxy.
              </p>
              <em>
                Note you will need the <PDFLink href="/assets/books/Core Rules - Ruinstars.pdf" title='Core Rules' /> to play this mode.
              </em>
            </div>
          </div>
        </div>

        <PageBreak />
        {/* Mission Setup */}
        <div className="section">
          <div className="section">
            <h2>Mission Setup</h2>
            <div className="section twocols">
              <div className="section">
                Before the first turn begins, follow the steps below to generate your mission.
                Each mission is defined by:
                <ul>
                  <li>a <strong>Battlefield</strong> that alters mission conditions,</li>
                  <li>a <strong>Deployment</strong> variant that determines where both squads begin, and</li>
                  <li>two random <strong>Objectives</strong> that determine victory conditions.</li>
                </ul>
              </div>
              <div className="section border border-main rounded-md px-6 py-2 mx-16">
                <h4>Mission Sequence</h4>
                <ol className="ml-4">
                  <li>Select Squads</li>
                  <li>Roll Battlefield</li>
                  <li>Roll Deployment</li>
                  <li>Roll Objectives</li>
                  <li>Play Mission</li>
                  <li>Mission Scoring</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* PvP Missions */}
        <div className="section">
          <h2>PvP Missions</h2>
          <div className="twocols">
            <div className="section">
              <h3>Squad Selection and TL</h3>
              <p>
                Each player fields one Squad built to a maximum of 100 GP. Squads are built following the standard squad composition rules in the Core Rules.
                Each Squad has a <strong>Threat Level (TL)</strong> from 1 to 3, reflecting its campaign history.
                A new Squad begins at TL1. Each completed Operation (whether PvE or PvP) advances the Squad's TL by 1, to a maximum of TL3.
                In PvP, both Squads should be at the same TL. Agree on a TL before selecting your Squad.
                Mission scoring scales with TL: the higher the TL, the more MP each Squad can earn per mission.
              </p>
              <p>
                For competitive or one-off play, use standard squads at TL1, without any Spoils of War or Injuries.
              </p>
            </div>
            <div className="section">
              <h3>Deployment</h3>
              <p>
                Each mission is played on one of the standard deployments (see <Link className="underline" href="#deployments">Deployments</Link> list below).
                At the start of each mission, before objectives are revealed, roll <code>1D6</code> to select a deployment.
                Each deployment defines two positions: Squad A and Squad B.
                Both players roll off; the winner chooses which squad they are.
              </p>
            </div>
            <div className="section">
              <h3>Objectives</h3>
              <p>
                At mission start, each Squad secretly rolls their Objective using <code>2D6</code>:
                roll <code>1D6</code> for the <strong>Archetype</strong>, then <code>1D6</code> for the <strong>Variation</strong>.
                Both Squads reveal their Objectives simultaneously.
                Each Squad pursues their own Objective independently.<br/>
                See <Link className="underline" href="#objectives">Objectives</Link> below for the list of objectives.
              </p>
            </div>
            <div className="section">
              <h3>Mission Scoring</h3>
              <ul>
                <li><strong>1 MP</strong> per TL for completing the mission (regardless of outcome)</li>
                <li><strong>1 MP</strong> per TL per completed objective</li>
                <li><strong>1 MP</strong> per TL if all enemy Units were Taken Out</li>
              </ul>
            </div>
          </div>
        </div>

        {/* PvE Missions */}
        <div className="section">
          <h2>PvE Missions</h2>
          <div className="twocols">
            <div className="section">
              <h3>Squad Selection and TL</h3>
              <p>
                Each mission is opposed by a single NPC faction. Select a faction from the NPC Units section at the back of this book, or choose one randomly. In campaign play, we recommend using the same faction for all three missions within an Operation, then switching factions for the next Operation.
                Each NPC Squad has a Spawn Table that determines which Units are deployed for a given mission. Before deploying the NPC Squad, select a <strong>Threat Level</strong> ("TL") from 1 to 3. Threat Level represents the intensity of the opposition your Squad faces. Higher Threat Levels produce more dangerous Units and larger groups.
                If playing a Campaign, the Threat Level should match the current Operation number: TL1 for Operation 1, TL2 for Operation 2, TL3 for Operation 3.
                Once you have selected a faction and Threat Level, roll <code>3D6</code> and consult that faction's Spawn Table. Each die is resolved individually - look up each result in the column matching your current Threat Level to identify the Units spawned by that die.
              </p>
            </div>
            <div className="section">
              <h3>Deployment</h3>
              <p>
                Each mission is played on one of the following standard <Link className="underline" href="#deployments">Deployments</Link>.
                At the start of each mission, roll 1D6 to select a deployment. Each deployment defines two positions: Squad A and Squad B.
                Roll <code>1D6</code> to determine squad assignment:
                on a <code>1-3</code>, the Player Squad is <strong>Squad A</strong>; on a <code>4-6</code>, the Player Squad is <strong>Squad B</strong>.
              </p>
            </div>
            <div className="section">
              <h3>Objectives</h3>
              <p>
                Roll 1D6 for the Archetype, then 1D6 for the Variation. Repeat for a second Objective, and re-roll if the second objective's Archetype matches the first.
                Objectives score as described in their "Victory" condition based on their completion state, unless the Objective explicitly states that extraction is required. In bespoke campaigns, individual mission objectives may specify additional extraction requirements.<br/>
                See <Link className="underline" href="#objectives">Objectives</Link> below for the list of objectives.
              </p>
            </div>
            <div className="section">
              <h3>NPC Activations</h3>
              <p>
                After each Player Unit activation, the same player activates a Ready NPC Unit.
                Each NPC Unit has a "Behavior" skill that describes how it spends its ACT.
                After each NPC Unit activation, the next Player activates a Player Unit and the cycle repeats until all Units have been activated.
              </p>
              <h3>Reinforcements</h3>
              <p>
                From Turn 5 onward, at the start of each Turn, roll <code>1D6</code> and consult the Spawn Table for the current Threat Level.
                Spawn the indicated Units Adjacent to a random Anchor (one per Anchor).
              </p>
            </div>
            <div className="section">
              <h3>Extraction</h3>
              <p>
                At the start of Turn 4, place the Extraction Point on a random unoccupied Anchor.
                <br/>
                At the end of Turn 4 or later, the Player Squad may extract. Each Standing Unit within 3" of the Extraction Point that is not Adjacent to any enemy Unit extracts successfully.<br/>
                Units that fail to meet both conditions are left behind: treat each as if it was Taken Out during the mission and apply Injuries in Campaign play.
              </p>
            </div>
            <div className="section">
              <h3>Mission Scoring</h3>
              <ul>
                <li><strong>1 MP</strong> per TL for completing the mission (regardless of outcome)</li>
                <li><strong>1 MP</strong> per TL per completed objective</li>
                <li><strong>1 MP</strong> per TL if all enemy Units were Taken Out AND at least one Player Unit extracted</li>
              </ul>
            </div>
          </div>
        </div>

        <PageBreak />
        {/* Campaigns */}
        <div>
          <h2>Campaigns</h2>
          <div className="twocols">
            <div>
              <h3>Campaign Structure</h3>
              A Campaign is composed of three Operations, and each Operation is composed of three Missions.<br/>
              At the end of each Operation, your Squad returns to Homebase to heal injuries, resupply, and recruit new Units into the Squad.

              <h4>Sample Campaign</h4>
              <ul className="columns-3">
                <li>
                  Operation 1<br/>
                  <em>Threat Level 1</em>
                  <ul>
                    <li>Mission 1.1</li>
                    <li>Mission 1.2</li>
                    <li>Mission 1.3</li>
                    <li>Homebase</li>
                  </ul>
                </li>
                <li>
                  Operation 2<br/>
                  <em>Threat Level 2</em>
                  <ul>
                    <li>Mission 2.1</li>
                    <li>Mission 2.2</li>
                    <li>Mission 2.3</li>
                    <li>Homebase</li>
                  </ul>
                </li>
                <li>
                  Operation 3<br/>
                  <em>Threat Level 3</em>
                  <ul>
                    <li>Mission 3.1</li>
                    <li>Mission 3.2</li>
                    <li>Mission 3.3</li>
                    <li>Homebase</li>
                  </ul>
                </li>
              </ul>

              <h3>Operations</h3>
              <p>
                An Operation represents a critical deployment arc within the larger Campaign structure, and is composed of three sequential Missions.
                When the Operation begins, your Squad is considered to be deployed in the field, meaning it cannot change its Units or Gear selections, and any Mission Points (MP) earned during these missions cannot be spent on new Units or Gear.<br/>
                Once the third Mission of an Operation is complete, your Squad returns to Homebase to heal Injuries, make new Gear selections, and recruit new Units by spending their hard-earned MP.
              </p>

              <h4>Missions and Objectives</h4>
              <p>
                Each Mission in the campaign should move the story forward.
                In most cases, this means using the three Objective Archetypes and re-skinning them to fit the narrative.
                Here are some examples of reframing the core Objectives to fit <em>your</em> story:
              </p>

              <div className="section">
                <h6>Control</h6>
                The markers could be anything worth holding: a comm relay that must stay live, a breach point that cannot be ceded, a position that commands the only viable extraction route. The story reason matters less than the pressure it creates. If the enemy controls it, you lose.
              </div>
              <div className="section">
                <h6>Activate</h6>
                Think of these as things that must be done, not held. Purging corrupted data cores. Triggering demolition charges. Sealing breaches in a containment perimeter. The squad moves through, does the work, and leaves. The Search variation works for anything that might be here, or might not: intelligence, a weapon, a body, a signal source. The squad finds it or doesn't.
              </div>
              <div className="section">
                <h6>Destroy</h6>
                These are things that cannot be allowed to survive. Spawn nodes. Weapons caches. A relay broadcasting enemy coordinates. Whatever they are, they can take damage and they must be brought down. The variation determines how many and how hard, and whether taking them out wakes something up.
              </div>
              
              <h4>Between Missions</h4>
              After completing a Mission but before beginning the next one in the same Operation, the Squad may remove <strong>one Injury</strong> from any one Unit (not one per Unit, one total across the Squad).
              Deceased is not an Injury and cannot be removed this way; a Deceased Unit remains out of action and cannot be replaced until the Squad returns to Homebase.

              <h4>Homebase</h4>
              At the end of each Operation, after the third Mission, your Squad returns to Homebase to heal injuries, resupply, and utilize accrued resources.
              <ol>
                <li>Remove all Deceased Units from your Squad.</li>
                <li>Remove one Injury from each remaining Unit (Deceased Units are already removed in step 1).</li>
                <li>Recruit new Units into the Squad (to maximum 100 GP).</li>
                <li>Make changes to your Squad's selected Gear and Spoils Of War.</li>
              </ol>
              
              <h4>PvE Enemy Faction and Threat Level</h4>
              <p>
                The Threat Level to use when building NPC Squads should be the same as the Operation number (i.e. TL1 for Missions in Operation 1, TL2 for Operation 2, TL3 for Operation 3).
                For simplicity, we also recommend using the same faction for all Missions in a given Operation but you may choose to change factions for each Mission.
              </p>
            </div>
          </div>
        </div>

        {/* Reference Lists/Cards */}
        <div className="section twocols">
          <div className="section">
            {/* Battlefields */}
            <h3>Battlefields</h3>
            <div className="section">
              {MissionBattlefields.map((b) => (
                <div key={b.battlefieldId}>
                  <strong>{b.battlefieldId}: {b.title}</strong>
                  <div className="ml-4">
                    <strong>{b.effectName}</strong>
                    <Markdown>{b.effect}</Markdown>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="section">
            {/* Deployments */}
            <h3>Deployments</h3>
            <div className="section">
              {MissionDeployments.map((d) => (
                <div key={d.deploymentId} className="section">
                  <strong>{d.deploymentId}: {d.title}</strong>
                  <div className="ml-4">{d.description}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="section">
            {/* Objectives */}
            <h3>Objectives</h3>
            <div className="section">
              {MissionObjectives.map((archetype) => (
                <div key={archetype.objectiveArchetypeId} className="section">
                  <h4>{archetype.objectiveArchetypeId}: {archetype.title}</h4>
                  <div className="ml-4">
                    {archetype.variations.map((v) => {
                      const rollRange = v.objectiveId.split(' ').slice(1).join(' ')
                      return (
                        <div key={v.objectiveId}>
                          <strong>{rollRange}: {v.title}</strong>
                          <div className="ml-4">
                            {v.setup && <Markdown>{`**Setup:** ${v.setup}`}</Markdown>}
                            {v.special && <Markdown>{`**Special:** ${v.special}`}</Markdown>}
                            {v.victory && <Markdown>{`**Victory:** ${v.victory}`}</Markdown>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section twocols">
          <div className="section">
            <h3>Injuries</h3>
            <p>
              At the end of each Mission, each of your Units that was Taken Out during the mission may have a persistent Injury.
              Between Missions within an Operation, the Squad may remove one Injury from a single Unit of their choice (not one per Unit - one total).
              At Homebase at the end of each Operation, one Injury may be removed from each Unit.
              Note that Deceased is not an Injury, it is permanent, and cannot be removed by either recovery step.
            </p>
            <p>
              At the end of each Mission, for each Player Unit that was Taken Out, roll <code>1D6</code> to determine the Injury this Unit received.<br/>
              If the Injury is one that the Unit already had, or if the Injury would take that Unit to 0 max <code>HIT</code>, that Unit is Deceased.
              Remove the Unit from the Squad. That Unit cannot be replaced until the Squad returns to Homebase at the end of the Operation.
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
            When the Squad returns to Homebase, it can purchase Spoils of War by spending MP earned during the previous Operation.
            Each Spoil of War costs <code>3 MP</code> and applies to one specific Player Unit.
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
        <h2>Quick Reference</h2>
        <MissionsQuickRef />

        {/* NPC SQUAD CARDS + SPAWN TABLES */}
        <div className="section">
          <h2>NPC Squads</h2>
          {pveSquads.map((squad) => (
            <div className="section" key={squad.squadId}>
              <h3 className="text-main font-semibold">{squad.squadName}</h3>
              <div className="grid gap-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {squad.spawnTable && (
                  <div className="bg-card border border-main p-1 mx-1 rounded relative flex flex-col h-full unitcard">
                    <h4>Spawn Table - {squad.squadName}</h4>
                    <Markdown>{squad.spawnTable}</Markdown>
                  </div>
                )}
                {squad.units?.map((unit) => (
                  <UnitCard
                    key={unit.unitId}
                    seq={unit.seq}
                    unit={unit.toPlain()}
                    isOwner={false}
                    showUnitType={false}
                    allSpecials={allSpecials.map((spec) => spec.toPlain())}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
