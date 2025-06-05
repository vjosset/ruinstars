import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const medals = await prisma.medal.findMany({
    orderBy: [ { medalId: 'asc' }], // Optional
  })

  return NextResponse.json(medals)
}