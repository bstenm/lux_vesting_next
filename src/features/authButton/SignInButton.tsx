'use client';

import { grey } from '@mui/material/colors';
import { capitalize } from 'lodash';
import { useTranslate } from 'libs/hooks/useTranslate';

import { Spinner } from 'components/Spinner';
import { RoundedGreyBox } from 'components/RoundedGreyBox';

import { useWeb3 } from './useWeb3';

export function SignInButton(): JSX.Element {
    const t = useTranslate();

    const { login, processing, initializing } = useWeb3();

    return (
        <RoundedGreyBox
            sx={{
                py: 1,
                px: 2,
                color: grey[300],
                fontSize: 12,
                cursor: 'pointer',
                borderRadius: 1,
                '&:hover': {
                    color: 'common.white',
                    bgcolor: '#353535'
                }
            }}
            onClick={login}>
            {initializing || processing ? <Spinner /> : capitalize(t('login'))}
        </RoundedGreyBox>
    );
}
