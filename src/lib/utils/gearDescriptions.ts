import { Special } from '@/types/special.model'

const PLACEHOLDER_RE = /\{\{([A-Z0-9]+)\}\}/g

/**
 * Resolves {{CODE}} placeholders in a Gear.description string against
 * scope: 'U' Special rows. Unmatched codes are left unresolved (rendered
 * literally) rather than stripped or replaced with a fallback string.
 *
 * Supports parameterized codes using the same `_` wildcard convention as
 * parseSpecialRules() — e.g. a Special with code "TGH_" matches a
 * placeholder {{TGH1}}, substituting "1" for every "_" in that Special's
 * description.
 */
export function resolveGearDescription(
  description: string,
  allSpecials: Special[]
): string {
  return description.replace(PLACEHOLDER_RE, (match, code: string) => {
    const matched = allSpecials.find(s =>
      s.scope === 'U' &&
      (s.code.includes('_')
        ? code.startsWith(s.code.replace('_', ''))
        : s.code === code)
    )

    if (!matched) return match

    const param = matched.code.includes('_')
      ? code.replace(matched.code.replace('_', ''), '')
      : undefined

    return matched.description?.replaceAll('_', param ?? '') ?? match
  })
}
