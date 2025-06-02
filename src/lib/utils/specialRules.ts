export type SpecialRule = {
  specialId: string
  scope?: string
  code?: string
  specialName: string
  description: string
}

export function parseSpecialRules(
  allSpecials: SpecialRule[],
  scope: string,
  specialsToParse: string
): SpecialRule[] {
  const parsed: SpecialRule[] = []

  // Tokens are the individual specials passed in (split on space)
  const tokens = specialsToParse.toUpperCase().trim().split(/\s+/)
  
  // For each token/special passed in
  for (const token of tokens) {
    // Find matches - Either exact match or replace on param "_"
    const matched = allSpecials.find(rule =>
      rule.scope === scope &&
      rule.code?.includes("_")
        ? token.startsWith(rule.code.replace("_", ""))
        : rule.code === token
    )

    if (matched && matched.code) {
      // Find the param if we have one (e.g. LDR2 would have param 2)
      const param = matched.specialId.includes("_")
        ? token.replace(matched.code.replace("_", ""), "")
        : undefined

      const code = matched.code.replaceAll("_", param || "")
      const description =  matched.description.replaceAll("_", param || "")
      const specialName = matched.specialName.replaceAll("_", param || "")

      parsed.push({
        specialId: matched.specialId,
        scope: matched.scope,
        code: code,
        specialName: specialName,
        description: description
      })
    } else {
      parsed.push({
        specialId: token,
        scope,
        code: token,
        specialName: token,
        description: "(Unknown rule)",
      })
    }
  }

  return parsed
}