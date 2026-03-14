import Markdown from '@/components/ui/Markdown'
import PageBreak from '@/components/ui/PageBreak'
import { GAME } from '@/lib/config/game_config'

import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { GearCategoryService, SpecialService, UserService } from '@/services'
import UnitCard from '@/components/unit/UnitCard'
import RulesAnchors from '../sections/rules-anchors'
import { PDFLink } from '@/components/nav/Links'
import PvEMissionsQuickRef from './sections/rules-pvemissions-quickref'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'PvE Missions',
    description: `The complete PvE Mission rules for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{
      url: '/icons/icon-big.png',
    }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules/pvemissions'
  })
}

export default async function PvEMissions() {
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

  return (
    <>
      {/* Cover */}
      <img src="/img/rules/BookCover_Framed.webp" className="printonly fullpage overflow-y-hidden" style={{pageBreakAfter: 'always'}} loading="eager" decoding="async" />
      <div className="printonly absolute left-1/2 top-1/4 -translate-x-1/2">
        <div className="text-center text-white font-title text-2xl tracking-wide bg-black/70 px-6 py-3 rounded-lg shadow-lg">
          <h1>PvE Missions</h1>
          <p className="text-md">
            2nd Edition <span className="text-sm">v{versionTimestamp}</span>
          </p>
        </div>
      </div>

      <div className="rules px-3 max-w-7xl mx-auto">
        <div className="section">
          <h1 className="text-center pt-48 mb-12 font-title"   id="allsquadTypes" style={{position: 'relative', top: '50%' }}>
            PvE Missions
          </h1>

          <div className="section twocols">
            <div className="section">
              <h2>Introduction</h2>
              <div className="flavor">
                There are no fair fights left.
                <br/>
                The great wars are over, or so the histories claim. What remains are their consequences: quarantined sectors, broken supply lines, abandoned installations, and threats that cannot be destroyed, only contained, delayed, or outrun.
                <br/>
                PvE missions represent the work that never makes it into official records. Recovery operations that arrive too late. Containment efforts stretched past their breaking point. Raids launched not to win, but to buy time.
                <br/>
                Your squad is deployed with limited intelligence, incomplete objectives, and no guarantee of extraction. Every decision carries weight beyond the battlefield. What you secure, what you abandon, and who you leave behind will shape what comes next.
              </div>
            </div>
            <div className="section">
              <h2>About</h2>
              This book contains everything needed to play procedurally generated PvE missions in Ruinstars.
              <br/>
              PvE missions are designed to be playable solo or cooperatively, fast to set up, narrative-driven without requiring a dedicated game master, and meaningful across multiple missions and campaigns.
              <br/><br/>
              Each Mission is one engagement that sees your Squad face enemy forces and make difficult decisions on risks vs rewards.
              Each Mission has two objectives, but completing them is not enough to guarantee victory; your Squad must make it off the battlefield alive to reap the rewards.
              <br/><br/>
              PvE play emphasizes tactical restraint over reckless aggression, extraction as a strategic decision, not an afterthought, and long-term squad survival over single-mission dominance.
              <p>
                Note you will need the <PDFLink href="/assets/books/Core Rules - Ruinstars.pdf" title='Core Rules' /> to play this mode.
              </p>
            </div>
          </div>

          <div className="section">
            <RulesAnchors />
          </div>

          <PageBreak />
          <div className="section">
            <h2>Mission Setup</h2>
            <div className="section twocols">
              <div className="section">
                Before the first turn begins, follow the steps below to generate your mission.
                Each mission is defined by
                two random <strong>Objectives</strong> that determine victory conditions,
                a <strong>Battlefield</strong> that alters mission conditions,
                and a <strong>Deployment</strong> variant that determines where both squads begin.
                <br/>
                For your first mission, skip steps 2 and 3; play without Battlefield effects and with Standard Insertion to learn the core mechanics.
                Once you're comfortable, the Battlefield and Deployment Variants add significant variety without increasing complexity.
              </div>
              <div className="section border border-main rounded-md px-6 py-2 mx-16">
                <h4>Mission Setup</h4>
                <ol className="ml-4">
                  <li>Roll 2 Objectives</li>
                  <li>Roll Battlefield</li>
                  <li>Roll Deployment</li>
                  <li>Roll NPC Squad Units</li>
                  <li>Deploy NPC Squad</li>
                  <li>Deploy Player Squad</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="twocols">
            {/* NPC Squads + TL */}
            <div className="section">
              <h3>NPC Squads</h3>
              Each mission is opposed by a single NPC faction.
              Select a faction from the NPC Units section at the back of this book, or choose one randomly.
              For variety, we recommend using the same faction for all three missions within an Operation, then switching factions for the next Operation.
              <br/>
              Each NPC Squad has a Spawn Table that determines which Units are deployed for a given mission.
              Before deploying the NPC Squad, select a Threat Level from 1 to 3.
              Threat Level represents the intensity of the opposition your Squad faces.
              Higher Threat Levels produce more dangerous Units and larger groups.
              If playing a Campaign, the Threat Level should match the current Operation number:
              TL1 for Operation 1, TL2 for Operation 2, TL3 for Operation 3.
              <br/>
              Once you have selected a faction and Threat Level, roll <code>3D6</code> and consult that faction's Spawn Table.
              Each die is resolved individually - look up each result in the column matching your current Threat Level to identify the Units spawned by that die.
            </div>
            {/* Objectives */}
            <div className="section">
              <h3>Objectives (D6)</h3>
              At the start of the Mission, roll <code>2D6</code> to determine two objectives for the mission (re-roll doubles).
              <div>
                <strong>1: Control</strong>
                <div className="ml-4">
                  <strong>Setup:</strong> Place an Objective on three random Anchors.<br/>
                  <strong>Victory:</strong> At the end of any two consecutive Turns, Player Squad Controls all three Objectives.
                  {/* 
                  <strong>Rewards (pick one):</strong>
                  <ul>
                    <li>
                      <strong>Forward Positioning</strong>
                      In the next Mission, one Player Unit may perform a free Move Action immediately after deployment.
                    </li>
                    <li>
                      <strong>Stabilized Zone</strong>
                      In the next Mission, you may re-roll one Turn Event roll.
                    </li>
                  </ul>
                  */}
                </div>
              </div>
              <div>
                <strong>2: Activate</strong>
                <div className="ml-4">
                  <strong>Setup:</strong> Place an Objective on 3 random Anchors.<br/>
                  <strong>Mission Action - Activate (2ACT):</strong> A Unit that Controls an Objective activates it. Remove that Objective from the battlefield.<br/>
                  <strong>Victory:</strong> All 3 Objectives have been activated.
                  {/* 
                  <strong>Rewards (pick one):</strong>
                  <ul>
                    <li>
                      <strong>Orbital Survey</strong>
                      In the next Mission, you may choose to ignore one Turn Event
                    </li>
                    <li>
                      <strong>Signal Advantage</strong>
                      In the next Mission, Player Squad gets +2 TO in the first Turn
                    </li>
                  </ul>
                  */}
                </div>
              </div>
              <div>
                <strong>3: Destroy</strong>
                <div className="ml-4">
                  <strong>Setup:</strong> Place an Objective on 3 random Anchors.<br/>
                  <strong>Special:</strong> Objectives are items with <code>ARM 4</code> and <code>HIT 3</code> and can be targeted in combat.<br/>
                  <strong>Victory:</strong> All Objectives are Taken Out.
                  {/* 
                  <strong>Rewards (pick one):</strong>
                  <ul>
                    <li>
                      <strong>Stabilized Zone</strong>
                      In the next Mission, you may re-roll one Turn Event roll.
                    </li>
                    <li>
                      <strong>Fragmented Defense</strong>
                      In the next Mission, after deploying NPC Units, you may remove one NPC Unit from the battlefield.
                    </li>
                  </ul>
                  */}
                </div>
              </div>
              <div>
                <strong>4: Protect</strong>
                <div className="ml-4">
                  <strong>Setup:</strong> Place an Asset marker on a random Anchor. Assets are Items with <code>ARM 4 HIT 3</code> and can be targeted in Combat.<br/>
                  <strong>Special:</strong> NPC Units always prioritize targeting the Asset instead of Player Units.<br/>
                  <strong>Victory:</strong> At the end of Turn 4, the Asset still has at least 1 <code>HIT</code>.
                  {/* 
                  <strong>Rewards (pick one):</strong>
                  <ul>
                    <li>
                      <strong>Medic</strong>
                      Remove one Injury from one Player Unit before the next Mission.
                    </li>
                    <li>
                      <strong>Extraction Support</strong>
                      In the next Mission, Player Squad may extract even if Adjacent to an enemy Unit
                    </li>
                  </ul>
                  */}
                </div>
              </div>
              <div>
                <strong>5: Search</strong>
                <div className="ml-4">
                  <strong>Setup:</strong> Place a Search Objective on 3 random Anchors.<br/>
                  <strong>Mission Action - Search (2ACT):</strong> A Unit that Controls a Search Objective searches it. Roll <code>1D6</code>:
                  <ul>
                    <li>First Search: Artifact is found on a roll of <code>1</code></li>
                    <li>Second Search: Artifact is found on a roll of <code>1-2</code></li>
                    <li>Third Search: Artifact is found automatically</li>
                  </ul>
                  This roll cannot be modified or re-rolled using TO.<br/>
                  <strong>Victory:</strong> The Artifact is found.
                  {/* 
                  <strong>Rewards (pick one):</strong>
                  <ul>
                    <li>
                      <strong>Strategic Forecast</strong>
                      In the next Mission, you may choose to ignore the Mission Modifier
                    </li>
                    <li>
                      <strong>Protection Aura</strong>
                      In the next Mission, select one Anchor. No NPC Units may come within 3" of that Anchor.
                    </li>
                  </ul>
                  */}
                </div>
              </div>
              <div>
                <strong>Recover</strong>
                <div className="ml-4">
                  <strong>Setup:</strong> Place a Retrieval Objective on a random Anchor.<br/>
                  <strong>Mission Action - Pick Up (2ACT):</strong> A Unit that Controls the Retrieval Objective picks it up it. A Unit carrying the Objective may drop/pass it for 1ACT.<br/>
                  <strong>Victory:</strong> A Unit carrying the Retrieval Objective extracts successfully
                  {/* 
                  <strong>Rewards (pick one):</strong>
                  <ul>
                    <li>
                      <strong>Attrition</strong>
                      In the next Mission, you may choose one NPC Spawn die to spawn 1 less Unit.
                    </li>
                    <li>
                      <strong>Persistent Wound</strong>
                      In the next Mission, choose two NPC Units to start with -1 HIT.
                    </li>
                  </ul>
                  */}
                </div>
              </div>
              <br/>
              These Objectives describe mechanics, not story. The names and markers are placeholders.
              When building a campaign, replace them with whatever fits the mission.<br/>
              "Activate Objectives" can mean picking up data cores, toppling ritual altars, or placing demolition charges.
              "The Asset" becomes a defector, a relic, or a downed pilot.<br/>
              The mechanics stay the same; the campaign tells the player what each objective means.
            </div>
            {/* Battlefields */}
            <div className="section">
              <h3>Battlefields (D6)</h3>
              <div>
                <strong>1: The Ruined City - Collapse</strong>
                <div className="ml-4">
                  The battlefield itself is killing you. At the start of each Turn after the first, roll for a random Anchor.
                  All terrain within 4" of that Anchor is removed from the battlefield, and all Units with 4" of that Anchor take 2 Damage.
                </div>
              </div>
              <div>
                <strong>2: The Facility - Darkness</strong>
                <div className="ml-4">
                  At the start of each Turn after the first, select one random Anchor.
                  Until the end of the Turn, Units within 4" of that Anchor cannot be targeted in Ranged Combat.
                </div>
              </div>
              <div>
                <strong>3: The Jungle - Miasmic Mist</strong>
                <div className="ml-4">
                  At the start of each Turn after the first, select one random Standing Unit from each Squad. That Unit moves 2" three times in random directions (roll three times).
                  Note this does not trigger Attacks of Opportunity.
                  If that Unit cannot make a valid move because of wall or other obstacle, it takes 1 Melee Damage.
                </div>
              </div>
              <div>
                <strong>4: The Alien Hive - Noxious Gas</strong>
                <div className="ml-4">
                  At the start of each Turn after the first, select one random Anchor. All Units within 4" of that Anchor take 1 Damage.
                </div>
              </div>
              <div>
                <strong>5: The Cursed Temple - Haunting Spirits</strong>
                <div className="ml-4">
                  At the start of each Turn after the first, select one random Unit from each Squad.
                  That Unit is overtaken by the temple's restless spirits and immediately attacks the closest Unit in Combat, Squadmate or enemy.
                </div>
              </div>
              <div>
                <strong>6: The Rift - Shifting Realities</strong>
                <div className="ml-4">
                  At the start of each Turn after the first, select one random Standing Unit from each Squad. 
                  Swap their positions.
                </div>
              </div>
            </div>
            {/* Deployments */}
            <div className="section">
              <h3>Deployments (D6)</h3>
              <div>
                <strong>1: Standard Insertion</strong>
                <div className="ml-4">
                  Player Squad deploys within 4" of the SW, S, or SE Anchors.
                  NPC Squad deploys within 4" of the NW, N, or NE Anchors (split evenly), in Cover or out of sight where possible.
                </div>
              </div>
              <div>
                <strong>2: Hot Drop</strong>
                <div className="ml-4">
                  The insertion was faster than expected. Player Squad deploys Adjacent to the N, S, E, or W Anchors.
                  NPC Squad deploys Adjacent to the NW, NE, SW, or SE Anchors (split evenly), in Cover or out of sight where possible.
                </div>
              </div>
              <div>
                <strong>3: Flanked</strong>
                <div className="ml-4">
                  Intel was wrong. The enemy is coming from two directions.
                  NPC Squad deploys Adjacent to the NW or NE Anchors (split evenly), in Cover or out of sight where possible.
                  Player Squad deploys within 4" of the S Anchor.
                </div>
              </div>
              <div>
                <strong>4: Deep Strike</strong>
                <div className="ml-4">
                  Both sides arrived at the same time.
                  Player Squad deploys within 4" of the SE anchor.
                  NPC Squad deploys within 4" of the NW anchor, in Cover if possible.
                </div>
              </div>
              <div>
                <strong>5: Overwatch</strong>
                <div className="ml-4">
                  The enemy holds the high ground and saw you coming.
                  NPC Squad deploys Adjacent to the W, N, or E Anchors (split evenly), in Cover or out of sight where possible.
                  Player Squad deploys Adjacent to the SW, S, or SE Anchors.
                </div>
              </div>
              <div>
                <strong>6: Encircled</strong>
                <div className="ml-4">
                  Extraction just got complicated.
                  Player Squad deploys within 4" of the Center anchor.
                  NPC Squad deploys Adjacent to the NW, NE, SW, or SE Anchors (split evenly), in Cover or out of sight where possible.
                </div>
              </div>
            </div>
          </div>

          <div className="section">
            <h2>Playing the Mission</h2>
            <div className="section twocols">
              {/* Turn Sequence */}
              <div className="section">
                <h3>Turn Sequence</h3>
                <ol>
                  <li>Roll TOs</li>
                  <li>Roll Battlefield Effect (if any)</li>
                  <li>Resolve "Start of Turn" Events and Skills</li>
                  <li>Activate Units</li>
                  <li>Choose to Extract</li>
                </ol>
              </div>
              {/* Turn Events 
              <div className="section">
                <h3>Turn Events (D6)</h3>
                At the start of each Turn, roll <code>1D6</code> to determine a special event for the Turn.
                If the Mission is in Turn 5 or later, do not roll Turn Events and apply the <strong>Enemy Reinforcements</strong> event instead.
                <div>
                  <strong>1: Opportunity</strong>
                  <div className="ml-4">One Player Unit may immediately spend up to <code>2 ACT</code> on actions before the start of the Turn. This does not count as that Unit's activation for the Turn.</div>
                </div>
                <div>
                  <strong>2: Field Dressing</strong>
                  <div className="ml-4">One Standing Player Unit regains 1 lost <code>HIT</code>.</div>
                </div>
                <div>
                  <strong>3: Strategic Command</strong>
                  <div className="ml-4">Player Squad gains <code>+2 TO</code>.</div>
                </div>
                <div>
                  <strong>4: Scrambled Comms</strong>
                  <div className="ml-4">Player Squad loses <code>-2 TO</code> (minimum 0).</div>
                </div>
                <div>
                  <strong>5: Overrun</strong>
                  <div className="ml-4">All NPC Units immediately perform 1 Action according to their Behavior.</div>
                </div>
                <div>
                  <strong>6: Enemy Reinforcements</strong>
                  <div className="ml-4">Roll <code>1D6</code> and consult the Spawn Table for the current Threat Level. Spawn indicated Units Adjacent to a random Anchor (one per Anchor).</div>
                </div>
              </div>
              */}
              {/* Reinforcements */}
              <div className="section">
                <h3>Reinforcements</h3>
                From Turn 5 onward, at the start of each Turn, roll 1D6 and consult the Spawn Table for the current Threat Level.
                Spawn the indicated Units Adjacent to a random Anchor (one per Anchor).
              </div>
              {/* NPC Activations */}
              <div className="section">
                <h3>NPC Activations</h3>
                After each Player Unit activation, the same player activates a Ready NPC Unit.
                Each NPC Unit has a "Behavior" skill that describes how it spends its ACT.
                After each NPC Unit activation, the next Player activates a Player Unit and the cycle repeats until all Units have been activated.
              </div>
              {/* Extraction */}
              <div className="section">
                <h3>Extraction</h3>
                At the start of Turn 4, roll a random Anchor to determine the Extraction Point. If that Anchor is occupied by an objective marker, re-roll until an unoccupied Anchor is selected.
                <br/>
                At the end of Turn 4 or later, the Player Squad may extract. Each Standing Unit within 3" of the Extraction Point that is not Adjacent to any enemy Unit extracts successfully.<br/>
                Units that fail to meet both conditions are left behind: treat each as if it was Taken Out during the mission (apply Injuries in Campaign play).<br/>
                <h4>Mission End</h4>
                The mission ends when the Player Squad extracts or when all Player Units have been Taken Out.<br/>
                Mission Scoring:
                <ul>
                  <li><strong>2 MP</strong> per TL</li>
                  <li><strong>2 MP</strong> per TL if all enemy Units Taken Out</li>
                  <li><strong>2 MP</strong> per completed objective if the Squad extracted</li>
                </ul>
                In Campaign play, MP can be spent on Rewards (see <strong>Campaigns</strong> below) for the Squad.
              </div>
            </div>
          </div>

          <PageBreak />
          <div>
            <h2>Campaigns</h2>
            <div className="twocols">
              <div className="">
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
                An Operation represents a critical deployment arc within the larger Campaign structure, and is composed of three sequential Missions.
                When the Operation begins, your Squad is considered in the field. While deployed in the field, the Squad cannot change its Units or Gear selections, and any Mission Points (MP) earned during these missions cannot be spent on new Units or Gear.<br/>
                Once the third Mission of an Operation is complete, your Squad returns to Homebase to heal Injuries, make new Gear selections, and recruit new Units by spending their hard-earned MP.

                <h4>Missions and Objectives</h4>
                Each Mission in the campaign should move the story forward. In many cases, this means using the 6 Objectives from the table above, but re-skinning them to fit the narrative. Here are some examples of reframing the core Objectives to fit <em>your</em> story:

                <div className="section">
                  <h6>Control</h6>
                  The markers could be anything worth holding: a comm relay that must stay live, a breach point that cannot be ceded, a position that commands the only viable extraction route. The story reason matters less than the pressure it creates. If the enemy controls it, you lose.
                </div>
                <div className="section">
                  <h6>Activate</h6>
                  Think of these as things that must be done, not held. Purging corrupted data cores. Triggering demolition charges. Sealing breaches in a containment perimeter. The squad moves through, does the work, and leaves. The objective is complete when there is nothing left to do.
                </div>
                <div className="section">
                  <h6>Destroy</h6>
                  These are things that cannot be allowed to survive. Spawn nodes. Weapons caches. A relay broadcasting enemy coordinates. Whatever they are, they can take damage and they must be brought down. Unlike Activate Objectives, destroying them is a fight, not a procedure.
                </div>
                <div className="section">
                  <h6>Protect</h6>
                  The asset is whatever your squad cannot afford to lose. A critical systems console. A civilian who knows something. The enemy will go for it. Your job is to make sure they fail.
                </div>
                <div className="section">
                  <h6>Search</h6>
                  Something is here. You don't know where. It could be intelligence, a weapon, a body, a signal source. You search until you find it. Campaigns can replace the die roll with a guaranteed find on each marker if the mission calls for certainty over tension.
                </div>
                <div className="section">
                  <h6>Recover</h6>
                  
                </div>
               
                <h4>Enemy Faction and Threat Level</h4>
                The Threat Level to use when building NPC Squads should be the same as the Operation number (i.e. TL1 for Missions in Operation 1, TL2 for Operation 2, TL3 for Operation 3).
                For simplicity, we also recommend using the same faction for all Missions in a given Operation but you may choose to change factions for each Mission.

                <h4>Homebase</h4>
                At the end of each Operation, after the third Mission, your Squad returns to Homebase to heal injuries, resupply, and utilize accrued resources.
                <ol>
                  <li>Remove all Deceased Units from your Squad.</li>
                  <li>Remove one Injury from remaining Units.</li>
                  <li>Recruit new Units into the Squad (to maximum 100 GP).</li>
                  <li>Make changes to your Squad's selected Gear and Spoils Of War.</li>
                </ol>
              </div>
            </div>
            <div className="section twocols">
              <div className="section">
                <h3>Injuries</h3>
                <p>
                  At the end of each Mission, each of your Units that was Taken Out during the mission may have a persistent injury.
                  Note that when playing a campaign, one Injury may be removed from each Unit (except Deceased) when they return to Homebase at the end of each Operation.
                </p>
                <p>
                  At the end of each Mission, for each Player Unit that was Taken Out, roll <code>1D6</code> to determine the Injury this Unit received.<br/>
                  If the Injury is one that the Unit already had, that Unit is Deceased. Remove the Unit from the Squad. That Unit cannot be replaced until the Squad returns to Homebase at the end of the Operation.
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
                Each Spoil of War costs 8 MP and applies to one specific Player Unit.
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
          </div>
          
          <PageBreak />
          <h2>Quick Reference</h2>
          <PvEMissionsQuickRef />

          <div>
            {pveSquads.map((squad) => (
              <div key={squad.squadId}>
                <PageBreak />
                <h3 className="text-main font-semibold">{squad.squadName}</h3>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {squad.spawnTable && (
                    <div className="bg-card border border-main p-1 rounded relative flex flex-col h-full unitcard">
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
                      allSpecials={allSpecials.map((spec) => spec.toPlain())}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
