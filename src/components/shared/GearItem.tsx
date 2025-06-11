'use client'

import Markdown from '@/components/ui/Markdown'
import { useModal } from '@/components/ui/ModalContext'
import { GearPlain } from '@/types'

export default function GearItem({ gear }: { gear: GearPlain }) {
  const { showModal } = useModal()

  const handleClick = () => {
    showModal({
      title: `${gear.gearName}${gear.ACT && gear.ACT > 0 ? ` - ${gear.ACT} ACT` : ''}${gear.TO && gear.TO > 0 ? ` - ${gear.TO} TO` : ''}`,
      body: (
        <div className="prose prose-invert max-w-none">
          <Markdown>
            {gear.description || '*No description available.*'}
          </Markdown>
        </div>
      ),
      footer: (<></>)
    })
  }

  return (
    <>
      <span
        className="cursor-pointer text-foreground hover:text-main hastip"
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
