'use client';

import Box from '@mui/material/Box';

type Props = {
    sx?: Record<string, unknown>;
    children: React.ReactNode;
};

export function AlignRight({ sx, children }: Props): JSX.Element {
    return (
        <Box
            sx={{ display: 'flex', width: '100%', ...sx }}
            justifyContent="flex-end">
            {children}
        </Box>
    );
}
