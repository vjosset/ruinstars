import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import HordeModeQuickRef from './hordemode-quickref'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Horde Mode Quick Reference',
    description: `Quick reference card for Horde Mode in ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{ url: '/icons/icon-big.png', width: 512, height: 512 }],
    keywords: ['free', 'rules', 'horde mode', 'quick reference', 'pdf'],
    pagePath: '/rules/hordemode/quickref'
  })
}

export default function HordeModeQuickRefPage() {
  return (
    <div className="rules px-3 max-w-7xl mx-auto">
      <h1 className="text-center py-6 font-title">Horde Mode — Quick Reference</h1>
      <HordeModeQuickRef />
    </div>
  )
}
