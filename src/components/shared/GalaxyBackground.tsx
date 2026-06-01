'use client'

/**
 * GalaxyBackground - procedurally generated spiral galaxy background.
 *
 * Renders as a React Fragment (defs + g) to be composed as the first child
 * inside GalaxyMap's <svg>. Contains no interaction logic - replace this
 * file entirely to swap the visual style without touching the map.
 *
 * Technique:
 *  - Logarithmic spiral arms:  r = SPIRAL_A · e^(SPIRAL_B · θ)
 *  - Three star populations:   background disk, arm stars, core bulge
 *  - Arm glow via blurred SVG stroke paths following each spiral
 *  - Core glow via radial gradient + blurred disc
 *
 * Coordinate system (mirrors GalaxyMap.tsx - update if grid size changes):
 *   560 x 560 canvas, center (280, 280), galaxy boundary r = 224
 *
 * All element IDs are prefixed "galbg-" to avoid collisions with GalaxyMap.
 */

// ─── Constants ────────────────────────────────────────────────────────────────

const CELL = 35
const COLS = 16
const SIZE = COLS * CELL  // 560
const CENTER = SIZE / 2   // 280
const GALAXY_R = 224

// Spiral shape - tweak these to change arm geometry
const SPIRAL_A = 10     // starting radius (px from center)
const SPIRAL_B = 0.16   // winding tightness; higher = arms open faster
const MAX_THETA = 10 * Math.PI  // how far each arm sweeps (~2.5 full turns)
const TILT = -0.5       // global rotation offset in radians (~-29°)

// Star population sizes
const BACKGROUND_COUNT = 180
const ARM_COUNT = 1500   // stars per arm; raise for more density
const CORE_COUNT = 110

// Overall brightness - single knob to dim the whole background so dots stay readable
const BACKGROUND_OPACITY = 0.45

// ─── Seeded PRNG ──────────────────────────────────────────────────────────────

function makeRng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = ((Math.imul(s, 1664525) + 1013904223) >>> 0)
    return s / 0x100000000
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Star = { cx: number; cy: number; r: number; opacity: number }

// ─── Helpers ─────────────────────────────────────────────────────────────────

function inGalaxy(x: number, y: number): boolean {
  const dx = x - CENTER, dy = y - CENTER
  return dx * dx + dy * dy <= GALAXY_R * GALAXY_R
}

// ─── Star population generators ──────────────────────────────────────────────

/** Sparse background disk - thin, dim, distributed across the whole galaxy. */
function generateBackground(rng: () => number, count: number): Star[] {
  const out: Star[] = []
  let attempts = 0
  while (out.length < count && ++attempts < count * 25) {
    const cx = rng() * SIZE
    const cy = rng() * SIZE
    if (!inGalaxy(cx, cy)) continue
    const dx = cx - CENTER, dy = cy - CENTER
    const dist = Math.sqrt(dx * dx + dy * dy)
    // Flat density - but thin toward the very edge
    if (rng() > 0.12 + 0.5 * Math.pow(1 - dist / GALAXY_R, 0.4)) continue
    out.push({
      cx, cy,
      r: 0.3 + rng() * 0.7,
      opacity: 0.06 + rng() * 0.28,
    })
  }
  return out
}

/**
 * Stars distributed along one logarithmic spiral arm.
 * Scatter is perpendicular to the arm direction and widens with radius.
 */
function generateArm(rng: () => number, startAngle: number, count: number): Star[] {
  const out: Star[] = []
  const maxAttempts = count * 6

  for (let i = 0; i < maxAttempts && out.length < count; i++) {
    const t = rng()
    const theta = t * MAX_THETA
    const r = SPIRAL_A * Math.exp(SPIRAL_B * theta)
    if (r > GALAXY_R) continue

    const armAngle = theta + startAngle + TILT
    const perpAngle = armAngle + Math.PI / 2

    // Scatter width grows with radius so outer arm is fuzzier
    const scatterWidth = 12 + 80 * (r / GALAXY_R)
    // Uniform bilateral scatter - glow path provides the visual taper
    const scatter = (rng() * 2 - 1) * scatterWidth

    const cx = CENTER + r * Math.cos(armAngle) + scatter * Math.cos(perpAngle)
    const cy = CENTER + r * Math.sin(armAngle) + scatter * Math.sin(perpAngle)
    if (!inGalaxy(cx, cy)) continue

    // Stars closer to the arm spine are slightly brighter
    const onArm = Math.max(0, 1 - Math.abs(scatter) / scatterWidth)
    out.push({
      cx, cy,
      r: 0.4 + rng() * 1.3,
      opacity: 0.12 + rng() * 0.45 + onArm * 0.2,
    })
  }
  return out
}

