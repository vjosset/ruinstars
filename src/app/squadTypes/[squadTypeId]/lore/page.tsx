import { SquadTypeLink } from '@/components/shared/Links'
import Markdown from '@/components/ui/Markdown'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { SquadTypeService } from '@/src/services'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ squadTypeId: string }>  }) {
  const { squadTypeId } = await params
  const squadType = await SquadTypeService.getSquadType(squadTypeId)
  
  if (!squadType) return {}

  return generatePageMetadata({
    title: `${squadType.squadTypeName}`,
    description: `${squadType.description}`,
    image: {
      url: `/img/squadTypes/${squadTypeId}.webp`,
    },
    keywords: ['home', 'squad builder', 'battle tracker', 'squadType', 'lore', squadType.squadTypeId, squadType.squadTypeName],
    pagePath: `/squadTypes/${squadType.squadTypeId}/lore`
  })
}

export default async function SquadTypePage({ params }: { params: Promise<{ squadTypeId: string }> }) {
  const { squadTypeId } = await params
  const squadType = await SquadTypeService.getSquadType(squadTypeId)

  if (!squadType) notFound()

  return (
    <div
      className="max-w-full h-full flex items-center justify-center"
      style={{ backgroundImage: `url(/img/squadTypes/${squadType.squadTypeId}.webp)`, backgroundAttachment: '', backgroundPosition: 'top', backgroundSize: 'cover' }}>
      
      <div className="lore max-w-7xl flex flex-col items-center justify-center gap-x-2 bg-background/90 m-4 p-2">
        <div className="flex items-center gap-x-3 mb-4 pt-12">
          <h1>{squadType.squadTypeName}</h1>
        </div>
        <div className="pb-2">
          View SquadType: <SquadTypeLink squadTypeId={squadTypeId} squadTypeName={squadType.squadTypeName} />
        </div>
        <div className="text-foreground">
          <img
            src={`/img/squadTypes/${squadType.squadTypeId}.webp`}
            alt={`${squadType.squadTypeName} Portrait`}
            className="w-full rounded-xl shadow-lg pt-1 mr-2 mb-2 md:w-auto md:max-w-[50%] md:float-left"
          />
          <Markdown>{squadType.lore}</Markdown>
        </div>
      </div>
    </div>
  )
}
  