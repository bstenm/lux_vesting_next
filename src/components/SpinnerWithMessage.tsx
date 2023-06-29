'use client';

import Stack from '@mui/material/Stack';

import { Spinner } from '@/components/Spinner';
import { Typography } from '@/components/Typography';

type Props = {
    textId: string;
};

export function SpinnerWithMessage({ textId }: Props): JSX.Element {
    return (
        <Stack spacing={2} alignItems="center">
            <Typography variant="body2" color="primary.light" textId={textId} />
            <Spinner />
        </Stack>
    );
}
