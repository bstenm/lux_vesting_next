'use client';

import Box from '@mui/material/Box';
import { Trans } from 'react-i18next';

import { Centered } from '@/components/Centered';
import { LightButton } from '@/components/buttons/LightButton';

import { useWeb3 } from './useWeb3';

type Props = {
    action?: string;
    children: JSX.Element | JSX.Element[];
    fullscreen?: boolean;
};

export function ProtectedComponent({
    action,
    children,
    fullscreen
}: Props): JSX.Element {
    const { login, loggedIn, processing, initializing } = useWeb3();

    if (!loggedIn) {
        return (
            <Centered fullscreen={fullscreen}>
                <LightButton
                    sx={{ width: 250 }}
                    onClick={login}
                    loading={initializing || processing}>
                    <Trans
                        values={{ action }}
                        i18nKey={action ? 'loginToView' : 'login'}
                    />
                </LightButton>
            </Centered>
        );
    }

    if (Array.isArray(children)) {
        return <Box>{children}</Box>;
    }

    return children;
}
