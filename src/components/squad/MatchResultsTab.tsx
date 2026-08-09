'use client'

import { SquadLink, UserLink } from '@/components/nav/Links'
import { Button, Modal } from '@/components/ui'
import { dateToDisplay } from '@/lib/utils/utils'
import { MatchResultPlain, SquadIdentity } from '@/types'
import { useEffect, useRef, useState } from 'react'
import { FiCheck, FiRefreshCw, FiTrash2 } from 'react-icons/fi'
import { toast } from 'sonner'

function resultLabel(match: MatchResultPlain, squadId: string): { label: string; className: string } {
  const isA = match.squadAId === squadId
  if (match.result === 'D') return { label: 'D', className: 'text-muted' }
  const won = (isA && match.result === 'A') || (!isA && match.result === 'B')
  return won
    ? { label: 'W', className: 'text-main' }
    : { label: 'L', className: 'text-foreground' }
}

function opponentInfo(match: MatchResultPlain, squadId: string) {
  return match.squadAId === squadId ? match.squadB : match.squadA
}

/**
 * One match, from `squadId`'s point of view. Used for both confirmed history and
 * pending rows on either side, so every match reads the same way wherever it appears.
 * Actions are opt-in: Confirm only when this squad is the one being asked, and remove
 * only while the match is still pending.
 */
function MatchResultRow({
  match,
  squadId,
  onConfirm,
  onRemove,
  removeLabel,
}: {
  match: MatchResultPlain
  squadId: string
  onConfirm?: () => void
  onRemove?: () => void
  removeLabel?: string
}) {
  const opp = opponentInfo(match, squadId)
  const { label, className } = resultLabel(match, squadId)

  return (
    <div className="flex items-center gap-3 py-1 border-b border-border/40 text-sm">
      <span className={`font-bold font-heading text-lg w-4 text-center ${className}`}>{label}</span>
      <span className="flex-1 flex items-center gap-1 flex-wrap">
        <span className="text-muted">vs</span>
        {/* A deleted squad still shows its snapshotted name, with nothing to link to */}
        {opp.squadId
          ? <SquadLink squadId={opp.squadId} squadName={opp.squadName} />
          : <span className="line-through text-muted">{opp.squadName}</span>}
        <span className="text-muted">by</span>
        {opp.userId
          ? <UserLink userName={opp.userName} />
          : <span className="text-muted">{opp.userName}</span>}
      </span>
      <span className="text-xs text-muted text-right">
        <span className="block">{dateToDisplay(match.matchDate)}</span>
        <span className="block">{new Date(match.matchDate).toLocaleTimeString()}</span>
      </span>
      {onConfirm && (
        <button
          onClick={onConfirm}
          className="text-muted hover:text-main transition-colors"
        >
          <FiCheck />
        </button>
      )}
      {onRemove && (
        <button
          onClick={onRemove}
          title={removeLabel}
          aria-label={removeLabel}
          className="text-muted hover:text-main transition-colors"
        >
          <FiTrash2 />
        </button>
      )}
    </div>
  )
}

function computeRecord(history: MatchResultPlain[], squadId: string) {
  let W = 0, L = 0, D = 0
  for (const m of history) {
    if (!m.squadBConfirmed) continue // pending matches don't count toward record
    const isA = m.squadAId === squadId
    if (m.result === 'D') { D++; continue }
    const won = (isA && m.result === 'A') || (!isA && m.result === 'B')
    won ? W++ : L++
  }
  return { W, L, D }
}

