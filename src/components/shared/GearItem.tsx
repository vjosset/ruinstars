'use client'

import Markdown from '@/components/ui/Markdown'
import { showInfoModal } from '@/lib/utils/showInfoModal'
import { GearPlain } from '@/types'

export default function GearItem({ gear }: { gear: GearPlain }) {

  const handleClick = () => {
    showInfoModal({
      title: `${gear.gearName}${gear.ACT && gear.ACT > 0 ? ` - ${gear.ACT} ACT` : ''}${gear.TO && gear.TO > 0 ? ` - ${gear.TO} TO` : ''}`,
      body: (
        <div className="prose prose-invert max-w-none">
          <Markdown>
            {gear.description || '*No description available.*'}
          </Markdown>
        </div>
      )
    })
  }

  return (
    <>
      <span
        className="cursor-pointer text-foreground hover:text-main hastip px-2"
        onClick={handleClick}
      >
        {gear.gearName}
        {(gear.ACT ?? 0) > 0 && (
          <span className="text-muted"> ({gear.ACT} ACT)</span>
        )}
        {(gear.TO ?? 0) > 0 && (
          <span className="text-muted"> ({gear.TO} TO)</span>
        )}
        {gear.GP !== 0 && (
          <sup className="text-xs text-muted">{gear.GP}GP</sup>
        )}
      </span>
    </>
  )
}
