import { getAuthSession } from '@/lib/auth'
import { nanoid } from 'nanoid'
import { NextResponse } from 'next/server'
import { UnitService, SquadService } from '@/src/services'

export async function POST(req: Request) {
  const { unitName, unitTypeId, squadId, gearIds, medalIds, currHIT } = await req.json()

  const session = await getAuthSession()
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 })

  const squad = await SquadService.getSquad(squadId)

  // Check if the squad belongs to this user
  if (!squad || squad?.userId !== session?.user.userId) return new NextResponse('Forbidden', { status: 403 })

  // Set the seq on this new unit to be the last one)
  const seq = squad.units? squad.units.length + 1 : 1

  const unit = await UnitService.createUnit({
    unitId: nanoid(),
    currHIT,
    unitName,
    squadId,
    unitTypeId,
    seq,
    gearIds,
    medalIds,
  })

  if (!unit) return new NextResponse('Failed to create unit', { status: 500 })
  return NextResponse.json(unit.toPlain())
}
