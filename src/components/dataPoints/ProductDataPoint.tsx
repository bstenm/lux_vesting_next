'use client';

import Stack from '@mui/material/Stack';

import { Typography } from 'components/Typography';

type Props = {
    textId: string;
    children?: React.ReactNode;
    showMissing?: boolean;
};

export function ProductDataPoint({
    textId,
    children,
    showMissing
}: Props): JSX.Element {
    return (
        <Stack spacing={0}>
            <Typography sx={{ fontWeight: 300 }} textId={textId} uppercased />
            <Typography sx={{ fontWeight: 600 }} showMissing={showMissing}>
                {children}
            </Typography>
        </Stack>
    );
}
