'use client'

import { useState } from 'react'
import clsx from 'clsx'
import QuickRef from '../tools/QuickRef'
import BattlefieldSelector from '../tools/BattlefieldSelector'
import MissionSelector from '../tools/MissionSelector'

export default function RulesTabs() {
  const [tab, setTab] = useState<'quickref' | 'mission' | 'battlefield'>('quickref')

  const tabClasses = (selected: boolean) =>
    clsx(
      'px-4 py-2 text-sm font-semibold border-b-2 transition-colors',
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
        <button className={tabClasses(tab === 'battlefield')} onClick={() => setTab('battlefield')}>
          Battlefield
        </button>
      </div>

      <div className="text-sm leading-relaxed max-h-[60vh] overflow-y-auto px-2">
        <div className={tab === 'quickref' ? 'block' : 'hidden'}>
          <QuickRef />
        </div>
        <div className={tab === 'mission' ? 'block' : 'hidden'}>
          <MissionSelector />
        </div>
        <div className={tab === 'battlefield' ? 'block' : 'hidden'}>
          <BattlefieldSelector />
        </div>
      </div>
    </div>
  )
}
