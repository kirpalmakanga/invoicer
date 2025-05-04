'use client';

import { DataTable } from '@/components/data-table';
import { columns } from '@/components/invoices/columns';
import { useInvoicesStore } from '@/store/invoices';

export default function Home() {
    const invoices = useInvoicesStore(({ invoices }) => invoices);

    return <DataTable columns={columns} data={invoices} />;
}
