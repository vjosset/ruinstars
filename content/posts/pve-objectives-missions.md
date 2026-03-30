---
title: "PvE Missions and Objectives"
date: "2026-03-30 12:00"
description: "Research notes on PvE Mission and Objective design."
tags: ["game design", "solo play", "coop play"]
coverImage: "/img/hero01_wideB.webp"
---

I've been working on the objectives in the [PvE missions](https://ruinstars.com/assets/books/PvE%20Missions%20-%20Ruinstars.pdf) for [Ruinstars](https://ruinstars.com).

The mechanics are solid, but in a full PvE campaign of 9 missions (3 operations with 3 missions each), we run into repetitive objective sets. These are my notes on the research I'm doing to increase replayability, engagement, and fun for solo and coop play.

---

### The Problem

Our PvE missions are built by randomly selecting two objectives from a list of six. That limited set of objectives lends itself to repetition and players will quickly run into duplicate mission types.

In addition, some objectives seem like they are redundant or thin reskins of other objectives.

Whatever we do, PvE objectives must fit in our requirements of:

- **Simple NPC behavior:** NPCs can't hold objectives or strategically place themselves for asset denial.
- **Simple mission generation:** Players should be able to set up a mission in under 10 minutes. Adding a bunch of paperwork to the start of the mission really dampens the immersion and the fun.

_So what do we do about it?_

---

### What's Working Well

#### Objective Pairing

Two objectives per mission is one of the core ways the game creates replayability without expanding the objective pool. But pairing isn't just about variety, it's about tension.

The best pairings put the squad in conflict with itself. One objective pulls units toward the center; the other pushes them to the edges. One requires aggression; the other requires holding position. A squad that can split focus and still complete both objectives hasn't faced a real decision. A squad that has to choose or that fails one while succeeding at the other has played a more interesting game.

The weakest pairings are the ones where both objectives make the same spatial demand: both pulling units inward, both spreading them wide. The objectives are different on paper, but the squad doesn't really have to choose between them.

#### Solid Objectives

The three most solid objectives in our pool are:

- **Control**
  - A wargaming staple: hold critical positions on the battlefield
- **Activate**
  - Also common wargaming objective: go to a place and do a thing
- **Destroy**
  - Pretty common: destroy three things

Control, Activate, and Destroy are solid and familiar to wargamers already. The other three feel thin and in need of tweaks. But reducing our pool of objectives to only 3 doesn't improve the replayability and variety of missions.

---

### What Needs Work

#### Limited Pool

Even with objective pairing, the potential for repeat missions is still high, especially in a full 9-mission campaign.

#### Tenuous Objectives

- **Protect**
  - This one looks fine on paper, but in practice is either very easy or very difficult depending on the placement of NPC spawn points and the position of the asset to protect.
- **Search**
  - This could be considered a variation on the **Activate** objective, just introduces an additional element of luck.
- **Recover**
  - The most recent objective type I added to the rules (replaced "No survivors" which is now just a bonus/secondary objective). In practice, it's really just a variation on **Search**.

---

### Other Games

The two common solutions to this problem are more generation tables or authored campaigns.

Some games solve it with deep procedural generation (e.g. the excellent _Five Parsecs from Home_): multiple tables, cross-referenced results, mission modifiers stacked on mission modifiers. The variety is real, but so is the setup time. That's a different game with a different contract with the player.

Other games (e.g. _Rangers of Shadow Deep_, also excellent) go the other direction: bespoke campaigns written by the designer, with fixed objectives and narrative context built in. The payoff is high, but so is the production cost, and it only works once per playthrough.

Ruinstars needs something in between: more variety than a flat list of six objectives, less overhead than a five-table generation sequence.

---

### Two Directions for Expansion

#### Objective Archetypes and Variations

One approach is a two-roll system for each objective (keeping two objectives per mission), starting with a solid mission archetype (Control, Activate, or Destroy), then rolling for a variation on each of these.  
Some examples:

**Control:**

- Hold two of the three objectives for two consecutive turns
- Hold three objectives at the end of any one turn
- Hold one specific objective at the end of each turn

**Activate:**

- Activate all three objectives in any order
- Activate all three objectives in a precise order, potentially revealing the next objective only when the previous one is activated
- Activation is a "search" (roll to find) and once found, the item must be carried at extraction (replaces "Recover" and "Search")

**Destroy:**

- Destroy all three objectives
- Objectives spawn enemies each turn until they are destroyed
- Objectives must be destroyed in order
- Objectives auto-heal at the start of each turn

This would mean that Search and Recover would be retired as standalone types and folded into Activate variations where they fit naturally.

#### Narrative Reskinning

I always wanted the PvE objective types to be mechanical, allowing players to invent their own narrative around those objectives. A Control objective that is "Hold the extraction corridor" vs "Hold the ritual anchor" vs "Hold the comms relay" feels different even though the mechanic is identical.

We can leave this up to the players who have a knack for it, or I could write custom campaigns per player faction.

Custom campaigns have been on my to-do list since the inception of 2nd edition, but it's a lot of work. The advantage of a custom campaign is that the narrative is prebuilt and immersive, and the narrative context gives us the opportunity to reuse standard objectives with per-campaign variations, or even custom objectives.

---

### Where This is Going

_Two approaches, let's do both!_

#### Objective Types Rebuild

Objective archetypes and variations are our best bet. I will be working on updating the pool of objectives with solid variations in the coming days. I will remove the tenuous objectives (Search, Protect, Recover) or fold them into one of the three remaining archetypes.

#### Custom Campaigns

I've been working on the first custom narrative campaign, intended for [Hegemony](https://ruinstars.com/factions/HEG) Squads. Here's a little teaser:

> ### The Last Signal
>
> Forty-seven days ago, a relay station on the edge of the Shatter Belt transmitted a single burst on a Hegemony emergency frequency. Command recorded it and ran it through three decryption cycles. What came back was three words:
>
> _**Confirm and Execute.**_
>
> The station has been dark for eighty years. No one should have been able to send anything from it.
>
> Command sat on the signal for six weeks. Someone was trying to trace the identification code buried in the transmission's header. They couldn't. The file it points to is over two hundred years old and sealed above most active clearance levels. Eventually, someone decided that sending a squad to look was preferable to continuing to not know. They gave you the minimum briefing. They sent you anyway.

Once this one is done, I will move on to other factions' custom campaigns.
