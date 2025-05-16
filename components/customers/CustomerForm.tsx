'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useCustomersStore } from '@/store/customers';

import { cn, omit } from '@/lib/utils';

interface CustomerEditFormProps {
    customer?: Customer;
    onSubmit: () => void;
}

export function CustomerForm({ customer, onSubmit }: CustomerEditFormProps) {
    const addCustomer = useCustomersStore(({ addCustomer }) => addCustomer);
    const updateCustomer = useCustomersStore(
        ({ updateCustomer }) => updateCustomer
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CustomerFormData>({
        defaultValues: customer
            ? omit(customer, 'id')
            : {
                  name: '',
                  address: '',
                  tel: '',
                  email: '',
              },
    });

    const submit: SubmitHandler<CustomerFormData> = (data) => {
        if (customer) {
            updateCustomer(customer.id, data);
        } else {
            addCustomer(data);
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
                            errors.name && 'text-red-500'
                        )}
                        htmlFor="name"
                    >
                        Name
                    </Label>
                    <Input
                        id="name"
                        {...register('name', { required: true })}
                    />
                    {errors.name && (
                        <span className="text-xs text-red-500">
                            This field is required
                        </span>
                    )}
                </div>

                <div>
                    <Label
                        className={cn(
                            'font-bold mb-1',
                            errors.address && 'text-red-500'
                        )}
                        htmlFor="address"
                    >
                        Address
                    </Label>
                    <Input
                        id="address"
                        {...register('address', { required: true })}
                    />
                    {errors.address && (
                        <span className="text-xs text-red-500">
                            This field is required
                        </span>
                    )}
                </div>

                <div>
                    <Label
                        className={cn(
                            'font-bold mb-1',
                            errors.tel && 'text-red-500'
                        )}
                        htmlFor="tel"
                    >
                        Telephone
                    </Label>
                    <Input id="tel" {...register('tel', { required: true })} />
                    {errors.tel && (
                        <span className="text-xs text-red-500">
                            This field is required
                        </span>
                    )}
                </div>

                <div>
                    <Label
                        className={cn(
                            'font-bold mb-1',
                            errors.email && 'text-red-500'
                        )}
                        htmlFor="email"
                    >
                        Email
                    </Label>
                    <Input
                        id="email"
                        {...register('email', { required: true })}
                    />
                    {errors.email && (
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
