export type HordeTurnEvent = {
  eventId: string
  title: string
  description: string
}

export const HordeTurnEvents : HordeTurnEvent[] = [
  {
    eventId: '1',
    title: 'Tactical Opportunity',
    description: 'All Player Units may immediately perform one free Basic Action.'
  },
  {
    eventId: '2',
    title: 'Field Surgery',
    description: 'One Standing Player Unit immediately regains one lost `HIT`'
  },
  {
    eventId: '3',
    title: 'Command Override',
    description: 'Player Squad gains 2 `TO`'
  },
  {
    eventId: '4',
    title: 'Comms Interference',
    description: 'Player Squad loses 2 `TO`'
  },
  {
    eventId: '5',
    title: 'Horde Surge',
    description: 'All Standing NPC Units immediately perform one free action according to their Behavior'
  },
  {
    eventId: '6',
    title: 'Enemy Reinforcements',
    description: 'Roll `1D6` and spawn enemies on random Anchors according to the NPC Spawn Table at current TL.'
  },
]
