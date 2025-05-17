import { authorize } from '@/lib/api';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthStoreState {
    accessToken: string;
    refreshToken: string;
}

interface AuthStoreActions {
    logIn: () => void;
    logOut: () => void;
}

export const useAuthStore = create<AuthStoreState & AuthStoreActions>()(
    persist(
        (set) => ({
            accessToken: '',
            refreshToken: '',
            async logIn() {
                await authorize();
            },
            logOut() {
                set(() => ({ accessToken: '', refreshToken: '' }));
            },
        }),
        {
            name: 'auth',
        }
    )
);
