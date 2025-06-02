import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const rules = await prisma.special.findMany({
    orderBy: [ { scope: 'asc' }, {specialName: 'asc' }], // Optional
  })

  return NextResponse.json(rules)
}