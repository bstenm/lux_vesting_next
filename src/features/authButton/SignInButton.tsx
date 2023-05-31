'use client';

import grey from '@mui/material/colors/grey';
import { capitalize } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Spinner } from 'components/Spinner';
import { RoundedGreyBox } from 'components/RoundedGreyBox';

import { useWeb3 } from './useWeb3';

export function SignInButton(): JSX.Element {
    const { t } = useTranslation();

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
