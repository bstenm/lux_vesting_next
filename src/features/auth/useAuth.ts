'use client';

import { SafeEventEmitterProvider } from '@web3auth/base';

import { User } from 'firebase/auth';
// import { useWeb3Auth } from './useWeb3Auth';
import { useProviderAuth } from './useProviderAuth';

export type AuthLogic = {
    user: User | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    loggingIn: boolean;
    loggingOut: boolean;
    provider?: SafeEventEmitterProvider;
};

export const useAuth = (): AuthLogic => {
    const {
        user,
        signInWithGoogle,
        signOutOfProvider,
        signingInWithGoogle,
        signingOutOfProvider
    } = useProviderAuth();

    // const { logIntoWeb3, logOutOfWeb3, loggingIntoWeb3, loggingOutOfWeb3 } =
    //     useWeb3Auth();

    const login = async (): Promise<void> => {
        const loginRes = await signInWithGoogle();
        const idToken = await loginRes.user.getIdToken(true);
        // await logIntoWeb3({ idToken });
    };

    const logout = async (): Promise<void> => {
        signOutOfProvider();
        // logOutOfWeb3();
    };

    const loggingIn = signingInWithGoogle;
    // const loggingIn = signingInWithGoogle || loggingIntoWeb3;

    const loggingOut = signingOutOfProvider;
    // const loggingOut = signingOutOfProvider || loggingOutOfWeb3;

    return {
        user,
        login,
        logout,
        loggingIn,
        loggingOut
    };
};
