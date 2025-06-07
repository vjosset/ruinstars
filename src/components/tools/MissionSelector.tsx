'use client'
import { GiRollingDices } from 'react-icons/gi'
import { useEffect, useState } from 'react'
import MissionBlock from '@/components/shared/MissionBlock'
import { Mission, MissionPlain } from '@/types'
import { getRandom } from '@/lib/utils/utils'

export default function MissionSelector() {
  const [primaryMissions, setPrimaryMissions] = useState<Mission[]>([])
  const [secondaryMissions, setSecondaryMissions] = useState<Mission[]>([])
  const [selectedPrimaryMissionId, setSelectedPrimaryMissionId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedPrimaryMissionId') || ''
    }
    return ''
  })
  const [selectedSecondaryMissionId, setSelectedSecondaryMissionId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedSecondaryMissionId') || ''
    }
    return ''
  })

  useEffect(() => {
    fetch('/api/missions')
      .then((res) => res.json())
      .then((data) => {
        setPrimaryMissions(data.filter((mission: MissionPlain) => mission.missionType == 'Primary'))
        setSecondaryMissions(data.filter((mission: MissionPlain) => mission.missionType == 'Secondary'))
      })
      .catch((err) => console.error('Failed to load missions:', err))
  }, [])
  
  useEffect(() => {
    if (selectedPrimaryMissionId) {
      localStorage.setItem('selectedPrimaryMissionId', selectedPrimaryMissionId)
    } else {
      localStorage.removeItem('selectedPrimaryMissionId')
    }
  }, [selectedPrimaryMissionId])
  
  useEffect(() => {
    if (selectedSecondaryMissionId) {
      localStorage.setItem('selectedSecondaryMissionId', selectedSecondaryMissionId)
    } else {
      localStorage.removeItem('selectedSecondaryMissionId')
    }
  }, [selectedSecondaryMissionId])

  const selectedPrimaryMission = primaryMissions.find(
    (m) => m.missionId === Number(selectedPrimaryMissionId)
  )

  const selectedSecondaryMission = secondaryMissions.find(
    (m) => m.missionId === Number(selectedSecondaryMissionId)
  )

  return (
    <>
      {/* Primary Mission Selector */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm w-20">Primary:</span>
          <div className="flex flex-1">
            <select
              className="flex-1 h-8 px-3 text-sm bg-card border border-border rounded-l-md appearance-none"
              value={selectedPrimaryMissionId}
              onChange={(e) => setSelectedPrimaryMissionId(e.target.value)}
            >
              <option value="">Select a mission...</option>
              {primaryMissions.map((mission) => (
                <option key={mission.seq} value={mission.missionId}>
                  {mission.seq} - {mission.title}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center text-lg border border-border border-l-0 rounded-r-md bg-zinc-900 hover:bg-zinc-800"
              onClick={() => {
                if (primaryMissions.length === 0) return
                const currentMissionId = selectedPrimaryMissionId
                let randomMission = getRandom(primaryMissions)

                // Make sure we give them a different mission
                while (randomMission.missionId.toString() === currentMissionId && primaryMissions.length > 1) {
                  randomMission = getRandom(primaryMissions)
                }
                setSelectedPrimaryMissionId(randomMission.missionId.toString())
              }}
            >
              <GiRollingDices />
            </button>
          </div>
        </div>

        {/* Secondary Mission Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm w-20">Secondary:</span>
          <div className="flex flex-1">
            <select
              className="flex-1 h-8 px-3 text-sm bg-card border border-border rounded-l-md appearance-none"
              value={selectedSecondaryMissionId}
              onChange={(e) => setSelectedSecondaryMissionId(e.target.value)}
            >
              <option value="">Select a mission...</option>
              {secondaryMissions.map((mission) => (
                <option key={mission.seq} value={mission.missionId}>
                  {mission.seq} - {mission.title}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center text-lg border border-border border-l-0 rounded-r-md bg-zinc-900 hover:bg-zinc-800"
              onClick={() => {
                if (secondaryMissions.length === 0) return
                const currentMissionId = selectedSecondaryMissionId
                let randomMission = getRandom(secondaryMissions)
                
                // Make sure we give them a different mission
                while (randomMission.missionId.toString() === currentMissionId && secondaryMissions.length > 1) {
                  randomMission = getRandom(secondaryMissions)
                }
                setSelectedSecondaryMissionId(randomMission.missionId.toString())
              }}
            >
              <GiRollingDices />
            </button>
          </div>
        </div>

        {/* Mission Blocks */}
        {selectedPrimaryMission && (
          <MissionBlock
            mission={selectedPrimaryMission}
            showDescription={false}
          />
        )}
        {selectedSecondaryMission && (
          <MissionBlock
            mission={selectedSecondaryMission}
            showDescription={false}
          />
        )}
      </div>
    </>
  )
}
