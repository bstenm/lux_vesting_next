'use client';

import Box, { BoxProps } from '@mui/material/Box';

type Props = BoxProps & {
    light?: boolean;
    children: React.ReactNode;
};

export function RoundedGreyBox({
    light,
    children,
    ...props
}: Props): JSX.Element {
    const { sx, ...rest } = props;

    return (
        <Box
            sx={{
                bgcolor: light ? 'common.black' : '#252525',
                textAlign: 'center',
                borderRadius: 2,
                border: (theme) =>
                    light ? `1px solid ${theme.palette.primary.light}` : 'none',
                ...(sx ?? {})
            }}
            {...rest}>
            {children}
        </Box>
    );
}
