'use client';

import { Typography } from 'components/Typography';

type Props = React.ComponentProps<typeof Typography> & {
    color: string;
};

export function NotificationInfo({ color, ...props }: Props): JSX.Element {
    return (
        <Typography
            noWrap
            sx={{
                p: 0.8,
                mx: 0.5,
                top: 5,
                color,
                border: `1px solid ${color}`,
                display: 'inline-block',
                position: 'relative',
                fontSize: 12,
                maxWidth: 200,
                lineHeight: 1,
                borderRadius: 1,
                textTransform: 'uppercase'
            }}
            {...props}
        />
    );
}
