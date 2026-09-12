'use client'

import CampaignMissionCard from '@/components/campaign/CampaignMissionCard'
import { SquadLink } from '@/components/nav/Links'
import { getBattlefield } from '@/lib/utils/campaign'
import { SquadCampaignOperation, SquadIdentity } from '@/types'
import { FaPencil } from 'react-icons/fa6'

export default function CampaignOperationSection({
  operationIndex,
  operation,
  npcSquads,
  nextMissionIndex,
  isOwner,
  onEditOperation,
  onEditMission,
  onMissionMpChange,
}: {
  operationIndex: number
  operation: SquadCampaignOperation
  npcSquads: SquadIdentity[]
  /** Index of the Campaign's next unplayed Mission when it is in this Operation, otherwise null */
  nextMissionIndex: number | null
  isOwner: boolean
  onEditOperation: () => void
  onEditMission: (missionIndex: number) => void
  onMissionMpChange: (missionIndex: number, mp: number | null) => void
}) {
  // Threat Level is the Operation number
  const operationNumber = operationIndex + 1
  const battlefield = getBattlefield(operation.battlefieldId)
  const npcSquad = npcSquads.find(s => s.squadId === operation.npcSquadId) ?? null
  const operationMP = operation.missions.reduce((sum, mission) => sum + (mission.mp ?? 0), 0)

  return (
    <section className="space-y-2">
      <div className="border-t border-main pb-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h4 className="font-heading text-main">Operation {operationNumber}</h4>
            <span className="text-sm text-muted">TL{operationNumber}</span>
            {isOwner && (
              <button
                type="button"
                className="text-xs text-muted hover:text-main"
                onClick={onEditOperation}
                title={`Edit Operation ${operationNumber}`}
                aria-label={`Edit Operation ${operationNumber}`}
              >
                <FaPencil />
              </button>
            )}
          </div>
          <span className="text-sm text-muted">{operationMP} MP</span>
        </div>
        <p className="text-sm">
          <span className="text-muted">Battlefield:</span>{' '}
          {battlefield ? `${battlefield.title} (${battlefield.effectName})` : `Unknown (${operation.battlefieldId})`}
        </p>
        {operation.npcSquadId !== null && (
          <div className="text-sm flex items-center gap-1 min-w-0">
            <span className="text-muted">NPC Squad:</span>
            {npcSquad
              ? <SquadLink squadId={npcSquad.squadId} squadName={npcSquad.squadName} />
              : <span>Unknown squad</span>}
          </div>
        )}
      </div>

      {operation.missions.map((mission, missionIndex) => (
        <CampaignMissionCard
          key={missionIndex}
          label={`${operationNumber}.${missionIndex + 1}`}
          mission={mission}
          isNext={nextMissionIndex === missionIndex}
          isOwner={isOwner}
          onMpChange={mp => onMissionMpChange(missionIndex, mp)}
          onEdit={() => onEditMission(missionIndex)}
        />
      ))}
    </section>
  )
}
