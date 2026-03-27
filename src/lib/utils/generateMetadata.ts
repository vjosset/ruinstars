import { GAME } from '@/lib/config/game_config'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import removeMd from 'remove-markdown'

interface MetadataImage {
  url: string
  width?: number
  height?: number
  alt?: string
}

interface MetadataParams {
  title?: string
  description?: string
  images?: MetadataImage[]
  keywords?: string[]
  pagePath: string
}

export async function generatePageMetadata({
  title,
  description,
  images = [],
  keywords = [],
  pagePath = '/'
}: MetadataParams): Promise<Metadata> {
  const headersList = headers()
  const host = (await headersList).get('host')
  const baseUrl = `https://${host}`

  const canonicalUrl = baseUrl + pagePath

  // Default values
  const pageTitle = title ? `${title} - ${GAME.NAME}` : `${GAME.NAME} - Free Sci-Fi Skirmish Wargame`
  
  // Remove markdown formatting from descriptions (e.g. squadType descriptions)
  const pageDescription = removeMd(description ?? 'Free sci-fi skirmish wargame with solo and co-op PvE campaigns, PvP missions, and Horde Mode. Miniatures-agnostic, D6 only, 45-90 minutes. Download the rules and start playing today.')

  const normalizedImages = images.map((img) => ({
    url: img.url.startsWith('http') ? img.url : `${baseUrl}${img.url}`,
    width: img.width || 1200,
    height: img.height || 630,
    alt: img.alt || pageTitle,
  }))

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      'ruinstars',
      'killteam alternative', 
      'killteam free',
      ...keywords,  // Page-specific keywords,
      'skirmish game',
      'wargame',
      'free',
      'alternative',
      'grimdark',
      'sci-fi',
      'miniatures',
      'list builder',
      'battle tracker',
      'dashboard'
    ],

    // Canonical URL for SEO
    alternates: {
      canonical: canonicalUrl,
    },
    
    // OpenGraph
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: baseUrl,
      siteName: GAME.NAME,
      images: normalizedImages,
      type: 'website',
      locale: 'en_US',
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: normalizedImages,
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
    },
    
    metadataBase: new URL(baseUrl),
  }
}
