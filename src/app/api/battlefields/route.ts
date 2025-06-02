import { NextResponse } from 'next/server'
import { BattlefieldService } from '@/services/battlefield.service'

// Get all battlefields
export async function GET() {
  const battlefields = await BattlefieldService.getAllBattlefields()

  return NextResponse.json(battlefields)
}
