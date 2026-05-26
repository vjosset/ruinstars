import { Fragment } from 'react'

// ─── Primitive helpers ────────────────────────────────────────────────────────

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
  return <p className={`text-xs mb-1 ${className}`}>{children}</p>
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
}: { roll?: string; label: string; effect: string; last?: boolean }) {
  return (
    <>
      <tr>
        {roll !== undefined && (
          <td className="px-1 pt-1 font-stat text-main w-6 text-center font-bold text-xs align-top" rowSpan={2}>{roll}</td>
        )}
        <td className="px-1 pt-1 font-heading font-bold text-xs">{label}</td>
      </tr>
      <tr className={last ? '' : 'border-b border-border/30'}>
        <td className="px-1 pb-1 text-xs text-muted">{effect}</td>
      </tr>
    </>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function MissionsQuickRef() {
  return (
    <div className="section" id="missions-quick-reference">
      <div className="grid grid-cols-3 gap-2">

        {/* ── Row 1: Mission Setup (col 1+2) | Mission Scoring (col 3) ────── */}

        <Card className="col-span-2">
          <SH>Mission Setup</SH>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <SubLabel>Setup Steps</SubLabel>
              <Steps items={[
                { label: 'Select Squads' },
                { label: 'Roll Battlefield' },
                { label: 'Roll Deployment' },
                { label: 'Roll Objectives' },
                { label: 'Play Mission', highlight: true },
                { label: 'Score', highlight: true },
              ]} />
              <SubLabel>Each Turn</SubLabel>
              <Steps items={[
                { label: 'Roll TOs' },
                { label: 'Battlefield' },
                { label: 'Activations', highlight: true },
              ]} />
            </div>
            <div>
              <SubLabel>PvP</SubLabel>
              <P>
                Both Squads build to <Hi>100 GP</Hi> at the same <Hi>TL</Hi>. Roll off to assign Squad A / B.
                Each Squad secretly rolls <Hi>2D6</Hi> for their Objective; both reveal simultaneously and pursue their own Objective independently.
              </P>
              <Divider />
              <SubLabel>PvE</SubLabel>
              <P>
                Select an enemy faction and a <Hi>Threat Level (1–3)</Hi>. Roll <Hi>3D6</Hi> on the faction Spawn Table — each die resolved independently.
                Roll <Hi>1D6</Hi> for Squad A/B assignment: <Hi>1–3</Hi> = Player is Squad A; <Hi>4–6</Hi> = Player is Squad B.
                Roll <Hi>2D6</Hi> for two Objectives with different Archetypes (re-roll if they match).
              </P>
            </div>
          </div>
        </Card>

        <Card>
          <SH>Mission Scoring</SH>
          <SubLabel>Both Modes</SubLabel>
          <div className="text-xs space-y-0.5 mb-1.5">
            <div><Br>+1 MP</Br> <span className="text-muted">per TL for completing the mission</span></div>
            <div><Br>+1 MP</Br> <span className="text-muted">per TL per completed Objective</span></div>
          </div>
          <Divider />
          <SubLabel>PvP Only</SubLabel>
          <div className="text-xs mb-1.5">
            <Br>+1 MP</Br> <span className="text-muted">per TL if all enemy Units Taken Out</span>
          </div>
          <Divider />
          <SubLabel>PvE Only</SubLabel>
          <div className="text-xs mb-1.5">
            <Br>+1 MP</Br> <span className="text-muted">per TL if all NPC Units Taken Out AND at least one Player Unit extracted</span>
          </div>
          <Divider />
          <SubLabel>Mission End</SubLabel>
          <P className="text-muted">
            <Br>PvP:</Br> End of Turn 4.
          </P>
          <P className="text-muted">
            <Br>PvE:</Br> Player Squad fully extracts, or all Player Units are Taken Out.
          </P>
        </Card>

        {/* ── Row 2: Battlefields | Deployments | Objectives ───────────────── */}

        <Card>
          <SH>Battlefields (D6)</SH>
          <P className="text-muted">Roll at Mission start. Effect triggers at the start of each Turn after the first.</P>
          <table className="w-full border-collapse">
            <tbody>
              <TableRow roll="1" label="The Ruined City — Collapse"           effect='Roll a random Anchor. All terrain within 4" is removed; all Units within 4" take 2 Damage.' />
              <TableRow roll="2" label="The Facility — Darkness"              effect='Select a random Anchor. Until end of Turn, Units within 4" cannot be targeted in Ranged Combat.' />
              <TableRow roll="3" label="The Jungle — Miasmic Mist"            effect='Select one random Standing Unit from each Squad. That Unit moves 2" three times in random directions (no AoO). If blocked, it takes 1 Melee Damage.' />
              <TableRow roll="4" label="The Alien Hive — Noxious Gas"         effect='Select a random Anchor. All Units within 4" take 1 Damage.' />
              <TableRow roll="5" label="The Cursed Temple — Haunting Spirits" effect="Select one random Unit from each Squad. That Unit immediately attacks the closest valid target in Combat, Squadmate or enemy." />
              <TableRow roll="6" label="The Rift — Shifting Realities"        effect='Select a random Anchor, then roll 1D6. 1–3: All Units within 4" move 2" toward it (no AoO). 4–6: All Units within 4" move 2" away from it (no AoO).' last />
            </tbody>
          </table>
        </Card>

        <Card>
          <SH>Deployments (D6)</SH>
          <P className="text-muted">Roll at Mission start. <Br>PvP:</Br> roll off for A/B. <Br>PvE:</Br> 1–3 = Squad A, 4–6 = Squad B.</P>
          <table className="w-full border-collapse">
            <tbody>
              <TableRow roll="1" label="Standard Insertion" effect='Squad A: Adjacent to SW, S, or SE Anchors. Squad B: Adjacent to NW, N, or NE Anchors (split evenly), in Cover/out of sight.' />
              <TableRow roll="2" label="Hot Drop"           effect='Squad A: Adjacent to N, S, E, or W Anchors. Squad B: Adjacent to NW, NE, SW, or SE Anchors (split evenly), in Cover/out of sight.' />
              <TableRow roll="3" label="Flanked"            effect='Squad A: within 4" of S Anchor. Squad B: Adjacent to NW or NE Anchors (split evenly), in Cover/out of sight.' />
              <TableRow roll="4" label="Deep Strike"        effect='Squad A: within 4" of SE Anchor. Squad B: within 4" of NW Anchor, in Cover if possible.' />
              <TableRow roll="5" label="Overwatch"          effect='Squad A: Adjacent to SW, S, or SE Anchors. Squad B: Adjacent to W, N, or E Anchors (split evenly), in Cover/out of sight.' />
              <TableRow roll="6" label="Encircled"          effect='Squad A: within 4" of Center Anchor. Squad B: Adjacent to NW, NE, SW, or SE Anchors (split evenly), in Cover/out of sight.' last />
            </tbody>
          </table>
        </Card>

        <Card>
          <SH>Objectives</SH>
          <P className="text-muted">Roll 1D6 for <Hi>Archetype</Hi>, then 1D6 for <Hi>Variation</Hi>.</P>
          <P className="mb-1.5"><Hi>1–2</Hi> Control · <Hi>3–4</Hi> Activate · <Hi>5–6</Hi> Destroy</P>
          <Divider />
          <SubLabel>Control</SubLabel>
          <P className="text-muted">Setup: 3 Objectives on random Anchors.</P>
          <table className="w-full border-collapse">
            <tbody>
              <TableRow roll="1-2" label="Hold the Line"  effect="Control all 3 Objectives at the end of any one Turn." />
              <TableRow roll="3-4" label="Sustained Hold" effect="Control 2+ Objectives at the end of two consecutive Turns." />
              <TableRow roll="5-6" label="Clear and Move" effect="Control 1+ Objective at end of three consecutive Turns. Remove one controlled Objective at end of Turn." last />
            </tbody>
          </table>
          <Divider />
          <SubLabel>Activate</SubLabel>
          <P className="text-muted">Activate (2ACT): Unit Controls an Objective. Objective removed from battlefield.</P>
          <table className="w-full border-collapse">
            <tbody>
              <TableRow roll="1-2" label="Full Access"        effect="Place all 3 at mission start. Activate all three in any order." />
              <TableRow roll="3-4" label="Sequence"           effect="Place only the first Objective. Each activation places the next on a random unoccupied Anchor." />
              <TableRow roll="5-6" label="Search and Recover" effect="Place 3 Objectives. On Activation, roll 1D6: found if result ≤ current Turn number. No TO re-rolls. Finder carries item (drop/pass for 1ACT). PvE: carrier must extract. PvP: carrier must be Standing at mission end." last />
            </tbody>
          </table>
          <Divider />
          <SubLabel>Destroy</SubLabel>
          <P className="text-muted">Objectives on random Anchors. Can be targeted in combat.</P>
          <table className="w-full border-collapse">
            <tbody>
              <TableRow roll="1-2" label="Full Denial"       effect="Place 3 Objectives. ARM 4 HIT 3. Destroy all three." />
              <TableRow roll="3-4" label="High-Value Target" effect="Place 1 Objective. ARM 4 HIT 6. Destroy it." />
              <TableRow roll="5-6" label="Attrition"         effect="Place 3 Objectives. ARM 4 HIT 3. At end of each Turn, remaining Objectives regain 1 lost HIT. Destroy two of three." last />
            </tbody>
          </table>
        </Card>

        {/* ── Row 3: PvE Notes (full width, 3 internal cols) ───────────────── */}

        <Card className="col-span-3">
          <SH>PvE Notes</SH>
          <div className="grid grid-cols-3 gap-4 mt-1">

            <div>
              <SubLabel>NPC Squads</SubLabel>
              <P>
                Select an enemy faction and a <Hi>Threat Level (1–3)</Hi>.
                Roll <Hi>3D6</Hi> — each die resolved independently. Look up each result in the faction Spawn Table column for the current TL to identify spawned Units.
              </P>
              <P className="text-muted">
                In Campaign play, TL matches the Operation: TL1 for Op 1, TL2 for Op 2, TL3 for Op 3.
                We recommend using the same faction for all Missions within an Operation.
              </P>
            </div>

            <div>
              <SubLabel>NPC Activations</SubLabel>
              <P>
                After each <Hi>Player Unit</Hi> activation, the same player activates one Ready <Hi>NPC Unit</Hi> per its <Hi>Behavior</Hi> skill.
                Repeat until all Units have activated. Resolve any Start of Turn skills before activations begin.
              </P>
              <Divider />
              <SubLabel>Reinforcements (Turn 5+)</SubLabel>
              <P>
                At the start of Turn 5 and each subsequent Turn, roll <Hi>1D6</Hi> and consult the Spawn Table for the current TL.
                Spawn the indicated Units Adjacent to a random Anchor — one Unit per Anchor.
              </P>
            </div>

            <div>
              <SubLabel>Extraction (Turn 4+)</SubLabel>
              <P>
                At the start of Turn 4, place the <Hi>Extraction Point</Hi> on a random unoccupied Anchor.
              </P>
              <P>
                At the end of Turn 4 or later, each <Hi>Standing Unit</Hi> within 3" of the Extraction Point that is <Hi>not Adjacent to any enemy</Hi> extracts successfully.
              </P>
              <P className="text-muted">
                Units that fail both conditions are left behind — treat as Taken Out for Injury purposes.
              </P>
            </div>

          </div>
        </Card>

      </div>
    </div>
  )
}
