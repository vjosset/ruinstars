'use client'

import { trackEvent } from '@/lib/utils/trackEvent'
import { sendGAEvent } from '@next/third-parties/google'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export function Tracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!pathname) return

    // The initial page_view is already sent by GoogleAnalytics' gtag('config', ...)
    // on first load, so only send explicit page_view events on subsequent SPA navigations.
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')

    sendGAEvent('event', 'page_view', {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
    })

    trackEvent('page', 'view')

  }, [pathname, searchParams])

  return null
}
