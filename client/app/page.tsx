'use client';

import { useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { DataTable } from '@/components/data-table';
import { columns } from '@/components/invoices/columns';
import { useCustomersStore } from '@/store/customers';
import { useInvoicesStore } from '@/store/invoices';
import H1 from '@/components/atoms/H1';
import { AddInvoiceButton } from '@/components/invoices/AddInvoiceButton';

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

    const handleRemoveSelected = useCallback(
        (indexes: number[]) => {
            const ids = invoices.reduce((acc: string[], { id }, i) => {
                if (indexes.includes(i)) {
                    acc.push(id);
                }
                return acc;
            }, []);

            removeBulkInvoices(ids);

            toast.success(`${indexes.length} invoices removed.`);
        },
        [invoices, removeBulkInvoices]
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

            <div className="flex justify-end gap-4">
                <AddInvoiceButton />
            </div>

            <DataTable
                columns={columns}
                data={invoices}
                onRemoveSelected={handleRemoveSelected}
            />
        </>
    );
}
