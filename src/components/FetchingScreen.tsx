'use client';

import { EmptyResponse } from 'components/EmptyResponse';
import { CenteredLoader } from 'components/CenteredLoader';

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
    if (fetching) {
        return <CenteredLoader fullscreen={fullscreen} {...other} />;
    }

    if (!data || (Array.isArray(data) && !data.length)) {
        return (
            <EmptyResponse
                message={message}
                fullscreen={fullscreen}
                noMessage={noMessage}
                {...other}
            />
        );
    }

    return <>{children(data)}</>;
}
