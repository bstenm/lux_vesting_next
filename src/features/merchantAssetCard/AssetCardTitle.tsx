'use client';

import Stack from '@mui/material/Stack';

import { Typography } from 'components/Typography';

type Props = {
    title: string;
};

export function AssetCardTitle({ title }: Props): JSX.Element {
    return (
        <Stack
            sx={{
                mt: 1,
                height: 40
            }}
            justifyContent="center">
            <Typography sx={{ textAlign: 'center' }} uppercased variant="body1">
                {title}
            </Typography>
        </Stack>
    );
}
