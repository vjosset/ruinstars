import { SquadLink } from '@/components/nav/Links'
import Markdown from '@/components/ui/Markdown'
import PageTitle from '@/components/ui/PageTitle'
import { safeGenerateCampaign, testCampaignGen } from '@/lib/campaigngen/campaigngen'
import { GAME } from '@/lib/config/game_config'
import React from 'react'

export const metadata = {
  title: `Campaign Generator - ${GAME.NAME}`,
  description: `Generate a new ${GAME.NAME} campaign`,
}

export default async function CampaignGen() {
  testCampaignGen()
  const campaign = safeGenerateCampaign(3, 3)
  return (
    <div className="px-4 py-10 max-w-7xl mx-auto text-foreground">
      <PageTitle className="font-title text-main text-center">Campaign: {campaign?.title}</PageTitle>
      <p className="text-xl font-medium text-center text-muted-foreground mb-2">
        Sector: <span className="text-foreground font-bold">{campaign?.sector}</span>
      </p>
      {false && 
        <Markdown className="flavor text-center mb-8 text-lg max-w-3xl mx-auto">
          {campaign?.description ?? ''}
        </Markdown>
      }

      <table width="100%">
        <thead>
          <tr>
            <th>Mission</th><th>Battlefield</th>
          </tr>
        </thead>
        <tbody>
          {campaign?.operations.map((op, opIdx) => (
            <React.Fragment key={opIdx}>
              <tr>
                <th colSpan={2}><strong>Operation {opIdx + 1}</strong> - Enemy Squad: {op.enemy.squadName}</th>
              </tr>
              {op.missions.map((m, mIdx) => (
                <tr key={mIdx}>
                  <td className="pl-4">{opIdx + 1}.{mIdx + 1}: {m.title}</td>
                  <td>{m.battlefield}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {campaign?.operations.map((op, opIdx) => (
        <div
          key={`op_${opIdx}`}
          className=""
        >
          <h2 className="text-2xl font-semibold mb-1 text-main">
            Operation {opIdx + 1}: {op.subsector}
          </h2>

          {false && 
            <Markdown className="flavor mb-4 text-base">
              {op.description}
            </Markdown>
          }

          <div className="mb-4 flex items-baseline gap-2 flex-wrap">
            <strong className=" text-muted-foreground">Enemy Squad:</strong>
            <SquadLink squadId={op.enemy.squadId} squadName={op.enemy.squadName} />
            ({op.enemy.squadType?.faction.factionName})
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {op.missions.map((m, mIdx) => (
              <div
                key={`mission_${opIdx}_${mIdx}`}
                className="rounded-lg border border-border p-4 shadow-sm"
              >
                <h3 className="text-lg font-bold mb-1 text-main">
                  Mission {opIdx + 1}.{mIdx + 1}: {m.title}
                </h3>
                <p className="text-muted mb-2 italic">
                  {m.goal}
                </p>
                <p className="mb-2">
                  <strong>Battlefield:</strong> {m.battlefieldName} <em>({m.battlefield})</em>
                </p>
                <Markdown className="flavor  mb-2">{m.description}</Markdown>

                <div className="mb-2">
                  <strong>Setup:</strong> <Markdown className="text-muted">{m.setup}</Markdown>
                </div>
                <div className="mb-2">
                  <strong>Deployment:</strong> <Markdown className="text-muted">{m.deployment}</Markdown>
                </div>
                {m.special != '' && 
                  <div className="mb-2">
                    <strong>Special:</strong> <Markdown className="text-muted">{m.special}</Markdown>
                  </div>
                }
                <div className="mb-2">
                  <strong>Victory:</strong> <Markdown className="text-muted">{m.victory}</Markdown>
                </div>
                <div className="text-green-600 mb-1">
                  <strong>Success:</strong> <Markdown className="text-muted">{m.successresult}</Markdown>
                </div>
                <div className="text-red-600">
                  <strong>Failure:</strong> <Markdown className="text-muted">{m.failureresult}</Markdown>
                </div>
              </div>
            ))}
          </div>
          <hr/>
        </div>
      ))}
    </div>
  )
}
