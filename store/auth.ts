import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logIn, refreshAccessToken, logOut } from '@/lib/api';
import { useShallow } from 'zustand/react/shallow';

interface AuthStoreState {
    userName: '';
    accessToken: string;
    refreshToken: string;
}

interface AuthStoreActions {
    logIn: (code: string, state: string) => Promise<void>;
    logOut: () => Promise<void>;
    refreshAccessToken: () => Promise<void>;
}

function getInitialState(): AuthStoreState {
    return {
        userName: '',
        accessToken: '',
        refreshToken: '',
    };
}

export const useAuthStore = create<AuthStoreState & AuthStoreActions>()(
    persist(
        (set, get) => ({
            ...getInitialState(),
            async logIn(code: string, state: string) {
                const tokens = await logIn(code, state);

                set(() => tokens);
            },
            async logOut() {
                await logOut();

                set(getInitialState);
            },
            async refreshAccessToken() {
                const { refreshToken } = get();

                const tokens = await refreshAccessToken(refreshToken);

                set(() => tokens);
            },
        }),
        {
            name: 'auth',
        }
    )
);

export function useAuthentication() {
    return useAuthStore(useShallow(({ accessToken }) => !!accessToken));
}
