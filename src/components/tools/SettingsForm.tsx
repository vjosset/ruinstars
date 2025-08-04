'use client'

import { Button, Input, Modal, SectionTitle } from '@/components/ui'
import { GAME } from '@/lib/config/game_config'
import { signOut, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import AppVersion from './AppVersion'

export default function SettingsForm() {
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const { data: session } = useSession()
  const [showConfirmLogOut, setShowConfirmLogOut] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    })
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt && 'prompt' in deferredPrompt) {
      const promptEvent = deferredPrompt as any
      promptEvent.prompt()
      await promptEvent.userChoice
      setDeferredPrompt(null)
    }
  }
  
  const updatePassword = async () => {
    if (!session?.user) {
      toast.error('Please log in before updating your password.')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    const res = await fetch(`/api/users/${session?.user?.userName}/password`, {
      method: 'PUT',
      body: JSON.stringify({ password }),
    })
    
    if (res.ok) {
      toast.success('Password updated')
      // Optionally reset password fields
      setPassword('')
      setConfirmPassword('')
    } else if (res.status === 401) {
      toast.error('Unauthorized. Please log in again.')
    } else {
      const errorText = await res.text()
      toast.error(`Error: ${errorText || 'Could not update password'}`)
    }
  }

  return (
    <div className="space-y-4">
      {/* Display Settings */}
      {/*
      <div>
        <SectionTitle>Display</SectionTitle>
        <div>
          <Checkbox id="showPortraits"
            checked={settings.showPortraits}
            onChange={() => updateSettings({ showPortraits: !settings.showPortraits })} />
          <Label htmlFor="showPortraits">Show Portraits</Label>
        </div>
        <div>
          <Checkbox id="showNarrative"
            checked={settings.showNarrative}
            onChange={() => updateSettings({ showNarrative: !settings.showNarrative })} />
          <Label htmlFor="showNarrative">Show Narrative Gear</Label>
        </div>
      </div>
      */}

      {/* Install PWA */}
      {deferredPrompt && (
        <Button onClick={handleInstall}>
          <h6>Install {GAME.NAME} App</h6>
        </Button>
      )}

      {/* Clear Cache */}
      <div>
        <SectionTitle>Cache</SectionTitle>
        <p>If something looks outdated, try clearing the cache.</p>
        <Button onClick={async () => {
          const success = await clearServiceWorkerCache()
          if (success) {
            toast.success('Cache cleared, reloading...')
            setTimeout(() => {
              console.log('reloading')
              window.location.reload()}
            , 500)
          } else {
            toast.error('Failed to clear cache')
          }
        }}>
          <h6>Clear Cache</h6>
        </Button>
      </div>
      
      <hr />

      {session?.user?.userId && (
        <>
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              {/* Log Out */}
              <SectionTitle>Log Out</SectionTitle>
              <Button onClick={() => setShowConfirmLogOut(true)}>
                <h6>Log Out</h6>
              </Button>
            </div>
    
            {/* Change Password */}
            <div>
              <SectionTitle>Change Password</SectionTitle>
              <Input
                type="password"
                placeholder="New password"
                value={password}
                onChange={e => setPassword(e.target.value)} />
              <Input
                type="password"
                placeholder="Confirm New password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)} />
              <div className="flex justify-end">
                <Button onClick={updatePassword}>
                  <h6>Update Password</h6>
                </Button>
              </div>
            </div>
          </div>
    
          {showConfirmLogOut &&
            <Modal
              title={'Log Out'}
              onClose={() => setShowConfirmLogOut(false)}
              footer={
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setShowConfirmLogOut(false)}>
                    <h6>Cancel</h6>
                  </Button>
                  <Button onClick={() => signOut({ callbackUrl: '/' })}>
                    <h6>Log Out</h6>
                  </Button>
                </div>
              }
            >
              <p className="text-sm text-foreground">
                Are you sure you want to log out?
              </p>
            </Modal>
          }
        </>
      )}
      
      {/* Version information */}
      <AppVersion />
    </div>
  )
}

export function clearServiceWorkerCache(): Promise<boolean> {
  console.log('Clearing SW cache...')
  console.log('SW Controller:', navigator.serviceWorker.controller)
  if (!navigator.serviceWorker?.controller) return Promise.resolve(true)

  return new Promise((resolve) => {
    const channel = new MessageChannel()

    /*
    Channel ports:
      port1	- Client (the page) - To listen for replies from the service worker
      port2	- Service Worker    - Used by the SW to send back a message
    */

    channel.port1.onmessage = (event) => {
      console.log('Reply from service worker:', event.data)
      resolve(event.data?.success ?? false)
    }

    navigator.serviceWorker.controller?.postMessage('CLEAR_CACHE', [channel.port2])
  })
}
