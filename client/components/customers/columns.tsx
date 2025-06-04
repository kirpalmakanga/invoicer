import { useCallback, useState } from 'react';
import Link from 'next/link';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/data-table/column-header';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { SlidePanel } from '@/components/SlidePanel';
import Prompt from '@/components/Prompt';
import { useCustomersStore } from '@/store/customers';

function CustomerMenu({ customer }: { customer: Customer }) {
    const removeCustomer = useCustomersStore(
        ({ removeCustomer }) => removeCustomer
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

    const handleRemoveCustomer = useCallback(() => {
        const { id, name } = customer;

        removeCustomer(id);

        toast.success(`Removed customer: ${name}`);
    }, [customer]);

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
                        Delete customer
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <SlidePanel
                className="sm:max-w-1/2"
                title="Edit customer"
                isOpen={isFormOpen}
                onClose={closeForm}
            >
                <CustomerForm customer={customer} onSubmit={closeForm} />
            </SlidePanel>

            <Prompt
                isOpen={isRemovalPromptOpen}
                title={`Delete customer ${customer.name} ?`}
                description="This action cannot be undone"
                confirmLabel="Delete"
                onSubmit={handleRemoveCustomer}
                onClose={closeRemovalPrompt}
            />
        </>
    );
}

export const customerColumns: ColumnDef<Customer>[] = [
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
        accessorKey: 'name',
        meta: 'Name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({
            row: {
                original: { id, name },
            },
        }) => <Link href={`/customer/${id}`}>{name}</Link>,
        enableHiding: false,
    },
    {
        accessorKey: 'email',
        meta: 'Email',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Email" />
        ),
        cell: ({
            row: {
                original: { email },
            },
        }) => <a href={`mailto:${email}`}>{email}</a>,
    },
    {
        accessorKey: 'tel',
        meta: 'Telephone',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Telephone" />
        ),
        cell: ({
            row: {
                original: { tel },
            },
        }) => <a href={`mailto:${tel}`}>{tel}</a>,
    },
    {
        accessorKey: 'address',
        meta: 'Address',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Address" />
        ),
    },
    {
        id: 'actions',
        cell: ({ row: { original } }) => <CustomerMenu customer={original} />,
    },
];
