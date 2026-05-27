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

// ─── Main component ──────────────────────────────────────────────────────────

export default function HordeModeQuickRef() {
  return (
    <div className="section" id="hordemode-quick-reference">
      <div className="grid grid-cols-3 gap-2">

        {/* ── Row 1: Game Cycle (col 1+2) | Squad Formats (col 3) ─────────── */}

        <Card className="col-span-2">
          <SH>Game Cycle</SH>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <SubLabel>Session Start</SubLabel>
              <Steps items={[
                { label: 'Select Deployment' },
                { label: 'Select NPC Faction' },
                { label: 'Deploy Squad' },
              ]} />
              <SubLabel>Each Act (3 per Session)</SubLabel>
              <Steps items={[
                { label: 'New NPC Faction' },
                { label: 'Place Objectives A/B/C' },
                { label: 'Set Threat Level' },
                { label: 'Play 3 Waves', highlight: true },
              ]} />
            </div>
            <div>
              <SubLabel>Each Wave</SubLabel>
              <Steps items={[
                { label: 'Spawn (3D6)' },
                { label: 'Play Turns' },
                { label: 'Wave End', highlight: true },
              ]} />
              <SubLabel>Each Turn</SubLabel>
              <Steps items={[
                { label: 'Roll TO' },
                { label: 'Turn Event' },
                { label: 'Activations', highlight: true },
                { label: 'End of Turn' },
              ]} />
            </div>
          </div>
        </Card>

        <Card>
          <SH>Squad Formats</SH>
          <div className="text-xs space-y-0.5 mb-1.5">
            <div><Br>Full Squad</Br> <span className="text-muted">100 GP</span></div>
            <div><Br>2P Mini Squads</Br> <span className="text-muted">50 GP each</span></div>
            <div><Br>3P Mini Squads</Br> <span className="text-muted">34 GP each</span></div>
            <div><Br>4P Mini Squads</Br> <span className="text-muted">25 GP each</span></div>
          </div>
          <Divider />
          <SubLabel>Squad Leader (Mini Squads)</SubLabel>
          <P className="text-muted">
            Designate one <Hi>Squad Leader</Hi> before the session.
            Squad Leader Standing: roll <Hi>5 TO</Hi>.
            Squad Leader Taken Out: roll <Hi>3 TO</Hi>.
          </P>
        </Card>

        {/* ── Row 2: Each Act | Each Wave | Each Turn ───────────────────────── */}

        <Card>
          <SH>Each Act</SH>
          <SubLabel>At Act Start</SubLabel>
          <ol className="text-xs ml-3 list-decimal space-y-0.5 mb-1">
            <li>Roll or select a random <Hi>NPC Faction</Hi> (used for all Waves this Act)</li>
            <li>Place <Hi>3 Objective Markers</Hi> (A, B, C) on random Anchors — not on NPC spawn points</li>
            <li><Hi>Threat Level = Act Number</Hi> — Act 1 = TL1, Act 2 = TL2, Act 3 = TL3</li>
          </ol>
          <Divider />
          <SubLabel>Between Acts</SubLabel>
          <P className="text-muted">
            Move Objectives A/B/C to new Anchors. Carry NPC Control Scores forward.
          </P>
        </Card>

        <Card>
          <SH>Each Wave</SH>
          <ol className="text-xs ml-3 list-decimal space-y-0.5 mb-1">
            <li>Roll <Hi>3D6</Hi> — spawn NPC units per TL Spawn Table, each die independent</li>
            <li>Play Turns until all NPC units are Taken Out</li>
            <li>Score MP → Spend MP → Prepare next Wave</li>
          </ol>
          <Divider />
          <SubLabel>Reinforcements (Turn 5+)</SubLabel>
          <P className="text-muted">
            At Turn start, roll <Hi>1D6</Hi> and spawn 1 NPC unit per die result (ignore quantity).
          </P>
        </Card>

        <Card>
          <SH>Each Turn</SH>
          <ol className="text-xs ml-3 list-decimal space-y-0.5 mb-1">
            <li>Roll <Hi>Tactical Orders (TO)</Hi></li>
            <li>
              Roll <Hi>Turn Event</Hi><br/>
              <span className="text-muted">Turn 5+: Enemy Reinforcements instead</span>
            </li>
            <li>
              <Hi>Activations</Hi> — Player has Initiative
              <ul className="ml-3 mt-0.5 list-disc text-muted">
                <li>Activate one Player Unit</li>
                <li>Activate one NPC Unit per Behavior</li>
                <li>Repeat until all Units activated</li>
              </ul>
            </li>
            <li>
              <Hi>End of Turn</Hi><br/>
              <span className="text-muted">Apply NPC Control Score to Objectives. No Standing NPCs = Wave ends.</span>
            </li>
          </ol>
        </Card>

        {/* ── Row 3: Objectives (col 1+2) | Wave Scoring + MP Rewards (col 3) ─ */}

        <Card className="col-span-2">
          <SH>Objectives</SH>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <P>
                Three Objectives (A, B, C) persist between Waves and between Acts.
                Each Act they move to new Anchors — NPC Control Scores carry forward.
              </P>
              <Divider />
              <SubLabel>NPC Control Score</SubLabel>
              <P>
                End of each Turn: each Objective gains <Hi>+1 NPC Control Score</Hi> per NPC Unit Controlling it.
              </P>
              <P>
                Objective destroyed at <Hi>6 NPC Control Score</Hi> — removed from play.
              </P>
            </div>
            <div>
              <SubLabel>Control (from Core Rules)</SubLabel>
              <P className="text-muted">
                A Unit Controls an Objective if it is Adjacent to it, is not Adjacent to any enemy Units, and no enemy Units are Adjacent to the Objective.
              </P>
              <Divider />
              <SubLabel>Failure Conditions</SubLabel>
              <P>
                All Player Units Downed simultaneously,<br/>
                <Hi>OR</Hi> all three Objectives destroyed.
              </P>
            </div>
          </div>
        </Card>

        <Card>
          <SH>Wave End Scoring</SH>
          <div className="text-xs space-y-0.5 mb-1.5">
            <div><Br>+1 MP</Br> <span className="text-muted">per TL (base)</span></div>
            <div><Br>+1 MP</Br> <span className="text-muted">per TL per Player-Controlled Objective</span></div>
          </div>
          <Divider />
          <SH>MP Rewards</SH>
          <SubLabel>Spend at end of any Wave</SubLabel>
          <div className="text-xs space-y-0.5">
            <div><Br>1 MP</Br> <span className="text-muted">+2 TO for next Wave</span></div>
            <div><Br>1 MP</Br> <span className="text-muted">1 free Action before next Wave</span></div>
            <div><Br>2 MP</Br> <span className="text-muted">One Unit regains 1 lost HIT</span></div>
            <div><Br>3 MP</Br> <span className="text-muted">Downed Unit returns (1 HIT + Injury)</span></div>
            <div><Br>3 MP</Br> <span className="text-muted">One Standing Unit gains Spoil of War</span></div>
          </div>
        </Card>

        {/* ── Row 4: Downed Units (col 1+2) | Session Scoring (col 3) ─────── */}

        <Card className="col-span-2">
          <SH>Downed Units</SH>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <P>
                At 0 HIT: Unit is <Hi>Downed</Hi> (lay on side).
                Ignored by NPC Units. Cannot be targeted in combat. Takes no Damage.
              </P>
              <P>
                Downed Units may only <Hi>Move</Hi>, <Hi>Dash</Hi>, or <Hi>Revive</Hi>.
                Move and Dash do not trigger Attacks of Opportunity.
              </P>
            </div>
            <div>
              <SubLabel>Revive — Mission Action (2 ACT)</SubLabel>
              <P>
                A <Hi>Standing Unit</Hi> that Controls a Downed Squadmate may revive it.
                A <Hi>Downed Unit</Hi> may revive itself if it Controls a Standing Squadmate.
                Returns with <Hi>1 HIT</Hi> + 1 random Injury.
              </P>
              <P className="text-muted">
                If all Player Units are Downed simultaneously: session ends in failure.
              </P>
            </div>
          </div>
        </Card>

        <Card>
          <SH>Session Scoring</SH>
          <SubLabel>Base Score</SubLabel>
          <P>
            <Hi>Waves completed</Hi> × <Hi>Threat Level</Hi> at time of failure.
          </P>
          <P className="text-muted">
            If all 9 Waves are completed, multiply by TL3 (×3).
          </P>
          <Divider />
          <SubLabel>NPC Behavior — Objective Drive</SubLabel>
          <P className="text-muted">
            Move toward nearest uncontrolled Objective.
            Engage Player Units within 6" of the direct path.
            If all Objectives are Player-controlled, engage the nearest Player Unit.
          </P>
        </Card>

      </div>
    </div>
  )
}
