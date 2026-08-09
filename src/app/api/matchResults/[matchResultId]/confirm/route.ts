import { getAuthSession } from '@/lib/auth'
import { MatchResultService } from '@/services/matchResult.service'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request, { params }: { params: Promise<{ matchResultId: string }> }) {
  const { matchResultId } = await params
  const id = parseInt(matchResultId, 10)
  if (isNaN(id)) return new NextResponse('Invalid match result ID', { status: 400 })

  // Get the current user
  const session = await getAuthSession()

  // Check for unauthenticated
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 })

  // Get the match to confirm
  const match = await MatchResultService.getMatchResult(id)
  if (!match) return new NextResponse('Match not found', { status: 404 })

  // Only the opposing squad's owner can confirm. squadB.userId is null once that
  // squad is deleted, so this also fails closed.
  if (match.squadB.userId !== session.user.userId) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  if (match.squadBConfirmed) return new NextResponse('Match already confirmed', { status: 409 })

  const confirmed = await MatchResultService.confirmMatch(id)
  return NextResponse.json(confirmed.toPlain())
}
