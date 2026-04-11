export type PveBattlefield = {
  battlefieldId: string;
  title: string;
  effectName: string;
  effect: string;
};

export const PveBattlefields: PveBattlefield[] = [
  {
    battlefieldId: '1',
    title: 'The Ruined City',
    effectName: 'Collapse',
    effect: 'The battlefield itself is killing you. At the start of each Turn after the first, roll for a random Anchor. All terrain within 4" of that Anchor is removed from the battlefield, and all Units within 4" of that Anchor take 2 Damage.',
  },
  {
    battlefieldId: '2',
    title: 'The Facility',
    effectName: 'Darkness',
    effect: 'At the start of each Turn after the first, select one random Anchor. Until the end of the Turn, Units within 4" of that Anchor cannot be targeted in Ranged Combat.',
  },
  {
    battlefieldId: '3',
    title: 'The Jungle',
    effectName: 'Miasmic Mist',
    effect: 'At the start of each Turn after the first, select one random Standing Unit from each Squad. That Unit moves 2" three times in random directions (roll three times). This does not trigger Attacks of Opportunity. If that Unit cannot make a valid move because of a wall or other obstacle, it takes 1 Melee Damage.',
  },
  {
    battlefieldId: '4',
    title: 'The Alien Hive',
    effectName: 'Noxious Gas',
    effect: 'At the start of each Turn after the first, select one random Anchor. All Units within 4" of that Anchor take 1 Damage.',
  },
  {
    battlefieldId: '5',
    title: 'The Cursed Temple',
    effectName: 'Haunting Spirits',
    effect: 'At the start of each Turn after the first, select one random Unit from each Squad. That Unit is overtaken by the temple\'s restless spirits and immediately attacks the closest Unit in Combat, Squadmate or enemy.',
  },
  {
    battlefieldId: '6',
    title: 'The Rift',
    effectName: 'Shifting Realities',
    effect: 'At the start of each Turn after the first, select one random Anchor, then roll `1D6`. **1-3:** All Units within 4" of that Anchor immediately move 2" directly toward it. **4-6:** All Units within 4" of that Anchor immediately move 2" directly away from it. This does not trigger Attacks of Opportunity.',
  },
]
