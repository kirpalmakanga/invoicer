'use client';

import { useAuthentication } from '@/store/auth';
import { ReactNode } from 'react';

export function Unauthenticated({ children }: { children: ReactNode }) {
    const isLoggedIn = useAuthentication();

    return isLoggedIn ? null : children;
}
