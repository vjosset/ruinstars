---
title: "Custom Dice"
date: "2026-03-29 12:00"
description: "Trying different ways of making custom dice."
tags: ["crafting", "dice"]
coverImage: "/blog/images/customDice.jpg"
---

I've been trying to make custom dice for the game. Ideally, colors that match the theme and big numbers in the game's stat font.

I tried two different methods: STLs for the actual dice, and using stencils to paint dice blanks.

#### Design and Planning

When designing dice, remember that opposite faces should add up to 7:

- 1 - 6
- 2 - 5
- 3 - 4

#### 3D Printing

![FDM Dice](/blog/images/diceFDM.jpg)

I built STLs for the dice and tried different approaches to printing on my FMD printer.

So I tried printing these dice six at a time with various filaments.

What I'm seeing is that the die face that is on the bottom seems to always be a little smooshed and likely affects the balance of the die. That smooshing plus the 2mm-deep numbers means I can't guarantee that these dice are fair. But it was still fun to try and I think they look cool!

I did try orienting the die so that it was "pointing down" with supports, but I could not get a good print. I'll keep trying but I'm running out of ideas.

![FDM Die with supports](/blog/images/diceFDMDiagPrep.jpg)
![FDM Die with supports](/blog/images/diceFDMDiagSlice.jpg)

I think a resin printer with proper orientation and supports would likely give far better results than FDM, but that still doesn't solve the balance/fairness issue.

#### Stenciling

![Stenciled Dice](/blog/images/diceStencil.jpg)

I designed an STL for a box that can hold six 16-mm dice blanks and a stencil that fits into that rig.
This worked _pretty_ well, although the tolerances on my prints and the variations in the dice blanks' sizes meant that there was some bleed-through and some imprecise numbers, plus some dice were rubbing against each other which smudged or scratched previously-painted numbers. But the effect kind of works for Ruinstars: We get that "grungy" feeling to the numbers.

**Process:**

- Print the rig and stencil
- Place the die blanks in the rig
- Lay the stencil on top of the die blanks
- Optional: Put tape over the seals/around the stencil to avoid bleed through
- Use spray primer to paint the numbers on the die faces
  - If you have an airbrush, that might work better and also be less wasteful
- Wait for it to dry, then rotate the die blanks for the next face

#### Conclusion

All in all, I like the stenciled blanks best. It's not too difficult, likely blanaced, the stencil and rig are reusable (and fast to re-print if needed), and dice blanks are cheap.

#### Files and Links

- [Dice Stencil Rig STL](https://www.thingiverse.com/thing:7324864)
- [Dice STL](https://www.thingiverse.com/thing:7324866)
