import { MatchResultService } from '@/services/matchResult.service'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ squadId: string }> }) {
  const { squadId } = await params
  const history = await MatchResultService.getMatchHistoryForSquad(squadId)
  return NextResponse.json(history)
}
