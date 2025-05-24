'use client';

import { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

function getDateObject(date: string | number | Date) {
    return date instanceof Date ? date : new Date(date);
}

export function DatePicker<T extends string | number | Date>({
    className,
    value,
    onUpdate,
}: {
    className: string;
    value: T;
    onUpdate: (value: Date) => void;
}) {
    const [date, setDate] = useState<Date>(getDateObject(value));

    const handleSelectDate = useCallback((date: Date | undefined) => {
        if (date) setDate(date);
    }, []);

    useEffect(() => {
        const newDate = getDateObject(value);

        if (newDate.getTime() !== date.getTime()) setDate(getDateObject(value));
    }, [value]);

    useEffect(() => {
        onUpdate(date);
    }, [date]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-[240px] justify-start text-left font-normal',
                        !date && 'text-muted-foreground',
                        className
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelectDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
