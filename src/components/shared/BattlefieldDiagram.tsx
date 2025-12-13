'use client'

import { useEffect, useMemo, useRef } from 'react';

type DiagramGrid = string[][]
type LegendEntry = string | { label: string; color?: string }
type DiagramLegend = Partial<Record<string, LegendEntry>>

export type BattlefieldDiagramProps = {
  grid: DiagramGrid
  legend?: DiagramLegend
  cellSize?: number
  className?: string
}

const CODE_COLORS: Record<string, string> = {
  DA: '#dc2626',
  DB: '#2563eb',
  DD: '#2563eb',
  DU: '#2563eb',
  O1: '#059669',
  O2: '#059669',
  O3: '#059669',
  S1: '#dc2626',
  S2: '#dc2626',
  S3: '#dc2626',
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
const gridColor = '#0f172a'
const tileLabelColor = '#94a3b8'
const TILE_ROW_LABELS = ['N', 'C', 'S']
const TILE_COL_LABELS = ['W', 'C', 'E']
const FONT_FAMILY = '"Geist", "Geist Sans", system-ui, sans-serif'

function buildColorMap(codes: string[], legend?: DiagramLegend) {
  const map = new Map<string, string>()
  let paletteIndex = 0
  codes.forEach((code, index) => {
    const legendEntry = legend?.[code]
    const legendColor =
      typeof legendEntry === 'object' && legendEntry !== null
        ? legendEntry.color
        : undefined
    const color =
      CODE_COLORS[code] ??
      legendColor ??
      COLOR_PALETTE[paletteIndex++ % COLOR_PALETTE.length]
    map.set(code, color)
  })
  return map
}

function getLegendLabel(entry?: LegendEntry) {
  if (!entry) {
    return 'Unspecified zone'
  }

  if (typeof entry === 'string') {
    return entry
  }

  return entry.label ?? 'Unspecified zone'
}

function resolveTileLabel(rowIndex: number, colIndex: number) {
  const rowSymbol = TILE_ROW_LABELS[rowIndex] ?? ''
  const colSymbol = TILE_COL_LABELS[colIndex] ?? ''

  const parts: string[] = []
  if (rowSymbol && rowSymbol !== 'C') {
    parts.push(rowSymbol)
  }
  if (colSymbol && colSymbol !== 'C') {
    parts.push(colSymbol)
  }

  if (parts.length > 0) {
    return parts.join('')
  }

  if (rowSymbol === 'C' || colSymbol === 'C') {
    return 'C'
  }

  return ''
}

export default function BattlefieldDiagram({
  grid,
  legend,
  cellSize = 20,
  className
}: BattlefieldDiagramProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const uniqueCodes = useMemo(() => {
    const set = new Set<string>()
    grid.forEach((row) =>
      row.forEach((cell) => {
        const trimmed = cell?.trim()
        if (trimmed) {
          set.add(trimmed)
        }
      })
    )
    return Array.from(set).sort()
  }, [grid])

  const colorMap = useMemo(
    () => buildColorMap(uniqueCodes, legend),
    [uniqueCodes, legend]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || grid.length === 0) {
      return
    }

    const rows = grid.length
    const cols = grid[0]?.length ?? 0
    const dpr = window.devicePixelRatio || 1
    const width = cols * cellSize
    const height = rows * cellSize

    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    context.setTransform(1, 0, 0, 1, 0, 0)
    context.scale(dpr, dpr)
    context.fillStyle = backgroundColor
    context.fillRect(0, 0, width, height)

    const renderTileLabels = () => {
      const tilesPerRow = Math.ceil(cols / 5)
      const tilesPerColumn = Math.ceil(rows / 5)
      const tileSize = cellSize * 5
      const tileLabelFontSize = Math.max(32, tileSize * 0.5)
      context.fillStyle = tileLabelColor
      context.globalAlpha = 0.35
      context.font = `bold ${tileLabelFontSize}px ${FONT_FAMILY}`
      context.textAlign = 'center'
      context.textBaseline = 'middle'

      for (let tileRow = 0; tileRow < tilesPerColumn; tileRow += 1) {
        for (let tileCol = 0; tileCol < tilesPerRow; tileCol += 1) {
          const label = resolveTileLabel(tileRow, tileCol)
          if (!label) continue
          const x = tileCol * tileSize + tileSize / 2
          const y = tileRow * tileSize + tileSize / 2
          const maxWidth = tileSize * 0.9
          context.fillText(label, x, y, maxWidth)
        }
      }
      context.globalAlpha = 1
    }

    const renderCells = () => {
      grid.forEach((row, rowIndex) => {
        row.forEach((cell, columnIndex) => {
          const trimmed = cell?.trim()
          if (!trimmed) return
          const x = columnIndex * cellSize
          const y = rowIndex * cellSize
          context.fillStyle = `${colorMap.get(trimmed)}33`
          context.fillRect(x, y, cellSize, cellSize)
          context.strokeStyle = colorMap.get(trimmed) ?? gridColor
          context.lineWidth = 2
          context.strokeRect(x, y, cellSize, cellSize)

          context.fillStyle = gridColor
          context.font = `bold ${Math.max(10, cellSize * 0.4)}px ${FONT_FAMILY}`
          context.textAlign = 'center'
          context.textBaseline = 'middle'
          context.fillText(
            trimmed,
            x + cellSize / 2,
            y + cellSize / 2,
            cellSize - 4
          )
        })
      })
    }

    const renderGridLines = () => {
      context.strokeStyle = gridColor
      for (let i = 0; i <= rows; i += 1) {
        const lineWidth = i % 5 === 0 ? 2 : 1
        context.lineWidth = lineWidth
        context.beginPath()
        context.moveTo(0, i * cellSize)
        context.lineTo(width, i * cellSize)
        context.stroke()
      }

      for (let j = 0; j <= cols; j += 1) {
        const lineWidth = j % 5 === 0 ? 2 : 1
        context.lineWidth = lineWidth
        context.beginPath()
        context.moveTo(j * cellSize, 0)
        context.lineTo(j * cellSize, height)
        context.stroke()
      }
    }

    renderTileLabels()
    renderCells()
    renderGridLines()
  }, [grid, cellSize, colorMap])

  if (!grid.length) {
    return null
  }

  return (
    <div className={className}>
      <div className="bg-card p-3">
        <canvas
          ref={canvasRef}
          className="block"
          style={{ touchAction: 'pan-x pan-y' }}
        />
      </div>
      {uniqueCodes.length > 0 && (
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          {uniqueCodes.map((code) => {
            const resolvedColor = colorMap.get(code) ?? gridColor
            return (
              <div key={code} className="flex items-center gap-2">
                <span
                  className="inline-block h-4 w-4 rounded border"
                  style={{
                    backgroundColor: `${resolvedColor}33`,
                    borderColor: resolvedColor
                  }}
                />
                <span className="font-semibold">{code}</span>
                <span className="text-muted">
                  {getLegendLabel(legend?.[code])}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
