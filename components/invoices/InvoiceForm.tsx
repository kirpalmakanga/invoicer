'use client';

import { useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Combobox, ComboboxItem } from '@/components/ui/combobox';

import { cn, omit } from '@/lib/utils';
import { useInvoicesStore } from '@/store/invoices';
import { useCustomersStore } from '@/store/customers';
interface InvoiceEditFormProps {
    formData?: Invoice;
    onSubmit: () => void;
}

type InvoiceFormData = Omit<Invoice, 'dateCreated' | 'dateSent'>;

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

export function InvoiceForm({ formData, onSubmit }: InvoiceEditFormProps) {
    const customers = useCustomersStore(({ customers }) => customers);
    const { addInvoice, updateInvoice } = useInvoicesStore.getState();

    const customerSelectItems = useMemo(
        () => customers.map(({ id: value, name: label }) => ({ label, value })),
        [customers]
    );

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<InvoiceFormData>({
        defaultValues: {
            id: '',
            customerId: '',
            items: [],
            paymentMethod: 'Bank transfer',
            status: 'pending',
            ...(formData && omit(formData, 'id', 'dateCreated', 'dateSent')),
        },
    });

    const submit: SubmitHandler<InvoiceFormData> = (data) => {
        if (formData?.id) {
            updateInvoice(data);
        } else {
            addInvoice({
                ...data,
                id: crypto.randomUUID(),
                dateCreated: Date.now(),
            });
        }

        onSubmit();
    };

    return (
        <form
            id="invoiceForm"
            className="flex flex-col grow px-4"
            onSubmit={handleSubmit(submit)}
        >
            <div className="flex flex-col grow gap-6">
                <div>
                    <Label
                        className={cn(
                            'font-bold mb-1',
                            errors.id && 'text-red-500'
                        )}
                        htmlFor="id"
                    >
                        Invoice ID
                    </Label>
                    <Input id="id" {...register('id', { required: true })} />
                    {errors.id && (
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
