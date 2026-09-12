'use client'

import { UserLink } from '@/components/nav/Links'
import { format } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { FaBolt, FaUsers } from 'react-icons/fa6'
import { FiRotateCw } from 'react-icons/fi'
import { Modal, SectionTitle } from '../ui'

export default function AdminTools() {
  const [stats, setStats] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showUsers, setShowUsers] = useState<{ title: string; usernames: string[] } | null>(null)
  
  const refreshStats = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/adminstats', { cache: 'no-store' })
      if (!res.ok) throw new Error('Failed to fetch admin stats')
      const data = await res.json()
      setStats(data)
    } catch (err) {
      console.error(err)
      setError('Could not load stats')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshStats()
  }, [refreshStats])

  if (loading) return <p className="text-sm text-muted">Loading stats...</p>
  if (error) return <p className="text-sm text-red-500">{error}</p>
  if (!stats) return null

  return  (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <SectionTitle>
          <button
            onClick={refreshStats}
            title="Refresh stats"
            className="cursor-pointer"
          >
            {stats.datestamp &&
              format(stats.datestamp, 'yyyy-MM-dd HH:mm')
            }
            <FiRotateCw className="inline ml-1 mb-1 text-sm" />
          </button>
        </SectionTitle>

        {/* Right-aligned quick stats */}
        <div className="flex items-center gap-4 text-main">
          <div className="flex items-center gap-1">
            <FaUsers />
            <span>{stats.activeUsers30min}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaBolt />
            <span>{stats.events30min}</span>
          </div>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-center font-bold">
            <td>Users</td>
            <td>Squads</td>
            <td>Units</td>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td>{stats.totals.users.toLocaleString()}</td>
            <td>{stats.totals.squads.toLocaleString()}</td>
            <td>{stats.totals.units.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>

      <SectionTitle>Stats</SectionTitle>
      <table className="w-full">
        <thead>
          <tr className="font-bold">
            <td>Date</td>
            <td className="text-right">Users</td>
            <td className="text-right">Signups</td>
            <td className="text-right">Visits</td>
            <td className="text-right">Views</td>
          </tr>
        </thead>
        <tbody>
          {stats.dailyStats.map((dat: any) => (
            <tr key={`dailyStats_${dat.date}`}>
              <td>{dat.date}</td>
              <td className="text-right">
                {(dat.uniqueLoggedInUsers > 0 ) &&
                  (
                    <>
                      <button
                        type="button"
                        onClick={() => setShowUsers({ title: `Logged in on ${dat.date}`, usernames: dat.loggedInUsernames || [] })}
                        className="underline text-main hover:text-main/80"
                      >
                        {dat.uniqueLoggedInUsers.toLocaleString()}
                      </button>
                      { ' + ' }
                    </>
                  )
                }
                {(dat.uniqueAnonymousUsers ?? 0).toLocaleString()}
              </td>
              <td className="text-right">
                {dat.signups > 0 ? (
                  <button
                    type="button"
                    onClick={() => setShowUsers({ title: `Signups on ${dat.date}`, usernames: dat.signupUsernames || [] })}
                    className="underline text-main hover:text-main/80"
                  >
                    {dat.signups.toLocaleString()}
                  </button>
                ) : (
                  dat.signups.toLocaleString()
                )}
              </td>
              <td className="text-right">{(dat.visits ?? 0).toLocaleString()}</td>
              <td className="text-right">{dat.views.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUsers && (
        <Modal title={showUsers.title} onClose={() => setShowUsers(null)}>
          <div className="flex flex-col items-start gap-2">
            {showUsers.usernames.length > 0 ? (
              showUsers.usernames.map(username => (
                <UserLink key={username} userName={username} newTab={true} />
              ))
            ) : (
              <p className="text-sm text-muted">No usernames captured for this date.</p>
            )}
          </div>
        </Modal>
      )}
    </div>
  )
}
