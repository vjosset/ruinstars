'use client'

import { useModal } from '@/components/ui/ModalContext'
import { useLocalSettings } from '@/hooks/useLocalSettings'
import { SpecialRule, parseSpecialRules } from '@/lib/utils/specialRules'
import { UnitPlain, UnitTypePlain } from '@/types'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { GiRollingDices } from 'react-icons/gi'
import GearGroupList from '../shared/GearGroupList'
import WeaponTable from '../shared/WeaponTable'
import { Button, Label } from '../ui'
import Modal from '../ui/Modal'

interface UnitEditorModalProps {
  isOpen: boolean
  unit?: UnitPlain
  squadId: string
  factionId: string
  allSpecials: SpecialRule[]
  onClose: () => void
  onSave: (updatedUnit: UnitPlain) => void
}

export default function UnitEditorModal({
  isOpen,
  unit,
  squadId,
  factionId,
  allSpecials,
  onClose,
  onSave,
}: UnitEditorModalProps) {
  const isEditMode = !!unit

  const [unitTypes, setUnitTypes] = useState<UnitTypePlain[]>([])
  const [unitTypeId, setUnitTypeId] = useState(unit?.unitTypeId || '')
  const [unitName, setUnitName] = useState(unit?.unitName || '')
  const [gearIds, setGearIds] = useState<string[]>(
    Array.isArray(unit?.gearIds) 
      ? unit.gearIds 
      : unit?.gearIds?.split(',').filter(Boolean) || []
  )

  const selectedUnitType = unitTypes.find((ut) => ut.unitTypeId === unitTypeId)

  const { showModal } = useModal()

  const [totalGPString, setTotalGPString] = useState('')
  
  const getEditUnitTotalGPString = () => {
    if (!selectedUnitType) return ''
    
    const unitTypeGP = selectedUnitType.GP || 0
    const gearGP = [...(selectedUnitType.weapons ?? []), ...(selectedUnitType.skills ?? [])]
      .filter(gear => gearIds.includes(gear.gearId))
      .reduce((sum, gear) => sum + (gear.GP || 0), 0)
      
    
    return unitTypeGP + (gearGP > 0 ? `+${gearGP}` : '')
  }

  const { settings } = useLocalSettings()

  // Add effect to update totalGP when selections change
  useEffect(() => {
    setTotalGPString(getEditUnitTotalGPString())
  }, [selectedUnitType, gearIds])

  // Handle loading times
  useEffect(() => {
    if (isOpen && factionId) {
      fetch(`/api/factions/${factionId}`)
        .then((res) => res.json())
        .then((factionData) => {
          setUnitTypes(factionData.unitTypes)
          if (!isEditMode && factionData.unitTypes.length > 0) {
            setUnitTypeId(factionData.unitTypes[0].unitTypeId)
          }
        })
        .catch((err) => {
          console.error('Failed to load unitTypes:', err)
        })
    }
  }, [isOpen, factionId, isEditMode])

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setUnitName('')
      setUnitTypeId('')
      setGearIds([])
    }
  }, [isOpen])

  // Preselect default gears
  useEffect(() => {
    if (!isEditMode && selectedUnitType) {
      // Get all default gear IDs from weapons and skills
      const defaultGearIds = [
        ...(selectedUnitType.weapons ?? []),
        ...(selectedUnitType.skills ?? [])
      ]
        .filter(gear => gear.isDefault)
        .map(gear => gear.gearId)

      setGearIds(defaultGearIds)
    }
  }, [unitTypeId, isEditMode, selectedUnitType])

  const toggleGear = (gearId: string) => {
    setGearIds((prev) =>
      prev.includes(gearId)
        ? prev.filter((id) => id !== gearId)
        : [...prev, gearId]
    )
  }

  const handleSubmit = async () => {
    const payload = {
      squadId,
      unitName,
      unitTypeId,
      gearIds: gearIds?.join(',') || '',
      currHIT: unit ? unit.currHIT : selectedUnitType?.HIT
    }

    const method = isEditMode ? 'PATCH' : 'POST'
    const url = isEditMode ? `/api/units/${unit!.unitId}` : '/api/units'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      const result = await res.json()
      const updated = result // If PATCH, use the returned unit, else fallback
      onSave(updated)
      onClose()
    } else {
      alert('Failed to save unit')
    }
  }

  if (!isOpen) return null

  return (
    <Modal
      title={`${isEditMode ? unit.unitName : 'Add Unit'}`}
      onClose={onClose}
      footer={
        <div className="flex justify-between items-start text-muted">
          {/* Left side: total GP */}
          <div className="whitespace-nowrap">
            {selectedUnitType?.unitTypeName}
            {selectedUnitType?.special !== '' && (
              <span
                className="cursor-pointer hover:text-main"
                onClick={() => {
                  const parsed = parseSpecialRules(allSpecials, 'U', selectedUnitType?.special ?? '')
                  showModal({
                    title: selectedUnitType?.unitTypeName + ' - Special',
                    body: (
                      <div className="space-y-4">
                        {parsed.map((special, idx) => (
                          <div key={idx}>
                            <span className="font-semibold text-muted">
                              ({special.code}) {special.specialName}:
                            </span>
                            <p className="text-sm text-muted">{special.description}</p>
                          </div>
                        ))}
                      </div>
                    ),
                  })
                }}
              >
                {' '}
                ({selectedUnitType?.special})
              </span>
            )}
            { '  ' }
            <em>{totalGPString}GP</em>
          </div>

          {/* Right side: Buttons */}
          <div className="flex justify-end gap-2">
            <Button onClick={onClose} variant="ghost">
              <h6>Cancel</h6>
            </Button>
            <Button onClick={handleSubmit}>
              <h6>{isEditMode ? 'Save' : 'Add Unit'}</h6>
            </Button>
          </div>
        </div>
      }
    >
      {
        <div className="space-y-2">
          {!isEditMode &&
            <div className="grid grid-cols-[5rem_1fr] items-center gap-x-4">
              <Label>Unit Type</Label>
              <Listbox value={unitTypeId} onChange={setUnitTypeId}>
                <div className="relative">
                  <ListboxButton className="w-full p-1 border border-border rounded-md text-sm text-left flex justify-between items-center">
                    {selectedUnitType?.unitTypeName || 'Select Unit Type'} {selectedUnitType && ` (${selectedUnitType.GP}GP)`}
                    <FiChevronDown className="w-4 h-4 text-muted-foreground" />
                  </ListboxButton>

                  <ListboxOptions className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-card border border-border shadow-lg">
                    {unitTypes.map((ut) => (
                      <ListboxOption
                        key={ut.unitTypeId}
                        value={ut.unitTypeId}
                        className={({ active }) =>
                          `px-4 py-2 cursor-pointer z-50 ${
                            active ? 'text-main' : 'text-foreground'
                          }`
                        }
                      >
                        {({ selected }) => (
                          <div className={`flex ${selected ? 'text-main': ''}`}>
                            <span>{ut.unitTypeName}</span> {ut && ` (${ut.GP}GP)`}
                          </div>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
          }

          <div className="grid grid-cols-[5rem_1fr] items-center gap-x-4">
            <Label>Unit Name</Label>
            <div className="flex w-full">
              <input
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                placeholder="Unit Name"
                className="flex-1 my-2 px-2 bg-card border border-border rounded-l-md appearance-none"
              />
              <button
                type="button"
                className="my-2 w-9 h-9 flex items-center justify-center border border-border border-l-0 rounded-r-md bg-zinc-900 hover:bg-zinc-800"
                onClick={async () => {
                  try {
                    const res = await fetch(`/api/namegen/${selectedUnitType?.nameType}`)
                    if (!res.ok) throw new Error('Failed to fetch name')

                    const randomName = await res.text()
                    setUnitName(randomName)
                  } catch (err) {
                    setUnitName(selectedUnitType?.nameType ?? selectedUnitType?.unitTypeName ?? '')
                    console.error('Error getting random name:', err)
                  }
                }}
              >
                <GiRollingDices />
              </button>
            </div>
          </div>

          {/* Stats */}
          {selectedUnitType && (
            <div className="grid grid-cols-3 gap-1 my-3 text-center">
              <h5>ACT <span className="stat text-main text-3xl">{selectedUnitType.ACT}</span></h5>
              <h5>ARM <span className="stat text-main text-3xl">{selectedUnitType.ARM}</span></h5>
              <h5>HIT <span className="stat text-main text-3xl">{selectedUnitType.HIT}</span></h5>
            </div>
          )}

          {/* Gear, Weapons, Skills */}
          {selectedUnitType && (
            <>
              <div>
                <WeaponTable
                  weapons={selectedUnitType.weapons ?? []}
                  MSK={selectedUnitType.MSK}
                  RSK={selectedUnitType.RSK}
                  allSpecials={allSpecials}
                  selectedGearIds={gearIds}
                  onToggleGear={toggleGear}
                />
              </div>

              <div>
                <GearGroupList
                  gearList={(selectedUnitType.skills ?? []).map((g) => ({
                    ...g,
                    isSelected: gearIds.includes(g.gearId),
                    onClick: () => toggleGear(g.gearId),
                  }))}
                  selectedGearIds={gearIds}
                  showNarrative={true}
                  onToggleGear={toggleGear}
                />
              </div>
            </>
          )}
        </div>
      }
    </Modal>
  )
}
