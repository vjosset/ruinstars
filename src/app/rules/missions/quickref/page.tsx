import MissionsQuickRef from './missions-quickref'
import { GAME } from '@/lib/config/game_config'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Missions - Quick Ref',
    description: `One-page Quick Reference for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [{ url: '/icons/icon-big.png', width: 512, height: 512 }],
    keywords: ['free', 'rules', 'pdf'],
    pagePath: '/rules/missions/quickref'
  })
}

export default async function QuickRefPveMissions() {
  return (
    <>
      <h3 className="text-main">Ruinstars - Missions Quick Ref</h3>
      <MissionsQuickRef />
    </>
  )}
