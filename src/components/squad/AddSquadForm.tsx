
'use client'

import { useEffect, useState } from 'react'
import { Button, Label, Modal, Input, Checkbox } from '../ui'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function AddSquadForm() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [showAddSquadModal, setShowAddSquadModal] = useState(false)
  const [creatingSquad, setCreatingSquad] = useState(false)
  const [loading, setLoading] = useState(true)
  const [factions, setFactions] = useState<any[]>([])
  const [squadName, setSquadName] = useState('')
  const [selectedFactionId, setSelectedFactionId] = useState<string | null>(null)
  const [useDefaultSquad, setUseDefaultSquad] = useState<boolean>(true)

  const userName = session?.user?.userName
  const userId = session?.user?.userId

  // Get the available factions
  // Handle loading times
  useEffect(() => {
    if (!userId) return

    setLoading(true)
    fetch('/api/factions')
      .then((res) => res.json())
      .then((data) => {
        setFactions(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load factions:', err)
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
                disabled={!squadName || !selectedFactionId || creatingSquad}
                onClick={async () => {
                  setCreatingSquad(true)

                  // Check if we should copy the default squad
                  if (useDefaultSquad) {
                    try {
                      const res = await fetch(`/api/squads/${selectedFactionId}/clone`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          squadName: squadName,
                          factionId: selectedFactionId,
                        }),
                      })
  
                      if (!res.ok) throw new Error('Failed to create squad')
  
                      const { squadId } = await res.json()
                      router.push(`/squads/${squadId}`)
                    } catch (err) {
                      console.error(err)
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
                          factionId: selectedFactionId,
                        }),
                      })
  
                      if (!res.ok) throw new Error('Failed to create squad')
  
                      const { squadId } = await res.json()
                      router.push(`/squads/${squadId}`)
                    } catch (err) {
                      console.error(err)
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
                  value={squadName ?? ''}
                  className="w-full"
                  onChange={(e) => setSquadName(e.target.value)}
                />
              </div>
              <div className="grid-cols-2 items-center gap-2">
                <Label>Faction</Label>
                <select
                  className="w-full bg-card border border-border rounded p-2 text-sm"
                  value={selectedFactionId || ''}
                  onChange={(e) => setSelectedFactionId(e.target.value || null)}
                >
                  <option value="">Select a faction...</option>
                  {factions.map((faction) => (
                    <option key={faction.factionId} value={faction.factionId}>
                      {faction.factionName}
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