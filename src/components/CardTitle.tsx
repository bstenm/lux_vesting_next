'use client';

import { Typography } from 'components/Typography';

type Props = {
    textId: string;
};

export function CardTitle({ textId }: Props): JSX.Element {
    return <Typography bold allCapitalized variant="h5" textId={textId} />;
}
