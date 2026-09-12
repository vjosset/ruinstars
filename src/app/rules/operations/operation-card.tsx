export type OperationCardMission = {
  seq: number
  title: string
  description: string
  /** Objective variation code, e.g. 'A3'. */
  objectiveId: string
  /** Objective archetype title, e.g. 'Activate'. */
  objectiveArchetype: string
  /** Objective variation title, e.g. 'Search and Recover'. */
  objectiveTitle: string
  /** Deployment roll, e.g. '1'. */
  deploymentId: string
  /** Deployment title, e.g. 'Standard Insertion'. */
  deploymentTitle: string
}

export type OperationCardProps = {
  operationId: string
  title: string
  npcFactionName: string
  npcSquadTypeName: string
  battlefieldTitle: string
  description: string
  missions: OperationCardMission[]
}

export default function OperationCard({
  operationId,
  title,
  npcFactionName,
  npcSquadTypeName,
  battlefieldTitle,
  description,
  missions,
}: OperationCardProps) {
  return (
    <div className="section border border-main rounded-md px-2 pb-1">
      <h3>{title}</h3>

      <div className="grid grid-cols-2 gap-x-2">
        <p><strong>Enemy:</strong> {npcSquadTypeName}</p>
        <p><strong>Battlefield:</strong> {battlefieldTitle}</p>
      </div>

      <p className="flavor">{description}</p>

      {missions.map((mission) => (
        <div key={mission.seq} className="section">
          <h4>Mission {mission.seq}: {mission.title}</h4>
          <div className="pl-2">
            <p>{mission.description}</p>
            <div className="grid grid-cols-2 gap-x-2">
              <p><strong>Objective:</strong> {mission.objectiveId} - {mission.objectiveTitle}</p>
              <p><strong>Deployment:</strong> {mission.deploymentId} - {mission.deploymentTitle}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
