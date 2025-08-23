'use client'

import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Campaign from '../tools/Campaign'
import MissionSelector from '../tools/MissionSelector'
import QuickRef from '../tools/QuickRef_Squares'

export default function SquadTools() {
  const [tab, setTab] = useState<'quickref' | 'mission' | 'campaign'>('quickref')
  const { data: session } = useSession()

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
        {(session?.user.userId == 'vince' || session?.user.userId == 'ozm45') &&
          <button className={tabClasses(tab === 'campaign')} onClick={() => setTab('campaign')}>
            Campaign
          </button>
        }
      </div>

      <div className="leading-relaxed max-h-[60vh] overflow-y-auto px-0">
        <div className={tab === 'quickref' ? 'block' : 'hidden'}>
          <QuickRef />
        </div>
        <div className={tab === 'mission' ? 'block' : 'hidden'}>
          <MissionSelector />
        </div>
        <div className={tab === 'campaign' ? 'block' : 'hidden'}>
          <Campaign />
        </div>
      </div>
    </div>
  )
}
