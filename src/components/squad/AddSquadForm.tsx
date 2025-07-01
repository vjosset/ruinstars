
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Button, Checkbox, Input, Label, Modal } from '../ui'

export default function AddSquadForm() {
  const router = useRouter()
  const { data: session } = useSession()
  const [showAddSquadModal, setShowAddSquadModal] = useState(false)
  const [creatingSquad, setCreatingSquad] = useState(false)
  const [loading, setLoading] = useState(true)
  const [squadTypes, setSquadTypes] = useState<any[]>([])
  const [squadName, setSquadName] = useState('')
  const [selectedSquadTypeId, setSelectedSquadTypeId] = useState<string | null>(null)
  const [useDefaultSquad, setUseDefaultSquad] = useState<boolean>(true)

  const userName = session?.user?.userName
  const userId = session?.user?.userId

  // Get the available squadTypes
  // Handle loading times
  useEffect(() => {
    if (!userId) return

    setLoading(true)
    fetch('/api/squadTypes')
      .then((res) => res.json())
      .then((data) => {
        setSquadTypes(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load squadTypes:', err)
        setLoading(false)
      })
  }, [userId])

  if (!userName) return null

  return (
    <div className="text-center my-auto">
      <Button
        onClick={() => setShowAddSquadModal(true)}
      >
        <h6>+ New Squad</h6>
      </Button>

      {showAddSquadModal && 
        <Modal
          title="Create New Squad"
          onClose={() => setShowAddSquadModal(false)}
          footer={
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                onClick={() => setShowAddSquadModal(false)}
                disabled={creatingSquad}
              >
                <h6>Cancel</h6>
              </Button>
              <Button
                className="px-3 py-1 rounded-md bg-primary text-white hover:bg-primary/80 disabled:opacity-50"
                disabled={!squadName || !selectedSquadTypeId || creatingSquad}
                onClick={async () => {
                  setCreatingSquad(true)

                  // Check if we should copy the default squad
                  if (useDefaultSquad) {
                    try {
                      const res = await fetch(`/api/squads/${selectedSquadTypeId}/clone`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          squadName: squadName,
                          squadTypeId: selectedSquadTypeId,
                        }),
                      })
  
                      if (!res.ok) throw new Error('Failed to create squad')
                      toast.success('Squad created, redirecting...')
  
                      const { squadId } = await res.json()
                      setTimeout(() => router.push(`/squads/${squadId}`), 500)
                    } catch (err) {
                      console.error(err)
                      toast.error('Could not create squad')
                    } finally {
                      setCreatingSquad(false)
                    }
                  }
                  else {
                    try {
                      const res = await fetch('/api/squads', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          squadName: squadName,
                          squadTypeId: selectedSquadTypeId,
                        }),
                      })
  
                      if (!res.ok) throw new Error('Failed to create squad')
                      toast.success('Squad created, redirecting...')
  
                      const { squadId } = await res.json()
                      setTimeout(() => router.push(`/squads/${squadId}`), 500)
                    } catch (err) {
                      console.error(err)
                      toast.error('Could not create squad')
                    } finally {
                      setCreatingSquad(false)
                    }
                  }
                }}
              >
                <h6>{creatingSquad ? 'Creating...' : 'Create'}</h6>
              </Button>
            </div>
          }
        >
          {loading ? (
            <div className="p-4 space-y-4 animate-pulse">
              <div className="h-4 bg-muted rounded w-1/3" />
              <div className="h-10 bg-muted rounded" />
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="h-10 bg-muted rounded" />
            </div>
          ) : (
            <div className="space-y-2">
              <div className="grid-cols-2 items-center gap-2">
                <Label>Squad Name</Label>
                <Input
                  type="text"
                  autoCapitalize="words"
                  value={squadName ?? ''}
                  className="w-full"
                  onChange={(e) => setSquadName(e.target.value)}
                />
              </div>
              <div className="grid-cols-2 items-center gap-2">
                <Label>SquadType</Label>
                <select
                  className="w-full bg-card border border-border rounded p-2 text-sm"
                  value={selectedSquadTypeId || ''}
                  onChange={(e) => setSelectedSquadTypeId(e.target.value || null)}
                >
                  <option value="">Select a squadType...</option>
                  {squadTypes.map((squadType) => (
                    <option key={squadType.squadTypeId} value={squadType.squadTypeId}>
                      {squadType.squadTypeName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid-cols-2 items-center gap-2">
                <Checkbox
                  type="checkbox"
                  checked={useDefaultSquad}
                  onChange={(e) => setUseDefaultSquad(e.target.checked)}
                />
                { ' Import Default Squad' }
              </div>
            </div>
          )}
        </Modal>
      }
    </div>
  )
}