import MissionCard from '@/components/shared/MissionCard'
import UnitCard from '@/components/unit/UnitCard'
import pveOperations from '@/data/operations_pve.json'
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
        <h2 className="text-center py-3 font-title">PvE Operations</h2>
        {pveOperations.map((operation) => (
          <div key={operation.slug}>
            <h3 className="text-main font-semibold">{operation.title}</h3>
            {operation.description && (
              <p className="text-muted mt-2">{operation.description}</p>
            )}
            {
              operation.npcSquadId && squadMap.get(operation.npcSquadId) && (
                <div className="my-4">
                  <h4 className="text-main font-semibold">NPC Units</h4>
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {squadMap.get(operation.npcSquadId)?.units?.map((unit) => (
                      <UnitCard
                        key={unit.unitId}
                        seq={unit.seq}
                        unit={unit.toPlain()}
                        isOwner={false}
                        allSpecials={allSpecials.map((spec) => spec.toPlain())}
                        allMedals={[]}
                      />
                    ))}
                  </div>
                </div>
              )
            }
            {
              operation.npcSquadComp && (
                <div className="my-4">
                  <h4 className="text-main font-semibold">NPC Squad</h4>
                  <p>
                    At the start of each mission, deploy NPC Units according to your current Operation:
                  </p>
                  <table className="w-full text-sm border border-border rounded">
                    <thead>
                      <tr className="text-left">
                        <th className="p-2 border-b border-border">Operation</th>
                        <th className="p-2 border-b border-border">NPC Units</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(operation.npcSquadComp)
                        .sort(([a], [b]) => a.localeCompare(b))
                        .map(([threatLevel, units]) => (
                          <tr key={threatLevel}>
                            <td className="p-2 border-b border-border">
                              {threatLevel.replace('TL', 'Operation ')}
                            </td>
                            <td className="p-2 border-b border-border">{units}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )
            }
            {operation.missions?.map((mission) => (
              <div key={mission.missionId} className="section">
                <MissionCard mission={mission} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
