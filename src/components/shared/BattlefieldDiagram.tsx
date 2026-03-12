'use client'

import { useMemo } from 'react'

export type DiagramLegendEntry = string | { label: string; color?: string }
export type DiagramLegend = Partial<Record<string, DiagramLegendEntry>>

type DiagramElementBase = {
  id: string
  label?: string
  color?: string
  strokeColor?: string
  fillOpacity?: number
  showLabel?: boolean
  showInLegend?: boolean
  labelSizeIn?: number
}

export type DiagramCircle = DiagramElementBase & {
  type: 'circle'
  cxIn: number
  cyIn: number
  rIn: number
}

export type DiagramRect = DiagramElementBase & {
  type: 'rect'
  xIn: number
  yIn: number
  wIn: number
  hIn: number
  cornerRadiusIn?: number
}

export type DiagramMarker = DiagramElementBase & {
  type: 'marker'
  xIn: number
  yIn: number
  sizeIn?: number
}

export type DiagramText = DiagramElementBase & {
  type: 'text'
  xIn: number
  yIn: number
  text: string
  anchor?: 'start' | 'middle' | 'end'
}

export type CalloutEndStyle = 'nub' | 'arrow' | 'none'

export type DiagramCallout = DiagramElementBase & {
  type: 'callout'
  x1In: number
  y1In: number
  x2In: number
  y2In: number
  text?: string
  textOffsetIn?: number
  tickSizeIn?: number
  textAnchor?: 'start' | 'middle' | 'end'
  end1Style?: CalloutEndStyle
  end2Style?: CalloutEndStyle
}

export type DiagramElement =
  | DiagramCircle
  | DiagramRect
  | DiagramMarker
  | DiagramText
  | DiagramCallout

export type BattlefieldDiagramConfig = {
  board?: {
    widthIn?: number
    heightIn?: number
  }
  pixelsPerInch?: number
  showGrid?: boolean
  showCenterLines?: boolean
  elements: DiagramElement[]
  legend?: DiagramLegend
}

export type BattlefieldDiagramProps = {
  diagram: BattlefieldDiagramConfig
  className?: string
}

const DEFAULT_BOARD = { widthIn: 24, heightIn: 24 }
const DEFAULT_PIXELS_PER_INCH = 16
const DEFAULT_LABEL_SIZE_IN = 0.6
const DEFAULT_CALLOUT_TEXT_SIZE_IN = 0.8
const DEFAULT_CALLOUT_TICK_IN = 0.3
const DEFAULT_MARKER_SIZE_IN = 1
const DEFAULT_STROKE_IN = 0.06
const DEFAULT_CENTER_LINE_IN = 0.08

const CODE_COLORS: Record<string, string> = {
  DU: '#2563eb',
  S1: '#dc2626',
  S2: '#dc2626',
  S3: '#dc2626',
  S4: '#dc2626',
  S5: '#dc2626',
  S6: '#dc2626',
}

const COLOR_PALETTE = [
  '#059669',
  '#f97316',
  '#7c3aed',
  '#0ea5e9',
  '#d946ef',
  '#facc15',
  '#10b981',
  '#f43f5e'
]

const backgroundColor = '#ffffff'
const gridColor = '#666'
const textColor = '#000'
const calloutColor = '#f97316'
const FONT_FAMILY = '"Geist", "Geist Sans", system-ui, sans-serif'

function getLegendLabel(entry?: DiagramLegendEntry) {
  if (!entry) return 'Unspecified'
  if (typeof entry === 'string') return entry
  return entry.label ?? 'Unspecified'
}

function buildColorMap(
  ids: string[],
  elements: DiagramElement[],
  legend?: DiagramLegend
) {
  const map = new Map<string, string>()
  let paletteIndex = 0
  ids.forEach((id) => {
    const element = elements.find((item) => item.id === id)
    const legendEntry = legend?.[id]
    const legendColor =
      typeof legendEntry === 'object' && legendEntry !== null
        ? legendEntry.color
        : undefined
    const color =
      element?.color ??
      CODE_COLORS[id] ??
      legendColor ??
      COLOR_PALETTE[paletteIndex++ % COLOR_PALETTE.length]
    map.set(id, color)
  })
  return map
}

