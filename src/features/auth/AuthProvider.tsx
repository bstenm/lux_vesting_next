'use client';

import { useAuth } from './useAuth';
import { AuthContext } from './useAuthContext';

type Props = {
    children: React.ReactNode;
};

export function ProvideAuth({ children }: Props): JSX.Element {
    const auth = useAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