export default function MatchResultsTab({
  squadId,
  squadName,
  isOwner,
  userId,
}: {
  squadId: string
  squadName: string
  isOwner: boolean
  userId?: string
}) {
  const [history, setHistory] = useState<MatchResultPlain[]>([])
  const [loading, setLoading] = useState(true)
  const [showRecordModal, setShowRecordModal] = useState(false)
  // Dispute (opponent rejecting) and Delete (reporter retracting) hit the same endpoint
  // and share one confirmation modal; only the wording differs.
  const [removeTarget, setRemoveTarget] = useState<{ match: MatchResultPlain; mode: 'dispute' | 'delete' } | null>(null)
  const [removeError, setRemoveError] = useState('')
  const [removing, setRemoving] = useState(false)

  // History is viewer-aware: the owner gets unconfirmed results too, everyone else
  // only confirmed ones. So this is the single source for the list.
  const fetchData = async () => {
    setLoading(true)
    const historyRes = await fetch(`/api/squads/${squadId}/matchResults`)
    if (historyRes.ok) setHistory(await historyRes.json())
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [squadId, isOwner])

  const handleConfirm = async (matchResultId: number) => {
    const res = await fetch(`/api/matchResults/${matchResultId}/confirm`, { method: 'PATCH' })
    if (res.ok) {
      const confirmed: MatchResultPlain = await res.json()
      // Already in the list as pending - swap it in place so its position holds
      setHistory(prev => prev.map(m => m.matchResultId === matchResultId ? confirmed : m))
      toast.success('Match confirmed')
    } else {
      toast.error('Failed to confirm match')
    }
  }

  const handleRemove = async () => {
    if (!removeTarget) return
    const { match, mode } = removeTarget
    setRemoving(true)
    setRemoveError('')

    try {
      const res = await fetch(`/api/matchResults/${match.matchResultId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error(await res.text() || 'Failed to remove battle')

      setHistory(prev => prev.filter(m => m.matchResultId !== match.matchResultId))
      setRemoveTarget(null)
      toast.success(mode === 'dispute' ? 'Battle disputed and removed' : 'Battle deleted')
    } catch (err: unknown) {
      setRemoveError(err instanceof Error ? err.message : 'Something went wrong')
      toast.error(mode === 'dispute' ? 'Could not dispute Battle' : 'Could not delete Battle')
    } finally {
      setRemoving(false)
    }
  }

  const handleRecorded = (match: MatchResultPlain) => {
    // History is newest-first and this is the newest, so it goes on the front.
    // It renders as Pending until the opponent confirms.
    setHistory(prev => [match, ...prev])
    setShowRecordModal(false)
    toast.success(`Battle recorded - awaiting confirmation from ${match.squadB.userName}`)
  }

  const { W, L, D } = computeRecord(history, squadId)

  if (loading) return <div className="text-muted text-sm p-4">Loading battle history...</div>

  return (
    <div className="space-y-6 p-2">
      {/* W/L/D Record */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4 border border-main px-4 py-1 rounded-md">
          <div className="text-center">
            <div className="text-2xl font-bold font-stat text-main">{W}</div>
            <div className="text-xs text-muted">WINS</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-stat">{L}</div>
            <div className="text-xs text-muted">LOSSES</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold font-stat text-muted">{D}</div>
            <div className="text-xs text-muted">DRAWS</div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {isOwner && (
            <Button onClick={() => setShowRecordModal(true)}>
              <h6>Record Battle</h6>
            </Button>
          )}
        </div>
      </div>

      {/* Match History - confirmed and pending together */}
      <div className="space-y-2">
        {history.length === 0 ? (
          <p className="text-muted text-sm">No battles recorded yet.</p>
        ) : (
          <>
            <h5 onClick={fetchData}>
              Battle History
              <button
                disabled={loading}
                title="Refresh battles"
                aria-label="Refresh battles"
                className="mx-2 text-muted text-sm hover:text-main"
              >
                <FiRefreshCw className={loading ? 'animate-spin' : ''} />
              </button>
            </h5>
            <div className="space-y-1">
              {history.map(match => {
                const isPending = !match.squadBConfirmed
                // We reported it: ours to delete. They reported it: ours to confirm or dispute.
                const weReported = match.squadAId === squadId
                const canAct = isOwner && isPending
                return (
                  <MatchResultRow
                    key={match.matchResultId}
                    match={match}
                    squadId={squadId}
                    onConfirm={canAct && !weReported ? () => handleConfirm(match.matchResultId) : undefined}
                    onRemove={canAct
                      ? () => setRemoveTarget({ match, mode: weReported ? 'delete' : 'dispute' })
                      : undefined}
                    removeLabel={weReported ? 'Delete this pending report' : 'Dispute this result'}
                  />
                )
              })}
            </div>
          </>
        )}
      </div>

      {showRecordModal && (
        <RecordBattleModal
          mySquadId={squadId}
          mySquadName={squadName}
          myUserId={userId ?? ''}
          onClose={() => setShowRecordModal(false)}
          onRecorded={handleRecorded}
        />
      )}

      {/* Battle Removal Modal - shared by Dispute (opponent) and Delete (reporter) */}
      {removeTarget && (
        <Modal
          title={removeTarget.mode === 'dispute' ? 'Dispute Battle Result' : 'Delete Battle Result'}
          onClose={() => setRemoveTarget(null)}
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setRemoveTarget(null)}>
                <h6>Cancel</h6>
              </Button>
              <Button disabled={removing} onClick={handleRemove}>
                <h6>
                  {removeTarget.mode === 'dispute'
                    ? (removing ? 'Disputing...' : 'Dispute')
                    : (removing ? 'Deleting...' : 'Delete')}
                </h6>
              </Button>
            </div>
          }
        >
          <p className="text-sm text-foreground">
            {removeTarget.mode === 'dispute' ? (
              <>
                Are you sure you want to dispute the result reported by{' '}
                <strong>{removeTarget.match.squadA.squadName}</strong>?<br />
                This cannot be undone.
              </>
            ) : (
              <>
                Are you sure you want to delete your reported battle against{' '}
                <strong>{removeTarget.match.squadB.squadName}</strong>?<br />
                This cannot be undone.
              </>
            )}
          </p>

          {removeError && (
            <p className="text-sm text-destructive">{removeError}</p>
          )}
        </Modal>
      )}
    </div>
  )
}

function RecordBattleModal({
  mySquadId,
  mySquadName,
  myUserId,
  onClose,
  onRecorded,
}: {
  mySquadId: string
  mySquadName: string
  myUserId: string
  onClose: () => void
  onRecorded: (match: MatchResultPlain) => void
}) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SquadIdentity[]>([])
  const [opponent, setOpponent] = useState<SquadIdentity | null>(null)
  const [result, setResult] = useState<'A' | 'B' | 'D' | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (query.length < 2) { setResults([]); return }
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(async () => {
      const res = await fetch(`/api/squads/search?q=${encodeURIComponent(query)}`)
      if (res.ok) {
        const data: SquadIdentity[] = await res.json()
        setResults(data.filter(s => s.squadId !== mySquadId && s.userId !== myUserId))
      }
    }, 300)
  }, [query, mySquadId, myUserId])

  const handleSubmit = async () => {
    if (!opponent || !result) return
    setSubmitting(true)
    const res = await fetch('/api/matchResults', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ squadAId: mySquadId, squadBId: opponent.squadId, result }),
    })
    setSubmitting(false)
    if (res.ok) {
      onRecorded(await res.json())
    } else {
      toast.error(await res.text())
    }
  }

  return (
    <Modal
      title="Record Battle Result"
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}><h6>Cancel</h6></Button>
          <Button onClick={handleSubmit} disabled={!opponent || !result || submitting}>
            <h6>{submitting ? 'Recording...' : 'Record Battle'}</h6>
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* My squad */}
        <div>
          <p className="text-xs text-muted mb-1 uppercase tracking-wider">Your Squad</p>
          <p className="font-bold">{mySquadId} - {mySquadName}</p>
        </div>

        {/* Opponent search */}
        <div>
          <p className="text-xs text-muted mb-1 uppercase tracking-wider">Opponent Squad</p>
          {opponent ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">{opponent.squadName}</p>
                <p className="text-xs text-muted">{opponent.userName} · {opponent.squadTypeName}</p>
              </div>
              <button className="text-xs text-muted hover:text-main" onClick={() => { setOpponent(null); setQuery('') }}>
                Change
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by squad ID, name, or username..."
                className="w-full placeholder-muted bg-card text-foreground border border-border rounded p-1 my-2 focus:outline-none focus:ring-2 focus:ring-main w-full flex-1 my-2 px-2 bg-card border border-border rounded-l-md rounded-r-none appearance-none"
              />
              {results.length > 0 && (
                <div className="mt-1 border border-border rounded divide-y divide-border max-h-48 overflow-y-auto">
                  {results.map(r => (
                    <button
                      key={r.squadId}
                      className="w-full text-left px-3 py-2 hover:bg-zinc-900 text-sm"
                      onClick={() => { setOpponent(r); setQuery('') }}
                    >
                      <span className="font-bold">{r.squadName} ({r.squadId})</span>
                      <span className="text-muted ml-2">{r.userName} · {r.squadTypeName}</span>
                    </button>
                  ))}
                </div>
              )}
              {query.length >= 2 && results.length === 0 && (
                <p className="text-xs text-muted mt-1">No squads found.</p>
              )}
            </div>
          )}
        </div>

        {/* Result */}
        <div>
          <p className="text-xs text-muted mb-2 uppercase tracking-wider">Result</p>
          <div className="flex gap-1">
            {([
              { value: 'A' as const, label: 'I Won' },
              { value: 'D' as const, label: 'Draw' },
              { value: 'B' as const, label: 'They Won' },
            ]).map(({ value, label }) => (
              <Button
                key={value}
                variant={result === value ? 'highlighted' : 'ghost'}
                className="flex-1 py-2 rounded flex items-center justify-center"
                onClick={() => setResult(value)}
              >
                <span>{label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}
