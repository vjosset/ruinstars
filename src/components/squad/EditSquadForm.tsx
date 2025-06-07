'use client'

import { Input, Label } from '@/components/ui'
import { forwardRef, useImperativeHandle, useState } from 'react'

export interface EditSquadFormRef {
  handleSubmit: () => void
}

const EditSquadForm = forwardRef(function EditSquadForm(
  {
    initialName,
    initialMaxGP,
    onSubmit,
    onCancel,
  }: {
    initialName: string
    initialMaxGP: number
    onSubmit: (name: string, maxGP: number) => void
    onCancel: () => void
  },
  ref
) {
  const [name, setName] = useState(initialName)
  const [maxGP, setMaxGP] = useState(initialMaxGP.toString())

  // Add useImperativeHandle to expose handleSubmit
  useImperativeHandle(ref, () => ({
    handleSubmit: () => onSubmit(name, parseInt(maxGP))
  }))

  return (
    <div className="space-y-1">
      <div className="grid grid-cols-[5rem_1fr] items-center gap-x-4">
        <Label htmlFor="squadName">Squad Name</Label>
        <Input
          id="squadName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter squad name"
        />
      </div>
      <div className="grid grid-cols-[5rem_1fr] items-center gap-x-4">
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
  )
})

export default EditSquadForm
