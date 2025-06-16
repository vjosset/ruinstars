'use client'
import MissionBlock from '@/components/shared/MissionBlock'
import { getRandom } from '@/lib/utils/utils'
import { Mission, MissionPlain } from '@/types'
import { useEffect, useState } from 'react'
import { GiRollingDices } from 'react-icons/gi'
import BattlefieldBlock from '../shared/BattlefieldBlock'

export default function MissionSelector() {
  const [primaryMissions, setPrimaryMissions] = useState<Mission[]>([])
  const [secondaryMissions, setSecondaryMissions] = useState<Mission[]>([])
  const [battlefields, setBattlefields] = useState<any[]>([])
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
  const [selectedBattlefieldId, setSelectedBattlefieldId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('selectedBattlefieldId') || ''
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
    fetch('/api/battlefields')
      .then((res) => res.json())
      .then((data) => {
        setBattlefields(data)
      })
      .catch((err) => console.error('Failed to load battlefields:', err))
  }, [])
  
  useEffect(() => {
    if (selectedBattlefieldId) {
      localStorage.setItem('selectedBattlefieldId', selectedBattlefieldId)
    } else {
      localStorage.removeItem('selectedBattlefieldId')
    }
  }, [selectedBattlefieldId])
  
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

  const selectedBattlefield = battlefields.find(
    (m) => m.battlefieldId === Number(selectedBattlefieldId)
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

        {/* Battlefield Selector */}
        <div className="flex items-center gap-2">
          <span className="text-sm w-20">Battlefield:</span>
          <div className="flex flex-1">
            <select
              className="flex-1 h-8 px-3 text-sm bg-card border border-border rounded-l-md appearance-none"
              value={selectedBattlefieldId}
              onChange={(e) => setSelectedBattlefieldId(e.target.value)}
            >
              <option value="">Select a battlefield...</option>
              {battlefields.map((battlefield) => (
                <option key={battlefield.battlefieldId} value={battlefield.battlefieldId}>
                  {battlefield.battlefieldId} - {battlefield.title}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="w-8 h-8 flex items-center justify-center text-lg border border-border border-l-0 rounded-r-md bg-zinc-900 hover:bg-zinc-800"
              onClick={() => {
                if (battlefields.length === 0) return
                const currentBattlefieldId = selectedBattlefieldId
                let randomBattlefield = getRandom(battlefields)
            
                // Make sure we give them a different battlefield
                while (randomBattlefield.battlefieldId.toString() === currentBattlefieldId && battlefields.length > 1) {
                  randomBattlefield = getRandom(battlefields)
                }
                setSelectedBattlefieldId(randomBattlefield.battlefieldId.toString())
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

        
        {selectedBattlefield && (
          <BattlefieldBlock battlefield={selectedBattlefield} />
        )}
      </div>
    </>
  )
}
