'use client'

import GearItem from '@/components/shared/GearItem'
import { GearPlain } from '@/types'
import { Checkbox } from '../ui'

interface GearGroupListProps {
  gearList: GearPlain[]
  selectedGearIds?: string[]
  showNarrative?: boolean
  onToggleGear?: (gearId: string) => void
}

export default function GearGroupList({
  gearList,
  selectedGearIds = [],
  showNarrative = true,
  onToggleGear,
}: GearGroupListProps) {
  const filteredGearList = gearList.filter(gear => showNarrative || !gear.gearCategory?.isNarrative)

  const sortedGearList = [...filteredGearList].sort((a, b) => {
    const catA = a.gearCategory?.seq || 0
    const catB = b.gearCategory?.seq || 0
    if (catA !== catB) return catA - catB
  
    const seqA = a.seq || 0
    const seqB = b.seq || 0
    if (seqA !== seqB) return seqA - seqB
  
    return (a.gearName || '').localeCompare(b.gearName || '')
  })

  const groupedGears = sortedGearList.reduce((acc, gear) => {
    const categoryId = gear.gearCategory?.gearCategoryId
    if (!categoryId) return acc
    if (!acc[categoryId]) acc[categoryId] = []
    acc[categoryId].push(gear)
    return acc
  }, {} as Record<string, GearPlain[]>)

  return (
    <>
      {Object.entries(groupedGears).map(([categoryId, gears]) => {
        const sortedGears = gears.sort((a, b) => {
          const seqA = a.seq ?? 0
          const seqB = b.seq ?? 0
        
          if (seqA !== seqB) {
            return seqA - seqB
          }
        
          return a.gearName.localeCompare(b.gearName)
        })

        const isEvenCount = sortedGears.length % 2 === 0
        const [firstGear, ...restGears] = sortedGears

        const renderGear = (gear: GearPlain) => (
          <div key={gear.gearId} className="flex items-center gap-1">
            {onToggleGear && (
              <Checkbox
                type="checkbox"
                checked={selectedGearIds.includes(gear.gearId)}
                onChange={() => onToggleGear(gear.gearId)}
              />
            )}
            <GearItem gear={gear} />
          </div>
        )

        return (
          <div key={categoryId} className="border-t border-border">
            <div className="grid grid-cols-2">
              <h6 className="text-muted flex items-center col-span-2">
                {sortedGears[0].gearCategory?.gearCategoryName}
              </h6>
              {!isEvenCount && firstGear && renderGear(firstGear)}
              {(isEvenCount ? sortedGears : restGears).map(renderGear)}
            </div>
          </div>
        )
      })}
    </>
  )
}
