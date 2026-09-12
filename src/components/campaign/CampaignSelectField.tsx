'use client'

import { Label } from '@/components/ui'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { Fragment } from 'react'
import { FiChevronDown, FiX } from 'react-icons/fi'
import { GiRollingDices } from 'react-icons/gi'

/** Label column + control column, matching the Unit editor's rows */
export const CAMPAIGN_FIELD_GRID = 'grid grid-cols-[6rem_1fr] items-center gap-x-4'

export type CampaignSelectOption = {
  value: string
  label: string
  /** Options sharing a group are listed under one heading, in first-seen order */
  group?: string
}

const segmentButtonClass = 'my-2 w-9 h-9 shrink-0 flex items-center justify-center border border-border border-l-0 bg-zinc-900 hover:bg-zinc-800'

export default function CampaignSelectField({
  label,
  value,
  options,
  onChange,
  onReroll,
  onRemove,
  children,
}: {
  label: string
  value: string
  options: CampaignSelectOption[]
  onChange: (value: string) => void
  onReroll?: () => void
  onRemove?: () => void
  /** Shown under the control, e.g. a rules summary or validation message */
  children?: React.ReactNode
}) {
  const selected = options.find(option => option.value === value)
  const groups = [...new Set(options.map(option => option.group).filter((group): group is string => !!group))]
  const hasSegments = !!onReroll || !!onRemove

  const renderOption = (option: CampaignSelectOption) => (
    <ListboxOption
      key={option.value}
      value={option.value}
      className="px-4 py-2 cursor-pointer text-foreground data-[focus]:text-main data-[selected]:text-main"
    >
      {option.label}
    </ListboxOption>
  )

  return (
    <div className={CAMPAIGN_FIELD_GRID}>
      <Label>{label}</Label>
      <Listbox value={value} onChange={onChange}>
        <div className="flex w-full min-w-0">
          <ListboxButton
            aria-label={label}
            className={`flex-1 min-w-0 h-9 my-2 px-2 bg-card border border-border text-sm text-left flex justify-between items-center gap-2 ${
              hasSegments ? 'rounded-l-md rounded-r-none' : 'rounded-md'
            }`}
          >
            <span className="truncate">{selected?.label ?? 'Select...'}</span>
            <FiChevronDown className="w-4 h-4 shrink-0 text-muted" />
          </ListboxButton>
          {onReroll && (
            <button
              type="button"
              className={`${segmentButtonClass} ${onRemove ? '' : 'rounded-r-md'}`}
              onClick={onReroll}
              title={`Randomize ${label}`}
              aria-label={`Randomize ${label}`}
            >
              <GiRollingDices />
            </button>
          )}
          {onRemove && (
            <button
              type="button"
              className={`${segmentButtonClass} rounded-r-md`}
              onClick={onRemove}
              title={`Remove ${label}`}
              aria-label={`Remove ${label}`}
            >
              <FiX />
            </button>
          )}
        </div>

        {/* Anchored so the list isn't clipped by the modal's scrolling body */}
        <ListboxOptions
          anchor="bottom start"
          className="z-[60] w-[var(--button-width)] max-h-60 overflow-auto rounded-md bg-card border border-border shadow-lg text-sm [--anchor-gap:4px]"
        >
          {options.filter(option => !option.group).map(renderOption)}
          {groups.map(group => (
            <Fragment key={group}>
              <div className="px-2 pt-2 pb-1 text-xs uppercase tracking-wide text-muted">{group}</div>
              {options.filter(option => option.group === group).map(renderOption)}
            </Fragment>
          ))}
        </ListboxOptions>
      </Listbox>
      {children && <div className="col-start-2">{children}</div>}
    </div>
  )
}
