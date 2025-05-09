'use client';

import { DataTable } from '@/components/data-table';
import { columns } from '@/components/invoices/columns';
import { useInvoicesStore } from '@/store/invoices';
import { useMemo } from 'react';

export default function Home() {
    const invoices = useInvoicesStore(({ invoices }) => invoices);

    const reversedItems = useMemo(() => invoices.toReversed(), [invoices]);

    return <DataTable columns={columns} data={reversedItems} />;
}
