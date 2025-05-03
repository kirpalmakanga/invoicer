import { useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
interface InvoiceEditFormProps {
    isOpen: boolean;
    formData?: Invoice;
    onClose: () => void;
}

type Inputs = Omit<Invoice, 'id' | 'dateCreated' | 'dateSent'>;

export function InvoiceEditForm({
    isOpen,
    formData,
    onClose,
}: InvoiceEditFormProps) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit = (data) => {
        console.log(data);

        // onClose();
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <SheetHeader className="border-b-2">
                    <SheetTitle>
                        {formData ? 'Edit invoice' : 'Create invoice'}
                    </SheetTitle>
                </SheetHeader>
                {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}

                <form
                    id="invoiceForm"
                    className="flex flex-col gap-8 px-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <Label className="font-bold mb-1" htmlFor="invoiceId">
                            Invoice ID
                        </Label>
                        <Input id="invoiceId" {...register('invoiceId')} />
                    </div>

                    <div>
                        <Label className="font-bold mb-1" htmlFor="customerId">
                            Customer
                        </Label>
                        <Input id="customerId" {...register('customerId')} />
                    </div>

                    <div>
                        <Label className="font-bold mb-1" htmlFor="items">
                            Items
                        </Label>
                        <Input id="items" {...register('items')} />
                    </div>

                    <div>
                        <Label
                            className="font-bold mb-1"
                            htmlFor="paymentMethod"
                        >
                            Payment method
                        </Label>
                        <Input
                            id="paymentMethod"
                            {...register('paymentMethod')}
                        />
                    </div>

                    <div>
                        <Label className="font-bold mb-1" htmlFor="status">
                            Status
                        </Label>
                        <Input id="status" {...register('status')} />
                    </div>
                </form>

                <SheetFooter>
                    <Button type="submit" form="invoiceForm">
                        Save
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
