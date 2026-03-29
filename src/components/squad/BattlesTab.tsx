'use client'

import { SquadLink, UserLink } from '@/components/nav/Links'
import { Button, Modal } from '@/components/ui'
import { MatchResultPlain } from '@/types'
import { useEffect, useRef, useState } from 'react'
import { FiRefreshCw } from 'react-icons/fi'
import { toast } from 'sonner'

type SquadSearchResult = {
  squadId: string
  squadName: string
  userId: string
  userName: string
  squadTypeName: string
}

function resultLabel(match: MatchResultPlain, squadId: string): { label: string; className: string } {
  const isA = match.squadAId === squadId
  if (match.result === 'D') return { label: 'D', className: 'text-muted' }
  const won = (isA && match.result === 'A') || (!isA && match.result === 'B')
  return won
    ? { label: 'W', className: 'text-main' }
    : { label: 'L', className: 'text-foregruond' }
}

function opponentInfo(match: MatchResultPlain, squadId: string) {
  return match.squadAId === squadId ? match.squadB : match.squadA
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

export default function BattlesTab({
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
  const [pending, setPending] = useState<MatchResultPlain[]>([])
  const [loading, setLoading] = useState(true)
  const [showRecordModal, setShowRecordModal] = useState(false)

  const fetchData = async () => {
    setLoading(true)
    const historyRes = await fetch(`/api/match-results/history/${squadId}`)
    if (historyRes.ok) setHistory(await historyRes.json())

    if (isOwner) {
      const pendingRes = await fetch('/api/match-results/pending')
      if (pendingRes.ok) {
        const all: MatchResultPlain[] = await pendingRes.json()
        setPending(all.filter(m => m.squadBId === squadId))
      }
    }
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [squadId, isOwner])

  const handleConfirm = async (matchResultId: number) => {
    const res = await fetch(`/api/match-results/${matchResultId}/confirm`, { method: 'PATCH' })
    if (res.ok) {
      const confirmed: MatchResultPlain = await res.json()
      setPending(prev => prev.filter(m => m.missionResultId !== matchResultId))
      setHistory(prev => [confirmed, ...prev])
      toast.success('Match confirmed')
    } else {
      toast.error('Failed to confirm match')
    }
  }

  const handleDispute = async (matchResultId: number) => {
    const res = await fetch(`/api/match-results/${matchResultId}`, { method: 'DELETE' })
    if (res.ok) {
      setPending(prev => prev.filter(m => m.missionResultId !== matchResultId))
      toast.success('Match disputed and removed')
    } else {
      toast.error('Failed to dispute match')
    }
  }

  const handleRecorded = (match: MatchResultPlain) => {
    // Newly reported match goes into pending (awaiting opponent confirmation)
    // No UI change needed here since it's not confirmed yet
    setShowRecordModal(false)
    toast.success(`Battle recorded - awaiting confirmation from ${match.squadB?.userName}`)
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
          <button
            onClick={fetchData}
            disabled={loading}
            title="Refresh battles"
            aria-label="Refresh battles"
            className="text-muted hover:text-main disabled:opacity-40 transition-colors"
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''} />
          </button>
          {isOwner && (
            <Button onClick={() => setShowRecordModal(true)}>
              <h6>Record Battle</h6>
            </Button>
          )}
        </div>
      </div>

      {/* Pending Confirmations */}
      {pending.length > 0 && (
        <div className="space-y-2">
          <h6 className="text-main font-heading font-bold uppercase tracking-wider text-xs">
            Awaiting Your Confirmation
          </h6>
          {pending.map(match => {
            const reporter = match.squadA
            const resultText = match.result === 'A'
              ? `${reporter?.squadName} (${reporter?.userName}) reported a WIN over ${squadName}`
              : match.result === 'B'
                ? `${reporter?.squadName} (${reporter?.userName}) reported a LOSS to ${squadName}`
                : `${reporter?.squadName} (${reporter?.userName}) reported a DRAW with ${squadName}`
            return (
              <div key={match.missionResultId} className="border border-border rounded p-3 space-y-2">
                <p className="text-sm">{resultText}</p>
                <p className="text-xs text-muted">{new Date(match.matchDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                <div className="flex gap-2">
                  <Button onClick={() => handleConfirm(match.missionResultId)}>
                    <h6>Confirm</h6>
                  </Button>
                  <Button variant="ghost" onClick={() => handleDispute(match.missionResultId)}>
                    <h6>Dispute</h6>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Match History */}
      <div className="space-y-2">
        {history.length === 0 ? (
          <p className="text-muted text-sm">No battles recorded yet.</p>
        ) : (
          <>
            <h5 className="text-muted">Battle History</h5>
            <div className="space-y-1">
              {history.map(match => {
                const opp = opponentInfo(match, squadId)
                const { label, className } = resultLabel(match, squadId)
                return (
                  <div key={match.missionResultId} className="flex items-center gap-3 py-1 border-b border-border/40 text-sm">
                    <span className={`font-bold font-heading text-lg w-4 text-center ${className}`}>{label}</span>
                    <span className="flex-1 flex items-center gap-1 flex-wrap">
                      <span className="text-muted">vs</span>
                      {opp && <SquadLink squadId={opp.squadId} squadName={opp.squadName} />}
                      <span className="text-muted">by</span>
                      {opp && <UserLink userName={opp.userName} />}
                      {!match.squadBConfirmed && <span className="text-zinc-500 italic">· Pending</span>}
                    </span>
                    <span className="text-xs text-muted text-right">
                      <span className="block">{new Date(match.matchDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                      <span className="block">{new Date(match.matchDate).toLocaleTimeString()}</span>
                    </span>
                  </div>
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
  const [results, setResults] = useState<SquadSearchResult[]>([])
  const [opponent, setOpponent] = useState<SquadSearchResult | null>(null)
  const [result, setResult] = useState<'A' | 'B' | 'D' | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (query.length < 2) { setResults([]); return }
    if (searchTimeout.current) clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(async () => {
      const res = await fetch(`/api/squads/search?q=${encodeURIComponent(query)}`)
      if (res.ok) {
        const data: SquadSearchResult[] = await res.json()
        setResults(data.filter(s => s.squadId !== mySquadId && s.userId !== myUserId))
      }
    }, 300)
  }, [query, mySquadId, myUserId])

  const handleSubmit = async () => {
    if (!opponent || !result) return
    setSubmitting(true)
    const res = await fetch('/api/match-results', {
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
          <p className="text-main font-bold">{mySquadName}</p>
        </div>

        {/* Opponent search */}
        <div>
          <p className="text-xs text-muted mb-1 uppercase tracking-wider">Opponent Squad</p>
          {opponent ? (
            <div className="flex items-center justify-between border border-orange-500 rounded p-2">
              <div>
                <p className="text-main font-bold text-sm">{opponent.squadName}</p>
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
                placeholder="Search by squad name or username..."
                className="w-full bg-zinc-900 border border-border rounded px-3 py-2 text-sm text-main placeholder-muted focus:outline-none focus:border-orange-500"
              />
              {results.length > 0 && (
                <div className="mt-1 border border-border rounded divide-y divide-border max-h-48 overflow-y-auto">
                  {results.map(r => (
                    <button
                      key={r.squadId}
                      className="w-full text-left px-3 py-2 hover:bg-zinc-900 text-sm"
                      onClick={() => { setOpponent(r); setQuery('') }}
                    >
                      <span className="text-main font-bold">{r.squadName}</span>
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
          <div className="flex gap-2">
            {([
              { value: 'A' as const, label: 'I Won' },
              { value: 'D' as const, label: 'Draw' },
              { value: 'B' as const, label: 'They Won' },
            ]).map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setResult(value)}
                className={`flex-1 py-2 rounded border text-sm font-bold transition-colors ${
                  result === value
                    ? 'border-orange-500 text-main bg-orange-500/10'
                    : 'border-border text-muted hover:border-zinc-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )
}
