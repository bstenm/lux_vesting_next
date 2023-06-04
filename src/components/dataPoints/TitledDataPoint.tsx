'use client';

import Stack from '@mui/material/Stack';

import { DataPoint } from 'components/DataPoint';
import { Typography } from 'components/Typography';

type Props = Omit<React.ComponentProps<typeof DataPoint>, 'align'> & {
    align?: string;
    textId: string;
};

export function TitledDataPoint({
    align,
    textId,
    ...props
}: Props): JSX.Element {
    return (
        <Stack alignItems={align ?? 'center'} sx={{ color: 'primary.light' }}>
            <Typography
                uppercased
                color="text.secondary"
                textId={textId}
                variant="caption"
            />
            <DataPoint {...props} />
        </Stack>
    );
}
