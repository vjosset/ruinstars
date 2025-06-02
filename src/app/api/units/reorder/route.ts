import { NextResponse } from 'next/server'
import { getAuthSession } from '@/src/lib/auth'
import { UnitService } from '@/services'

export async function POST(req: Request) {
  const session = await getAuthSession()
  if (!session?.user?.userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  let updates
  try {
    updates = await req.json()
  } catch {
    return new NextResponse('Invalid JSON', { status: 400 })
  }

  if (!Array.isArray(updates) || !updates.every(u => u.unitId && typeof u.seq === 'number')) {
    return new NextResponse('Invalid request body', { status: 400 })
  }

  try {
    for (var update of updates) {
      // Check if the user is allowed to update this unit
      const unit = await UnitService.getUnit(update.unitId)
      if (!unit || !unit.squad) {
        return new NextResponse('Unit not found', { status: 404 })
      }
      if (unit.squad.userId !== session.user.userId) {
        return new NextResponse('Forbidden', { status: 403 })
      }
      // Update the squad order
      await UnitService.updateUnit(update.unitId, {seq: update.seq})
    }
    return new NextResponse('OK', { status: 200 })
  } catch (err) {
    console.error('Failed to update squad order', err)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
