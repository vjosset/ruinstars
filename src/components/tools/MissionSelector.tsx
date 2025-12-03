'use client'

import MissionBlock from '@/components/shared/MissionBlock'
import battlefieldsData from '@/data/battlefields.json'
import missionsData from '@/data/missions.json'
import { getRandom } from '@/lib/utils/utils'
import { BattlefieldPlain, MissionPlain } from '@/types'
import { useEffect, useState } from 'react'
import { GiRollingDices } from 'react-icons/gi'
import BattlefieldBlock from '../shared/BattlefieldBlock'

const missions = missionsData as MissionPlain[]
const battlefields = battlefieldsData as BattlefieldPlain[]

const primaryMissions = missions.filter((mission) => mission.missionType === 'Primary')
const secondaryMissions = missions.filter((mission) => mission.missionType === 'Secondary')

export default function MissionSelector() {
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
    (mission) => mission.missionId === selectedPrimaryMissionId
  )

  const selectedSecondaryMission = secondaryMissions.find(
    (mission) => mission.missionId === selectedSecondaryMissionId
  )

  const selectedBattlefield = battlefields.find(
    (battlefield) => battlefield.battlefieldId === Number(selectedBattlefieldId)
  )

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm w-20">Primary:</span>
          <div className="flex flex-1">
            <select
              className="flex-1 h-8 px-3 text-sm bg-card border border-border rounded-l-md appearance-none"
              value={selectedPrimaryMissionId}
              onChange={(event) => setSelectedPrimaryMissionId(event.target.value)}
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

        {secondaryMissions && secondaryMissions.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm w-20">Secondary:</span>
            <div className="flex flex-1">
              <select
                className="flex-1 h-8 px-3 text-sm bg-card border border-border rounded-l-md appearance-none"
                value={selectedSecondaryMissionId}
                onChange={(event) => setSelectedSecondaryMissionId(event.target.value)}
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
        )}

        <div className="flex items-center gap-2">
          <span className="text-sm w-20">Battlefield:</span>
          <div className="flex flex-1">
            <select
              className="flex-1 h-8 px-3 text-sm bg-card border border-border rounded-l-md appearance-none"
              value={selectedBattlefieldId}
              onChange={(event) => setSelectedBattlefieldId(event.target.value)}
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

        {selectedPrimaryMission && (
          <MissionBlock mission={selectedPrimaryMission} showDescription={false} />
        )}
        {selectedSecondaryMission && (
          <MissionBlock mission={selectedSecondaryMission} showDescription={false} />
        )}
        {selectedBattlefield && <BattlefieldBlock battlefield={selectedBattlefield} />}
      </div>
    </>
  )
}
