'use client';

import { styled } from '@mui/material/styles';
import MuiTypography from '@mui/material/Typography';

const Container = styled('div')`
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Typography = styled(MuiTypography)(({ theme }) => {
    const color = theme.palette.primary.dark;
    return {
        color,
        width: '250px',
        height: '250px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px solid ${color}`,
        borderRadius: 125
    };
});

function Page(): JSX.Element {
    return (
        <Container>
            <Typography variant="h1">404</Typography>
        </Container>
    );
}

const path = '/not-found';

export const notFound = { path, page: Page };
