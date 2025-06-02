import { getAuthSession } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { SquadService } from '@/services/squad.service'

// Create new squad
export async function POST(req: Request) {
  const session = await getAuthSession()
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 })

  // Get the request payload
  const data = await req.json()

  // Force the squad to belong to current user
  data.userId = session.user.userId

  // Create the squad
  const squad = await SquadService.createSquad(data)

  return NextResponse.json(squad)
}
