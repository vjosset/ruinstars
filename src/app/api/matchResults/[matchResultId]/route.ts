import { getAuthSession } from '@/lib/auth'
import { MatchResultService } from '@/services/matchResult.service'
import { NextResponse } from 'next/server'

// Either side may remove a pending match: the opponent disputing it, or the
// reporter deleting their own report.
export async function DELETE(req: Request, { params }: { params: Promise<{ matchResultId: string }> }) {
  const { matchResultId } = await params
  const id = parseInt(matchResultId, 10)
  if (isNaN(id)) return new NextResponse('Invalid match result ID', { status: 400 })

  // Get the current user
  const session = await getAuthSession()

  // Check for unauthenticated
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 })

  // Get the match to remove
  const match = await MatchResultService.getMatchResult(id)
  if (!match) return new NextResponse('Match not found', { status: 404 })

  // Check if either squad in this match belongs to current user
  const isReporter = match.squadA.userId === session.user.userId
  const isOpponent = match.squadB.userId === session.user.userId
  if (!isReporter && !isOpponent) return new NextResponse('Forbidden', { status: 403 })

  if (match.squadBConfirmed) {
    return new NextResponse('Cannot remove a confirmed match', { status: 409 })
  }

  await MatchResultService.deletePendingMatch(id)
  return NextResponse.json({ success: true })
}
