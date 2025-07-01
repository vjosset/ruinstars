import { SquadTypeService } from '@/services/squadType.service'
import { NextResponse } from 'next/server'

// Get all squadTypes
export async function GET() {
  const squadTypes = await SquadTypeService.getAllSquadTypes()

  return NextResponse.json(squadTypes)
}
