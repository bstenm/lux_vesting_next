'use client';

import Box from '@mui/material/Box';
import { Trans } from 'react-i18next';

import { Centered } from '@/components/Centered';
import { isUserAdmin } from '@/state/user/selectors';
import { WhiteButton } from '@/components/buttons/WhiteButton';
import { useAppSelector } from '@/libs/hooks/useAppSelector';

import { useWeb3 } from './useWeb3';

type Props = {
    admin?: boolean;
    action?: string;
    children: JSX.Element | JSX.Element[];
    fullscreen?: boolean;
};

export function ProtectedComponent({
    admin,
    action,
    children,
    fullscreen
}: Props): JSX.Element {
    const { login, loggedIn, processing, initializing } = useWeb3();

    const userIsAdmin = useAppSelector(isUserAdmin);

    const i18nkey = action ? 'loginToView' : 'login';

    if (!loggedIn || (admin && !userIsAdmin)) {
        return (
            <Centered fullscreen={fullscreen}>
                <WhiteButton
                    sx={{ maxWidth: 250, borderRadius: 1 }}
                    onClick={login}
                    loading={initializing || processing}>
                    <Trans
                        values={{ action }}
                        i18nKey={admin ? 'adminLogin' : i18nkey}
                    />
                </WhiteButton>
            </Centered>
        );
    }

    if (Array.isArray(children)) {
        return <Box>{children}</Box>;
    }

    return children;
}
