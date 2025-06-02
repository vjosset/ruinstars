'use client'

import { useState } from 'react'
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
  showNarrative = false,
  onToggleGear,
}: GearGroupListProps) {
  // Filter out narrative gear first
  const filteredGearList = gearList.filter(gear => showNarrative || !gear.gearCategory?.isNarrative)

  // Then sort the filtered list by category.seq then gear.seq
  const sortedGearList = [...filteredGearList].sort((a, b) => {
    // First sort by category sequence
    const categorySeqDiff = (a.gearCategory?.seq || 0) - (b.gearCategory?.seq || 0)
    if (categorySeqDiff !== 0) return categorySeqDiff
    
    // Then by gear sequence
    const seqDiff = (a.seq || 0) - (b.seq || 0)
    if (seqDiff !== 0) return seqDiff
    
    // Finally by name
    return (a.gearName || '').localeCompare(b.gearName || '')
  })

  const grouped = sortedGearList.reduce((acc, gear) => {
    const categoryId = gear.gearCategory?.gearCategoryId
    if (!categoryId) {
      console.warn('⚠️ Gear with missing category:', gear)
      return acc // Skip this gear if it lacks a category
    }
    if (!acc[categoryId]) {
      acc[categoryId] = []
    }
    acc[categoryId].push(gear)
    return acc
  }, {} as Record<string, GearPlain[]>)

  return (
    <>
      {Object.entries(grouped).map(([categoryId, gears]) => {
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
            <h6 className="text-muted">
              {sortedGears[0].gearCategory?.gearCategoryName}
            </h6>
            {sortedGears.map((gear) => (
              <div key={gear.gearId}>
                {onToggleGear && (
                  <Checkbox
                    type="checkbox"
                    checked={selectedGearIds.includes(gear.gearId)}
                    onChange={() => onToggleGear(gear.gearId)}
                  />
                )}
                { " " }
                <GearItem gear={gear} />
              </div>
            ))}
          </div>
        )
      })}
    </>
  )
}
