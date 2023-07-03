'use client';

import { useTheme } from '@mui/material/styles';
import { GrDropbox } from 'react-icons/gr';

import { Centered } from './Centered';
import { CenteredLoader } from './CenteredLoader';
import { CenteredSpinner } from './CenteredSpinner';
import { BigMutedMessage } from './typography/BigMutedMessage';

type Props<T> = {
    data?: T;
    children: (data: T) => JSX.Element;
    fetching: boolean;
    spinner?: boolean;
    message?: string;
    fullscreen?: boolean;
    noMessage?: boolean;
};

export function FetchingScreen<T>({
    data,
    spinner,
    children,
    fetching,
    message,
    fullscreen = true,
    noMessage,
    ...other
}: Props<T>): JSX.Element {
    const theme = useTheme();

    const notEmpty = Array.isArray(data) ? data.length : data;

    if (fetching) {
        return spinner ? (
            <CenteredSpinner fullscreen={fullscreen} {...other} />
        ) : (
            <CenteredLoader fullscreen={fullscreen} {...other} />
        );
    }

    if (notEmpty) {
        return <>{children(data as T)}</>;
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
            <GrDropbox size={50} color={theme.palette.primary.main} />
        </Centered>
    );
}
