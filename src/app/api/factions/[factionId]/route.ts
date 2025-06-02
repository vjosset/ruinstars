import { NextResponse } from 'next/server'
import { FactionService } from '@/services/faction.service'
import { GearService } from '@/services/gear.service'
import { UnitType } from '@/types'

export async function GET(req: Request, { params }: { params: Promise<{ factionId: string }> }) {
  const { factionId } = await params
  const faction = await FactionService.getFaction(factionId)
  if (!faction) {
    return NextResponse.json({ error: 'Faction not found' }, { status: 404 })
  }

  const gearList = await GearService.getAllGears()
  const gearMap = new Map(gearList.map((g) => [g.gearId, g]))

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
