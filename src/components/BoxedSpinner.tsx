'use client';

import { Box } from '@mui/material';

import { Spinner } from './Spinner';

type Props = {
    size?: number;
    spinnerSize?: number;
};

export function BoxedSpinner({ size, spinnerSize }: Props): JSX.Element {
    return (
        <Box
            sx={{
                width: size,
                height: size,
                display: 'flex',
                alignItems: 'center'
            }}>
            <Spinner size={spinnerSize} />
        </Box>
    );
}
