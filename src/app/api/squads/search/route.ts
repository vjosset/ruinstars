import { prisma } from '@/src/lib/prisma'
import { NextResponse } from 'next/server'

// Search squads by name or username for the Record Battle modal.
// Returns minimal fields needed for opponent selection.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.trim()

  if (!q || q.length < 2) {
    return NextResponse.json([])
  }

  const rows = await prisma.squad.findMany({
    where: {
      OR: [
        { squadName: { contains: q } },
        { user: { userName: { contains: q } } },
      ],
    },
    select: {
      squadId: true,
      squadName: true,
      userId: true,
      user: {
        select: { userName: true },
      },
      squadType: {
        select: { squadTypeName: true },
      },
    },
    take: 20,
    orderBy: { squadName: 'asc' },
  })

  return NextResponse.json(
    rows.map(r => ({
      squadId: r.squadId,
      squadName: r.squadName,
      userId: r.userId,
      userName: r.user.userName,
      squadTypeName: r.squadType.squadTypeName,
    }))
  )
}
