'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { mockInvoices } from '@/mocks/invoices';
import { DataTable } from '@/components/data-table';
import { customerColumns } from '@/components/invoices/columns';
import H1 from '@/components/atoms/H1';
import H2 from '@/components/atoms/H2';

export default function Customer() {
    const { customerId } = useParams<{ customerId: string }>();
    const [invoices] = useState<Invoice[]>(mockInvoices);

    return (
        <>
            <H1 className="mb-2">Customer {customerId}</H1>

            <div className="flex flex-col gap-1">
                <p>Address: 1 rue Jean Dubois</p>
                <p>Postcode: 87000</p>
                <p>City: Limoges</p>
                <p>Country: France</p>
            </div>

            <H2 className="mt-8 mb-2">Invoice history</H2>

            <DataTable
                columns={customerColumns}
                data={invoices.filter(
                    ({ customerId: itemCustomerId }) =>
                        itemCustomerId === customerId
                )}
            />
        </>
    );
}
