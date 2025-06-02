
'use client'

import { useState } from 'react'
import { Button, Modal } from '../ui'
import UnitEditorModal from './UnitEditorModal'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { UnitPlain } from '@/types/unit.model'
import { SpecialRule } from '@/lib/utils/specialRules'

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
  const router = useRouter()
  const { data: session, status } = useSession()
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
