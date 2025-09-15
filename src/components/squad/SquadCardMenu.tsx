import { GAME } from '@/lib/config/game_config'
import { showInfoModal } from '@/lib/utils/showInfoModal'
import { SquadPlain } from '@/types'
import { MenuItem, MenuItems } from '@headlessui/react'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { QRCodeSVG } from 'qrcode.react'
import { FiChevronDown, FiChevronsDown, FiChevronsUp, FiChevronUp, FiCopy, FiEdit, FiPrinter, FiShare2, FiTrash } from 'react-icons/fi'
import { toast } from 'sonner'
import { Button } from '../ui'

export default function SquadCardMenu({
  squad,
  isOwner,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveFirst,
  onMoveDown,
  onMoveLast,
  onPrint
}: {
  squad: SquadPlain
  isOwner: boolean,
  onEdit?: () => void
  onDelete?: () => void
  onMoveUp?: () => void
  onMoveFirst?: () => void
  onMoveDown?: () => void
  onMoveLast?: () => void
  onPrint?: () => void
}) {

  const router = useRouter()
  const showMoveCol = !!(onMoveUp || onMoveFirst || onMoveDown || onMoveLast)

  const handleNativeShare = async () => {
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

  const onClone = async () => {
    try {
      const res = await fetch(`/api/squads/${squad.squadId}/clone`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })

      if (!res.ok) throw new Error('Failed to create squad')

      const newSquadId = (await res.json()).squadId
      toast.success('Squad cloned, redirecting...')
      setTimeout(() => router.push(`/squads/${newSquadId}`), 500)
      
    } catch (err) {
      console.error(err)
      toast.error('Failed to clone Squad')
    }
  }

  return (
    <MenuItems className={`absolute right-0 top-6 m-1 z-50  ${showMoveCol ? 'w-64' : 'w-32'} origin-top-right rounded-md bg-card border border-main focus:outline-none divide-y divide-border`}>
      <div className={`grid ${showMoveCol ? 'grid-cols-2' : 'grid-cols-1'} gap-1 p-1`}>
        {/* Left Column: Move Actions (only if any provided) */}
        {isOwner && showMoveCol && (
          <div className="flex flex-col space-y-1">
            <MenuItem>
              {({ focus }) => (
                <button className={clsx('m-1 text-left text-sm w-full flex items-center gap-2', focus ? 'text-main' : 'text-foreground')}
                  onClick={onMoveUp}
                >
                  <FiChevronUp /> Move Up
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <button className={clsx('m-1 text-left text-sm w-full flex items-center gap-2', focus ? 'text-main' : 'text-foreground')}
                  onClick={onMoveFirst}
                >
                  <FiChevronsUp /> Move First
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <button className={clsx('m-1 text-left text-sm w-full flex items-center gap-2', focus ? 'text-main' : 'text-foreground')}
                  onClick={onMoveDown}
                >
                  <FiChevronDown /> Move Down
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ focus }) => (
                <button className={clsx('m-1 text-left text-sm w-full flex items-center gap-2', focus ? 'text-main' : 'text-foreground')}
                  onClick={onMoveLast}
                >
                  <FiChevronsDown /> Move Last
                </button>
              )}
            </MenuItem>
          </div>
        )}
        
        {/* Right Column: General Actions */}
        <div className="flex flex-col space-y-1">
          {isOwner && 
            <>
              <MenuItem>
                {({ focus }) => (
                  <button className={clsx('m-1 text-left text-sm w-full flex items-center gap-2', focus ? 'text-main' : 'text-foreground')}
                    onClick={onEdit}
                  >
                    <FiEdit /> Edit
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <button className={clsx('m-1 text-left text-sm w-full flex items-center gap-2', focus ? 'text-main' : 'text-foreground')}
                    onClick={onClone}
                  >
                    <FiCopy /> Clone
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <button className={clsx('m-1 text-left text-sm w-full flex items-center gap-2', focus ? 'text-main' : 'text-foreground')}
                    onClick={() => {
                      typeof navigator !== 'undefined' && typeof navigator.share === 'function' && handleNativeShare()
                      showInfoModal({
                        title: `Share - ${squad.squadName}`,
                        body:
                      <div className="flex flex-col items-start gap-2">
                        {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                          <Button onClick={handleNativeShare} className="flex">
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
                      })
                    }}
                  >
                    <FiShare2 /> Share
                  </button>
                )}
              </MenuItem>
              {onPrint &&
                <MenuItem>
                  {({ focus }) => (
                    <button className={clsx('m-1 text-left text-sm w-full flex items-center gap-2', focus ? 'text-main' : 'text-foreground')}
                      onClick={onPrint}
                    >
                      <FiPrinter /> Print
                    </button>
                  )}
                </MenuItem>
              }
              {onDelete &&
                <MenuItem>
                  {({ focus }) => (
                    <button className={clsx('m-1 text-left text-sm w-full flex items-center gap-2', focus ? 'text-main' : 'text-foreground')}
                      onClick={onDelete}
                    >
                      <FiTrash /> Delete
                    </button>
                  )}
                </MenuItem>
              }
            </>
          }
        </div>
      </div>
    </MenuItems>
  )
}
