'use client';
import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ComboboxProps<T> {
  data: T[];
  valueField: keyof T;
  labelField: keyof T;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  value?: string;
  error?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}

export function SearchableField<T extends Record<string, any>>({
  data,
  valueField,
  labelField,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search...',
  emptyMessage = 'No results found.',
  className,
  error,
  value: controlledValue,
  onChange: controlledOnChange,
  required = false,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [internalValue, setInternalValue] = React.useState('');

  const value = controlledValue ?? internalValue;
  const onChange = controlledOnChange ?? setInternalValue;
  const [touched, setTouched] = React.useState(false);

  const showError = touched && required && !value;
  const errorMessage = error || (showError ? 'This field is required' : '');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            'border-input bg-background hover:bg-background w-full justify-between px-3 font-normal outline-hidden outline-offset-0 focus-visible:outline-[3px]',
            errorMessage && 'border-red-500',
            className
          )}
        >
          {value
            ? data.find((item) => String(item[valueField]) === value)?.[
                labelField
              ]
            : placeholder}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0'
        align='start'
      >
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={String(item[valueField])}
                  value={String(item[valueField])}
                  onSelect={(currentValue) => {
                    setTouched(true);
                    onChange(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  {String(item[labelField])}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      value === String(item[valueField])
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}