'use client'

import { getUnitPortraitUrl, toEpochMs } from '@/lib/utils/imageUrls'
import { SpecialRule } from '@/lib/utils/specialRules'
import { calcGP } from '@/lib/utils/utils'
import GearGroupList from '@/src/components/shared/GearGroupList'
import WeaponTable from '@/src/components/shared/WeaponTable'
import { UnitPlain, UnitTypePlain } from '@/types'
import { Menu, MenuButton } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { FaHeartPulse, FaMedal } from 'react-icons/fa6'
import { FiMoreVertical } from 'react-icons/fi'
import { GiDeathSkull } from 'react-icons/gi'
import { toast } from 'sonner'
import { Button, Checkbox, Modal } from '../ui'
import Markdown from '../ui/Markdown'
import UnitCardMenu from './UnitCardMenu'
import UnitEditorModal from './UnitEditorModal'

type UnitCardProps = {
  unit: UnitPlain | UnitTypePlain
  seq: number
  isOwner: boolean
  allSpecials: SpecialRule[]
  showUnitType?: boolean
  onUnitUpdated?: (u: UnitPlain) => void
  onMoveUp?: () => void
  onMoveFirst?: () => void
  onMoveDown?: () => void
  onMoveLast?: () => void
  onDelete?: (squadId: string) => void
  onUnitDeleted?: (id: string) => void
  onPortraitClick?: (id: string) => void
}

