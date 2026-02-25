// ─────────────────────────────────────────────────────────────────────────────
// RUINSTARS — DIAGRAM SPECS
// All coordinates in inches. pixelsPerInch bumped up for small maps.
// ─────────────────────────────────────────────────────────────────────────────

import type { BattlefieldDiagramConfig } from '@/components/shared/BattlefieldDiagram'

// ─── SHARED COLORS ───────────────────────────────────────────────────────────
const C = {
  unit:       '#2563eb', // blue — the player unit
  enemy:      '#dc2626', // red — enemy, out of range, not adjacent
  enemyGreen: '#16a34a', // green — enemy, in range, adjacent
  range:      '#2563eb', // blue tint — range radius circle
  wall:       '#44403c', // warm dark gray — walls / terrain
  callout:    '#f97316', // orange — dimension lines
  zone:       '#f97316', // orange — zones / areas
  text:       '#1c1917', // near-black — labels
}

// ─────────────────────────────────────────────────────────────────────────────
// MOVEMENT
//    7×5 grid. Unit at col 1, row 3.
//    Two paths, both labeled "3 Sq":
//      — Straight: 3 right  → ghost at col 4, row 3.
//      — Diagonal: 3 up-right → ghost at col 4, row 0.
//    Shows diagonal movement costs the same as orthogonal.
// ─────────────────────────────────────────────────────────────────────────────
export const movementDiagram = {
  board: { widthIn: 7, heightIn: 5 },
  pixelsPerInch: 60,
  showGrid: true,
  showCenterLines: false,
  elements: [
    // Unit (starting position, col 1 row 3)
    {
      id: 'U',
      type: 'marker',
      xIn: 1.5, yIn: 3.5, sizeIn: 1,
      color: C.unit, fillOpacity: 0.9,
      showLabel: false, showInLegend: false,
    },
    // Ghost — straight destination (col 4, row 3)
    {
      id: 'G1',
      type: 'marker',
      xIn: 4.5, yIn: 3.5, sizeIn: 1,
      color: C.unit, fillOpacity: 0.2,
      showLabel: false, showInLegend: false,
    },
    // Ghost — diagonal destination (col 4, row 0)
    {
      id: 'G2',
      type: 'marker',
      xIn: 4.5, yIn: 0.5, sizeIn: 1,
      color: C.unit, fillOpacity: 0.2,
      showLabel: false, showInLegend: false,
    },
    // Arrow: 3 squares straight right
    {
      id: 'arrow-straight',
      type: 'callout',
      x1In: 2.05, y1In: 3.5,
      x2In: 4.5, y2In: 3.5,
      text: '3 Sq',
      labelSizeIn: 0.38,
      textOffsetIn: -0.45,
      strokeColor: C.callout,
      end1Style: 'none', end2Style: 'arrow',
    },
    // Arrow: 3 squares diagonal (up-right)
    {
      id: 'arrow-diag',
      type: 'callout',
      x1In: 2.0, y1In: 3.0,
      x2In: 4.5, y2In: 0.5,
      text: '3 Sq',
      labelSizeIn: 0.38,
      textOffsetIn: -0.45,
      strokeColor: C.callout,
      end1Style: 'none', end2Style: 'arrow',
    },
  ],
} satisfies BattlefieldDiagramConfig


