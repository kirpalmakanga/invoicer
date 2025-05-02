import { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function H1({ className, children }: ComponentProps<'h1'>) {
    return <h1 className={cn('font-bold text-lg', className)}>{children}</h1>;
}
