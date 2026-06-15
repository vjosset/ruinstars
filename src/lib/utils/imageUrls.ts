export function getUnitPortraitUrl(unitId: string): string {
  return `/api/units/${unitId}/portrait`
}

export function getSquadPortraitUrl(squadId: string): string {
  return `/api/squads/${squadId}/portrait`
}

export function toEpochMs(d?: Date | string | number | null) {
  if (!d) return undefined
  if (d instanceof Date) return d.getTime()
  if (typeof d === 'number') return d
  const t = Date.parse(d) // string
  return Number.isFinite(t) ? t : (new Date()).getTime()
}

export function squadHasRealart(squadTypeId: string) {
  return [ 'DRN' ].includes(squadTypeId)
}