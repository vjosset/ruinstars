import HordeModeQuickRef from '../sections/rules-horde-quickref'
import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Horde Mode - Quick Ref',
    description: `One-page Quick Reference for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{
      url: '/icons/icon-big.png',
    }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules/hordemode/quickref'
  })
}

export default async function QuickRefHordeMode() {
  return (
    <HordeModeQuickRef />
  )}
