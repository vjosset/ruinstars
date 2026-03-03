'use client'

import { getSquadPortraitUrl, getUnitPortraitUrl, toEpochMs } from '@/lib/utils/imageUrls'
import { SquadPlain } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SquadTypeLink, UserLink } from '../nav/Links'

type SquadCardProps = {
  squad: SquadPlain
  isOwner: boolean
  showUserLink?: boolean
  showSquadTypeLink?: boolean
  onMoveUp?: () => void
  onMoveFirst?: () => void
  onMoveDown?: () => void
  onMoveLast?: () => void
  onDelete?: (squadId: string) => void
}

export default function SquadSpotlightCard({
  squad,
  showUserLink = true,
  showSquadTypeLink = true
}: SquadCardProps) {
  const heroUrl = squad.hasCustomPortrait
    ? `${getSquadPortraitUrl(squad.squadId)}?v=${toEpochMs(squad.portraitUpdatedAt)}`
    : `/img/squadTypes/${squad.squadTypeId}_thumb.webp`

  const [activeUnitId, setActiveUnitId] = useState<string | null>(null)

  useEffect(() => {
    setActiveUnitId(null)
  }, [squad.squadId])

  const displayUrl = activeUnitId
    ? `${getUnitPortraitUrl(activeUnitId)}?v=${toEpochMs(squad.units?.find(u => u.unitId === activeUnitId)?.portraitUpdatedAt)}`
    : heroUrl

  function handleUnitClick(unitId: string) {
    setActiveUnitId(prev => prev === unitId ? null : unitId)
  }

  return (
    <>
      <div className="group relative border border-border rounded overflow-hidden hover:border-main transition-colors duration-200">

        {/* Hero portrait */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3 / 2' }}>
          {/* Image + gradient - full-area link */}
          <Link href={`/squads/${squad.squadId}`} className="absolute inset-0 z-0">
            <img
              src={displayUrl}
              loading="lazy"
              decoding="async"
              alt={`${squad.squadName} squad portrait`}
              className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-95 group-hover:scale-[1.02] transition-all duration-400"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,.7) 75%, rgba(0,0,0,1) 100%)' }}
            />
          </Link>
          {/* Text overlay - sibling of the link, so nested <a> tags are avoided */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-2 z-10">
            <Link href={`/squads/${squad.squadId}`}>
              <h3 className="font-title text-white text-2xl uppercase tracking-wide leading-none mb-2 hover:text-main transition-colors" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                {squad.squadName}
              </h3>
            </Link>
            <div className="flex items-center gap-2 flex-wrap">
              {showSquadTypeLink && squad.squadType?.squadTypeName && (
                <SquadTypeLink squadTypeId={squad.squadTypeId} squadTypeName={squad.squadType.squadTypeName} />
              )}
              by
              {showUserLink && squad.user?.userName && (
                <UserLink userName={squad.user.userName} />
              )}
            </div>
          </div>
        </div>

        {/* Unit strip */}
        {squad.units && squad.units.filter((unit) => unit.hasCustomPortrait).length > 0 && (
          <div className="bg-card border-t border-border px-3 py-2 flex gap-1.5 items-center overflow-x-auto">
            {/* Squad portrait thumbnail - resets hero to squad view */}
            <button
              type="button"
              title={squad.squadName}
              onClick={() => setActiveUnitId(null)}
              className={`w-10 h-10 rounded overflow-hidden flex-shrink-0 border transition-all duration-200 relative hover:scale-110 hover:z-10 mr-1 ${
                activeUnitId === null
                  ? 'border-main scale-110 z-10 brightness-100'
                  : 'border-border brightness-[0.8] hover:brightness-100 hover:border-main'
              }`}
            >
              <img src={heroUrl} alt={squad.squadName} className="w-full h-full object-cover" loading="lazy" decoding="async" />
            </button>
            {squad.units.filter((unit) => unit.hasCustomPortrait).map(unit => (
              <button
                key={unit.unitId}
                type="button"
                title={unit.unitName}
                onClick={() => handleUnitClick(unit.unitId)}
                className={`w-10 h-10 rounded overflow-hidden flex-shrink-0 border transition-all duration-200 relative hover:scale-110 hover:z-10 ${
                  activeUnitId === unit.unitId
                    ? 'border-main scale-110 z-10 brightness-100'
                    : 'border-border brightness-[0.8] hover:brightness-100 hover:border-main'
                }`}
              >
                <img
                  src={`${getUnitPortraitUrl(unit.unitId)}?v=${toEpochMs(unit.portraitUpdatedAt)}`}
                  alt={unit.unitName}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
