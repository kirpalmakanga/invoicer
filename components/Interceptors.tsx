'use client';

import instance from '@/lib/axiosInstance';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export function Interceptors({ children }: { children: ReactNode }) {
    const { push } = useRouter();
    const { refreshAccessToken, logOut } = useAuthStore();

    useEffect(() => {
        instance.interceptors.request.use((config) => {
            const { accessToken } = useAuthStore.getState();

            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }

            return config;
        });

        instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const {
                    response: { status },
                    config,
                } = error;

                if (status === 401 && !config._retry) {
                    await refreshAccessToken();

                    config._retry = true;

                    return instance(config);
                } else if (status === 401) {
                    await logOut();

                    /** TODO: create login page and redirect ? */
                    push('/');
                }

                return Promise.reject(error);
            }
        );
    }, []);

    return children;
}
