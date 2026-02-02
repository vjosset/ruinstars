import MissionCard from '@/components/shared/MissionCard'
import missions from '@/data/missions.json'
import Link from 'next/link'

export default async function RulesFirstMission({ num }: {num?: Number | null}) {
  const introMission = missions.filter((mission) => mission.title == 'Secure the Zone')[0]
  return (
    <>
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
        <h3>After Your First Mission</h3>

        <div className="twocols">
          <div className="section">
            <h4>Try Another Mission</h4>

            The introductory mission focuses on area control and core movement and combat.
            To see how missions can change the flow of a battle, try one of these next:
            <ul>
              <li>Secure the Zone - Control multiple objectives across the battlefield</li>
              <li>Centerpoint - Commit everything to a single, high-stakes objective</li>
              <li>Recover Intel - Use Mission Actions to pick up and carry objectives under fire</li>
            </ul>
            
            The full list of primary missions is available in the <Link className="underline" href="/assets/Ruinstars-Missions.pdf">Missions PDF</Link>.
          </div>
          <div className="section">
            <h4>Beyond Skirmish Play</h4>

              Ruinstars also supports two additional ways to play:

            <ul>
              <li>
                <Link className="underline" href="/assets/Ruinstars-CampaignsAndOperations.pdf">Campaigns and Operations</Link><br/>
                Linked narrative missions with branching objectives and escalating stakes.
              </li>
              <li>
                <Link className="underline" href="/assets/Ruinstars-HordeMode.pdf">Horde Mode</Link><br/>
                A standalone solo or co-op survival mode where your Squad faces increasingly dangerous waves of enemies.
              </li>
            </ul>

            These modes build on the Core Rules but change the structure of play.
            Each is covered in its own dedicated PDF.
          </div>
        </div>
      </div>
    </>
  )}
