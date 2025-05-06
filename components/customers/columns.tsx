import { ColumnDef } from '@tanstack/react-table';

export const invoiceColumns: ColumnDef<InvoiceItem>[] = [
    {
        header: 'Description',
        accessorKey: 'description',
    },
    { header: 'Quantity', accessorKey: 'quantity' },
    { header: 'Price/Unit', accessorKey: 'pricePerUnit' },
    { header: 'Unit', accessorKey: 'unit' },
    {
        header: 'Total',
        cell({
            row: {
                original: { quantity, pricePerUnit },
            },
        }) {
            return (
                <div className="w-full text-right">
                    {`${quantity * pricePerUnit}€`}
                </div>
            );
        },
    },
];
