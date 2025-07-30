import { safeGenerateCampaign } from '@/lib/campaigngen/campaigngen'
import { NextResponse } from 'next/server'

// API GET handler
export async function GET() {
  const campaign = safeGenerateCampaign(3, 3)
  return NextResponse.json({ campaign })
}
