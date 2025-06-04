'use client';

import { Button } from '@/components/ui/button';
import { redirect } from '@/lib/api';
import { UserRoundCheck } from 'lucide-react';

export default function SignUpSuccess() {
    return (
        <div className="flex flex-col items-center justify-center grow">
            <div className="flex flex-col items-center rounded-md bg-slate-800 p-8">
                <UserRoundCheck className="size-24 mb-4" />
                <h1 className="text-2xl mb-8">Success !</h1>
                <p className="mb-4">
                    Your Invoicer account has been created. Log in to start
                    using the app.
                </p>
                <Button onClick={redirect}>Log in</Button>
            </div>
        </div>
    );
}
