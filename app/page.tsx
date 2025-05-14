'use client';

import { DataTable } from '@/components/data-table';
import { columns } from '@/components/invoices/columns';
import { useInvoicesStore } from '@/store/invoices';
import { useCallback, useEffect, useMemo } from 'react';

export default function Home() {
    const invoices = useInvoicesStore(({ invoices }) => invoices);
    const fetchInvoices = useInvoicesStore(
        ({ fetchInvoices }) => fetchInvoices
    );
    const removeBulkInvoices = useInvoicesStore(
        ({ removeBulkInvoices }) => removeBulkInvoices
    );

    const reversedItems = useMemo(() => invoices.toReversed(), [invoices]);

    const handleRemoveSelected = useCallback(
        (indexes: number[]) => {
            const ids = reversedItems.reduce((acc: string[], { id }, i) => {
                if (indexes.includes(i)) {
                    acc.push(id);
                }
                return acc;
            }, []);

            removeBulkInvoices(ids);
        },
        [reversedItems, removeBulkInvoices]
    );

    useEffect(() => {
        fetchInvoices();
    }, []);

    return (
        <DataTable
            columns={columns}
            data={reversedItems}
            onRemoveSelected={handleRemoveSelected}
        />
    );
}
