'use client'

import Link from 'next/link'
import { FiList, FiUser, FiUsers } from 'react-icons/fi'

const badgeClass = 'inline-flex text-foreground items-center gap-1 px-1 py-0.5 font-medium rounded border border-main bg-background hover:bg-card'

export function SquadTypeLink({ squadTypeId, squadTypeName }: { squadTypeId: string, squadTypeName: string }) {
  return (
    <Link href={`/squadTypes/${squadTypeId}`} className={badgeClass}>
      <FiList />
      {squadTypeName}
    </Link>
  )
}

export function UserLink({ userName }: {userName: string}) {
  return (
    <Link href={`/users/${userName}`} className={badgeClass}>
      <FiUser />
      {userName}
    </Link>
  )
}

export function SquadLink({ squadId, squadName }: { squadId: string, squadName: string }) {
  return (
    <Link href={`/squads/${squadId}`} className={badgeClass}>
      <FiUsers />
      {squadName}
    </Link>
  )
}
