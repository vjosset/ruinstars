import BattlefieldDiagram, { type BattlefieldDiagramConfig } from '@/components/shared/BattlefieldDiagram'

export default async function RulesAnchors() {

  const anchorsDiagram = {
    board: { widthIn: 24, heightIn: 24 },
    elements: [
      { type: 'marker', id: 'C', xIn: 12, yIn: 12, label: 'C', showInLegend: false },

      { type: 'marker', id: 'NW', xIn: 4, yIn: 4, label: 'NW', showInLegend: false },
      { type: 'callout', id: 'h1', x1In: 0, y1In: 4, x2In: 4, y2In: 4, text: '4"' },
      { type: 'callout', id: 'v1', x1In: 4, y1In: 0, x2In: 4, y2In: 4, text: '4"' },

      { type: 'marker', id: 'NE', xIn: 20, yIn: 4, label: 'NE', showInLegend: false },
      { type: 'callout', id: 'h4', x1In: 20, y1In: 4, x2In: 24, y2In: 4, text: '4"' },
      { type: 'callout', id: 'v4', x1In: 20, y1In: 0, x2In: 20, y2In: 4, text: '4"' },

      { type: 'marker', id: 'SW', xIn: 4, yIn: 20, label: 'SW', showInLegend: false },
      { type: 'callout', id: 'h3', x1In: 0, y1In: 20, x2In: 4, y2In: 20, text: '4"' },
      { type: 'callout', id: 'v3', x1In: 4, y1In: 20, x2In: 4, y2In: 24, text: '4"' },

      { type: 'marker', id: 'SE', xIn: 20, yIn: 20, label: 'SE', showInLegend: false },
      { type: 'callout', id: 'h6', x1In: 20, y1In: 20, x2In: 24, y2In: 20, text: '4"' },
      { type: 'callout', id: 'v6', x1In: 20, y1In: 20, x2In: 20, y2In: 24, text: '4"' },

      { type: 'marker', id: 'N', xIn: 12, yIn: 4, label: 'N', showInLegend: false },
      { type: 'callout', id: 'v2', x1In: 12, y1In: 0, x2In: 12, y2In: 4, text: '4"' },

      { type: 'marker', id: 'W', xIn: 4, yIn: 12, label: 'W', showInLegend: false },
      { type: 'callout', id: 'h2', x1In: 0, y1In: 12, x2In: 4, y2In: 12, text: '4"' },

      { type: 'marker', id: 'E', xIn: 20, yIn: 12, label: 'E', showInLegend: false },
      { type: 'callout', id: 'h5', x1In: 20, y1In: 12, x2In: 24, y2In: 12, text: '4"' },

      { type: 'marker', id: 'S', xIn: 12, yIn: 20, label: 'S', showInLegend: false },
      { type: 'callout', id: 'v5', x1In: 12, y1In: 24, x2In: 12, y2In: 20, text: '4"' },



      //{ type: 'rect', id: 'PD', xIn: 0, yIn: 0, wIn: 24, hIn: 2, label: 'NPC Squad Deployment', showInLegend: false },
      //{ type: 'rect', id: 'ND', xIn: 0, yIn: 22, wIn: 24, hIn: 2, label: 'Player Squad Deployment', showInLegend: false }
    ]
  } satisfies BattlefieldDiagramConfig

  return (
    <>
      <h2>Anchors</h2>
      <div className="twocols">
        <div className="section">
          Some Objectives and Events include placing markers or tokens on "Anchors".
          Anchors are nine fixed reference points arranged across the battlefield by compass direction: the four corners (NW, NE, SW, SE), the four edge midpoints (N, S, E, W), and the Center (C), as illustrated below.
          <br/>
          To place your Anchors, use the following measurements from the battlefield edges:
          <ul>
            <li>Corner Anchors (NW, NE, SW, SE): 4" from each adjacent edge</li>
            <li>Cardinal Anchors (N, S, E, W): 4" from their adjacent edge, centered on that edge</li>
            <li>Center (C): The center of the battlefield</li>
          </ul>
          When an Objective or Event instructs you to place a marker on a random Anchor, roll <code>1D10</code> and consult the Anchor diagram.
          On a roll of 10, select any unoccupied Anchor of your choice. If an Anchor is already occupied, re-roll that placement.
        </div>
        <div className="section">
          <BattlefieldDiagram diagram={anchorsDiagram} className="max-w-sm" />
        </div>
      </div>
    </>
  )}
