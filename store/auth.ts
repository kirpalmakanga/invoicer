import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { signIn, signUp } from '@/lib/api';
import { useShallow } from 'zustand/react/shallow';

interface AuthStoreState {
    userName: '';
    accessToken: string;
    refreshToken: string;
}

interface AuthStoreActions {
    signUp: (userData: AuthRegisterCredentials) => void;
    logIn: (credentials: AuthCredentials) => void;
    logOut: () => void;
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
            async signUp(userData: AuthRegisterCredentials) {
                const data = await signUp(userData);

                set(() => data);
            },
            async logIn(credentials) {
                const data = await signIn(credentials);

                set(() => data);
            },
            logOut() {
                set(getInitialState);
            },
            // async refreshAccessToken() {
            //     const { refreshToken } = get();

            //     const accessToken = await refreshAccessToken(refreshToken);

            //     set(() => ({ accessToken }));
            // },
        }),
        {
            name: 'auth',
        }
    )
);

export function useAuthentication() {
    return useAuthStore(useShallow(({ accessToken }) => !!accessToken));
}
