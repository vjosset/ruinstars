'use client'

import Cropper from 'react-easy-crop'
import { useState } from 'react'
import type { Area } from 'react-easy-crop'

export async function getCroppedBlob(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = imageSrc
  })

  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')!

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  )

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Canvas toBlob failed'))
      },
      'image/jpeg',
      0.9,
    )
  })
}

interface PortraitCropperProps {
  imageSrc: string
  onCropComplete: (pixels: Area) => void
}

export default function PortraitCropper({ imageSrc, onCropComplete }: PortraitCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full" style={{ height: 300 }}>
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={3 / 2}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_percentCrop, pixelCrop) => onCropComplete(pixelCrop)}
        />
      </div>
      <input
        type="range"
        min={1}
        max={3}
        step={0.01}
        value={zoom}
        onChange={(e) => setZoom(Number(e.target.value))}
        className="w-full accent-orange-500"
        aria-label="Zoom"
      />
    </div>
  )
}
