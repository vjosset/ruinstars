'use client'

import {  useState } from "react";
import clsx from "clsx";
import SettingsForm from '@/components/tools/SettingsForm'
import AppVersion from '@/components/tools/AppVersion';
import AdminTools from '@/components/tools/AdminTools';
import AccountTools from '@/components/tools/AccountTools';
import Resources from "@/components/tools/Resources";


export default function ToolsPageClient({ userId }: { userId: string }) {
  const [tab, setTab] =
    useState<
    'settings' |
    'account' |
    'resources' |
    'admin'
  >('settings')

  const tabClasses = (selected: boolean) =>
    clsx(
      'px-4 py-2 font-semibold border-b-2 transition-colors',
      selected
        ? 'border-main text-main'
        : 'border-transparent text-muted hover:text-foreground'
    )
    
  return (
    <div className="px-1 py-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1>Tools</h1>

        <div className="w-full">
          <div className="flex justify-center space-x-4 border-b border-zinc-700 mb-4">
            <button className={tabClasses(tab === 'settings')} onClick={() => setTab('settings')}>
              Settings
            </button>
            <button className={tabClasses(tab === 'account')} onClick={() => setTab('account')}>
              Account
            </button>
            <button className={tabClasses(tab === 'resources')} onClick={() => setTab('resources')}>
              Resources
            </button>
            {userId == 'vince' && (
              <button className={tabClasses(tab === 'admin')} onClick={() => setTab('admin')}>
                Admin
              </button>
            )}
          </div>
    
          <div className="leading-relaxed max-h-[60vh] overflow-y-auto px-2 text-left">
            <div className={"w-full max-w-md mx-auto " + (tab === 'settings' ? 'block' : 'hidden')}>
              <SettingsForm />
            </div>
            <div className={"w-full max-w-md mx-auto " + (tab === 'account' ? 'block' : 'hidden')}>
              <AccountTools />
            </div>
            <div className={"w-full max-w-md mx-auto " + (tab === 'resources' ? 'block' : 'hidden')}>
              <Resources />
            </div>
            {userId == 'vince' && (
              <div className={"w-full max-w-md mx-auto " + (tab === 'admin' ? 'block' : 'hidden')}>
                <AdminTools />
              </div>
            )}
          </div>
          {/* Version information */}
          <AppVersion />
        </div>
      </div>
    </div>
  )}
