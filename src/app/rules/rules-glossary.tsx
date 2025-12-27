import PageBreak from '@/components/ui/PageBreak'
import { SpecialService } from '@/services'

export default async function RulesItems({ num }: {num?: Number | null}) {
  const allSpecials = await SpecialService.getAllSpecials()

  const definitions = [
    {
      key: 'Activation',
      definition: 'The process during a Turn where a Unit performs Actions. A Unit is "Activated" once it has taken its turn and cannot be Activated again that Turn.'
    },
    {
      key: 'Action Point (ACT)',
      definition: 'Points a Unit spends to perform Actions during its Activation. Each Unit has a maximum ACT value listed on its StatCard.'
    },
    {
      key: 'Adjacent',
      definition: 'Two Units or Items are considered to be Adjacent if: The closest edges of their bases are within 1 Pace of each other, They are on the same elevation, and There is no wall between them.'
    },
    {
      key: 'Armor Save',
      definition: 'A die roll made when a Unit is hit in Combat to prevent Damage. A result equal to or less than the Unit\'s ARM stat is a success.'
    },
    {
      key: 'Battlefield',
      definition: 'The game board on which the Mission is played.'
    },
    {
      key: 'Campaign',
      definition: 'A series of Missions grouped into Operations. Units gain Medals, XP, GP, Injuries, and Spoils Of War during Campaign play.'
    },
    {
      key: 'Control',
      definition: 'A Unit Controls an objective marker if it is Adjacent to that marker, it is not Adjacent to any enemy Units, and that marker is not Adjacent to any enemy Units.'
    },
    {
      key: 'Critical Strike',
      definition: 'A Combat die roll of 1. Automatically inflicts double Damage (2 points) instead of 1. May have special effects.'
    },
    {
      key: 'Critical Save',
      definition: 'A Save die roll of 1. Counts as 2 Saves in Ranged Combat, and causes returned Damage in Melee Combat.'
    },
    {
      key: 'Damage',
      definition: 'Damage inflicted during Combat. Resolved by rolling Armor Saves.'
    },
    {
      key: 'Deceased',
      definition: 'A Unit is Deceased if it has been permanently removed from the Squad due to being Taken Out in a Mission and failing its Injury roll.'
    },
    {
      key: 'Effect',
      definition: 'A special battlefield rule or ongoing condition applied by the selected Battlefield or Mission.'
    },
    {
      key: 'Elevation',
      definition: 'The vertical distance of a terrain feature. Relevant for determining high ground, climbing, adjacency, and line of sight.'
    },
    {
      key: 'Gear',
      definition: 'The various Weapons, Skills, and Abilities available to a Unit.'
    },
    {
      key: 'Gear Points (GP)',
      definition: 'The point value used to build Squads. Each Unit and item of Gear costs a certain amount of GP. The standard limit is 100 GP per Squad.'
    },
    {
      key: 'Initiative',
      definition: 'Determines which Squad activates a Unit first in each Turn. Decided by a roll-off at the start of the Turn.'
    },
    {
      key: 'Item',
      definition: 'A game element placed on the Battlefield that can be interacted with (e.g. Crates, Spawn Points, Barrels).'
    },
    {
      key: 'Leader',
      definition: 'A single Unit in a given Squad that is the Squad\'s Leader. Leaders contribute extra dice to Tactical Orders each Turn and are often high-value targets.'
    },
    {
      key: 'Line of Sight (LoS)',
      definition: 'A Unit has Line of Sight to a Target if two unobstructed lines can be drawn from its base to two opposite edges of the Target\'s base.'
    },
    {
      key: 'Mission Point (MP)',
      definition: 'Points awarded for completing objectives. The Squad with the most MP at the end of a Mission wins.'
    },
    {
      key: 'Narrative Gear',
      definition: 'Special campaign-only gear, effects, or injuries enabled in Campaign mode. Includes Spoils Of War and persistent Injuries.'
    },
    {
      key: 'Special (Weapon Special)',
      definition: 'An abbreviation or keyword attached to a weapon that indicates a rule or effect beyond base stats (e.g. 2RC, HVY, RNG3).'
    },
    {
      key: 'Spoils Of War',
      definition: 'Permanent bonuses earned by Units through campaign XP. Examples include Accurate, Brutal, or Technician.'
    },
    {
      key: 'Standing',
      definition: 'Opposite of "Taken Out". A Unit is considered Standing if it has 1 or more HIT remaining and has not been Taken Out.'
    },
    {
      key: 'StatCard',
      definition: 'A Unit\'s profile listing all of its combat stats, weapons, skills, and cost.'
    },
    {
      key: 'Tactical Orders (TO)',
      definition: 'Extra resources rolled at the start of each Turn. Used to perform bonus actions, re-rolls, or TO-only skills.'
    },
    {
      key: 'Taken Out',
      definition: 'Opposite of "Standing". A Unit is Taken Out when its HIT is reduced to 0. It is removed from the battlefield and may receive an Injury during campaign play.'
    },
    {
      key: 'Tile',
      definition: 'See Battlefield Tile. Each battlefield is divided into 9 tiles that may affect setup and effects.'
    },
    {
      key: 'Turn',
      definition: 'A phase of the game during which both Squads alternate activating Units. Each game typically consists of four Turns.'
    },
    {
      key: 'Unit',
      definition: 'An individual model in a Squad. Each Unit has its own StatCard, can perform Actions, and can be affected by Skills, Gear, or Effects.'
    }
  ]

  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="glossary">
        {num && `${num}. `}Glossary
      </h2>
      <div className="section twocols">
        {
          definitions.map(def => (
            <div className="section" key={`definition_${def.key}`}>
              <strong className="text-main">{def.key}</strong>
              <p className="pl-2 pb-2">
                {def.definition}
              </p>
            </div>
          ))
        }
      </div>
      <br/><br/>

      <PageBreak />
      <h3 className="text-center py-3" id="specials">
        Specials
      </h3>
      <div className="section twocols">

        {
          allSpecials.filter((s) => s.scope == 'W').sort((a, b) => a.code.localeCompare(b.code)).map((spec) => (
            <div className="section" key={`spec_${spec.code}`}>
              <strong className="text-main">
                <code>{spec.code.replace('_', 'x')}</code>
                { ' - ' }
                {spec.specialName.replace('_', 'x')}
              </strong>
              <p className="pl-2 pb-2">
                {spec.description.replace('_', 'x')}
              </p>
            </div>
          ))
        }
      </div>
    </div>
  )}
