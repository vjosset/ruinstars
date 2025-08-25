export const runtime = 'nodejs'

import { getAuthSession } from '@/lib/auth'
import { GAME } from '@/lib/config/game_config'
import { prisma } from '@/lib/prisma'
import { resizeImage, saveImage } from '@/lib/utils/imageProcessing'
import { sanitizeFileName } from '@/lib/utils/utils'
import { SquadService } from '@/services'
import fs from 'fs/promises'
import { NextRequest, NextResponse, userAgent } from 'next/server'
import path from 'path'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const uploadDir = process.env.UPLOADS_DIR!

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ squadId: string }> }
) {
  const { squadId } = await params

  try {
    const squad = await SquadService.getSquadRow(squadId)
    if (!squad || !squad.hasCustomPortrait) {
      return new NextResponse('Not Found a', { status: 404 })
    }

    const squadName = sanitizeFileName(squad.squadName ? squad.squadName : squad.squadId)

    const filePath = path.resolve(
      uploadDir,
      `user_${squad.userId}`,
      `squad_${squad.squadId}`,
      `squad_${squad.squadId}.jpg`
    )

    const buffer = await fs.readFile(filePath)
    const uint8Array = new Uint8Array(buffer)

    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Content-Disposition': `inline; filename="${squadName}.jpg"`,
        'Link': `<${GAME.ROOT_URL}/api/squads/${squadId}/portrait>; rel="canonical"`
      },
    })
  } catch (err) {
    console.log('Squad portrait error:', err)
    return new NextResponse('Image not found', { status: 404 })
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ squadId: string }> }) {
  try {
    // Validate user - Must be logged in
    const session = await getAuthSession()
    if (!session?.user) return new NextResponse('Unauthorized', { status: 401 })

    // Parse form data
    const formData = await req.formData()
    const { squadId } = await params
    const file = formData.get('image') as File | null

    // Validate inputs
    if (!squadId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!file || !file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    // Get the squad
    const squad = await SquadService.getSquad(squadId)
    if (!squad || !squad.squadId || squad.userId !== session.user.userId) {
      return NextResponse.json({ error: 'Squad not found' }, { status: 404 })
    }

    // Process the image
    const filename = `squad_${squadId}.jpg`
    const resizedBuffer = await resizeImage(file, 900, 600)
    const publicUrl = await saveImage(resizedBuffer, session.user.userId, squad.squadId, filename)

    // Update the op record
    const updatedSquad = await SquadService.updateSquad(squadId, { hasCustomPortrait: true, portraitUpdatedAt: new Date() })

    // Track the portrait event
    await prisma.webEvent.create({
      data: {
        eventType: 'squad',
        action: 'portrait',
        label: 'custom',
        var1: squadId,
        var2: '',
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
    return NextResponse.json(updatedSquad, { status: 200 })
  } catch (err) {
    // Something went wrong
    return NextResponse.json({ error: 'Upload failed', details: String(err) }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ squadId: string }> }) {
  try {
    // Validate user - Must be logged in
    const session = await getAuthSession()
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { squadId } = await params

    const squad = await SquadService.getSquad(squadId)
    if (!squad || !squad.squadId || squad.userId !== session.user.userId) {
      return NextResponse.json({ error: 'Squad not found' }, { status: 404 })
    }

    const updatedSquad = await SquadService.deleteSquadPortrait(squadId)

    return NextResponse.json(updatedSquad, { status: 200 })
  } catch (err) {
    console.log('Portrait delete failed for squad:', err)
    return NextResponse.json({ error: 'Delete failed', details: String(err) }, { status: 500 })
  }
}
