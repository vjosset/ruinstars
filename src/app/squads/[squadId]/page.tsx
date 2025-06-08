import { getAuthSession } from '@/lib/auth'
import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { SquadService } from '@/services'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SquadPageClient from '../SquadPageClient'

export async function generateMetadata({ params }: { params: Promise<{ squadId: string }> }): Promise<Metadata> {
  const { squadId } = await params
  const squad = await SquadService.getSquad(squadId)

  if (!squad) {
    return {
      title: 'Squad Not Found',
    }
  }

  return generatePageMetadata({
    title: `${squad.squadName} by ${squad.user?.userName}`,
    description: `A ${squad.faction?.factionName} Squad for ${GAME.NAME}`,
    image: {
      url: `/img/factions/${squad.faction?.factionId}.webp`,
    },
    keywords: [squad.squadName, squad.faction?.factionName ?? '', 'squad', 'squad builder', 'battle tracker'],
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
    <div className="px-1 py-8 max-w-7xl mx-auto">
      <SquadPageClient initialSquad={squad.toPlain()} isOwner={isOwner} />
    </div>
  )
}
