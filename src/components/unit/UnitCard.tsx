'use client'

import { useModal } from '@/components/ui/ModalContext'
import { useLocalSettings } from '@/hooks/useLocalSettings'
import { parseSpecialRules, SpecialRule } from '@/lib/utils/specialRules'
import GearGroupList from '@/src/components/shared/GearGroupList'
import WeaponTable from '@/src/components/shared/WeaponTable'
import { Medal, UnitPlain, UnitTypePlain } from '@/types'
import { useEffect, useState } from 'react'
import { Button, Checkbox, Modal } from '../ui'
import UnitCardMenu from './UnitCardMenu'
import UnitEditorModal from './UnitEditorModal'
import UnitMedalModal from './UnitMedalModal'

type UnitCardProps = {
  unit: UnitPlain | UnitTypePlain
  seq: Number
  isOwner: boolean
  allSpecials: SpecialRule[]
  allMedals: Medal[]
  onUnitUpdated?: (u: UnitPlain) => void
  onMoveUp?: () => void
  onMoveFirst?: () => void
  onMoveDown?: () => void
  onMoveLast?: () => void
  onDelete?: (squadId: string) => void
  onUnitDeleted?: (id: string) => void
}

export default function UnitCard({
  unit,
  seq,
  isOwner,
  allSpecials,
  allMedals,
  onUnitUpdated,
  onMoveUp,
  onMoveFirst,
  onMoveDown,
  onMoveLast,
  onUnitDeleted
}: UnitCardProps) {
  // Modal visibility states
  const [showHITModal, setShowHITModal] = useState(false)
  const [showUnitEditorModal, setShowUnitEditorModal] = useState(false)
  const [showUnitMedalModal, setShowUnitMedalModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  // Unit state tracking
  const [newHIT, setNewHIT] = useState(unit.currHIT ?? 0)
  const [, setIsActivated] = useState(unit.isActivated ?? false)
  
  // Delete state
  const [deleteError, setDeleteError] = useState('')
  
  const { settings } = useLocalSettings()
  const { showModal } = useModal()

  // Keep local state in sync with unit props
  useEffect(() => {
    setIsActivated(unit.isActivated ?? false)
  }, [unit.isActivated])

  useEffect(() => {
    setNewHIT(unit.currHIT ?? 0)
  }, [unit.currHIT])

  return (
    <>
      <div className="bg-card border border-main p-1 rounded shadow-inner backdrop-blur relative flex flex-col h-full">
        {/* Name and Type */}
        <div className="flex justify-between">
          <div className="flex justify-between gap-x-2">
            {!unit.isUnitType && isOwner && unit.currHIT !== 0 && (
              <Checkbox
                checked={!!unit.isActivated}
                onChange={async (e) => {
                  const res = await fetch(`/api/units/${unit.unitId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ isActivated: !!e.target.checked }),
                  })

                  if (!res.ok) {
                    alert('Failed to update unit activation')
                  } else {
                    const updated = await res.json()
                    // Inform the parent about the new activated state
                    onUnitUpdated?.(updated)
                    setIsActivated(updated.isActivated)
                    unit.isActivated = updated.isActivated
                  }
                }}
                className="accent-primary w-4 h-4 mt-2"
              />
            )}
            <h4 className={`font-heading ${unit.currHIT === 0 ? 'text-muted' : 'text-main'} ${isOwner ? 'cursor-pointer' : ''}`}>
              <div onClick={isOwner ? () => setShowUnitEditorModal(true) : () => {}}>
                {unit.isUnitType ? '' : `${seq}. `}{unit.unitName || unit.unitTypeName || unit.unitType?.unitTypeName || ''}
              </div>
            </h4>
          </div>
          <div className="text-muted mb-1">
            {unit.isUnitType && <>{unit.GP}GP</>}
            {/* Action menu */}
            {!unit.isUnitType && isOwner && (
              <UnitCardMenu
                onEdit={() => setShowUnitEditorModal(true)}
                onDelete={() => setShowDeleteConfirm(true)}
                onMoveUp={onMoveUp}
                onMoveDown={onMoveDown}
                onMoveFirst={onMoveFirst}
                onMoveLast={onMoveLast}
              />
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-1 text-center">
          <h5>ACT <span className="stat text-main text-3xl">{unit.ACT}</span></h5>
          <h5>ARM <span className="stat text-main text-3xl">{unit.ARM}</span></h5>
          {unit.isUnitType ? (
            <h5>HIT <span className="stat text-main text-3xl">{unit.HIT}</span></h5>
          ) : (
            <h5 className="cursor-pointer" onClick={() => isOwner && setShowHITModal(true)}>
              HIT
              { ' ' }
              <span className="stat text-main text-3xl">{unit.currHIT}</span>
              <span className="stat text">/{unit.HIT}</span>
            </h5>
          )}
        </div>

        {/* Weapons */}
        {(unit.weapons?.length ?? 0) > 0 && unit.currHIT !== 0 && (
          <WeaponTable weapons={unit.weapons ?? []} MSK={unit.MSK ?? 0} RSK={unit.RSK ?? 0} allSpecials={allSpecials} />
        )}

        {/* Skills */}
        {(unit.skills?.length ?? 0) > 0 && unit.currHIT !== 0 && (
          <GearGroupList gearList={unit.skills ?? []} showNarrative={settings.showNarrative} />
        )}

        {/* Footer */}
        {(
          <div className="border-t border-border mt-auto">
            <div className="flex justify-between items-start">
              <div>
                {unit?.unitType?.unitTypeName}
                {unit.special !== '' && (
                  <span
                    className="italic cursor-pointer hover:text-main text-muted hastip"
                    onClick={() => {
                      const parsed = parseSpecialRules(allSpecials, 'U', unit.special ?? '')
                      showModal({
                        title: unit.unitName ?? unit.unitTypeName + ' - Special',
                        body: (
                          <div className="space-y-4">
                            {parsed.map((rule, idx) => (
                              <div key={idx}>
                                <span className="font-semibold text-muted">({rule.code}) {rule.specialName}:</span>
                                <p className="text-sm text-muted">{rule.description}</p>
                              </div>
                            ))}
                          </div>
                        ),
                      })
                    }}
                  > { ' ' }
                    ({unit.special}){ ' ' }
                  </span>
                )}
                {!unit.isUnitType && <span>
                  <span className="text-muted">
                    { ' ' }
                    {unit.unitType?.GP}{unit.totalGearGP > 0 ? '+' + unit.totalGearGP : ''}GP
                  </span>
                </span>}
              </div>
              <div className="text-right whitespace-nowrap">
                {!unit.isUnitType && <span onClick={() => (isOwner || unit.totalMedalXP > 0) && setShowUnitMedalModal(true)}>
                  {unit.totalMedalXP} XP
                </span>}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* HIT Modal */}
      {showHITModal && (
        <Modal title={unit.unitName || unit.unitTypeName || ''} onClose={() => setShowHITModal(false)}>
          <div className="flex gap-1">
            {Array.from({ length: (unit.HIT ?? 0) + 1 }, (_, i) => (
              <Button
                key={i}
                variant={newHIT === i ? 'highlighted' : 'ghost'}
                className="flex-1 py-2 rounded text-xl flex items-center justify-center stat"
                onClick={async () => {
                  const res = await fetch(`/api/units/${unit.unitId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ currHIT: i }),
                  })

                  if (res.ok) {
                    const updated = await res.json()
                    setNewHIT(updated.currHIT)
                    unit.currHIT = updated.currHIT
                    setShowHITModal(false)
                  } else {
                    console.error('Failed to update HIT')
                  }
                }}
              >
                <span className="stat">{i}</span>
              </Button>
            ))}
          </div>
        </Modal>
      )}

      {/* Editor Modal */}
      {showUnitEditorModal && !unit.isUnitType && (
        <UnitEditorModal
          key="editor-modal"
          isOpen={true}
          squadId={unit.squadId || ''}
          factionId={unit.unitType?.factionId ?? ''}
          unit={unit}
          onClose={() => setShowUnitEditorModal(false)}
          allSpecials={allSpecials}
          onSave={(updated) => {
            onUnitUpdated?.(updated) // 💡 call back to parent
            setShowUnitEditorModal(false)
          }}
        />
      )}

      {/* Medal Modal */}
      {showUnitMedalModal && !unit.isUnitType && (
        <UnitMedalModal
          key="editor-modal"
          isOpen={true}
          squadId={unit.squadId || ''}
          factionId={unit.unitType?.factionId ?? ''}
          unit={unit}
          onClose={() => setShowUnitMedalModal(false)}
          allMedals={allMedals}
          isOwner={isOwner}
          onSave={(updated) => {
            onUnitUpdated?.(updated) // 💡 call back to parent
            setShowUnitMedalModal(false)
          }}
        />
      )}

      {/* Unit Deletion Modal*/}
      {showDeleteConfirm && 
        <Modal
          title={`Delete ${unit.unitName == '' ? unit.unitTypeName : unit.unitName}`}
          onClose={() => setShowDeleteConfirm(false)}
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>
                <h6>Cancel</h6>
              </Button>
              <Button
                onClick={async () => {
                  setDeleteError('')
                
                  try {
                    if (!unit.unitId) {
                      console.error('No unitId defined — cannot delete.')
                      return
                    }

                    const res = await fetch(`/api/units/${unit.unitId}`, { method: 'DELETE' })
                
                    if (!res.ok) {
                      const body = await res.json().catch(() => ({}))
                      throw new Error(body.message || 'Failed to delete unit')
                    }

                    onUnitDeleted?.(unit.unitId)
                    setShowDeleteConfirm(false)
                  } catch (err: any) {
                    setDeleteError(err.message || 'Something went wrong')
                  }
                }}
              >
                <h6>Delete</h6>
              </Button>
            </div>
          }
        >
          <p className="text-sm text-foreground">
            Are you sure you want to delete <strong>{unit.unitName == '' ? unit.unitTypeName : unit.unitName}</strong>?<br/>
            This cannot be undone.
          </p>

          {deleteError && (
            <p className="text-sm text-destructive">{deleteError}</p>
          )}
        </Modal>
      }
    </>
  )
}
