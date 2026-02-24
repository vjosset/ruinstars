import { Button } from '@/components/ui'
import { GAME } from '@/lib/config/game_config'
import { SquadPlain } from '@/types'
import Link from 'next/link'
import { QRCodeSVG } from 'qrcode.react'
import { FiShare2 } from 'react-icons/fi'
import { showInfoModal } from './showInfoModal'

async function nativeShare(squad: SquadPlain) {
  try {
    await navigator.share({
      title: squad.squadName || squad.squadType?.squadTypeName,
      text: squad.description || `A ${squad.squadType?.squadTypeName} by ${squad.user?.userName}`,
      url: `/squads/${squad.squadId}`,
    })
  } catch (err) {
    console.error('Share failed:', err)
  }
}

export function shareSquad(squad: SquadPlain) {
  const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  if (canNativeShare) nativeShare(squad)

  showInfoModal({
    title: `Share - ${squad.squadName}`,
    body: (
      <div className="flex flex-col items-start gap-2">
        {canNativeShare && (
          <Button onClick={() => nativeShare(squad)} className="flex">
            <FiShare2 /> Share
          </Button>
        )}
        <strong>SquadId:</strong> <pre className="text-2xl">{squad.squadId}</pre>
        <br />
        <strong>Squad Link:</strong>{' '}
        <Link href={`/squads/${squad.squadId}`}>{GAME.ROOT_URL}/squads/{squad.squadId}</Link>
        <br /><br />
        <div className="mx-auto flex justify-center">
          <div className="p-4 bg-white rounded">
            <QRCodeSVG value={`${GAME.ROOT_URL}/squads/${squad.squadId}`} size={128} />
          </div>
        </div>
      </div>
    ),
  })
}
