'use client'

import GearItem from '@/components/shared/GearItem'
import { GearPlain } from '@/types'
import { useEffect, useState } from 'react'
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
  showNarrative = false,
  onToggleGear,
}: GearGroupListProps) {
  const [groupedGears, setGroupedGears] = useState<Record<string, GearPlain[]>>({})

  useEffect(() => {
    // We put all this in useEffect to avoid hydration issues due to showNarrative being pulled from user's localStorage.
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

    const grouped = sortedGearList.reduce((acc, gear) => {
      const categoryId = gear.gearCategory?.gearCategoryId
      if (!categoryId) return acc
      if (!acc[categoryId]) acc[categoryId] = []
      acc[categoryId].push(gear)
      return acc
    }, {} as Record<string, GearPlain[]>)

    setGroupedGears(grouped)
  }, [gearList, showNarrative])

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

        return (
          <div key={categoryId} className="grid grid-cols-2 border-t border-border">
            <h6 className="text-muted flex items-center">
              {sortedGears[0].gearCategory?.gearCategoryName}
            </h6>
            {sortedGears.map((gear) => (
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
            ))}
          </div>
        )
      })}
    </>
  )
}
