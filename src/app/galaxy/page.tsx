import GalaxyMapClient from './GalaxyMapClient'
import PageTitle from '@/components/ui/PageTitle'
import locationsData from '@/data/galaxy/locations.json'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import type { Location } from '@/components/shared/LocationCard'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'The Galaxy',
    description: 'A living map of the dying galaxy. Track faction control across every contested location as players report their victories and losses in the campaign.',
    keywords: ['galaxy map', 'campaign', 'faction control', 'locations'],
    pagePath: '/galaxy',
  })
}

const locations = locationsData as unknown as Location[]

export default function GalaxyPage() {
  return (
    <div className="px-2 py-8 max-w-6xl mx-auto">
      <div className="text-center mb-6">
        <PageTitle>The Galaxy</PageTitle>
      </div>
      <GalaxyMapClient locations={locations} />
    </div>
  )
}
