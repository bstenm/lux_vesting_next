import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Main } from 'layouts/Main';

const Container = styled(Box)`
    height: 100%;
    display: flex;
`;

export function Layout({
    children
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <Container>
            <Main>{children}</Main>
        </Container>
    );
}
