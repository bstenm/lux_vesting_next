'use client';

import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Typography } from '@/components/Typography';

const Container = styled('div')`
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

function SomethingWentWrongPage(): JSX.Element {
    return (
        <Container>
            <Typography
                sx={{ color: purple[700] }}
                variant="h3"
                textId="somethingWentWrong"
            />
        </Container>
    );
}

export default SomethingWentWrongPage;
