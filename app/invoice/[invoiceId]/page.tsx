'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import H1 from '@/components/atoms/H1';
import H2 from '@/components/atoms/H2';
import { NotFound } from '@/components/NotFound';
import { useInvoicesStore } from '@/store/invoices';
import { useCustomersStore } from '@/store/customers';
import { DataTable } from '@/components/data-table';
import { CustomerInfo } from '@/components/customers/CustomerInfo';
import { Badge } from '@/components/ui/badge';
import { Clock, Send } from 'lucide-react';
import { invoiceColumns } from '@/components/invoices/columns';

/** TODO: use simpler table, icon for badge (in table cell too), create StatusBadge (set colors in component) */

export default function Invoice() {
    const { invoiceId } = useParams<{ invoiceId: string }>();

    const invoices = useInvoicesStore(({ invoices }) => invoices);
    const customers = useCustomersStore(({ customers }) => customers);

    const invoice = useMemo(
        () => invoices.find(({ id }) => id === invoiceId),
        [invoices]
    );

    const customer = useMemo(() => {
        if (invoice) {
            return customers.find(({ id }) => id === invoice.customerId);
        }
    }, [invoice]);

    return invoice ? (
        <>
            <H1 className="flex items-center gap-2 mb-4">
                <span>{invoiceId}</span>
                <Badge>{invoice.status}</Badge>
            </H1>

            <p className="flex items-center gap-2 mb-4">
                <Clock /> {invoice.dateCreated}
            </p>

            {invoice.dateSent ? (
                <p className="flex items-center gap-2 mb-4">
                    <Send /> {invoice.dateSent}
                </p>
            ) : null}

            <p className="mb-4">Payment method: {invoice.paymentMethod}</p>

            {customer ? (
                <>
                    <H2 className="mb-4">Customer</H2>

                    <p className="mb-4">{customer.name}</p>

                    <CustomerInfo {...customer} />
                </>
            ) : null}

            <H2 className="mt-8 mb-2">Details</H2>

            <DataTable columns={invoiceColumns} data={invoice.items} />
        </>
    ) : (
        <NotFound />
    );
}
