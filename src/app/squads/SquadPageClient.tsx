'use client'

import { Button } from '@/components/ui'
import { SpecialRule } from '@/lib/utils/specialRules'
import { Medal, SquadPlain, UnitPlain } from '@/types'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FiEdit2, FiInfo, FiRotateCcw, FiUser } from 'react-icons/fi'
import EditSquadForm from '../../components/squad/EditSquadForm'
import SquadTools from '../../components/squad/SquadTools'
import { useModal } from '../../components/ui/ModalContext'
import AddUnitForm from '../../components/unit/AddUnitForm'
import UnitCard from '../../components/unit/UnitCard'

export default function SquadPageClient({
  initialSquad,
  isOwner,
}: {
  initialSquad: SquadPlain
  isOwner: boolean
}) {
  const [units, setUnits] = useState<UnitPlain[]>(initialSquad.units ?? [])
  const [squad, setSquad] = useState(initialSquad)
  const [allSpecials, setSpecials] = useState<SpecialRule[] | null>(null)
  const [allMedals, setMedals] = useState<Medal[] | null>(null)
  const formRef = useRef<{ handleSubmit: () => void }>(null)
  const { showModal, hideModal } = useModal()

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
      hideModal()
    } else {
      console.error('Failed to update squad info')
    }
  }
  
  const handleResetClick = () => {
    showModal({
      title: 'Reset Game',
      body: (
        <div className="space-y-4">
          <p>
            Are you sure you want to reset the squad?<br/>
            This will set Turn to 1, set MP and TO to zero, and reset all units' HIT and activation.
          </p>
        </div>
      ),
      footer: (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => hideModal()}>
            <h6>Cancel</h6>
          </Button>
          <Button
            onClick={() => {
              resetSquad()
              hideModal()
            }}
          >
            <h6>Reset</h6>
          </Button>
        </div>
      )
    })
  }

  const handleEditSquadClick = () => {
    isOwner && showModal({
      title: squad.squadName,
      body: (
        <EditSquadForm
          ref={formRef} // Pass formRef to EditSquadForm
          initialName={squad.squadName}
          initialMaxGP={squad.maxGP}
          onSubmit={(name, maxGP) => {
            updateSquadInfo(name, maxGP)
            hideModal()
          }}
          onCancel={() => hideModal()}
        />
      ),
      footer: (
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => hideModal()}>
            <h6>Cancel</h6>
          </Button>
          <Button onClick={() => formRef.current?.handleSubmit()}>
            <h6>Save</h6>
          </Button>
        </div>
      )
    })
  }

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
    } else {
      console.error('Failed to reset game')
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
    <div>
      <div className="text-center space-y-2 mb-1">
        <div className="flex flex-col justify-center items-center gap-2">
          <div className="flex items-center justify-center gap-2">
            <h3 className="font-title" onClick={handleEditSquadClick}>
              {squad.squadName}
            </h3>
          </div>

          {/* Details under title */}
          <div className="flex items-center justify-center gap-2 text-muted">
            <Link 
              href={`/factions/${squad.factionId}`} 
              className="inline-flex items-center hover:text-main underline"
            >
              <img 
                className="h-6 w-6 hidden" 
                src={`/img/factions/${squad.faction?.factionId}-icon.webp`} 
                alt="" 
              />
              <span className="ml-1">{squad.faction?.factionName}</span>
            </Link>

            <span>by</span>

            <Link 
              href={`/users/${squad.user?.userName}`} 
              className="inline-flex items-center hover:text-main underline"
            >
              <FiUser className="h-6 w-6" />
              <span className="ml-1">{squad.user?.userName}</span>
            </Link>
            <span>({totalGP}/{squad.maxGP}GP)</span>
          </div>
        </div>
      </div>

      {/* Trackers */}
      {isOwner && (
        <div className="sticky top-0 lg:top-[3.5rem] max-w-xl mx-auto z-10 bg-background py-2 px-1 flex gap-2 items-center justify-between">
          {[
            { label: 'TURN', key: 'turn' },
            { label: 'MP', key: 'MP' },
            { label: 'TO', key: 'TO' },
          ].map(({ label, key }) => (
            <div key={key} className="flex flex-col items-center gap-1">
              <h6 className="font-bold text-main">{label}:</h6>
              <div className="flex items-center">
                <button
                  className="flex items-center justify-center rounded border border-border w-6 h-6 text-lg"
                  onClick={() => updateSquadField(key, squad[key as 'turn' | 'MP' | 'TO'] - 1)}
                >−</button>
                <h4 className="stat w-7 text-center">{squad[key as 'turn' | 'MP' | 'TO']}</h4>
                <button
                  className="flex items-center justify-center rounded border border-border w-6 h-6 text-lg"
                  onClick={() => updateSquadField(key, squad[key as 'turn' | 'MP' | 'TO'] + 1)}
                >+</button>
              </div>
            </div>
          ))}
          <div className="flex flex-col items-center gap-1">
            <h6 className="font-bold text-main invisible">{totalGP}/{squad.maxGP}GP</h6>
            <div key="resetEditSquad" className="flex items-center">
              <div className="flex gap-2 items-center justify-center"> {/* Changed from grid to flex with gap */}
                <button
                  className="flex items-center justify-center rounded border border-border w-6 h-6 text-lg"
                  onClick={handleResetClick}
                >
                  <FiRotateCcw/>
                </button>
                <button 
                  className="flex items-center justify-center rounded border border-border w-6 h-6"
                  onClick={handleEditSquadClick}
                  aria-label="Edit squad info"
                >
                  <FiEdit2/>
                </button>
                <button 
                  className="flex items-center justify-center rounded border border-border w-6 h-6"
                  onClick={() => showModal({
                    title: 'Tools',
                    body: (<div className="overflow-y-auto p-2 flex-1"><SquadTools /></div>),
                    footer: (<></>)
                  })}
                  aria-label="Tools"
                >
                  <FiInfo/>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UnitCards */}
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
      </div>
    </div>
  )
}
