---
title: "Campaigns, Injuries, and Spoils of War"
date: "2026-05-03 12:00"
description: "Balancing the impact of injuries on campaign play"
tags: ["game design", "solo play", "coop play", "pve", "campaigns"]
coverImage: "/img/factions/SWARM.webp"
---

Ruinstars is built around the idea that every decision carries weight. Campaign play is where that weight accumulates: across three missions, across an operation, across a squad that's been through high-risk, high-reward missions. Injuries are supposed to be part of that story.

The problem is that right now, they're ending it.

### The Problem

During playtesting of the Last Signal campaign and a generated solo PvE run, a pattern kept emerging at TL2 and above: units get Taken Out, roll injuries, and either die or become liabilities. The squad enters the next mission weaker. More units get Taken Out. More injuries stack. By mission three, the squad is a collection of walking wounded fighting enemies that have only gotten harder.

This is the compounding injury spiral, and it feels bad at the table.

The root cause isn't just the injury table. It's a structural asymmetry:

- Injuries apply immediately, mid-operation  
BUT
- Mitigation (healing, Spoils of War) only applies at Homebase, after the operation ends

The negative effects land now. The tools to fight back come later. That gap is where campaigns fall apart.

There's also a dice problem. Ruinstars runs on D6. On a six-point scale, a single point is roughly 17% of the entire range. A -1 SKL injury doesn't make a unit worse, it fundamentally changes what that unit can do. A unit that hits on a 4 now hits on a 3. A -1 ARM on a unit with ARM 2 is nearly a death sentence. The injury table was designed with flavor in mind, but on a D6, every stat penalty is enormous.

### What We've Already Changed

Three changes are already in the rules.

#### MP scoring no longer requires extraction

Previously, completing objectives only scored MP if the squad extracted. That gate was too punishing: squads that fought hard and got wiped still walked away with nothing. Now, Destroy and Control and Activate objectives score MP regardless of extraction. Only Search and Recover still requires extraction, because you have to actually carry the thing out.

Extraction is now a survival gate, not a scoring gate. Units that don't extract still roll for injury.

#### Squads can remove one injury from one unit between missions

This represents field dressing under pressure: the squad has time to address one wound, not a full recovery. It softens the mid-operation spiral without eliminating it.

#### Spoils of War are Cheaper

All Spoils of War now cost 3 MP instead of 4 in PvE campaigns. This gives Squads a better opportunity to prepare for the next operation against a steep difficulty ramp.

### What We're Changing Next

These changes help. They don't solve the problem.

After working through a range of options, three changes stood out as the right combination of impact, simplicity, and tone.

#### Injury rolls of 1-2 are "No injury"

Previously the table had a 1-in-6 chance of recovery. That's not enough. Doubling the odds to 1-in-3 means injuries are still real and common, but the spiral is slower. Units get hurt. They don't always get hurt every time they go down.

#### All injuries apply -1 starting HIT

The injury names stay: Broken Arm, Nerve Damage, Crushed Leg, Damaged Armor, Deep Wound. The deceased trigger stays: roll an injury you already have and the unit is gone. But the mechanical effect is the same across the board: one less HIT to start the next mission.

This solves two problems at once. First, it eliminates the lottery of crippling effects. A Crushed Leg no longer destroys a melee unit's positioning. Nerve Damage no longer renders a ranged specialist useless. Second, HIT is visible and felt every activation. A unit at 2 HIT instead of 3 is a constant reminder that something is wrong. A -1 SKL on a weapon is easy to forget mid-mission, especially for players who know their squad's stats by heart. Nobody forgets they only have 2 HIT left.

The deceased condition still works cleanly. A unit at 1 HIT with a second injury drops to 0 HIT and is deceased. The math handles the edge case without needing a special rule.

#### Each Standing, injured unit generates +1 TO at the start of each Turn

This is the escape hatch.

The asymmetry problem (injuries now, mitigation later) doesn't fully go away with the changes above. What changes is that injured squads get an in-operation compensation that scales with how badly hurt they are. A squad with three injured units rolling for TO has more tactical flexibility than a fresh squad. They need it.

This also does something the other changes don't: it creates moments. An injured unit burning TO to push through a critical activation, to land a shot that saves the mission, to do something that shouldn't have been possible. That's the story campaign play is _supposed_ to tell.

### Options We Considered and Set Aside

A few other approaches came up during design and are worth noting.

- **Buff/debuff injuries**  
  Each injury paired with a penalty and a bonus, representing the unit adapting to their wound. Interesting in theory, but it doubles the tracking burden and reintroduces the "remember your injury mid-activation" problem the -1 HIT change solves.
- **Injury table with positive results**  
  Rolling 2D6, with low results generating buffs and high results generating debuffs. The bell curve is elegant but the fiction is hard to land. An injury that makes a unit stronger requires a narrative justification that doesn't always hold up, and it adds a second die to the injury roll.
- **Free basic action for injured units**  
  Injured units could perform one free basic action per activation, representing desperation and adrenaline. Mechanically interesting but harder to scope. Combat actions on the basic action list mean a hurt unit could become an offensive threat, which pushes into "injury as reward" territory. The TO generation covers the same narrative ground with less risk.

### What Comes Next

The three selected changes above have not yet been playtested against the full campaign structure. The goal is to reduce the injury spiral without eliminating the stakes. Campaigns should still feel desperate, and units should still be at real risk. The question is whether the escape hatch is wide enough without becoming a shortcut.

If you've played campaigns with persistent injuries in other games, what worked? What made the difference between a compelling slog and a frustrating one?
