import PageTitle from '@/components/ui/PageTitle'
import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { getSquadPortraitUrl } from '@/lib/utils/imageUrls'
import { userPath } from '@/lib/utils/utils'
import { UserService } from '@/services'
import { getAuthSession } from '@/src/lib/auth'
import { Squad } from '@/types/squad.model'
import { notFound } from 'next/navigation'
import UserPageClient from './UserPageClient'
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ userName: string }> }) {
  const { userName } = await params
  let lookupName = userName
  try { lookupName = decodeURIComponent(userName) } catch {}
  const user = await UserService.getUserByUsername(lookupName)

  if (!user) {
    return {
      title: 'User Not Found',
    }
  }

  const imageUrls = user.squads?.
    filter((r) => r.hasCustomPortrait).
    map((r) => getSquadPortraitUrl(r.squadId)).
    slice(0, 5)
  
  if (!imageUrls || imageUrls.length < 1) {
    if (user.squads?.[0]) {
      imageUrls?.push(`/img/squadTypes/${user.squads?.[0]?.squadType?.squadTypeId}.webp`)
    }
  }

  return generatePageMetadata({
    title: `${user.userName}'s Squads`,
    description: `View and import ${user.userName}'s squads on ${GAME.NAME}.`,
    images: imageUrls?.map((img) => {
      return { url: img}
    }),
    keywords: [user.userName, 'user', 'squads'],
    pagePath: userPath(user.userName)
  })
}

export default async function UserPage({ params }: { params: Promise<{ userName: string }> }) {
  const { userName } = await params
  let lookupName = userName
  try { lookupName = decodeURIComponent(userName) } catch {}

  const session = await getAuthSession()

  const user = await UserService.getUserByUsername(lookupName)

  if (!user) return notFound()

  const isOwner = session?.user?.userId === user.userId

  return (
    <div className="px-1 py-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <PageTitle>
          {user.userName}
        </PageTitle>
      </div>
      
      <UserPageClient 
        squads={user.squads?.map((squadData) => new Squad(squadData).toPlain()) || []}
        isOwner={isOwner}
        userName={user.userName}
      />
    </div>
  )
}
