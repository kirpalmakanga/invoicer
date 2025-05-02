'use client';

import { useState } from 'react';

import { mockInvoices } from '@/mocks/invoices';
import { DataTable } from '@/components/data-table';
import { columns } from '@/components/invoices/columns';

export default function Home() {
    const [invoices] = useState<Invoice[]>(mockInvoices);

    return <DataTable columns={columns} data={invoices} />;
}
