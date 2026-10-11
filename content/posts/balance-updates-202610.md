---
title: "Oct 2026 Balance Updates"
date: "2026-10-11 12:00"
description: "Updating GP costs for Units and Weapons for better balance"
tags: ["game design", "balance"]
coverImage: "/img/squadTypes/HK.webp"
---

After reviewing player feedback, I took a close look at GP costs for Units and their Weapons.
This led me to make some updates and rebalancing of squad types and their selections.

## The Problem

The main thing to solve was to properly price available Weapon options when a Unit had an included/default option already.

For example, the [Krumpfist](/squadTypes/KF) Bangrat had its Boomstik (`ATT 3 - RNG6"`) included in its price. But replacing it with Dynamite (`ATT 2 - RNG6" BLS`) was priced at 4 GP. That's the baseline price for a weapon with those stats, but doesn't give a discount for replacing the Boomstik.
Since the Boomstik's price was "included" in the Bangrat's base price, players were really paying twice to upgrade their Weapons.

The main goal was to make it fairer to replace default and included weapons with other options.

## The Solution

In short: set a GP price on each Weapon (default or optional), and reduce the GP price of the Units accordingly. Now players can remove the Boomstik and get some of their budget back to buy an upgrade.

The exceptions are Units with a fixed loadout, where you can't swap anything anyway: the [Praxium Corps](/squadTypes/PRX), the [Drone Pod](/squadTypes/DRN), and a few other Units like the [Despoilers](/squadTypes/DES) Gorebeast. Their Weapons are still included in the Unit's price.

## Follow-Ups

Once that was done, a few things became apparent:

- Weapons were not priced equally for the same stats
- Units were not priced equally for the same stats
- Default squads were no longer at 100 GP and had to be updated

With that in mind, this is what I did:

- Updated all Weapons to have the same pricing formula for their stats and specials
  - Some specials are more valuable than others, and some reduce the value of a weapon (e.g. limited range or Heavy should not cost more)
- Rebuilt default squads to add up to 100 GP
- Adjusted some units' GP costs, stats, weapon options, and skills

In more detail:

## Weapons

Every Weapon is now priced from the same building blocks:

- Its `ATT` sets the base price. Melee weapons cost 1 GP less than a ranged weapon with the same `ATT`.
- Specials add to that price, or take away from it. Rending, Relentless and the "double" specials (`2MC`, `2RC`) add the most. Limited range (`RNG`), Heavy (`HVY`) and once-per-mission (`LIM`) lower the price.
- A Weapon costs the same no matter who carries it. A Unit with better `RSK` gets more out of a good gun, and that's your call to make: put your best weapon on your strongest unit, or give a weaker unit a stronger weapon to close the gap.

The one deliberate exception is the Interdictors' Custom Reaper. It's a free unique upgrade to the regular Reaper, so it costs the same as the base Reaper.

## Units

Unit prices are now checked against a consistent set of rules:

- **Stats:** `ACT` is the most expensive stat. A Unit pays fully for its best combat skill (`MSK` or `RSK`) and only partly for the other one, so melee specialists aren't charged for shooting they'll never do. `ARM` and `HIT` are priced together, and each point of `ARM` is worth more than the last.
- **Included skills** are worth roughly 2 GP each.
- **The Leader skill and Squad Specialties are free.** Every squad gets exactly one Leader and one Specialty, so they even out.
- **Swift** on slow, melee-only Units mostly makes up for having to cross the table, so it doesn't add much to their price.
- **Glass cannons** like the Gorebeast and the Stingcloud hit hard but go down fast. They often don't live long enough to use all that damage, so they're priced lower than their weapon alone would suggest.
- **Each squad type has its own price level.** Specialties, synergies and play style are worth different amounts in different squads, so two Units with identical stats in different squad types can cost different amounts. That's intentional. Within a squad type, the same stats now cost the same.

## Changes by Squad Type

### [Claimant Warband](/squadTypes/CWB)

- Gunner: 8 GP to 6 GP
- Fixer: 5 GP to 7 GP

### [Krumpfists](/squadTypes/KF)

- Bangrat: 7 GP to 9 GP
- Grunt: 5 GP to 4 GP
- Skulla: 10 GP to 8 GP
- Weirdo: 8 GP to 11 GP

### [Relict Wardens](/squadTypes/REL)

- Secundus: 7 GP to 9 GP
- Sentinel: 9 GP to 7 GP

### [Silent Choir](/squadTypes/SCH)

- Shroudbearer: 9 GP to 12 GP
- Aspirant: 7 GP to 9 GP
- Adept: 8 GP to 7 GP
- Disciple: 6 GP to 5 GP

### [Praxium Corps](/squadTypes/PRX)

- Raptor: the Reaper is replaced by an Aggressor. The Raptor was carrying the best gun in the squad on top of a strong melee weapon and three skills, which made it an automatic pick. It keeps its mobility, and the Vector stays the Reaper specialist.

### Others

[Interdictors](/squadTypes/INT), [Hunter Killers](/squadTypes/HK), [Despoilers](/squadTypes/DES): Simple transfer of included weapon prices out of the unit price.

### Default Squads

Every default squad now adds up to exactly 100 GP. While rebuilding them, I also fixed a couple of lists that had the same unique (\*) item on two Units.

## What's Next

These adjustments are an update, not the final word. I'll be watching how they play, especially the Units that moved the most (Shroudbearer, Weirdo, and Krumpfists as a whole).

A few smaller cleanups are also on my list:

- Making sure the same skill costs the same in every squad type
- Adding a few cheap (1 GP) options to squads that don't have any, so you're never stuck at 99 GP
- Renaming or unifying Weapons that share a name but not their stats

If something feels off at the table, let me know. This is how this whole effort started, and as always player feedback is the most important and effective way for everyone to have fun!
