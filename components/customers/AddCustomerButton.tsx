import { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SlidePanel } from '@/components/SlidePanel';
import { CustomerForm } from '@/components/customers/CustomerForm';

export function AddCustomerButton({
    onCreated,
}: {
    onCreated?: (customer: Customer) => void;
}) {
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

    const openForm = useCallback(() => {
        setIsFormOpen(true);
    }, []);

    const closeForm = useCallback(() => {
        setIsFormOpen(false);
    }, []);

    const handleSubmit = useCallback((customer?: Customer) => {
        if (customer && onCreated) {
            onCreated(customer);
        }

        closeForm();
    }, []);

    return (
        <>
            <Button className="h-8" type="button" onClick={openForm}>
                Add customer
            </Button>

            <SlidePanel
                className="sm:max-w-1/2"
                title="Add customer"
                isOpen={isFormOpen}
                onClose={closeForm}
            >
                <CustomerForm onSubmit={handleSubmit} />
            </SlidePanel>
        </>
    );
}
