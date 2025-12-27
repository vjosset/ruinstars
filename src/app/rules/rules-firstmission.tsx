import PageBreak from '@/components/ui/PageBreak'
import UnitCard from '@/components/unit/UnitCard'
import { SpecialService, SquadService } from '@/services'

export default async function RulesFirstMission({ num }: {num?: number | null }) {
  const squadUnits = await SquadService.getSquad('FM')
  const allSpecials = await SpecialService.getAllSpecials()
  return (
    <>
      <PageBreak />
      <div className="section">
        <h2 className="text-center py-3 font-title"   id="first-mission">
          {num && `${num}. `}Your First Mission
        </h2>
        <div className="twocols">
          <div className="section">
            <div className="flavor">
              This mission introduces the core flow of Ruinstars: actions, movement, combat, and objectives. These are the core concepts of the game.
              In your next missions, you can introduce more advanced topics like Tactical Orders, weapon specials, and Unit Skills.
            </div>
            <h3>What You Need</h3>
            <ul>
              <li>2 Squads of 4 Units each. Use the starting squad below.</li>
              <li>A 2'x2' battlefield.</li>
              <li>4-6 pieces of terrain (ruins, barricades, whatever you have on hand)</li>
              <li>A handful of 6-sided dice</li>
              <li>This page and the first mission squad below</li>
            </ul>
          </div>

          <div className="section">
            <h3>Setup</h3>
            <ol>
              <li>Place terrain evenly across the battlefield</li>
              <li>Place one objective maker in the center of the battlefield</li>
              <li>Deploy both squads on opposite battlefield edges</li>
            </ol>
          </div>

          <div className="section">
            <h3>The Mission</h3>
            <strong>Secure The Ruin</strong>
            <ul>
              <li>A Squad controls the Ruin if it has more Standing Units Adjacent to it than the opposing Squad</li>
              <li>If a Squad controls the Objective at the end of Turn 4, that Squad wins</li>
              <li>If neither Squad controls the Objective, the mission is a draw.</li>
            </ul>
          </div>

          <div className="section">
            <h3>What To Ignore For This Mission</h3>

            For you first game, do not use:
            <ul>
              <li>Unit Skills</li>
              <li>Weapon Specials</li>
              <li>Tactical Orders</li>
              <li>Combat modifiers (cover, attacks of opportunity, etc.)</li>
              <li>Campaign effects (XP, medals, injuries, spoils of war)</li>
            </ul>
          </div>

          <div className="section">
            <h3>When You're Ready</h3>

            After this mission:
            <ul>
              <li>Add Unit Skills and Weapon Specials</li>
              <li>Introduce Tactical Orders and Attacks of Opportunity</li>
              <li>Build your Squad for your preferred faction</li>
              <li>Try one of the <a className="underline" href="/rules#missions">Primary Missions</a></li>
            </ul>

            Each layer adds depth, but the core concepts and mechanisms remain the same.
          </div>

          <div className="section">
            <h3>How To Play</h3>
            <em>The only rules you need</em><br/>
            <strong>Turn Sequence</strong>
            <ol>
              <li>Start the Turn</li>
              <li>Players alternate activating one Unit at a time</li>
              <li>
                During its activation, a Unit may spend its ACT (Actions) to:
                <ul>
                  <li>Move up to 3 Paces</li>
                  <li>Dash up to 1 Pace</li>
                  <li>Shoot (see Combat below)</li>
                  <li>Fight (see Combat below)</li>
                </ul>
                These actions can occur in any order, but remember that repeating a same action during an activation costs one additional ACT.
                For example, if a Unit wants to Move twice, the first Move action will cost 1 ACT, and the second one will cost 2 ACT for a total of 3 ACT.
              </li>
              <li>End the Turn after all Units have been activated</li>
            </ol>

            <strong>Combat (Simplified)</strong><br/>
            <em>If a Unit is Adjacent to an enemy (less than 1 Pace apart), it must use its Melee weapon to attack that enemy.</em>
            <ol>
              <li>Roll D6s equal to your weapon's ATT (Attacks) stat</li>
              <li>Rolls equal to or lower than your weapon's SKL (Skill) stat are successful strikes</li>
              <li>Target rolls 1D6 for each successful strike. For each roll equal to or lower than the target's ARM (Armor), the target's armor absorbs the strike.</li>
              <li>For each remaining (unsaved) strike, the target loses 1 HIT. If the target reaches 0 HIT, it is Taken Out and removed from the battlefield.</li>
            </ol>
          </div>

          <div className="section">
            <h3>Why This Mission Exists</h3>

            This mission isn't about winning, it's about learning how Ruinstars feels and cementing the core concepts.
            <ul>
              <li>Tight positioning</li>
              <li>Risk vs reward</li>
              <li>The cost of overextending</li>
              <li>The pressure of objectives</li>
            </ul>

            If this clicks, the rest of the rules will make sense.
          </div>
        </div>

        <div className="section">
          <h3>Your Squad</h3>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {squadUnits?.units?.map((u) => (
              <UnitCard 
                key={u.unitId}
                seq={u.seq}
                unit={u.toPlain()}
                isOwner={false}
                allSpecials={allSpecials.map((spec) => spec.toPlain())}
                allMedals={[]}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )}
