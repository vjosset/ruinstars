'use client'

import { useState, useEffect } from 'react'
import { Modal, Button } from '../ui'
import { UnitPlain, Medal } from '@/types'

interface UnitMedalModalProps {
  isOpen: boolean
  unit: UnitPlain
  squadId: string
  factionId: string
  allMedals: Medal[]
  isOwner: boolean
  onClose: () => void
  onSave: (updatedUnit: UnitPlain) => void
}

export default function UnitMedalModal({
  isOpen,
  unit,
  squadId,
  allMedals,
  isOwner,
  onClose,
  onSave,
}: UnitMedalModalProps) {
  const [medalIds, setMedalIds] = useState<string[]>(
    Array.isArray(unit?.medalIds) 
      ? unit.medalIds 
      : unit?.medalIds?.split(',').filter(Boolean) || []
  )

  const [totalXP, setTotalXP] = useState(0)

  // Calculate total XP when medals change
  useEffect(() => {
    const xp = allMedals
      .filter(medal => medalIds.includes(medal.medalId))
      .reduce((sum, medal) => sum + medal.XP, 0)
    setTotalXP(xp)
  }, [medalIds, allMedals])

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setMedalIds([])
    }
  }, [isOpen])

  const toggleMedal = (medalId: string) => {
    setMedalIds(prev =>
      prev.includes(medalId)
        ? prev.filter(id => id !== medalId)
        : [...prev, medalId]
    )
  }

  const handleSubmit = async () => {
    const payload = {
      squadId,
      medalIds: medalIds.join(','),
    }

    const res = await fetch(`/api/units/${unit.unitId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      const updated = await res.json()
      onSave(updated)
      onClose()
    } else {
      alert('Failed to save medals')
    }
  }

  if (!isOpen) return null

  return (
    <Modal
      title={`Medals - ${unit.unitName || unit.unitType?.unitTypeName}`}
      onClose={onClose}
      footer={isOwner && (
        <div className="flex justify-between items-center">
          
            <div className="text-muted">
              Total XP: {totalXP}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" onClick={onClose}>
                <h6>Cancel</h6>
              </Button>
              <Button onClick={handleSubmit}>
                <h6>Save</h6>
              </Button>
            </div>
        </div>
      )}
    >
      <div className="space-y-1">
        {allMedals
          .filter(medal =>
            unit.medalIds?.split(',').includes(medal.medalId) || isOwner
          )
          .map((medal) => (
          <div 
            key={medal.medalId}
            className="flex items-start gap-2"
            onClick={(e) => {
                  if (isOwner) {
                    e.stopPropagation()
                   toggleMedal(medal.medalId)
                  }
                }}
          >
            {isOwner && (
              <input
                type="checkbox"
                checked={medalIds.includes(medal.medalId)}
                className="mt-1"
                // No onChange handler needed - click bubbles to parent div's onClick
              />
            )}
            <div>
              <div className="flex items-center gap-2">
                <h6 className="text-main">{medal.title}</h6>
                <span className="text-sm text-muted">({medal.XP} XP)</span>
              </div>
              <p className="text-sm text-muted">{medal.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}
