import { GAME } from '@/lib/config/game_config'
import { Metadata } from 'next'
import { headers } from 'next/headers'

interface MetadataParams {
  title?: string
  description?: string
  image?: {
    url: string
    width?: number
    height?: number
    alt?: string
  }
  keywords?: string[],
  pagePath: string
}

export async function generatePageMetadata({
  title,
  description,
  image,
  keywords = [],
  pagePath = '/'
}: MetadataParams): Promise<Metadata> {
  const headersList = headers()
  const host = (await headersList).get('host')
  const baseUrl = `https://${host}`

  const canonicalUrl = baseUrl + pagePath

  // Default values
  const pageTitle = title ? `${title} - ${GAME.NAME}` : GAME.NAME
  const pageDescription = description || `${GAME.NAME} is a free fast-paced miniatures-agnostic sci-fi skirmish wargame set in a galaxy filled with dangers.`
  const pageImage = image ? {
    url: image.url.startsWith('http') ? image.url : `${baseUrl}${image.url}`,
    width: image.width || 1200,
    height: image.height || 630,
    alt: image.alt || pageTitle,
  } : {
    url: `${baseUrl}/img/hero01.webp`,
    width: 1200,
    height: 630,
    alt: GAME.NAME,
  }

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      'ruinstars',
      ...keywords,  // Page-specific keywords,
      'skirmish game',
      'wargame',
      'free',
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
      images: [pageImage],
      type: 'website',
      locale: 'en_US',
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageImage.url]
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
    },
    
    metadataBase: new URL(baseUrl),
  }
}
