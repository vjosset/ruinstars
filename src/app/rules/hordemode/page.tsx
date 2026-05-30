import Markdown from '@/components/ui/Markdown'
import PageBreak from '@/components/ui/PageBreak'
import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { GearCategoryService, SpecialService, UserService } from '@/services'
import UnitCard from '@/components/unit/UnitCard'
import { PDFLink } from '@/components/nav/Links'
import { MissionDeployments } from '@/data/mission_deployments'
import { HordeTurnEvents } from '@/data/horde_events'
import HordeModeQuickRef from './quickref/hordemode-quickref'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Horde Mode',
    description: `The rules for Horde Mode, a solo/coop survival mode for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{ url: '/icons/icon-big.png', width: 512, height: 512 }],
    keywords: ['free', 'rules', 'horde mode', 'solo', 'coop', 'pdf'],
    pagePath: '/rules/hordemode'
  })
}

export default async function HordeMode() {
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
          <h1>Horde Mode</h1>
          <p className="text-md">
            2nd Edition <span className="text-sm">v{versionTimestamp}</span>
          </p>
        </div>
      </div>

      <div className="rules px-3 max-w-7xl mx-auto">

        {/* Title + Intro */}
        <div className="section">
          <h1 className="text-center pt-48 mb-12 font-title" id="hordemode" style={{position: 'relative', top: '50%'}}>
            Horde Mode
          </h1>

          <div className="section twocols">
            <div className="section">
              <div className="flavor">
                <p>
                  No extraction was planned. The signal was a lie, the drop zone already dead before the first boots hit ash.
                  Now the horde is coming. Endless, relentless, testing the walls with teeth and claws and fire.
                  Ammunition runs thin. Wounds pile up. Between each assault there is only enough time to drag the wounded clear
                  and spend the last scraps of materiel before the next wave hits harder than the last.
                </p>
                <p>
                  There is no triumph to be claimed here. Only the mercy of a few stolen minutes.
                </p>
              </div>
            </div>
            <div className="section">
              <h2>About</h2>
              <p>
                <strong>Horde Mode</strong> is a solo or cooperative survival mode for Ruinstars.
                One Squad fights across 3 Acts, each composed of 3 Waves of enemy forces.
                The horde never stops coming. The only questions are how long you last, and how many you take with you.
              </p>
              <p>
                Unlike standard Missions, Horde Mode has no fixed end state beyond failure.
                Waves end only when all NPC units are Taken Out. Objectives persist and accumulate damage across Acts.
                Every decision compounds.
              </p>
              <em>
                Note: you will need the <PDFLink href="/assets/books/Core Rules - Ruinstars.pdf" title='Core Rules' /> to play this mode.
              </em>
            </div>
          </div>
        </div>

        {/* The Game Cycle */}
        <div className="section">
          <h2>The Game Cycle</h2>
          <div className="section twocols">
            <div className="section">
              <p>
                A Horde Mode session is divided into <strong>3 Acts</strong>, each containing <strong>3 Waves</strong>.
                Each Wave lasts until all NPC units are Taken Out, after which players score MP, spend it on rewards, and prepare the next Wave.
              </p>
              <p>
                The session ends when all 9 Waves are completed - or when a Failure condition is met.
              </p>
            </div>
            <div className="section border border-main rounded-md px-6 py-2 mx-16">
              <h4>Mission Sequence</h4>
              <ol className="ml-4">
                <li>Select Squads</li>
                <li>Select Deployment</li>
                <li>Place Objectives</li>
                <li>Play Acts and Waves</li>
                <li>Mission Scoring</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Setup */}
        <div className="section">
          <h2>Setup</h2>
          <div className="section twocols">
            <div className="">
              <h3>Player Squads</h3>
              <p>
                In Horde Mode, players deploy a standard <strong>100 GP Squad</strong>.
                When playing cooperatively, players may choose one of the following formats:
              </p>
              <p><strong>Shared Squad:</strong> Players share control of one full 100 GP Squad, taking turns activating Units.</p>
              <p><strong>Mini Squads:</strong> Each player builds a reduced Squad.</p>
              <ul>
                <li>2 Players: 50 GP each</li>
                <li>3 Players: 34 GP each</li>
                <li>4 Players: 25 GP each</li>
              </ul>
              <p>Notes:</p>
              <ul>
                <li>Units in different Mini Squads are considered Squadmates.</li>
                <li>
                  Each Mini Squad may include a Leader. Only one Leader counts for rolling TO dice.
                  Players agree on which Leader this is before the session begins. That Leader is the <strong>Squad Leader</strong>.
                </li>
                <li>
                  While the Squad Leader is Standing, roll 5 TO dice as normal.
                  If the Squad Leader is Taken Out, roll 3 TO dice, regardless of whether other Leaders are Standing.
                </li>
              </ul>
            </div>
            <div className="">
              <h3>NPC Squads</h3>
              <p>
                NPC Squads are deployed at the start of each Wave according to the Act's Threat Level. 
                These NPC Squads use the same Units as PvE Missions and are listed along with their Spawn Table at the end of this book.
              </p>
            </div>
            <div className="section">
              <h3>Deployment</h3>
              <p>
                Select or roll a Deployment. The Deployment defines the player deployment zone and all NPC spawn points,
                and remains fixed for the entire session.
              </p>
              <p>
                In Horde Mode, the Player Squad is always <strong>Squad A</strong>, and the NPC Squad is always <strong>Squad B</strong>.
              </p>
              <p>
                Deploy all Player Units in the player deployment zone before the first Wave begins.
              </p>
              <div className="section">
                {MissionDeployments.map((d) => (
                  <div key={d.deploymentId} className="section">
                    <strong>{d.deploymentId}: {d.title}</strong>
                    <div className="ml-4">{d.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Cycle/Sequence */}
        <div className="section">
          <h2>Sequence</h2>
          <div className="section twocols">
            {/* Acts */}
            <div className="section">
              <h3>Acts</h3>
              
              <p>
                A session is composed of 3 Acts. Each Act is composed of 3 Waves.
              </p>
              <p>At the start of each Act:</p>
              <ol>
                <li>
                  <strong>Select NPC Faction.</strong> Roll or select a random NPC Faction.
                  That Faction is used for all Waves in this Act.
                </li>
                <li>
                  <strong>Place Objectives.</strong> Place 3 Objective Markers (A, B, and C) on random Anchors.
                  Objectives cannot be placed on NPC spawn points. They may be placed on player spawn points.
                </li>
                <li>
                  <strong>Set Threat Level.</strong> The Act Number equals the Threat Level for all Waves in this Act
                  (Act 1 = TL1, Act 2 = TL2, Act 3 = TL3).
                </li>
              </ol>
              <div className="section">
                <h4>Between Acts</h4>
                <p>
                  Do not reset Objective NPC Control Scores. Move Objectives A, B, and C to new Anchors,
                  but carry their current NPC Control Scores forward.
                </p>
              </div>
            </div>
            
            {/* Failure */}
            <div className="section">
              <h4>Failure</h4>
              <p>
                The session ends immediately if either of the following conditions is met:
              </p>
              <ul>
                <li>All Player Units are Downed simultaneously, or</li>
                <li>All three Objectives have been destroyed (reached 6 NPC Control Score and removed from play).</li>
              </ul>
              <p>
                Score is calculated based on the number of Waves completed when the session ended.
              </p>
            </div>

            {/* Waves */}
            <div>
              <h3>Waves</h3>
              <p>Each Wave follows this sequence:</p>
              <ol>
                <li>
                  <strong>Spawn NPC Units:</strong> Roll <code>3D6</code> and spawn NPC units per the current Threat Level Spawn Table.
                  Each die is resolved independently.
                </li>
                <li>
                  <strong>Play Turns:</strong> Play Turns until all NPC units are Taken Out (see Turn Sequence below).
                </li>
                <li>
                  <strong>Wave End:</strong> Score MP, spend MP on rewards, and prepare the next Wave.
                </li>
              </ol>
              <div className="section">
                <h4>Reinforcements</h4>
                <p>
                  From Turn 5 onward, roll <code>1D6</code> at the start of each Turn and spawn NPC reinforcements
                  per the current Threat Level Spawn Table (ignore quantity; spawn one Unit per die result).
                </p>
              </div>
              <div className="section">
                {/* Wave End */}
                <h4>Wave End</h4>
                <p>
                  When all NPC Units are Taken Out, the Player Squad finishes the current Turn, then the Wave ends.
                </p>
                <h4>Score MP</h4>
                <ul>
                  <li><strong>Base: 1 MP</strong> per current Threat Level (base)</li>
                  <li><strong>Wave Speed Bonus: +1 MP</strong> If the Wave ends on Turn 3 or earlier, gain +1 MP per Turn under 4 (Turn 3: +1 MP, Turn 2: +2 MP, Turn 1: +3 MP)</li>
                </ul>
                <h4>Spend MP</h4>
                <p>
                  Players may spend earned MP on Rewards (see MP and Rewards below).
                </p>
                <h4>Prepare Next Wave</h4>
                <p>
                  If this was Wave 3 of the current Act, prepare the next Act. Otherwise, prepare the next Wave.
                </p>
              </div>
            </div>

            {/* Turns */}
            <div className="section">
              <h3>Turns</h3>
              <p>Each Turn follows this sequence:</p>
              <ol>
                <li><strong>Roll Tactical Orders (TO)</strong></li>
                <li>
                  <strong>Roll Turn Event.</strong> Roll on the Turn Events table.
                  On Turn 5 or later, do not roll; apply Enemy Reinforcements automatically.
                </li>
                <li>
                  <strong>Activations.</strong> The Player Squad always has Initiative.
                  <ul>
                    <li>Activate one Player Unit.</li>
                    <li>Activate one NPC Unit, following that Unit&apos;s Behavior.</li>
                    <li>Repeat until all Units have been activated.</li>
                  </ul>
                </li>
                <li>
                  <strong>End of Turn.</strong> Resolve all End of Turn effects.
                  Apply NPC Control Score to Objectives (see Objectives below).
                  If no Standing NPC Units remain, the Wave ends.
                </li>
              </ol>
            </div>
          </div>
        </div>

        <div className="section">
          <h2>Objectives and NPC</h2>
          <div className="twocols">
            {/* Objectives */}
            <div className="section">
              <h3>Objectives</h3>
              <p>
                At the start of Wave 1, place three Objectives on random Anchors.
                Label each Objective A, B, and C.
                These cannot be placed on an NPC Spawn point, but can be placed on a Player Deployment.<br/>
                At the start of the following waves, move each Objective to a new random Anchor, maintaining its NPC Control Score.
              </p>
              <p>
                <strong>NPC Control Score:</strong> At the end of each Turn, each Objective gains +1 NPC Control Score
                for each NPC Unit that Controls it.
              </p>
              <p>
                <strong>Destroyed Objectives:</strong> If an Objective reaches 6 NPC Control Score,
                it is destroyed and removed from play.
              </p>
              <h4>Control</h4>
              <p>
                Control is defined in the Core Rules: a Unit <strong>Controls</strong> an Objective if it is Adjacent to it
                and not Adjacent to any enemy Units, and no enemy Units are Adjacent to the Objective.
              </p>
            </div>
            
            {/* NPC Behavior */}
            <div className="section">
              <h3>NPC Spawn Points</h3>
              <p>
                When placing Spawned Units, place the first Unit Adjacent to the first Spawn Point,
                the second Adjacent to the second Spawn Point, and so on.
                When Spawn Points are exhausted, return to the first.
              </p>
            </div>
          </div>
        </div>

        {/* Downed Units */}
        <div className="section">
          <div className="twocols">
            <div className="section">
              <h2>Downed Units</h2>
              <p>
                When a Player Unit reaches 0 HIT, it is <strong>Downed</strong> instead of being Taken Out.
                Do not remove it from the battlefield. Place it on its side to indicate its Downed status.
              </p>
              <p>Downed Units:</p>
              <ul>
                <li>Are ignored by NPC Units and cannot be targeted in combat.</li>
                <li>Take no Damage.</li>
                <li>
                  May only perform the Move, Dash, or Revive actions during their activation.
                  Move and Dash do not trigger Attacks of Opportunity.
                </li>
              </ul>

              <h4>Reviving a Downed Unit</h4>
              <p>
                <strong>Mission Action - Revive (2 ACT):</strong> A Standing Unit that Controls a Downed Squadmate may revive it.
                A Downed Unit may also revive itself if it Controls a Standing Squadmate.<br/>
                The revived Unit returns to Standing with one new Injury (see Injuries below) and half its HIT remaining (round up).
              </p>
              <p>
                If all Player Units are Downed simultaneously, the session ends in failure.
              </p>
            </div>
            
            <div className="section">
              <h2>Turn Events</h2>
              <p>
                At the start of each Turn, roll on the Turn Events table.
                This roll can be modified by spending your <code>TO</code>.
                On Turns 5 or later, do not roll; apply Enemy Reinforcements automatically.
              </p>
              <div className="section">
                {HordeTurnEvents.map((e) => (
                  <div key={e.eventId}>
                    <strong>{e.eventId}: {e.title}</strong>
                    <Markdown className="ml-2">{e.description}</Markdown>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* MP and Rewards */}
        <div className="section">
          <h2>Injuries and Rewards</h2>
          <div className="twocols">
            <div className="section">
              <h3>Rewards</h3>
              <p>MP can be spent at the end of any Wave.</p>
              <table>
                <thead>
                  <tr>
                    <th>Cost</th>
                    <th>Reward</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>1 MP</code></td>
                    <td>+2 TO for the next Wave</td>
                  </tr>
                  <tr>
                    <td><code>1 MP</code></td>
                    <td>One Unit performs 1 free Action before the next Wave begins</td>
                  </tr>
                  <tr>
                    <td><code>2 MP</code></td>
                    <td>One Unit regains 1 lost HIT</td>
                  </tr>
                  <tr>
                    <td><code>3 MP</code></td>
                    <td>One Downed Unit returns to Standing with half its HIT (round up) + 1 random Injury</td>
                  </tr>
                  <tr>
                    <td><code>3 MP</code></td>
                    <td>One Standing Unit gains one Spoil of War</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="section">
              <h3>Injuries</h3>
              <p>
                Each time a Downed Unit is revived, roll <code>1D6</code> and apply the corresponding Injury.
                If the rolled Injury is one the Unit already has, that Unit is Deceased and permanently removed from the battlefield.
              </p>
              <ul>
                {injuries?.gears.map((injury) => (
                  <li key={`inj_${injury.gearId}`}>
                    <h6>{injury.gearName}</h6>
                    <Markdown>{injury.description}</Markdown>
                  </li>
                ))}
              </ul>
            </div>
            <div className="section">
              <h3>Spoils of War</h3>
              <ul>
                {spoilsOfWar?.gears.map((sow) => (
                  <li key={`sow_${sow.gearId}`}>
                    <h6>{sow.gearName}</h6>
                    <Markdown>{sow.description}</Markdown>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <PageBreak />
        <h2>Quick Reference</h2>
        <HordeModeQuickRef />

        {/* NPC Squads */}
        <PageBreak />
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
