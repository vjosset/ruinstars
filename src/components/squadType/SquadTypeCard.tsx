import { SquadType } from '@/types/squadType.model'
import Link from 'next/link'
import Markdown from '../ui/Markdown'

type SquadTypeCardProps = {
  squadType: SquadType
}

export default function SquadTypeCard({ squadType }: SquadTypeCardProps) {
  return (
    <Link 
      className="group grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] bg-card border border-border rounded hover:border-main transition h-[120px]"
      href={`/squadTypes/${squadType.squadTypeId}`}
    >
      {/* Image section - left side */}
      <div className="relative overflow-hidden border-r border-border">
        <div 
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500 overflow-hidden"
          style={{ backgroundImage: `url(/img/squadTypes/${squadType.squadTypeId}.webp)` }}
        />
      </div>

      {/* Content section - right side */}
      <div className="relative p-2 flex flex-col justify-between h-full min-w-0">
        <div className="flex items-center gap-x-2 min-w-0" style={{width: '100%'}}>
          <h5 className="font-heading text-main text-xl truncate overflow-hidden whitespace-nowrap w-full">{squadType.squadTypeName}</h5>
        </div>
        <div className="line-clamp-3">
          <Markdown>{squadType.description}</Markdown>
        </div>
      </div>
    </Link>
  )
}
