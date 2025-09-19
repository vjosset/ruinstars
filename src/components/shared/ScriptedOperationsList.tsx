import Link from 'next/link'

export default function ScriptedOperationsList({ operations, squadTypes }: { operations: any[], squadTypes: { squadTypeId: string, squadTypeName: string }[] }) {
  if (!operations || !operations.length) {
    return <div>No scripted operations found.</div>
  }
  
  return (
    <div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        {operations.map((op) => {
          const a = squadTypes.find(t => t.squadTypeId === op.factions.squadTypeA)
          const b = squadTypes.find(t => t.squadTypeId === op.factions.squadTypeB)
          return (
            <Link
              key={op.slug}
              href={`/scriptedoperations?opId=${encodeURIComponent(op.slug)}`}
              className="group bg-card border border-border rounded hover:border-main transition p-2"
            >
              <div className="gap-1 grid gap-4 grid-cols-1">
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
