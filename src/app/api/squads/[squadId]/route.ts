import { getAuthSession } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { SquadService } from '@/services/squad.service'

export async function GET(req: Request, { params }: { params: Promise<{ squadId: string }> }) {
  const { squadId } = await params

  // Get the Squad
  const squad = await SquadService.getSquad(squadId)

  // Return the Squad
  return NextResponse.json(squad)
}

export async function PATCH(req: Request, { params }: { params: Promise<{ squadId: string }> }) {
  const { squadId } = await params

  // Get the current user
  const session = await getAuthSession()

  // Check for unauthenticated
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 })

  // Get the Squad to update
  const squad = await SquadService.getSquadRow(squadId)

  // Check if this Squad belongs to current user
  if (!squad || squad.userId !== session.user.userId) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Get the PATCH request in full
  const updates = await req.json()

  // Run the update (returns the updated object)
  const updated = await SquadService.updateSquad(squadId, updates)

  return NextResponse.json(updated?.toPlain())
}

export async function DELETE(req: Request, { params }: { params: Promise<{ squadId: string }> }) {
  const { squadId } = await params
  
  // Get the current user
  const session = await getAuthSession()
  
  // Check for unauthenticated
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 })

  // Get the Squad to delete
  const squad = await SquadService.getSquadRow(squadId)
  
  // Check if this Squad belongs to current user
  if (!squad || squad.userId !== session.user.userId) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Delete the record
  await SquadService.deleteSquad(squadId)
  return NextResponse.json({ success: true })
}
