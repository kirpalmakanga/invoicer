'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { InvoiceForm } from '@/components/invoices/InvoiceForm';
import { SlidePanel } from '@/components/SlidePanel';

export default function Header() {
    const [isCustomerFormOpen, setIsCustomerFormOpen] = useState<boolean>(true);
    const [isInvoiceFormOpen, setIsInvoiceFormOpen] = useState<boolean>(false);

    function openCustomerForm() {
        setIsCustomerFormOpen(true);
    }

    function closeCustomerForm() {
        setIsCustomerFormOpen(false);
    }

    function openInvoiceForm() {
        setIsInvoiceFormOpen(true);
    }

    function closeInvoiceForm() {
        setIsInvoiceFormOpen(false);
    }

    return (
        <>
            <header className="p-4 flex justify-between items-center container mx-auto">
                <Link className="text-primary font-bold uppercase" href="/">
                    Invoicer
                </Link>

                <div className="flex gap-2">
                    <Button className="h-8" onClick={openCustomerForm}>
                        Add customer
                    </Button>
                    <Button className="h-8" onClick={openInvoiceForm}>
                        Add invoice
                    </Button>
                </div>
            </header>

            <SlidePanel
                className="sm:max-w-1/2"
                title="Add customer"
                isOpen={isCustomerFormOpen}
                onClose={() => setIsCustomerFormOpen(false)}
            >
                <CustomerForm onSubmit={closeCustomerForm} />
            </SlidePanel>

            <SlidePanel
                className="sm:max-w-1/2"
                title="Add invoice"
                isOpen={isInvoiceFormOpen}
                onClose={() => setIsInvoiceFormOpen(false)}
            >
                <InvoiceForm onSubmit={closeInvoiceForm} />
            </SlidePanel>
        </>
    );
}
