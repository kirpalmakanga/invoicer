'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { useAuthStore } from '@/store/auth';
import { captureError } from '@/lib/utils';

export function Interceptors({ children }: { children: ReactNode }) {
    const { push } = useRouter();
    const { refreshAccessToken, logOut } = useAuthStore();
    const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

    useEffect(() => {
        api.interceptors.request.use((config) => {
            const { accessToken } = useAuthStore.getState();

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }

            return config;
        });

        api.interceptors.response.use(
            (response) => response,
            async (error) => {
                captureError(error);

                const { response: { status } = {}, config } = error;

                if (status === 401 && !config._retry) {
                    await refreshAccessToken();

                    config._retry = true;

                    return api(config);
                } else if (status === 401) {
                    await logOut();

                    /** TODO: create login page and redirect ? */
                    push('/');
                }

                return Promise.reject(error);
            }
        );

        setIsAuthReady(true);
    }, [logOut, refreshAccessToken, push]);

    return isAuthReady ? children : null;
}
