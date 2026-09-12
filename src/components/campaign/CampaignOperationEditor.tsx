'use client'

import CampaignSelectField, { CampaignSelectOption } from '@/components/campaign/CampaignSelectField'
import { Button, Modal } from '@/components/ui'
import { MissionBattlefields } from '@/data/mission_battlefields'
import { getBattlefield, isOperationStarted, rollBattlefieldId, rollNpcSquadId } from '@/lib/utils/campaign'
import { SquadCampaignOperation, SquadIdentity } from '@/types'
import { useState } from 'react'

/** Select value standing in for a null NPC Squad */
const NO_NPC_SQUAD = ''

const battlefieldOptions = MissionBattlefields.map(b => ({ value: b.battlefieldId, label: b.title }))

export default function CampaignOperationEditor({
  title,
  operation,
  otherOperations,
  npcSquads,
  onSave,
  onClose,
}: {
  title: string
  operation: SquadCampaignOperation
  /** The Campaign's other Operations, whose picks the dice avoid */
  otherOperations: SquadCampaignOperation[]
  npcSquads: SquadIdentity[]
  onSave: (changes: Pick<SquadCampaignOperation, 'battlefieldId' | 'npcSquadId'>) => void
  onClose: () => void
}) {
  const [battlefieldId, setBattlefieldId] = useState(operation.battlefieldId)
  const [npcSquadId, setNpcSquadId] = useState<string | null>(operation.npcSquadId)

  const battlefield = getBattlefield(battlefieldId)
  const npcSquadOptions: CampaignSelectOption[] = [
    { value: NO_NPC_SQUAD, label: 'None' },
    ...npcSquads.map(npcSquad => ({ value: npcSquad.squadId, label: npcSquad.squadName })),
  ]
  // Keep a since-deleted NPC Squad selectable so opening the editor doesn't silently change it
  if (npcSquadId !== null && !npcSquads.some(npcSquad => npcSquad.squadId === npcSquadId)) {
    npcSquadOptions.push({ value: npcSquadId, label: 'Unknown squad' })
  }

  return (
    <Modal
      title={title}
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            <h6>Cancel</h6>
          </Button>
          <Button onClick={() => onSave({ battlefieldId, npcSquadId })}>
            <h6>Save</h6>
          </Button>
        </div>
      }
    >
      <div className="space-y-2">
        {isOperationStarted(operation) && (
          <p className="text-sm text-muted">Missions in this Operation have already been played.</p>
        )}
        <CampaignSelectField
          label="Battlefield"
          value={battlefieldId}
          options={battlefieldOptions}
          onChange={setBattlefieldId}
          onReroll={() => setBattlefieldId(rollBattlefieldId({
            excludeId: battlefieldId,
            avoidIds: otherOperations.map(other => other.battlefieldId),
          }))}
        >
          {battlefield && (
            <p className="text-xs text-muted">
              <strong>{battlefield.effectName}:</strong> {battlefield.quickref ?? battlefield.effect}
            </p>
          )}
        </CampaignSelectField>
        <CampaignSelectField
          label="NPC Squad"
          value={npcSquadId ?? NO_NPC_SQUAD}
          options={npcSquadOptions}
          onChange={value => setNpcSquadId(value === NO_NPC_SQUAD ? null : value)}
          onReroll={npcSquads.length > 0
            ? () => setNpcSquadId(rollNpcSquadId(npcSquads.map(npcSquad => npcSquad.squadId), {
              excludeId: npcSquadId,
              avoidIds: otherOperations.map(other => other.npcSquadId),
            }))
            : undefined}
        />
      </div>
    </Modal>
  )
}
