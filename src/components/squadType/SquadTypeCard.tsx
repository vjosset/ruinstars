import { SquadType } from '@/types/squadType.model'
import Link from 'next/link'
import Markdown from '../ui/Markdown'

type SquadTypeCardProps = {
  squadType: SquadType
}

export default function SquadTypeCard({ squadType }: SquadTypeCardProps) {
  return (
    <Link 
      className="group grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] bg-card border border-border rounded overflow-hidden hover:border-main transition h-[120px]"
      href={`/squadTypes/${squadType.squadTypeId}`}
    >
      {/* Image section - left side */}
      <div className="relative">
        <div 
          className="absolute inset-0 border-r border-border bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
          style={{ backgroundImage: `url(/img/squadTypes/${squadType.squadTypeId}.webp)` }}
        />
      </div>

      {/* Content section - right side */}
      <div className="relative px-3 py-2 flex flex-col justify-between">
        <div className="flex items-center gap-x-2">
          <h4 className="font-heading text-main text-xl">{squadType.squadTypeName}</h4>
        </div>
        <div className="line-clamp-3">
          <Markdown>{squadType.lore}</Markdown>
        </div>
      </div>
    </Link>
  )
}
