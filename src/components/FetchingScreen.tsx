'use client';

import { useTheme } from '@mui/material';
import { GrDropbox } from 'react-icons/gr';

import { Centered } from 'components/Centered';
import { CenteredLoader } from 'components/CenteredLoader';
import { BigMutedMessage } from './typography/BigMutedMessage';

type Props<T> = {
    data?: T;
    children: (data: T) => JSX.Element;
    fetching: boolean;
    message?: string;
    fullscreen?: boolean;
    noMessage?: boolean;
};

export function FetchingScreen<T>({
    data,
    children,
    fetching,
    message,
    fullscreen = true,
    noMessage,
    ...other
}: Props<T>): JSX.Element {
    const theme = useTheme();

    if (fetching) {
        return <CenteredLoader fullscreen={fullscreen} {...other} />;
    }

    if ((Array.isArray(data) && data.length) || data) {
        return <>{children(data)}</>;
    }

    if (!noMessage) {
        return (
            <Centered fullscreen={fullscreen} {...other}>
                <BigMutedMessage textId={message ?? 'noData'} />
            </Centered>
        );
    }

    return (
        <Centered fullscreen={fullscreen} {...other}>
            <GrDropbox size={50} color={theme.palette.primary.light} />
        </Centered>
    );
}
