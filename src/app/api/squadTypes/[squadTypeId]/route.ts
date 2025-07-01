import { SquadTypeService } from '@/services/squadType.service'
import { UnitType } from '@/types'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ squadTypeId: string }> }) {
  const { squadTypeId } = await params
  const squadType = await SquadTypeService.getSquadType(squadTypeId)
  if (!squadType) {
    return NextResponse.json({ error: 'SquadType not found' }, { status: 404 })
  }

  const unitTypes = squadType.unitTypes?.map((ut) => {
    const proto = new UnitType(ut)
    return proto.toPlain()
  })

  return NextResponse.json({
    squadTypeId: squadType.squadTypeId,
    squadTypeName: squadType.squadTypeName,
    description: squadType.description,
    unitTypes,
  })
}
