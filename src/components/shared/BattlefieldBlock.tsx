import Markdown from '@/components/ui/Markdown'
import { Battlefield, BattlefieldPlain } from '@/types'

export default function BattlefieldBlock({battlefield}: { battlefield: Battlefield | BattlefieldPlain }) {
  return (
    <div className="bg-card border border-main p-1 rounded mb-2">
      <h4 className="text-main font-semibold mb-1">{battlefield.title}</h4>
      
      {battlefield.setup && (
        <>
          <h6 className="text-main">Setup</h6>
          <div className="ml-2">
            <Markdown>{battlefield.setup}</Markdown>
          </div>
        </>
      )}
      {battlefield.effects && (
        <>
          <h6 className="text-main">Effects</h6>
          <div className="ml-2">
            <Markdown>{battlefield.effects}</Markdown>
          </div>
        </>
      )}
      {(battlefield.pdfA4 || battlefield.pdfLetter) && (
        <>
          <h6 className="text-main">Print-At-Home</h6>
          <ul>
            {battlefield.pdfA4 && <li><a href={battlefield.pdfA4} className="underline" target="_blank">{battlefield.title} - A4</a></li>}
            {battlefield.pdfLetter && <li><a href={battlefield.pdfLetter} className="underline" target="_blank">{battlefield.title} - US Letter</a></li>}
          </ul>
        </>
      )}
      <div className="flavor">
        <Markdown>{battlefield.description}</Markdown>
      </div>
    </div>
  )
}