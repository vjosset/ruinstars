'use client'

import CampaignSelectField, { CAMPAIGN_FIELD_GRID } from '@/components/campaign/CampaignSelectField'
import { Button, Input, Label, Modal } from '@/components/ui'
import { MissionDeployments } from '@/data/mission_deployments'
import { MissionObjectives } from '@/data/mission_objectives'
import { getObjective, rollDeploymentId, rollObjectiveId } from '@/lib/utils/campaign'
import { SquadCampaignMission } from '@/types'
import { useState } from 'react'
import { FiPlus } from 'react-icons/fi'

const deploymentOptions = MissionDeployments.map(d => ({ value: d.deploymentId, label: `${d.deploymentId} - ${d.title}` }))

const objectiveOptions = MissionObjectives.flatMap(archetype =>
  archetype.variations.map(v => ({ value: v.objectiveId, label: `${v.objectiveId} - ${v.title}`, group: archetype.title }))
)

export default function CampaignMissionEditor({
  title,
  mission,
  otherMissions,
  onSave,
  onClose,
}: {
  title: string
  mission: SquadCampaignMission
  /** The Operation's other Missions, whose picks the dice avoid */
  otherMissions: SquadCampaignMission[]
  onSave: (mission: SquadCampaignMission) => void
  onClose: () => void
}) {
  const [deploymentId, setDeploymentId] = useState(mission.deploymentId)
  const [objectiveIds, setObjectiveIds] = useState(mission.objectiveIds)
  const [mpText, setMpText] = useState(mission.mp === null ? '' : String(mission.mp))

  const archetypeIds = objectiveIds.map(objectiveId => getObjective(objectiveId)?.archetypeId ?? null)
  const hasArchetypeClash = objectiveIds.length === 2 && archetypeIds[0] === archetypeIds[1]
  const mp = mpText.trim() === '' ? null : Number(mpText)
  const isMpInvalid = mp !== null && (!Number.isInteger(mp) || mp < 0)

  const setObjectiveAt = (index: number, objectiveId: string) =>
    setObjectiveIds(prev => prev.map((existing, i) => (i === index ? objectiveId : existing)))

  // Dice keep a pair valid, always change the current pick, and avoid the other Missions' picks where possible
  const pairedObjectiveId = (index: number) => (objectiveIds.length === 2 ? objectiveIds[1 - index] : null)
  const otherCombinations = otherMissions.map(other => other.objectiveIds)

  return (
    <Modal
      title={title}
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            <h6>Cancel</h6>
          </Button>
          <Button onClick={() => onSave({ deploymentId, objectiveIds, mp })} disabled={hasArchetypeClash || isMpInvalid}>
            <h6>Save</h6>
          </Button>
        </div>
      }
    >
      <div className="space-y-2">
        <CampaignSelectField
          label="Deployment"
          value={deploymentId}
          options={deploymentOptions}
          onChange={setDeploymentId}
          onReroll={() => setDeploymentId(rollDeploymentId({
            excludeId: deploymentId,
            avoidIds: otherMissions.map(other => other.deploymentId),
          }))}
        />

        {objectiveIds.map((objectiveId, index) => (
          <CampaignSelectField
            key={index}
            label={objectiveIds.length === 2 ? `Objective ${index + 1}` : 'Objective'}
            value={objectiveId}
            options={objectiveOptions}
            onChange={value => setObjectiveAt(index, value)}
            onReroll={() => setObjectiveAt(index, rollObjectiveId({
              pairedObjectiveId: pairedObjectiveId(index),
              excludeId: objectiveId,
              avoidCombinations: otherCombinations,
            }))}
            onRemove={objectiveIds.length === 2
              ? () => setObjectiveIds(prev => prev.filter((_, i) => i !== index))
              : undefined}
          >
            {index === 1 && hasArchetypeClash && (
              <p className="text-sm text-main">Objectives must be of different Archetypes.</p>
            )}
          </CampaignSelectField>
        ))}
        {objectiveIds.length === 1 && (
          <div className={CAMPAIGN_FIELD_GRID}>
            <div className="col-start-2">
              <Button variant="ghost" onClick={() => setObjectiveIds(prev => [...prev, rollObjectiveId({
                pairedObjectiveId: objectiveIds[0],
                avoidCombinations: otherCombinations,
              })])}>
                <FiPlus />
                <span className="text-sm">Add second Objective</span>
              </Button>
            </div>
          </div>
        )}

        <div className={CAMPAIGN_FIELD_GRID}>
          <Label htmlFor="campaign-mission-mp">MP</Label>
          <Input
            id="campaign-mission-mp"
            type="number"
            inputMode="numeric"
            min={0}
            step={1}
            value={mpText}
            placeholder="Not played yet"
            onChange={e => setMpText(e.target.value)}
            className="h-9 px-2 rounded-md"
          />
          {isMpInvalid && (
            <p className="col-start-2 text-sm text-main">MP must be a whole number, 0 or more.</p>
          )}
        </div>
      </div>
    </Modal>
  )
}
