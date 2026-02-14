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

  const forceValue = unit.isUnitType ? null :
    Math.round(
      ((unit?.totalGearGP + (unit?.unitType?.GP || 0.0)) / 100.0)
      * 10.0
    )
    + Math.floor(unit.totalMedalXP / 5)

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
      <div className="bg-card border border-main p-1 rounded relative flex flex-col h-full unitcard">
        <div className={'grid grid-cols-4 gap-1 text-center'}>
          {!unit.isUnitType && unit.hasCustomPortrait && (
            <div className="cursor-pointer col-span-1 border border-muted/50 rounded-md" style={{maxHeight: '100%', maxWidth: '100%', overflow: 'hidden'}} onClick={() => onPortraitClick && onPortraitClick(unit.unitId)}>
              <img
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: (!unit.isUnitType && (unit.currHIT === 0)) ? 'grayscale(1)' : 'none' }}
                src={`${getUnitPortraitUrl(unit.unitId)}?v=${toEpochMs(unit.portraitUpdatedAt)}`}
              />
            </div>
          )}
          <div className={(!unit.isUnitType && unit.hasCustomPortrait) ? 'col-span-3' : 'col-span-4'}>
            {/* Name and Type */}
            <div className="flex justify-between">
              <div className="flex justify-between gap-x-2">
                {!unit.isUnitType && isOwner && unit.currHIT !== 0 && (
                  <Checkbox
                    checked={!!unit.isActivated}
                    onChange={toggleActivated}
                    className="accent-primary mb-1.5 noprint"
                  />
                )}
                <h5 className={`font-heading ${unit.currHIT === 0 ? 'text-muted' : 'text-main'} ${isOwner ? 'cursor-pointer' : ''}`}>
                  <div className="flex items-center gap-1">
                    <span onClick={toggleActivated}>
                      {unit.isUnitType ? '' : `${seq}. `}
                    </span>
                    <span className="flex items-center gap-1" onClick={isOwner ? () => setShowUnitEditorModal(true) : () => {}}>
                      {unit.unitName || unit.unitTypeName || unit.unitType?.unitTypeName || ''}
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
                  </div>
                </h5>
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
            <div className="grid grid-cols-3 gap-1 text-center">
              <div className="text-sm">
                <span className="flex items-center justify-center gap-1">
                  {/*<RiFlashlightFill className="text-xl" />*/}
                  ACT
                  <h3 className="stat text-main">{unit.ACT}</h3>
                </span>
              </div>
              {/*}
              <div className="text-xs">
                MSK<br/>
                <span className="flex items-center justify-center gap-1">
                  <RiSwordFill className="text-xl" />
                  <h5 className="stat text-main">{unit.MSK}</h5>
                </span>
              </div>
              <div className="text-xs">
                RSK<br/>
                <span className="flex items-center justify-center gap-1">
                  <RiCrosshair2Fill className="text-xl" />
                  <h5 className="stat text-main">{unit.RSK}</h5>
                </span>
              </div>
              */}
              <div className="text-sm">
                <span className="flex items-center justify-center gap-1">
                  {/*<RiShieldFill className="text-lg" />*/}
                  ARM
                  <h3 className="stat text-main">{unit.ARM}</h3>
                </span>
              </div>
              <div className={`text-sm ${isOwner ? 'cursor-pointer' : ''}`} onClick={() => isOwner && setShowHITModal(true)}>
                <span className="flex items-center justify-center gap-1">
                  {/*<RiHeartFill className="text-xl" />*/}
                  HIT
                  <h3 className="stat text-main">{unit.isUnitType ? unit.HIT : unit.currHIT}</h3>
                  {!unit.isUnitType && <h6 className="stat text-muted noprint">/{unit.HIT}</h6>}
                </span>
              </div>
            </div>
          </div>
        </div>

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
        </div>

        {(unit.isUnitType && unit?.description) && (
          <div className="flavor">
            <Markdown>
              {unit?.description}
            </Markdown>
          </div>
        )}

        {/* Footer */}
        {/* Note we hide this for UnitType cards since we moved all Unit specials to Abilities for clarity */}
        {!unit.isUnitType && (
          <div className="border-t border-border mt-auto">
            <div className="flex justify-between items-center">
              <div className="text-sm">
                {/* // OLD UNIT SPECIALS - NOT IN USE
                {unit.special !== '' && (
                  <span
                    className="italic cursor-pointer hover:text-main text-muted hastip"
                    onClick={() => {
                      const parsed = parseSpecialRules(allSpecials, 'U', unit.special ?? '')
                      showInfoModal({
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
                */}
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
              {!unit.isUnitType && (
                <div className="text-right whitespace-nowrap">
                  <span className="stat mx-2">
                    FV:{ ' ' }
                    <span className="stat text-main">{forceValue}</span>
                  </span>
                  {/*
                  <span className="stat mx-2 cursor-pointer hover:text-main" onClick={() => (isOwner || unit.totalMedalXP > 0) && setShowUnitMedalModal(true)}>
                    <FaMedal className="inline-block h-3 w-3" />{ ' ' }
                    XP:{ ' ' }
                    <span className="stat text-main">{unit.totalMedalXP}</span>
                  </span>
                  */}
                </div>
              )}
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
