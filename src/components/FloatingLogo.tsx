'use client';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { Logo } from 'components/Logo';

type Props = {
    top?: number;
    left?: number;
    right?: number;
    bottom?: number;
};

const Container = styled(Box)<Props>(({ top, left, right, bottom, theme }) => ({
    top: !top && !bottom ? 60 : undefined,
    left: !right ? left : undefined,
    right: !right && !left ? 60 : undefined,
    bottom: !top ? bottom : undefined,
    position: 'absolute',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

export function FloatingLogo(position: Props): JSX.Element {
    return (
        <Container {...position}>
            <Logo width="80px" />
        </Container>
    );
}
