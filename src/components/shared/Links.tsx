'use client'

import Link from 'next/link'
import { FiList, FiUser, FiUsers } from 'react-icons/fi'

const badgeClass = 'text-muted inline-flex items-center gap-1 px-1 py-0.5 text-sm font-medium rounded border border-main hover:bg-main/10'

export function FactionLink({ factionId, factionName }: { factionId: string, factionName: string }) {
  return (
    <Link href={`/factions/${factionId}`} className={badgeClass}>
      <FiList />
      {factionName}
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
