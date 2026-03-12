import { SquadType } from '@/types/squadType.model'
import Link from 'next/link'

type SquadTypeCardProps = {
  squadType: SquadType
}

export default function SquadTypeCard({ squadType }: SquadTypeCardProps) {
  return (
    <Link 
      className="group grid grid-cols-[135px_1fr] md:grid-cols-[135px_1fr] bg-card border border-border rounded hover:border-main transition h-[90px] overflow-hidden"
      href={`/squadTypes/${squadType.squadTypeId}`}
    >
      {/* Image section - left side */}
      <div className="relative overflow-hidden border-r border-border">
        <div 
          className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500 overflow-hidden printbg"
          style={{ backgroundImage: `url(/img/squadTypes/${squadType.squadTypeId}_thumb.webp)` }}
        />
      </div>

      {/* Content section - right side */}
      <div className="relative p-2 flex flex-col justify-between h-full min-w-0">
        <div className="flex items-center gap-x-2 min-w-0" style={{width: '100%'}}>
          <h5 className="font-heading text-main text-xl truncate overflow-hidden whitespace-nowrap w-full">{squadType.squadTypeName}</h5>
        </div>
        <div className="line-clamp-2">
          {squadType.tagline}
        </div>
      </div>
    </Link>
  )
}
