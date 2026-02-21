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
// RANGE
//    4"×4" board. Attacker center-left. RNG 2" circle around attacker.
//    One enemy in range (right, within circle). One enemy out of range (far right).
//    Callout shows the 2" radius.
// ─────────────────────────────────────────────────────────────────────────────
export const rangeDiagram = {
  board: { widthIn: 10, heightIn: 8 },
  pixelsPerInch: 48,
  showCenterLines: false,
  elements: [
    // Range radius circle around attacker
    {
      id: 'RNG',
      type: 'circle',
      cxIn: 1, cyIn: 4,
      rIn: 6.6,
      color: C.range,
      fillOpacity: 0.07,
      showLabel: false,
    },
    // Attacker unit
    {
      id: 'U',
      type: 'circle',
      cxIn: 1, cyIn: 4,
      rIn: 0.6,
      color: C.unit,
      fillOpacity: 0.9,
      showLabel: false,
    },
    // Callout: 6" range radius (horizontal from center to circle edge)
    {
      id: 'rng-callout',
      type: 'callout',
      x1In: 1.6, y1In: 4,
      x2In: 7.6, y2In: 4,
      text: 'RNG6"',
      labelSizeIn: 0.5,
      strokeColor: C.callout,
      textOffsetIn: 0.4,
    },
    // Enemy in range (green)
    {
      id: 'E1',
      type: 'circle',
      cxIn: 4.0, cyIn: 6,
      rIn: 0.35,
      color: C.enemyGreen,
      fillOpacity: 0.9,
      showLabel: false,
    },
    // "IN RANGE" label
    {
      id: 'lbl-in',
      type: 'text',
      xIn: 4.0, yIn: 7,
      text: 'In Range',
      color: C.enemyGreen,
      labelSizeIn: 0.45,
    },
    // Enemy in range (green)
    {
      id: 'E3',
      type: 'circle',
      cxIn: 7.3, cyIn: 6,
      rIn: 0.35,
      color: C.enemyGreen,
      fillOpacity: 0.9,
      showLabel: false,
    },
    // "IN RANGE" label
    {
      id: 'lbl-in3',
      type: 'text',
      xIn: 7.3, yIn: 7,
      text: 'In Range',
      color: C.enemyGreen,
      labelSizeIn: 0.45,
    },
    // Enemy out of range (red)
    {
      id: 'E2',
      type: 'circle',
      cxIn: 8, cyIn: 2.5,
      rIn: 0.35,
      color: C.enemy,
      fillOpacity: 0.9,
      showLabel: false,
    },
    // "OUT OF RANGE" label
    {
      id: 'lbl-out',
      type: 'text',
      xIn: 8, yIn: 3.2,
      text: 'Out of Range',
      color: C.enemy,
      labelSizeIn: 0.45,
    },
  ],
} satisfies BattlefieldDiagramConfig

