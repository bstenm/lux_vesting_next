'use client';

import Stack from '@mui/material/Stack';

type Props = React.ComponentProps<typeof Stack> & {
    children: React.ReactNode;
};

export function Row({ children, ...other }: Props): JSX.Element {
    return (
        <Stack direction="row" {...other}>
            {children}
        </Stack>
    );
}
