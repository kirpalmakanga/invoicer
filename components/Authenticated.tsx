'use client';

import { useAuthentication } from '@/store/auth';
import { ReactNode } from 'react';

export function Authenticated({ children }: { children: ReactNode }) {
    const isLoggedIn = useAuthentication();

    return isLoggedIn ? children : null;
}
