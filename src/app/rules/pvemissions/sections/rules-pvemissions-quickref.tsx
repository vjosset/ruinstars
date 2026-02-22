import { Fragment } from 'react'

// ─── Primitive helpers (mirrors rules-horde-quickref.tsx style) ──────────────

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

function TableRow({
  roll, label, effect, last = false,
}: { roll: string; label: string; effect: string; last?: boolean }) {
  return (
    <>
      <tr>
        <td className="px-1 pt-1 font-stat text-main w-6 text-center font-bold text-xs align-top" rowSpan={2}>{roll}</td>
        <td className="px-1 pt-1 font-heading font-bold text-xs">{label}</td>
      </tr>
      <tr className={last ? '' : 'border-b border-border/30'}>
        <td className="px-1 pb-1 text-xs text-muted">{effect}</td>
      </tr>
    </>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function PvEMissionsQuickRef() {
  return (
    <div className="section" id="pve-quick-reference">
      <div className="grid grid-cols-3 gap-2">

        {/* ── Row 1: Game Cycle (col 1+2) | Turn Sequence (col 3) ─────────── */}

        <Card className="col-span-2">
          <SH>Game Cycle</SH>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <SubLabel>Mission Setup</SubLabel>
              <Steps items={[
                { label: 'Roll 2 Objectives' },
                { label: 'Roll Modifier' },
                { label: 'Roll Deployment' },
                { label: 'Roll NPC Units', highlight: true },
                { label: 'Deploy NPC' },
                { label: 'Deploy Squad', highlight: true },
              ]} />
              <SubLabel>Each Turn</SubLabel>
              <Steps items={[
                { label: 'Roll TOs' },
                { label: 'Turn Event' },
                { label: 'Activate Units', highlight: true },
                { label: 'Extract?' },
              ]} />
            </div>
            <div>
              <SubLabel>NPC Squads</SubLabel>
              <P className="text-xs">
                Select an enemy faction and a <Hi>Threat Level (1–3)</Hi>.
                Roll <Hi>3D6</Hi> — each die resolved independently. Look up each result in the column for the current TL to identify spawned Units.
              </P>
              <P className="text-xs text-muted">
                In Campaign play, TL matches the Operation number: TL1 for Op 1, TL2 for Op 2, TL3 for Op 3.
                We recommend using the same faction for all Missions in an Operation.
              </P>
              <Divider />
              <SubLabel>Extraction &amp; Mission Points</SubLabel>
              <P className="text-xs">
                At end of any Turn, the Squad may <Hi>Extract</Hi>: all Standing Units must not be Adjacent to any enemy Units.
                Once extracted, the Mission ends immediately.
              </P>
              <div className="text-xs text-muted ml-2">
                <Br>+1 MP</Br> per Threat Level &nbsp;·&nbsp; <Br>+3 MP</Br> per completed Objective
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <SH>Turn Sequence</SH>
          <Steps items={[
            { label: 'Roll TOs' },
            { label: 'Turn Event' },
            { label: 'Activations', highlight: true },
            { label: 'Extract?' },
          ]} />
          <P className="text-xs">
            After each Player Unit activation, the same player activates a Ready NPC Unit per its <Hi>Behavior</Hi>.
            Repeat until all Units have activated.
          </P>
          <P className="text-xs">
            Resolve any <Br>Start of Turn</Br> skills and events before activations begin.
          </P>
          <Divider />
          <P className="text-xs">
            <Br>Turn 5+:</Br> Do not roll Turn Events — apply <Hi>Enemy Reinforcements</Hi> automatically.
          </P>
          <Divider />
          <SubLabel>First Mission</SubLabel>
          <P className="text-xs text-muted">
            Skip Mission Modifier and Deployment rolls. Play with Standard Conditions and Standard Insertion to learn the core mechanics.
          </P>
        </Card>

        {/* ── Row 2: Turn Events | Objectives | Modifiers ──────────────────── */}

        <Card>
          <SH>Turn Events (D6)</SH>
          <p className="text-xs text-muted mb-1">
            Roll at the start of each Turn. Turn 5+: always <strong>Enemy Reinforcements</strong>.
          </p>
          <table className="w-full border-collapse">
            <tbody>
              <TableRow roll="1" label="Opportunity"           effect="1 Unit spends up to 2 ACT on actions before Turn starts. Not its activation." />
              <TableRow roll="2" label="Field Dressing"        effect="1 Standing Player Unit regains 1 HIT." />
              <TableRow roll="3" label="Strategic Command"     effect="Player Squad gains +2 TO." />
              <TableRow roll="4" label="Scrambled Comms"       effect="Player Squad loses -2 TO (minimum 0)." />
              <TableRow roll="5" label="Overrun"               effect="All NPC Units immediately perform 1 Action per their Behavior." />
              <TableRow roll="6" label="Enemy Reinforcements"  effect="Roll 1D6 → spawn 1 NPC Unit per the TL spawn table, Adjacent to a random Anchor." last />
            </tbody>
          </table>
        </Card>

        <Card>
          <SH>Objectives (2D6)</SH>
          <p className="text-xs text-muted mb-1">
            Roll 2D6 at Mission start; re-roll doubles. Complete both for full MP.
          </p>
          <table className="w-full border-collapse">
            <tbody>
              <TableRow roll="1" label="Battlefield Control" effect="Place 3 COntrol points on random Anchors. All Controlled end of Turn 4." />
              <TableRow roll="2" label="Destroy Nexus"       effect="Place 3 Nexus (ARM3 HIT2) on random Anchors. All Taken Out." />
              <TableRow roll="3" label="No Survivors"        effect="All enemy Units Taken Out." />
              <TableRow roll="4" label="Protect The Asset"   effect="Asset (ARM3 HIT3) at Center. NPC priority target. Asset at ≥1 HIT at end of Turn 4." />
              <TableRow roll="5" label="Disruption Field"    effect="3 Pylons on random Anchors. Calibrate Pylon (2ACT): remove Pylon. All 3 calibrated." />
              <TableRow roll="6" label="The Artifact"        effect="3 Search Markers on random Anchors. Search (2ACT): roll 1D6, 1–2 = Artifact found. No TO re-rolls." last />
            </tbody>
          </table>
        </Card>

        <Card>
          <SH>Mission Modifiers (D6)</SH>
          <p className="text-xs text-muted mb-1">
            Optional. Roll at Mission start. Add current TL to roll (max 6) for increased difficulty.
          </p>
          <table className="w-full border-collapse">
            <tbody>
              <TableRow roll="1" label="Standard Conditions" effect="No special conditions." />
              <TableRow roll="2" label="Fortified Position"  effect="All NPC Units start in Cover; remain in Cover until they move for the first time." />
              <TableRow roll="3" label="Fog of War"          effect='Max Ranged range 8". Weapons with infinite range treated as RNG8".' />
              <TableRow roll="4" label="Blackout"            effect="Cannot spend TO to modify dice ±1. All other TO uses (actions, skills, re-rolls) unaffected." />
              <TableRow roll="5" label="Hostile Environment" effect='End of each Turn: each Player Unit within 6" of Center takes 2 damage.' />
              <TableRow roll="6" label="Desperate Hour"      effect="Must Extract by end of Turn 3. If no Units have Extracted by then, mission is a failure." last />
            </tbody>
          </table>
        </Card>

        {/* ── Row 3: Deployments (col 1+2) | Campaign Structure (col 3) ────── */}

        <Card className="col-span-2">
          <SH>Deployments (D6)</SH>
          <p className="text-xs text-muted mb-1">
            Roll at Mission start to determine where both squads deploy.
          </p>
          <div className="grid grid-cols-2 gap-x-4">
            <table className="w-full border-collapse">
              <tbody>
                <TableRow roll="1" label="Standard Insertion" effect="Player: South edge. NPC: North edge." />
                <TableRow roll="2" label="Hot Drop"           effect='Player: within 4" of Center. NPC: North edge.' />
                <TableRow roll="3" label="Flanked"            effect="Player: South edge. NPC splits evenly across East + West edges." last />
              </tbody>
            </table>
            <table className="w-full border-collapse">
              <tbody>
                <TableRow roll="4" label="Deep Strike" effect='Both squads deploy within 8" of Center. Roll off to determine deployment order.' />
                <TableRow roll="5" label="Overwatch"   effect="Player: South edge. NPC: anywhere on North half of battlefield, in Cover if possible." />
                <TableRow roll="6" label="Encircled"   effect='Player: within 4" of Center. NPC splits evenly across all 4 edges.' last />
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <SH>Campaign Structure</SH>
          <P className="text-xs">3 Operations × 3 Missions. Return to Homebase after each Operation.</P>
          <div className="text-xs space-y-0.5 mb-1.5">
            <div><Br>Op 1</Br> <span className="text-muted">— TL1 · Missions 1.1 → 1.2 → 1.3 → Homebase</span></div>
            <div><Br>Op 2</Br> <span className="text-muted">— TL2 · Missions 2.1 → 2.2 → 2.3 → Homebase</span></div>
            <div><Br>Op 3</Br> <span className="text-muted">— TL3 · Missions 3.1 → 3.2 → 3.3 → Homebase</span></div>
          </div>
          <Divider />
          <SubLabel>Homebase (End of Each Operation)</SubLabel>
          <div className="text-xs space-y-0.5 mb-1.5">
            <div>1. Remove all Deceased Units</div>
            <div>2. Remove one Injury from remaining Units</div>
            <div>3. Recruit new Units (max 100 GP total)</div>
            <div>4. Update Gear &amp; Spoils of War selections</div>
          </div>
          <Divider />
          <SubLabel>Injuries (Post-Mission, Per Taken Out Unit)</SubLabel>
          <P className="text-xs">
            Roll <Hi>1D6</Hi> per Taken Out Unit. If the rolled Injury is one the Unit already has → <Hi>Deceased</Hi>. Remove from Squad; cannot be replaced until Homebase.
          </P>
          <SubLabel>Spoils of War</SubLabel>
          <P className="text-xs">
            Purchased at Homebase. <Hi>6 MP</Hi> each, applies to one specific Unit.
          </P>
        </Card>

      </div>
    </div>
  )
}
