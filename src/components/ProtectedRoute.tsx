'use client';

import { Route } from 'next/link';

import { ProtectedComponent } from 'features/authButton/ProtectedComponent';

type Props = {
    path: string;
    action?: string;
    component: React.ElementType;
};

export function ProtectedRoute({
    path,
    action,
    component: Component
}: Props): JSX.Element {
    return (
        <Route
            path={path}
            render={(_) => (
                <ProtectedComponent action={action}>
                    <Component />
                </ProtectedComponent>
            )}
        />
    );
}
