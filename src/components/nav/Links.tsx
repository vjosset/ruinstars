'use client'

import { userPath } from '@/lib/utils/utils'
import Link from 'next/link'
import { BsFilePdf } from 'react-icons/bs'
import { FiBook, FiList, FiUser, FiUsers } from 'react-icons/fi'

const badgeClass = 'text-sm inline-flex text-foreground items-center gap-1 px-1 py-0.5 font-medium rounded border border-main bg-background hover:bg-card max-w-full overflow-hidden'

export function PDFLink({href, title}: {href: string, title: string}) {
  return (
    <Link href={href} className={badgeClass} target="_blank">
      <BsFilePdf className="icon inline-block" /> {title} PDF
    </Link>
  )
}

export function FactionLink({ factionId, factionName }: { factionId: string, factionName: string }) {
  return (
    <Link href={`/factions/${factionId}`} className={badgeClass}>
      <FiBook className="icon flex-shrink-0" />
      <span className="truncate">{factionName}</span>
    </Link>
  )
}

export function SquadTypeLink({ squadTypeId, squadTypeName }: { squadTypeId: string, squadTypeName: string }) {
  return (
    <Link href={`/squadTypes/${squadTypeId}`} className={badgeClass}>
      <FiList className="icon flex-shrink-0" />
      <span className="truncate">{squadTypeName}</span>
    </Link>
  )
}

export function UserLink({ userName, newTab }: {userName: string, newTab?: boolean}) {
  return (
    <Link href={userPath(userName)} className={badgeClass} target={newTab ? '_blank' : ''}>
      <FiUser className="icon flex-shrink-0" />
      <span className="truncate">{userName}</span>
    </Link>
  )
}

export function SquadLink({ squadId, squadName }: { squadId: string, squadName: string }) {
  return (
    <Link href={`/squads/${squadId}`} className={badgeClass}>
      <FiUsers className="icon flex-shrink-0" />
      <span className="truncate">{squadName}</span>
    </Link>
  )
}
