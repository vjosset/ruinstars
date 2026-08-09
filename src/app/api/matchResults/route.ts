import { getAuthSession } from '@/lib/auth'
import { MatchResultService } from '@/services/matchResult.service'
import { SquadService } from '@/services/squad.service'
import { isMatchOutcome } from '@/types'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { squadAId, squadBId, result } = await req.json()

  // Get the current user
  const session = await getAuthSession()

  // Check for unauthenticated
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 })

  if (!squadAId || !squadBId || !result) {
    return new NextResponse('Missing required fields: squadAId, squadBId, result', { status: 400 })
  }

  if (!isMatchOutcome(result)) {
    return new NextResponse('Invalid result value. Must be "A", "B", or "D"', { status: 400 })
  }

  // Get both squads
  const [squadA, squadB] = await Promise.all([
    SquadService.getSquadIdentity(squadAId),
    SquadService.getSquadIdentity(squadBId),
  ])

  if (!squadA || !squadB) return new NextResponse('Squad not found', { status: 404 })

  // Check if the reporting Squad belongs to current user
  if (squadA.userId !== session.user.userId) return new NextResponse('Forbidden', { status: 403 })

  // A match needs two different players
  if (squadA.userId === squadB.userId) {
    return new NextResponse('Cannot record a match against your own squad', { status: 400 })
  }

  const match = await MatchResultService.createPendingMatch(squadA, squadB, result)
  return NextResponse.json(match.toPlain())
}
