import FactionList from '@/components/faction/FactionList'
import PageTitle from '@/components/ui/PageTitle'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'


export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Factions',
    description: 'Browse all Factions and Squad Types in Ruinstars and choose your squad\'s allegiance.',
    images: [],
    keywords: ['factions', 'codex', 'units'],
    pagePath: '/factions'
  })
}

export default async function FactionsPage() {
  return (
    <div className="px-1 py-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <PageTitle>Factions</PageTitle>
        <p className="text-muted mt-2 max-w-xl mx-auto">
          A dying galaxy, and no shortage of factions willing to fight over what's left.
        </p>
      </div>

      <FactionList />
    </div>
  )
}
