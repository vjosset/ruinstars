import { generateCampaign } from '@/lib/campaigngen/campaigngen'
import { NextResponse } from 'next/server'

// API GET handler
export async function GET() {
  const campaign = generateCampaign()
  return NextResponse.json({ campaign })
}
