'use client'
import { GiRollingDices } from "react-icons/gi";
import { useEffect, useState } from 'react'
import Markdown from '@/components/ui/Markdown'
import BattlefieldBlock from "../shared/BattlefieldBlock";
import { getRandom } from "@/lib/utils/utils";

export default function BattlefieldSelector() {
  const [battlefields, setBattlefields] = useState<any[]>([])
  const [selectedBattlefieldId, setSelectedBattlefieldId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedBattlefieldId') || ''
    }
    return ''
  })

  useEffect(() => {
    fetch('/api/battlefields')
      .then((res) => res.json())
      .then((data) => {
        setBattlefields(data)
      })
      .catch((err) => console.error('Failed to load battlefields:', err))
  }, [])
  
  useEffect(() => {
    if (selectedBattlefieldId) {
      localStorage.setItem('selectedBattlefieldId', selectedBattlefieldId)
    } else {
      localStorage.removeItem('selectedBattlefieldId')
    }
  }, [selectedBattlefieldId])

  const selectedBattlefield = battlefields.find(
    (m) => m.battlefieldId === Number(selectedBattlefieldId)
  )

  return (
    <>
      <div className="flex items-stretch gap-0 mb-4">
        <select
          className="flex-1 h-10 px-3 text-sm bg-card border border-border rounded-l-md appearance-none"
          value={selectedBattlefieldId}
          onChange={(e) => setSelectedBattlefieldId(e.target.value)}
        >
          <option value="">Select a battlefield...</option>
          {battlefields.map((battlefield) => (
            <option key={battlefield.battlefieldId} value={battlefield.battlefieldId}>
              {battlefield.battlefieldId} - {battlefield.title}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center text-lg border border-border border-l-0 rounded-r-md bg-zinc-900 hover:bg-zinc-800"
          onClick={() => {
            if (battlefields.length === 0) return
            const currentBattlefieldId = selectedBattlefieldId;
            let randomBattlefield = getRandom(battlefields)
            
            // Make sure we give them a different battlefield
            while (randomBattlefield.battlefieldId.toString() === currentBattlefieldId && battlefields.length > 1) {
              randomBattlefield = getRandom(battlefields)
            }
            setSelectedBattlefieldId(randomBattlefield.battlefieldId.toString())
          }}
        >
          <GiRollingDices />
        </button>
      </div>

      {selectedBattlefield && (
        <BattlefieldBlock battlefield={selectedBattlefield} />
      )}
    </>
  )
}
