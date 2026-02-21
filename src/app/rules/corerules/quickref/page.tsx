import RulesQuickRef from '../sections/rules-quickref'
import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Quick Ref',
    description: `One-page Quick Reference for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{
      url: '/icons/icon-big.png',
    }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules/corerules/quickref'
  })
}

export default async function QuickRefCoreRules() {
  return (
    <RulesQuickRef />
  )}