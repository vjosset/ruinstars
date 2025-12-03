'use client'

import clsx from 'clsx'
import { useState } from 'react'
import MissionSelector from '../tools/MissionSelector'
import QuickRef from '../tools/QuickRef_Squares'
import ScriptedOpSelector from '../tools/ScriptedOpSelector'
import { FactionPlain } from '@/types'

export default function SquadTools({ factionId, factions }: { factionId?: string, factions: FactionPlain[] }) {
  const [tab, setTab] = useState<'quickref' | 'mission' | 'ops'>('quickref')

  const tabClasses = (selected: boolean) =>
    clsx(
      'px-4 py-2 text-sm border-b-2 transition-colors',
      selected
        ? 'border-main text-main'
        : 'border-transparent text-muted hover:text-foreground'
    )

  return (
    <div className="w-full">
      <div className="flex justify-center space-x-4 border-b border-zinc-700 mb-4">
        <button className={tabClasses(tab === 'quickref')} onClick={() => setTab('quickref')}>
          Quick Reference
        </button>
        <button className={tabClasses(tab === 'mission')} onClick={() => setTab('mission')}>
          Mission
        </button>
        <button className={tabClasses(tab === 'ops')} onClick={() => setTab('ops')}>
          Operation
        </button>
      </div>

      <div className="leading-relaxed max-h-[60vh] overflow-y-auto px-0">
        <div className={tab === 'quickref' ? 'block' : 'hidden'}>
          <QuickRef />
        </div>
        <div className={tab === 'mission' ? 'block' : 'hidden'}>
          <MissionSelector />
        </div>
        <div className={tab === 'ops' ? 'block' : 'hidden'}>
          <ScriptedOpSelector factionId={factionId} factions={factions} />
        </div>
      </div>
    </div>
  )
}
