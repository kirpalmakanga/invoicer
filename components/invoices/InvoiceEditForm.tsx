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
import { Combobox, ComboboxItem } from '@/components/ui/combobox';

import { cn } from '@/lib/utils';

interface InvoiceEditFormProps {
    isOpen: boolean;
    formData?: Invoice;
    onClose: () => void;
}

type Inputs = Omit<Invoice, 'id' | 'dateCreated' | 'dateSent'>;

const customerSelectItems = [
    { label: 'ACME Ltd.', value: 'C001' },
    { label: 'Corpo Inc.', value: 'C002' },
    { label: 'The Company', value: 'C003' },
];

const paymentMethodSelectItems: ComboboxItem<PaymentMethod>[] = [
    { label: 'Bank transfer', value: 'Bank transfer' },
    { label: 'Credit card', value: 'Credit card' },
    { label: 'PayPal', value: 'PayPal' },
];

const statusSelectItems: ComboboxItem<InvoiceStatus>[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'Unpaid', value: 'unpaid' },
    { label: 'Paid', value: 'paid' },
];

export function InvoiceEditForm({
    isOpen,
    formData,
    onClose,
}: InvoiceEditFormProps) {
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            invoiceId: '',
            customerId: '',
            items: [],
            paymentMethod: 'Bank transfer',
            status: 'pending',
        },
    });

    const onSubmit: SubmitHandler<Inputs> = (data) => {
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

                <form
                    id="invoiceForm"
                    className="flex flex-col gap-6 px-4"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <Label
                            className={cn(
                                'font-bold mb-1',
                                errors.invoiceId && 'text-red-500'
                            )}
                            htmlFor="invoiceId"
                        >
                            Invoice ID
                        </Label>
                        <Input
                            id="invoiceId"
                            {...register('invoiceId', { required: true })}
                        />
                        {errors.invoiceId && (
                            <span className="text-xs text-red-500">
                                This field is required
                            </span>
                        )}
                    </div>

                    <div>
                        {getValues('customerId')}
                        <Label
                            className={cn(
                                'font-bold mb-1',
                                errors.customerId && 'text-red-500'
                            )}
                            htmlFor="customerId"
                        >
                            Customer
                        </Label>
                        <Combobox
                            selectedValue={getValues('customerId')}
                            items={customerSelectItems}
                            onSelect={(value) => setValue('customerId', value)}
                            {...register('customerId', { required: true })}
                        />
                        {errors.customerId && (
                            <span className="text-xs text-red-500">
                                This field is required
                            </span>
                        )}
                    </div>

                    <div>
                        <Label
                            className={cn(
                                'font-bold mb-1',
                                errors.items && 'text-red-500'
                            )}
                            htmlFor="items"
                        >
                            Items
                        </Label>
                        <Input
                            id="items"
                            {...register('items', { minLength: 1 })}
                        />
                    </div>

                    <div>
                        <Label
                            className={cn(
                                'font-bold mb-1',
                                errors.paymentMethod && 'text-red-500'
                            )}
                            htmlFor="paymentMethod"
                        >
                            Payment method
                        </Label>
                        <Combobox
                            selectedValue={getValues('paymentMethod')}
                            items={paymentMethodSelectItems}
                            onSelect={(value) =>
                                setValue('paymentMethod', value)
                            }
                            {...register('paymentMethod', { required: true })}
                        />
                        {errors.paymentMethod && (
                            <span className="text-xs text-red-500">
                                This field is required
                            </span>
                        )}
                    </div>

                    <div>
                        <Label
                            className={cn(
                                'font-bold mb-1',
                                errors.status && 'text-red-500'
                            )}
                            htmlFor="status"
                        >
                            Status
                        </Label>
                        <Combobox
                            selectedValue={getValues('status')}
                            items={statusSelectItems}
                            onSelect={(value) => setValue('status', value)}
                            {...register('status', { required: true })}
                        />
                        {errors.status && (
                            <span className="text-xs text-red-500">
                                This field is required
                            </span>
                        )}
                    </div>
                </form>

                <SheetFooter className="items-end">
                    <Button type="submit" form="invoiceForm">
                        Save
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
