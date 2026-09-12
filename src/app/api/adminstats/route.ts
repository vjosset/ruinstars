import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { toLocalIsoDate } from '@/lib/utils/utils'
import { NextResponse } from 'next/server'

// Get the stats
export async function GET() {
  const session = await getAuthSession()
  if (!session?.user || session.user.userId !== 'vince'){
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const days = getLastNDates(16)
  const startDate = new Date(days[days.length - 1])
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 1) // to include today fully

  const stats: {
    datestamp: Date
    totals: { users: number; squads: number; units: number }
    dailyStats: Array<{
      date: string
      views: number
      visits: number
      signups: number
      uniqueUsers: number
      uniqueLoggedInUsers: number
      uniqueAnonymousUsers: number
      signupUsernames: string[]
      loggedInUsernames: string[]
    }>
    portraitEvents: any[]
    activeUsers30min: number
    events30min: number
  } = {
    datestamp: new Date(),
    totals: {
      users: 0,
      squads: 0,
      units: 0
    },
    dailyStats: [],
    portraitEvents: [],
    activeUsers30min: 0,
    events30min: 0
  }
  
  // Get the stats
  // Totals: Users, squads, units
  const [users, squads, units, recentSignups] = await Promise.all([
    prisma.user.count(),
    prisma.squad.count(),
    prisma.unit.count(),
    prisma.user.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate
        }
      },
      select: {
        createdAt: true,
        userName: true
      }
    })
  ])

  stats.totals = { users, squads, units }

  const cutoff30m = new Date(Date.now() - 30 * 60 * 1000)
  const excludedIps = ['127.0.0.1', '::1', '76.98.82.81', '73.188.188.13', '73.165.66.83', '68.80.166.102', '192.168.1.103', '::ffff:192.168.1.103']
  const excludedUserIds = ['vince']

  const [pageViews, recentActiveUsers, events30m] = await Promise.all([
    prisma.webEvent.findMany({
      where: {
        datestamp: {
          gte: startDate,
          lt: endDate
        },
        userIp: {
          notIn: excludedIps
        },
        userId: {
          notIn: excludedUserIds
        }
      },
      select: { datestamp: true, userId: true, userIp: true, visitorId: true, visitId: true }
    }),
    prisma.webEvent.groupBy({
      by: ['visitorId'],
      where: {
        datestamp: { gte: cutoff30m },
        userIp: { notIn: excludedIps },
        userId: { notIn: excludedUserIds }
      },
      _count: { _all: true }
    }),
    prisma.webEvent.count({
      where: {
        datestamp: { gte: cutoff30m },
        // optional: match same IP filter as above
        userIp: { notIn: excludedIps },
        userId: { notIn: excludedUserIds }
      }
    })
  ])
  
  stats.activeUsers30min = recentActiveUsers.length
  stats.events30min = events30m

  // Group into { 'YYYY-MM-DD': count }
  const pageViewsPerDay: Record<string, number> = {}
  const visitorsPerDay = new Map<string, Set<string>>()
  const loggedInVisitorsPerDay = new Map<string, Set<string>>()
  const loggedInUserIdsPerDay = new Map<string, Set<string>>()
  const visitsPerDay = new Map<string, Set<string>>()

  for (const e of pageViews) {
    const date = toLocalIsoDate(e.datestamp)
    pageViewsPerDay[date] = (pageViewsPerDay[date] || 0) + 1

    // visitorId is null only for events predating the rs_visitor cookie; fall back
    // to the IP so those rows still count as a single visitor rather than dropping out
    const visitorKey = e.visitorId ?? e.userIp
    if (!visitorKey) continue

    if (!visitorsPerDay.has(date)) visitorsPerDay.set(date, new Set())
    visitorsPerDay.get(date)!.add(visitorKey)

    // A visitor who browses anonymously and then logs in the same day is one visitor,
    // counted on the logged-in side — never once in each bucket
    if (e.userId && e.userId !== '[anon]') {
      if (!loggedInVisitorsPerDay.has(date)) loggedInVisitorsPerDay.set(date, new Set())
      loggedInVisitorsPerDay.get(date)!.add(visitorKey)

      if (!loggedInUserIdsPerDay.has(date)) loggedInUserIdsPerDay.set(date, new Set())
      loggedInUserIdsPerDay.get(date)!.add(e.userId)
    }

    if (e.visitId) {
      if (!visitsPerDay.has(date)) visitsPerDay.set(date, new Set())
      visitsPerDay.get(date)!.add(e.visitId)
    }
  }

  // WebEvent stores the userId; the drill-down links need the userName
  const loggedInUserIds = Array.from(new Set(Array.from(loggedInUserIdsPerDay.values()).flatMap(ids => Array.from(ids))))
  const loggedInUsers = loggedInUserIds.length > 0
    ? await prisma.user.findMany({
      where: { userId: { in: loggedInUserIds } },
      select: { userId: true, userName: true }
    })
    : []
  const userNamesById = new Map(loggedInUsers.map(u => [u.userId, u.userName]))

  const signupsPerDay: Record<string, number> = {}
  const signupUsernamesPerDay = new Map<string, Set<string>>()

  for (const u of recentSignups) {
    const date = toLocalIsoDate(u.createdAt)
    signupsPerDay[date] = (signupsPerDay[date] || 0) + 1

    if (!u.userName) continue
    if (!signupUsernamesPerDay.has(date)) signupUsernamesPerDay.set(date, new Set())
    signupUsernamesPerDay.get(date)!.add(u.userName)
  }

  // Merge into array for frontend
  stats.dailyStats = days.map(date => {
    const visitors = visitorsPerDay.get(date)?.size ?? 0
    const loggedInUserIds = loggedInUserIdsPerDay.get(date) ?? new Set<string>()
    // Anonymous = visitors who never logged in that day, so a visitor who logs in
    // mid-session lands on the logged-in side only
    const anonymousVisitors = visitors - (loggedInVisitorsPerDay.get(date)?.size ?? 0)

    return {
      date,
      views: pageViewsPerDay[date] || 0,
      visits: visitsPerDay.get(date)?.size ?? 0,
      signups: signupsPerDay[date] || 0,
      uniqueUsers: visitors,
      uniqueLoggedInUsers: loggedInUserIds.size,
      uniqueAnonymousUsers: anonymousVisitors,
      signupUsernames: Array.from(signupUsernamesPerDay.get(date) ?? []),
      // Fall back to the raw userId for accounts deleted since the event was logged
      loggedInUsernames: Array.from(loggedInUserIds).map(id => userNamesById.get(id) ?? id).sort()
    }
  })

  return NextResponse.json(stats)
}

function getLastNDates(n: number): string[] {
  const dates: string[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < n; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    dates.push(d.toISOString().split('T')[0]) // 'YYYY-MM-DD'
  }

  return dates
}
