import { UserService } from '@/services'
import { NextResponse } from 'next/server'

// Get all squads for specified user
export async function GET(req: Request, { params }: { params: Promise<{ userName: string }> }) {
  const { userName } = await params
  let lookupName = userName
  try { lookupName = decodeURIComponent(userName) } catch {}

  const user = await UserService.getUserByUsername(lookupName)

  return NextResponse.json(user)
}
