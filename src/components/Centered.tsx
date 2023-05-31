'use client';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { ReactNode } from 'react';

type Props = React.ComponentProps<typeof Box> & {
    children: ReactNode;
    fullscreen?: boolean;
};

const Container = styled(Box)<{ fullscreen?: string }>`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: vertical;
    height: ${(props) =>
        props.fullscreen === 'true' ? 'calc(100vh - 110px)' : 'inherit'};
`;

export function Centered({
    children,
    fullscreen,
    ...other
}: Props): JSX.Element {
    return (
        <Container fullscreen={fullscreen ? 'true' : 'false'} {...other}>
            {children}
        </Container>
    );
}
