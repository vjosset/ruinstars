import { Fragment } from 'react'

// ─── Primitive helpers (mirrors rules-quickref.tsx style) ────────────────────

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-card border border-main rounded-md p-2 section ${className}`}>
      {children}
    </div>
  )
}

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

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-muted uppercase tracking-wider mb-0.5">{children}</p>
  )
}

type StepItem = { label: string; highlight?: boolean }

function Steps({ items }: { items: StepItem[] }) {
  return (
    <div className="flex gap-1 flex-wrap mb-2">
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

function TH({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`font-heading font-bold tracking-wider uppercase text-muted text-left px-1 py-0.5 text-xs ${className}`}>
      {children}
    </th>
  )
}

function EventRow({
  roll, event, effect, last = false,
}: { roll: string; event: string; effect: string; last?: boolean }) {
  const td = `px-1 py-0.5 text-xs${last ? '' : ' border-b border-border/30'}`
  return (
    <tr>
      <td className={`${td} font-stat text-main w-6 text-center font-bold`}>{roll}</td>
      <td className={`${td} font-heading font-bold whitespace-nowrap`}>{event}</td>
      <td className={`${td} text-muted`}>{effect}</td>
    </tr>
  )
}

// ─── Wave Table data (static) ────────────────────────────────────────────────

type WaveRow = { range: string; spawn: string }
type WaveEntry = { wave: number; mp: number; boss?: boolean; rows: WaveRow[] }

const WAVES: WaveEntry[] = [
  { wave: 1, mp: 4, rows: [
    { range: '1-4', spawn: '3× Carrion Leech' },
    { range: '5',   spawn: '2× Blight Herald' },
    { range: '6',   spawn: '1× Ruin Stalker' },
  ]},
  { wave: 2, mp: 5, rows: [
    { range: '1-4', spawn: '3× Toxin Spitter' },
    { range: '5',   spawn: '2× Blight Herald' },
    { range: '6',   spawn: '1× Ashline Gunner' },
  ]},
  { wave: 3, mp: 6, rows: [
    { range: '1-2', spawn: '3× Carrion Leech' },
    { range: '3-4', spawn: '3× Toxin Spitter' },
    { range: '5',   spawn: '2× Blight Herald' },
    { range: '6',   spawn: '1× Ruin Stalker' },
  ]},
  { wave: 4, mp: 10, boss: true, rows: [
    { range: '1-2', spawn: '3× Carrion Leech' },
    { range: '3-4', spawn: '3× Toxin Spitter' },
    { range: '5',   spawn: '2× Blight Herald' },
    { range: '6',   spawn: '1× Ruin Stalker' },
  ]},
  { wave: 5, mp: 8, rows: [
    { range: '1-4', spawn: '3× Ruin Stalker' },
    { range: '5',   spawn: '2× Dustborn Thrall' },
    { range: '6',   spawn: '1× Razorhowl Reaver' },
  ]},
  { wave: 6, mp: 9, rows: [
    { range: '1-4', spawn: '3× Ashline Gunner' },
    { range: '5',   spawn: '2× Dustborn Thrall' },
    { range: '6',   spawn: '1× Graveward Sentinel' },
  ]},
  { wave: 7, mp: 10, rows: [
    { range: '1-2', spawn: '3× Ruin Stalker' },
    { range: '3-4', spawn: '3× Ashline Gunner' },
    { range: '5',   spawn: '2× Dustborn Thrall' },
    { range: '6',   spawn: '1× Razorhowl Reaver' },
  ]},
  { wave: 8, mp: 14, boss: true, rows: [
    { range: '1-2', spawn: '3× Ruin Stalker' },
    { range: '3-4', spawn: '3× Ashline Gunner' },
    { range: '5',   spawn: '2× Dustborn Thrall' },
    { range: '6',   spawn: '1× Razorhowl Reaver' },
  ]},
  { wave: 9,  mp: 12, rows: [
    { range: '1-4', spawn: '3× Razorhowl Reaver' },
    { range: '5-6', spawn: '3× Last-Light Executioner' },
  ]},
  { wave: 10, mp: 13, rows: [
    { range: '1-4', spawn: '3× Graveward Sentinel' },
    { range: '5-6', spawn: '3× Last-Light Executioner' },
  ]},
  { wave: 11, mp: 14, rows: [
    { range: '1-2', spawn: '3× Razorhowl Reaver' },
    { range: '3-4', spawn: '3× Graveward Sentinel' },
    { range: '5-6', spawn: '3× Last-Light Executioner' },
  ]},
  { wave: 12, mp: 18, boss: true, rows: [
    { range: '1-2', spawn: '3× Razorhowl Reaver' },
    { range: '3-4', spawn: '3× Graveward Sentinel' },
    { range: '5-6', spawn: '3× Last-Light Executioner' },
  ]},
]

function WaveCol({ entry }: { entry: WaveEntry }) {
  return (
    <div>
      <div className="font-heading font-bold text-xs text-foreground">
        Wave {entry.wave} <span className="text-main font-normal">({entry.mp} MP)</span>
      </div>
      {entry.rows.map((r, i) => (
        <div key={i} className="text-xs leading-snug">
          <strong className="text-foreground">{r.range}:</strong>{' '}
          <span className="text-muted">{r.spawn}</span>
        </div>
      ))}
    </div>
  )
}

function ActBlock({ label, waves, bossWave }: {
  label: string
  waves: WaveEntry[]
  bossWave: WaveEntry
}) {
  return (
    <div>
      <SubLabel>{label}</SubLabel>
      <div className="grid grid-cols-3 gap-2 mb-1">
        {waves.map(w => <WaveCol key={w.wave} entry={w} />)}
      </div>
      <div className="text-xs border-t border-border/40 pt-0.5 text-muted">
        <span className="font-heading font-bold text-foreground">Wave {bossWave.wave}</span>
        <span className="text-main font-bold ml-1">★ Boss</span>
        <span className="text-main ml-1">({bossWave.mp} MP)</span>
        {' - '}Same as Wave {bossWave.wave - 1} + Random Boss
      </div>
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function HordeModeQuickRef() {
  return (
    <div className="section" id="horde-quick-reference">
      <div className="grid grid-cols-3 gap-2">

        {/* ── Row 1: Game Cycle (col 1+2) | Turn Sequence (col 3) ─── */}

        <Card className="col-span-2">
          <SH>Game Cycle</SH>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <SubLabel>Setup</SubLabel>
              <Steps items={[
                { label: 'Set Up Battlefield' },
                { label: 'Deploy Squad', highlight: true },
              ]} />
              <SubLabel>Each Wave</SubLabel>
              <Steps items={[
                { label: 'Spawn Units' },
                { label: 'Roll Objective' },
                { label: 'Play Turns', highlight: true },
                { label: 'Spend MP' },
              ]} />
            </div>
            <div>
              <SubLabel>Squad Formats</SubLabel>
              <P className="text-xs"><Br>Full Squad:</Br> 100 GP. Players share control, taking turns activating Units.</P>
              <P className="text-xs"><Br>Mini Squads:</Br> Each player builds a reduced Squad:</P>
              <div className="text-xs text-muted ml-2 mb-1">
                2P → 50 GP each &nbsp;·&nbsp; 3P → 34 GP each &nbsp;·&nbsp; 4P → 25 GP each
              </div>
              <P className="text-xs text-muted">
                Mini-squads each roll <Hi>1D3</Hi> for TO, or designate one Leader across all mini-squads and roll TO normally (all squads share the result).
                Units in different mini-squads are considered Squadmates.
              </P>
            </div>
          </div>
        </Card>

        <Card>
          <SH>Turn Sequence</SH>
          <Steps items={[
            { label: 'Roll TO' },
            { label: 'Turn Event' },
            { label: 'Activations', highlight: true },
            { label: 'End of Turn' },
          ]} />
          <P className="text-xs">
            Player Squad always has initiative.
            Activate 1 Player Unit, then 1 Horde Unit.
            Repeat until all Units have activated.
          </P>
          <P className="text-xs">
            If a <Hi>Horde Boss</Hi> is present, it activates first among Horde Units.
          </P>
          <Divider />
          <P className="text-xs">
            <Br>End of Turn:</Br> If no Standing Horde Units remain, the Wave ends.
          </P>
          <P className="text-xs">
            <Br>Turn 5+:</Br> Do not roll Turn Events - apply <Hi>Enemy Reinforcements</Hi> automatically.
          </P>
        </Card>

        {/* ── Row 2: Wave Table | Wave Objectives | Turn Events ───── */}

        <Card>
          <SH>Wave Table (3D6)</SH>
          <p className="text-xs text-muted mb-1">
            Roll 3D6 at Wave start. Each die resolved independently.
          </p>

          <ActBlock label="Act 1 - Waves 1-4" waves={WAVES.slice(0, 3)} bossWave={WAVES[3]} />
          <Divider />
          <ActBlock label="Act 2 - Waves 5-8" waves={WAVES.slice(4, 7)} bossWave={WAVES[7]} />
          <Divider />
          <ActBlock label="Act 3 - Waves 9-12" waves={WAVES.slice(8, 11)} bossWave={WAVES[11]} />
        </Card>

        <Card>
          <SH>Wave Objectives (D6)</SH>
          <p className="text-xs text-muted mb-1">
            Roll at Wave start. Optional - failure does not end the Wave. On Victory, pick one reward.
          </p>
          <div className="text-xs space-y-1">
            <div>
              <span className="font-heading font-bold">1: Battlefield Control</span>
              <div className="ml-2 text-muted leading-snug">
                Victory: at Wave end, at least one Standing Unit is on each Quarter (NW, NE, SW, SE).<br/>
                Reward: +4 MP · or roll 2D6 (not 3D6) for Horde Spawns next Wave.
              </div>
            </div>
            <div>
              <span className="font-heading font-bold">2: Destroy Nexus</span>
              <div className="ml-2 text-muted leading-snug">
                Setup: 1 Nexus markers (ARM3 HIT2) on each Spawn Point.<br/>
                Victory: all Nexus Markers Taken Out.<br/>
                Reward: +4 MP · or all Horde Units take 2 damage.
              </div>
            </div>
            <div>
              <span className="font-heading font-bold">3: Overwhelming Force</span>
              <div className="ml-2 text-muted leading-snug">
                Victory: end the Wave within 2 Turns.<br/>
                Reward: +4 MP · or 1 Standing Unit regains 1 HIT.
              </div>
            </div>
            <div>
              <span className="font-heading font-bold">4: Protect The Asset</span>
              <div className="ml-2 text-muted leading-snug">
                Setup: Asset (ARM3 HIT3) on Spawn point. Horde always prioritizes the Asset.<br/>
                Victory: Asset has ≥1 HIT at Wave end.<br/>
                Reward: +4 MP · or +4 TO at start of next Wave.
              </div>
            </div>
            <div>
              <span className="font-heading font-bold">5: Disruption Field</span>
              <div className="ml-2 text-muted leading-snug">
                Setup: 1 Disruptor Pylon on each Spawn Point.<br/>
                Action - Calibrate Pylon (2 ACT): Unit Controlling a Pylon removes it.<br/>
                Victory: all Pylons calibrated.<br/>
                Reward: +4 MP · or Horde -1 ATT (min 1) until Wave end.
              </div>
            </div>
            <div>
              <span className="font-heading font-bold">6: The Artifact</span>
              <div className="ml-2 text-muted leading-snug">
                Setup: 1 Search Marker on each Spawn Point.<br/>
                Action - Search (2 ACT): Unit Controlling a marker rolls 1D6; on 1-2 the Artifact is found (no TO re-rolls).<br/>
                Victory: Artifact found.<br/>
                Reward: +4 MP · or 1 Unit gains 1 Spoil of War.
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <SH>Turn Events (2D6)</SH>
          <p className="text-xs text-muted mb-1">
            Roll at the start of each Turn. Turn 5+: always <strong>Enemy Reinforcements</strong>.
          </p>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <TH className="w-6 text-center">Roll</TH>
                <TH>Event</TH>
                <TH>Effect</TH>
              </tr>
            </thead>
            <tbody>
              <EventRow roll="2"  event="Second Wind"         effect="Select a Downed Unit. It revives with half HIT (round up) + 1 random Injury." />
              <EventRow roll="3"  event="Field Dressing"      effect="One Standing Unit regains 1 lost HIT." />
              <EventRow roll="4"  event="Opportunity"         effect="One Unit spends up to 2 ACT before the Turn starts. Not its activation." />
              <EventRow roll="5"  event="Supply Drop"         effect='Place 3 crates randomly. If a crate lands on a Unit → Booby Trap; skip that placement.' />
              <EventRow roll="6"  event="Strategic Command"   effect="Squad gains +2 TO." />
              <EventRow roll="7"  event="Relentless Advance"  effect="No special event this Turn." />
              <EventRow roll="8"  event="Scrambled Comms"     effect="Squad loses -2 TO (minimum 0)." />
              <EventRow roll="9"  event="Encroaching Threat"  effect='Each Horde Move Action moves an additional 2" this Turn.' />
              <EventRow roll="10" event="Enemy Reinforcements" effect="Roll 1D6 → spawn 1 Horde Unit per the Wave table for this Wave (ignore quantity)." />
              <EventRow roll="11" event="Coordinated Assault" effect="Horde Units gain +1 ATT on all weapons this Turn." />
              <EventRow roll="12" event="Overrun"             effect="All Horde Units immediately perform 1 free Action per their Behavior." last />
            </tbody>
          </table>
        </Card>

        {/* ── Row 3: Upgrades | Crates | Downed & Revive ──────────── */}

        <Card>
          <SH>Upgrades (Between Waves)</SH>
          <p className="text-xs text-muted mb-0.5">Spend earned MP after each Wave ends.</p>
          <div className="text-xs space-y-0.5">
            <div><Hi>2 MP</Hi> <Br>Ammunition:</Br> One <code>LIM</code> weapon or once-per-mission skill gets +1 use.</div>
            <div><Hi>4 MP</Hi> <Br>Heal:</Br> One Unit regains 1 HIT.</div>
            <div><Hi>4 MP</Hi> <Br>Grenade:</Br> One use (1 ACT): throw 6", deals 2 Ranged Damage to all Adjacent.</div>
            <div><Hi>4 MP</Hi> <Br>Medpack:</Br> One use (1 ACT): Unit or Squadmate regains <code>1D3</code> HIT.</div>
            <div><Hi>6 MP</Hi> <Br>Turret:</Br> Place once (1 ACT). <code>ATT4 SKL5</code>, LoS drawn from Turret, 5 uses total.</div>
            <div><Hi>8 MP</Hi> <Br>Spoil of War:</Br> One Standing Unit gains 1 Spoil of War.</div>
            <div><Hi>8 MP</Hi> <Br>Reinforcements:</Br> One Downed Unit returns to Standing with 1 HIT + 1 random Injury.</div>
          </div>
        </Card>

        <Card>
          <SH>Crates</SH>
          <p className="text-xs text-muted mb-1">
            <code>ARM3 HIT1</code>. Reach 0 HIT → explodes (2 damage to all Adjacent Units), then removed.
            Placed by <strong>Supply Drop</strong> Turn Events.
          </p>
          <p className="text-xs text-muted mb-1">
            <Br>Open Crate (1 ACT):</Br> A Unit Controlling a Crate opens it. Roll D6, then remove the Crate.
          </p>
          <div className="text-xs space-y-0.5">
            <div><Hi>1</Hi> <Br>Stockpile:</Br> Squad gains +3 MP.</div>
            <div><Hi>2</Hi> <Br>Command Uplink:</Br> Squad gains +2 TO.</div>
            <div><Hi>3</Hi> <Br>Map:</Br> 1 Standing Unit performs a free Move action.</div>
            <div><Hi>4</Hi> <Br>Relay Order:</Br> 1 Standing Unit performs a free 1-ACT Basic or Mission action.</div>
            <div><Hi>5</Hi> <Br>Upgrade:</Br> Apply one free Upgrade of choice.</div>
            <div><Hi>6</Hi> <Br>Booby Trap:</Br> Explodes immediately - 2 damage to all Adjacent Units.</div>
          </div>
        </Card>

        <Card>
          <SH>Downed &amp; Revive</SH>
          <P className="text-xs">
            When a Player Unit reaches 0 HIT, it is <Hi>Downed</Hi> - lay it on its side, do not remove it.
            Downed Units are ignored by Horde Units, cannot be targeted in combat, and take no damage.
          </P>
          <P className="text-xs">
            During their activation, Downed Units may only <Br>Move</Br>, <Br>Dash</Br>, or <Br>Revive</Br>.
            Move and Dash do not trigger Attacks of Opportunity.
          </P>
          <Divider />
          <P className="text-xs">
            <Hi>Revive (2 ACT):</Hi> A Standing Unit that Controls a Downed Squadmate may revive it.
            A Downed Unit may also revive itself if it Controls a Standing Squadmate.
            The revived Unit returns as Standing with <Hi>1 HIT</Hi> remaining.
          </P>
          <P className="text-xs">
            Each time a Unit is Revived, it gains 1 random Injury.
            If the Injury is one the Unit already has, the Unit is <Hi>Deceased</Hi> and permanently removed from the battlefield.
          </P>
          <Divider />
          <P className="text-xs">
            If <Hi>all</Hi> Player Units are Downed or Deceased, the mission ends in failure.
          </P>
        </Card>

      </div>
    </div>
  )
}
