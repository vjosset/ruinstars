'use client'

import AddSquadForm from '@/src/components/squad/AddSquadForm'
import SquadCard from '@/src/components/squad/SquadCard'
import { SquadPlain } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface UserPageClientProps {
  squads: SquadPlain[]
  isOwner: boolean
  userName: string
}

export default function UserPageClient({ squads: initialSquads, isOwner }: UserPageClientProps) {
  const router = useRouter()
  const [squads, setSquads] = useState(initialSquads)

  // On mount (including back-navigation from router cache), fetch fresh server data
  useEffect(() => { router.refresh() }, [router])

  // Sync local state when server data updates after refresh
  useEffect(() => { setSquads(initialSquads) }, [initialSquads])

  const handleDelete = (squadId: string) => {
    setSquads(squads => squads.filter(squad => squad.squadId !== squadId))
  }

  // Move squad at index to newIndex
  const moveSquad = async (from: number, to: number) => {
    if (to < 0 || to >= squads.length) return
    const newSquads = [...squads]
    const [moved] = newSquads.splice(from, 1)
    newSquads.splice(to, 0, moved)
    setSquads(newSquads)
    

    // Prepare payload: [{ squadId, seq }]
    const payload = newSquads.map((squad, idx) => ({
      squadId: squad.squadId,
      seq: idx + 1,
    }))

    try {
      await fetch('/api/squads/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (err) {
      // Optionally handle error (e.g., revert UI or show a message)
      console.error('Failed to reorder squads', err)
    }
  }

  return (
    <>
      {isOwner && <AddSquadForm key="Add Squad" />}<br/>
      <div className="gap-1 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {squads.map((squad, idx) => (
          <SquadCard
            key={squad.squadId}
            squad={squad}
            isOwner={isOwner}
            showUserLink={false}
            showSquadTypeLink={true}
            onMoveUp={isOwner ? () => moveSquad(idx, idx - 1) : () => {}}
            onMoveDown={isOwner ? () => moveSquad(idx, idx + 1) : () => {}}
            onMoveFirst={isOwner ? () => moveSquad(idx, 0) : () => {}}
            onMoveLast={isOwner ? () => moveSquad(idx, squads.length - 1) : () => {}}
            onDelete={isOwner ? handleDelete : undefined}
          />
        ))}
      </div>
    </>
  )
}
