import MissionCard from '@/components/shared/MissionCard'
import UnitCard from '@/components/unit/UnitCard'
import pveOperations from '@/data/operations_pve'
import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { SpecialService, SquadService } from '@/services'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'PvE Operations',
    description: `The complete list of PvE Operations for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{
      url: '/icons/icon-big.png',
    }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules/pveoperations'
  })
}

export default async function Rules({ searchParams }: { searchParams?: Promise<{ print?: string }> }) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined
  const npcSquadIds = Array.from(
    new Set(
      pveOperations
        .map((operation) => operation.npcSquadId)
        .filter((id): id is string => !!id)
    )
  )
  const squads = await Promise.all(
    npcSquadIds.map(async (squadId) => [squadId, await SquadService.getSquad(squadId)] as const)
  )
  const squadMap = new Map(squads.filter((entry) => entry[1]))
  const allSpecials = await SpecialService.getAllSpecials()
  const versionTimestamp = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date()).replaceAll('-', '')
  const showPrintSections = resolvedSearchParams?.print === '1'
  
  return (
    <>
      {showPrintSections && (
        <>
          {/* Cover */}
          <img src="/img/rules/BookCover_Framed.webp" className="printonly fullpage overflow-y-hidden" style={{pageBreakAfter: 'always'}} />
          <div className="printonly absolute left-1/2 top-1/4 -translate-x-1/2">
            <div className="text-white font-title text-2xl tracking-wide bg-black/70 px-6 py-3 rounded-lg shadow-lg">
              Version {versionTimestamp}
            </div>
          </div>
        </>
      )}

      <div className="rules px-3 max-w-7xl mx-auto">
        <h1 className="text-center py-3 font-title">PvE Operations</h1>
        <div className="section twocols">
          <div className="section flavor">
            We've been in the field for days now.
            First contact was resolved with minimal losses on our side, but the enemy did not break.
            They pulled back, regrouped, and returned in greater numbers than anticipated.
            Whatever we disrupted wasn't enough to end it. Only enough to make them cautious.
            <br/><br/>
            There's no window to stand down.
            No time to cycle out damaged gear or replace the fallen.
            Every engagement bleeds into the next, and the situation shifts faster than command updates can keep up.
            The enemy adapts. Positions we cleared are contested again. Resistance hardens with each push forward.
            <br/><br/>
            We finish the job or we don't leave. That's the reality on deployment.
            The next engagement will decide whether this becomes a contained incident or the opening chapter of something worse.
          </div>
          <p className="section">
            Operations are short, linked sequences of missions designed for solo or cooperative play.
            Each Operation is composed of three missions, with outcomes that branch based on success or failure.
            Missions must be played in order, following the indicated paths.<br/>
            The final mission reflects the cumulative pressure of earlier results, representing either a decisive push or a desperate holding action.
            <br/><br/>
            To play an Operation:
          </p>
          <ul>
            <li>Select an Operation and your Player Squad.</li>
            <li>Choose a Threat Level (in Campaign play, this would typically be the same as the operation number)</li>
            <li>Begin with Mission 1 and follow the setup and victory conditions as written.</li>
            <li>At the end of each mission, proceed to the next mission indicated by the outcome.</li>
            <li>Complete Mission 3 to conclude the Operation.</li>
          </ul>
          <p>
            Operations may be played as standalone experiences or linked together as part of a larger campaign.
            When used in a campaign, later Operations will naturally be more dangerous, reflecting the growing scope of the conflict.
          </p>
        </div>
        
        <div className="section">
          <h2>Campaigns</h2>
          <div className="section twocols">
            <div className="section">
              <h3>Campaign Structure</h3>
              A Campaign is composed of three Operations, and each Operation is composed of three Missions.
              At the end of each Operation, your Squad returns to Homebase to heal injuries, resupply, and recruit new Units into the Squad.<br/>
              To build a Campaign, choose or randomly select 3 Operations from the following pages.
            </div>
            <div className="section">
              <h3>Operations</h3>
              An Operation represents a critical deployment arc within the larger Campaign structure, which is generally composed of three sequential Missions.
              When the Operation begins, your Squad is considered in the field.
              While deployed in the field, the Squad cannot change its Units or Gear selections, and any rewards earned during these missions cannot be spent on new Units or Gear.
              <br/>
              Once the third Mission of an Operation is complete, your Squad returns to Homebase to heal Injuries, make new Gear selections, and recruit new Units by spending their accrued MP.
            </div>
            <div className="section">
              <h3>Threat Level</h3>
              Threat Level represents the difficulty of a given operation.
              If you are playing a three-Operation campaign, the first Operation will be at Threat Level 1, the second Operation at Threat Level 2, and the third at Threat Level 3.
              <br/>
              You can also play Operations in isolation and just select one of the three Threat Levels to fit your play style.
            </div>
            <div className="section">
              <h3>Rewards</h3>
              Your Squad will earn MP at the end of each Mission depending on success or failure.
              <br/>
              For each mission victory in the Operation, your squad earns 6 MP. These MP can be spent on upgrades when the Squad returns to Homebase.
            </div>
            <div className="section">
              <h3>Homebase</h3>
              At the end of each Operation (after the third Mission), your Squad returns to Homebase to heal injuries, resupply, and utilize accrued resources.
              <ol>
                <li>Remove all Deceased Units from your Squad.</li>
                <li>Remove all Injuries from remaining Units.</li>
                <li>Recruit new Units into the Squad. Deceased Units can only be replaced during this Homebase phase.</li>
                <li>Make changes to your Squad's selected Gear and Spoils Of War.</li>
              </ol>
            </div>
          </div>
        </div>

        {pveOperations.map((operation) => (
          <div key={operation.slug} style={{breakBefore: 'always'}}>
            <h1 className="text-main font-semibold">{operation.title}</h1>
            <div className="section twocols">
              <div className="section border border-main bg-card rounded my-4 p-2">
                <h4>Operation:</h4>
                <h5>{operation.title}</h5>
                {operation.npcSquadId &&
                  <>
                    <h4>Enemy Faction:</h4>
                    <h5>{squadMap.get(operation.npcSquadId)?.squadType?.faction?.factionName}</h5>
                  </>
                }
                <h4>Objectives:</h4>
                <h5>{operation.objectives}</h5>
              </div>
              <div className="section">
                {operation.description && (
                  <p className="flavor">{operation.description}</p>
                )}
              </div>
            </div>
            <div className="section">
              {operation.npcSquadComp && (
                <div className="my-4">
                  <h4 className="text-main font-semibold">NPC Squad</h4>
                  <p>
                    At the start of each mission, deploy NPC Units according to your Threat Level:
                  </p>
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-border">
                        <th className="p-2 border-b border-border">Threat Level</th>
                        <th className="p-2 border-b border-border">NPC Units</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(operation.npcSquadComp)
                        .sort(([a], [b]) => a.localeCompare(b))
                        .map(([threatLevel, units]) => (
                          <tr key={threatLevel}>
                            <td className="p-2">
                              {threatLevel}
                            </td>
                            <td className="p-2">{units}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {
              operation.npcSquadId && squadMap.get(operation.npcSquadId) && (
                <div className="my-4">
                  <h4 className="text-main font-semibold">{squadMap.get(operation.npcSquadId)?.squadType?.faction?.factionName}</h4>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {squadMap.get(operation.npcSquadId)?.units?.map((unit) => (
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
              )
            }
            <div className="section">
              <h2>Missions</h2>
              <div className="twocols">
                {operation.missions?.map((mission) => (
                  <div key={mission.missionId} className="section">
                    <MissionCard mission={mission} showDescription={true} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
