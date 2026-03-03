'use client'

import { SquadPlain } from '@/types'
import { useState } from 'react'
import SquadSpotlightCard from '@/components/squad/SquadSpotlightCard'
import { FiRefreshCw } from 'react-icons/fi'

export default function SquadSpotlightSection({ initialSquad }: { initialSquad: SquadPlain }) {
  const [squad, setSquad] = useState(initialSquad)
  const [loading, setLoading] = useState(false)

  async function refresh() {
    setLoading(true)
    try {
      const res = await fetch(`/api/squads/spotlight?excludeSquadId=${squad.squadId}`)
      if (res.ok) {
        const data = await res.json()
        setSquad(data)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-2 py-8 max-w-lg mx-auto">
      <div className="flex items-center justify-center gap-2 mb-1">
        <h4 className="text-main font-title cursor-pointer" onClick={refresh}>
          Squad Showcase
        </h4>
        <button
          onClick={refresh}
          disabled={loading}
          title="Show another squad"
          className="text-muted hover:text-main transition-colors disabled:opacity-40"
        >
          <FiRefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>
      <p className="font-heading text-sm italic text-muted text-center mb-4 tracking-wide">
        Squads built by the Ruinstars community
      </p>
      <SquadSpotlightCard squad={squad} isOwner={false} />
    </div>
  )
}
