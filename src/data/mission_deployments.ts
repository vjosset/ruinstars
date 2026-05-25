import { BattlefieldDiagramConfig } from '@/components/shared/BattlefieldDiagram'

const PS  = '#2563eb' // player deployment
const NPC = '#dc2626' // NPC deployment

export type MissionDeployment = {
  deploymentId: string;
  title: string;
  description: string;
  diagram: BattlefieldDiagramConfig;
};

export const MissionDeployments: MissionDeployment[] = [
  {
    deploymentId: '1',
    title: 'Standard Insertion',
    description: 'Squad A Adjacent to the SW, S, or SE Anchors. Squad B Adjacent to the NW, N, or NE Anchors (split evenly), in Cover or out of sight where possible.',
    diagram: {
      showCenterLines: true,
      elements: [
        { id: 'PS-SW', type: 'circle', anchor: 'SW', rIn: 2, color: PS, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'PS-S',  type: 'circle', anchor: 'S',  rIn: 2, color: PS, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'PS-SE', type: 'circle', anchor: 'SE', rIn: 2, color: PS, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'NPC-NW', type: 'circle', anchor: 'NW', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'NPC-N',  type: 'circle', anchor: 'N',  rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'NPC-NE', type: 'circle', anchor: 'NE', rIn: 2, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
      ],
    },
  },
  {
    deploymentId: '2',
    title: 'Hot Drop',
    description: 'The insertion was faster than expected. Squad A deploys Adjacent to the N, S, E, or W Anchors. Squad B deploys Adjacent to the NW, NE, SW, or SE Anchors (split evenly), in Cover or out of sight where possible.',
    diagram: {
      showCenterLines: true,
      elements: [
        { id: 'PS-N', type: 'circle', anchor: 'N', rIn: 1.5, color: PS, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'PS-S', type: 'circle', anchor: 'S', rIn: 1.5, color: PS, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'PS-E', type: 'circle', anchor: 'E', rIn: 1.5, color: PS, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'PS-W', type: 'circle', anchor: 'W', rIn: 1.5, color: PS, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'NPC-NW', type: 'circle', anchor: 'NW', rIn: 1.5, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'NPC-NE', type: 'circle', anchor: 'NE', rIn: 1.5, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'NPC-SW', type: 'circle', anchor: 'SW', rIn: 1.5, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'NPC-SE', type: 'circle', anchor: 'SE', rIn: 1.5, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
      ],
    },
  },
  {
    deploymentId: '3',
    title: 'Flanked',
    description: 'Intel was wrong. The enemy is coming from two directions. Squad B deploys Adjacent to the NW or NE Anchors (split evenly), in Cover or out of sight where possible. Squad A deploys within 4" of the S Anchor.',
    diagram: {
      showCenterLines: true,
      elements: [
        { id: 'PS-S',   type: 'circle', anchor: 'S',  rIn: 4,   color: PS,  fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'NPC-NW', type: 'circle', anchor: 'NW', rIn: 1.5, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'NPC-NE', type: 'circle', anchor: 'NE', rIn: 1.5, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
      ],
    },
  },
  {
    deploymentId: '4',
    title: 'Deep Strike',
    description: 'Both sides arrived at the same time. Squad A deploys within 4" of the SE anchor. Squad B deploys within 4" of the NW anchor, in Cover if possible.',
    diagram: {
      showCenterLines: true,
      elements: [
        { id: 'PS-SE',  type: 'circle', anchor: 'SE', rIn: 4, color: PS,  fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'NPC-NW', type: 'circle', anchor: 'NW', rIn: 4, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
      ],
    },
  },
  {
    deploymentId: '5',
    title: 'Overwatch',
    description: 'The enemy holds the high ground and saw you coming. Squad B deploys Adjacent to the W, N, or E Anchors (split evenly), in Cover or out of sight where possible. Squad A deploys Adjacent to the SW, S, or SE Anchors.',
    diagram: {
      showCenterLines: true,
      elements: [
        { id: 'PS-SW', type: 'circle', anchor: 'SW', rIn: 1.5, color: PS,  fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'PS-S',  type: 'circle', anchor: 'S',  rIn: 1.5, color: PS,  fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'PS-SE', type: 'circle', anchor: 'SE', rIn: 1.5, color: PS,  fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'NPC-W', type: 'circle', anchor: 'W',  rIn: 1.5, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'NPC-N', type: 'circle', anchor: 'N',  rIn: 1.5, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'NPC-E', type: 'circle', anchor: 'E',  rIn: 1.5, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
      ],
    },
  },
  {
    deploymentId: '6',
    title: 'Encircled',
    description: 'Extraction just got complicated. Squad A deploys within 4" of the Center anchor. Squad B deploys Adjacent to the NW, NE, SW, or SE Anchors (split evenly), in Cover or out of sight where possible.',
    diagram: {
      showCenterLines: true,
      elements: [
        { id: 'PS-C',   type: 'circle', anchor: 'C',  rIn: 4,   color: PS,  fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'NPC-NW', type: 'circle', anchor: 'NW', rIn: 1.5, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'NPC-NE', type: 'circle', anchor: 'NE', rIn: 1.5, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'NPC-SW', type: 'circle', anchor: 'SW', rIn: 1.5, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
        { id: 'NPC-SE', type: 'circle', anchor: 'SE', rIn: 1.5, color: NPC, fillOpacity: 0.15, showLabel: false, showInLegend: false },
      ],
    },
  },
]
