'use client'

import battlefields from '@/data/battlefields.json'
import ops from '@/data/scriptedOperations.json'
import { FactionPlain, MissionPlain } from '@/types'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import BattlefieldBlock from '../shared/BattlefieldBlock'
import MissionCard from '../shared/MissionCard'
import Markdown from '../ui/Markdown'

type ScriptedOp = {
  slug: string
  title: string
  description: string
  factions: { factionA: string, factionB: string }
  missions?: { id: string | number, title: string, description?: string, setup?: string, deployment?: string, special?: string, victory?: string, battlefieldId?: string | null }[]
}

const buildOptionLabel = (op: ScriptedOp, factions: FactionPlain[], playerFactionId?: string) => {
  const opponentId = playerFactionId === op.factions.factionA ? op.factions.factionB : op.factions.factionA
  const opponentName = factions.find(f => f.factionId === opponentId)?.factionName ?? opponentId
  return `${op.title} (vs ${opponentName})`
}

export default function ScriptedOpSelector({ factionId, factions }: { factionId?: string, factions: FactionPlain[] }) {
  const [selectedSlug, setSelectedSlug] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedScriptedOpSlug') || ''
    }
    return ''
  })
  const [selectedMissionId, setSelectedMissionId] = useState<string>('')

  const availableOps: ScriptedOp[] = useMemo(() => {
    if (!factionId) return []
    return (ops as ScriptedOp[])
      .filter(op => op.factions?.factionA === factionId || op.factions?.factionB === factionId)
      .sort((a, b) => a.title.localeCompare(b.title))
  }, [factionId])

  useEffect(() => {
    if (selectedSlug) {
      localStorage.setItem('selectedScriptedOpSlug', selectedSlug)
    } else {
      localStorage.removeItem('selectedScriptedOpSlug')
    }
  }, [selectedSlug])

  useEffect(() => {
    const key = selectedSlug ? `selectedScriptedOpMissionId_${selectedSlug}` : null
    if (!key) return

    if (selectedMissionId) {
      localStorage.setItem(key, selectedMissionId)
    }
  }, [selectedMissionId, selectedSlug])

  const selectedOp = availableOps.find(op => op.slug === selectedSlug)
  const normalizedMissions: MissionPlain[] = useMemo(() => {
    if (!selectedOp?.missions) return []
    return selectedOp.missions.map((m, idx) => ({
      missionId: (m.id ?? idx + 1).toString(),
      missionType: 'Scripted',
      seq: idx + 1,
      title: m.title || 'Untitled Mission',
      description: m.description || '',
      battlefieldId: m.battlefieldId ?? null,
      setup: m.setup || '',
      deployment: m.deployment || '',
      victory: m.victory || '',
      special: m.special || '',
      rewards: [],
    }))
  }, [selectedOp])

  useEffect(() => {
    if (!selectedSlug) {
      setSelectedMissionId('')
      return
    }

    const key = `selectedScriptedOpMissionId_${selectedSlug}`
    const stored = typeof window !== 'undefined' ? localStorage.getItem(key) : null
    const fallback = normalizedMissions[0]?.missionId || ''
    const nextId = stored && normalizedMissions.find(m => m.missionId === stored) ? stored : fallback
    setSelectedMissionId(nextId)
  }, [selectedSlug, normalizedMissions])

  if (!factionId) {
    return <p className="text-sm text-muted">Select a squad type to see scripted operations.</p>
  }

  if (availableOps.length === 0) {
    return <p className="text-sm text-muted">No scripted operations available for this faction.</p>
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-sm w-32">Operation:</span>
        <select
          className="flex-1 h-8 px-3 text-sm bg-card border border-border rounded-md appearance-none"
          value={selectedSlug}
          onChange={(event) => setSelectedSlug(event.target.value)}
        >
          <option value="">Select an Operation...</option>
          {availableOps.map(op => (
            <option key={op.slug} value={op.slug}>
              {buildOptionLabel(op, factions, factionId)}
            </option>
          ))}
        </select>
      </div>

      {selectedOp && (
        <div className="space-y-3 border border-border rounded p-3">
          <div className="flex items-center justify-between gap-2">
            <h5 className="font-heading text-main">{selectedOp.title}</h5>
            <Link href={`/scriptedoperations?opId=${encodeURIComponent(selectedOp.slug)}`} className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
              <FiExternalLink />
              Details
            </Link>
          </div>
          {selectedOp.description && (
            <Markdown className="text-sm text-foreground">{selectedOp.description}</Markdown>
          )}
          {normalizedMissions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm w-32">Operation Mission:</span>
                <select
                  className="flex-1 h-8 px-3 text-sm bg-card border border-border rounded-md appearance-none"
                  value={selectedMissionId}
                  onChange={(event) => setSelectedMissionId(event.target.value)}
                >
                  {normalizedMissions.map(m => (
                    <option key={m.missionId} value={m.missionId}>
                      {m.missionId} - {m.title}
                    </option>
                  ))}
                </select>
              </div>

              {normalizedMissions
                .filter(m => m.missionId === (selectedMissionId || normalizedMissions[0]?.missionId))
                .map(m => {
                  const battlefield = battlefields.find(
                    (bf) => bf.battlefieldId === m.battlefieldId
                  )
                  return (
                    <div key={`${selectedOp.slug}-${m.missionId}`} className="space-y-2">
                      <MissionCard mission={m} showDescription={true} />
                      {battlefield && <BattlefieldBlock battlefield={battlefield} />}
                    </div>
                  )
                })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
