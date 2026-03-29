import { GearPlain, SquadPlain, UnitPlain, UnitTypePlain } from '@/types'

export function dateToDisplay(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function toLocalIsoDate(date: Date): string {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return local.toISOString().split('T')[0] // YYYY-MM-DD
}

export function getRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function ucwords(str: string): string {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

export function sanitizeFileName(fileName: string): string {
  // Remove any character that isn't a letter, number, space, or hyphen
  return fileName
    .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric characters (except spaces and hyphens)
    .replace(/[\s_-]+/g, '_') // Replace spaces or multiple underscores with a single underscore
    .toLowerCase() // Optionally make it lowercase for consistency
}

export function getUnitUniqueSkills(squad?: SquadPlain, unit?: UnitPlain) {

  if (!unit || !squad) return []

  const keyOfGear = (a: GearPlain) => a.gearName

  const otherUnitKeys = new Set<string>()

  for (const other of squad.units ?? []) {
    if (!other || other.unitId === unit.unitId) continue
    for (const a of other.skills ?? []) otherUnitKeys.add(keyOfGear(a))
  }

  // (Optional) de-dupe within this unit using a seen set
  const seenA = new Set<string>()

  const uniqueSkills = (unit.skills ?? []).filter(a => {
    const k = keyOfGear(a)
    if (seenA.has(k)) return false
    seenA.add(k)
    return !otherUnitKeys.has(k)
  })

  return uniqueSkills
}

export function getSquadRepeatedSkills(squad: SquadPlain | undefined) {
  if (!squad || !squad.units) return []

  // Count occurrences by ID, and remember a representative item for output
  const gearCount = new Map<string, number>()
  const gearFirst = new Map<string, GearPlain>()

  for (const unit of squad.units) {
    for (const a of unit?.skills ?? []) {
      const id = a.gearName
      if (!gearFirst.has(id)) gearFirst.set(id, a)
      gearCount.set(id, (gearCount.get(id) ?? 0) + 1)
    }
  }

  // Collect repeated items once, in first-seen order
  const skills: GearPlain[] = []
  const addedA = new Set<string>()

  for (const unit of squad.units) {
    for (const a of unit?.skills ?? []) {
      const id = a.gearName
      if (!addedA.has(id) && (gearCount.get(id) ?? 0) > 1) {
        skills.push(gearFirst.get(id)!)
        addedA.add(id)
      }
    }
  }

  return skills
}

export function userPath(userName: string) {
  return `/users/${encodeURIComponent(userName)}`
}


export function calcGP(unit: UnitPlain | UnitTypePlain): string {
  const unitGP = 
    5 +
    ((unit.ACT ?? 0) - 2) +
    ((unit.MSK ?? 0) - 2) +
    ((unit.RSK ?? 0) - 2) +
    ((unit.ARM ?? 0) - 2) +
    ((unit.HIT ?? 0) - 2)
  
  let wepGP = 0

  unit.weapons?.forEach(wep => {
    wepGP +=
      (wep.ATT ?? 0) + (wep.TYP === 'M' ? -1 : 0) +
      (wep.special === '' ? 0 : 
        ((wep.special ?? '').split(' ').length)
      )
  })

  return unitGP + '+' + wepGP + '=' + (unitGP + wepGP)
}
