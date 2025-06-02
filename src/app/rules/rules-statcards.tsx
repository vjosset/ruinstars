import UnitCard from "@/components/unit/UnitCard";
import { SpecialService, UnitService } from "@/services";

export default async function RulesStatCards() {
  const sampleUnit = (await UnitService.getUnit("ST-0"))!.toPlain()
  const allSpecials = (await SpecialService.getAllSpecials()).map((spec) => spec.toPlain())
  return (
    <div className="section">
      <h2 className="text-center py-3 font-title"   id="stat-cards">
        4. Stat Cards
      </h2>
      <div className="section twocols">
        <div className="section">
          <p>
            StatCards describe your Units and their Weapons with numerical values, and any special Skills they may have. In general, the higher the stat number, the better the Unit or Weapon.<br/>
            Note that in the app and on the website, you can click or tap Specials to view what they mean, and Skills or Equipment to get their full description.
          </p>
          <div className="p-1">
            <UnitCard unit={sampleUnit} seq={1} isOwner={false} allSpecials={allSpecials} />
          </div>
        </div>
        <br/><br/>

        <div className="section">
          <h5 id="unit-stats">Unit Stats</h5>
          <ul>
            <li>
              {/*<img className="statsymbol inline highlightblack" style={{height: '1rem'}} src="/icons/white/ACT.png" />*/}
              <h6 className="inline">ACT</h6> - Action Points<br/>
              The maximum number of Action Points this Unit can spend on <a href="#actions">Actions</a> during its activation.
            </li>
            <li>
              {/*<img className="statsymbol inline highlightblack" style={{height: '1rem'}} src="/icons/white/ARM.png" />*/}
              <h6 className="inline">ARM</h6> - Armor<br/>
              Indicates how well this Unit resists damage during <a href="#combat">combat</a>.<br/>
              When rolling Armor Saves, results of this stat or lower are successful.
            </li>
            <li>
              {/*<img className="statsymbol inline highlightblack" style={{height: '1rem'}} src="/icons/white/HIT.png" />*/}
              <h6 className="inline">HIT</h6> - Hit Points<br/>
              The Unit&#39;s number of Hit Points. When a Unit reaches zero <code>HIT</code>, it is Taken Out and removed from the battlefield (see <a href="#combat">Combat</a>).<br/>
              If a Unit has at least 1 <code>HIT</code> remaining, it is considered to be Standing.
            </li>
            <li>
              <h6 className="inline">GP</h6> - Gear Points<br/>
              The total cost in Gear Points (GP) for this Unit.
            </li>
            {/*Not implemented
            <li>
              <h6 className="inline">XP</h6> - Experience Points<br/>
              The <a href="#progression">Experience</a> this unit has gained in battle. XP can be used to add certain special gear (skills or weapons) to a Unit.
            </li>*/}
            {/* Moved to skills instead
            <li>
              <h6 className="inline">(Special)</h6> - Specials<br/>
              The <a href="#unit-specials">Specials</a> that apply to this Unit.
            </li>*/}
          </ul>
          Note that each special (e.g. <code>2RC</code>) and skill (e.g. "Duty Before Death") can be clicked or tapped to view their detailed description.
          <br/>
          <strong>For example: </strong>
          <ul>
            <li>{sampleUnit.unitName} is a {sampleUnit.unitTypeName}</li>
            <li>He can perform {sampleUnit.ACT} Actions (<code>ACT</code>) during each of his activations.</li>
            <li>Each time he is the target of Combat and rolls Armor Saves, each result of {sampleUnit.ARM} or less (<code>ARM</code>) is a successful Save.</li>
            <li>He starts with {sampleUnit.HIT} Hit Points (<code>HIT</code>).</li>
            <li>He has the skill {sampleUnit.skills?.[0]?.gearName}.</li>
          </ul>
        </div>
        
        <div className="section">
          <br/><br/>
          <h5 id="weapon-stats">Weapon Stats</h5>
          <ul>
            <li>
              <img className="inline highlightblack" src="/icons/white/weptypeR.png" width="13" />/<img className="inline highlightblack" src="/icons/white/weptypeM.png" width="13" /> - Weapon Type<br/>
              <img className="inline highlightblack" src="/icons/white/weptypeR.png" width="13" /> indicates a Ranged weapon, <img className="inline highlightblack" src="/icons/white/weptypeM.png" width="13" /> indicates a Melee weapon.
            </li>
            <li>
              <h6 className="inline">ATT</h6> - Attacks<br/>
              How many Dice are rolled each time this Weapon is used.
            </li>
            <li>
              <h6 className="inline">SKL</h6> - Skill<br/>
              Indicates the skill of this Unit when using this Weapon. Rolls that are equal to or less than this value are successful strikes.
            </li>
            <li>
              <h6 className="inline">(Special)</h6> - Weapon Specials<br/>
              <a href="#weapon-specials">Specials</a> for this weapon are listed next to its name.
            </li>
          </ul>
          <br/>
          <strong>For example: </strong>
          <ul>
            <li>{sampleUnit.unitName}'s <strong>{sampleUnit.weapons?.[1].gearName}</strong> is a {sampleUnit.weapons?.[1].TYP == "R" ? "Ranged" : "Melee"} weapon (<img className="inline highlightblack" src={`/icons/white/weptype${sampleUnit.weapons?.[1].TYP}.png`} width="13" />).</li>
            <li>Each time it is used, {sampleUnit.unitName} rolls {sampleUnit.weapons?.[1].ATT} dice (<code>ATT</code>).</li>
            <li>Each result of {sampleUnit.weapons?.[1].TYP == "R" ? sampleUnit.RSK : sampleUnit.MSK} or less (<code>SKL</code>) is a success.</li>
            {/*<li>It has the <code>ACC1</code> (Accurate 1) and <code>HVY</code> (Heavy) <a href="#weapon-specials">specials</a>.</li>*/}
          </ul>
        </div>

        <div className="section">
          <br/><br/>
          <h5 id="skills">Skills</h5>
          <p>Some Units will have Skills listed on their StatCard. These are unique properties of that Unit that may allow them to perform a specific unique Action, or gain a bonus (or debuff) for certain game mechanics.</p>
          <ul>
            <li>Skills that have a <code>ACT</code> cost can be performed using the Unit&#39;s <code>ACT</code> Stat or a <a href="#tactical-orders">Tactical Order</a>, or a combination of both.</li>
            <li>Skills that have a <code>TO</code> cost cannot be performed using the Unit&#39;s <code>ACT</code> Stat; they must be performed by spending <a href="#tactical-orders">Tactical Orders</a>.</li>
            <li>Skills and Equipment that do not have an <code>ACT</code> or <code>TO</code> cost are passive skills that do not require spending an Action Point or Tactical Order.</li>
          </ul>
        </div>
      </div>
    </div>
)}
