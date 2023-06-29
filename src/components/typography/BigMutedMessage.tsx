'use client';

import { Typography } from '@/components/Typography';

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
            bold
            sx={{ lineHeight: '1.8em', ...sx }}
            uppercased={uppercased}
            allCapitalized={!uppercased}
            color="text.disabled"
            textId={textId}
            variant={uppercased ? 'h5' : 'h4'}
        />
    );
}
