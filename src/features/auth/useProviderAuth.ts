'use client';

import {
    User,
    signOut,
    UserCredential,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged
    // confirmPasswordReset,
    // sendPasswordResetEmail,
    // signInWithEmailAndPassword,
    // createUserWithEmailAndPassword
} from 'firebase/auth';
import { useEffect, useState } from 'react';

import { auth } from 'libs/firebaseApp';
import { useAsyncAction } from 'libs/hooks/useAsyncAction';

export type ProviderAuth = {
    user: User | null;
    signingOutOfProvider: boolean;
    signInWithGoogle: () => Promise<UserCredential>;
    signOutOfProvider: () => void;
    signingInWithGoogle: boolean;
    // signin: (email: string, password: string) => void;
    // signup: (email: string, password: string) => void;
    // signout: () => void;
    // resetEmail: (email: string) => void;
    // resetPassword: (code: string, password: string) => void;
};

export const useProviderAuth = (): ProviderAuth => {
    const [user, setUser] = useState<User | null>(null);

    const [signInWithGoogle, signingInWithGoogle] = useAsyncAction<
        void,
        UserCredential
    >(
        async (): Promise<UserCredential> => {
            const googleProvider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, googleProvider);
            return res;
        },
        {
            error: 'errorSigningInWithGoogle'
        }
    );

    const [signOutOfProvider, signingOutOfProvider] = useAsyncAction<
        void,
        void
    >(
        async (): Promise<void> => {
            await signOut(auth);
            setUser(null);
        },
        {
            error: 'errorSigningInWithGoogle'
        }
    );

    // const signin = async (email: string, password: string): Promise<void> => {
    //     const res = await signInWithEmailAndPassword(auth, email, password);
    //     setUser(res.user);
    // };

    // const signup = async (email: string, password: string): Promise<void> => {
    //     const res = await createUserWithEmailAndPassword(auth, email, password);
    //     setUser(res.user);
    // };

    // const resetEmail = async (email: string): Promise<void> => {
    //     await sendPasswordResetEmail(auth, email);
    // };

    // const resetPassword = async (
    //     code: string,
    //     password: string
    // ): Promise<void> => {
    //     await confirmPasswordReset(auth, code, password);
    // };

    useEffect(() => {
        // Re-renders with the latest auth object.
        const unsubscribe = onAuthStateChanged(auth, (data) =>
            setUser(data ?? null)
        );
        return () => unsubscribe();
    }, []);

    return {
        user,
        signInWithGoogle,
        signOutOfProvider,
        signingInWithGoogle,
        signingOutOfProvider
    };
};
