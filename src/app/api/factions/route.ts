import { NextResponse } from 'next/server'
import { FactionService } from '@/services/faction.service'

// Get all factions
export async function GET() {
  const factions = await FactionService.getAllFactions()

  return NextResponse.json(factions)
}
