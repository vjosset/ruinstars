import PageTitle from '@/components/ui/PageTitle'
import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { UserService } from '@/services'
import { getAuthSession } from '@/src/lib/auth'
import { Squad } from '@/types/squad.model'
import { notFound } from 'next/navigation'
import UserPageClient from '../UserPageClient'
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ userName: string }> }) {
  const { userName } = await params
  const user = await UserService.getUserByUsername(userName)

  if (!user) {
    return {
      title: 'User Not Found',
    }
  }

  return generatePageMetadata({
    title: `${user.userName}'s Squads`,
    description: `View and import ${user.userName}'s squads on ${GAME.NAME}.`,
    image: {
      url: '/img/hero01.webp',
    },
    keywords: [user.userName, 'user', 'squad', 'squad builder', 'battle tracker'],
    pagePath: `/users/${user.userName}`
  })
}

export default async function UserPage({ params }: { params: Promise<{ userName: string }> }) {
  const { userName } = await params

  const session = await getAuthSession()

  const user = await UserService.getUserByUsername(userName)

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
