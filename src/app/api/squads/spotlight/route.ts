import { NextResponse } from 'next/server'
import { SquadService } from '@/services/squad.service'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const excludeSquadId = searchParams.get('excludeSquadId') ?? undefined
  const squad = await SquadService.getRandomSpotlightSquad(excludeSquadId)
  if (!squad) return new NextResponse('Not Found', { status: 404 })
  return NextResponse.json(squad.toPlain())
}
