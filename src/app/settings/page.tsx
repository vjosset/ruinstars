import SettingsForm from '@/components/tools/SettingsForm'
import PageTitle from '@/components/ui/PageTitle'
import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Settings',
    description: `Manage your ${GAME.NAME} account settings.`,
    images: [{ url: '/icons/icon-big.png', width: 512, height: 512 }],
    keywords: ['settings', 'account'],
    pagePath: '/settings'
  })
}

export default function SettingsPage() {
  return (
    <div className="px-1 py-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <PageTitle>Settings</PageTitle>
      </div>
      <div className="w-full max-w-md mx-auto px-2">
        <SettingsForm />
      </div>
    </div>
  )
}
