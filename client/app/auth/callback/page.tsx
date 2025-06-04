'use client';

import { useAuthStore } from '@/store/auth';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function Callback() {
    const { push } = useRouter();
    const searchParams = useSearchParams();
    const logIn = useAuthStore(({ logIn }) => logIn);

    useEffect(() => {
        (async () => {
            const code = searchParams.get('code');
            const state = searchParams.get('state');

            if (code && state) {
                await logIn(code as string, state as string);
            }

            push('/');
        })();
    }, []);

    return (
        <div className="flex flex-col grow justify-center items-center gap-4">
            <Loader2 className="size-6 animate-spin" />

            <p>Logging in...</p>
        </div>
    );
}
