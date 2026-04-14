import { shareSquad } from '@/lib/utils/shareSquad'
import { SquadPlain } from '@/types'
import { MenuItem, MenuItems } from '@headlessui/react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { FiChevronDown, FiChevronsDown, FiChevronsUp, FiChevronUp, FiCopy, FiEdit, FiPrinter, FiRotateCcw, FiShare2, FiTrash } from 'react-icons/fi'
import { toast } from 'sonner'

export default function SquadCardMenu({
  squad,
  isOwner,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveFirst,
  onMoveDown,
  onMoveLast,
  onPrint,
  onReset,
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
  onReset?: () => void
}) {

  const router = useRouter()
  const showMoveCol = !!(onMoveUp || onMoveFirst || onMoveDown || onMoveLast)

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
    <MenuItems anchor="bottom end" className={`m-1 z-50 ${showMoveCol ? 'w-64' : 'w-32'} origin-top-right rounded-md bg-card border border-main focus:outline-none divide-y divide-border`}>
      <div className={`grid ${showMoveCol ? 'grid-cols-2' : 'grid-cols-1'} gap-1 p-1`}>
        {/* Left Column: Move Actions (only if any provided) */}
        {isOwner && showMoveCol && (
          <div className="flex flex-col">
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
        <div className="flex flex-col">
          {isOwner && 
            <>
              {onReset &&
                <MenuItem>
                  {({ focus }) => (
                    <button className={clsx('m-1 text-left text-sm w-full flex items-center gap-2', focus ? 'text-main' : 'text-foreground')}
                      onClick={onReset}
                    >
                      <FiRotateCcw /> Reset
                    </button>
                  )}
                </MenuItem>
              }
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
                    onClick={() => shareSquad(squad)}
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
