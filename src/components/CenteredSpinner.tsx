'use client';

import { Spinner } from 'components/Spinner';
import { Centered } from 'components/Centered';

type Props = {
    fullscreen?: boolean;
};

export function CenteredSpinner({ fullscreen }: Props): JSX.Element {
    return (
        <Centered fullscreen={fullscreen}>
            <Spinner />
        </Centered>
    );
}
