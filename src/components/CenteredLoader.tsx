'use client';

import Box from '@mui/material/Box';

import { Centered } from '@/components/Centered';
import { BounceLoader } from '@/components/BounceLoader';

type Props = React.ComponentProps<typeof Box> & {
    fullscreen?: boolean;
};

export function CenteredLoader({ fullscreen, ...other }: Props): JSX.Element {
    return (
        <Centered fullscreen={fullscreen} {...other}>
            <BounceLoader />
        </Centered>
    );
}
