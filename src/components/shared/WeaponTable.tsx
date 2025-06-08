'use client'
import { useModal } from '@/components/ui/ModalContext'
import { parseSpecialRules, SpecialRule } from '@/lib/utils/specialRules'
import { GearPlain } from '@/types'
import { Checkbox } from '../ui'

type WeaponTableProps = {
  weapons: GearPlain[]
  MSK: number
  RSK: number
  selectedGearIds?: string[]
  allSpecials: SpecialRule[]
  onToggleGear?: (gearId: string) => void
}

export default function WeaponTable({ 
  weapons,
  MSK,
  RSK,
  selectedGearIds = [],
  allSpecials,
  onToggleGear,
}: WeaponTableProps) {
  const { showModal } = useModal()

  // Sort the weapons
  weapons = weapons.sort((a, b) => {
    // First sort by category sequence
    const categorySeqDiff = (a.gearCategory?.seq || 0) - (b.gearCategory?.seq || 0)
    if (categorySeqDiff !== 0) return categorySeqDiff
    
    // Then by gear sequence
    const seqDiff = (a.seq || 0) - (b.seq || 0)
    if (seqDiff !== 0) return seqDiff
    
    // Finally by name
    return (a.gearName || '').localeCompare(b.gearName || '')
  })

  return (
    <div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-muted border-t border-border">
            <th className="text-left w-4/6"><h6>Weapons</h6></th>
            <th className="text-center w-1/6"><h6>ATT</h6></th>
            <th className="text-center w-1/6"><h6>SKL</h6></th>
          </tr>
        </thead>
        <tbody>
          {weapons.map((gear) => (
            <tr key={gear.gearId}>
              <td className="py-0.5">
                {onToggleGear && (
                  <Checkbox
                    type="checkbox"
                    checked={selectedGearIds.includes(gear.gearId)}
                    onChange={() => onToggleGear(gear.gearId)}
                  />
                )}
                { ' ' }
                <img className="inline highlightblack" src={`/icons/white/weptype${gear.TYP}.png`} width="13" />
                { ' ' }
                {gear.gearName}
                {gear.special != '' &&
                  <em className="cursor-pointer hover:text-main text-muted hastip" onClick={() => {
                    const parsed = parseSpecialRules(allSpecials, 'W', gear.special ?? '')
                    showModal({
                      title: gear.gearName,
                      body: (
                        <div className="space-y-4">
                          {parsed.map((special, idx) => (
                            <div key={idx}>
                              <span className="font-semibold text-muted">({special.code}) {special.specialName}:</span>
                              <p>{special.description}</p>
                            </div>
                          ))}
                        </div>
                      ),
                      footer: (<></>)
                    })
                  }}
                  >
                    ({gear.special})
                  </em>
                }  
                {gear.GP !== 0 &&
                  <sup className="text-xs text-muted"> {gear.GP}GP</sup>
                }
              </td>
              {/* Using leading-none to remove extra space between table rows */}
              <td className="text-center stat py-0.5"><h4 className="stat text-main leading-none">{gear.ATT ?? '-'}</h4></td>
              <td className="text-center stat py-0.5"><h4 className="stat text-main leading-none">{gear.TYP === 'M' ? MSK : RSK}</h4></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
