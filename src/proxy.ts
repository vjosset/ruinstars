import { userPath } from '@/lib/utils/utils'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Permanently removed pages — respond 410 so crawlers stop retrying them,
// rather than a bare 404 (which search engines keep re-checking indefinitely).
const RETIRED_PATHS = new Set([
  '/scriptedoperations',
])

// Moved pages — respond 301 so crawlers transfer link equity to the new URL
// and stop requesting the old one. Keys must also be listed in `config.matcher`
// below, otherwise the proxy never runs for them.
const REDIRECTS = new Map<string, string>([
  ['/factions/SWARM', '/factions/SWM'],
])

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (RETIRED_PATHS.has(pathname)) {
    return new NextResponse('Gone', { status: 410 })
  }
  const redirectTo = REDIRECTS.get(pathname)
  if (redirectTo) {
    const url = req.nextUrl.clone()
    url.pathname = redirectTo
    return NextResponse.redirect(url, 301)
  }

  // Only rewrite for /me route
  if (pathname === '/me') {
    const token = await getToken({ req })
    const userName = typeof token?.userName === 'string' ? token.userName : null

    if (userName) {
      const url = req.nextUrl.clone()
      url.pathname = userPath(userName)
      return NextResponse.rewrite(url)
    } else {
      // Optionally redirect to login if not authenticated
      const url = req.nextUrl.clone()
      url.pathname = '/auth/login'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  // Must be static string literals — Next.js parses this at build time, so it
  // cannot be derived from RETIRED_PATHS / REDIRECTS. Keep the three in sync.
  matcher: ['/me', '/scriptedoperations', '/factions/SWARM'],
}
