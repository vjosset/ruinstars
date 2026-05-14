'use client'

import { showInfoModal } from '@/lib/utils/showInfoModal'
import { SpecialRule, parseSpecialRules } from '@/lib/utils/specialRules'
import { getUnitPortraitUrl, toEpochMs } from '@/lib/utils/imageUrls'
import { UnitPlain, UnitTypePlain } from '@/types'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { useEffect, useState } from 'react'
import type { Area } from 'react-easy-crop'
import { FiChevronDown } from 'react-icons/fi'
import { GiRollingDices } from 'react-icons/gi'
import { toast } from 'sonner'
import GearGroupList from '../shared/GearGroupList'
import PortraitCropper, { getCroppedBlob } from '../shared/PortraitCropper'
import WeaponTable from '../shared/WeaponTable'
import { Button, Input, Label } from '../ui'
import Modal from '../ui/Modal'

interface UnitEditorModalProps {
  isOpen: boolean
  unit?: UnitPlain
  squadId: string
  squadTypeId: string
  allSpecials: SpecialRule[]
  onClose: () => void
  onSave: (updatedUnit: UnitPlain) => void
}

export default function UnitEditorModal({
  isOpen,
  unit,
  squadId,
  squadTypeId,
  allSpecials,
  onClose,
  onSave,
}: UnitEditorModalProps) {
  const isEditMode = !!unit

  const [activeTab, setActiveTab] = useState<'details' | 'portrait'>('details')
  const [unitTypes, setUnitTypes] = useState<UnitTypePlain[]>([])
  const [unitTypeId, setUnitTypeId] = useState(unit?.unitTypeId || '')
  const [unitName, setUnitName] = useState(unit?.unitName || '')
  const [gearIds, setGearIds] = useState<string[]>(
    Array.isArray(unit?.gearIds)
      ? unit.gearIds
      : unit?.gearIds?.split(',').filter(Boolean) || []
  )
  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [showDeletePortraitConfirmation, setShowDeletePortraitConfirmation] = useState(false)

  const handlePortraitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setUploadError(null)
    if (!file) return
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image must be under 10 MB.')
      return
    }
    setRawImageSrc(URL.createObjectURL(file))
    setCroppedAreaPixels(null)
  }

  const selectedUnitType = unitTypes.find((ut) => ut.unitTypeId === unitTypeId)

  const [totalGPString, setTotalGPString] = useState('')

  const getEditUnitTotalGPString = () => {
    if (!selectedUnitType) return ''

    const unitTypeGP = selectedUnitType.GP || 0
    const gearGP = [...(selectedUnitType.weapons ?? []), ...(selectedUnitType.skills ?? [])]
      .filter(gear => gearIds.includes(gear.gearId))
      .reduce((sum, gear) => sum + (gear.GP || 0), 0)


    return unitTypeGP + (gearGP > 0 ? `+${gearGP}` : '')
  }

  // Add effect to update totalGP when selections change
  useEffect(() => {
    setTotalGPString(getEditUnitTotalGPString())
  }, [selectedUnitType, gearIds])

  // Handle loading times
  useEffect(() => {
    if (isOpen && squadTypeId) {
      fetch(`/api/squadTypes/${squadTypeId}`)
        .then((res) => res.json())
        .then((squadTypeData) => {
          setUnitTypes(squadTypeData.unitTypes)
          if (!isEditMode && squadTypeData.unitTypes.length > 0) {
            setUnitTypeId(squadTypeData.unitTypes[0].unitTypeId)
          }
        })
        .catch((err) => {
          console.error('Failed to load unitTypes:', err)
        })
    }
  }, [isOpen, squadTypeId, isEditMode])

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setUnitName('')
      setUnitTypeId('')
      setGearIds([])
      setRawImageSrc(null)
      setCroppedAreaPixels(null)
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
    try {
      if (activeTab === 'portrait') {
        if (!rawImageSrc || !croppedAreaPixels || !unit?.unitId) {
          throw new Error('No portrait selected')
        }

        setIsSaving(true)
        const blob = await getCroppedBlob(rawImageSrc, croppedAreaPixels)
        const formData = new FormData()
        formData.append('type', 'op')
        formData.append('squadId', squadId)
        formData.append('unitId', unit.unitId)
        formData.append('image', blob, 'portrait.jpg')

        const res = await fetch(`/api/units/${unit.unitId}/portrait`, {
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
        unit.hasCustomPortrait = true
        unit.portraitUpdatedAt = new Date()
        onClose()
      } else {
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
          onSave(result)
          onClose()
        } else {
          toast.error('Failed to save Unit')
        }
      }
    } catch (err: any) {
      setUploadError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  const saveDisabled = activeTab === 'portrait'
    ? !rawImageSrc || !croppedAreaPixels || isSaving
    : false

  if (!isOpen) return null

  return (
    <>
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
                    showInfoModal({
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
              <Button onClick={handleSubmit} disabled={saveDisabled}>
                <h6>{isEditMode ? 'Save' : 'Add Unit'}</h6>
              </Button>
            </div>
          </div>
        }
      >

        {/* Tab Bar */}
        {isEditMode && (
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
        )}

        {/* Tab Content - Details */}
        {activeTab === 'details' && (
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
                <Input
                  value={unitName}
                  autoCapitalize="words"
                  onChange={(e) => setUnitName(e.target.value)}
                  placeholder="Unit Name"
                  className="flex-1 my-2 px-2 bg-card border border-border rounded-l-md rounded-r-none appearance-none"
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
                <div className="text-sm">
                  <span className="flex items-center justify-center gap-1">
                    ACT
                    <h3 className="stat text-main">{selectedUnitType.ACT}</h3>
                  </span>
                </div>
                <div className="text-sm">
                  <span className="flex items-center justify-center gap-1">
                    ARM
                    <h3 className="stat text-main">{selectedUnitType.ARM}</h3>
                  </span>
                </div>
                <div className="text-sm">
                  <span className="flex items-center justify-center gap-1">
                    HIT
                    <h3 className="stat text-main">{selectedUnitType.HIT}</h3>
                  </span>
                </div>
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
        )}

        {/* Tab Content - Portrait */}
        {activeTab === 'portrait' && (
          <div className="flex flex-col space-y-4">

            {/* Existing portrait */}
            {unit?.hasCustomPortrait && !rawImageSrc && (
              <div className="flex flex-col space-y-2">
                <img
                  src={`${getUnitPortraitUrl(unit.unitId)}?v=${toEpochMs(unit.portraitUpdatedAt)}`}
                  alt="Current portrait"
                  className="rounded border border-border max-w-xs max-h-48 object-cover"
                />
                <Button
                  variant="ghost"
                  className="self-start text-red-500 border-red-500"
                  onClick={() => setShowDeletePortraitConfirmation(true)}
                >
                  <h6>Delete Portrait</h6>
                </Button>
              </div>
            )}

            {/* Upload / cropper section */}
            <div>
              <h5>{unit?.hasCustomPortrait ? 'Replace Portrait' : 'Upload Portrait'}</h5>
              <p className="text-muted mb-2">
                Upload a portrait image for this unit.
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
                  className="mb-2"
                />
              )}
            </div>

            {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
          </div>
        )}
      </Modal>

      {showDeletePortraitConfirmation && (
        <Modal
          key="deletePortraitConfirmation"
          title="Delete Portrait"
          onClose={() => setShowDeletePortraitConfirmation(false)}
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowDeletePortraitConfirmation(false)}>
                <h6>Cancel</h6>
              </Button>
              <Button
                onClick={async () => {
                  setShowDeletePortraitConfirmation(false)
                  if (!unit?.unitId) return
                  try {
                    const res = await fetch(`/api/units/${unit.unitId}/portrait`, {
                      method: 'DELETE'
                    })
                    if (!res.ok) {
                      const err = await res.json()
                      throw new Error(err.error || 'Failed to delete portrait')
                    }
                    setRawImageSrc(null)
                    setCroppedAreaPixels(null)
                    unit.hasCustomPortrait = false
                    unit.portraitUpdatedAt = new Date()
                    onSave({ ...unit, hasCustomPortrait: false })
                  } catch (err: any) {
                    setUploadError(err.message)
                  }
                }}
              >
                <h6>Delete</h6>
              </Button>
            </div>
          }>
          Are you sure you want to delete this unit's portrait? This action cannot be undone.
        </Modal>
      )}
    </>
  )
}
