import Markdown from '@/components/ui/Markdown'
import { GearCategoryService } from '@/services'
import { MedalService } from '@/services/medal.service'
import Link from 'next/link'

export default async function RulesCampaigns() {
  const medals = await MedalService.getAllMedals()
  const injuries = await GearCategoryService.getGearCategory('INJ')
  const spoilsOfWar = await GearCategoryService.getGearCategory('SOW')

  return (
    <div className="section twocols">
      <h2 className="text-center py-3 font-title"   id="campaigns">
        11. Campaigns
      </h2>
      <div className="section">
        <h3>Campaign Structure</h3>
        A Campaign is composed of three Operations, and each Operation is composed of three Missions.<br/>
        At the end of each Operation, your Squad returns to Homebase to heal injuries, resupply, and recruit new Units into the Squad.<br/>
        To build a Campaign, randomly select the nine missions from the list of <a href="">Standard Missions</a>.
      </div>
      <div className="section">
        <h3>Operations</h3>
        Each Operation sees your Squad sent to a location to execute three Missions.
        While on an Operation, your Squad is in the field and cannot change its Units or Gear selections.
        Once the third Mission of an Operation is done, your Squad returns to Homebase to heal Injuries, make new Gear selections, and recruit new Units.
      </div>
      <div className="section">
        <h4>Homebase</h4>
        At the end of each Operation, your Squad returns to homebase.<br/>
        During Missions, your Squad will earn XP and GP. These cannot be spent on any Gear or Units until your Squad returns to Homebase.
        <ul>
          <li>Remove all Deceased Units from your Squad</li>
          <li>Add 2 GP to your Squad's Max GP</li>
          <li>Add 2 GP for each Victory in the previous Operation</li>
          <li>Remove all Injuries (except Deceased) from all Units</li>
          <li>Make changes to your Squad's selected Gear</li>
          <li>Add Spoils Of War to eligible Units</li>
          <li>Recruit new Units into the Squad</li>
        </ul>
      </div>
      
      <div className="section">
        <h3>Spoils Of War</h3>
        <p>
          For each increment of 5 XP earned, a Unit may take another Spoil Of War.<br/>
          For example, a Unit with 13 XP can take 2 Spoils of War.
        </p>
        <p>
          Consult your Squad's Faction's page to review available Spoils of War.<br/>
          Make sure to enable "Narrative Gear" in your <Link href="/tools">Settings</Link> to view Spoils of War and Injuries.
        </p>
        <ul>
          {/* Spoils Of War List */}
          {
            spoilsOfWar?.gears.map((sow, idx) => (
              <li key={sow.gearId}>
                <h6>{sow.gearName}</h6>
                <Markdown>{sow.description}</Markdown>
              </li>
            ))
          }
        </ul>
      </div>

      <div className="section">
        <h3>Injuries</h3>
        <p>
          At the end of each Mission, each of your Units that were Taken Out during the mission may have a persistent injury.
          Randomly select a lasting effect this injury has on that Unit.<br/>
          Note that when playing a campaign, all Injuries (except Deceased) are removed from your Units when they return to Homebase.
        </p>
        <p>
          Consult your Squad's Faction's page to review available Injuries.<br/>
          Make sure to enable "Narrative Gear" in your <Link href="/tools">Settings</Link> to view Spoils of War and Injuries.
        </p>
        <ul>
          {/* Injuries List */}
          {
            injuries?.gears.map((injury, idx) => (
              <li key={injury.gearId}>
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
          As your Squad completes missions and achieves objectives, it grows in skill and available resources.<br/>
          After each Mission, your Squad's Units gain XP from medals as described below.
          Medals can only be claimed once per Unit.
        </p>
        <ul>
          {/* Medals List */}
          {
            medals.map((medal) => (
              <li key={medal.medalId}>
                <h6>{medal.title} - {medal.XP} XP</h6>
                <Markdown>{medal.description}</Markdown>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )}
