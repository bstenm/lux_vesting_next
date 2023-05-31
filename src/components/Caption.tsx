'use client';

import { Typography } from './Typography';

type Props = {
    textId?: string;
    children: React.ReactNode;
};

export function Caption({ textId, children }: Props): JSX.Element {
    return children ? (
        <Typography color="text.secondary" variant="caption">
            {children}
        </Typography>
    ) : (
        <Typography textId={textId} color="text.secondary" variant="caption" />
    );
}
