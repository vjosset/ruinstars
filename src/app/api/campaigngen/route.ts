import { generateCampaign } from '@/lib/campaigngen/campaigngen'
import { NextResponse } from 'next/server'

// API GET handler
export async function GET() {
  const campaign = generateCampaign(3, 3)
  return NextResponse.json({ campaign })
}
