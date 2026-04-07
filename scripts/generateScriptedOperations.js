#!/usr/bin/env node
/*
  Parse operation Markdown files in `==Notes/ScriptedOperations` (excluding `==List.md`)
  and emit `src/data/scriptedOperations.json` as an array of operation objects.

  The parser is heuristic and aims to extract:
  - operation.title
  - operation.slug (from filename)
  - operation.description (intro under H1 before first mission)
  - operation.factions (best-effort from the intro line: "X vs Y Operation")
  - operation.missions[] with:
    - id (e.g., 1, 2A, 3B)
    - title
    - description (italic/narration under mission header)
    - battlefield
    - setup[] (array of items)
    - deployment[]
    - special[]
    - victory[]
*/

const fs = require('fs')
const path = require('path')

const ROOT = process.cwd()
const NOTES_DIR = path.join(ROOT, '==Notes', 'ScriptedOperations')
const OUT_PATH = path.join(ROOT, 'src', 'data', 'old', 'scriptedOperations.json')

function readFiles(dir) {
  const names = fs.readdirSync(dir, 'utf8')
  return names
    .filter((n) => n.endsWith('.md') && n !== '==List.md')
    .map((n) => ({ name: n, path: path.join(dir, n) }))
}

function normalizeText(s) {
  return s
    .replace(/\r\n/g, '\n')
    .replace(/\u00A0/g, ' ')
    .replace(/[\t ]+$/gm, '')
    .trim()
}

function stripItalics(s) {
  // Remove leading/ending single emphasis markers if they wrap the entire paragraph
  const trimmed = s.trim()
  if ((trimmed.startsWith('*') && trimmed.endsWith('*')) || (trimmed.startsWith('_') && trimmed.endsWith('_'))) {
    return trimmed.slice(1, -1).trim()
  }
  return s.trim()
}

function trimBlankLines(text) {
  // Remove leading/trailing blank lines but keep internal formatting and spaces
  const lines = text.split('\n')
  let start = 0
  while (start < lines.length && lines[start].trim() === '') start++
  let end = lines.length - 1
  while (end >= start && lines[end].trim() === '') end--
  return lines.slice(start, end + 1).join('\n')
}

