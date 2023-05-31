'use client';

import { createContext, useContext } from 'react';

import { AuthLogic } from './useAuth';

export const AuthContext = createContext<AuthLogic>({
    user: null,
    login: () => new Promise((res) => res()),
    logout: () => new Promise((res) => res()),
    loggingIn: false,
    loggingOut: false
});

export const useAuthContext = (): AuthLogic => {
    return useContext(AuthContext);
};
