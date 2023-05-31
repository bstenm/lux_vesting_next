'use client';

import { styled } from '@mui/material/styles';

import { BounceLoader } from 'components/BounceLoader';

const Container = styled('div')(
    ({ theme }) => `
    display: flex;
    width: 100vw;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: ${theme.palette.common.black};
`
);

export function Fallback(): JSX.Element {
    return (
        <Container>
            <BounceLoader />
        </Container>
    );
}
