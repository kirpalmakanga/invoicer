'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { DataTable } from '@/components/data-table';
import { columns } from '@/components/invoices/columns';
import { useCustomersStore } from '@/store/customers';
import { useInvoicesStore } from '@/store/invoices';
import { sortByKey } from '@/lib/utils';
import H1 from '@/components/atoms/H1';

export default function Home() {
    const invoices = useInvoicesStore(({ invoices }) => invoices);
    const fetchInvoices = useInvoicesStore(
        ({ fetchInvoices }) => fetchInvoices
    );
    const removeBulkInvoices = useInvoicesStore(
        ({ removeBulkInvoices }) => removeBulkInvoices
    );
    const fetchCustomers = useCustomersStore(
        ({ fetchCustomers }) => fetchCustomers
    );

    const sortedInvoices = useMemo(
        () => sortByKey(invoices, 'reference', -1),
        [invoices]
    );

    const handleRemoveSelected = useCallback(
        (indexes: number[]) => {
            const ids = sortedInvoices.reduce((acc: string[], { id }, i) => {
                if (indexes.includes(i)) {
                    acc.push(id);
                }
                return acc;
            }, []);

            removeBulkInvoices(ids);
        },
        [sortedInvoices, removeBulkInvoices]
    );

    useEffect(() => {
        (async () => {
            await fetchCustomers();
            await fetchInvoices();
        })();
    }, []);

    return (
        <>
            <H1 className="mb-4">Invoices</H1>

            <DataTable
                columns={columns}
                data={sortedInvoices}
                onRemoveSelected={handleRemoveSelected}
            />
        </>
    );
}
