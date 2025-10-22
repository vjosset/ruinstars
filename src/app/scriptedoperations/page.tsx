import { FactionLink } from '@/components/nav/Links'
import ScriptedOperationsList from '@/components/shared/ScriptedOperationsList'
import Markdown from '@/components/ui/Markdown'
import PageTitle from '@/components/ui/PageTitle'
import ops from '@/data/scriptedOperations.json'
import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { FactionService } from '@/services'
import Link from 'next/link'
import PageBreak from '../books/PageBreak'

// This page varies by querystring (opId), so render per-request
export const dynamic = 'force-dynamic'

export async function generateMetadata({
  searchParams,
}: { searchParams: Promise<{ opId?: string | string[]; factionId?: string | string[] }> }) {
  const operations = ops
  const factions = await FactionService.getAllFactions()

  const sp = await searchParams
  const rawOpId = sp?.opId
  const opId = Array.isArray(rawOpId) ? rawOpId[0] : rawOpId

  const rawFactionId = sp?.factionId
  const factionId = Array.isArray(rawFactionId) ? rawFactionId[0] : rawFactionId

  // Specific scripted operation
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

  // Filter on squad type
  if (factionId) {
    const ops = operations.filter((o) => o.factions.factionA === factionId || o.factions.factionB === factionId)
    if (!ops || !ops.length) return

    return generatePageMetadata({
      title: `${factions.find(f => f.factionId === factionId)?.factionName} Scripted Operations`,
      description: `Scripted operations for ${factions.find(f => f.factionId === factionId)?.factionName} squads in ${GAME.NAME}, complete with narratives and mission details.`,
      keywords: [...new Set(ops.flatMap(op => [`${factions.find(f => f.factionId === factionId)?.factionName}`, op.title, 'operation', 'scripted operation', 'narrative', 'mission']))],
      pagePath: `/scriptedoperations?factionId=${encodeURIComponent(factionId)}`
    })
  }
  
  // All scripted operations
  return generatePageMetadata({
    title: 'Scripted Operations',
    description: `Browse scripted operations for ${GAME.NAME}, complete with narratives and mission details.`,
    keywords: ['scripted operations', 'operations', 'missions', 'narrative'],
    pagePath: '/scriptedoperations'
  })
}