function resolveElementLabel(element: DiagramElement) {
  if (element.type === 'text') {
    return element.text
  }
  return element.label ?? element.id
}

export default function BattlefieldDiagram({
  diagram,
  className
}: BattlefieldDiagramProps) {
  const board = diagram.board ?? DEFAULT_BOARD
  const widthIn = board.widthIn ?? DEFAULT_BOARD.widthIn
  const heightIn = board.heightIn ?? DEFAULT_BOARD.heightIn
  const pixelsPerInch = diagram.pixelsPerInch ?? DEFAULT_PIXELS_PER_INCH
  const showCenterLines = diagram.showCenterLines ?? true

  const legendIds = useMemo(() => {
    const ids = new Set<string>()
    if (diagram.legend) {
      Object.keys(diagram.legend).forEach((key) => ids.add(key))
    }
    diagram.elements.forEach((element) => {
      if (element.showInLegend === false) return
      if (element.label || diagram.legend?.[element.id]) {
        ids.add(element.id)
      }
    })
    return Array.from(ids)
  }, [diagram.elements, diagram.legend])

  const colorMap = useMemo(
    () => buildColorMap(legendIds, diagram.elements, diagram.legend),
    [legendIds, diagram.elements, diagram.legend]
  )

  const showGrid = diagram.showGrid ?? false

  const widthPx = widthIn * pixelsPerInch
  const heightPx = heightIn * pixelsPerInch
  const inToPx = (valueIn: number) => valueIn * pixelsPerInch

  return (
    <div className={className}>
      <div className="bg-card p-3">
        <div className={`grid gap-6 ${legendIds.length > 0 ? 'grid-cols-2 items-start' : ''}`}>
          <div
            className="relative w-full"
            style={{ paddingTop: `${(heightIn / widthIn) * 100}%` }}
          >
            <svg
              className="absolute inset-0 block h-full w-full"
              viewBox={`0 0 ${widthPx} ${heightPx}`}
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Battlefield diagram"
              style={{
                printColorAdjust: 'exact',
                WebkitPrintColorAdjust: 'exact'
              }}
            >
              <rect
                x={0}
                y={0}
                width={widthPx}
                height={heightPx}
                fill={backgroundColor}
                stroke={gridColor}
                strokeWidth={inToPx(DEFAULT_STROKE_IN)}
              />
              {showGrid && (
                <>
                  {Array.from({ length: Math.round(widthIn) - 1 }, (_, i) => (
                    <line
                      key={`vgrid-${i + 1}`}
                      x1={inToPx(i + 1)} y1={0}
                      x2={inToPx(i + 1)} y2={heightPx}
                      stroke={gridColor}
                      strokeWidth={inToPx(DEFAULT_STROKE_IN * 0.5)}
                      strokeOpacity={0.4}
                    />
                  ))}
                  {Array.from({ length: Math.round(heightIn) - 1 }, (_, i) => (
                    <line
                      key={`hgrid-${i + 1}`}
                      x1={0} y1={inToPx(i + 1)}
                      x2={widthPx} y2={inToPx(i + 1)}
                      stroke={gridColor}
                      strokeWidth={inToPx(DEFAULT_STROKE_IN * 0.5)}
                      strokeOpacity={0.4}
                    />
                  ))}
                </>
              )}
              {showCenterLines && (
                <>
                  <line
                    x1={widthPx / 2}
                    y1={0}
                    x2={widthPx / 2}
                    y2={heightPx}
                    stroke={gridColor}
                    strokeWidth={inToPx(DEFAULT_CENTER_LINE_IN)}
                  />
                  <line
                    x1={0}
                    y1={heightPx / 2}
                    x2={widthPx}
                    y2={heightPx / 2}
                    stroke={gridColor}
                    strokeWidth={inToPx(DEFAULT_CENTER_LINE_IN)}
                  />
                </>
              )}
              {diagram.elements.map((element) => {
                const baseColor =
                  element.color ?? colorMap.get(element.id) ?? gridColor
                const strokeColor = element.strokeColor ?? baseColor
                const fillOpacity = element.fillOpacity ?? 0.2
                const labelSizeIn = element.labelSizeIn ?? DEFAULT_LABEL_SIZE_IN
                const labelText = resolveElementLabel(element)
                const showLabel = element.showLabel ?? element.type !== 'callout'

                if (element.type === 'circle') {
                  return (
                    <g key={element.id}>
                      <circle
                        cx={inToPx(element.cxIn)}
                        cy={inToPx(element.cyIn)}
                        r={inToPx(element.rIn)}
                        fill={baseColor}
                        fillOpacity={fillOpacity}
                        stroke={strokeColor}
                        strokeWidth={inToPx(DEFAULT_STROKE_IN)}
                      />
                      {showLabel && (
                        <text
                          x={inToPx(element.cxIn)}
                          y={inToPx(element.cyIn)}
                          fontFamily={FONT_FAMILY}
                          fontSize={inToPx(labelSizeIn)}
                          fontWeight={700}
                          fill={textColor}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {labelText}
                        </text>
                      )}
                    </g>
                  )
                }

                if (element.type === 'rect') {
                  const x = inToPx(element.xIn)
                  const y = inToPx(element.yIn)
                  const width = inToPx(element.wIn)
                  const height = inToPx(element.hIn)
                  return (
                    <g key={element.id}>
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        rx={inToPx(element.cornerRadiusIn ?? 0)}
                        fill={baseColor}
                        fillOpacity={fillOpacity}
                        stroke={strokeColor}
                        strokeWidth={inToPx(DEFAULT_STROKE_IN)}
                      />
                      {showLabel && (
                        <text
                          x={x + width / 2}
                          y={y + height / 2}
                          fontFamily={FONT_FAMILY}
                          fontSize={inToPx(labelSizeIn)}
                          fontWeight={700}
                          fill={textColor}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {labelText}
                        </text>
                      )}
                    </g>
                  )
                }

                if (element.type === 'marker') {
                  const sizeIn = element.sizeIn ?? DEFAULT_MARKER_SIZE_IN
                  const sizePx = inToPx(sizeIn)
                  const x = inToPx(element.xIn) - sizePx / 2
                  const y = inToPx(element.yIn) - sizePx / 2
                  return (
                    <g key={element.id}>
                      <rect
                        x={x}
                        y={y}
                        width={sizePx}
                        height={sizePx}
                        fill={baseColor}
                        fillOpacity={fillOpacity}
                        stroke={strokeColor}
                        strokeWidth={inToPx(DEFAULT_STROKE_IN)}
                      />
                      {showLabel && (
                        <text
                          x={x + sizePx / 2}
                          y={y + sizePx / 2}
                          fontFamily={FONT_FAMILY}
                          fontSize={inToPx(labelSizeIn)}
                          fontWeight={700}
                          fill={textColor}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {labelText}
                        </text>
                      )}
                    </g>
                  )
                }

                if (element.type === 'text') {
                  return (
                    <text
                      key={element.id}
                      x={inToPx(element.xIn)}
                      y={inToPx(element.yIn)}
                      fontFamily={FONT_FAMILY}
                      fontSize={inToPx(element.labelSizeIn ?? DEFAULT_LABEL_SIZE_IN)}
                      fontWeight={700}
                      fill={baseColor}
                      textAnchor={element.anchor ?? 'middle'}
                      dominantBaseline="middle"
                    >
                      {element.text}
                    </text>
                  )
                }

                const x1 = inToPx(element.x1In)
                const y1 = inToPx(element.y1In)
                const x2 = inToPx(element.x2In)
                const y2 = inToPx(element.y2In)
                const dx = x2 - x1
                const dy = y2 - y1
                const length = Math.hypot(dx, dy) || 1
                const ux = dx / length  // unit vector along line
                const uy = dy / length
                const nx = -uy   // unit normal (perpendicular)
                const ny = ux
                const tickSize =
                  inToPx(element.tickSizeIn ?? DEFAULT_CALLOUT_TICK_IN) / 2
                const arrowLen = tickSize * 2
                const textOffset = inToPx(
                  element.textOffsetIn ?? DEFAULT_LABEL_SIZE_IN
                )
                const textX = (x1 + x2) / 2 + nx * textOffset
                const textY = (y1 + y2) / 2 + ny * textOffset
                const calloutStroke = element.strokeColor ?? calloutColor

                const end1Style = element.end1Style ?? 'nub'
                const end2Style = element.end2Style ?? 'nub'

                // Shorten the main line at any arrow ends so it doesn't protrude
                const lineX1 = end1Style === 'arrow' ? x1 + ux * arrowLen : x1
                const lineY1 = end1Style === 'arrow' ? y1 + uy * arrowLen : y1
                const lineX2 = end2Style === 'arrow' ? x2 - ux * arrowLen : x2
                const lineY2 = end2Style === 'arrow' ? y2 - uy * arrowLen : y2

                // Renders a nub, arrow, or nothing at a given endpoint.
                // dirX/dirY is the unit vector pointing outward from the line at that end.
                const renderEnd = (
                  px: number, py: number,
                  dirX: number, dirY: number,
                  style: CalloutEndStyle
                ) => {
                  if (style === 'none') return null
                  if (style === 'nub') {
                    return (
                      <line
                        x1={px - nx * tickSize}
                        y1={py - ny * tickSize}
                        x2={px + nx * tickSize}
                        y2={py + ny * tickSize}
                        stroke={calloutStroke}
                        strokeWidth={inToPx(DEFAULT_STROKE_IN)}
                      />
                    )
                  }
                  // arrow: filled triangle, tip at (px, py)
                  const baseX = px - dirX * arrowLen
                  const baseY = py - dirY * arrowLen
                  return (
                    <polygon
                      points={[
                        `${px},${py}`,
                        `${baseX + nx * tickSize},${baseY + ny * tickSize}`,
                        `${baseX - nx * tickSize},${baseY - ny * tickSize}`,
                      ].join(' ')}
                      fill={calloutStroke}
                      stroke="none"
                    />
                  )
                }

                return (
                  <g key={element.id}>
                    <line
                      x1={lineX1}
                      y1={lineY1}
                      x2={lineX2}
                      y2={lineY2}
                      stroke={calloutStroke}
                      strokeWidth={inToPx(DEFAULT_STROKE_IN)}
                    />
                    {renderEnd(x1, y1, -ux, -uy, end1Style)}
                    {renderEnd(x2, y2,  ux,  uy, end2Style)}
                    {element.text && (
                      <text
                        x={textX}
                        y={textY}
                        fontFamily={FONT_FAMILY}
                        fontSize={inToPx(
                          element.labelSizeIn ?? DEFAULT_CALLOUT_TEXT_SIZE_IN
                        )}
                        fontWeight={700}
                        fill={calloutStroke}
                        textAnchor={element.textAnchor ?? 'middle'}
                        dominantBaseline="middle"
                      >
                        {element.text}
                      </text>
                    )}
                  </g>
                )
              })}
            </svg>
          </div>

          {legendIds.length > 0 && (
            <div className="min-w-0 content-start grid gap-2 text-sm">
              {legendIds.map((id) => {
                const resolvedColor = colorMap.get(id) ?? gridColor
                return (
                  <div key={id} className="flex items-center gap-2">
                    <span
                      className="inline-block h-4 w-4 rounded border"
                      style={{
                        backgroundColor: `${resolvedColor}33`,
                        borderColor: resolvedColor
                      }}
                    />
                    <span className="font-semibold">{id}</span>
                    <span className="text-muted">
                      {getLegendLabel(diagram.legend?.[id])}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
