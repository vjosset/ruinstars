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

type UnitCardAltProps = {
  unit: UnitPlain | UnitTypePlain
  seq: number
  isOwner: boolean
  allSpecials: SpecialRule[]
  onUnitUpdated?: (u: UnitPlain) => void
  onMoveUp?: () => void
  onMoveFirst?: () => void
  onMoveDown?: () => void
  onMoveLast?: () => void
  onDelete?: (squadId: string) => void
  onUnitDeleted?: (id: string) => void
  onPortraitClick?: (id: string) => void
}

export default function UnitCardAlt({
  unit,
  seq,
  isOwner,
  allSpecials,
  onUnitUpdated,
  onMoveUp,
  onMoveFirst,
  onMoveDown,
  onMoveLast,
  onUnitDeleted,
  onPortraitClick
}: UnitCardAltProps) {
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

  const [newHIT, setNewHIT] = useState(unit.currHIT ?? 0)
  const [, setIsActivated] = useState(unit.isActivated ?? false)
  const [deleteError, setDeleteError] = useState('')

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
      onUnitUpdated?.(updated)
      setIsActivated(updated.isActivated)
      unit.isActivated = updated.isActivated
    }
  }

  const hasPortrait = !unit.isUnitType && unit.hasCustomPortrait

  return (
    <>
      <div className="bg-card border border-main p-1 rounded relative flex flex-col h-full unitcard">

        {/* Header row: name | menu */}
        <div className="flex items-center gap-1 pb-1 mb-1">
          {/* Checkbox + name */}
          <div className="flex items-center gap-1 flex-1 min-w-0">
            {!unit.isUnitType && isOwner && unit.currHIT !== 0 && (
              <Checkbox
                checked={!!unit.isActivated}
                onChange={toggleActivated}
                className="accent-primary flex-shrink-0 noprint"
              />
            )}
            <h5
              className={`font-heading truncate min-w-0 ${unit.currHIT === 0 ? 'text-muted' : 'text-main'} ${isOwner ? 'cursor-pointer' : ''}`}
              onClick={isOwner ? () => setShowUnitEditorModal(true) : undefined}
            >
              <span onClick={toggleActivated} className="mr-0.5">
                {unit.isUnitType ? '' : `${seq}. `}
              </span>
              {unit.unitName || unit.unitTypeName || unit.unitType?.unitTypeName || ''}
              {/* Icon reminders for Spoils Of War and Injuries */}
              {!unit.isUnitType && unit.gears?.some(gear => gear.gearId === 'INJ-DC') &&
                <GiDeathSkull className="inline ml-1 text-base text-muted" />
              }
              {!unit.isUnitType && unit.currHIT > 0 && unit.gears?.some(gear => gear.gearCategoryId === 'SOW') &&
                <FaMedal className="inline ml-1 text-base text-muted" />
              }
              {!unit.isUnitType && unit.currHIT > 0 && unit.gears?.some(gear => gear.gearCategoryId === 'INJ') &&
                <FaHeartPulse className="inline ml-1 text-base text-muted" />
              }
            </h5>
          </div>

          {/* GP (unit type view) or menu (owner view) */}
          <div className="flex-shrink-0 text-muted">
            {unit.isUnitType && <span className="text-sm">{unit.GP}GP</span>}
            {!unit.isUnitType && isOwner && (
              <Menu as="div" className="relative noprint">
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

        {/* Body: left stats column + right content */}
        <div className="flex gap-1 flex-1">
          {/* Left stats column */}
          <div className="flex flex-col gap-1 flex-shrink-0 w-20">
            <div className="grid grid-cols-[auto_auto_0fr] items-center gap-x-1 gap-y-1 px-2 py-1">
              {/* ACT */}
              <span className="text-xs text-muted">ACT</span>
              <h4 className={`stat text-${unit.isUnitType || (unit.currHIT > 0) ? 'main' : 'muted'} text-right`}>{unit.ACT}</h4>
              <span className="text-xs text-muted noprint invisible" data-note="Placeholder for alignment" />

              {/* ARM */}
              <span className="text-xs text-muted">ARM</span>
              <h4 className={`stat text-${unit.isUnitType || (unit.currHIT > 0) ? 'main' : 'muted'} text-right`}>{unit.ARM}</h4>
              <span className="text-xs text-muted noprint invisible" data-note="Placeholder for alignment" />

              {/* HIT */}
              <span className={`text-xs text-muted ${isOwner ? 'cursor-pointer' : ''}`} onClick={() => isOwner && setShowHITModal(true)}>HIT</span>
              <h4 className={`stat text-${unit.isUnitType || (unit.currHIT > 0) ? 'main' : 'muted'} text-right ${isOwner ? 'cursor-pointer' : ''}`} onClick={() => isOwner && setShowHITModal(true)}>
                {unit.isUnitType ? unit.HIT : unit.currHIT}
              </h4>
              {!unit.isUnitType && isOwner ? (
                <span className="text-xs text-muted noprint cursor-pointer" onClick={() => setShowHITModal(true)}>/{unit.HIT}</span>
              ) : (
                <span className="text-xs text-muted noprint invisible">/{unit.HIT}</span>
              )}
            </div>
            {/* Portrait */}
            {hasPortrait && (
              <div
                className="border border-border rounded-sm overflow-hidden cursor-pointer"
                style={{ width: '100%', height: 64 }}
                onClick={() => onPortraitClick && onPortraitClick(unit.unitId)}
              >
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: (!unit.isUnitType && unit.currHIT === 0) ? 'grayscale(1)' : 'none'
                  }}
                  src={`${getUnitPortraitUrl(unit.unitId)}?v=${toEpochMs(unit.portraitUpdatedAt)}`}
                />
              </div>
            )}
          </div>

          {/* Right content: weapons + gear/skills */}
          <div className="flex flex-col flex-1 min-w-0 gap-1 border border-border rounded-sm">
            {(unit.weapons?.length ?? 0) > 0 && (
              <WeaponTable weapons={unit.weapons ?? []} MSK={unit.MSK ?? 0} RSK={unit.RSK ?? 0} allSpecials={allSpecials} />
            )}

            {(unit.skills?.length ?? 0) > 0 && (
              <GearGroupList gearList={unit.skills ?? []} showNarrative={!unit.isUnitType} />
            )}
          </div>
        </div>

        {/* Print only - skill descriptions */}
        <div className="printonly overflow-y-hidden">
          {!unit.isUnitType && (unit.skills && unit.skills.length > 0) && (
            <div className="mt-2 text-sm">
              {unit.skills.map((skill) => (
                <Markdown key={`printskill_${skill.gearId}`}>
                  {`**${skill.gearName.replace('*', '')}${skill.ACT != null ? ` (${skill.ACT}ACT)` : ''}${skill.TO != null ? ` (${skill.TO}TO)` : ''}**: ${skill.description}`}
                </Markdown>
              ))}
            </div>
          )}
        </div>

        {(unit.isUnitType && unit?.description) && (
          <div className="flavor">
            <Markdown>{unit?.description}</Markdown>
          </div>
        )}

        {/* Footer */}
        {!unit.isUnitType && (
          <div className="mt-auto pt-0.5">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted">
                {unit?.unitType?.unitTypeName}
                {' '}
                {unit.unitType?.GP}{unit.totalGearGP > 0 ? '+' + unit.totalGearGP : ''}GP
                {false && (
                  <>
                    {' '}
                    <code className="text-xs">CalcGP: {calcGP(unit)}</code>
                  </>
                )}
              </div>
              <div className="text-right whitespace-nowrap">
                <span className="mx-2">
                  FV:{' '}
                  <span className="stat text-main">{forceValue}</span>
                </span>
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
            onUnitUpdated?.(updated)
            setShowUnitEditorModal(false)
          }}
        />
      )}

      {/* Unit Deletion Modal */}
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
            Are you sure you want to delete <strong>{unit.unitName === '' ? unit.unitTypeName : unit.unitName}</strong>?<br />
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