// ─────────────────────────────────────────────────────────────────────────────
// COVER
//    Two side-by-side scenarios on a wider board.
//    Left: wall within 1" of target → IN COVER.
//    Right: wall more than 1" from target → NOT IN COVER.
// ─────────────────────────────────────────────────────────────────────────────
export const coverDiagram = {
  board: { widthIn: 6, heightIn: 5 },
  pixelsPerInch: 48,
  showCenterLines: false,
  elements: [
    // Attacker unit
    {
      id: 'U',
      type: 'circle',
      cxIn: 0.6, cyIn: 2.5,
      rIn: 0.5,
      color: C.unit,
      fillOpacity: 0.9,
      showLabel: false,
    },
    // Enemy in cover (green)
    {
      id: 'E1',
      type: 'circle',
      cxIn: 4.4, cyIn: 1,
      rIn: 0.5,
      color: C.enemyGreen,
      fillOpacity: 0.9,
      showLabel: false,
    },
    // "In Cover" label
    {
      id: 'lbl-in',
      type: 'text',
      xIn: 4.4, yIn: 2,
      text: 'In Cover',
      color: C.enemyGreen,
      labelSizeIn: 0.4,
    },
    // Enemy no cover (red)
    {
      id: 'E2',
      type: 'circle',
      cxIn: 5, cyIn: 3,
      rIn: 0.5,
      color: C.enemy,
      fillOpacity: 0.9,
      showLabel: false,
    },
    // "No Cover"" label
    {
      id: 'lbl-out',
      type: 'text',
      xIn: 4.8, yIn: 4,
      text: 'No Cover',
      color: C.enemy,
      labelSizeIn: 0.4,
    },
    // Wall
    {
      id: 'wall',
      type: 'rect',
      xIn: 3, yIn: 0,
      wIn: .03, hIn: 6,
      showLabel: false
    },
    // Callout within 1"
    {
      id: 'callout1In',
      type: 'callout',
      x1In: 3, y1In: 0.5,
      x2In: 4, y2In: 0.5,
      text: '1"',
      labelSizeIn: 0.4
    },
    // Callout > 1"
    {
      id: 'callout2In',
      type: 'callout',
      x1In: 3, y1In: 3,
      x2In: 4.5, y2In: 3,
      text: '>1"',
      labelSizeIn: 0.4
    }
  ],
} satisfies BattlefieldDiagramConfig

// ─────────────────────────────────────────────────────────────────────────────
// LINE OF SIGHT
//    Two Units with asymmetric LoS
// ─────────────────────────────────────────────────────────────────────────────
export const lineOfSightDiagram = {
  board: { widthIn: 5, heightIn: 4 },
  pixelsPerInch: 48,
  showCenterLines: false,
  elements: [
    // Wall
    {
      id: 'wall',
      type: 'rect',
      xIn: 2, yIn: 0,
      wIn: 3, hIn: 2,
      showLabel: false
    },
    // Attacker unit
    {
      id: 'A',
      type: 'circle',
      cxIn: 1, cyIn: 1.5,
      rIn: 0.5,
      color: C.unit,
      fillOpacity: 0.9,
      showLabel: false,
    },
    // Target unit
    {
      id: 'T',
      type: 'circle',
      cxIn: 4, cyIn: 3,
      rIn: 0.5,
      color: C.enemyGreen,
      fillOpacity: 0.9,
      showLabel: false,
    },
    // LoS Line 1
    {
      id: 'line1',
      type: 'callout',
      x1In: 1, y1In: 2,
      x2In: 4, y2In: 3.5,
      end1Style: 'none', end2Style: 'arrow'
    },
    // LoS Line 2
    {
      id: 'line2',
      type: 'callout',
      x1In: 1, y1In: 2,
      x2In: 4, y2In: 2.5,
      end1Style: 'none', end2Style: 'arrow'
    }
  ],
} satisfies BattlefieldDiagramConfig

// ─────────────────────────────────────────────────────────────────────────────
// LINE OF SIGHT - SPECIAL
//    Two Units with asymmetric LoS
// ─────────────────────────────────────────────────────────────────────────────
export const lineOfSightSpecialDiagram = {
  board: { widthIn: 5, heightIn: 4 },
  pixelsPerInch: 48,
  showCenterLines: false,
  elements: [
    // Wall
    {
      id: 'wall',
      type: 'rect',
      xIn: 2, yIn: 0,
      wIn: 3, hIn: 2,
      showLabel: false
    },
    // Attacker unit
    {
      id: 'T',
      type: 'circle',
      cxIn: 4, cyIn: 3,
      rIn: 0.5,
      color: C.unit,
      fillOpacity: 0.9,
      showLabel: false,
    },
    // Target unit
    {
      id: 'A',
      type: 'circle',
      cxIn: 1, cyIn: 1.5,
      rIn: 0.5,
      color: C.enemy,
      fillOpacity: 0.9,
      showLabel: false,
    },
    // LoS Line 1
    {
      id: 'line1',
      type: 'callout',
      x1In: 3.5, y1In: 3,
      x2In: 1, y2In: 1,
      color: C.enemy,
      end1Style: 'none', end2Style: 'none',
      strokeColor: C.enemy,
    },
    // LoS Line 2
    {
      id: 'line2',
      type: 'callout',
      x1In: 3.5, y1In: 3,
      x2In: 1, y2In: 2,
      end1Style: 'none', end2Style: 'none'
    },
  ],
} satisfies BattlefieldDiagramConfig