/** Dense core bulge - heavily concentrated at the galactic centre. */
function generateCore(rng: () => number, count: number): Star[] {
  const out: Star[] = []
  let attempts = 0
  while (out.length < count && ++attempts < count * 15) {
    const angle = rng() * Math.PI * 2
    // rng()² biases radius strongly toward 0 → dense centre
    const r = Math.pow(rng(), 2) * 72
    const cx = CENTER + r * Math.cos(angle)
    const cy = CENTER + r * Math.sin(angle)
    if (!inGalaxy(cx, cy)) continue
    out.push({
      cx, cy,
      r: 0.5 + rng() * 1.6,
      opacity: 0.25 + rng() * 0.65,
    })
  }
  return out
}

// ─── Spiral path builder ─────────────────────────────────────────────────────

/** SVG path data string tracing one logarithmic spiral arm. */
function spiralPathData(startAngle: number): string {
  const pts: string[] = []
  for (let theta = 0; theta <= MAX_THETA; theta += 0.06) {
    const r = SPIRAL_A * Math.exp(SPIRAL_B * theta)
    if (r > GALAXY_R) break
    const angle = theta + startAngle + TILT
    const x = (CENTER + r * Math.cos(angle)).toFixed(1)
    const y = (CENTER + r * Math.sin(angle)).toFixed(1)
    pts.push(pts.length === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)
  }
  return pts.join(' ')
}

// ─── Static data (computed once at module load, never recalculated) ───────────

const _rng = makeRng(0xdeadbeef)

const STARS: Star[] = [
  ...generateBackground(_rng, BACKGROUND_COUNT),
  ...generateArm(_rng, 0,         ARM_COUNT),  // main arm 1
  ...generateArm(_rng, Math.PI,   ARM_COUNT),  // main arm 2
  ...generateCore(_rng, CORE_COUNT),
]

const ARM_PATH_1 = spiralPathData(0)
const ARM_PATH_2 = spiralPathData(Math.PI)

// ─── Component ───────────────────────────────────────────────────────────────

export default function GalaxyBackground() {
  return (
    <>
      <defs>
        {/* Galactic core - warm orange that fades out to the mid-ring */}
        <radialGradient id="galbg-core-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#f97316" stopOpacity="0.28" />
          <stop offset="20%"  stopColor="#f97316" stopOpacity="0.13" />
          <stop offset="55%"  stopColor="#78350f" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#09090b" stopOpacity="0"    />
        </radialGradient>

        {/* Wide blur for the diffuse arm glow */}
        <filter id="galbg-arm-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" />
        </filter>

        {/* Tighter blur for the bright inner core halo */}
        <filter id="galbg-core-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" />
        </filter>

        {/* Clip everything to the galaxy boundary */}
        <clipPath id="galbg-clip">
          <circle cx={CENTER} cy={CENTER} r={GALAXY_R} />
        </clipPath>
      </defs>

      <g clipPath="url(#galbg-clip)" opacity={BACKGROUND_OPACITY}>

        {/* ── Arm glow - blurred strokes tracing each spiral ── */}
        {/* Outer diffuse halo (wide, very dim) */}
        <path d={ARM_PATH_1} fill="none" stroke="white"   strokeWidth="55"
          opacity="0.055" strokeLinecap="round" filter="url(#galbg-arm-blur)" />
        <path d={ARM_PATH_2} fill="none" stroke="white"   strokeWidth="55"
          opacity="0.055" strokeLinecap="round" filter="url(#galbg-arm-blur)" />

        {/* Inner luminous spine (narrower, slightly warm) */}
        <path d={ARM_PATH_1} fill="none" stroke="#fde68a" strokeWidth="22"
          opacity="0.07" strokeLinecap="round" filter="url(#galbg-arm-blur)" />
        <path d={ARM_PATH_2} fill="none" stroke="#fde68a" strokeWidth="22"
          opacity="0.07" strokeLinecap="round" filter="url(#galbg-arm-blur)" />

        {/* ── Core glow ── */}
        <circle cx={CENTER} cy={CENTER} r={210} fill="url(#galbg-core-grad)" />
        {/* Bright central point */}
        <circle cx={CENTER} cy={CENTER} r={38}
          fill="#f97316" opacity="0.16" filter="url(#galbg-core-blur)" />

        {/* ── Stars ── */}
        {STARS.map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.opacity} />
        ))}
      </g>
    </>
  )
}
