
'use client'

import { SpecialRule } from '@/lib/utils/specialRules'
import { UnitPlain } from '@/types/unit.model'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Button } from '../ui'
import UnitEditorModal from './UnitEditorModal'

type AddUnitFormProps = {
  squad: {
    squadId: string
    factionId: string
    squadName: string
  }
  allSpecials: SpecialRule[]
  onUnitAdded?: (newUnit: UnitPlain) => void
}

export default function AddUnitForm({ squad: squad, onUnitAdded, allSpecials }: AddUnitFormProps) {
  const [showAddUnitModal, setShowAddUnitModal] = useState(false)
  const { data: session } = useSession()
  const userName = session?.user?.userName

  if (!userName) return null

  return (
    <div className="text-center my-auto">
      <Button onClick={() => setShowAddUnitModal(true)}>
        <h6>+ Add Unit</h6>
      </Button>
      {showAddUnitModal && (
        <UnitEditorModal
          key="addunit-modal"
          isOpen={true}
          squadId={squad.squadId}
          factionId={squad.factionId}
          onClose={() => setShowAddUnitModal(false)}
          allSpecials={allSpecials ?? []}
          onSave={(updatedUnit) => {
            setShowAddUnitModal(false)
            onUnitAdded?.(updatedUnit) // ✅ call parent with the new unit
          }}
        />
      )}
    </div>
  )
}
