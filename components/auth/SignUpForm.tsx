'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { cn } from '@/lib/utils';
import { register as registerUser } from '@/lib/api';

export function SignUpForm({ onSubmit }: { onSubmit: () => void }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthRegisterCredentials>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const submit: SubmitHandler<AuthRegisterCredentials> = (data) => {
        registerUser(data);

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
                            errors.password && 'text-red-500'
                        )}
                        htmlFor="password"
                    >
                        Password
                    </Label>
                    <Input
                        id="password"
                        type="password"
                        {...register('password', { required: true })}
                    />
                    {errors.password && (
                        <span className="text-xs text-red-500">
                            This field is required
                        </span>
                    )}
                </div>

                <div>
                    <Label
                        className={cn(
                            'font-bold mb-1',
                            errors.confirmPassword && 'text-red-500'
                        )}
                        htmlFor="confirmPassword"
                    >
                        Confirm password
                    </Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        {...register('confirmPassword', { required: true })}
                    />
                    {errors.confirmPassword && (
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
