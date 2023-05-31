'use client';

import { Typography } from './Typography';

type Props = {
    textId?: string;
    children?: React.ReactNode;
};

export function StandardPageSubtitle({ textId, children }: Props): JSX.Element {
    return textId ? (
        <Typography variant="h6" textId={textId} />
    ) : (
        <Typography variant="h6">{children}</Typography>
    );
}