// ─────────────────────────────────────────────────────────────────────────────
// RANGE
//    8×5 grid. Attacker at col 1, row 2.
//    Target 1: col 3, row 1 — 2 right, 1 up — IN RANGE (green).
//    Target 2: col 5, row 2 — 4 right — OUT OF RANGE (red).
// ─────────────────────────────────────────────────────────────────────────────
export const rangeDiagram = {
  board: { widthIn: 9, heightIn: 9 },
  pixelsPerInch: 60,
  showGrid: true,
  showCenterLines: false,
  elements: [
    // Attacker unit (blue square, col 1 row 2)
    {
      id: 'A',
      type: 'marker',
      xIn: 3.5, yIn: 4.5,
      sizeIn: 1,
      color: C.unit,
      fillOpacity: 0.85,
      labelSizeIn: 0.4,
    },
    // In-range callout
    {
      id: 'R',
      type: 'marker',
      xIn: 3.5, yIn: 4.5,
      sizeIn: 7,
      color: C.unit,
      fillOpacity: 0.1,
      showLabel: false,
      showInLegend: false
    },
    // Target 1 — in range (green, col 3 row 1: 2 right, 1 up)
    {
      id: 'T1',
      type: 'marker',
      xIn: 5.5, yIn: 3.5,
      sizeIn: 1,
      color: C.enemyGreen,
      fillOpacity: 0.85,
      labelSizeIn: 0.4,
    },
    // "In Range" label above T1
    {
      id: 'lbl-in',
      type: 'text',
      xIn: 5.5, yIn: 2.55,
      text: 'In Range',
      color: C.enemyGreen,
      labelSizeIn: 0.38,
    },
    // Target 2 — out of range (red, col 5 row 2: 4 right)
    {
      id: 'T2',
      type: 'marker',
      xIn: 7.5, yIn: 4.5,
      sizeIn: 1,
      color: C.enemy,
      fillOpacity: 0.85,
      labelSizeIn: 0.4,
    },
    // "Out of Range" label below T2
    {
      id: 'lbl-out',
      type: 'text',
      xIn: 7.5, yIn: 5.55,
      text: 'Out of Range',
      color: C.enemy,
      labelSizeIn: 0.38,
    },
    // Range size callout
    {
      id: 'rng-callout',
      type: 'callout',
      x1In: 3.5, y1In: 1,
      x2In: 3.5, y2In: 4,
      text: '3 Squares',
      labelSizeIn: 0.38,
      textOffsetIn: 1
    }
  ],
} satisfies BattlefieldDiagramConfig

// ─────────────────────────────────────────────────────────────────────────────
// COVER
//    5×4 grid. Wall between col 2 and col 3, rows 0-1.
//    C (green): col 3 row 0 — wall on left edge → In Cover.
//    NC (red): col 3 row 2 — no wall on any edge → Not in Cover.
// ─────────────────────────────────────────────────────────────────────────────
export const coverDiagram = {
  board: { widthIn: 5, heightIn: 4 },
  pixelsPerInch: 60,
  showGrid: true,
  showCenterLines: false,
  elements: [
    // Attacker (blue) — col 0, row 2
    {
      id: 'U',
      type: 'marker',
      xIn: 0.5, yIn: 2.5, sizeIn: 1,
      color: C.unit, fillOpacity: 0.9,
      showLabel: false, showInLegend: false,
    },
    // Wall: between col 2 and col 3, rows 0-1
    {
      id: 'wall',
      type: 'rect',
      xIn: 2.93, yIn: 0, wIn: 0.14, hIn: 3,
      color: C.wall, strokeColor: C.wall, fillOpacity: 1,
      showLabel: false, showInLegend: false,
    },
    // C (green) — col 3, row 0: wall on left edge → In Cover
    {
      id: 'C',
      type: 'marker',
      xIn: 3.5, yIn: 0.5, sizeIn: 1,
      color: C.enemyGreen, fillOpacity: 0.85,
      labelSizeIn: 0.35,
    },
    // NC (red) — col 3, row 2: no wall on any edge → Not in Cover
    {
      id: 'NC',
      type: 'marker',
      xIn: 4.5, yIn: 2.5, sizeIn: 1,
      color: C.enemy, fillOpacity: 0.85,
      labelSizeIn: 0.28,
      showInLegend: false,
    },
  ]
} satisfies BattlefieldDiagramConfig

