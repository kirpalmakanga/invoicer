import { useState } from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash, MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTableColumnHeader } from '@/components/data-table/column-header';
import { InvoiceEditForm } from '@/components/InvoiceEditForm';

export const columns: ColumnDef<Invoice>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: 'invoiceId',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({
            row: {
                original: { invoiceId },
            },
        }) => <Link href={`/invoice/${invoiceId}`}>{invoiceId}</Link>,
        enableHiding: false,
    },
    {
        id: 'customer ID',
        accessorKey: 'customerId',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Customer" />
        ),
        cell: ({
            row: {
                original: { customerId },
            },
        }) => <Link href={`/customer/${customerId}`}>{customerId}</Link>,
    },

    {
        id: 'payment method',
        accessorKey: 'paymentMethod',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Payment method" />
        ),
        cell: ({
            row: {
                original: { paymentMethod },
            },
        }) => paymentMethod,
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({
            row: {
                original: { status },
            },
        }) => <Badge>{status}</Badge>,
    },
    {
        header: 'Amount',
        cell: ({
            row: {
                original: { items },
            },
        }) =>
            items.reduce(
                (acc, { amount, pricePerUnit }) => acc + amount * pricePerUnit,
                0
            ),
    },
    {
        id: 'actions',
        cell: ({ row: { original } }) => {
            const [formState, setFormState] = useState<{
                isOpen: boolean;
                formData?: Invoice;
            }>({ isOpen: false });

            return (
                <>
                    {' '}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() =>
                                    setFormState({
                                        isOpen: true,
                                        formData: original,
                                    })
                                }
                            >
                                <Edit /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-500">
                                <Trash className="text-red-500 fill-current" />
                                Delete invoice
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <InvoiceEditForm
                        {...formState}
                        onClose={() =>
                            setFormState({ isOpen: false, formData: undefined })
                        }
                    />
                </>
            );
        },
    },
];

export const customerColumns = columns.filter(
    ({ accessorKey }) => accessorKey !== 'customerId'
);
