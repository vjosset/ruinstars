import ScriptedOperationsList from '@/components/shared/ScriptedOperationsList'
import ops from '@/data/old/scriptedOperations.json'
import { FactionService } from '@/services'

export default async function RulesScriptedOperations({ num }: {num?: number | null}) {
  const operations = ops.sort((a, b) => a.title.localeCompare(b.title))
  const factions = await FactionService.getAllFactions()

  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="scriptedoperations">
        {num && `${num}. `}Scripted Operations
      </h2>
      
      <p>
        Instead of playing a core mission or rolling your own Campaign, you may choose to play a Scripted Operation.<br/>
        Scripted Operations are pre-built mini-campaigns tailored to specific squads and factions, and include branching missions based on successes and failures.
      </p>
      <p className="printonly">
        Refer to the end of this rule book for the complete list of Scripted Operations and their Missions.
      </p>
      <ScriptedOperationsList operations={operations} factions={factions} />
    </div>
  )}
