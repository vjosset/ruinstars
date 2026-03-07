import { GameToken } from '@/components/shared/GameToken'
import styles from './tokens.module.css'
import PageBreak from '@/components/ui/PageBreak'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { GAME } from '@/lib/config/game_config'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Tokens',
    description: `Print-at-home tokens and markers for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    images: [],
    keywords: ['free', 'rules', 'pdf', 'tokens'],
    pagePath: '/tools/Tokens - Ruinstars.pdf'
  })
}

type TokenDef = { label: string; size: number; colorMode: string; subtitle?: string }

const OBJECTIVES: { objectiveType: string; tokens: TokenDef[] }[] = [
  {
    objectiveType: 'Activate',
    tokens: [
      { label: 'A1', size: 150, colorMode: 'main' },
      { label: 'A2', size: 150, colorMode: 'main' },
      { label: 'A3', size: 150, colorMode: 'main' },
    ],
  },
  {
    objectiveType: 'Control',
    tokens: [
      { label: 'C1', size: 150, colorMode: 'alt' },
      { label: 'C2', size: 150, colorMode: 'alt' },
      { label: 'C3', size: 150, colorMode: 'alt' },
    ],
  },
  {
    objectiveType: 'Destroy',
    tokens: [
      { label: 'D1', size: 150, colorMode: 'main', subtitle: 'ARM 4\nHIT 3' },
      { label: 'D2', size: 150, colorMode: 'main', subtitle: 'ARM 4\nHIT 3' },
      { label: 'D3', size: 150, colorMode: 'main', subtitle: 'ARM 4\nHIT 3' },
    ],
  },
  {
    objectiveType: 'Search',
    tokens: [
      { label: 'S1', size: 150, colorMode: 'alt' },
      { label: 'S2', size: 150, colorMode: 'alt' },
      { label: 'S3', size: 150, colorMode: 'alt' },
    ],
  },
  {
    objectiveType: 'Protect',
    tokens: [
      { label: 'P', size: 150, colorMode: 'main', subtitle: 'ARM 4\nHIT 3' },
    ],
  }
]

export default function TokensPage() {
  return (
    <div className={styles.page}>
      <h3>Instructions</h3>
      <div>
        These tokens are intended to indicate control ranges for mission objectives and the Extraction Zone for PvE Missions.
        For best results, print these on paper, cut them out, and glue them to thick cardboard or foamcore.
        {/*
        <div className="section twocols">
          <div className="section">
            <h5>Objectives (2")</h5>
            <GameToken label="A1" size={75} />
            Units whose bases intersect with this token are in its Control range.
          </div>
          <div>
            <div className="section">
              <h5>Extraction Zone (6")</h5>
              <GameToken label="E" size={75} />
              Units whose bases intersect with this marker are in the Extraction Zone.
            </div>
          </div>
        </div>
        */}
      </div>
      <h4>Objectives</h4>
      <p>
        A Unit whose base overlaps this marker is within 1" of the objective. All other rules for Controlling an objective still apply.
        <br/><br/>
      </p>
      <div className={styles.grid}>
        {OBJECTIVES.map((o) => (
          <div key={o.objectiveType} className="section text-center">
            <h4>{o.objectiveType}</h4>
            {o.tokens.map((t) => (
              <div key={t.label} className={styles.token}>
                <GameToken label={t.label} size={t.size} colorMode={t.colorMode} subtitle={t.subtitle} />
              </div>
            ))}
          </div>
        ))
        }
      </div>

      <PageBreak />
      <div>
        <h4>Extraction</h4>
        <p>
          Use this marker for PvE Extraction.
          A Unit whose base overlaps this marker is within 3" of the Extraction Point. All other rules for Extraction still apply.
          <br/><br/>
        </p>
        <div key="E" className={styles.extract}>
          <GameToken label="E" size={450} colorMode="main" />
        </div>
      </div>
    </div>
  )
}
