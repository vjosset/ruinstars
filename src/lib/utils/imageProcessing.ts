import fs from 'fs/promises'
import os from 'os'
import path from 'path'
import sharp from 'sharp'

const uploadDir = process.env.UPLOADS_DIR!

export async function resizeImage(
  file: File,
  width: number,
  height: number
): Promise<Buffer> {
  try {
    // Create a temp file in OS tmp dir
    const tempPath = path.join(os.tmpdir(), `${Date.now()}-${Math.random().toString(36).slice(2)}.tmp`)
    
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Write temp file
    await fs.writeFile(tempPath, buffer)

    // Resize and convert
    const resized = await sharp(tempPath)
      .rotate()
      .resize(width, height, { fit: 'cover', position: 'center' })
      .jpeg({ quality: 80, force: true })
      .toBuffer()

    // Cleanup
    try {
      await fs.unlink(tempPath)
    } catch (err) {
      console.warn(`Failed to delete temp file: ${tempPath}`, err)
    }

    return resized
  } catch (error) {
    throw new Error(`Failed to resize image: ${error}`)
  }
}

export async function saveImage(
  buffer: Buffer,
  userId: string,
  rosterId: string,
  filename: string
): Promise<string> {
  try {
    const baseDir = path.resolve(uploadDir, `user_${userId}`, `squad_${rosterId}`)
    await fs.mkdir(baseDir, { recursive: true })

    const destFilePath = path.join(baseDir, filename)
    await fs.writeFile(destFilePath, buffer)

    return `/api/uploads/user_${userId}/squad_${rosterId}/${filename}`
  } catch (error) {
    throw new Error(`Failed to save image: ${error}`)
  }
}
