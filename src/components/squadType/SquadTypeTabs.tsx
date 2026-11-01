'use client'

import { useState } from 'react'

type Tab = {
  id: string
  label: string
  content: React.ReactNode
}

type Props = {
  tabs: Tab[]
  initialTab: string
}

// All panels are server-rendered into the page (crawlable at the canonical URL); this only switches which one is visible
export default function SquadTypeTabs({ tabs, initialTab }: Props) {
  const defaultTab = tabs[0]?.id
  const [activeTab, setActiveTab] = useState(initialTab)

  const selectTab = (tab: string) => {
    setActiveTab(tab)
    // Keep ?tab= in the URL so links and refreshes land on the same tab
    const url = new URL(window.location.href)
    if (tab === defaultTab) url.searchParams.delete('tab')
    else url.searchParams.set('tab', tab)
    window.history.replaceState(null, '', url)
  }

  return (
    <>
      {tabs.length > 1 && (
        <div className="flex items-center justify-center gap-8 border-b border-border mb-4 px-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => selectTab(tab.id)}
              className={`pb-2 text-sm uppercase tracking-wide transition-colors ${activeTab === tab.id ? 'text-main border-b-2 border-main' : 'text-muted hover:text-foreground border-b-2 border-transparent'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {tabs.map(tab => (
        <div key={tab.id} className={activeTab === tab.id ? '' : 'hidden'}>
          {tab.content}
        </div>
      ))}
    </>
  )
}
