// @ts-ignore
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://ruinstars.com'

  // Static URLs
  const staticUrls = [
    '/',
    '/rules',
    '/squadTypes',
    '/auth/login',
    '/auth/signup',
    '/tools',
  ]

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

  const dynamicUrls = [
    ...squadTypes.map((squadType: { squadTypeId: string }) => `/squadTypes/${squadType.squadTypeId}`),
    ...users.map((user: { userName: string }) => `/users/${user.userName}`),
    ...squads.map((squad: { squadId: string }) => `/squads/${squad.squadId}`),
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
