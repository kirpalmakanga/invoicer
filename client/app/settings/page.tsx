'use client';

import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import H1 from '@/components/atoms/H1';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSettingsStore } from '@/store/settings';
import { cn, isEqual } from '@/lib/utils';

export default function Settings() {
    const {
        name,
        address,
        email,
        companyId,
        invoicePrefix,
        fetchSettings,
        saveSettings,
    } = useSettingsStore();

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Settings>({
        defaultValues: {
            name,
            address,
            email,
            companyId,
            invoicePrefix,
        },
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    useEffect(() => {
        reset({ name, address, email, companyId, invoicePrefix });
    }, [name, address, email, companyId, invoicePrefix]);

    const submit: SubmitHandler<Settings> = (data) => {
        if (
            !isEqual(data, { name, address, email, companyId, invoicePrefix })
        ) {
            saveSettings(data);
        }
    };

    return (
        <>
            <H1 className="mb-4">Settings</H1>

            <form onSubmit={handleSubmit(submit)}>
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

                    <div>
                        <Label
                            className={cn(
                                'font-bold mb-1',
                                errors.companyId && 'text-red-500'
                            )}
                            htmlFor="companyId"
                        >
                            Company ID
                        </Label>
                        <Input
                            id="companyId"
                            {...register('companyId', { required: true })}
                        />
                        {errors.companyId && (
                            <span className="text-xs text-red-500">
                                This field is required
                            </span>
                        )}
                    </div>

                    <div>
                        <Label
                            className={cn(
                                'font-bold mb-1',
                                errors.invoicePrefix && 'text-red-500'
                            )}
                            htmlFor="invoicePrefix"
                        >
                            Invoice prefix
                        </Label>
                        <Input
                            id="invoicePrefix"
                            {...register('invoicePrefix', { required: true })}
                        />
                        {errors.invoicePrefix && (
                            <span className="text-xs text-red-500">
                                This field is required
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex justify-end pb-4 mt-6">
                    <Button type="submit">Save</Button>
                </div>
            </form>
        </>
    );
}
