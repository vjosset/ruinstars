import { SquadService } from '@/services/squad.service'
import { NextResponse } from 'next/server'

// Search squads by id, name, or owner's user name - used by the opponent picker.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.trim()

  if (!q || q.length < 3) return NextResponse.json([])

  const squads = await SquadService.searchSquads(q)
  return NextResponse.json(squads)
}