// ─────────────────────────────────────────────────────────────────────────────
// LINE OF SIGHT
//    5×5 grid. Wall: cols 2-4 rows 0-1 (upper-right block).
//    Blue attacker: col 0 row 1. Green target: col 4 row 3.
//    Two green LoS lines from attacker corner (1,2) to target corners — both clear.
// ─────────────────────────────────────────────────────────────────────────────
export const lineOfSightDiagram = {
  board: { widthIn: 5, heightIn: 4 },
  pixelsPerInch: 60,
  showGrid: true,
  showCenterLines: false,
  elements: [
    // Wall: cols 2-4, rows 0-1
    {
      id: 'wall',
      type: 'rect',
      xIn: 2, yIn: 0, wIn: 3, hIn: 2,
      color: C.wall, strokeColor: C.wall, fillOpacity: 1,
      showLabel: false, showInLegend: false,
    },
    // Attacker (blue) — col 0 row 1
    {
      id: 'A',
      type: 'marker',
      xIn: 0.5, yIn: 1.5, sizeIn: 1,
      color: C.unit, fillOpacity: 0.9,
      showLabel: false, showInLegend: false,
    },
    // Target (green) — col 4 row 3
    {
      id: 'T',
      type: 'marker',
      xIn: 4.5, yIn: 2.5, sizeIn: 1,
      color: C.enemyGreen, fillOpacity: 0.9,
      showLabel: false, showInLegend: false,
    },
    // LoS Line 1: attacker corner (1,2) → target corner (4,3) — clear
    {
      id: 'line1',
      type: 'callout',
      x1In: 1, y1In: 2,
      x2In: 4, y2In: 2,
      strokeColor: C.enemyGreen,
      end1Style: 'none', end2Style: 'arrow',
    },
    // LoS Line 2: attacker corner (1,2) → target corner (4,4) — clear
    {
      id: 'line2',
      type: 'callout',
      x1In: 1, y1In: 2,
      x2In: 4, y2In: 3,
      strokeColor: C.enemyGreen,
      end1Style: 'none', end2Style: 'arrow',
    },
  ],
} satisfies BattlefieldDiagramConfig

// ─────────────────────────────────────────────────────────────────────────────
// LINE OF SIGHT - SPECIAL
//    5×5 grid. Same wall. Blue unit: col 4 row 3. Red unit: col 0 row 1.
//    From blue's perspective looking toward red:
//      Line 1: (4,3)→(1,1) — blocked by wall (red, no arrow)
//      Line 2: (4,3)→(1,2) — clear (green, arrow)
//    Shows A can see T, but T cannot see A.
// ─────────────────────────────────────────────────────────────────────────────
export const lineOfSightSpecialDiagram = {
  board: { widthIn: 5, heightIn: 4 },
  pixelsPerInch: 60,
  showGrid: true,
  showCenterLines: false,
  elements: [
    // Wall: cols 2-4, rows 0-1
    {
      id: 'wall',
      type: 'rect',
      xIn: 2, yIn: 0, wIn: 3, hIn: 2,
      color: C.wall, strokeColor: C.wall, fillOpacity: 1,
      showLabel: false, showInLegend: false,
    },
    // Blue unit — col 4 row 3 (drawing LoS toward red)
    {
      id: 'A',
      type: 'marker',
      xIn: 4.5, yIn: 2.5, sizeIn: 1,
      color: C.unit, fillOpacity: 0.9,
      showLabel: false, showInLegend: false,
    },
    // Red unit — col 0 row 1
    {
      id: 'T',
      type: 'marker',
      xIn: 0.5, yIn: 1.5, sizeIn: 1,
      color: C.enemy, fillOpacity: 0.9,
      showLabel: false, showInLegend: false,
    },
    // LoS Line 1: (4,3)→(1,1) — blocked by wall (red, no arrow)
    {
      id: 'line1',
      type: 'callout',
      x1In: 4, y1In: 3,
      x2In: 1, y2In: 1,
      strokeColor: C.enemy,
      end1Style: 'none', end2Style: 'none',
    },
    // LoS Line 2: (4,3)→(1,2) — clear (green, arrow)
    {
      id: 'line2',
      type: 'callout',
      x1In: 4, y1In: 3,
      x2In: 1, y2In: 2,
      strokeColor: C.enemyGreen,
      end1Style: 'none', end2Style: 'arrow',
    },
  ],
} satisfies BattlefieldDiagramConfig

