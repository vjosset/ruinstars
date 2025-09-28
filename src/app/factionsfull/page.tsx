import { GAME } from '@/lib/config/game_config'
import { FactionService } from '@/services'

export const metadata = {
  title: `Factions - ${GAME.NAME}`,
  description: `Browse all Factions and Squad Types in ${GAME.NAME} and choose your squad's allegiance.`,
}

export default async function FactionsPage() {
  const factions = await FactionService.getAllFactions()
  const md = [
    '# Factions and Squad Types',
    '',
    `${GAME.NAME} is home to rival powers vying for dominance. Each faction and squad type brings distinct tactics, units, and battlefield philosophies.`,
    '',
    '## Index',
    ...factions.map((f) => `- [${f.factionName} (${f.factionId})](#faction-${f.factionId.toLowerCase()})`),
    '',
    '---',
    '',
    ...factions.flatMap((faction) => {
      const factionBlock = [
        `<a id="faction-${faction.factionId.toLowerCase()}"></a>`,
        `## Faction: ${faction.factionName} (${faction.factionId})`,
        '',
        `ID: \`${faction.factionId}\` • Order: ${faction.seq}`,
        '',
        faction.description,
        '',
        `> ${faction.lore}`,
        '',
        '### Squad Types',
        '',
        faction.squadTypes?.length ? '' : '_No known squad types._',
        '',
      ].filter(Boolean).join('\n')

      const squadTypesBlock = (faction.squadTypes ?? [])
        .map((st) => [
          `#### ${st.squadTypeName} (${st.squadTypeId})`,
          '',
          `- ID: \`${st.squadTypeId}\` • Order: ${st.seq}`,
          `- Link: /squadTypes/${st.squadTypeId}`,
          '',
          st.description,
          '',
          `> ${st.lore}`,
          '',
        ].join('\n'))
        .join('\n')

      return [factionBlock, squadTypesBlock, '---', '']
    }),
  ].join('\n')
  return (
    <div className="px-1 py-8 max-w-7xl mx-auto">
      <textarea className="w-full h-[70vh] font-mono text-sm" defaultValue={md} readOnly />
    </div>
  )
}
