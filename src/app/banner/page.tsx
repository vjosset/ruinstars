import { GAME } from '@/lib/config/game_config'
import type { Metadata } from 'next'

// Utility page: renders a clean banner (background + logo + title) for screenshotting (e.g. itch.io header).
// Size the frame with query params, e.g. /banner?w=960&h=300 (defaults to 960x300).

export const metadata: Metadata = {
  title: `${GAME.NAME} Banner`,
  robots: { index: false, follow: false },
}

function toSize(value: string | string[] | undefined, fallback: number) {
  const n = parseInt(Array.isArray(value) ? value[0] : value ?? '', 10)
  return Number.isFinite(n) && n > 0 ? Math.min(n, 4000) : fallback
}

export default async function BannerPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams
  const width = toSize(params.w, 960)
  const height = toSize(params.h, 300)
  const logoSize = Math.round(height * 0.55)

  return (
    // Fixed full-screen layer hides the site nav bars and popups from the root layout
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-auto">
      <div
        className="relative shrink-0 overflow-hidden"
        style={{
          width,
          height,
          backgroundImage: 'url(\'/img/ui/mech02.png\')',
          backgroundPosition: 'center 30%',
          backgroundSize: 'cover',
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.85))' }}
        />
        <div className="relative h-full flex items-center justify-center" style={{ gap: Math.round(height * 0.08) }}>
          <img
            src="/icons/icon-big.png"
            alt={`${GAME.NAME} logo`}
            className="glowbox"
            style={{ width: logoSize, height: logoSize, borderRadius: logoSize * 0.12 }}
          />
          <h1 className="glowtext leading-none" style={{ fontSize: Math.round(height * 0.3) }}>
            {GAME.NAME}
          </h1>
        </div>
      </div>
    </div>
  )
}
