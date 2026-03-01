import { GameToken } from '@/components/shared/GameToken'
import styles from './tokens.module.css'
import PageBreak from '@/components/ui/PageBreak'

const TOKENS = [
  'A1', 'A2', 'A3',
  'B1', 'B2', 'B3'
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
      <h4>Objectives (2")</h4>
      <div className={styles.grid}>
        {TOKENS.map(label => (
          <div key={label} className={styles.token}>
            <GameToken label={label} size={150} />
          </div>
        ))}
      </div>

      <PageBreak />
      <div>
        <h4>Extraction (6")</h4>
        <div key="E" className={styles.extract}>
          <GameToken label="E" size={450} />
        </div>
      </div>
    </div>
  )
}
