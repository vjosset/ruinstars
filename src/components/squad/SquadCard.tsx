'use client'

import { getSquadPortraitUrl, toEpochMs } from '@/lib/utils/imageUrls'
import { SquadPlain } from '@/types'
import { Menu, MenuButton } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { SquadTypeLink, UserLink } from '../nav/Links'
import { Button, Modal } from '../ui'
import SquadCardMenu from './SquadCardMenu'

type SquadCardProps = {
  squad: SquadPlain
  isOwner: boolean
  showUserLink?: boolean
  showSquadTypeLink?: boolean
  onMoveUp?: () => void
  onMoveFirst?: () => void
  onMoveDown?: () => void
  onMoveLast?: () => void
  onDelete?: (squadId: string) => void
}

export default function SquadCard({
  squad,
  isOwner,
  showUserLink = true,
  showSquadTypeLink = true,
  onMoveUp,
  onMoveFirst,
  onMoveDown,
  onMoveLast,
  onDelete
}: SquadCardProps) {
  const [deleteError, setDeleteError] = useState('')
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const router = useRouter()
  const noop = () => {}
  const handleMoveUp = onMoveUp || noop
  const handleMoveFirst = onMoveFirst || noop
  const handleMoveDown = onMoveDown || noop
  const handleMoveLast = onMoveLast || noop

  // Temporary: avoid SSR/headlessui useId mismatch under React 19 by only rendering the owner menu after mount.
  // Remove when headlessui/react combo is stable again and SSR output matches hydration.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  
  return (
    <>
      <div className="group grid grid-cols-[130px_1fr] md:grid-cols-[130px_1fr] bg-card border border-border border-l-2 border-l-main rounded hover:border-main transition h-[95px]" key={squad.squadId}>
        {/* Image section - left side */}
        <Link href={`/squads/${squad.squadId}`} className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500 overflow-hidden fade-right"
            style={{
              backgroundImage: 
              squad.hasCustomPortrait
                ? `url(${getSquadPortraitUrl(squad.squadId)}?v=${toEpochMs(squad.portraitUpdatedAt)})`
                : `url(/img/squadTypes/${squad.squadTypeId}_thumb.webp)`
            }}
          />
        </Link>

        {/* Content section - right side */}
        <div className="relative px-2 py-1 flex flex-col justify-between h-full min-w-0">
          <div className="flex items-center gap-1 min-w-0" style={{width: '100%'}}>
            <Link href={`/squads/${squad.squadId}`} className="flex items-center min-w-0 flex-1"> {/* Added min-w-0 to allow text truncation */}
              <h5 className="font-heading text-main truncate overflow-hidden whitespace-nowrap w-full"> {/* Add  truncate w-0 flex-1 to allow text truncation + ellipsis */}
                {squad.squadName}
              </h5>
            </Link>
            {/* Action menu */}
            {isOwner && mounted && (
              <Menu>
                <MenuButton as="div">
                  <button className='p-1 rounded-sm transition-colors'>
                    <FiMoreVertical className="w-5 h-5" />
                  </button>
                </MenuButton>
                <SquadCardMenu
                  squad={squad}
                  isOwner={isOwner}
                  onEdit={() => router.push(`/squads/${squad.squadId}`)}
                  onDelete={() => setShowDeleteConfirm(true)}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  onMoveFirst={handleMoveFirst}
                  onMoveLast={handleMoveLast}
                />
              </Menu>
            )}
          </div>

          {/*squad.description && (
            <div className="text-sm text-muted line-clamp-2">
              <Markdown>{squad.description}</Markdown>
            </div>
          )*/}
          <span className="font-medium whitespace-nowrap">{(squad.totalUnitGP ?? 0)} GP - {squad.unitCount ?? 0} Units</span>
          
          <p className="text-sm flex flex-nowrap items-center gap-x-2 overflow-hidden min-w-0">
            {showSquadTypeLink && squad.squadType?.squadTypeName && (
              <SquadTypeLink squadTypeId={squad.squadTypeId} squadTypeName={squad.squadType?.squadTypeName || 'Missing'} />
            )}
            {showUserLink && squad.user && (
              <span className="inline-flex items-center gap-1 min-w-0 flex-shrink">By <UserLink userName={squad.user.userName || 'Missing'} /></span>
            )}
          </p>
        </div>
      </div>
      
      {/* Squad Deletion Modal*/}
      {showDeleteConfirm && 
        <Modal
          title={`Delete ${squad.squadName}`}
          onClose={() => setShowDeleteConfirm(false)}
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>
                <h6>Cancel</h6>
              </Button>
              <Button
                disabled={deleting}
                onClick={async () => {
                  setDeleting(true)
                  setDeleteError('')
                
                  try {
                    const res = await fetch(`/api/squads/${squad.squadId}`, { method: 'DELETE' })
                
                    if (!res.ok) {
                      const body = await res.json().catch(() => ({}))
                      throw new Error(body.message || 'Failed to delete squad')
                    }
                    setShowDeleteConfirm(false)
                    if (onDelete) onDelete(squad.squadId) // <-- Add this line
                  } catch (err: any) {
                    setDeleteError(err.message || 'Something went wrong')
                  } finally {
                    setDeleting(false)
                  }
                }}
              >
                <h6>{deleting ? 'Deleting...' : 'Delete'}</h6>
              </Button>
            </div>
          }
        >
          <p className="text-sm text-foreground">
            Are you sure you want to delete <strong>{squad.squadName}</strong>?<br/>
            This cannot be undone.
          </p>

          {deleteError && (
            <p className="text-sm text-destructive">{deleteError}</p>
          )}
        </Modal>
      }
    </>
  )
}