function collectSectionsByScan(block) {
  // Scan mission block for ### <Heading> sections and capture their content.
  // Returns a map: { headingNameLower: contentString }
  const map = {}
  const lines = block.split('\n')
  let current = null
  let buf = []
  function flush() {
    if (current) {
      map[current] = trimBlankLines(buf.join('\n'))
    }
    current = null
    buf = []
  }
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const h3 = line.match(/^###\s+(.+?)\s*$/)
    const h2 = line.match(/^##\s+/)
    const sep = line.match(/^---+\s*$/)
    if (h2 && !line.match(/^##\s+Mission\b/)) {
      // Another H2 within the mission block (rare) ends sections
      flush()
      continue
    }
    if (sep) {
      flush()
      continue
    }
    if (h3) {
      // Starting a new section
      flush()
      current = h3[1].trim().toLowerCase()
      continue
    }
    if (current) {
      buf.push(line)
    }
  }
  flush()
  return map
}

function parseListy(content) {
  // Convert a text blob into an array of bullet-ish items; keep paragraphs as items
  if (!content) return []
  const lines = content.split('\n')
  const items = []
  let buf = []
  function flushBuf() {
    if (buf.length) {
      const item = buf.join(' ').replace(/\s{2,}/g, ' ').trim()
      if (item) items.push(item)
      buf = []
    }
  }
  for (const line of lines) {
    const l = line.trim()
    if (!l) { flushBuf(); continue }
    const bullet = l.match(/^[-*+]\s+(.*)$/)
    if (bullet) {
      flushBuf()
      items.push(bullet[1].trim())
    } else {
      buf.push(l)
    }
  }
  flushBuf()
  return items
}

function extractBattlefield(block) {
  // Handle **Battlefield: X** or ### Battlefield then next non-empty line(s)
  const inline = /\*\*\s*Battlefield\s*:\s*([^*\n]+)\s*\*\*/i.exec(block)
  if (inline) return inline[1].trim()
  const sections = collectSectionsByScan(block)
  const section = sections['battlefield']
  if (section) {
    // Take the first non-empty line
    const first = section.split('\n').map((s) => s.trim()).filter(Boolean)[0]
    if (first) return first
  }
  return null
}

function extractIntro(content) {
  // Between H1 and first mission divider (--- or ## Mission)
  // Return cleaned text and attempt factions from "X vs Y Operation"
  const h1 = /^#\s+(.+?)\s*$/m.exec(content)
  const start = h1 ? h1.index + h1[0].length : 0
  const after = content.slice(start)
  const end = /(\n(?=##\s+Mission)|\n(?=---\s*)|$)/m.exec(after)
  let intro = normalizeText(after.slice(0, end ? end.index : after.length))
  let factions = null
  const cleanFaction = (s) => s.replace(/^(An|A)\s+/i, '').trim()
  const match = /(\b[A-Za-z' ]+?)\s+vs\s+([A-Za-z' ]+?)\s+Operation\b/i.exec(intro)
  if (match) {
    factions = { sideA: cleanFaction(match[1]), sideB: cleanFaction(match[2]) }
  }
  // Fallback: grab first emphasized paragraph after H1
  if (!intro) {
    const afterLines = after.split('\n').map((s) => s.trim())
    const firstItal = afterLines.find((l) => /^\*(.+)\*$/.test(l) || /^_(.+)_$/.test(l))
    if (firstItal) {
      intro = stripItalics(firstItal)
      if (!factions) {
        const m2 = /(\b[A-Za-z' ]+?)\s+vs\s+([A-Za-z' ]+?)\s+Operation\b/i.exec(intro)
        if (m2) factions = { sideA: cleanFaction(m2[1]), sideB: cleanFaction(m2[2]) }
      }
    }
  }
  return { intro, factions }
}

function extractMissions(content) {
  const missions = []
  const regex = /^##\s+Mission\s+([0-9]+[A-Z]?)\s*:\s*(.+?)\s*$/gmi
  let m
  const indices = []
  while ((m = regex.exec(content)) !== null) {
    indices.push({ idx: m.index, id: m[1].trim(), title: m[2].trim() })
  }
  // Append end marker
  indices.forEach((entry, i) => {
    const start = entry.idx
    const end = (i + 1 < indices.length) ? indices[i + 1].idx : content.length
    const block = content.slice(start, end)
    missions.push(parseMissionBlock(block, entry.id, entry.title))
  })
  return missions
}

function parseMissionBlock(block, id, title) {
  // Description: first paragraph after the header line
  const afterHeader = block.replace(/^.*$/m, '').slice(1) // remove the first header line
  // Grab the first non-heading, non-bold paragraph
  const paraMatch = /(\n|^)(?!###|##|\*\*Battlefield)([^\n].*?)(\n\n|\n(?=###|##)|$)/si.exec(afterHeader)
  let description = ''
  if (paraMatch) {
    description = stripItalics(normalizeText(paraMatch[2] || ''))
  }
  const battlefield = extractBattlefield(block)
  const sections = collectSectionsByScan(block)
  const setup = sections['setup'] || ''
  const deployment = sections['deployment'] || ''
  const special = sections['special'] || ''
  const victory = sections['victory'] || ''
  return { id, title, description, battlefield, setup, deployment, special, victory }
}

function parseOperation({ name, path: p }) {
  const raw = fs.readFileSync(p, 'utf8')
  const content = normalizeText(raw)
  const titleMatch = /^#\s+(.+?)\s*$/m.exec(content)
  const title = titleMatch ? titleMatch[1].trim() : path.basename(name, '.md')
  const { intro, factions } = extractIntro(content)
  const missions = extractMissions(content)
  return {
    slug: path.basename(name, '.md'),
    file: name,
    title,
    description: intro,
    factions,
    missions,
  }
}

function main() {
  if (!fs.existsSync(NOTES_DIR)) {
    console.error(`Notes directory not found: ${NOTES_DIR}`)
    process.exit(1)
  }
  const files = readFiles(NOTES_DIR)
  if (!files.length) {
    console.error('No markdown files found.')
    process.exit(1)
  }
  const ops = files.map(parseOperation)
  // Sort by slug for stability
  ops.sort((a, b) => a.slug.localeCompare(b.slug))
  const json = JSON.stringify(ops, null, 2)
  fs.writeFileSync(OUT_PATH, json + '\n', 'utf8')
  console.log(`Wrote ${ops.length} operations to ${path.relative(ROOT, OUT_PATH)}`)
}

if (require.main === module) {
  try {
    main()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
