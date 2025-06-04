import { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export default function H2({ className, children }: ComponentProps<'h2'>) {
    return <h2 className={cn('font-bold', className)}>{children}</h2>;
}
