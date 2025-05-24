'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Combobox, ComboboxItem } from '@/components/ui/combobox';
import { InvoiceItemInput } from '@/components/invoices/InvoiceItemInput';
import { AddCustomerButton } from '@/components/customers/AddCustomerButton';

import { useSettingsStore } from '@/store/settings';
import { useCustomersStore } from '@/store/customers';
import { useInvoicesStore } from '@/store/invoices';

import { cn, sortByKey } from '@/lib/utils';
import { getCurrentYear } from '@/lib/dates';
import { InvoiceSchema, invoiceSchema } from '@/lib/validation';
interface InvoiceEditFormProps {
    invoice?: Invoice;
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

function useForceRender() {
    const [, setState] = useState<boolean>(false);

    return () => setState((v) => !v);
}

export function InvoiceForm({ invoice, onSubmit }: InvoiceEditFormProps) {
    const forceRender = useForceRender();

    const invoicePrefix = useSettingsStore(
        ({ invoicePrefix }) => invoicePrefix
    );
    const customers = useCustomersStore(
        useShallow(({ customers }) => sortByKey(customers, 'name'))
    );
    const customerSelectItems = useMemo(
        () => customers.map(({ id: value, name: label }) => ({ label, value })),
        [customers]
    );
    const addInvoice = useInvoicesStore(({ addInvoice }) => addInvoice);
    const updateInvoice = useInvoicesStore(
        ({ updateInvoice }) => updateInvoice
    );

    const fetchSettings = useSettingsStore(
        ({ fetchSettings }) => fetchSettings
    );
    const fetchCustomers = useCustomersStore(
        ({ fetchCustomers }) => fetchCustomers
    );

    const methods = useForm<InvoiceSchema>({
        defaultValues: invoice
            ? invoice
            : {
                  reference: '',
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
        resolver: yupResolver(invoiceSchema),
    });

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = methods;

    const submit: SubmitHandler<InvoiceSchema> = useCallback((data) => {
        if (invoice) {
            updateInvoice(invoice.id, data);
        } else {
            addInvoice(data);
        }

        toast.success(
            ` ${invoice?.id ? 'Updated' : 'Created'} invoice: ${
                data.reference
            }.`
        );

        onSubmit();
    }, []);

    const onCreatedCustomer = useCallback(({ id: customerId }: Customer) => {
        setValue('customerId', customerId);

        forceRender();
    }, []);

    useEffect(() => {
        fetchSettings();
        fetchCustomers();
    }, []);

    useEffect(() => {
        if (!invoice?.id) {
            setValue('reference', `${invoicePrefix}${getCurrentYear()}`);

            forceRender();
        }
    }, [invoicePrefix]);

    return (
        <FormProvider {...methods}>
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
                            placeholder="Select a customer"
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

                        <div className="flex justify-end mt-4">
                            <AddCustomerButton onCreated={onCreatedCustomer} />
                        </div>
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
                </div>

                <div className="flex justify-end pb-4">
                    <Button type="submit">
                        <Save />
                        Save
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
