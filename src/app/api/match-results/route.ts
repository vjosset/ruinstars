import { getAuthSession } from '@/lib/auth'
import { MatchResultService } from '@/services/matchResult.service'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const session = await getAuthSession()
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 })

  const { squadAId, squadBId, result } = await req.json()

  if (!squadAId || !squadBId || !result) {
    return new NextResponse('Missing required fields: squadAId, squadBId, result', { status: 400 })
  }

  try {
    const match = await MatchResultService.createPendingMatch(
      squadAId,
      squadBId,
      result,
      session.user.userId
    )
    return NextResponse.json(match.toPlain())
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to record match'
    return new NextResponse(message, { status: 400 })
  }
}
