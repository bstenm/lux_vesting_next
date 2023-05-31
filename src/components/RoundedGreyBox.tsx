'use client';

import Box, { BoxProps } from '@mui/material/Box';

type Props = BoxProps & {
    children: React.ReactNode;
};

export function RoundedGreyBox({ children, ...props }: Props): JSX.Element {
    const { sx, ...rest } = props;

    return (
        <Box
            sx={{
                color: 'common.white',
                bgcolor: '#252525',
                borderRadius: 2,
                ...(sx ?? {})
            }}
            {...rest}>
            {children}
        </Box>
    );
}
