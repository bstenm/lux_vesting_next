'use client';

import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Component = styled(Stack)(({ theme }) => ({
    padding: 60,
    textAlign: 'left',
    background: 'linear-gradient(180deg, #151516 33.58%, #343434 123.98%)',
    boxShadow: '1px 0px 10px rgba(0, 0, 0, 0.42)',
    borderRadius: '5px',
    [theme.breakpoints.down('md')]: {
        padding: 10,
        width: '100%'
    }
}));

export function BoxGradient(
    props: React.ComponentProps<typeof Stack>
): JSX.Element {
    return <Component {...props} />;
}
