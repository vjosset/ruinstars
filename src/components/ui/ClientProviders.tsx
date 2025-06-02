'use client'

import { SessionProvider } from 'next-auth/react'
import { ModalProvider } from './ModalContext'
import { Tracker } from './Tracker'
import type { Session } from 'next-auth'

type Props = {
  children: React.ReactNode
  session: Session | null
}

export function ClientProviders({ children, session }: Props) {
  return (
    <SessionProvider session={session}>
      <ModalProvider>
        {children}
      </ModalProvider>
      <Tracker />
    </SessionProvider>
  )
}
