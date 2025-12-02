import Markdown from '@/components/ui/Markdown'
import { GearCategoryService } from '@/services'
import { MedalService } from '@/services/medal.service'

export default async function RulesCampaigns({ num }: {num?: Number | null}) {
  const medals = await MedalService.getAllMedals()
  const injuries = await GearCategoryService.getGearCategory('INJ')
  const spoilsOfWar = await GearCategoryService.getGearCategory('SOW')

  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="campaigns">
        {num && `${num}. `}Campaigns
      </h2>
      <div className="twocols">
        <div className="section">
          <h3>Campaign Structure</h3>
          A Campaign is composed of three Operations, and each Operation is composed of three Missions.<br/>
          At the end of each Operation, your Squad returns to Homebase to heal injuries, resupply, and recruit new Units into the Squad.<br/>
          To build a Campaign, randomly select the nine missions from the list of <a className="underline" href="#missions">Primary Missions</a>,
          or string together three <a className="underline" href="#scriptedoperations">Scripted Operations</a>.
        </div>
        <div className="section">
          <h3>Operations</h3>
          An Operation represents a critical deployment arc within the larger Campaign structure, which is generally composed of three sequential Missions.
          When the Operation begins, your Squad is considered in the field. While deployed in the field, the Squad cannot change its Units or Gear selections, and any Gear Points (GP) or Experience Points (XP) earned during these missions cannot be spent on new Units or Gear.<br/>
          Once the third Mission of an Operation is complete, your Squad returns to Homebase to heal Injuries, make new Gear selections, and recruit new Units by spending GP and XP.
        </div>
        <div className="section">
          <h4>Homebase</h4>
          At the end of each Operation (after the third Mission), your Squad returns to Homebase to heal injuries, resupply, and utilize accrued resources.
          <ol>
            <li>Remove all Deceased Units from your Squad.</li>
            <li>Remove all Injuries from remaining Units.</li>
            <li>Recruit new Units into the Squad. Deceased Units can only be replaced during this Homebase phase.</li>
            <li>Make changes to your Squad's selected Gear and Spoils Of War.</li>
          </ol>
        </div>
        <div className="section">
          <h3>Sample Campaign</h3>
          <ul>
            <li>
              Operation 1 - The Facility
              <ul>
                <li>Mission 1.1 - Retrieve Intel</li>
                <li>Mission 1.2 - Intercept</li>
                <li>Mission 1.3 - Sabotage</li>
              </ul>
            </li>
            <li>Homebase</li>
            <li>
              Operation 2 - The Ruined City
              <ul>
                <li>Mission 2.1 - Rivals</li>
                <li>Mission 2.2 - Scavenge</li>
                <li>Mission 2.3 - Control</li>
              </ul>
            </li>
            <li>Homebase</li>
            <li>
              Operation 3 - No Man's Land
              <ul>
                <li>Mission 3.1 - Defend</li>
                <li>Mission 3.2 - Infiltrate</li>
                <li>Mission 3.3 - Eradicate</li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="section">
          <h3>Injuries</h3>
          <p>
            At the end of each Mission, each of your Units that were Taken Out during the mission may have a persistent injury.
            Note that when playing a campaign, all Injuries (except Deceased) are removed from your Units when they return to Homebase at the end of each Operation.
          </p>
          <p>
            At the end of each Mission, for each Unit that was Taken Out, roll <code>1D6</code> to determine the Injury this Unit received.<br/>
            If the Injury is one that the Unit already had, that Unit is Deceased. Remove the Unit from the Squad. That Unit cannot be replaced until the Squad returns to Homebase at the end of the Operation.<br/>
            If the Injury is Healed, remove one other Injury from that Unit. If it has no other Injuries, Healed has no effect.
          </p>
          <ul>
            {/* Injuries List */}
            {
              injuries?.gears.map((injury) => (
                <li key={`inj_${injury.gearId}`}>
                  <h6>{injury.gearName}</h6>
                  <Markdown>{injury.description}</Markdown>
                </li>
              ))
            }
          </ul>
        </div>
      
        <div className="section">
          <h3>Medals</h3>
          <p>
          As your Squad completes Missions and achieves objectives, it grows in skill and available resources.<br/>
          During each Mission, your Squad's Units gain XP from medals as described below.
          Each Medal can only be claimed once per Unit.
          </p>
          <ul className="twocols">
            {/* Medals List */}
            {
              medals.map((medal) => (
                <li key={`medal_${medal.medalId}`}>
                  <h6>{medal.title} - {medal.XP} XP</h6>
                  <Markdown>{medal.description}</Markdown>
                </li>
              ))
            }
          </ul>
        </div>
      
        <div className="section">
          <h3>Spoils Of War</h3>
          <p>
            For each increment of 5 XP earned, a Unit may take one Spoil Of War when it returns to Homebase at the end of an Operation (unless it is Deceased).<br/>
            For example, a Unit with 13 XP can take 2 Spoils Of War.
          </p>
          <ul>
            {/* Spoils Of War List */}
            {
              spoilsOfWar?.gears.map((sow) => (
                <li key={`sow_${sow.gearId}`}>
                  <h6>{sow.gearName}</h6>
                  <Markdown>{sow.description}</Markdown>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )}
