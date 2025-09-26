import { getAuthSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { toLocalIsoDate } from '@/lib/utils/utils'
import { NextResponse } from 'next/server'

// Get the stats
export async function GET() {
  const session = await getAuthSession()
  if (!session?.user || session.user.userId != 'vince') return new NextResponse('Unauthorized', { status: 401 })

  const days = getLastNDates(9)
  const startDate = new Date(days[days.length - 1])
  const endDate = new Date()
  endDate.setDate(endDate.getDate() + 1) // to include today fully

  const stats: {
    datestamp: Date
    totals: { users: number; squads: number; units: number }
    dailyStats: Record<string, any>
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
    dailyStats: {},
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
        createdAt: true
      }
    })
  ])

  stats.totals = { users, squads, units }

  const cutoff30m = new Date(Date.now() - 30 * 60 * 1000)
  const excludedIps = ['127.0.0.1', '::1', '76.98.82.81', '73.188.188.13', '73.165.66.83', '68.80.166.102']
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
  const distinctUsersPerDay = new Map<string, Set<string>>()

  for (const e of pageViews) {
    const date = toLocalIsoDate(e.datestamp)
    pageViewsPerDay[date] = (pageViewsPerDay[date] || 0) + 1

    let userIdentifier: string | null = null
    if (e.userId && e.userId !== '[anon]') {
      userIdentifier = e.userId
    } else if (e.userIp) {
      userIdentifier = e.userIp
    }

    if (!userIdentifier) continue
    if (!distinctUsersPerDay.has(date)) distinctUsersPerDay.set(date, new Set())
    distinctUsersPerDay.get(date)!.add(userIdentifier)
  }

  const signupsPerDay: Record<string, number> = {}

  for (const u of recentSignups) {
    const date = toLocalIsoDate(u.createdAt)
    signupsPerDay[date] = (signupsPerDay[date] || 0) + 1
  }

  // Merge into array for frontend
  stats.dailyStats = days.map(date => ({
    date,
    views: pageViewsPerDay[date] || 0,
    signups: signupsPerDay[date] || 0,
    uniqueUsers: distinctUsersPerDay.get(date)?.size ?? 0
  }))

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
