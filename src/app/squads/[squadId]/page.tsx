import { getAuthSession } from '@/lib/auth'
import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { getSquadPortraitUrl, getUnitPortraitUrl, toEpochMs } from '@/lib/utils/imageUrls'
import { SquadService } from '@/services'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SquadPageClient from './SquadPageClient'

export async function generateMetadata({ params }: { params: Promise<{ squadId: string }> }): Promise<Metadata> {
  const { squadId } = await params
  const squad = await SquadService.getSquad(squadId)

  if (!squad) {
    return {
      title: 'Squad Not Found',
    }
  }

  const images: string[] = []
  if (squad.hasCustomPortrait) {
    images.push(getSquadPortraitUrl(squad.squadId))
  }
  squad.units?.
    filter(unit => unit.hasCustomPortrait).
    map(unit => unit.hasCustomPortrait && images.push(`${getUnitPortraitUrl(unit.unitId)}?v=${toEpochMs(unit.portraitUpdatedAt)}`))

  // Use only the first 3 images. For cards that show multiple images (e.g. Discord), it should put the squad image large, plus 2 smaller images for the first two units
  return generatePageMetadata({
    title: `${squad.squadName} by ${squad.user?.userName}`,
    description: `${squad.squadType?.squadTypeName} Squad for ${GAME.NAME}`,
    images: 
      images.length > 0
        ? images.splice(0, 5).map((img) => ({url: img}))
        : [{
          url: `/img/squadTypes/${squad.squadType?.squadTypeId}.webp`,
        }],
    keywords: ['squad', squad.user?.userName ?? 'user', squad.squadName, squad.squadType?.squadTypeName ?? ''],
    pagePath: `/squads/${squad.squadId}`
  })
}

export default async function SquadPage({ params }: { params: Promise<{ squadId: string }> }) {
  const { squadId } = await params
  const squad = (await SquadService.getSquad(squadId))

  if (!squad) notFound()

  const session = await getAuthSession()
  const isOwner = session?.user?.userId === squad.userId

  return (
    <div className="mx-auto">
      <SquadPageClient initialSquad={squad.toPlain()} isOwner={isOwner} />
    </div>
  )
}
