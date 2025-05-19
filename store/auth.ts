import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logIn, signIn, signUp, refreshAccessToken } from '@/lib/api';
import { useShallow } from 'zustand/react/shallow';

interface AuthStoreState {
    userName: '';
    accessToken: string;
    refreshToken: string;
}

interface AuthStoreActions {
    // signUp: (userData: AuthRegisterCredentials) => void;
    signIn: (credentials: AuthCredentials) => Promise<void>;
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
            // async signUp(userData: AuthRegisterCredentials) {
            //     const data = await signUp(userData);

            //     set(() => data);
            // },
            async signIn(credentials) {
                const data = await signIn(credentials);

                set(() => data);
            },
            async logIn(code: string, state: string) {
                const tokens = await logIn(code, state);

                set(() => tokens);
            },
            async logOut() {
                /** TODO: revoke tokens on backend */
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
