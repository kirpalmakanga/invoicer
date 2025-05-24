'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { customerColumns } from '@/components/customers/columns';
import { DataTable } from '@/components/data-table';
import { useCustomersStore } from '@/store/customers';
import H1 from '@/components/atoms/H1';
import { AddCustomerButton } from '@/components/customers/AddCustomerButton';
import { sortByKey } from '@/lib/utils';

export default function Customers() {
    const customers = useCustomersStore(({ customers }) => customers);

    const sortedCustomers = useMemo(
        () => sortByKey(customers, 'name'),
        [customers]
    );

    const fetchCustomers = useCustomersStore(
        ({ fetchCustomers }) => fetchCustomers
    );

    const removeBulkCustomers = useCustomersStore(
        ({ removeBulkCustomers }) => removeBulkCustomers
    );

    const handleRemoveSelected = useCallback(
        (indexes: number[]) => {
            const ids = sortedCustomers.reduce((acc: string[], { id }, i) => {
                if (indexes.includes(i)) {
                    acc.push(id);
                }
                return acc;
            }, []);

            removeBulkCustomers(ids);

            toast.success(`${indexes.length} invoices removed.`);
        },
        [sortedCustomers, removeBulkCustomers]
    );

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <>
            <H1>Customers</H1>

            <div className="flex justify-end gap-4">
                <AddCustomerButton />
            </div>

            <DataTable
                columns={customerColumns}
                data={sortedCustomers}
                onRemoveSelected={handleRemoveSelected}
            />
        </>
    );
}
