# GP Rebalance: Decisions and Backlog

Started 2026-10-11. Tracks the unit/weapon cost review.

## Settled decisions

- Leader skill is free, including variants (LDR2, LDR3, Interdictor/Praxium Leader* stat bumps). It does not affect cost.
- Squad specialties are free. Differences between them are absorbed by the per-squad multiplier.
- Default (included) skills are valued at 2 GP each for cost calculation.
- Swift is valued at 0 GP on ACT2 units that are melee-only or near it (Gorebeast, Waneborn, Stingcloud, Drone, Aether Scribe), 1 GP on Adept and Disciple, 2 GP elsewhere.
- Swarmling is always 0 GP and excluded from cost analysis. It is not part of squad composition; it only spawns during play.
- ARM2 melee-only "glass cannons" (Gorebeast, Stingcloud*) get a -7 GP adjustment before the multiplier: their offense is often not realized because they die early. Current prices (Gorebeast 6, Stingcloud* 8) are confirmed by playtesting and consistent with each other.
- Weapons keep one flat price regardless of the bearer's MSK/RSK ("same arsenal"). Skill-scaled weapon pricing rejected.
- Budget stays at 100 GP. No points-free or hybrid system.
- Default squads (100 GP) are the balance reference. Unit cost = formula x per-squad multiplier.
- Identical stats across different squad types may have different costs. This is intended: the per-squad multiplier prices each faction's specialty and synergy.
- In squads with a single mandatory leader unit type, the leader price is treated as a fixed entry fee and not rebalanced. The multiplier does not apply to it.
- Custom Reaper* is a known free unique upgrade (priced as the Reaper).
- Praxium in 34 GP mini squads: not an issue.

## Unit cost formula (pre-multiplier)

```pre
3
+ 3*(ACT-2)
+ 2*(primary SKL-3)
+ max(0, secondary SKL-3)
+ 0.5 * HIT*6/(6-min(ARM,5))
+ default skill values
+ fixed-loadout weapon values
+ unit adjustment
```

Target GP = squad multiplier x formula.

Unit adjustments (relative to valuing every default skill at 2 GP):

- Gorebeast, Stingcloud*: -9 (Swift at 0 GP: -2; glass cannon: -7)
- Waneborn, Drone, Aether Scribe*: -2 (Swift at 0 GP)
- Adept, Disciple: -1 (Swift at 1 GP)

## Per-squad multipliers (2026-10-11)

Derived from each 100 GP default list: GP left after gear and the mandatory leader, divided by the formula value of the remaining units. Custom is the calibration baseline.

| Squad type | Multiplier |
| --- | --- |
| Custom | 1.00 |
| Hunter Killers | 0.91 |
| Praxium Corps | 0.79 |
| Interdictors | 0.74 |
| Silent Choir | 0.73 |
| Despoilers | 0.69 |
| Claimant Warband | 0.60 |
| Relict Wardens | 0.59 |
| Drone Pod | 0.57 |
| Krumpfists | 0.56 |

Recompute a squad's multiplier whenever its default list changes or a unit in that list changes stats (raising Heavy Trooper's MSK to 4 moves Interdictors to about 0.73). With the proposed changes below, every non-leader unit is within 1.5 GP of its target except Raptor* and Wraith* (Praxium kit review pending), Aspirant* (1.8 below target) and Gorebeast (1.6 below target, accepted).

## Proposed unit cost changes (2026-10-11, pending playtest)

All default squads stay at 100 GP.

- Krumpfists: Skulla 10 -> 8, Weirdo* 8 -> 11, Bangrat 7 -> 9, Grunt 5 -> 4
- Silent Choir: Aspirant* 7 -> 12, Adept 8 -> 7, Disciple 6 -> 5
- Claimant Warband: Gunner* 8 -> 6, Fixer* 5 -> 7
- Relict Wardens: Secundus* 7 -> 9, Sentinel 9 -> 7 (or 6 plus a 1 GP item in the default list)
- Hunter Killers, Despoilers, Interdictors, Drone Pod, Praxium: no price change

## Open items on unit costs

- Heavy Trooper (11) is strictly worse than Strike/Assault Trooper (11): MSK 3 vs 4, same skills, same cost. Proposed fix: raise Heavy Trooper MSK to 4 (keeps price and default list). Alternative: 10 GP, but the Interdictor default list then sits at 99 with no 1 GP item left.
- Shroudbearer* (9, leader) and Aspirant* (12) have identical stats and comparable skills. Fine under the leader rule, but visible on the cards. Accept, or raise Shroudbearer and lower other Silent Choir units.
- Default list errors: Interdictors have Infiltrator* on two units; Silent Choir has Relic Lash* on two units. Replace each duplicate with a same-cost non-unique item.

## Backlog (deferred cleanups)

1. Praxium kit review: Raptor looks like an always-take (Vector's Reaper plus better melee and 3 skills), Wraith an always-skip, Aegis has no ranged weapon. Fix by kit, keep 25 GP each.
2. One price per skill across squads (Grenade 0/1/2, Relay Order 0/1/2, Medpack and Technician 0/2, Tough and Climber 1/2).
3. Free optional skills: Interdictors (Relay Order*, Grenade*, Medpack*, Strategize*, Technician*) and Silent Choir (Compel, Misdirection, Dark Gaze, Pain Exalted, The Face Of Truth, Immolate*). Decide if intentional.
4. Same-name weapons with different stats: Reaper, Aggressor, Blaster, Cleaver, Barbed Tailwhip, Acid Spew. Rename or unify.
5. 1 GP fillers for Silent Choir, Hunter Killers, Interdictors (new skill, new weapon, or adjusted existing weapon). Unused 1 GP STD skills are candidates.
6. Phased Edge (RND1 on Dagger, 1 GP, non-unique) vs Custom Reaper*: decide one rule for RND1 upgrades.
7. Optional: per-unit-type gear link table (FKs, isDefault on the link) if data integrity becomes a problem.
