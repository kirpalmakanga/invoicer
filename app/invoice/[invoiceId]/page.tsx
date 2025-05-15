'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import H1 from '@/components/atoms/H1';
import H2 from '@/components/atoms/H2';
import { NotFound } from '@/components/NotFound';
import { useInvoicesStore } from '@/store/invoices';
import { useCustomersStore } from '@/store/customers';
import { CustomerInfo } from '@/components/customers/CustomerInfo';
import { Badge } from '@/components/ui/badge';
import { Clock, Send } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getInvoiceTotal } from '@/lib/invoices';

/** TODO: use simpler table, icon for badge (in table cell too), create StatusBadge (set colors in component) */

export default function Invoice() {
    const { invoiceId } = useParams<{ invoiceId: string }>();

    const invoices = useInvoicesStore(({ invoices }) => invoices);
    const customers = useCustomersStore(({ customers }) => customers);

    const fetchSingleInvoice = useInvoicesStore(
        ({ fetchSingleInvoice }) => fetchSingleInvoice
    );

    const fetchSingleCustomer = useCustomersStore(
        ({ fetchSingleCustomer }) => fetchSingleCustomer
    );

    const invoice = useMemo(
        () => invoices.find(({ id }) => id === invoiceId),
        [invoices, invoiceId]
    );

    const customer = useMemo(() => {
        if (invoice) {
            return customers.find(({ id }) => id === invoice.customerId);
        }
    }, [invoice, customers]);

    const total = useMemo(
        () => (invoice ? getInvoiceTotal(invoice) : 0),
        [invoice]
    );

    useEffect(() => {
        fetchSingleInvoice(invoiceId);
    }, [invoiceId, fetchSingleInvoice]);

    useEffect(() => {
        if (invoice) {
            fetchSingleCustomer(invoice.customerId);
        }
    }, [invoice]);

    return invoice ? (
        <>
            <div className="grid grid-cols-2">
                <div>
                    <H1 className="flex items-center gap-2 mb-4">
                        <span>Invoice n° {invoice.reference}</span>
                        <Badge>{invoice.status}</Badge>
                    </H1>

                    {/* <p className="flex items-center gap-2 mb-4">
                        <Clock /> {invoice.dateCreated}
                    </p>

                    {invoice.dateSent ? (
                        <p className="flex items-center gap-2 mb-4">
                            <Send /> {invoice.dateSent}
                        </p>
                    ) : null} */}

                    <p className="mb-4">
                        Payment method: {invoice.paymentMethod}
                    </p>
                </div>

                {customer ? (
                    <div>
                        <H2 className="mb-4">Customer</H2>

                        <p className="mb-4">
                            <Link href={`/customer/${customer.id}`}>
                                {customer.name}
                            </Link>
                        </p>

                        <CustomerInfo {...customer} />
                    </div>
                ) : null}
            </div>

            <H2 className="mt-8 mb-2">Details</H2>

            <div className="border-1 rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold">
                                Description
                            </TableHead>
                            <TableHead className="font-bold">
                                Quantity
                            </TableHead>
                            <TableHead className="font-bold">
                                Price/Unit
                            </TableHead>
                            <TableHead className="font-bold">Unit</TableHead>
                            <TableHead className="font-bold text-right">
                                Total
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {invoice.items.map(
                            (
                                { description, quantity, pricePerUnit, unit },
                                index
                            ) => (
                                <TableRow key={index}>
                                    <TableCell>{description}</TableCell>
                                    <TableCell>{quantity}</TableCell>
                                    <TableCell>{pricePerUnit}</TableCell>
                                    <TableCell>{unit}</TableCell>
                                    <TableCell className="text-right">
                                        {quantity * pricePerUnit}€
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                        <TableRow>
                            <TableCell
                                className="text-right"
                                colSpan={4}
                            ></TableCell>
                            <TableCell className="text-right">
                                <span className="font-bold">Total: </span>
                                {total}€
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </>
    ) : (
        <NotFound />
    );
}
