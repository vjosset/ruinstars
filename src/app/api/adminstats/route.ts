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

  const days = getLastNDates(9)
  const startDate = new Date(days[days.length - 1])
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 1) // to include today fully

  const stats: {
    datestamp: Date
    totals: { users: number; squads: number; units: number }
    dailyStats: Array<{
      date: string
      views: number
      signups: number
      uniqueUsers: number
      uniqueLoggedInUsers: number
      uniqueAnonymousUsers: number
      signupUsernames: string[]
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
  const excludedIps = ['127.0.0.1', '::1', '76.98.82.81', '73.188.188.13', '73.165.66.83', '68.80.166.102', '192.168.1.103']
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
      select: { datestamp: true, userId: true, userIp: true }
    }),
    prisma.webEvent.groupBy({
      by: ['userId', 'userIp'], // distinct concat equivalent
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
  const distinctLoggedInUsersPerDay = new Map<string, Set<string>>()
  const distinctAnonymousUsersPerDay = new Map<string, Set<string>>()

  for (const e of pageViews) {
    const date = toLocalIsoDate(e.datestamp)
    pageViewsPerDay[date] = (pageViewsPerDay[date] || 0) + 1

    if (e.userId && e.userId !== '[anon]') {
      if (!distinctLoggedInUsersPerDay.has(date)) distinctLoggedInUsersPerDay.set(date, new Set())
      distinctLoggedInUsersPerDay.get(date)!.add(e.userId)
    } else if (e.userIp) {
      if (!distinctAnonymousUsersPerDay.has(date)) distinctAnonymousUsersPerDay.set(date, new Set())
      distinctAnonymousUsersPerDay.get(date)!.add(e.userIp)
    }
  }

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
    const loggedIn = distinctLoggedInUsersPerDay.get(date)?.size ?? 0
    const anonymous = distinctAnonymousUsersPerDay.get(date)?.size ?? 0

    return {
      date,
      views: pageViewsPerDay[date] || 0,
      signups: signupsPerDay[date] || 0,
      uniqueUsers: loggedIn + anonymous,
      uniqueLoggedInUsers: loggedIn,
      uniqueAnonymousUsers: anonymous,
      signupUsernames: Array.from(signupUsernamesPerDay.get(date) ?? [])
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
