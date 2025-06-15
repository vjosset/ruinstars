'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Campaign() {
  const { data: session } = useSession()

  console.log('Session data:', session)
  
  const campaign = {
    campaignName: 'Campaign Jun 2025',
    summary: {
      squad1MP: 0,
      squad2MP: 0,
      totalMP: 0,
      squad1OperationWins: 0,
      squad2OperationWins: 0,
      squad1Result: '',
      squad2Result: '',
    },
    squad1: {
      squadId: '0sQeXuJU',
      squadName: 'New Ankhies',
      playerName: 'BigDickMcKenzy',
    },
    squad2: {
      squadId: 'VgL2Y',
      squadName: 'Void Raptors',
      playerName: 'jodawznev',
    },
    operations: [
      {
        operationId: 1,
        summary: {
          squad1MP: 0,
          squad2MP: 0,
          squad1MissionWins: 0,
          squad2MissionWins: 0,
          totalMP: 0,
          squad1Result: '',
          squad2Result: '',
        },
        battlefield: {
          battlefieldId: 1,
          name: 'The Facility',
        },
        missions: [
          {
            missionId: 1,
            name: 'Defend',
            date: '08 Jun 2025',
            squad1MP: 1,
            squad2MP: 6,
          },
          {
            missionId: 2,
            name: 'Infiltrate',
            date: '08 Jun 2025',
            squad1MP: 6,
            squad2MP: 0,
          },
          {
            missionId: 3,
            name: 'Bug Bounty',
            date: '15 Jun 2025',
            squad1MP: null,
            squad2MP: null,
          }
        ]
      },
      {
        operationId: 2,
        summary: {
          squad1MP: 0,
          squad2MP: 0,
          squad1MissionWins: 0,
          squad2MissionWins: 0,
          totalMP: 0,
          squad1Result: '',
          squad2Result: '',
        },
        battlefield: {
          battlefieldId: 2,
          name: 'The Ruined City',
        },
        missions: [
          {
            missionId: 4,
            name: 'Rivals',
            date: null,
            squad1MP: null,
            squad2MP: null,
          },
          {
            missionId: 5,
            name: 'Scavenge',
            date: null,
            squad1MP: null,
            squad2MP: null,
          },
          {
            missionId: 6,
            name: 'Control',
            date: null,
            squad1MP: null,
            squad2MP: null,
          }
        ]
      },
      {
        operationId: 3,
        summary: {
          squad1MP: 0,
          squad2MP: 0,
          squad1MissionWins: 0,
          squad2MissionWins: 0,
          totalMP: 0,
          squad1Result: '',
          squad2Result: '',
        },
        battlefield: {
          battlefieldId: 3,
          name: 'The Jungle',
        },
        missions: [
          {
            missionId: 7,
            name: 'Retrieve Intel',
            date: null,
            squad1MP: null,
            squad2MP: null,
          },
          {
            missionId: 8,
            name: 'Intercept',
            date: null,
            squad1MP: null,
            squad2MP: null,
          },
          {
            missionId: 9,
            name: 'Eradicate',
            date: null,
            squad1MP: null,
            squad2MP: null,
          }
        ]
      }
    ]
  }

  // Do the summary per operation
  campaign.operations.forEach(op => {
    const operationSummary = {
      squad1MissionWins: op.missions.filter(m => m.squad1MP && m.squad1MP > m.squad2MP).length,
      squad2MissionWins: op.missions.filter(m => m.squad2MP && m.squad2MP > m.squad1MP).length,
      totalMP: op.missions.reduce((sum, m) => sum + (m.squad1MP ?? 0) + (m.squad2MP ?? 0), 0),
      squad1MP: op.missions.reduce((sum, m) => sum + (m.squad1MP ?? 0), 0),
      squad2MP: op.missions.reduce((sum, m) => sum + (m.squad2MP ?? 0), 0),
      squad1Result: '',
      squad2Result: '',
    }

    op.summary = operationSummary
  })

  // Do the summary for the entire campaign
  const campaignSummary = {
    squad1MP: campaign.operations.reduce((sum, op) => sum + op.summary.squad1MP, 0),
    squad2MP: campaign.operations.reduce((sum, op) => sum + op.summary.squad2MP, 0),
    totalMP: campaign.operations.reduce((sum, op) => sum + (op.summary.squad1MP ?? 0) + (op.summary.squad2MP ?? 0), 0),
    squad1OperationWins: campaign.operations.filter(o => o.summary.squad1MissionWins && o.summary.squad1MissionWins > o.summary.squad2MissionWins).length,
    squad2OperationWins: campaign.operations.filter(o => o.summary.squad2MissionWins && o.summary.squad2MissionWins > o.summary.squad1MissionWins).length,
    squad1Result: '',
    squad2Result: '',
  }
  campaign.summary = campaignSummary

  // Set the results
  campaign.operations.forEach(op => {
    if (op.summary.squad1MissionWins > op.summary.squad2MissionWins) {
      op.summary.squad1Result = 'W'
      op.summary.squad2Result = 'L'
    } else if (op.summary.squad2MissionWins > op.summary.squad1MissionWins) {
      op.summary.squad1Result = 'L'
      op.summary.squad2Result = 'W'
    } else {
      op.summary.squad1Result = '-'
      op.summary.squad2Result = '-'
    }
  })
  if (campaign.summary.squad1OperationWins > campaign.summary.squad2OperationWins) {
    campaign.summary.squad1Result = 'W'
    campaign.summary.squad2Result = 'L'
  } else if (campaign.summary.squad2OperationWins > campaign.summary.squad1OperationWins) {
    campaign.summary.squad1Result = 'L'
    campaign.summary.squad2Result = 'W'
  } else {
    campaign.summary.squad1Result = '-'
    campaign.summary.squad2Result = '-'
  }

  console.log('Campaign Summary:', campaign.summary)

  return (
    <>
      <h3 className="text-center font-heading">{campaign.campaignName}</h3>
      <p className="text-center">
        <Link className="underline" href={`/squads/${campaign.squad1.squadId}`}>{campaign.squad1.squadName}</Link> (<Link className="underline" href={`/users/${campaign.squad1.playerName}`}>{campaign.squad1.playerName}</Link>)
        <br/>vs<br/>
        <Link className="underline" href={`/squads/${campaign.squad2.squadId}`}>{campaign.squad2.squadName}</Link> (<Link className="underline" href={`/users/${campaign.squad2.playerName}`}>{campaign.squad2.playerName}</Link>)
      </p>

      <br/>

      {/* Operation/Mission Breakdown */}
      <table className="mx-1 mb-3">
        <thead>
          <tr>
            <th></th>
            <th className="w-1/4 truncate text-center">{campaign.squad1.squadName}</th>
            <th className="w-1/4 truncate text-center">{campaign.squad2.squadName}</th>
          </tr>
        </thead>
        <tbody>
          <>
            <tr className="stat text-lg border-t border-border">
              <th className="font-heading">Campaign</th>
              <th className={`font-heading text-center ${campaign.summary.squad1OperationWins > campaign.summary.squad2OperationWins ? 'text-main': ''}`}>{campaign.summary.squad1Result}</th>
              <th className={`font-heading text-center ${campaign.summary.squad2OperationWins > campaign.summary.squad1OperationWins ? 'text-main': ''}`}>{campaign.summary.squad2Result}</th>
            </tr>
            {campaign.operations.map((op, opIdx) => (
              <>
                <tr className="border-t border-border">
                  <td className="">
                    <span className="font-heading">Operation {opIdx + 1} { ' '}</span>
                    <em className="text-muted text-sm">{op.battlefield.name}</em>
                  </td>
                  <th className={`font-heading text-center ${op.summary.squad1MissionWins > op.summary.squad2MissionWins ? 'text-main': ''}`}>{op.summary.squad1Result}</th>
                  <th className={`font-heading text-center ${op.summary.squad2MissionWins > op.summary.squad1MissionWins ? 'text-main': ''}`}>{op.summary.squad2Result}</th>
                </tr>
            
                {op.missions.map((mission, mIdx) => (
                  <tr key={`${opIdx}-${mIdx}`}>
                    <td className="pl-2">
                      {opIdx + 1}.{mIdx + 1}: {mission.name}
                      {mission.date && <em className="text-muted text-sm"> - {mission.date}</em>}
                    </td>
                    <td className={`text-center ${mission.squad1MP && mission.squad1MP > mission.squad2MP ? 'text-main': ''}`}>{mission.squad1MP ?? '-'} MP</td>
                    <td className={`text-center ${mission.squad2MP && mission.squad2MP > mission.squad1MP ? 'text-main': ''}`}>{mission.squad2MP ?? '-'} MP</td>
                  </tr>
                ))}
              </>
            ))}
          </>
        </tbody>
      </table>
    </>
  )
}
