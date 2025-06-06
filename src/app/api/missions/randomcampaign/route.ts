import { NextResponse } from 'next/server'
import { MissionService } from '@/services/mission.service'

// Get all missions
export async function GET() {
  const campaign = await MissionService.getRandomCampaign()

  return NextResponse.json(campaign)
}