// ─────────────────────────────────────────────────────────────────────────────
// VERTICAL MOVEMENT
//    Climb up/down
// ─────────────────────────────────────────────────────────────────────────────
export const verticalMovementDiagram = {
  board: { widthIn: 10, heightIn: 6 },
  pixelsPerInch: 48,
  showCenterLines: false,
  elements: [
    // Wall
    {
      id: 'wall',
      type: 'rect',
      xIn: 3, yIn: 2,
      wIn: 4, hIn: 4,
      showLabel: false
    },
    /*
    // Wall Height callout
    {
      id: 'wallheight',
      type: 'callout',
      x1In: 5, y1In: 8,
      x2In: 5, y2In: 4,
      text: '4"'
    },
    */
    // Climbup Start Unit
    {
      id: 'CUS',
      type: 'circle',
      cxIn: 2, cyIn: 5.5,
      rIn: 0.5,
      color: C.unit,
      fillOpacity: 0.9,
      showLabel: false,
    },
    // Climbup pt1
    {
      id: 'cup1',
      type: 'callout',
      x1In: 2.5, y1In: 2,
      x2In: 2.5, y2In: 6,
      text: '2 Sq/4"',
      labelSizeIn: 0.4,
      textOffsetIn: 1,
      end1Style: 'arrow', end2Style: 'none'
    },
    // Climbup pt2
    {
      id: 'cup2',
      type: 'callout',
      x1In: 3.5, y1In: 1.5,
      x2In: 2.5, y2In: 1.5,
      text: '1 Sq',
      labelSizeIn: 0.4,
      end1Style: 'arrow', end2Style: 'none'
    },
    // Climbup - Destination
    {
      id: 'U-end',
      type: 'circle',
      cxIn: 3.5, cyIn: 1.5,
      rIn: 0.5,
      color: C.unit,
      fillOpacity: 0.2,
      showLabel: false,
      showInLegend: false
    },
    
    // Climbdown Start Unit
    {
      id: 'CDS',
      type: 'circle',
      cxIn: 6, cyIn: 1.5,
      rIn: 0.5,
      color: C.unit,
      fillOpacity: 0.9,
      showLabel: false,
    },
    // Climbdown pt1
    {
      id: 'cdp1',
      type: 'callout',
      x1In: 6, y1In: 2,
      x2In: 7, y2In: 2,
      text: '1 Sq',
      labelSizeIn: 0.4,
      end1Style: 'none', end2Style: 'arrow'
    },
    // Climbdown pt2
    {
      id: 'cdp2',
      type: 'callout',
      x1In: 7.5, y1In: 4,
      x2In: 7.5, y2In: 2,
      text: '1 Sq Free',
      labelSizeIn: 0.4,
      textOffsetIn: 0.9,
      end1Style: 'arrow', end2Style: 'none'
    },
    // Climbdown pt3
    {
      id: 'cdp3',
      type: 'callout',
      x1In: 7.5, y1In: 6,
      x2In: 7.5, y2In: 4,
      text: '1 Sq',
      labelSizeIn: 0.4,
      end1Style: 'arrow', end2Style: 'none'
    },
    // Climbdown - Destination
    {
      id: 'U-end2',
      type: 'circle',
      cxIn: 7.5, cyIn: 5.5,
      rIn: 0.5,
      color: C.unit,
      fillOpacity: 0.2,
      showLabel: false,
      showInLegend: false
    },
  ],
} satisfies BattlefieldDiagramConfig

// ─────────────────────────────────────────────────────────────────────────────
// ADJACENCY
//    7×5 grid. Blue unit at col 3, row 2. Full-height wall between col 2 and col 3.
//    5 adjacent squares (green): above, below, right, diag-NE, diag-SE.
//    3 not adjacent (red): left, diag-NW, diag-SW — all blocked by wall.
// ─────────────────────────────────────────────────────────────────────────────
export const adjacencyDiagram = {
  board: { widthIn: 5, heightIn: 5 },
  pixelsPerInch: 60,
  showGrid: true,
  showCenterLines: false,
  elements: [
    // Blue unit (col 3, row 2)
    {
      id: 'U',
      type: 'marker',
      xIn: 2.5, yIn: 2.5, sizeIn: 1,
      color: C.unit, fillOpacity: 0.9,
      showLabel: false, showInLegend: false,
    },
    // Adjacent squares (green): above, below, right, diag-NE, diag-SE, diag-SW
    { id: 'adj-n',  type: 'marker', xIn: 2.5, yIn: 1.5, sizeIn: 1, color: C.enemyGreen, fillOpacity: 0.35, showLabel: false, showInLegend: false },
    { id: 'adj-s',  type: 'marker', xIn: 2.5, yIn: 3.5, sizeIn: 1, color: C.enemyGreen, fillOpacity: 0.35, showLabel: false, showInLegend: false },
    { id: 'adj-ne', type: 'marker', xIn: 3.5, yIn: 1.5, sizeIn: 1, color: C.enemyGreen, fillOpacity: 0.35, showLabel: false, showInLegend: false },
    { id: 'adj-e',  type: 'marker', xIn: 3.5, yIn: 2.5, sizeIn: 1, color: C.enemyGreen, fillOpacity: 0.35, showLabel: false, showInLegend: false },
    { id: 'adj-se', type: 'marker', xIn: 3.5, yIn: 3.5, sizeIn: 1, color: C.enemyGreen, fillOpacity: 0.35, showLabel: false, showInLegend: false },
    { id: 'adj-sw', type: 'marker', xIn: 1.5, yIn: 3.5, sizeIn: 1, color: C.enemyGreen, fillOpacity: 0.35, showLabel: false, showInLegend: false },
    // Not adjacent (red): upper-left, left — blocked by wall
    { id: 'nadj-nw', type: 'marker', xIn: 1.5, yIn: 1.5, sizeIn: 1, color: C.enemy, fillOpacity: 0.35, showLabel: false, showInLegend: false },
    { id: 'nadj-w',  type: 'marker', xIn: 1.5, yIn: 2.5, sizeIn: 1, color: C.enemy, fillOpacity: 0.35, showLabel: false, showInLegend: false },
    // Wall — full height, between col 2 and col 3
    {
      id: 'wall',
      type: 'rect',
      xIn: 1.93, yIn: 0, wIn: 0.14, hIn: 3,
      color: C.wall, strokeColor: C.wall, fillOpacity: 1,
      showLabel: false, showInLegend: false,
    },
  ]
} satisfies BattlefieldDiagramConfig

