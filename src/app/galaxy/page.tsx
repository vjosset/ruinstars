'use client'

import GalaxyMap from '@/components/shared/GalaxyMap'
import LocationCard, { Location } from '@/components/shared/LocationCard'
import PageTitle from '@/components/ui/PageTitle'
import { useState } from 'react'
import locationsData from '@/data/galaxy/locations.json'

const locations = locationsData as Location[]

export default function LocationsTestPage() {
  const [selected, setSelected] = useState<Location>(locations[0])

  return (
    <div className="px-2 py-8 max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <PageTitle>The Galaxy</PageTitle>
      </div>

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
    </div>
  )
}
