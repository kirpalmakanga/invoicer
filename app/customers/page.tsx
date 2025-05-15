'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { customerColumns } from '@/components/customers/columns';
import { DataTable } from '@/components/data-table';
import { useCustomersStore } from '@/store/customers';
import { sortByKey } from '@/lib/utils';
import H1 from '@/components/atoms/H1';

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
        },
        [sortedCustomers, removeBulkCustomers]
    );

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <>
            <H1>Customers</H1>

            <DataTable
                columns={customerColumns}
                data={sortedCustomers}
                onRemoveSelected={handleRemoveSelected}
            />
        </>
    );
}
