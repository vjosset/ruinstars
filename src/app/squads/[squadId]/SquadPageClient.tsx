'use client'

import { SquadTypeLink, UserLink } from '@/components/nav/Links'
import EditSquadForm from '@/components/squad/EditSquadForm'
import SquadCardMenu from '@/components/squad/SquadCardMenu'
import SquadTools from '@/components/squad/SquadTools'
import { Button, Modal } from '@/components/ui'
import CarouselModal, { CarouselItem } from '@/components/ui/CarouselModal'
import PageTitle from '@/components/ui/PageTitle'
import AddUnitForm from '@/components/unit/AddUnitForm'
import UnitCard from '@/components/unit/UnitCard'
import { getSquadPortraitUrl, getUnitPortraitUrl, toEpochMs } from '@/lib/utils/imageUrls'
import { SpecialRule } from '@/lib/utils/specialRules'
import { FactionPlain, Medal, SquadPlain, UnitPlain } from '@/types'
import { Menu, MenuButton } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FiDownload, FiEdit2, FiMoreVertical } from 'react-icons/fi'
import { toast } from 'sonner'

export default function SquadPageClient({
  initialSquad,
  isOwner,
  factions,
}: {
  initialSquad: SquadPlain
  isOwner: boolean
  factions: FactionPlain[]
}) {
  const router = useRouter()
  const { status } = useSession()

  const [units, setUnits] = useState<UnitPlain[]>(initialSquad.units ?? [])
  const [squad, setSquad] = useState(initialSquad)
  const [allSpecials, setSpecials] = useState<SpecialRule[] | null>(null)
  const [allMedals, setMedals] = useState<Medal[] | null>(null)
  const formRef = useRef<{ handleSubmit: () => void }>(null)
  const [showResetModal, setShowResetModal] = useState<Boolean>(false)
  const [showEditSquadModal, setShowEditSquadModal] = useState<Boolean>(false)
  const [showSquadTools, setShowSquadTools] = useState<Boolean>(false)
  const [carouselIsOpen, setCarouselIsOpen] = useState(false)
  const [carouselStartIndex, setCarouselStartIndex] = useState(0)

  useEffect(() => {
    fetch('/api/specials')
      .then(res => res.json())
      .then(data => setSpecials(data))
      .catch(err => console.error('Failed to fetch specials', err))
    
    fetch('/api/medals')
      .then(res => res.json())
      .then(data => setMedals(data))
      .catch(err => console.error('Failed to fetch medals', err))
  }, [])

  useEffect(() => {
    setUnits(squad.units ?? [])
  }, [squad.units])

  const updateUnit = (updated: UnitPlain) => {
    setUnits(prev =>
      prev.map(u => (u.unitId === updated.unitId ? updated : u))
    )
  }
  
  // For printing - Get unit unique abilities and options
  //const squadSkills = getSquadRepeatedSkills(squad ?? undefined)

  const openCarousel = () => {
    console.log('Opening carousel')
    setCarouselIsOpen(true)
  }

  const closeCarousel = () => {
    console.log('Closing carousel')
    setCarouselIsOpen(false)
  }
  
  const carouselItems: CarouselItem[] = []
  if (squad.hasCustomPortrait) {
    carouselItems.push({title: squad.squadName, imageUrl: `${getSquadPortraitUrl(squad.squadId)}?v=${toEpochMs(squad.portraitUpdatedAt)}` })
  }
  squad.units?.filter(unit => unit.hasCustomPortrait).map(unit => unit.hasCustomPortrait && carouselItems.push({title: unit.unitName, imageUrl: `${getUnitPortraitUrl(unit.unitId)}?v=${toEpochMs(unit.portraitUpdatedAt)}`}))

  const handlePortraitClick = (clickedUrl: string) => {
    const index = carouselItems.findIndex(item => item.imageUrl === clickedUrl)
    console.log('  Found at index', index)
    if (index >= 0) {
      setCarouselStartIndex(index)
      openCarousel()
    }
  }

  const deleteUnit = async(unitId: string) => {
    // Remove the unit locally from the array
    const updatedUnits = units.filter(u => u.unitId !== unitId)

    // Update local state
    setUnits(updatedUnits)

    // Update unit Seqs so they stay sequential and in order
    await updateUnitSeqs(updatedUnits)
  }

  const addUnit = async(newUnit: UnitPlain) => {
    const updatedUnits = [...units, newUnit]
    setUnits(updatedUnits)
    await updateUnitSeqs(updatedUnits)
  }

  const updateSquadField = async (field: string, value: number) => {
    if (value < 0) return
    if (value < 1 && field == 'turn') return

    const patch: Partial<typeof squad> = { [field]: value }

    // Note the API/service will handle resetting unit activation on turn increase
    const res = await fetch(`/api/squads/${squad.squadId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    })
  
    if (res.ok) {
      const updated = await res.json()
      setSquad(updated)
    } else {
      console.error('Failed to update squad field:', field)
    }
  }
  
  const updateSquadInfo = async (name: string, maxGP: number) => {
    const res = await fetch(`/api/squads/${squad.squadId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        squadName: name,
        maxGP: maxGP 
      }),
    })

    if (res.ok) {
      const updated = await res.json()
      setSquad(updated)
      setShowEditSquadModal(false)
    } else {
      console.error('Failed to update squad info')
      toast.error('Failed to save')
    }
  }
  
  const handleResetClick = () => { setShowResetModal(true)}
  const handleEditSquadClick = () => { setShowEditSquadModal(true)}

  const handleSquadPrint = () => {
    window.print()
  }

  const handleSquadToolsClick = () => { setShowSquadTools(true)}

  // Add resetSquad function after other state updates
  const resetSquad = async () => {
    const res = await fetch(`/api/squads/${squad.squadId}/reset`, {
      method: 'POST',
    })

    if (res.ok) {
      const updated = await res.json()
      setSquad(updated)
      // Reset all units' activation state
      setUnits(prev => prev.map(unit => ({ ...unit, isActivated: false })))
      toast.success('Squad reset')
    } else {
      toast.error('Failed to reset game')
    }
  }

  const totalGP = units.reduce((sum, u) => (u.unitType?.GP ?? 0) + u.totalGearGP + sum, 0)

  // Move unit at index to newIndex
  const moveUnit = async(from: number, to: number) => {
    if (to < 0 || to >= units.length) return
    const newUnits = [...units]
    const [moved] = newUnits.splice(from, 1)
    newUnits.splice(to, 0, moved)
    setUnits(newUnits)

    await updateUnitSeqs(newUnits)
  }

  const updateUnitSeqs = async(unitList: UnitPlain[]) => {
    // Prepare payload: [{ unitId, seq }]
    const payload = unitList.map((unit, idx) => ({
      unitId: unit.unitId,
      seq: idx + 1,
    }))

    try {
      await fetch('/api/units/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (err) {
      // Optionally handle error (e.g., revert UI or show a message)
      console.error('Failed to reorder units', err)
    }
  }

  return (
    <>
      {/* Full-width squad header */}
      <div className="relative w-full min-h-[150px] md:min-h-[150px] print:md:min-h-[0px] noprint">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-top"
          style={{
            backgroundImage: `url('${
              squad.hasCustomPortrait
                ? `${getSquadPortraitUrl(squad.squadId)}?v=${toEpochMs(squad.portraitUpdatedAt)}`
                : `/img/squadTypes/${squad.squadType?.squadTypeId}.webp`
            }')`,
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/80 to-background" />

        {/* Foreground content */}
        <div className="relative z-10 flex flex-col items-center justify-end text-center h-full pt-28 md:pt-20 pb-6 px-4 print:pt-1 print:pb-1">
          <div className="flex items-center justify-center gap-2">
            <PageTitle onClick={isOwner && handleEditSquadClick}>
              {squad.squadName}
            </PageTitle>
            {isOwner && (
              <sup 
                className="text-sm flex items-center w-6 h-6 jutify-top cursor-pointer"
                onClick={handleEditSquadClick}
                aria-label="Edit squad info"
              >
                <FiEdit2/>
              </sup>
            )}
          </div>

          {/* Details under title */}
          <div className="flex items-center justify-center gap-2 text-muted p-2">
            <SquadTypeLink squadTypeId={squad.squadType?.squadTypeId ?? ''} squadTypeName={squad.squadType?.squadTypeName ?? ''} />

            <span>by</span>

            <UserLink userName={squad.user?.userName ?? ''} />
          </div>
          <div className="flex items-center justify-center gap-2 text-muted">
            {!isOwner && (
              <span className="text-sm">{totalGP}GP</span>
            )}

            {!isOwner && status === 'authenticated' && (
              <Button
                className="cursor-pointer items-center p-0"
                title="Import this Squad to your Squads"
                aria-label="Import this squad"
                onClick={async () => {
                  try {
                    const res = await fetch(`/api/squads/${squad.squadId}/clone`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        squadName: squad.squadName,
                        squadTypeId: squad.squadTypeId,
                      }),
                    })

                    if (!res.ok) throw new Error('Failed to import squad')
                    toast.success('Squad imported, redirecting...')

                    const { squadId } = await res.json()
                    setTimeout(() => router.push(`/squads/${squadId}`), 500)
                  } catch (err) {
                    console.error(err)
                    toast.error('Could not import squad')
                  }
                }}>
                <FiDownload />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Trackers */}
      {isOwner && (
        <>
          <div className="sticky top-0 lg:top-[3.5rem] max-w-xl mx-auto z-10 bg-background py-1 mt-0 mb-6 px-1 flex gap-2 items-center justify-between noprint">
            {[
              { label: 'TURN', key: 'turn' },
              { label: 'MP', key: 'MP' },
              { label: 'TO', key: 'TO' },
            ].map(({ label, key }) => (
              <div key={key} className="flex flex-col items-center gap-1">
                <h6 className="font-bold">{label}:</h6>
                <div className="flex gap-1 items-center justify-center">
                  <button
                    className="flex items-center justify-center rounded border border-border w-6 h-6 text-lg"
                    onClick={() => updateSquadField(key, squad[key as 'turn' | 'MP' | 'TO'] - 1)}
                  >−</button>
                  <h4 className="stat w-7 text-center text-main">{squad[key as 'turn' | 'MP' | 'TO']}</h4>
                  <button
                    className="flex items-center justify-center rounded border border-border w-6 h-6 text-lg"
                    onClick={() => updateSquadField(key, squad[key as 'turn' | 'MP' | 'TO'] + 1)}
                  >+</button>
                </div>
              </div>
            ))}
            <div className="flex flex-col items-center gap-1">
              <h6 className="font-bold" onClick={handleEditSquadClick}>{totalGP}GP</h6>

              {/* Info/tools */}
              <div className="flex items-center">
                <div className="flex gap-1 items-center justify-center">
                  {/*
                  <button 
                    className="flex items-center justify-center rounded border border-border w-6 h-6 text-lg"
                    onClick={handleSquadToolsClick}
                    aria-label="Tools"
                  >
                    <FiInfo/>
                  </button>
                  */}
                  <div className="flex gap-2 items-center justify-center">
                    <Menu as="div" className="relative justify-center flex-shrink-0 rounded border border-border w-6 h-6 text-lg">
                      <MenuButton as="button" className="w-full h-full flex items-center justify-center">
                        <FiMoreVertical />
                      </MenuButton>
                      <SquadCardMenu
                        squad={squad}
                        isOwner={isOwner}
                        onEdit={handleEditSquadClick}
                        onReset={handleResetClick}
                        onPrint={handleSquadPrint}
                      />
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* UnitCards */}
      <div className="max-w-7xl mx-auto print:max-w-none">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {units.map((unit, idx) => {
            return (
              <UnitCard
                key={unit.unitId}
                seq={idx + 1}
                unit={unit}
                isOwner={isOwner}
                allSpecials={allSpecials ?? []}
                allMedals={allMedals ?? []}
                onUnitUpdated={updateUnit}
                onUnitDeleted={deleteUnit}
                onMoveUp={isOwner ? () => moveUnit(idx, idx - 1) : () => {}}
                onMoveDown={isOwner ? () => moveUnit(idx, idx + 1) : () => {}}
                onMoveFirst={isOwner ? () => moveUnit(idx, 0) : () => {}}
                onMoveLast={isOwner ? () => moveUnit(idx, units.length - 1) : () => {}}
                onPortraitClick={() => handlePortraitClick(`${getUnitPortraitUrl(unit.unitId)}?v=${toEpochMs(unit.portraitUpdatedAt)}`)}
              />)
          })}
          
          {/* Add Unit Button */}
          {isOwner && (
            <AddUnitForm
              key="Add Unit"
              squad={squad}
              allSpecials={allSpecials ?? []}
              onUnitAdded={addUnit}
            />
          )}

          {showResetModal && (
            <Modal
              title="Reset Game"
              onClose={() => setShowResetModal(false)}
              footer={
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setShowResetModal(false)}>
                    <h6>Cancel</h6>
                  </Button>
                  <Button
                    onClick={() => {
                      resetSquad()
                      setShowResetModal(false)
                    }}
                  >
                    <h6>Reset</h6>
                  </Button>
                </div>
              }
            >
              <div className="space-y-4">
                <p>
                Are you sure you want to reset the squad?<br/>
                This will set Turn to 1, set MP and TO to zero, and reset all units' HIT and activation (unless they are Deceased).
                </p>
              </div>
            </Modal>
          )}

          {showEditSquadModal && (
            <Modal
              title={squad.squadName}
              onClose={() => setShowEditSquadModal(false)}
              footer={
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setShowEditSquadModal(false)}>
                    <h6>Cancel</h6>
                  </Button>
                  <Button onClick={() => formRef.current?.handleSubmit()}>
                    <h6>Save</h6>
                  </Button>
                </div>
              }>
                
              <EditSquadForm
                ref={formRef} // Pass formRef to EditSquadForm
                initialName={squad.squadName}
                initialMaxGP={squad.maxGP}
                hasCustomPortrait={squad.hasCustomPortrait}
                onCancel={() => setShowEditSquadModal(false)}
                squad={squad}
                squadId={squad.squadId}
                onSave={(name, maxGP) => {
                  updateSquadInfo(name, maxGP)
                  setShowEditSquadModal(false)
                }}
              />
            </Modal>
          )}
        </div>

        {/* Squad Tools */}
        {showSquadTools && (
          <Modal
            title={squad.squadName}
            onClose={() => setShowSquadTools(false)}>
            <SquadTools factionId={squad.squadType?.factionId} factions={factions} />
          </Modal>
        )}

        {/* Carousel Modal */}
        <CarouselModal
          items={carouselItems}
          initialIndex={carouselStartIndex}
          isOpen={carouselIsOpen}
          onClose={() => closeCarousel()}
        />
      </div>
    </>
  )
}
