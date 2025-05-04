'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Combobox, ComboboxItem } from '@/components/ui/combobox';

import { cn, omit } from '@/lib/utils';
import { useInvoicesStore } from '@/store/invoices';

interface InvoiceEditFormProps {
    formData?: Invoice;
}

type InvoiceFormData = Omit<Invoice, 'id' | 'dateCreated' | 'dateSent'>;

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

export function InvoiceForm({ formData }: InvoiceEditFormProps) {
    const { addInvoice, updateInvoice } = useInvoicesStore.getState();

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<InvoiceFormData>({
        defaultValues: {
            invoiceId: '',
            customerId: '',
            items: [],
            paymentMethod: 'Bank transfer',
            status: 'pending',
            ...(formData && omit(formData, 'id', 'dateCreated', 'dateSent')),
        },
    });

    const onSubmit: SubmitHandler<InvoiceFormData> = (data) => {
        // onClose();

        if (formData?.id) {
            updateInvoice(data);
        } else {
            addInvoice({
                ...data,
                id: crypto.randomUUID(),
                dateCreated: Date.now(),
            });
        }
    };

    return (
        <form
            id="invoiceForm"
            className="flex flex-col grow gap-6 px-4"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="grow">
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
                        onSelect={(value) => setValue('paymentMethod', value)}
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
            </div>

            <div className="flex justify-end pb-4">
                <Button type="submit" form="invoiceForm">
                    Save
                </Button>
            </div>
        </form>
    );
}
