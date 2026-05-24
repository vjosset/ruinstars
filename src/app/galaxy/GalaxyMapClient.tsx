'use client'

import { useState } from 'react'
import GalaxyMap from '@/components/shared/GalaxyMap'
import LocationCard, { type Location } from '@/components/shared/LocationCard'

type Props = {
  locations: Location[]
}

export default function GalaxyMapClient({ locations }: Props) {
  const [selected, setSelected] = useState<Location>(locations[0])

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Galaxy map — fills available width, scales via viewBox */}
      <div className="w-full lg:flex-1 min-w-0">
        <GalaxyMap
          locations={locations}
          selected={selected}
          onSelect={setSelected}
        />
      </div>

      {/* Selected location detail card */}
      <div className="w-full lg:w-80 xl:w-96 flex-shrink-0">
        <LocationCard location={selected} />
      </div>
    </div>
  )
}
