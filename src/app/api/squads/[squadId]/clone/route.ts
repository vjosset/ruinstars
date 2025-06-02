import { NextResponse } from 'next/server'
import { getAuthSession } from '@/lib/auth'
import { SquadService } from '@/services'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ squadId: string }> }
) {
  const session = await getAuthSession()
  if (!session?.user) return new NextResponse('Unauthorized', { status: 401 })

  const { squadId } = await params
  
  // Get the request payload
  const data = (await req.json()) ?? null

  // Get Squad to clone
  const squadRow = await SquadService.getSquadRow(squadId)
  if (!squadRow) return new NextResponse('Squad not found', { status: 404 })

  const newSquadName = data.squadName ? data.squadName : (squadRow.userId == session.user.userId ? `${squadRow.squadName} - Copy` : `${squadRow.squadName}`)
  
  // Now create the squad and its units
  const newSquad = await SquadService.cloneSquad(squadId, session.user.userId, newSquadName)
  if (!newSquad) {
    return new NextResponse('Failed to create squad', { status: 500 })
  }

  return NextResponse.json(newSquad.toPlain())
}
