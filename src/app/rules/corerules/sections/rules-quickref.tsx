import { SpecialService } from '@/services'
import Markdown from '@/components/ui/Markdown'
import { Fragment } from 'react'

/** Replace `_` param placeholder with a styled <code>x</code> element */
function renderWithX(str: string): React.ReactNode {
  if (!str.includes('_')) return str
  const [before, after] = str.split('_')
  return <>{before}<code>x</code>{after}</>
}

/** Render a special description as markdown, with `_` shown as inline code `x` */
function SpecialEffect({ text }: { text: string }) {
  const processed = text.replaceAll('_', '`x`')
  return <Markdown className="[&_p]:m-0 [&_p]:leading-tight text-xs">{processed}</Markdown>
}

// ─── Primitive helpers ──────────────────────────────────────────────────────

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card border border-main rounded-md p-2 section ${className}`}>
      {children}
    </div>
  )
}

// Using div instead of h2/h3 to avoid .rules heading size/grunge overrides
function SH({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-heading font-bold text-sm tracking-widest uppercase text-main mb-1.5 border-b border-main pb-0.5">
      {children}
    </div>
  )
}

function Divider() {
  return <div className="w-full h-px bg-border my-1.5" />
}

function Hi({ children }: { children: React.ReactNode }) {
  return <span className="text-main font-semibold">{children}</span>
}

function Br({ children }: { children: React.ReactNode }) {
  return <span className="text-foreground font-semibold">{children}</span>
}

function P({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-sm mb-1 ${className}`}>{children}</p>
}

function SubLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-xs text-muted uppercase tracking-wider mb-1 ${className}`}>
      {children}
    </p>
  )
}

// ─── Dice box ───────────────────────────────────────────────────────────────

function DiceBox({ value, label, valueClass }: { value: string; label: string; valueClass: string }) {
  return (
    <div className="border border-border rounded p-1.5 text-center flex-1">
      <span className={`font-heading font-bold text-2xl block leading-none ${valueClass}`}>{value}</span>
      <span className="text-[10px] text-muted uppercase tracking-wider">{label}</span>
    </div>
  )
}

// ─── Step sequence ──────────────────────────────────────────────────────────

type StepItem = { label: string; highlight?: boolean }

function Steps({ items, className = '' }: { items: StepItem[]; className?: string }) {
  return (
    <div className={`flex gap-1 flex-wrap mb-2 ${className}`}>
      {items.map((item, i) => (
        <Fragment key={i}>
          <div
            className={`border rounded px-2 py-0.5 font-heading font-bold text-xs tracking-wider uppercase${item.highlight ? ' text-main border-main' : ' text-muted border-border'}`}
          >
            {item.label}
          </div>
          {i < items.length - 1 && (
            <span className="text-main text-sm self-center leading-none">›</span>
          )}
        </Fragment>
      ))}
    </div>
  )
}

// ─── Table primitives ───────────────────────────────────────────────────────

function TH({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`font-heading font-bold tracking-wider uppercase text-muted text-left px-2 py-0.5 text-xs ${className}`}>
      {children}
    </th>
  )
}

function ActionRow({
  action, act, effect, last = false,
}: { action: string; act: string; effect: string; last?: boolean }) {
  const td = `px-2 py-0.5 text-sm${last ? '' : ' border-b border-border/30'}`
  return (
    <tr>
      <td className={`${td} font-heading font-bold text-foreground whitespace-nowrap`}>{action}</td>
      <td className={`${td} font-stat text-main`}>{act}</td>
      <td className={td}>{effect}</td>
    </tr>
  )
}

function SpecialRow({
  code, name, effect, last = false,
}: { code: React.ReactNode; name: React.ReactNode; effect: React.ReactNode; last?: boolean }) {
  return (
    <>
      <tr>
        <td className="px-2 pt-1 text-xs font-stat text-main whitespace-nowrap w-12">{code}</td>
        <td className="px-2 pt-1 text-xs font-heading font-bold text-foreground">{name}</td>
      </tr>
      <tr>
        <td colSpan={2} className={`px-2 pb-1 text-xs text-muted${last ? '' : ' border-b border-border/30'}`}>
          {effect}
        </td>
      </tr>
    </>
  )
}

function LabelRow({ label, text, last = false }: { label: string; text: string; last?: boolean }) {
  const td = `px-2 py-0.5 text-sm${last ? '' : ' border-b border-border/30'}`
  return (
    <tr>
      <td className={`${td} font-heading font-bold text-foreground whitespace-nowrap`}>{label}</td>
      <td className={td}>{text}</td>
    </tr>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────

export default async function RulesQuickRef() {
  const allSpecials = await SpecialService.getAllSpecials()

  const weaponSpecials = allSpecials
    .filter(s => s.scope === 'W')
    .sort((a, b) => a.code.localeCompare(b.code))
    .map(s => s.toPlain())

  return (
    <div className="section" id="quick-reference">
      <div className="grid grid-cols-3 gap-2">

        {/* ── Left 2/3: 4 paired rows ───────────────────────── */}
        <div className="col-span-2 grid grid-cols-2 gap-2">

          {/* Row 1: Dice & Rolls | Game Cycle */}
          <Card>
            <SH>Dice &amp; Rolls</SH>
            <div className="flex gap-1 mb-2">
              <DiceBox value="1"   label="Critical"   valueClass="text-green-600" />
              <DiceBox value="2-5" label="Normal"      valueClass="text-main" />
              <DiceBox value="6"   label="Always Fail" valueClass="text-red-600" />
            </div>
            <P><Br>Success:</Br> Roll equal to or lower than the target stat.</P>
            <P><Br>Always fails:</Br> A roll of <Hi>6</Hi> is always a failure regardless of modifiers.</P>
            <P><Br>Critical:</Br> A roll of <Hi>1</Hi> is a critical success with bonus effects.</P>
            <P><Br>Re-rolls:</Br> Each die may only be re-rolled once. Result is final.</P>
            <Divider />
            <P><Br>D3:</Br> Roll D6 ÷ 2 rounding up. (1-2 = 1, 3-4 = 2, 5-6 = 3)</P>
          </Card>

          <Card>
            <SH>Game Cycle</SH>
            <SubLabel>Mission Start</SubLabel>
            <Steps items={[
              { label: 'Select Mission' },
              { label: 'Set Up' },
              { label: 'Deploy Units', highlight: true },
            ]} />
            <SubLabel>Each Turn</SubLabel>
            <Steps items={[
              { label: 'Start of Turn' },
              { label: 'Activate Units', highlight: true },
              { label: 'End of Turn' },
            ]} />
            <SubLabel>Activations</SubLabel>
            <P>Squads alternate activating one <Hi>Unit</Hi> until all Units are activated.</P>
            <Divider />
            <SubLabel>Mission End</SubLabel>
            <Steps items={[
              { label: 'Victory' },
              { label: 'Earn MP' },
              { label: 'Apply Injuries', highlight: true },
            ]} />
            <p className="text-xs text-muted mt-1">MP &amp; Injury rules defined in your play mode.</p>
          </Card>

          {/* Row 2: Actions | Tactical Orders */}
          <Card>
            <SH>Actions</SH>
            <p className="text-xs text-muted mb-1">
              Each action costs listed ACT first time; <span className="text-foreground">+1 ACT each repeat</span> in same activation.
            </p>
            <table className="w-full border-collapse">
              <thead>
                <tr><TH>Action</TH><TH>ACT</TH><TH>Effect</TH></tr>
              </thead>
              <tbody>
                <ActionRow action="Move"            act="1" effect='Up to 6"' />
                <ActionRow action="Dash"            act="1" effect='Up to 2", same rules as Move' />
                <ActionRow action="Ranged Combat"   act="1" effect="Attack valid target in LoS & range" />
                <ActionRow action="Melee Combat"    act="1" effect="Attack Adjacent target" />
                <ActionRow action="Pick Up / Drop"  act="1" effect="Adjacent marker/token" />
                <ActionRow action="Give"            act="1" effect="Pass token to Adjacent squadmate" />
                <ActionRow action="Open/Close Door" act="1" effect="Adjacent door" />
                <ActionRow action="Mission Action"  act="-" effect="As defined in Mission Briefing" last />
              </tbody>
            </table>
          </Card>

          <Card>
            <SH>Tactical Orders (TO)</SH>
            <P className="mb-2">Roll TO dice each turn. Each <Hi>1-3</Hi> = 1 TO. Unused TO are lost end of turn.</P>
            <table className="w-full border-collapse">
              <thead>
                <tr><TH>Condition</TH><TH>Dice</TH></tr>
              </thead>
              <tbody>
                <LabelRow label="Leader Standing"    text="5 dice" />
                <LabelRow label="Leader Taken Out"   text="3 dice" />
                <LabelRow label="Per Unit Taken Out" text="+1 TO" last />
              </tbody>
            </table>
            <Divider />
            <p className="text-xs text-muted uppercase tracking-wider mb-1">Spend TO to:</p>
            <P>· Perform a Unit's TO Skill</P>
            <P>· Re-roll any one die</P>
            <P>· Change a die result by <Hi>±1</Hi> (stackable)</P>
            <P>· Perform an extra Basic or Mission Action</P>
          </Card>

          {/* Row 3: Ranged Combat | Melee Combat */}
          <Card>
            <SH>Ranged Combat</SH>
            <Steps items={[
              { label: 'Select Target' },
              { label: 'Roll ATT' },
              { label: 'Roll ARM Saves', highlight: true },
            ]} />
            <P className="mb-1"><Br>Valid target must:</Br></P>
            <P>· Not be Adjacent to Attacker or Squadmates</P>
            <P>· Be within weapon range (RNGx)</P>
            <P>· Be in Line of Sight</P>
            <P className="mt-1">Cannot attack if Adjacent to any enemy.</P>
            <Divider />
            <table className="w-full border-collapse">
              <thead>
                <tr><TH>Modifier</TH><TH>Effect</TH></tr>
              </thead>
              <tbody>
                <LabelRow label="Cover"       text="Target may re-roll 1 Armor Save" />
                <LabelRow label="High Ground" text='Attacker 4"+ higher: target loses Cover' last />
              </tbody>
            </table>
            <Divider />
            <p className="text-xs text-muted">Cover applies only if terrain is within 1&quot; of target.</p>
          </Card>

          <Card>
            <SH>Melee Combat</SH>
            <Steps items={[
              { label: 'Select Target' },
              { label: 'Roll ATT' },
              { label: 'Roll ARM Saves', highlight: true },
            ]} />
            <P><Br>Target must be Adjacent.</Br> Cover does not apply to Melee.</P>
            <Divider />
            <table className="w-full border-collapse">
              <thead>
                <tr><TH>Roll Result</TH><TH>Effect</TH></tr>
              </thead>
              <tbody>
                <LabelRow label="ATT roll 1" text="Critical Strike - 2 Damage" />
                <LabelRow label="ARM roll 1" text="Critical Save - blocks 2 dmg OR blocks 1 dmg + returns 1 dmg to attacker (chainable)" last />
              </tbody>
            </table>
            <Divider />
            <table className="w-full border-collapse">
              <thead>
                <tr><TH>Support</TH><TH>Effect</TH></tr>
              </thead>
              <tbody>
                <LabelRow label="Attacker side" text="Per squadmate Adjacent to target: re-roll 1 ATT die" />
                <LabelRow label="Defender side" text="Per squadmate Adjacent to target: re-roll 1 Save die" last />
              </tbody>
            </table>
          </Card>

          {/* Row 4: Movement & Positioning | Squad Building */}
          <Card>
            <SH>Movement &amp; Positioning</SH>
            <table className="w-full border-collapse">
              <thead>
                <tr><TH>Rule</TH><TH>Detail</TH></tr>
              </thead>
              <tbody>
                <LabelRow label="Move"       text='Up to 6" per action' />
                <LabelRow label="Adjacent"   text='Bases within 1", same elevation, no wall between' />
                <LabelRow label="Control"    text="Adjacent to item, not adjacent to any enemy" />
                <LabelRow label="Climb Up"   text='1" per inch of height + 1" to crest top' />
                <LabelRow label="Climb Down" text='Same but vertical costs 2" less (min 0")' />
                <LabelRow label="Range"      text="Horizontal only - ignore vertical distance" last />
              </tbody>
            </table>
            <Divider />
            <P>
              <Br>Attack of Opportunity:</Br> When a unit moves out of Adjacency to an enemy, that enemy may make a free Melee attack.
            </P>
            <P>Spend 2&quot; of movement to reduce enemy ATT dice by 1. Max 1 AoO per unit per turn.</P>
          </Card>

          <Card>
            <SH>Squad Building</SH>
            <P><Br>Budget:</Br> 100 GP total (units + gear).</P>
            <P><Br>Size:</Br> 4-10 Units.</P>
            <P><Br>Leader:</Br> Exactly one per Squad.</P>
            <P><Br>Unique (*)</Br> Units and gear: max one per squad.</P>
            <Divider />
            <p className="text-xs text-muted uppercase tracking-wider mb-1">Co-op Mini Squads</p>
            <P>2P → 50 GP each &nbsp;·&nbsp; 3P → 34 GP each &nbsp;·&nbsp; 4P → 25 GP each</P>
            <P className="mt-1">Only one Leader across all mini-squads.</P>
          </Card>

        </div>

        {/* ── Right 1/3: Weapon Specials - full-height single table ── */}
        <Card className="self-stretch">
          <SH>Weapon Specials</SH>
          <table className="w-full border-collapse">
            <thead>
              <tr><TH className="w-12">Code</TH><TH>Name</TH></tr>
            </thead>
            <tbody>
              {weaponSpecials.map((s, i) => (
                <SpecialRow
                  key={s.specialId}
                  code={renderWithX(s.code)}
                  name={renderWithX(s.specialName)}
                  effect={<SpecialEffect text={s.description} />}
                  last={i === weaponSpecials.length - 1}
                />
              ))}
            </tbody>
          </table>
        </Card>

      </div>
    </div>
  )
}
