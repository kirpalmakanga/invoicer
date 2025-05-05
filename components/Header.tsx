'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { InvoiceForm } from '@/components/invoices/InvoiceForm';
import { SlidePanel } from '@/components/SlidePanel';

export default function Header() {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(true);

    function openForm() {
        setIsFormOpen(true);
    }

    function closeForm() {
        setIsFormOpen(false);
    }

    return (
        <>
            <header className="p-4 flex justify-between items-center container mx-auto">
                <Link className="font-bold uppercase" href="/">
                    Invoicer
                </Link>

                <Button onClick={openForm}>Add</Button>
            </header>

            <SlidePanel
                title="Add invoice"
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
            >
                <InvoiceForm onSubmit={closeForm} />
            </SlidePanel>
        </>
    );
}
