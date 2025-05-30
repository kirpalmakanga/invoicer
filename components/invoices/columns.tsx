import { useCallback, useState } from 'react';
import Link from 'next/link';
import { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash, MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
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
import { InvoiceStatusBadge } from '@/components/invoices/InvoiceStatusBadge';
import { SlidePanel } from '@/components/SlidePanel';
import { useInvoicesStore } from '@/store/invoices';
import { useCustomersStore } from '@/store/customers';
import { getInvoiceTotal, paymentMethodsById } from '@/lib/invoices';
import { toast } from 'sonner';
import Prompt from '../Prompt';
import { formatDate } from '@/lib/dates';

function InvoiceCustomerLink({ customerId }: { customerId: string }) {
    const customer = useCustomersStore(({ customers }) =>
        customers.find(({ id }) => id === customerId)
    );

    if (customer) {
        return <Link href={`/customer/${customerId}`}>{customer.name}</Link>;
    }

    return 'Customer not found';
}

function InvoiceMenu({ invoice }: { invoice: Invoice }) {
    const removeInvoice = useInvoicesStore(
        ({ removeInvoice }) => removeInvoice
    );

    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    const openForm = useCallback(() => setIsFormOpen(true), []);

    const closeForm = useCallback(() => setIsFormOpen(false), []);

    const [isRemovalPromptOpen, setIsRemovalPromptOpen] =
        useState<boolean>(false);

    const openRemovalPrompt = useCallback(
        () => setIsRemovalPromptOpen(true),
        []
    );

    const closeRemovalPrompt = useCallback(
        () => setIsRemovalPromptOpen(false),
        []
    );

    const handleRemoveInvoice = useCallback(() => {
        const { id, reference } = invoice;

        removeInvoice(id);

        toast.success(`Removed invoice: ${reference}`);
    }, [invoice]);

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
                        onClick={openRemovalPrompt}
                    >
                        <Trash className="text-current" />
                        Delete invoice
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <SlidePanel
                className="sm:max-w-1/2"
                title="Edit invoice"
                isOpen={isFormOpen}
                onClose={closeForm}
            >
                <InvoiceForm invoice={invoice} onSubmit={closeForm} />
            </SlidePanel>

            <Prompt
                isOpen={isRemovalPromptOpen}
                title={`Delete invoice ${invoice.reference} ?`}
                description="This action cannot be undone"
                confirmLabel="Delete"
                onSubmit={handleRemoveInvoice}
                onClose={closeRemovalPrompt}
            />
        </>
    );
}

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
        id: 'customer',
        accessorKey: 'customerId',
        meta: 'Customer',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Customer" />
        ),
        cell: ({
            row: {
                original: { customerId },
            },
        }) => <InvoiceCustomerLink customerId={customerId} />,
    },

    {
        meta: 'Payment method',
        accessorKey: 'paymentMethod',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Payment method" />
        ),
        cell: ({
            row: {
                original: { paymentMethod },
            },
        }) => paymentMethodsById[paymentMethod],
    },
    {
        meta: 'Status',
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
        }) => <InvoiceStatusBadge status={status} />,
    },
    {
        meta: 'Payment date',
        accessorKey: 'datePaid',
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Payment date"
                className="bg-red"
            />
        ),
        cell: ({
            row: {
                original: { datePaid },
            },
        }) => (datePaid ? formatDate(datePaid, 'medium') : ''),
    },
    {
        header: 'Amount',
        meta: 'Amount',
        cell: ({ row: { original } }) => (
            <div className="w-full text-right">
                {`${getInvoiceTotal(original)}€`}
            </div>
        ),
    },
    {
        id: 'actions',
        cell: ({ row: { original } }) => <InvoiceMenu invoice={original} />,
    },
];

export const customerColumns = columns.filter(({ id }) => id !== 'customer');
