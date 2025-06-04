import { useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const config: Record<InvoiceStatus, { className: string; text: string }> = {
    paid: {
        className: 'bg-green-900',
        text: 'Paid',
    },
    unpaid: {
        className: 'bg-red-900',
        text: 'Unpaid',
    },
    pending: {
        className: 'bg-blue-900',
        text: 'Pending',
    },
};

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
    const { className, text } = useMemo(() => config[status], [status]);

    return <Badge className={cn(className, 'text-zinc-100')}>{text}</Badge>;
}
