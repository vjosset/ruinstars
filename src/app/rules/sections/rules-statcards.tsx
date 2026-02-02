import UnitCard from '@/components/unit/UnitCard'
import { SpecialService, UnitService } from '@/services'
import { RiCrosshair2Fill, RiSwordFill } from 'react-icons/ri'
import IgnoreForIntroMission from './rules-ignorefirstmission'

export default async function RulesStatCards({ num }: {num?: Number | null}) {
  const sampleUnit = (await UnitService.getUnit('ST-0'))!.toPlain()
  const allSpecials = (await SpecialService.getAllSpecials()).map((spec) => spec.toPlain())
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="stat-cards">
        {num && `${num}. `}Stat Cards
      </h2>
      <div className="section twocols">
        <div className="section">
          <p>
            StatCards describe your Units and their Weapons with numerical values, and any special Skills they may have. In general, the higher the stat number, the better the Unit or Weapon.<br/>
            Note that in the app and on the website, you can click or tap Specials to view what they mean, and Skills or Equipment to get their full description.
          </p>
          <br/>
          <IgnoreForIntroMission keyword="weapon specials and Unit skills" />
          <br/>
        </div>
        <div className="section">
          <div className="p-1">
            <UnitCard 
              unit={sampleUnit}
              seq={1}
              isOwner={false}
              allSpecials={allSpecials}
              allMedals={[]} />
          </div>
        </div>
      </div>
      <hr/>
      <div className="section twocols">
        <div className="section">
          <h4 id="unit-stats">Unit Stats</h4>
          <ul>
            <li>
              <h6 className="inline stat text-main">ACT</h6> - Action Points<br/>
              The maximum number of Action Points this Unit can spend on <a className="underline" href="#actions">Actions</a> during its activation.
            </li>
            {/*
            <li>
              <h6 className="inline">MSK</h6> - Melee Skill<br/>
              Indicates how well this Unit performs in <a className="underline" href="#combat">Melee Combat</a>.<br/>
              When rolling Attacks, results of this stat or lower are successful.
            </li>
            <li>
              <h6 className="inline">RSK</h6> - Ranged Skill<br/>
              Indicates how well this Unit performs in <a className="underline" href="#combat">Ranged Combat</a>.<br/>
              When rolling Attacks, results of this stat or lower are successful.
            </li>
            */}
            <li>
              <h6 className="inline stat text-main">ARM</h6> - Armor<br/>
              Indicates how well this Unit resists damage during <a className="underline" href="#combat">combat</a>.<br/>
              When rolling Armor Saves, results of this stat or lower are successful.
            </li>
            <li>
              <h6 className="inline stat text-main">HIT</h6> - Hit Points<br/>
              The Unit's number of Hit Points. When a Unit reaches zero <code>HIT</code>, it is <strong>Taken Out</strong> and removed from the battlefield (see <a className="underline" href="#combat">Combat</a>).<br/>
              If a Unit has at least 1 <code>HIT</code> remaining, it is considered to be <strong>Standing</strong>.
            </li>
            <li>
              <h6 className="inline stat text-main">GP</h6> - Gear Points<br/>
              The total cost in Gear Points (GP) for this Unit.
            </li>
            {/*
            <li>
              <h6 className="inline stat text-main">FV</h6> - Force Value<br/>
              The Force Value of this Unit. <code>FV</code> is used in some missions to determine a Unit's contribution to Mission Points.
              For example, in the <a href="#missions" className="underline">Attrition</a> Mission, Squads gain MPs equal to Taken Out Units' Force Value.
            </li>
            */}
            <li>
              <h6 className="inline stat text-main">XP</h6> - Experience Points<br/>
              The <a className="underline" href="#progression">Experience</a> this unit has gained in battle. XP can be used to add certain special gear (skills or weapons) to a Unit.
            </li>
            {/* Moved to skills instead
            <li>
              <h6 className="inline">(Special)</h6> - Specials<br/>
              The <a className="underline" href="#unit-specials">Specials</a> that apply to this Unit.
            </li>*/}
          </ul>
          Note that in the app and on the website, each special (e.g. <code>2RC</code>) and skill (e.g. "Duty Before Death") can be clicked or tapped to view their detailed description.
          <br/>
          <strong>For example: </strong>
          <ul>
            <li>{sampleUnit.unitName} is a {sampleUnit.unitTypeName}</li>
            <li>He can perform {sampleUnit.ACT} Actions (<code>ACT</code>) during each of his activations.</li>
            <li>Each time he is the target of Combat and rolls Armor Saves, each result of {sampleUnit.ARM} or less (<code>ARM</code>) is a successful Save.</li>
            <li>He starts each Mission with {sampleUnit.HIT} Hit Points (<code>HIT</code>).</li>
          </ul>
        </div>
        
        <div className="section">
          <h4 id="weapon-stats">Weapon Stats</h4>
          <ul>
            <li>
              <RiSwordFill className="icon" />/<RiCrosshair2Fill className="icon" /> - Weapon Type<br/>
              <RiSwordFill className="icon" /> indicates a Melee weapon, <RiCrosshair2Fill className="icon" /> indicates a Ranged weapon.
            </li>
            <li>
              <h6 className="inline stat text-main">ATT</h6> - Attacks<br/>
              How many Dice are rolled each time this Weapon is used.
            </li>
            <li>
              <h6 className="inline stat text-main">SKL</h6> - Skill<br/>
              Indicates the skill of this Unit when using this Weapon. Rolls that are equal to or less than this value are successful strikes.
            </li>
            <li>
              <h6 className="inline stat text-main">(Special)</h6> - Weapon Specials<br/>
              Specials for this weapon are listed next to its name.
              In the app and on the website, click or tap on them to read their full description.
              Don't worry about remembering the codes; they will quickly become second nature to you.
            </li>
          </ul>
          <br/>
          <strong>For example: </strong>
          <ul>
            <li>{sampleUnit.unitName}'s <strong>{sampleUnit.weapons?.[1].gearName}</strong> is a {sampleUnit.weapons?.[1].TYP == 'R' ? 'Ranged' : 'Melee'} weapon ({ sampleUnit.weapons?.[1].TYP == 'M' ? (<RiSwordFill className="icon" />) : (<RiCrosshair2Fill className="icon" />) }).</li>
            <li>Each time it is used, {sampleUnit.unitName} rolls {sampleUnit.weapons?.[1].ATT} dice (<code>ATT</code>).</li>
            <li>Each result of {sampleUnit.weapons?.[1].TYP == 'R' ? sampleUnit.RSK : sampleUnit.MSK} or less (<code>SKL</code>) is a success.</li>
            {/*<li>It has the <code>ACC1</code> (Accurate 1) and <code>HVY</code> (Heavy) <a className="underline" href="#weapon-specials">specials</a>.</li>*/}
          </ul>
        </div>

        <div className="section">
          <br/><br/>
          <h4 id="skills">Skills</h4>
          <p>Some Units will have Skills listed on their StatCard. These are unique properties of that Unit that may allow them to perform a specific unique Action, or gain a bonus (or debuff) for certain game mechanics.</p>
          <ul>
            <li>Skills that have an <code>ACT</code> cost can be performed using the Unit's <code>ACT</code> Stat or a <a className="underline" href="#tactical-orders">Tactical Order</a>, or a combination of both.</li>
            <li>Skills that have a <code>TO</code> cost cannot be performed using the Unit's <code>ACT</code> Stat; they must be performed by spending <a className="underline" href="#tactical-orders">Tactical Orders</a>.</li>
            <li>Skills and Equipment that do not have an <code>ACT</code> or <code>TO</code> cost are passive skills that do not require spending an Action Point or Tactical Order.</li>
          </ul>
          For example, {sampleUnit.unitName} has {sampleUnit.skills?.length} skills: { sampleUnit.skills?.map((skl, idx) => (idx > 0 ? ', ' : ' ') + skl.gearName) }.
        </div>
      </div>
    </div>
  )}
