import { getAuthSession } from '@/lib/auth'
import { MatchResultService } from '@/services/matchResult.service'
import { SquadService } from '@/services/squad.service'
import { NextResponse } from 'next/server'

// Public, but viewer-aware: the squad's owner also sees unconfirmed results.
export async function GET(req: Request, { params }: { params: Promise<{ squadId: string }> }) {
  const { squadId } = await params

  // Get the Squad
  const squad = await SquadService.getSquadIdentity(squadId)
  if (!squad) return new NextResponse('Squad not found', { status: 404 })

  // Check if this Squad belongs to current user
  const session = await getAuthSession()
  const isOwner = squad.userId === session?.user?.userId

  const matchResults = await MatchResultService.getMatchResultsForSquad(squadId, isOwner)
  return NextResponse.json(matchResults)
}