// ─────────────────────────────────────────────────────────────────────────────
// VERTICAL MOVEMENT
//    Two Units with asymmetric LoS
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
      text: '4"',
      labelSizeIn: 0.4,
      end1Style: 'arrow', end2Style: 'none'
    },
    // Climbup pt2
    {
      id: 'cup2',
      type: 'callout',
      x1In: 3.5, y1In: 1.5,
      x2In: 2.5, y2In: 1.5,
      text: '1"',
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
      text: '1"',
      labelSizeIn: 0.4,
      end1Style: 'none', end2Style: 'arrow'
    },
    // Climbdown pt2
    {
      id: 'cdp2',
      type: 'callout',
      x1In: 7.5, y1In: 4,
      x2In: 7.5, y2In: 2,
      text: '2" Free',
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
      text: '2"',
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
//    Central blue unit. Three scenarios around it:
//    Right: green enemy within 1" → adjacent.
//    Left: wall between unit and red enemy → not adjacent.
//    Above: red enemy 2"+ away → not adjacent (too far).
// ─────────────────────────────────────────────────────────────────────────────
export const adjacencyDiagram = {
  board: { widthIn: 6, heightIn: 6 },
  pixelsPerInch: 48,
  showCenterLines: false,
  elements: [
    // Central unit
    {
      id: 'U',
      type: 'circle',
      cxIn: 3, cyIn: 3,
      rIn: 0.5,
      color: C.unit,
      fillOpacity: 0.9,
      showInLegend: false, showLabel: false
    },
    // Adjacency radius circle around unit
    {
      id: 'RNG',
      type: 'circle',
      cxIn: 3, cyIn: 3,
      rIn: 1.5,
      color: C.range,
      fillOpacity: 0.07,
      showLabel: false,
    },
    // Adjacency radius callout
    {
      id: 'arco',
      type: 'callout',
      x1In: 3, y1In: 2.5,
      x2In: 3, y2In: 1.5,
      text: '1"',
      labelSizeIn: 0.4
    },
    // Adjacent
    {
      id: 'A',
      type: 'circle',
      cxIn: 4.5, cyIn: 3,
      rIn: 0.5,
      color: C.enemyGreen,
      fillOpacity: 0.9,
      labelSizeIn: 0.4
    },
    // Not Adjacent - Too far
    {
      id: 'N1',
      type: 'circle',
      cxIn: 4.5, cyIn: 5,
      rIn: 0.5,
      color: C.enemy,
      fillOpacity: 0.9,
      labelSizeIn: 0.4
    },
    // Not Adjacent - Wall
    {
      id: 'N2',
      type: 'circle',
      cxIn: 1.5, cyIn: 3,
      rIn: 0.5,
      color: C.enemy,
      fillOpacity: 0.9,
      labelSizeIn: 0.4
    },
    // Wall
    { 
      id: 'wall',
      type: 'rect',
      xIn: 2.2, yIn: 1,
      wIn: 0.05, hIn: 4,
      showInLegend: false, showLabel: false
    }
  ],
  legend: {
    A: { label: 'Adjacent', color: C.enemyGreen },
    N1: { label: 'Not Adjacent - Too Far', color: C.enemy },
    N2: { label: 'Not Adjacent - Wall', color: C.enemy },
  }
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
