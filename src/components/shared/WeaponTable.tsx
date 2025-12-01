'use client'

import { showInfoModal } from '@/lib/utils/showInfoModal'
import { parseSpecialRules, SpecialRule } from '@/lib/utils/specialRules'
import { GearPlain } from '@/types'
import { RiCrosshair2Fill, RiSwordFill } from 'react-icons/ri'
import { Checkbox } from '../ui'
import Markdown from '../ui/Markdown'

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
          <tr className="text-muted border-b border-border">
            <th className="text-left w-6/8"><h6>Weapons</h6></th>
            <th className="text-center w-1/8"><h6>ATT</h6></th>
            <th className="text-center w-1/8"><h6>SKL</h6></th>
          </tr>
        </thead>
        <tbody>
          {weapons.map((gear) => (
            <tr key={gear.gearId}>
              <td className="py-0.5 px-2">
                {onToggleGear && (
                  <Checkbox
                    type="checkbox"
                    checked={selectedGearIds.includes(gear.gearId)}
                    onChange={() => onToggleGear(gear.gearId)}
                  />
                )}
                { ' ' }
                {/*<img className="inline highlightblack" src={`/icons/white/weptype${gear.TYP}.png`} width="13" />*/}
                { gear.TYP == 'M' ? (<RiSwordFill className="icon" />) : (<RiCrosshair2Fill className="icon" />) }
                { ' ' }
                {gear.gearName}
                {gear.special != '' &&
                  <span className="cursor-pointer text-xs hover:text-main text-muted hastip" onClick={() => {
                    const parsed = parseSpecialRules(allSpecials, 'W', gear.special ?? '')
                    showInfoModal({
                      title: gear.gearName,
                      body: (
                        <div className="space-y-4">
                          {parsed.map((special, idx) => (
                            <div key={idx}>
                              <span className="font-semibold text-muted">({special.code}) {special.specialName}:</span>
                              <Markdown>{special.description}</Markdown>
                            </div>
                          ))}
                        </div>
                      )
                    })
                  }}
                  >
                    { ' ' }({gear.special})
                  </span>
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
