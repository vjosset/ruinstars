import ScriptedOperationsList from '@/components/shared/ScriptedOperationsList'
import ops from '@/data/scriptedOperations.json'
import { SquadTypeService } from '@/services'

export default async function RulesScriptedOperations() {
  const operations = ops.sort((a, b) => a.title.localeCompare(b.title))
  const squadTypes = await SquadTypeService.getAllSquadTypes()

  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="scriptedoperations">
        12. Scripted Operations
      </h2>
      
      <p>
        Instead of playing a primary mission or rolling your own Campaign, you may choose to play a Scripted Operation.<br/>
        Scripted Operations are pre-built mini-campaigns tailored to specific squads and factions, and include branching missions based on successes and failures.
      </p>
      <p className="printonly">
        Refer to the end of this rule book for the complete list of Scripted Operations and their Missions.
      </p>
      <ScriptedOperationsList operations={operations} squadTypes={squadTypes} />
    </div>
  )}
