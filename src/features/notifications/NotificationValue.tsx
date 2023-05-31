'use client';

import { Typography } from 'components/Typography';

export function NotificationValue(
    props: React.ComponentProps<typeof Typography>
): JSX.Element {
    return (
        <Typography
            bold
            noWrap
            sx={{
                p: 1,
                mx: 1,
                top: 5,
                display: 'inline-block',
                bgcolor: '#353535',
                fontSize: 14,
                position: 'relative',
                maxWidth: 200,
                lineHeight: 1,
                borderRadius: 1
            }}
            {...props}
        />
    );
}
