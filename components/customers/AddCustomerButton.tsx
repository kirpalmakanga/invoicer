import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SlidePanel } from '@/components/SlidePanel';
import { CustomerForm } from '@/components/customers/CustomerForm';

export function AddCustomerButton() {
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
                Add customer
            </Button>

            <SlidePanel
                className="sm:max-w-1/2"
                title="Add customer"
                isOpen={isFormOpen}
                onClose={closeForm}
            >
                <CustomerForm onSubmit={closeForm} />
            </SlidePanel>
        </>
    );
}
