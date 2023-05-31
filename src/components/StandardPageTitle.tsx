'use client';

import { styled } from '@mui/material/styles';

import { Typography } from './Typography';

const Component = styled(Typography)(({ theme }) => ({
    fontSize: '4vw',
    letterSpacing: '0.1em',
    [theme.breakpoints.down('md')]: {
        fontSize: '6vw',
        marginTop: 20
    }
}));

export function StandardPageTitle(
    props: React.ComponentProps<typeof Typography>
): JSX.Element {
    return <Component uppercased {...props} />;
}
