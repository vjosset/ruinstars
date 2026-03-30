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
                { label: 'Roll Battlefield' },
                { label: 'Roll Deployment' },
                { label: 'Roll NPC Units', highlight: true },
                { label: 'Deploy NPC' },
                { label: 'Deploy Squad', highlight: true },
              ]} />
              <SubLabel>Each Turn</SubLabel>
              <Steps items={[
                { label: 'Roll TOs' },
                { label: 'Battlefield' },
                { label: 'Activate Units', highlight: true },
                { label: 'Extract?' },
              ]} />
            </div>
            <div>
              <SubLabel>NPC Squads</SubLabel>
              <P className="text-xs">
                Select an enemy faction and a <Hi>Threat Level (1-3)</Hi>.
                Roll <Hi>3D6</Hi> - each die resolved independently. Look up each result in the column for the current TL to identify spawned Units.
              </P>
              <P className="text-xs text-muted">
                In Campaign play, TL matches the Operation number: TL1 for Op 1, TL2 for Op 2, TL3 for Op 3.
                We recommend using the same faction for all Missions in an Operation.
              </P>
              <Divider />
              <SubLabel>Extraction &amp; Mission Points</SubLabel>
              <P className="text-xs">
                At start of Turn 4, roll a random Anchor as the <Hi>Extraction Point</Hi>.
                At end of Turn 4+, Standing Units within 3" of it and not Adjacent to enemies may <Hi>Extract</Hi>. Units that fail both conditions count as Taken Out.
              </P>
            </div>
          </div>
        </Card>

        <Card>
          <SH>Turn Sequence</SH>
          <Steps items={[
            { label: 'Roll TOs' },
            { label: 'Battlefield' },
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
            <Br>Turn 5+:</Br> At the start of the Turn, before Battlefield effects, roll <code>1D6</code> and spawn Units on random anchors
          </P>
        </Card>

        {/* ── Row 2: Objectives (full width, 3 cols) ────────────────────────── */}

        <Card className="col-span-3">
          <SH>Objectives</SH>
          <p className="text-xs text-muted mb-1">
            For each objective: roll 1D6 for <Hi>Archetype</Hi>, then 1D6 for <Hi>Variation</Hi>. Both objectives must have different Archetypes — re-roll if they match.
          </p>
          <p className="text-xs mb-1.5">
            <Br>Archetype (D6):</Br> <span className="text-muted">1-2 Control · 3-4 Activate · 5-6 Destroy</span>
          </p>
          <Divider />
          <div className="grid grid-cols-3 gap-4 mt-1.5">
            <div>
              <SH>Control — Variations (D6)</SH>
              <P className="text-xs text-muted">Setup: 3 Objectives on random Anchors.</P>
              <table className="w-full border-collapse">
                <tbody>
                  <TableRow roll="1-2" label="All Three, Any Turn"  effect="Control all three Objectives at the end of any one Turn." />
                  <TableRow roll="3-4" label="Two Objectives, Two Turns"        effect="Control two or more Objectives at the end of two consecutive Turns." />
                  <TableRow roll="5-6" label="One Objective, Three Turns"      effect="Control one or more Objective at the end of three consecutive Turns. Remove controlled Objectives at end of each Turn." last />
                </tbody>
              </table>
            </div>
            <div>
              <SH>Activate — Variations (D6)</SH>
              <P className="text-xs text-muted">Activate (2ACT): Unit Controls an Objective to activate it. Remove from battlefield.</P>
              <table className="w-full border-collapse">
                <tbody>
                  <TableRow roll="1-2" label="Any Order"  effect="Place all 3 at mission start. Activate all three in any order." />
                  <TableRow roll="3-4" label="In Order"   effect="Place only the first Objective at mission start. Each activation places the next." />
                  <TableRow roll="5-6" label="Search"     effect="Place 3 Search Objectives. On Activation roll 1D6: 1st = found on 1; 2nd = found on 1-2; 3rd = auto. No TO re-rolls. Finder carries item; can drop/pass for 1ACT. Carrier must extract to complete." last />
                </tbody>
              </table>
            </div>
            <div>
              <SH>Destroy — Variations (D6)</SH>
              <P className="text-xs text-muted">Objectives on random Anchors. Can be targeted in combat.</P>
              <table className="w-full border-collapse">
                <tbody>
                  <TableRow roll="1-2" label="All Three"    effect="Place 3 Objectives. ARM 4 HIT 3. Destroy all three." />
                  <TableRow roll="3-4" label="One"          effect="Place 1 Objective. ARM 4 HIT 6. Destroy it." />
                  <TableRow roll="5-6" label="Two of Three" effect="Place 3 Objectives. ARM 4 HIT 3. At end of each Turn, remaining Objectives regain 1 lost HIT. Destroy two of three. On each destroy, spawn one random NPC Unit (ignore quantities)." last />
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card>
          <SH>Deployments (D6)</SH>
          <p className="text-xs text-muted mb-1">
            Roll at Mission start to determine where both squads deploy.
          </p>
          <div>
            <table className="w-full border-collapse">
              <tbody>
                <TableRow roll="1" label="Standard Insertion" effect='Player: within 4" of SW, S, or SE Anchors. NPC: within 4" of NW, N, or NE Anchors (split evenly), in Cover/out of sight.' />
                <TableRow roll="2" label="Hot Drop"           effect='Player: Adjacent to N, S, E, or W Anchors. NPC: Adjacent to NW, NE, SW, or SE Anchors (split evenly), in Cover/out of sight.' />
                <TableRow roll="3" label="Flanked"            effect='Player: within 4" of S Anchor. NPC: Adjacent to NW or NE Anchors (split evenly), in Cover/out of sight.' />
                <TableRow roll="4" label="Deep Strike"        effect='Player: within 4" of SE Anchor. NPC: within 4" of NW Anchor, in Cover/out of sight.' />
                <TableRow roll="5" label="Overwatch"          effect='Player: Adjacent to SW, S, or SE Anchors. NPC: Adjacent to W, N, or E Anchors (split evenly), in Cover/out of sight.' />
                <TableRow roll="6" label="Encircled"          effect='Player: within 4" of Center Anchor. NPC: Adjacent to NW, NE, SW, or SE Anchors (split evenly), in Cover/out of sight.' last />
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <SH>Battlefields (D6)</SH>
          <p className="text-xs text-muted mb-1">
            Roll at Mission start. Skip for your first mission.
          </p>
          <table className="w-full border-collapse">
            <tbody>
              <TableRow roll="1" label="The Ruined City - Collapse"           effect='Start of each Turn after the first: roll a random Anchor. All terrain within 4" of it is removed; all Units within 4" take 2 Damage.' />
              <TableRow roll="2" label="The Facility - Darkness"              effect='Start of each Turn after the first: select a random Anchor. Until end of Turn, Units within 4" cannot be targeted in Ranged Combat.' />
              <TableRow roll="3" label="The Jungle - Miasmic Mist"            effect='Start of each Turn after the first: select a random Standing Unit from each Squad. That Unit moves 2" three times in random directions (no AoO). If blocked by a wall or obstacle, it takes 1 Melee Damage.' />
              <TableRow roll="4" label="The Alien Hive - Noxious Gas"         effect='Start of each Turn after the first: select a random Anchor. All Units within 4" take 1 Damage.' />
              <TableRow roll="5" label="The Cursed Temple - Haunting Spirits" effect="Start of each Turn after the first: select a random Unit from each Squad. That Unit immediately attacks the closest Unit in Combat, Squadmate or enemy." />
              <TableRow roll="6" label="The Rift - Shifting Realities"        effect='Start of each Turn after the first: select one random Anchor, then roll 1D6. 1-3: All units within 4" move 2" directly toward it (no AoO). 4-6: All units within 4" move 2" directly away from it (no AoO).' last />
            </tbody>
          </table>
        </Card>

        {/* ── Row 3: Mission Scoring & End | NPC Squads & Reinforcements ── */}

        <Card>
          <SH>Mission Scoring &amp; End</SH>
          <SubLabel>Extraction</SubLabel>
          <P className="text-xs">
            At the start of Turn 4, roll a random Anchor as the <Hi>Extraction Point</Hi>. If it is occupied by an Objective marker, re-roll until an unoccupied Anchor is selected.
          </P>
          <P className="text-xs">
            At the end of Turn 4 or later, each <Hi>Standing Unit</Hi> within 3" of the Extraction Point and <Hi>not Adjacent to an enemy</Hi> extracts successfully.
          </P>
          <P className="text-xs text-muted">
            Units that fail both conditions are left behind - treat as Taken Out for injury purposes.
          </P>
          <Divider />
          <SubLabel>Mission End</SubLabel>
          <P className="text-xs">
            The mission ends when the Player Squad extracts or all Player Units are Taken Out.
          </P>
          <P className="text-xs text-muted">
            If no Player Units extract, no Objectives are considered completed regardless of their state.
          </P>
          <Divider />
          <SubLabel>Mission Points</SubLabel>
          <div className="text-xs space-y-0.5">
            <div><Br>+1 MP</Br> <span className="text-muted">per TL</span></div>
            <div><Br>+1 MP</Br> <span className="text-muted">per TL if all NPC Units Taken Out</span></div>
            <div><Br>+1 MP</Br> <span className="text-muted">per TL for each completed Objective if Squad extracts</span></div>
          </div>
        </Card>

      </div>
    </div>
  )
}
