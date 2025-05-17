'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAuthStore } from '@/store/auth';

import { cn } from '@/lib/utils';

export function LogInForm({ onSubmit }: { onSubmit: () => void }) {
    const logIn = useAuthStore(({ logIn }) => logIn);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthCredentials>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const submit: SubmitHandler<AuthCredentials> = (data) => {
        console.log({ data });
        logIn(data);

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
            </div>

            <div className="flex justify-end pb-4">
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
}
