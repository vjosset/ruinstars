import { NextResponse } from 'next/server'
import { SquadService } from '@/services/squad.service'

export async function GET() {
  const squad = await SquadService.getRandomSpotlightSquad()
  if (!squad) return new NextResponse('Not Found', { status: 404 })
  return NextResponse.json(squad.toPlain())
}
