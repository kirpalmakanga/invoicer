'use client';

import { useMemo } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Combobox, ComboboxItem } from '@/components/ui/combobox';
import { InvoiceItemInput } from '@/components/invoices/InvoiceItemInput';

import { useSettingsStore } from '@/store/settings';
import { useCustomersStore } from '@/store/customers';
import { useInvoicesStore } from '@/store/invoices';

import { cn, getCurrentYear, omit } from '@/lib/utils';
interface InvoiceEditFormProps {
    formData?: Invoice;
    onSubmit: () => void;
}

const paymentMethodSelectItems: ComboboxItem<PaymentMethod>[] = [
    { label: 'Bank transfer', value: 'bankTransfer' },
    { label: 'Credit card', value: 'creditCard' },
    { label: 'PayPal', value: 'payPal' },
];

const statusSelectItems: ComboboxItem<InvoiceStatus>[] = [
    { label: 'Pending', value: 'pending' },
    { label: 'Unpaid', value: 'unpaid' },
    { label: 'Paid', value: 'paid' },
];

export function InvoiceForm({ formData, onSubmit }: InvoiceEditFormProps) {
    const invoicePrefix = useSettingsStore(
        ({ invoicePrefix }) => `${invoicePrefix}${getCurrentYear()}`
    );
    const customers = useCustomersStore(({ customers }) => customers);
    const addInvoice = useInvoicesStore(({ addInvoice }) => addInvoice);
    const updateInvoice = useInvoicesStore(
        ({ updateInvoice }) => updateInvoice
    );

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
        defaultValues: formData
            ? formData
            : {
                  reference: invoicePrefix,
                  customerId: '',
                  items: [
                      {
                          description: '',
                          quantity: 0,
                          pricePerUnit: 0,
                          unit: 'hour',
                      },
                  ],
                  paymentMethod: 'bankTransfer',
                  status: 'pending',
              },
    });

    const submit: SubmitHandler<InvoiceFormData> = (data) => {
        if (formData) {
            updateInvoice(formData.id, data);
        } else {
            addInvoice(data);
        }

        onSubmit();
    };

    return (
        <form
            className="flex flex-col grow px-4"
            onSubmit={handleSubmit(submit)}
        >
            <div className="flex flex-col grow gap-6">
                <div>
                    <Label
                        className={cn(
                            'font-bold mb-1',
                            errors.reference && 'text-red-500'
                        )}
                        htmlFor="reference"
                    >
                        Invoice ID
                    </Label>
                    <Input
                        id="reference"
                        {...register('reference', { required: true })}
                    />
                    {errors.reference && (
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

                    <InvoiceItemInput
                        items={getValues('items')}
                        onUpdate={(items) => setValue('items', items)}
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
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
}
