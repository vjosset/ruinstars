export type MissionBattlefield = {
  battlefieldId: string;
  title: string;
  effectName: string;
  effect: string;
};

export const MissionBattlefields: MissionBattlefield[] = [
  {
    battlefieldId: 'CITY',
    title: 'The Ruined City',
    effectName: 'Collapse',
    effect: 'The battlefield itself is killing you. At the start of each Turn after the first, roll for a random Anchor. All terrain within 4" of that Anchor is removed from the battlefield, and all Units within 4" of that Anchor take 2 Damage.',
  },
  {
    battlefieldId: 'FAC',
    title: 'The Facility',
    effectName: 'Darkness',
    effect: 'At the start of each Turn after the first, select one random Anchor. Until the end of the Turn, Units within 4" of that Anchor cannot be targeted in Ranged Combat.',
  },
  {
    battlefieldId: 'JUNG',
    title: 'The Jungle',
    effectName: 'Miasmic Mist',
    effect: 'At the start of each Turn after the first, select one random Standing Unit from each Squad. That Unit moves 2" three times in random directions (roll three times). This does not trigger Attacks of Opportunity. If that Unit cannot make a valid move because of a wall or other obstacle, it takes 1 Melee Damage.',
  },
  {
    battlefieldId: 'HIVE',
    title: 'The Alien Hive',
    effectName: 'Noxious Gas',
    effect: 'At the start of each Turn after the first, select one random Anchor. All Units within 4" of that Anchor take 1 Damage.',
  },
  {
    battlefieldId: 'TEMPLE',
    title: 'The Cursed Temple',
    effectName: 'Haunting Spirits',
    effect: 'At the start of each Turn after the first, select one random Unit from each Squad. That Unit is overtaken by the temple\'s restless spirits and immediately attacks the closest Unit in Combat, Squadmate or enemy.',
  },
  {
    battlefieldId: 'RIFT',
    title: 'The Rift',
    effectName: 'Shifting Realities',
    effect: 'At the start of each Turn after the first, select one random Anchor, then roll `1D6`. **1-3:** All Units within 4" of that Anchor immediately move 2" directly toward it. **4-6:** All Units within 4" of that Anchor immediately move 2" directly away from it. This does not trigger Attacks of Opportunity.',
  },
  {
    battlefieldId: 'TRENCH',
    title: 'The Trenches',
    effectName: 'Artillery Strike',
    effect: 'At the start of each Turn after the first, select one random Anchor. All Units not in Cover that are within 4" of that Anchor are immediately Pinned. Pinned Units must spend one additional `ACT` each time they perform the Move action during this Turn.',  },
  {
    battlefieldId: 'BAD',
    title: 'Badlands',
    effectName: 'Rad Exposure',
    effect: 'At the start of each Turn after the first, each Standing Unit rolls `1D6`. Results above that Unit\s `ARM` score cause that Unit to gain 1 Rad Counter. At the start of each Turn, all Units take damage equal to their Rad Counters.',
  },
  {
    battlefieldId: 'DER',
    title: 'Void Derelict',
    effectName: 'Hull Breach',
    effect: 'At the start of each Turn after the first, select one random Anchor. A hull breach opens: all Units within 3" of that Anchor must pass an ARM test or be dragged 3" directly toward that Anchor. Units dragged into a wall or other Unit take 1 Damage. This does not trigger Attacks of Opportunity.',
  },
]
