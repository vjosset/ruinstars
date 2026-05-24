'use client'

import { Button, Input, Label, Modal } from '@/components/ui'
import { getSquadPortraitUrl, toEpochMs } from '@/lib/utils/imageUrls'
import { SquadPlain } from '@/types'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import type { Area } from 'react-easy-crop'
import { toast } from 'sonner'
import PortraitCropper, { getCroppedBlob } from '../shared/PortraitCropper'

export interface EditSquadFormRef {
  handleSubmit: () => void
}

const EditSquadForm = forwardRef(function EditSquadForm(
  {
    squad,
    initialName,
    initialMaxGP,
    initialNotes,
    squadId,
    hasCustomPortrait,
    onSave: onSubmit,
    onCancel,
    onSaveDisabledChange,
  }: {
    squad: SquadPlain,
    initialName: string
    initialMaxGP: number
    initialNotes: string | null | undefined
    squadId: string
    hasCustomPortrait: boolean
    onSave: (name: string, maxGP: number, notes: string) => void
    onCancel: () => void
    onSaveDisabledChange?: (disabled: boolean) => void
  },
  ref
) {
  const [name, setName] = useState(initialName)
  const [maxGP] = useState(initialMaxGP.toString())
  const [notes, setNotes] = useState(initialNotes ?? '')

  const [activeTab, setActiveTab] = useState<'details' | 'portrait'>('details')

  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const [showDeleteConfirmPortrait, setShowDeletePortraitConfirm] = useState(false)

  useEffect(() => {
    if (activeTab === 'portrait') {
      onSaveDisabledChange?.(!rawImageSrc || !croppedAreaPixels || isSaving)
    } else {
      onSaveDisabledChange?.(false)
    }
  }, [activeTab, rawImageSrc, croppedAreaPixels, isSaving])

  useImperativeHandle(ref, () => ({
    handleSubmit: async () => {
      if (activeTab === 'details') {
        onSubmit(name, parseInt(maxGP), notes)
      } else if (activeTab === 'portrait') {
        await handlePortraitSave()
      }
    }
  }))

  const handlePortraitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setUploadError(null)
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image must be under 10 MB.')
      return
    }
    setRawImageSrc(URL.createObjectURL(file))
    setCroppedAreaPixels(null)
  }

  const handlePortraitSave = async () => {
    if (!rawImageSrc || !croppedAreaPixels) return
    setUploadError(null)
    setIsSaving(true)

    try {
      const blob = await getCroppedBlob(rawImageSrc, croppedAreaPixels)
      const formData = new FormData()
      formData.append('image', blob, 'portrait.jpg')

      const res = await fetch(`/api/squads/${squadId}/portrait`, {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Upload failed')
      }

      toast.success('Portrait uploaded!')
      setRawImageSrc(null)
      setCroppedAreaPixels(null)
      squad.hasCustomPortrait = true
      squad.portraitUpdatedAt = new Date()
      onCancel()
    } catch (err: any) {
      setUploadError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleConfirmDeletePortrait = async () => {
    setShowDeletePortraitConfirm(false)

    try {
      const res = await fetch(`/api/squads/${squadId}/portrait`, {
        method: 'DELETE'
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Delete failed')
      }

      toast.success('Portrait deleted.')
      squad.hasCustomPortrait = false
      squad.portraitUpdatedAt = new Date()
      onCancel()
    } catch (err: any) {
      setUploadError(err.message)
    }
  }

  return (
    <>
      {/* Tab Navigation */}
      <div className="flex border-b border-border mb-2">
        <button
          className={`px-4 py-2 font-bold ${activeTab === 'details' ? 'border-b-2 border-main text-main' : 'text-muted'}`}
          onClick={() => setActiveTab('details')}
        >
          Details
        </button>
        <button
          className={`px-4 py-2 font-bold ${activeTab === 'portrait' ? 'border-b-2 border-main text-main' : 'text-muted'}`}
          onClick={() => setActiveTab('portrait')}
        >
          Portrait
        </button>
      </div>

      {/* Tab Content - Details */}
      {activeTab === 'details' && (
        <div className="space-y-1">
          <div className="grid grid-cols-[5rem_1fr] items-center gap-x-4">
            <Label htmlFor="squadName" className="whitespace-nowrap">Squad Name</Label>
            <Input
              id="squadName"
              value={name}
              autoCapitalize="words"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter squad name"
            />
          </div>
          <div className="items-start mt-2">
            <Label htmlFor="squadNotes" className="whitespace-nowrap pt-2">Notes</Label>
            <textarea
              id="squadNotes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Mission notes, campaign log, strategies..."
              rows={10}
              className="w-full bg-card border border-border rounded px-1 py-2 text-sm text-white placeholder:text-muted focus:outline-none focus:border-main"
            />
          </div>
        </div>
      )}

      {/* Tab Content - Portrait */}
      {activeTab === 'portrait' && (
        <div className="flex flex-col space-y-4">

          {/* Existing portrait */}
          {hasCustomPortrait && !rawImageSrc && (
            <div className="flex flex-col space-y-2">
              <img
                src={`${getSquadPortraitUrl(squadId)}?v=${toEpochMs(squad.portraitUpdatedAt)}`}
                alt="Current portrait"
                className="rounded border border-border max-w-xs max-h-48 object-cover"
              />
              <Button
                variant="ghost"
                className="self-start text-red-500 border-red-500"
                onClick={() => setShowDeletePortraitConfirm(true)}
              >
                <h6>Delete Portrait</h6>
              </Button>
            </div>
          )}

          {/* Upload / cropper section */}
          <div>
            <h5>{hasCustomPortrait ? 'Replace Portrait' : 'Upload Portrait'}</h5>
            <p className="text-muted mb-2">
              Upload a portrait image for this squad.
              To be considered for the Squad Showcase, each Unit portrait must be a photo of its painted mini,
              and the Squad portrait must be a photo of all painted minis together.
              Qualifying squads appear in the "Showcase" tab for their Faction and are randomly shown on the homepage.
            </p>

            {rawImageSrc ? (
              <>
                <PortraitCropper imageSrc={rawImageSrc} onCropComplete={setCroppedAreaPixels} />
                <button
                  className="mt-2 text-sm text-muted underline hover:text-white"
                  onClick={() => { setRawImageSrc(null); setCroppedAreaPixels(null) }}
                >
                  Choose different image
                </button>
              </>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handlePortraitChange}
                className="mt-2"
              />
            )}
          </div>

          {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmPortrait && (
        <Modal
          title="Delete Portrait"
          onClose={() => setShowDeletePortraitConfirm(false)}
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowDeletePortraitConfirm(false)}>
                <h6>Cancel</h6>
              </Button>
              <Button onClick={handleConfirmDeletePortrait}>
                <h6>Delete</h6>
              </Button>
            </div>
          }
        >
          Are you sure you want to delete this squad portrait? This action cannot be undone.
        </Modal>
      )}
    </>
  )
})

export default EditSquadForm
