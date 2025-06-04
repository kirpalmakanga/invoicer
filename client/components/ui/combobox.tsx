'use client';

import { Key, useEffect, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

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

import { cn, isEqual } from '@/lib/utils';

export interface ComboboxItem<T> {
    label: string;
    value: T;
}

interface ComboboxProps<T> {
    selectedValue: T;
    items: ComboboxItem<T>[];
    placeholder?: string;
    onSelect: (value: T) => void;
}

export function Combobox<T>({
    selectedValue,
    items,
    placeholder = '',
    onSelect,
}: ComboboxProps<T>) {
    const [open, setOpen] = useState(false);
    const [localValue, setLocalValue] = useState(selectedValue);

    function isCurrentValue(value: T) {
        return isEqual(localValue, value);
    }

    function getCurrentLabel() {
        if (!localValue) {
            return placeholder;
        }

        const item = items.find(({ value }) => isCurrentValue(value));

        if (item) {
            return item.label;
        }

        return placeholder;
    }

    function handleSelect(value: T) {
        return () => {
            onSelect(value);

            setLocalValue(value);
            setOpen(false);
        };
    }

    useEffect(() => setLocalValue(selectedValue), [selectedValue]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full text-left data-[placeholder]:text-muted-foreground"
                    {...(getCurrentLabel() === placeholder
                        ? { 'data-placeholder': '' }
                        : {})}
                >
                    <span className="grow truncate">{getCurrentLabel()}</span>

                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput
                        placeholder="Search items..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>No item found.</CommandEmpty>
                        <CommandGroup>
                            {items.map(({ label, value }) => (
                                <CommandItem
                                    key={value as Key}
                                    value={label}
                                    onSelect={handleSelect(value)}
                                >
                                    {label}

                                    <Check
                                        className={cn(
                                            'ml-auto',
                                            isCurrentValue(value)
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