export default function UnitCard({
  unit,
  seq,
  isOwner,
  allSpecials,
  showUnitType = true,
  onUnitUpdated,
  onMoveUp,
  onMoveFirst,
  onMoveDown,
  onMoveLast,
  onUnitDeleted,
  onPortraitClick
}: UnitCardProps) {
  // Modal visibility states
  const [showHITModal, setShowHITModal] = useState(false)
  const [showUnitEditorModal, setShowUnitEditorModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const spoilCount = unit.isUnitType
    ? 0
    : (unit.gears?.filter((gear) => gear.gearCategoryId === 'SOW').length ?? 0)

  const forceValue = unit.isUnitType ? null :
    Math.round(
      ((unit?.totalGearGP + (unit?.unitType?.GP || 0.0)) / 100.0)
      * 10.0
    )
    + spoilCount

  // Unit state tracking
  const [newHIT, setNewHIT] = useState(unit.currHIT ?? 0)
  const [, setIsActivated] = useState(unit.isActivated ?? false)
  
  // Delete state
  const [deleteError, setDeleteError] = useState('')

  // Keep local state in sync with unit props
  useEffect(() => {
    setIsActivated(unit.isActivated ?? false)
  }, [unit.isActivated])

  useEffect(() => {
    setNewHIT(unit.currHIT ?? 0)
  }, [unit.currHIT])

  const toggleActivated = async () => {
    if (!isOwner || unit.isUnitType || unit.currHIT === 0) return

    const res = await fetch(`/api/units/${unit.unitId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActivated: !unit.isActivated }),
    })

    if (!res.ok) {
      toast.error('Failed to save Unit activation')
    } else {
      const updated = await res.json()
      // Inform the parent about the new activated state
      onUnitUpdated?.(updated)
      setIsActivated(updated.isActivated)
      unit.isActivated = updated.isActivated
    }
  }

  return (
    <>
      <div className="bg-card border border-border border-l-2 border-l-main rounded relative flex flex-col h-full unitcard mx-1">
        <div className={'grid grid-cols-12 gap-0 text-center'}>
          {!unit.isUnitType && unit.hasCustomPortrait && (
            <div className="cursor-pointer col-span-3 overflow-hidden rounded-tl" onClick={() => onPortraitClick && onPortraitClick(unit.unitId)}>
              <img
                className="fade-right-bottom"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: (!unit.isUnitType && (unit.currHIT === 0)) ? 'grayscale(1)' : 'none' }}
                src={`${getUnitPortraitUrl(unit.unitId)}?v=${toEpochMs(unit.portraitUpdatedAt)}`}
              />
            </div>
          )}
          <div className={`${(!unit.isUnitType && unit.hasCustomPortrait) ? 'col-span-9' : 'col-span-12'} p-1`}>
            {/* Name and Type */}
            <div className="flex justify-between">
              <div className="flex justify-between gap-x-2 min-w-0">
                {!unit.isUnitType && isOwner && unit.currHIT !== 0 && (
                  <Checkbox
                    checked={!!unit.isActivated}
                    onChange={toggleActivated}
                    className="accent-primary mb-1.5 noprint flex-shrink-0"
                  />
                )}
                <h4 className={`font-heading truncate ${unit.currHIT === 0 ? 'text-muted' : 'text-main'} ${isOwner ? 'cursor-pointer' : ''}`}>
                  <span className="flex items-center gap-1 min-w-0 overflow-hidden">
                    <span className="flex-shrink-0" onClick={toggleActivated}>
                      {unit.isUnitType ? '' : `${seq}. `}
                    </span>
                    <span className="flex items-center gap-1 min-w-0" onClick={isOwner ? () => setShowUnitEditorModal(true) : () => {}}>
                      <span className="truncate">{unit.unitName || unit.unitTypeName || unit.unitType?.unitTypeName || ''}</span>
                      {/* Icon reminders for Spoils Of War and Injuries */}
                      {!unit.isUnitType && unit.gears?.some(gear => gear.gearId === 'INJ-DC') &&
                        <GiDeathSkull className="text-base text-muted" /> 
                      }
                      {!unit.isUnitType && unit.currHIT > 0 && unit.gears?.some(gear => gear.gearCategoryId === 'SOW') &&
                        <FaMedal className="text-base text-muted" />
                      }
                      {!unit.isUnitType && unit.currHIT > 0 && unit.gears?.some(gear => gear.gearCategoryId === 'INJ') &&
                        <FaHeartPulse className="text-base text-muted" /> 
                      }
                    </span>
                  </span>
                </h4>
              </div>
              <div className="text-muted mb-1">
                {unit.isUnitType && <>{unit.GP}GP</>}
                {/* Action menu */}
                {!unit.isUnitType && isOwner && (
                  <Menu as="div" className="relative flex-shrink-0 noprint">
                    <MenuButton as="button" className="p-1">
                      <FiMoreVertical className="w-5 h-5" />
                    </MenuButton>
                    <UnitCardMenu
                      onEdit={() => setShowUnitEditorModal(true)}
                      onDelete={() => setShowDeleteConfirm(true)}
                      onMoveUp={onMoveUp}
                      onMoveDown={onMoveDown}
                      onMoveFirst={onMoveFirst}
                      onMoveLast={onMoveLast}
                    />
                  </Menu>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-2 justify-center">
              <div className="statbox">
                <span className="statbox-label">ACT</span>
                <h4 className={`statbox-value ${unit.currHIT === 0 ? 'text-muted' : 'text-main'}`}>{unit.ACT}</h4>
              </div>
              <div className="statbox">
                <span className="statbox-label">ARM</span>
                <h4 className={`statbox-value ${unit.currHIT === 0 ? 'text-muted' : 'text-main'}`}>{unit.ARM}</h4>
              </div>
              <div className={`statbox ${isOwner ? 'cursor-pointer hover:border-main transition' : ''}`} onClick={() => isOwner && setShowHITModal(true)}>
                <span className="statbox-label">HIT</span>
                <h4 className={`statbox-value ${unit.currHIT === 0 ? 'text-muted' : 'text-main'} flex items-baseline gap-0.5`}>
                  {unit.isUnitType ? unit.HIT : unit.currHIT}
                  {!unit.isUnitType && <span className="stat text-muted text-xs leading-none noprint">/{unit.HIT}</span>}
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="p-1">
          {/* Weapons */}
          {(unit.weapons?.length ?? 0) > 0 && unit.currHIT !== 0 && (
            <WeaponTable weapons={unit.weapons ?? []} MSK={unit.MSK ?? 0} RSK={unit.RSK ?? 0} allSpecials={allSpecials} />
          )}

          {/* Skills */}
          {(unit.skills?.length ?? 0) > 0 && unit.currHIT !== 0 && (
            <GearGroupList gearList={unit.skills ?? []} showNarrative={!unit.isUnitType} />
          )}

          {/* Print only - Additional info */}
          <div className="printonly border-t border-border overflow-y-hidden">
            {!unit.isUnitType && (unit.skills && unit.skills.length > 0) && (
              <>
                <div className="mt-2 text-sm">
                  {unit.skills.map((skill) => (
                    <Markdown key={`printskill_${skill.gearId}`}>
                      {`**${skill.gearName.replace('*', '')}${skill.ACT != null ? ` (${skill.ACT}ACT)` : ''}${skill.TO != null ? ` (${skill.TO}TO)` : ''}**: ${skill.description}`}
                    </Markdown>
                  ))}
                </div>
              </>
            )}

            {(unit.isUnitType && unit?.description) && (
              <div className="flavor">
                <Markdown>
                  {unit?.description}
                </Markdown>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {/* Note we hide this for UnitType cards */}
        {!unit.isUnitType && showUnitType && (
          <div className="border-t border-border mt-auto p-1">
            <div className="flex justify-between items-center">
              <div className="text-sm">
                {!unit.isUnitType && (
                  <div className="text-muted">
                    {unit?.unitType?.unitTypeName}
                    { ' ' }
                    {unit.unitType?.GP}{unit.totalGearGP > 0 ? '+' + unit.totalGearGP : ''}GP
                    {false && (
                      <>
                        { ' ' }
                        <code className="text-xs">
                        CalcGP: {calcGP(unit)}
                        </code>
                      </>
                    )}
                  </div>
                )}
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
          squadTypeId={unit.unitType?.squadTypeId ?? ''}
          unit={unit}
          onClose={() => setShowUnitEditorModal(false)}
          allSpecials={allSpecials}
          onSave={(updated) => {
            onUnitUpdated?.(updated) // 💡 call back to parent
            setShowUnitEditorModal(false)
          }}
        />
      )}

      {/* Unit Deletion Modal*/}
      {showDeleteConfirm && 
        <Modal
          title={`Delete ${unit.unitName === '' ? unit.unitTypeName : unit.unitName}`}
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
                      console.error('No unitId defined - cannot delete.')
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
                    toast.error('Could not delete Unit')
                  }
                }}
              >
                <h6>Delete</h6>
              </Button>
            </div>
          }
        >
          <p className="text-sm text-foreground">
            Are you sure you want to delete <strong>{unit.unitName === '' ? unit.unitTypeName : unit.unitName}</strong>?<br/>
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
