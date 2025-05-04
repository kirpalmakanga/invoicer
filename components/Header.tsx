'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InvoiceForm } from '@/components/invoices/InvoiceForm';
import Link from 'next/link';
import { SlidePanel } from './SlidePanel';

export default function Header() {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(true);

    return (
        <>
            <header className="p-4 flex justify-between items-center container mx-auto">
                <Link className="font-bold uppercase" href="/">
                    Invoicer
                </Link>

                <div>
                    <Button onClick={() => setIsFormOpen(true)}>Add</Button>
                </div>
            </header>

            <SlidePanel
                title="Add invoice"
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
            >
                <InvoiceForm />
            </SlidePanel>
        </>
    );
}
