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
import { InvoiceForm } from '@/components/invoices/InvoiceForm';
import { SlidePanel } from '@/components/SlidePanel';
import { useInvoicesStore } from '@/store/invoices';
import { useCustomersStore } from '@/store/customers';

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
        accessorKey: 'reference',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID" />
        ),
        cell: ({
            row: {
                original: { id, reference },
            },
        }) => <Link href={`/invoice/${id}`}>{reference}</Link>,
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
        }) => {
            const customer = useCustomersStore(({ customers }) =>
                customers.find(({ id }) => id === customerId)
            );

            if (customer) {
                return (
                    <Link href={`/customer/${customerId}`}>
                        {customer.name}
                    </Link>
                );
            }

            return 'Customer not found';
        },
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
            <DataTableColumnHeader
                column={column}
                title="Status"
                className="bg-red"
            />
        ),
        cell: ({
            row: {
                original: { status },
            },
        }) => {
            let badgeColor = '';

            switch (status) {
                case 'paid':
                    badgeColor = 'bg-green-500 text-zinc-100';
                    break;

                case 'unpaid':
                    badgeColor = 'bg-red-500 text-zinc-100';
                    break;

                default:
                    badgeColor = 'bg-blue-500 text-zinc-100';
                    break;
            }

            return <Badge className={badgeColor}>{status}</Badge>;
        },
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
            const removeInvoice = useInvoicesStore(
                ({ removeInvoice }) => removeInvoice
            );

            const [{ isFormOpen, formData }, setFormState] = useState<{
                isFormOpen: boolean;
                formData?: Invoice;
            }>({ isFormOpen: false });

            function openForm() {
                setFormState({
                    isFormOpen: true,
                    formData: original,
                });
            }

            function closeForm() {
                setFormState({
                    isFormOpen: false,
                    formData: undefined,
                });
            }

            return (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={openForm}>
                                <Edit /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-red-500"
                                onClick={() => removeInvoice(original.id)}
                            >
                                <Trash className="text-red-500 fill-current" />
                                Delete invoice
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <SlidePanel
                        title="Edit invoice"
                        isOpen={isFormOpen}
                        onClose={closeForm}
                    >
                        <InvoiceForm formData={formData} onSubmit={closeForm} />
                    </SlidePanel>
                </>
            );
        },
    },
];

export const customerColumns = columns.filter(
    ({ accessorKey }) => accessorKey !== 'customerId'
);
