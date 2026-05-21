---
title: "Combat Saves and Weapon Updates"
date: "2026-05-21 12:00"
description: "How we rolled fewer dice and made combat deadlier"
tags: ["game design", "combat", "balance"]
coverImage: "/img/factions/CRS.webp"
---

In current rules and weapon setups, we roll one save die for each point of damage dealt by the attacker. With Ranged Combat rules saying that a critical save blocks two points of damage, it means that more damage gives more chances for the target to roll critical saves, often resulting in save rolls that block more damage than was originally inflicted. This is a "feels bad" moment at the table where a very good attack roll is too easy to be entirely blocked by the target.

In addition, when it comes to "dice feel", we often find ourselves rolling more than a comfortable number of dice when attacking or saving. For example, many weapons (e.g. the Interdictors' Sniper Rifle) start at 5 attack dice which often deal a large amount of damage (7, 8, 9), especially with Rending. Since we roll a number of save dice equal to total damage, that means an attack with 4 dice could trigger a save roll with 7 or 8 dice.

The changes described below solve both problems:

- Unfair saves (too easy to block everything, especially at higher success counts)
- Too many dice in hand on attacks and armor saves

## The Simulation

Each step in the combat rules has an in-world explanation:

- `ATT` represents the number of bullets fired per shot (e.g. for assault rifles), the damage inflicted for a single bullet (e.g. for a rocket launcher), or the number of strikes the Unit can inflict in a single attack (e.g. slicing three times with a sword or knife or claw)
- `SKL` represents the wielding Unit's skill with this type of weapon. For ranged weapon, this is their marksmanship. For melee weapons, it's their brawling or martial skill.
  - Each attack die at or below the `SKL` represents the bullet finding its target or the melee strike connecting with its target.
- `ARM` represents the Unit's armor and defense skill.
  - When we roll saves, we are checking to see if each successful strike (bullet, sword swipe) was blocked by the target's armor.

Current save rules, especially for Ranged combat, break the simulation at the save step: A well-aimed bullet (critical attack roll) deals more damage because it hit a sensitive part of the target (e.g. Headshot), but our current save rules treat it the same as two bullets instead of one well-placed bullet.

## Combat Saves

The new baseline for Melee and Ranged combat is:

- Attack rules for damage inflicted stay the same. Critical attack rolls deal 2 damage (Rending deals 3).
- Save rules were changed to say that the target rolls a number of dice equal to the attacker's successful _dice_ instead of the _total damage_ inflicted.
- In **Melee Combat**, the target can now choose what each critical save roll does:
  - Block two points of damage (new choice)  
  OR
  - Block one point of damage AND inflict 1 damage on the attacker (retaliation chain)
- In **Ranged Combat**, each critical save blocks two points of damage (no change)

## Weapon Stats and Specials

I found that 3 dice is the sweet spot from a "dice feel" perspective. 4 is good, and 5 should be exceptional. The easy solution here is to reduce all weapon `ATT` stats by 1. This reduces the number of dice in hand, and combined with the combat save rules above, makes each die rolled more meaningful. A weapon with `ATT 1` stops being a throwaway and becomes a genuine threat.

All weapons have had their `ATT` stat reduced by 1. In addition, weapon specials have been reviewed for balance, including adjusting specials and GP costs.

With the combat rules changes, weapons with Rending are especially deadly since a critical attack roll deals 3 damage but still only gives the target a single die to save against it, at best blocking only 2 damage.

One example is the Interdictors' Sniper Rifle: With `RND1` and `ACC1`, this was a super-deadly weapon, even with our adjusted `ATT` stat and updated rules. Most Interdictors player squads that had a Sniper Rifle also gave the carrier the Grav Belt gear (removes the `HVY` special from their weapons), making it way overpowered for its cost. To balance this, the following changes were made to the Sniper Rifle and the Interdictors' available Gear options:

- Reduce `ATT` from `5` to `4`
- Remove `RND1`
- Keep `ACC1`
- Make Grav Belt a Unique Gear

_Note:_ The only exception to this reduction in `ATT` stats is for Horde Units. Those Units' weapons stayed at their current `ATT` values.

## What it Means at the Table

In playtesting, this means that combat is more violent, but not unbalanced. Great attack rolls are more rewarding because they don't give targets an opportunity for even better save rolls. Medics become far more important, Dodge and Tough become more valuable skills and Spoils of War, and weapons with Rending become a real threat.

These changes started as a feeling at the table before it became a math problem. The dice were saying something we weren't listening to. The goal was never to make combat harder, it was to make every die rolled mean something.

As always, I want to hear about your own experiences at the table. If you've played the original rules and these changes, what shifted for you? Which weapons and units became too deadly or too weak?
