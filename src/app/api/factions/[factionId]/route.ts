import { FactionService } from '@/services/faction.service'
import { UnitType } from '@/types'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ factionId: string }> }) {
  const { factionId } = await params
  const faction = await FactionService.getFaction(factionId)
  if (!faction) {
    return NextResponse.json({ error: 'Faction not found' }, { status: 404 })
  }

  const unitTypes = faction.unitTypes?.map((ut) => {
    const proto = new UnitType(ut)
    return proto.toPlain()
  })

  return NextResponse.json({
    factionId: faction.factionId,
    factionName: faction.factionName,
    description: faction.description,
    unitTypes,
  })
}
