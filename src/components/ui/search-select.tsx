import { useState } from 'react'
import { Check, ChevronsUpDown, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'

// Searchable + scrollable single-select combobox. Drop-in replacement for
// the shadcn Select when the option list is long enough that search helps
// (services, roles, scopes). Mirrors the Select API surface (value /
// onValueChange / disabled / placeholder) so call sites stay simple, but
// renders a Popover + cmdk Command list with a filter input and a capped
// scroll area (CommandList max-h-[300px] overflow-y-auto).
//
// Used by the add-user wizard and the edit-permissions tab service-role
// assignment editors so both share one searchable dropdown.

export interface SearchSelectOption {
  value: string
  label: string
}

interface Props {
  value: string
  onValueChange: (value: string) => void
  options: SearchSelectOption[]
  placeholder?: string
  /** Shown when no option matches the search query. */
  disabled?: boolean
  id?: string
  className?: string
}

export function SearchSelect({
  value,
  onValueChange,
  options,
  placeholder = 'Select...',
  disabled = false,
  id,
  className,
}: Props) {
  const [open, setOpen] = useState(false)

  const selected = options.find((o) => o.value === value) ?? null

  // Stop wheel/touch events over the open popover from bubbling into a
  // scrolling Dialog body behind it (Popover is non-modal, unlike Select).
  const stopScrollPropagation = (e: React.WheelEvent | React.TouchEvent) => {
    e.stopPropagation()
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type='button'
          variant='outline'
          role='combobox'
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            'h-8 w-full justify-between text-xs font-normal',
            !selected && 'text-muted-foreground',
            className
          )}
        >
          <span className='truncate'>
            {selected ? selected.label : placeholder}
          </span>
          <ChevronsUpDown className='ms-2 h-3.5 w-3.5 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='w-(--radix-popover-trigger-width) min-w-[220px] p-0'
        align='start'
        onWheelCapture={stopScrollPropagation}
        onTouchMoveCapture={stopScrollPropagation}
      >
        <Command>
          <CommandInput placeholder='Search...' />
          <CommandList>
            <CommandEmpty>
              <span className='text-xs text-muted-foreground'>
                <Search className='mr-1 inline h-3 w-3' />
                No matches.
              </span>
            </CommandEmpty>
            {options.length > 0 && (
              <CommandGroup>
                {options.map((o) => (
                  <CommandItem
                    key={o.value}
                    value={`${o.label} ${o.value}`}
                    onSelect={() => {
                      onValueChange(o.value)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value === o.value ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                    <span className='truncate text-sm'>{o.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
