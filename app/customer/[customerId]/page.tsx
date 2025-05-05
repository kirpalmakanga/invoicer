'use client';

import { useMemo } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useParams } from 'next/navigation';
import { DataTable } from '@/components/data-table';
import { customerColumns } from '@/components/invoices/columns';
import H1 from '@/components/atoms/H1';
import H2 from '@/components/atoms/H2';
import { NotFound } from '@/components/NotFound';
import { useInvoicesStore } from '@/store/invoices';
import { useCustomersStore } from '@/store/customers';

export default function Customer() {
    const { customerId } = useParams<{ customerId: string }>();
    const customers = useCustomersStore(({ customers }) => customers);
    const invoices = useInvoicesStore(({ invoices }) => invoices);

    const customer = useMemo(
        () => customers.find(({ id }) => id === customerId),
        [customers]
    );

    const customerInvoices = useMemo(
        () =>
            invoices.filter(
                ({ customerId: itemCustomerId }) =>
                    itemCustomerId === customerId
            ),
        [invoices]
    );

    return customer ? (
        <>
            <H1 className="mb-4">{customer.name}</H1>

            <div className="flex flex-col gap-4">
                <p className="flex items-center gap-2">
                    <MapPin />
                    <span>{customer.address}</span>
                </p>

                <p className="flex items-center gap-2">
                    <Phone />
                    <a href={`tel:${customer.tel}`}>{customer.tel}</a>
                </p>

                <p className="flex items-center gap-2">
                    <Mail />
                    <a href={`mailto:${customer.email}`}>{customer.email}</a>
                </p>
            </div>

            <H2 className="mt-8 mb-2">Invoice history</H2>

            <DataTable columns={customerColumns} data={customerInvoices} />
        </>
    ) : (
        <NotFound />
    );
}
