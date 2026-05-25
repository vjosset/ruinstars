'use client'

import { useState } from 'react'
import GalaxyMap from '@/components/shared/GalaxyMap'
import SectorCard, { type Sector } from '@/components/shared/SectorCard'

type Props = {
  sectors: Sector[]
}

export default function GalaxyMapClient({ sectors }: Props) {
  const [selected, setSelected] = useState<Sector>(sectors[0])

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Galaxy map - fills available width, scales via viewBox */}
      <div className="w-full lg:flex-1 min-w-0">
        <GalaxyMap
          sectors={sectors}
          selected={selected}
          onSelect={setSelected}
        />
      </div>

      {/* Selected sector detail card */}
      <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
        <SectorCard sector={selected} />
      </div>
    </div>
  )
}
