'use client';

import { isUserAdmin } from 'state/user/selectors';
import { Redirect, Route } from 'next/link';
import { useAppSelector } from 'libs/hooks/useAppSelector';

type Props = {
    path: string;
    component: React.ComponentType;
};

export function AdminRoute({ component: Component, path }: Props): JSX.Element {
    const isAdmin = useAppSelector(isUserAdmin);

    if (!isAdmin) {
        return <Redirect to="/" />;
    }

    return <Route path={path} component={Component} />;
}
