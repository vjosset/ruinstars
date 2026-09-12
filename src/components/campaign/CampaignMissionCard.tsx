'use client'

import { getDeployment, getObjective } from '@/lib/utils/campaign'
import { SquadCampaignMission } from '@/types'
import { FaPencil } from 'react-icons/fa6'

export default function CampaignMissionCard({
  label,
  mission,
  isNext,
  isOwner,
  onMpChange,
  onEdit,
}: {
  /** e.g. "2.3" */
  label: string
  mission: SquadCampaignMission
  isNext: boolean
  isOwner: boolean
  onMpChange: (mp: number | null) => void
  onEdit: () => void
}) {
  const deployment = getDeployment(mission.deploymentId)

  return (
    <div className={`bg-card border rounded p-2 flex gap-3 items-center ${isNext ? 'border-main' : 'border-border'}`}>
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-center gap-2">
          <h6 className="font-bold font-heading">Mission {label}</h6>
          {isNext && <span className="text-xs uppercase tracking-wide text-main">Next</span>}
          {isOwner && (
            <button
              type="button"
              className="text-xs text-muted hover:text-main"
              onClick={onEdit}
              title={`Edit Mission ${label}`}
              aria-label={`Edit Mission ${label}`}
            >
              <FaPencil />
            </button>
          )}
        </div>
        <p className="text-sm">
          <span className="text-muted">Deployment:</span> {deployment?.title ?? `Unknown (${mission.deploymentId})`}
        </p>
        {mission.objectiveIds.map(objectiveId => {
          const objective = getObjective(objectiveId)
          return (
            <p key={objectiveId} className="text-sm">
              <span className="text-muted">{objective?.archetypeTitle ?? 'Objective'}:</span>{' '}
              {objective ? `${objective.objectiveId} ${objective.title}` : `Unknown (${objectiveId})`}
            </p>
          )
        })}
      </div>

      {/* MP - null means not played; stepping below 0 clears it */}
      <div className="flex flex-col items-center gap-1 shrink-0">
        <h6 className="font-bold">MP:</h6>
        <div className="flex gap-1 items-center justify-center">
          {isOwner && (
            <button
              className="flex items-center justify-center rounded border border-border w-6 h-6 text-lg disabled:opacity-40"
              onClick={() => onMpChange(mission.mp ? mission.mp - 1 : null)}
              disabled={mission.mp === null}
              title={mission.mp === 0 ? 'Mark as not played' : 'Decrease MP'}
              aria-label={mission.mp === 0 ? 'Mark as not played' : 'Decrease MP'}
            >−</button>
          )}
          <h4 className="stat w-7 text-center text-main">{mission.mp ?? '–'}</h4>
          {isOwner && (
            <button
              className="flex items-center justify-center rounded border border-border w-6 h-6 text-lg"
              onClick={() => onMpChange(mission.mp === null ? 0 : mission.mp + 1)}
              title="Increase MP"
              aria-label="Increase MP"
            >+</button>
          )}
        </div>
      </div>
    </div>
  )
}