export default async function ScriptedOperations({ searchParams }: { searchParams?: Promise<{ opId?: string | string[]; factionId?: string | string[] }> | null }) {
  let operations = ops.sort((a, b) => a.title.localeCompare(b.title))
  const factions = await FactionService.getAllFactions()

  const sp = await searchParams
  const raw = sp?.opId
  const opId = Array.isArray(raw) ? raw[0] : raw

  const rawFactionId = sp?.factionId
  const factionId = Array.isArray(rawFactionId) ? rawFactionId[0] : rawFactionId

  if (factionId) {
    operations = operations.filter((o) => o.factions.factionA === factionId || o.factions.factionB === factionId)
  }

  if (opId) {
    const op = operations.find((o) => o.slug === opId)
    return (
      <div className="px-1 py-8 max-w-7xl mx-auto">
        {!op ? (
          <div>Operation not found</div>
        ) : (
          <ScriptedOperation key={op.slug} op={op} factions={factions} />
        )}
      </div>
    )
  }

  // Default: show operation cards list with portraits
  return (
    <div>
      {/* Supplement Cover 
      <div className="printonly text-white w-full text-center" style={{ position: 'absolute', top: '50%' }}>
        <h1 className="font-title text-7xl">Scripted Operations</h1>
        <pre>v{versionDate}</pre>
      </div>
      <img src="/img/rules/BookCover.webp" className="printonly fullpage overflow-hidden" style={{ pageBreakAfter: 'always' }} />
      */}

      <div className="px-1 py-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <PageTitle>
            {(opId || factionId) && factions.find(f => f.factionId === factionId) ? `${factions.find(f => f.factionId === factionId)?.factionName} ` : ''}
            Scripted Operations
          </PageTitle>
          {(opId || factionId) && (
            <div className="noprint">
              <div className="text-muted">
              For <FactionLink factionId={factionId!} factionName={factions.find(f => f.factionId === factionId)?.factionName!} /> squads
              </div>
              <div className="mb-4">
                <Link href="/scriptedoperations" className="underline pb-4">All Scripted Operations</Link>
              </div>
            </div>
          )}
        </div>
        {!opId && !factionId && (
          <div className="mb-8 text-muted">
            <p className="mb-4">
              War rages across the stars. Squads clash in ruined cities, cursed temples, alien jungles, and forgotten fortresses.
              Yet not every battle is random. Some are part of carefully planned operations, chains of missions where each outcome shapes the next, where victory builds momentum, and defeat forces desperate gambits.
            </p>
            <p className="mb-4">
              This supplement collects a series of tailor-made mini-campaigns for Ruinstars, each designed around specific factions and their rivalries.<br/>
              These operations offer:
              <ul>
                <li>Narrative arcs that tell a story through connected missions.</li>
                <li>Branching paths where success or failure leads to different challenges.</li>
                <li>Unique mechanics that go beyond simple control points: moving convoys, tug-of-war captives, collapsing strongpoints, dark rituals, and leader duels.</li>
                <li>Faction flavor that highlights the tactics, goals, and themes of each force.</li>
              </ul>
            </p>
            <p className="mb-4">
              Whether you're playing a quick three-mission arc or stringing multiple operations into a larger campaign, these scenarios bring new life and variety to your battles.<br/>
              Use them as written, adapt them to your campaign, or draw inspiration to create your own.
            </p>
            <h4 className="font-title text-main">From the Archives of the Warfront</h4>
            <div className="flavor mb-4">
              “Records tell us that history turns not on grand crusades, but on knife fights in forgotten ruins. A convoy lost. A leader enthralled. A shrine defiled.
              These are the sparks that ignite empires, the stains that never wash clean. Each squad is a thread in the weave of destiny, each skirmish a test of survival.
              Do not mistake these operations for small affairs; they are the crucibles where factions rise or die.”
              <br/><br/>
              - Fragment of intercepted broadcast, author unknown
            </div>
          </div>
        )}
        <div className="noprint">
          <ScriptedOperationsList operations={operations} factions={factions} />
        </div>
      
        {/* For print, list ALL operations in full detail */}
        <PageBreak />
        <div className="printonly p-6">
          {operations.map((op, idx) => {
            const isLast = idx === operations.length - 1
            return (
              <div className="m-6 p-6" key={op.slug} style={{ pageBreakAfter: isLast ? 'auto' : 'always' }}>
                <ScriptedOperation op={op} factions={factions} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function ScriptedOperation({ op, factions }: { op: any, factions: { factionId: string, factionName: string }[] }) {
  return (
    <div>
      <div className="text-center mb-8">
        <PageTitle className="mb-4">
          { op.title }
        </PageTitle>
        <div className="text-muted">
          Scripted Operation: { ' ' }<br/>
          <FactionLink factionId={op.factions.factionA} factionName={factions.find(f => f.factionId === op.factions.factionA)?.factionName!} />
          vs.
          <FactionLink factionId={op.factions.factionB} factionName={factions.find(f => f.factionId === op.factions.factionB)?.factionName!} />
        </div>
      </div>
      <div key={op.slug}>
        <div className="flavor mb-4">{ op.description }</div>
        <div style={{ columnWidth: '400px' }}>
          { op.missions.map((m:any) => (
            <div className="section bg-card border border-main p-1 rounded mb-2" key={`${op.slug}-${m.id}`}>
              <h4 className="font-heading text-main">Mission {m.id}: {m.title}</h4>
              <div className="flavor">{ m.description }</div>
              <strong>Battlefield: </strong> { m.battlefield }<br />

              { m.setup && (
                <div className="border-t border-border">
                  <h6 className="text-main">Setup</h6>
                  <Markdown className="ml-2">{ m.setup }</Markdown>
                </div>
              )}
              { m.deployment && (
                <div className="border-t border-border">
                  <h6 className="text-main">Deployment</h6>
                  <Markdown className="ml-2">{ m.deployment }</Markdown>
                </div>
              )}
              { m.special && (
                <div className="border-t border-border">
                  <h6 className="text-main">Special</h6>
                  <Markdown className="ml-2">{ m.special }</Markdown>
                </div>
              )}
              { m.victory && (
                <div className="border-t border-border">
                  <h6 className="text-main">Victory</h6>
                  <Markdown className="ml-2">{ m.victory }</Markdown>
                </div>
              )}
            </div>
          )) }
        </div>
      </div>
    </div>
  )
}
