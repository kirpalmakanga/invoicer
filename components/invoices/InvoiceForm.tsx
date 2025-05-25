'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Combobox, ComboboxItem } from '@/components/ui/combobox';
import { DatePicker } from '@/components/ui/datepicker';
import { InvoiceItemInput } from '@/components/invoices/InvoiceItemInput';
import { AddCustomerButton } from '@/components/customers/AddCustomerButton';

import { useSettingsStore } from '@/store/settings';
import { useCustomersStore } from '@/store/customers';
import { useInvoicesStore } from '@/store/invoices';

import { cn } from '@/lib/utils';
import { getCurrentYear } from '@/lib/dates';
import { InvoiceSchema, invoiceSchema } from '@/lib/validation';
import { useForceRender } from '@/hooks/helpers';
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

export function InvoiceForm({ invoice, onSubmit }: InvoiceEditFormProps) {
    const forceRender = useForceRender();

    const invoicePrefix = useSettingsStore(
        ({ invoicePrefix }) => invoicePrefix
    );
    const invoices = useInvoicesStore(({ invoices }) => invoices);
    const customers = useCustomersStore(({ customers }) => customers);
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
                  datePaid: null,
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

    const [referenceAlreadyExists, setReferenceAlreadyExists] =
        useState<boolean>(false);

    const validateReference = useCallback(
        ({ currentTarget: { value } }: FormEvent<HTMLInputElement>) => {
            setReferenceAlreadyExists(
                invoices.some(
                    ({ id, reference }) =>
                        id !== invoice?.id && reference === value
                )
            );
        },
        [invoice, invoices]
    );

    const submit: SubmitHandler<InvoiceSchema> = useCallback((data) => {
        if (referenceAlreadyExists) {
            return;
        }

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

    const onUpdateStatus = useCallback((status: InvoiceStatus) => {
        setValue('status', status);

        if (status !== 'paid') {
            setValue('datePaid', null);
        }

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
                                (errors.reference || referenceAlreadyExists) &&
                                    'text-red-500'
                            )}
                            htmlFor="reference"
                        >
                            Invoice ID
                        </Label>
                        <Input
                            id="reference"
                            onInput={validateReference}
                            {...register('reference', { required: true })}
                        />
                        {errors.reference && (
                            <span className="text-xs text-red-500">
                                This field is required
                            </span>
                        )}
                        {referenceAlreadyExists && (
                            <span className="text-xs text-red-500">
                                This reference already exists
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
                            onSelect={onUpdateStatus}
                            {...register('status', { required: true })}
                        />
                        {errors.status && (
                            <span className="text-xs text-red-500">
                                This field is required
                            </span>
                        )}
                    </div>

                    {getValues('status') === 'paid' ? (
                        <div>
                            <Label
                                className={cn(
                                    'font-bold mb-1',
                                    errors.datePaid && 'text-red-500'
                                )}
                                htmlFor="datePaid"
                            >
                                Status
                            </Label>
                            <DatePicker
                                className="w-full"
                                value={getValues('datePaid')}
                                onUpdate={(date) => {
                                    setValue('datePaid', date.toISOString());
                                }}
                                {...register('datePaid')}
                            />
                        </div>
                    ) : null}
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
