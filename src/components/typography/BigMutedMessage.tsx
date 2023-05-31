'use client';

import { Typography } from 'components/Typography';

type Props = React.ComponentProps<typeof Typography> & {
    textId: string;
    uppercased?: boolean;
};

export function BigMutedMessage({
    sx,
    textId,
    uppercased
}: Props): JSX.Element {
    return (
        <Typography
            sx={{ lineHeight: '1.5em', ...sx }}
            capitalized={!uppercased}
            uppercased={uppercased}
            color="text.secondary"
            textId={textId}
            variant={uppercased ? 'h5' : 'h4'}
        />
    );
}
