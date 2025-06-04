import { getInvoiceItemTotal } from '@/lib/invoices';
import { ColumnDef } from '@tanstack/react-table';

export const invoiceItemColumns: ColumnDef<InvoiceItem>[] = [
    {
        header: 'Description',
        accessorKey: 'description',
    },
    { header: 'Quantity', accessorKey: 'quantity' },
    { header: 'Price/Unit', accessorKey: 'pricePerUnit' },
    { header: 'Unit', accessorKey: 'unit' },
    {
        header: 'Total',
        cell({ row: { original } }) {
            return (
                <div className="w-full text-right">
                    {`${getInvoiceItemTotal(original)}€`}
                </div>
            );
        },
    },
];
