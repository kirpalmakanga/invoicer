import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SlidePanel } from '@/components/SlidePanel';
import { InvoiceForm } from '@/components/invoices/InvoiceForm';

export function AddInvoiceButton() {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    const openForm = useCallback(() => {
        setIsFormOpen(true);
    }, []);

    const closeForm = useCallback(() => {
        setIsFormOpen(false);
    }, []);

    return (
        <>
            <Button className="h-8" onClick={openForm}>
                Add invoice
            </Button>

            <SlidePanel
                className="sm:max-w-1/2"
                title="Add invoice"
                isOpen={isFormOpen}
                onClose={closeForm}
            >
                <InvoiceForm onSubmit={closeForm} />
            </SlidePanel>
        </>
    );
}
