'use client';

import { grey } from '@mui/material/colors';
import { Typography } from 'components/Typography';

export function NotificationDate(
    props: React.ComponentProps<typeof Typography>
): JSX.Element {
    return (
        <Typography
            italic
            noWrap
            sx={{
                p: 1,
                mx: 1,
                color: grey[600],
                display: 'inline-block',
                fontSize: 14,
                maxWidth: 200,
                lineHeight: 1,
                borderRadius: 1
            }}
            {...props}
        />
    );
}
