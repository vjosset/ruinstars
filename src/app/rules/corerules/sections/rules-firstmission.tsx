import { PDFLink } from '@/components/nav/Links'
import MissionCard from '@/components/shared/MissionCard'
import UnitCard from '@/components/unit/UnitCard'
import missions_intro from '@/data/missions_intro'
import { SpecialService, SquadService } from '@/services'

export default async function RulesFirstMission({ num }: {num?: number | null}) {
  const squadUnits = await SquadService.getSquad('FM')
  const allSpecials = await SpecialService.getAllSpecials()
  const introMission = missions_intro[0]
  return (
    <div className="section">
      <div className="section">
        <h2 className="text-center py-3 font-title"   id="firstmission">
          {num && `${num}. `}First Mission
        </h2>

        <div className="twocols">
          <div className="section">
            This first mission is designed to introduce the core mechanics of Ruinstars in a contained, high-pressure scenario.
            Your Squad deploys at the center of the battlefield and must push outward to locate and destroy three Bug Nests before the end of Turn 4, while managing an ever-growing swarm that gets larger every turn.
            You'll practice moving under pressure, choosing between offensive and defensive priorities, and coordinating activations across your Squad.
            There are no objectives to carry, no doors to open, and no special actions to remember, just movement, combat, and the hard choices that come when you can't do everything at once.
            <div className="flavor">
              The city has been dark for three days.
              What began as isolated sightings on the outer districts has become something else entirely: a coordinated infestation moving inward with purpose.
              Command has designated the central strongpoint as the last viable defensive position in the sector, and your Squad has been ordered to hold it.
              The mission is simple: find the Nests, destroy them before the swarm becomes uncontrollable, and don't let the horde overrun your position.
              <br/>
              No reinforcements are coming. No extraction window has been scheduled. Command doesn't need you to win. They need you to buy time.
            </div>
            
            <div className="section">
              <h3>After Your First Mission</h3>
              The introductory mission focuses on area control and core movement and combat.<br/>
              Ruinstars is designed around three distinct ways to play, each with its own book that builds on these Core Rules:
              <ul>
                <li>
                  <PDFLink href="/assets/books/PvE Missions - Ruinstars.pdf" title="PvE Missions" /> is the recommended next step for most players.
                  It adds procedurally generated missions, cooperative or solo squad play, campaign structure with persistent injuries and rewards, and a roster of NPC factions to fight against.
                  Pick this up if you want solo or co-op play with narrative progression.
                </li>
                <li>
                  <PDFLink href="/assets/books/PvP Missions - Ruinstars.pdf" title="PvP Missions" /> pits two players head-to-head with their own custom squads across a set of competitive missions with their own campaign structure.
                  Pick this up if you want to test your squad-building and tactics against another player.
                </li>
                <li>
                  <PDFLink href="/assets/books/Horde Mode - Ruinstars.pdf" title="Horde Mode" /> is a standalone survival experience where your squad faces escalating waves of enemies with no extraction, just how long can you last?
                  Pick this up if you want a brutal, replayable challenge with no campaign overhead.
                </li>
              </ul>
              All three modes use the same Core Rules you've just learned.
              Each play mode book defines its own mission structure, scoring, turn additions, and campaign rules.
              You don't need to read all three, just pick the one that fits how you want to play.
            </div>
          </div>
          <div className="section" key={introMission.missionId}>
            <MissionCard mission={introMission} showDescription={true} />
          </div>
        </div>
      </div>

      <div className="section">
        <h3>First Mission Units</h3>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {squadUnits?.units?.map((u) => (
            <div key={u.unitId} className="p-1 print-unitcard-fluid">
              <UnitCard 
                key={u.unitId}
                seq={u.seq}
                unit={u.toPlain()}
                isOwner={false}
                allSpecials={allSpecials.map((spec) => spec.toPlain())}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
