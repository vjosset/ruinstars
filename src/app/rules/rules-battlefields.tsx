import { BattlefieldService } from '@/services/battlefield.service'
import BattlefieldBlock from '@/components/shared/BattlefieldBlock'

export default async function RulesBattlefields() {
  const battlefields = await(BattlefieldService.getAllBattlefields())

  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="battlefields">
        10. Battlefields
      </h2>
      <div className="section twocols">
        The various battlefields your Squad operates in all have their own dangers.<br/>
        After selecting a Mision, pick or randomly select one of the following battlefields. The Mission will be played on that Battlefield.<br/>
        The Galaxy is a dangerous and deadly place; each Battlefield has <strong>Effects</strong> that affect your Units.
        
        {/* Battlefields List */}
        {
          battlefields.map((battlefield, idx) => (
            <div className="section" key={battlefield.battlefieldId}>
              <BattlefieldBlock battlefield={battlefield} />
            </div>
          ))
        }
      </div>
    </div>
  )}
