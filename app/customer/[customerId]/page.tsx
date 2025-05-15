'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { DataTable } from '@/components/data-table';
import { customerColumns } from '@/components/invoices/columns';
import H1 from '@/components/atoms/H1';
import H2 from '@/components/atoms/H2';
import { CustomerInfo } from '@/components/customers/CustomerInfo';
import { NotFound } from '@/components/NotFound';
import { useInvoicesStore } from '@/store/invoices';
import { useCustomersStore } from '@/store/customers';

export default function Customer() {
    const { customerId } = useParams<{ customerId: string }>();
    const customers = useCustomersStore(({ customers }) => customers);
    const invoices = useInvoicesStore(({ invoices }) => invoices);

    const customer = useMemo(
        () => customers.find(({ id }) => id === customerId),
        [customers, customerId]
    );

    const customerInvoices = useMemo(
        () =>
            invoices.filter(
                ({ customerId: itemCustomerId }) =>
                    itemCustomerId === customerId
            ),
        [invoices, customerId]
    );

    return customer ? (
        <>
            <H1 className="mb-4">{customer.name}</H1>

            <CustomerInfo {...customer} />

            <H2 className="mt-8 mb-2">Invoice history</H2>

            <DataTable columns={customerColumns} data={customerInvoices} />
        </>
    ) : (
        <NotFound />
    );
}
