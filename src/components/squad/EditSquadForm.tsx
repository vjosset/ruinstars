'use client'

import { Button, Input, Label, Modal } from '@/components/ui'
import { SquadPlain } from '@/types'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { toast } from 'sonner'

export interface EditSquadFormRef {
  handleSubmit: () => void
}

const EditSquadForm = forwardRef(function EditSquadForm(
  {
    squad,
    initialName,
    initialMaxGP,
    squadId,
    hasCustomPortrait,
    onSave: onSubmit,
    onCancel,
  }: {
    squad: SquadPlain,
    initialName: string
    initialMaxGP: number
    squadId: string
    hasCustomPortrait: boolean
    onSave: (name: string, maxGP: number) => void
    onCancel: () => void
  },
  ref
) {
  const [name, setName] = useState(initialName)
  const [maxGP, setMaxGP] = useState(initialMaxGP.toString())

  const [activeTab, setActiveTab] = useState<'details' | 'portrait'>('details')

  const [portraitFile, setPortraitFile] = useState<File | null>(null)
  const [portraitPreview, setPortraitPreview] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const [showDeleteConfirmPortrait, setShowDeletePortraitConfirm] = useState(false)

  useImperativeHandle(ref, () => ({
    handleSubmit: async () => {
      if (activeTab === 'details') {
        onSubmit(name, parseInt(maxGP))
      } else if (activeTab === 'portrait') {
        await handlePortraitSave()
      }
    }
  }))
  const handlePortraitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setPortraitFile(file)
    setUploadError(null)
    if (file) {
      setPortraitPreview(URL.createObjectURL(file))
    }
  }

  const handlePortraitSave = async () => {
    setUploadError(null)

    try {
      if (portraitFile) {
        const formData = new FormData()
        formData.append('type', 'squad')
        formData.append('squadId', squadId)
        formData.append('image', portraitFile)

        const res = await fetch(`/api/squads/${squadId}/portrait`, {
          method: 'POST',
          body: formData,
        })

        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || 'Upload failed')
        }

        toast.success('Portrait uploaded!')
        setPortraitFile(null)
        setPortraitPreview(null)

        squad.hasCustomPortrait = true
        squad.portraitUpdatedAt = new Date() // Update timestamp
        
        onCancel() // close modal
      }
    } catch (err: any) {
      setUploadError(err.message)
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
      squad.portraitUpdatedAt = new Date() // Update timestamp

      onCancel() // close modal
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
      {/* Tab Content */}
      {activeTab === 'details' && (
        <div className="space-y-1">
          <div className="grid grid-cols-[5rem_1fr] items-center gap-x-4">
            <Label htmlFor="squadName">Squad Name</Label>
            <Input
              id="squadName"
              value={name}
              autoCapitalize="words"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter squad name"
            />
          </div>
          <div className="grid grid-cols-[5rem_1fr] items-center gap-x-4 hidden">
            <Label htmlFor="maxGP">Max GP</Label>
            <Input
              id="maxGP"
              type="number"
              min="0"
              value={maxGP}
              onChange={(e) => setMaxGP(e.target.value)}
              placeholder="Enter max GP"
            />
          </div>
        </div>
      )}

      {activeTab === 'portrait' && (
        <div className="flex flex-col space-y-4">
          <div>
            <h5>New Portrait</h5>
            <p className="text-muted mb-2">
              Upload a portrait image for this squad.
              Images will be resized to 900x600 pixels.
            </p>
            <input
              type="file"
              accept="image/*"
              onChange={handlePortraitChange}
              className="mt-2"
            />
          </div>

          {portraitPreview && (
            <img
              src={portraitPreview}
              alt="Portrait Preview"
              className="rounded border border-border max-w-xs max-h-48 object-cover"
            />
          )}

          {uploadError && <p className="text-red-500">{uploadError}</p>}

          {hasCustomPortrait && (
            <>
              <hr/>
              <div className="flex justify-between items-center">
                <h5>Delete Portrait</h5>
                <Button onClick={() => setShowDeletePortraitConfirm(true)}>
                  <h6>Delete</h6>
                </Button>
              </div>
            </>
          )}
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
