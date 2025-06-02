import { prisma } from '@/lib/prisma'
import { SquadService } from '@/services'
import { hash } from 'bcryptjs'
import { nanoid } from 'nanoid'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userName, password } = await req.json()

  if (!userName || !password) {
    return new NextResponse('Missing fields', { status: 400 })
  }

  if (userName.length < 4) {
    return new NextResponse('UserName is too short (minimum 4 characters)', { status: 400 })
  }

  if (password.length < 6) {
    return new NextResponse('Password is too short (minimum 6 characters)', { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { userName } })
  if (existing) {
    return new NextResponse('User already exists', { status: 409 })
  }

  const hashed = await hash(password, 10)

  const user = await prisma.user.create({
    data: {
      userId: nanoid(10),
      userName,
      password: hashed,
    },
  })

  if (!user) return new NextResponse('Could not register new user', { status: 500 })

  // Now clone the default squad
  SquadService.cloneSquad("ST", user.userId, "Sample Squad")

  return NextResponse.json({ success: true, userid: user.userId })
}
