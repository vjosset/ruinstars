import { NextResponse } from 'next/server'
import { MissionService } from '@/services/mission.service'

// Get all missions
export async function GET() {
  const missions = await MissionService.getAllMissions()

  return NextResponse.json(missions)
}
