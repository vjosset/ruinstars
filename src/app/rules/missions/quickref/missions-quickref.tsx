import { Fragment } from 'react'
import { MissionBattlefields } from '@/data/mission_battlefields'
import { MissionDeployments } from '@/data/mission_deployments'
import { MissionObjectives } from '@/data/mission_objectives'

/** 'Control 1-2' -> '1-2' (the D6 range rolled for that variation) */
function variationRoll(objectiveId: string): string {
  return objectiveId.split(' ').slice(1).join(' ')
}

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
  return <div className="w-full h-px bg-border my-0.5" />
}

function Hi({ children }: { children: React.ReactNode }) {
  return <span className="text-main font-semibold">{children}</span>
}

function Br({ children }: { children: React.ReactNode }) {
  return <span className="text-foreground font-semibold">{children}</span>
}

function P({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-xs mb-0.5 ${className}`}>{children}</p>
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-muted uppercase tracking-wider">{children}</p>
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
    <div className="section p-0 m-0" id="missions-quick-reference">
      <div className="grid grid-cols-3 gap-1">

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
              {MissionBattlefields.map((b, i) => (
                <TableRow
                  key={b.battlefieldId}
                  roll={String(i + 1)}
                  label={`${b.title} — ${b.effectName}`}
                  effect={b.quickref ?? b.effect}
                  last={i === MissionBattlefields.length - 1}
                />
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <SH>Deployments (D6)</SH>
          <P className="text-muted">Roll at Mission start. <Br>PvP:</Br> roll off for A/B. <Br>PvE:</Br> 1–3 = Squad A, 4–6 = Squad B.</P>
          <table className="w-full border-collapse">
            <tbody>
              {MissionDeployments.map((d, i) => (
                <TableRow
                  key={d.deploymentId}
                  roll={d.deploymentId}
                  label={d.title}
                  effect={d.quickref ?? d.description}
                  last={i === MissionDeployments.length - 1}
                />
              ))}
            </tbody>
          </table>
        </Card>

        <Card>
          <SH>Objectives</SH>
          <P className="text-muted">Roll 1D6 for <Hi>Archetype</Hi>, then 1D6 for <Hi>Variation</Hi>.</P>
          <P className="mb-1.5">
            {MissionObjectives.map((archetype, i) => (
              <Fragment key={archetype.objectiveArchetypeId}>
                {i > 0 && ' · '}
                <Hi>{archetype.objectiveArchetypeId}</Hi> {archetype.title}
              </Fragment>
            ))}
          </P>
          {MissionObjectives.map((archetype) => (
            <Fragment key={archetype.objectiveArchetypeId}>
              <Divider />
              <SubLabel>{archetype.title}</SubLabel>
              {archetype.quickref && <P className="text-muted">{archetype.quickref}</P>}
              <table className="w-full border-collapse">
                <tbody>
                  {archetype.variations.map((v, i) => (
                    <TableRow
                      key={v.objectiveId}
                      roll={variationRoll(v.objectiveId)}
                      label={v.title}
                      effect={v.quickref ?? v.victory ?? ''}
                      last={i === archetype.variations.length - 1}
                    />
                  ))}
                </tbody>
              </table>
            </Fragment>
          ))}
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
                At the start of Turn 5 and each subsequent odd-numbered Turn (5, 7, 9, etc.), roll <Hi>1D6</Hi> and consult the Spawn Table for the current TL.
                Spawn the indicated Units Adjacent to a random Anchor - one Unit per Anchor.
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

        {/* ── Row 4: Horde Mode Notes (full width, 3 internal cols) ────────── */}

        <Card className="col-span-3">
          <SH>Horde Mode Notes</SH>
          <div className="grid grid-cols-3 gap-4 mt-1">

            <div>
              <SubLabel>Structure</SubLabel>
              <P>
                <Hi>3 Operations × 3 Waves.</Hi> Each Wave is a reduced PvE mission with <Hi>one Objective</Hi>.
                A Wave ends when all NPC Units are Taken Out.
              </P>
              <P className="text-muted">
                No Extraction required for Wave completion.
                HIT does not reset between Waves. At the end of each Operation: select a new random battlefield and NPC faction and increase TL by 1.
                Spend MP on Spoils of War at the end of each Wave.
              </P>
              <Divider />
              <SubLabel>Wave Scoring</SubLabel>
              <P><Br>+1 MP</Br> <span className="text-muted">per TL for completing the Wave</span></P>
              <P><Br>+1 MP</Br> <span className="text-muted">per TL for completing the Objective</span></P>
              <P><Br>+1 MP</Br> <span className="text-muted">per Turn before Turn 4 the Wave was completed (Turn 1: +3, Turn 2: +2, Turn 3: +1)</span></P>
            </div>

            <div>
              <SubLabel>Downed Units</SubLabel>
              <P>
                When a Player Unit reaches <Hi>0 HIT</Hi>, it is <Hi>Downed</Hi> instead of Taken Out.
                Place it on its side. Do not remove it from the battlefield.
              </P>
              <div className="text-xs text-muted space-y-0.5 mb-1">
                <div>· Ignored by NPC Units; cannot be targeted in combat.</div>
                <div>· Takes no Damage.</div>
                <div>· May only perform <Br>Move</Br>, <Br>Dash</Br>, or <Br>Revive</Br> (no Attacks of Opportunity).</div>
              </div>
              <P className="text-muted">If all Player Units are Downed simultaneously, the session ends in defeat.</P>
            </div>

            <div>
              <SubLabel>Revive (2 ACT)</SubLabel>
              <P>
                A <Hi>Standing Unit</Hi> that Controls a <Hi>Downed</Hi> Squadmate may revive it.
                A Downed Unit may also revive itself if it Controls a Standing Squadmate.
              </P>
              <P>
                The revived Unit returns to Standing with <Hi>1 new Injury</Hi> and <Hi>all its HIT</Hi> remaining
              </P>
              <Divider />
              <SubLabel>Horde Rewards (end of each Wave)</SubLabel>
              <div className="text-xs space-y-0.5">
                <div><Br>3 MP</Br> <span className="text-muted">Spoil of War</span></div>
                <div><Br>2 MP</Br> <span className="text-muted">Medpack — one Unit gains a single-use item: 1 ACT to restore 1D3 lost HIT to self or a Controlled Unit</span></div>
                <div><Br>2 MP</Br> <span className="text-muted">Field Dressing — one Unit regains 1 lost HIT</span></div>
                <div><Br>6 MP</Br> <span className="text-muted">Surgery — remove one Injury from one Unit</span></div>
              </div>
            </div>

          </div>
        </Card>

      </div>
    </div>
  )
}
