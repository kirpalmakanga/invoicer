import { ColumnDef } from '@tanstack/react-table';

export const invoiceColumns: ColumnDef<InvoiceItem>[] = [
    {
        header: 'Description',
        accessorKey: 'description',
    },
    { header: 'Quantity', accessorKey: 'amount' },
    { header: 'Price/Unit', accessorKey: 'pricePerUnit' },
    { header: 'Unit', accessorKey: 'unit' },
    {
        header: 'Total',
        cell({
            row: {
                original: { amount, pricePerUnit, unit },
            },
        }) {
            return (
                <div className="w-full text-right">
                    {`${amount * pricePerUnit}€`}
                </div>
            );
        },
    },
];
