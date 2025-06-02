import Markdown from '@/components/ui/Markdown'
import { Battlefield, BattlefieldPlain } from '@/types'

export default function BattlefieldBlock({battlefield}: { battlefield: Battlefield | BattlefieldPlain }) {
  return (
    <>
      <h4 className="text-main font-semibold mb-1">{battlefield.battlefieldId} - {battlefield.title}</h4>
      
      {battlefield.setup && (
        <>
          <h6>Setup</h6>
          <div className="ml-2">
            <Markdown>{battlefield.setup}</Markdown>
          </div>
        </>
      )}
      {battlefield.effects && (
        <>
          <h6>Effects</h6>
          <div className="ml-2">
            <Markdown>{battlefield.effects}</Markdown>
          </div>
        </>
      )}
      <div className="flavor">
        <Markdown>{battlefield.description}</Markdown>
      </div>
    </>
  )
}