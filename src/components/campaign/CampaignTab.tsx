'use client'

import CampaignMissionEditor from '@/components/campaign/CampaignMissionEditor'
import CampaignOperationEditor from '@/components/campaign/CampaignOperationEditor'
import CampaignOperationSection from '@/components/campaign/CampaignOperationSection'
import { Button, Modal } from '@/components/ui'
import {
  createBlankCampaign,
  createRandomCampaign,
  getCampaignTotalMP,
  getNextMission,
  ObjectiveCount,
  parseSquadCampaign,
  randomizeCampaign,
  replaceMission,
  replaceOperation,
} from '@/lib/utils/campaign'
import { SquadCampaign, SquadIdentity } from '@/types'
import { useRef, useState } from 'react'
import { FiShuffle, FiTrash2 } from 'react-icons/fi'
import { toast } from 'sonner'

type MissionRef = { operationIndex: number; missionIndex: number }

export default function CampaignTab({
  squadId,
  initialCampaign,
  npcSquads,
  isOwner,
  onCampaignSaved,
}: {
  squadId: string
  /** Raw `Squad.campaign` JSON */
  initialCampaign: string | null
  npcSquads: SquadIdentity[]
  isOwner: boolean
  /** Receives the saved JSON (null once deleted) so the page's squad stays current across tab switches */
  onCampaignSaved: (campaign: string | null) => void
}) {
  const [campaign, setCampaign] = useState<SquadCampaign | null>(() => parseSquadCampaign(initialCampaign))
  const [objectiveCount, setObjectiveCount] = useState<ObjectiveCount>(2)
  const [editingOperationIndex, setEditingOperationIndex] = useState<number | null>(null)
  const [editingMission, setEditingMission] = useState<MissionRef | null>(null)
  const [pendingConfirm, setPendingConfirm] = useState<'randomize' | 'delete' | null>(null)

  // Latest local state, so rapid MP taps build on each other rather than on a stale render
  const campaignRef = useRef(campaign)
  const lastSavedRef = useRef(campaign)
  // Saves run one at a time and in order, so a burst of taps can't land out of order
  const saveQueueRef = useRef<Promise<void>>(Promise.resolve())

  const npcSquadIds = npcSquads.map(npcSquad => npcSquad.squadId)

  // Optimistic: show the change now, save in the background, roll back on failure
  const commit = (next: SquadCampaign | null) => {
    campaignRef.current = next
    setCampaign(next)

    saveQueueRef.current = saveQueueRef.current.then(async () => {
      try {
        const res = next
          ? await fetch(`/api/squads/${squadId}/campaign`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(next),
          })
          : await fetch(`/api/squads/${squadId}/campaign`, { method: 'DELETE' })

        if (!res.ok) {
          const body = await res.json().catch(() => null)
          throw new Error(body?.error ?? 'Failed to save Campaign')
        }

        lastSavedRef.current = next
        onCampaignSaved(next ? JSON.stringify(next) : null)
      } catch (err) {
        console.error(err)
        toast.error(err instanceof Error ? err.message : 'Failed to save Campaign')
        campaignRef.current = lastSavedRef.current
        setCampaign(lastSavedRef.current)
      }
    })
  }

  const updateCampaign = (update: (current: SquadCampaign) => SquadCampaign) => {
    if (campaignRef.current) commit(update(campaignRef.current))
  }

  // No Campaign yet
  if (!campaign) {
    if (!isOwner) {
      return <p className="text-sm text-muted text-center">No Campaign yet.</p>
    }

    return (
      <div className="bg-card border border-border rounded p-3 space-y-3">
        <h4 className="font-heading text-main">New Campaign</h4>
        <p className="text-sm">
          Three Operations of three Missions each. Threat Level rises with each Operation.
        </p>
        <div className="space-y-1">
          <label className="block text-xs uppercase tracking-wide text-muted">Objectives per Mission</label>
          <div className="flex gap-2">
            {([1, 2] as const).map(count => (
              <Button
                key={count}
                variant={objectiveCount === count ? 'highlighted' : 'ghost'}
                onClick={() => setObjectiveCount(count)}
              >
                <h6>{count}</h6>
              </Button>
            ))}
          </div>
          <p className="text-xs text-muted">
            {objectiveCount === 2
              ? 'Two Objectives per Mission, with an NPC Squad for each Operation.'
              : 'One Objective per Mission, with no NPC Squad.'}
          </p>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => commit(createBlankCampaign(objectiveCount, npcSquadIds))}>
            <h6>Build Manually</h6>
          </Button>
          <Button onClick={() => commit(createRandomCampaign(objectiveCount, npcSquadIds))}>
            <FiShuffle />
            <h6>Randomize</h6>
          </Button>
        </div>
      </div>
    )
  }

  const nextMission = getNextMission(campaign)
  const editingOperation = editingOperationIndex !== null ? campaign.operations[editingOperationIndex] : null
  const editingMissionData = editingMission
    ? campaign.operations[editingMission.operationIndex].missions[editingMission.missionIndex]
    : null

  return (
    <div className="space-y-6">
      {/* Summary + actions */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h6 className="font-bold">Campaign MP:</h6>
          <h4 className="stat text-main">{getCampaignTotalMP(campaign)}</h4>
          {!nextMission && <span className="text-xs uppercase tracking-wide text-main">Complete</span>}
        </div>
        {isOwner && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => setPendingConfirm('randomize')}
              title="Randomize unplayed Missions"
              aria-label="Randomize unplayed Missions"
            >
              <FiShuffle />
            </Button>
            <Button
              variant="ghost"
              onClick={() => setPendingConfirm('delete')}
              title="Delete Campaign"
              aria-label="Delete Campaign"
            >
              <FiTrash2 />
            </Button>
          </div>
        )}
      </div>

      {campaign.operations.map((operation, operationIndex) => (
        <CampaignOperationSection
          key={operationIndex}
          operationIndex={operationIndex}
          operation={operation}
          npcSquads={npcSquads}
          nextMissionIndex={nextMission?.operationIndex === operationIndex ? nextMission.missionIndex : null}
          isOwner={isOwner}
          onEditOperation={() => setEditingOperationIndex(operationIndex)}
          onEditMission={missionIndex => setEditingMission({ operationIndex, missionIndex })}
          onMissionMpChange={(missionIndex, mp) =>
            updateCampaign(current => replaceMission(current, operationIndex, missionIndex, {
              ...current.operations[operationIndex].missions[missionIndex],
              mp,
            }))
          }
        />
      ))}

      {editingOperationIndex !== null && editingOperation && (
        <CampaignOperationEditor
          title={`Operation ${editingOperationIndex + 1}`}
          operation={editingOperation}
          otherOperations={campaign.operations.filter((_, i) => i !== editingOperationIndex)}
          npcSquads={npcSquads}
          onClose={() => setEditingOperationIndex(null)}
          onSave={changes => {
            updateCampaign(current => replaceOperation(current, editingOperationIndex, {
              ...current.operations[editingOperationIndex],
              ...changes,
            }))
            setEditingOperationIndex(null)
          }}
        />
      )}

      {editingMission && editingMissionData && (
        <CampaignMissionEditor
          title={`Mission ${editingMission.operationIndex + 1}.${editingMission.missionIndex + 1}`}
          mission={editingMissionData}
          otherMissions={campaign.operations[editingMission.operationIndex].missions.filter((_, i) => i !== editingMission.missionIndex)}
          onClose={() => setEditingMission(null)}
          onSave={mission => {
            updateCampaign(current => replaceMission(current, editingMission.operationIndex, editingMission.missionIndex, mission))
            setEditingMission(null)
          }}
        />
      )}

      {pendingConfirm === 'randomize' && (
        <Modal
          title="Randomize Campaign"
          onClose={() => setPendingConfirm(null)}
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setPendingConfirm(null)}>
                <h6>Cancel</h6>
              </Button>
              <Button
                onClick={() => {
                  updateCampaign(current => randomizeCampaign(current, npcSquadIds))
                  setPendingConfirm(null)
                }}
              >
                <h6>Randomize</h6>
              </Button>
            </div>
          }
        >
          <p>
            Re-roll every Mission that hasn&apos;t been played yet?
            Operations with played Missions keep their Battlefield and NPC Squad.
          </p>
        </Modal>
      )}

      {pendingConfirm === 'delete' && (
        <Modal
          title="Delete Campaign"
          onClose={() => setPendingConfirm(null)}
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setPendingConfirm(null)}>
                <h6>Cancel</h6>
              </Button>
              <Button
                onClick={() => {
                  commit(null)
                  setPendingConfirm(null)
                }}
              >
                <h6>Delete</h6>
              </Button>
            </div>
          }
        >
          <p>Delete this Campaign and all of its recorded MP? This cannot be undone.</p>
        </Modal>
      )}
    </div>
  )
}
