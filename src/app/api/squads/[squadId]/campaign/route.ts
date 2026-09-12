import { getAuthSession } from '@/lib/auth'
import { CampaignService, SquadService } from '@/services'
import { NextResponse } from 'next/server'

export async function PUT(req: Request, { params }: { params: Promise<{ squadId: string }> }) {
  const { squadId } = await params

  // Get the current user
  const session = await getAuthSession()

  // Check for unauthenticated
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 })

  // Check if this Squad belongs to current user
  const squad = await SquadService.getSquadRow(squadId)
  if (!squad || squad.userId !== session.user.userId) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Validate and save (returns the cleaned Campaign)
  const result = await CampaignService.saveSquadCampaign(squadId, body)
  if (!result.campaign) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  return NextResponse.json(result.campaign)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ squadId: string }> }) {
  const { squadId } = await params

  // Get the current user
  const session = await getAuthSession()

  // Check for unauthenticated
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 })

  // Check if this Squad belongs to current user
  const squad = await SquadService.getSquadRow(squadId)
  if (!squad || squad.userId !== session.user.userId) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  await CampaignService.deleteSquadCampaign(squadId)
  return NextResponse.json({ success: true })
}
