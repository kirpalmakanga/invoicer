import { useState } from 'react';
import Link from 'next/link';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '../ui/checkbox';
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
import { useCustomersStore } from '@/store/customers';

function CustomerMenu({ customer }: { customer: Customer }) {
    const removeCustomer = useCustomersStore(
        ({ removeCustomer }) => removeCustomer
    );

    const [{ isFormOpen, formData }, setFormState] = useState<{
        isFormOpen: boolean;
        formData?: Customer;
    }>({ isFormOpen: false });

    function openForm() {
        setFormState({
            isFormOpen: true,
            formData: customer,
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
                        onClick={() => removeCustomer(customer.id)}
                    >
                        <Trash className="text-red-500 fill-current" />
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
                <CustomerForm formData={formData} onSubmit={closeForm} />
            </SlidePanel>
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
