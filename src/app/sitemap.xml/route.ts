import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://ruinstars.com'

  // Static URLs
  const staticUrls = [
    '/',
    '/rules',
    '/factions',
    '/auth/login',
    '/auth/signup',
  ]

  // Fetch factions
  const factions = await prisma.faction.findMany({
    select: { factionId: true },
  })

  // Fetch squads
  const squads = await prisma.squad.findMany({
    select: { squadId: true },
  })

  // Fetch users
  const users = await prisma.user.findMany({
    select: { userName: true },
  })

  const dynamicUrls = [
    ...factions.map(faction => `/factions/${faction.factionId}`),
    ...users.map(user => `/users/${user.userName}`),
    ...squads.map(squad => `/squads/${squad.squadId}`),
  ]

  // Build full list of URLs
  const urls = [...staticUrls, ...dynamicUrls]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
    .map(
      url => `
      <url>
        <loc>${baseUrl}${url}</loc>
      </url>`
    )
    .join('')}
  </urlset>`

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