// ─────────────────────────────────────────────────────────────────────────────
// ATTACK OF OPPORTUNITY
//    Unit moves away from adjacent enemy. Enemy gets free melee attack.
//    Shows the blunting mechanic: spend 2" of movement = -1 ATT die.
// ─────────────────────────────────────────────────────────────────────────────
export const aooDiagram = {
  board: { widthIn: 10, heightIn: 6 },
  pixelsPerInch: 48,
  showCenterLines: false,
  elements: [
    // Enemy (stays put)
    {
      id: 'E',
      type: 'circle',
      cxIn: 1, cyIn: 2,
      rIn: 0.5,
      color: C.enemy,
      fillOpacity: 0.9,
      labelSizeIn: 0.4,
      showInLegend: false,
      showLabel: false
    },
    // Unit — original position
    {
      id: 'U-start',
      type: 'circle',
      cxIn: 2.5, cyIn: 2,
      rIn: 0.5,
      color: C.unit,
      fillOpacity: 0.9,
      showLabel: false,
      showInLegend: false
    },
    // Unit — destination (ghost)
    {
      id: 'U',
      type: 'circle',
      cxIn: 8.5, cyIn: 2,
      rIn: 0.5,
      color: C.unit,
      fillOpacity: 0.2,
      labelSizeIn: 0.4,
      showInLegend: false,
      showLabel: false,
    },
    /*
    // 6" full move
    {
      id: 'fullmove',
      type: 'callout',
      x1In: 3, y1In: 2.,
      x2In: 9, y2In: 2,
      strokeColor: C.callout,
      end1Style: 'none', end2Style: 'arrow'
    },
    */
    // 2" marker on path
    {
      id: 'blunt-2',
      type: 'callout',
      x1In: 3, y1In: 2.5,
      x2In: 5, y2In: 2.5,
      text: '2" = -2 ATT',
      labelSizeIn: 0.42,
      strokeColor: C.callout,
      textOffsetIn: 0.4,
      end1Style: 'none', end2Style: 'arrow'
    },
    // 4" marker on path
    {
      id: 'blunt-4',
      type: 'callout',
      x1In: 3, y1In: 3.5,
      x2In: 7, y2In: 3.5,
      text: '4" = -1 ATT',
      labelSizeIn: 0.42,
      strokeColor: C.callout,
      textOffsetIn: 0.4,
      end1Style: 'none', end2Style: 'arrow'
    },
    // 6" marker on path
    {
      id: 'blunt-6',
      type: 'callout',
      x1In: 3, y1In: 4.5,
      x2In: 9, y2In: 4.5,
      text: '6" = -0 ATT',
      labelSizeIn: 0.42,
      strokeColor: C.callout,
      textOffsetIn: 0.4,
      end1Style: 'none', end2Style: 'arrow'
    },
  ]
} satisfies BattlefieldDiagramConfig
