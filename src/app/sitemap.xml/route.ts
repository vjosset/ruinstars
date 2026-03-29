import { getAllSlugs } from '@/lib/posts'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

// Force dynamic server-side render for this page instead of static at build time
export const dynamic = 'force-dynamic'

export async function GET() {
  const baseUrl = 'https://ruinstars.com'

  // Static URLs
  const staticUrls = [
    '/',
    '/rules',
    '/factions',
    '/squadTypes',
    '/auth/login',
    '/auth/signup',
    '/tools',
    '/assets/books/Core Rules - Ruinstars.pdf',
    '/assets/books/Factions - Ruinstars.pdf',
    '/assets/books/PvE Missions - Ruinstars.pdf',
    '/assets/books/PvP Missions - Ruinstars.pdf',
    '/assets/books/Horde Mode - Ruinstars.pdf',
  ]

  // Fetch factions
  const factions = await prisma.faction.findMany({
    select: { factionId: true },
  })

  // Fetch squadTypes
  const squadTypes = await prisma.squadType.findMany({
    select: { squadTypeId: true },
  })

  // Fetch squads
  const squads = await prisma.squad.findMany({
    select: { squadId: true },
  })

  // Fetch users
  const users = await prisma.user.findMany({
    select: { userName: true },
  })

  // Fetch blog posts
  const blogSlugs = getAllSlugs()

  // Combine everything
  const dynamicUrls = [
    ...factions.map((faction: { factionId: string }) => `/factions/${faction.factionId}`),
    ...squadTypes.map((squadType: { squadTypeId: string }) => `/squadTypes/${squadType.squadTypeId}`),
    ...blogSlugs.map(slug => `/blog/${slug}`),
    ...users.map((user: { userName: string }) => `/users/${user.userName}`),
    ...squads.map((squad: { squadId: string }) => `/squads/${squad.squadId}`),
    '/blog',
  ]

  // Build full list of URLs
  const urls = [...staticUrls, ...dynamicUrls]

  // Build the final output
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
