export const runtime = 'nodejs'

import { getAuthSession } from '@/lib/auth'
import { GAME } from '@/lib/config/game_config'
import { prisma } from '@/lib/prisma'
import { resizeImage, saveImage } from '@/lib/utils/imageProcessing'
import { sanitizeFileName } from '@/lib/utils/utils'
import { SquadService, UnitService } from '@/services'
import fs from 'fs/promises'
import { NextRequest, NextResponse, userAgent } from 'next/server'
import path from 'path'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const uploadDir = process.env.UPLOADS_DIR!

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ unitId: string }> }
) {
  const { unitId } = await params

  try {
    const unit = await UnitService.getUnitRow(unitId)
    if (!unit?.hasCustomPortrait) {
      return new NextResponse('Not Found', { status: 404 })
    }

    const unitName = sanitizeFileName(unit.unitName ?? unit.unitId)

    const squad = await SquadService.getSquadRow(unit.squadId ?? '')
    if (!squad) {
      return new NextResponse('Squad not found', { status: 404 })
    }

    const filePath = path.resolve(
      uploadDir,
      `user_${squad.userId}`,
      `squad_${unit.squadId}`,
      `unit_${unitId}.jpg`
    )

    const buffer = await fs.readFile(filePath)
    const uint8Array = new Uint8Array(buffer)

    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Disposition': `inline; filename="${unitName}.jpg"`,
        'Link': `<${GAME.ROOT_URL}/api/ops/${unitId}/portrait>; rel="canonical"`
      },
    })
  } catch (err) {
    console.log('Unit portrait error:', err)
    return new NextResponse('Image not found', { status: 404 })
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ unitId: string }> }) {
  try {
    // Validate user - Must be logged in
    const session = await getAuthSession()
    if (!session?.user) return new NextResponse('Unauthorized', { status: 401 })

    // Parse form data
    const formData = await req.formData()
    const { unitId } = await params
    const file = formData.get('image') as File | null

    // Validate inputs
    if (!unitId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!file || !file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    // Get the op
    const op = await UnitService.getUnit(unitId)
    if (!op || !op.squad || !op.squadId || op.squad.userId !== session.user.userId) {
      return NextResponse.json({ error: 'Operative not found' }, { status: 404 })
    }

    // Process the image
    const filename = `unit_${unitId}.jpg`
    const resizedBuffer = await resizeImage(file, 900, 600)
    const publicUrl = await saveImage(resizedBuffer, session.user.userId, op.squadId, filename)

    // Update the op record
    const updatedUnit = await UnitService.updateUnit(unitId, { hasCustomPortrait: true, portraitUpdatedAt: new Date() })

    // Track the portrait event
    await prisma.webEvent.create({
      data: {
        eventType: 'squad',
        action: 'unitportrait',
        label: 'custom',
        var1: op.squadId,
        var2: op.unitId,
        var3: '',
        url: (req.headers.get('referer') || '').substring(0, 500),
        sessionType: '',
        referrer: (req.headers.get('referer') || '').substring(0, 500),
        userAgent: userAgent(req).ua,
        userIp: req.headers.get('x-forwarded-for')?.split(',')[0].trim() || '',
        userId: session.user.userId
      },
    })

    // Done
    return NextResponse.json(updatedUnit, { status: 200 })
  } catch (err) {
    // Something went wrong
    return NextResponse.json({ error: 'Upload failed', details: String(err) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ unitId: string }> }) {
  try {
    // Validate user - Must be logged in
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { unitId } = await params

    const op = await UnitService.getUnit(unitId)
    if (!op || !op.squad || !op.squadId || op.squad.userId !== session.user.userId) {
      return NextResponse.json({ error: 'Operative not found' }, { status: 404 })
    }

    await UnitService.deleteUnitPortrait(unitId)

    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.log('Portrait delete failed for unit:', err)
    return NextResponse.json({ error: 'Delete failed', details: String(err) }, { status: 500 })
  }
}
