import { PDFLink } from '@/components/nav/Links'
import MissionCard from '@/components/shared/MissionCard'
import UnitCard from '@/components/unit/UnitCard'
import missions from '@/data/missions_pve_old'
import { SpecialService, SquadService } from '@/services'

export default async function RulesFirstMission({ num }: {num?: number | null}) {
  const squadUnits = await SquadService.getSquad('FM')
  const allSpecials = await SpecialService.getAllSpecials()
  const introMission = missions[0]
  return (
    <div className="section">
      <div className="section">
        <h2 className="text-center py-3 font-title"   id="firstmission">
          {num && `${num}. `}First Mission
        </h2>

        <div className="section">
          <p>
            Your Squad is deployed high-stakes tactical missions fought by the few who dare to step onto the battlefield when hope has long since burned away.<br/>
            This first mission is intended to be played as an introduction to the core concepts of the game.
          </p>
        </div>
      </div>

      <div className="section" key={introMission.missionId}>
        <MissionCard mission={introMission} showDescription={true} />
      </div>
      <div className="section">
        <h3>First Mission Units</h3>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {squadUnits?.units?.map((u) => (
            <UnitCard 
              key={u.unitId}
              seq={u.seq}
              unit={u.toPlain()}
              isOwner={false}
              allSpecials={allSpecials.map((spec) => spec.toPlain())}
            />
          ))}
        </div>
      </div>

      <div className="section">
        <h3>After Your First Mission</h3>

        <div className="twocols">
          <div className="section">
            <h4>Try Another Mission</h4>

            The introductory mission focuses on area control and core movement and combat.
            To see how missions can change the flow of a battle, try one of these next:
            <ul>
              <li><strong>Secure the Zone</strong> - Control multiple objectives across the battlefield</li>
              <li><strong>Centerpoint</strong> - Commit everything to a single, high-stakes objective</li>
              <li><strong>Recover Intel</strong> - Use Mission Actions to pick up and carry objectives under fire</li>
            </ul>
            
            The full list of primary missions is available in the <PDFLink href="/assets/Ruinstars-Missions.pdf" title="Missions" />.
          </div>
          <div className="section">
            <h4>Beyond Skirmish Play</h4>
            Ruinstars also supports two additional ways to play:
            <ul>
              <li>
                <PDFLink href="/assets/Ruinstars-CampaignsAndOperations.pdf" title="Campaigns and Operations" /><br/>
                Linked narrative missions with branching objectives and escalating stakes.
              </li>
              <li>
                <PDFLink href="/assets/Ruinstars-HordeMode.pdf" title="Horde Mode" /><br/>
                A standalone solo or co-op survival mode where your Squad faces increasingly dangerous waves of enemies.
              </li>
            </ul>

            These modes build on the Core Rules but change the structure of play.
            Each is covered in its own dedicated PDF.
          </div>
        </div>
      </div>
    </div>
  )}
