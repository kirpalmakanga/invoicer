'use client';
import { FormEventHandler, useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';

import { InvoiceEditForm } from '@/components/InvoiceEditForm';
import { InvoiceTable } from '@/components/InvoiceTable';
import { columns } from '@/components/InvoiceTable/columns';
import { mockInvoices } from '@/mocks/invoices';

interface EditFormState {
    isOpen: boolean;
    formData?: Invoice;
}

export default function Home() {
    const [invoices] = useState<Invoice[]>(mockInvoices);

    const [editFormState, setEditFormState] = useState<EditFormState>({
        isOpen: false,
    });

    const createInvoice = useCallback(
        () => setEditFormState({ isOpen: true }),
        []
    );
    const editInvoice = useCallback(
        (formData: Invoice) => setEditFormState({ isOpen: true, formData }),
        []
    );
    const resetForm = useCallback(
        () => setEditFormState({ isOpen: false, formData: undefined }),
        []
    );

    return (
        <div className="">
            <header className="p-4 flex justify-between items-center container mx-auto">
                <div className="uppercase">Invoicer</div>

                <div>
                    <Button onClick={createInvoice}>Add</Button>
                </div>
            </header>

            <main className="flex flex-col p-4 container mx-auto">
                <InvoiceTable columns={columns} data={invoices} />

                <InvoiceEditForm {...editFormState} onClose={resetForm} />
                {/* {createPortal(, document.body)} */}
            </main>
        </div>
    );
}
