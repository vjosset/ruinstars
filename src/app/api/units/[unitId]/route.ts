import { getAuthSession } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { UnitService } from '@/services/unit.service'
import { Unit } from '@/types'
import { SquadService } from '@/services/squad.service'

// Get a Unit
export async function GET(req: Request, { params }: { params: Promise<{ unitId: string }> }) {
  const { unitId } = await params
  const unit = await UnitService.getUnit(unitId)
  if (!unit) return new NextResponse('Not Found', { status: 404 })

  return NextResponse.json(unit)
}

// Update a Unit
export async function PATCH(req: Request, { params }: { params: Promise<{ unitId: string }> }) {
  const { unitId } = await params
  const { unitName, unitTypeId, gearIds, currHIT, isActivated } = await req.json()

  const session = await getAuthSession()
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 })

  const unit = await UnitService.getUnit(unitId)

  const squad = (unit && unit.squadId) ? await SquadService.getSquadRow(unit.squadId) : null

  if (!unit || !squad || squad.userId !== session.user.userId) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const updates = {
    unitName,
    unitTypeId,
    gearIds,
    currHIT,
    isActivated,
  }

  const newUnit = await UnitService.updateUnit(unitId, updates)

  if (!newUnit) return new NextResponse('Error', { status: 500 })
  const model = new Unit(newUnit) //, gearMap)

  const finalUnit = await UnitService.getUnit(unitId)
  if (!finalUnit) return new NextResponse('Error', { status: 500 })
  return NextResponse.json(finalUnit.toPlain())
}

// Delete a unit
export async function DELETE(req: Request, { params }: { params: Promise<{ unitId: string }> }) {
  const { unitId } = await params
  const session = await getAuthSession()
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 })

  const unit = await UnitService.getUnitRow(unitId)

  const squad = (unit && unit.squadId) ? await SquadService.getSquadRow(unit.squadId) : null

  if (!unit || !squad || squad.userId !== session.user.userId) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  await UnitService.deleteUnit(unitId)
  return NextResponse.json({ success: true })
}
