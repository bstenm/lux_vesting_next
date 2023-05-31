'use client';

import { Box, BoxProps } from '@mui/material';

export function BlackBanner({ sx, ...rest }: BoxProps): JSX.Element {
    return (
        <Box
            sx={{
                p: 1,
                bgcolor: 'common.black',
                textAlign: 'center',
                ...sx
            }}
            {...rest}
        />
    );
}
