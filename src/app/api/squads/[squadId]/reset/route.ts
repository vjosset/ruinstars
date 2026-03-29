import { NextResponse } from 'next/server'
import { getAuthSession } from '@/lib/auth'
import { SquadService } from '@/services'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ squadId: string }> }
) {
  const session = await getAuthSession()
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 })

  const { squadId } = await params

  // Check ownership
  const squad = await SquadService.getSquadRow(squadId)

  if (!squad || squad.userId !== session.user.userId) {
    return new NextResponse('Forbidden', { status: 403 })
  }
  
  let resetMP = false, removeInjuries = false, removeSpoils = false
  try {
    const body = await req.json()
    resetMP = !!body.resetMP
    removeInjuries = !!body.removeInjuries
    removeSpoils = !!body.removeSpoils
  } catch {
    // no body or invalid JSON - use defaults
  }

  const newSquad = await SquadService.resetSquad(squadId, { resetMP, removeInjuries, removeSpoils })
  if (!newSquad) {
    return new NextResponse('Failed to reset squad', { status: 500 })
  }

  return NextResponse.json(newSquad.toPlain())
}
