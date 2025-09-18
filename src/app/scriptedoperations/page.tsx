import Markdown from '@/components/ui/Markdown'
import PageTitle from '@/components/ui/PageTitle'
import ops from '@/data/scriptedOperations.json'
import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { SquadTypeService } from '@/services'
import Link from 'next/link'

// This page varies by querystring (opId), so render per-request
export const dynamic = 'force-dynamic'

export async function generateMetadata({
  searchParams,
}: { searchParams?: { opId?: string | string[] } }) {
  const operations = ops

  const raw = searchParams?.opId
  const opId = Array.isArray(raw) ? raw[0] : raw

  if (opId) {
    const op = operations.find((o) => o.slug === opId)
    if (!op) return

    return generatePageMetadata({
      title: op.title,
      description: op.description,
      keywords: [op.title, 'operation', 'scripted operation', 'narrative', 'mission'],
      pagePath: `/scriptedoperations?opId=${encodeURIComponent(opId)}`
    })
  }
  
  return generatePageMetadata({
    title: 'Scripted Operations',
    description: `Browse scripted operations for ${GAME.NAME}, complete with narratives and mission details.`,
    keywords: ['scripted operations', 'operations', 'missions', 'narrative'],
    pagePath: '/scriptedoperations'
  })
}

export default async function ScriptedOperations({
  searchParams,
}: { searchParams?: { opId?: string | string[] } }) {
  const operations = ops.sort((a, b) => a.title.localeCompare(b.title))
  const squadTypes = await SquadTypeService.getAllSquadTypes()

  const raw = searchParams?.opId
  const opId = Array.isArray(raw) ? raw[0] : raw

  if (opId) {
    const op = operations.find((o) => o.slug === opId)
    return (
      <div className="px-1 py-8 max-w-7xl mx-auto">
        {!op ? (
          <div>Operation not found</div>
        ) : (
          <>
            <div className="text-center mb-8">
              <PageTitle>
                { op.title }
              </PageTitle>
              <div>
                <em>
                  {squadTypes.find(type => type.squadTypeId === op.factions.squadTypeA)?.squadTypeName}
                  {' '}vs.{' '}
                  {squadTypes.find(type => type.squadTypeId === op.factions.squadTypeB)?.squadTypeName}
                </em>
              </div>
            </div>
            <div className="mb-4">
              <Link href="/scriptedoperations" className="underline pb-4">Back to Scripted Operations</Link>
            </div>
            <div style={{ pageBreakAfter: 'always' }} key={op.slug}>
              <div className="flavor mb-4">{ op.description }</div>
              <div style={{ columnWidth: '400px' }}>
                { op.missions.map((m:any) => (
                  <div className="section bg-card border border-main p-1 rounded mb-2" key={`${op.slug}-${m.id}`}>
                    <h4 className="font-heading text-main">Mission {m.id}: {m.title}</h4>
                    <div className="flavor">{ m.description }</div>
                    <strong>Battlefield: </strong> { m.battlefield }<br />

                    { m.setup && (
                      <div className="border-t border-border">
                        <h5>Setup</h5>
                        <Markdown className="pl-2">{ m.setup }</Markdown>
                      </div>
                    )}
                    { m.deployment && (
                      <div className="border-t border-border">
                        <h5>Deployment</h5>
                        <Markdown className="pl-2">{ m.deployment }</Markdown>
                      </div>
                    )}
                    { m.special && (
                      <div className="border-t border-border">
                        <h5>Special</h5>
                        <Markdown className="pl-2">{ m.special }</Markdown>
                      </div>
                    )}
                    { m.victory && (
                      <div className="border-t border-border">
                        <h5>Victory</h5>
                        <Markdown className="pl-2">{ m.victory }</Markdown>
                      </div>
                    )}
                  </div>
                )) }
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  // Default: show card list with portraits
  return (
    <div className="px-1 py-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <PageTitle>
            Scripted Operations
        </PageTitle>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {operations.map((op) => {
          const a = squadTypes.find(t => t.squadTypeId === op.factions.squadTypeA)
          const b = squadTypes.find(t => t.squadTypeId === op.factions.squadTypeB)
          return (
            <Link
              key={op.slug}
              href={`?opId=${encodeURIComponent(op.slug)}`}
              className="group bg-card border border-border rounded hover:border-main transition p-2"
            >
              <div className="gap-1 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {/* Top-left: operation name and squad type names */}
                <div className="col-start-1 row-start-1 min-w-0">
                  <h3 className="font-heading text-lg text-main truncate">{op.title}</h3>
                  <div className="text-sm text-muted">
                    {(a?.squadTypeName ?? op.factions.squadTypeA)}{' '}vs{' '}
                    {(b?.squadTypeName ?? op.factions.squadTypeB)}
                  </div>
                </div>

                {/* Top-right: small portraits */}
                <div className="col-start-2 row-start-1 flex items-center gap-2">
                  <div className="relative h-12 w-12 rounded border border-border overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/img/squadTypes/${op.factions.squadTypeA}.webp)` }} />
                  </div>
                  <div className="relative h-12 w-12 rounded border border-border overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/img/squadTypes/${op.factions.squadTypeB}.webp)` }} />
                  </div>
                </div>

                {/* Second row: description full width */}
                <div className="col-span-2 row-start-2">
                  {op.description && (
                    <p className="text-sm line-clamp-3">{op.description}</p>
                  )}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
