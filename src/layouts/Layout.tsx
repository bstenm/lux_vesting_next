import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { path } from 'config/path';

import { Footer } from './Footer';
import { TopBar } from './TopBar';

const Container = styled('main')`
    height: 100%;
    background-color: #000;
`;

const Content = styled(Box)`
    padding: 25px;
    min-height: 100%;
`;

export function Layout({
    children
}: {
    children: React.ReactNode;
}): JSX.Element {
    const pathname = usePathname();

    const isNotHomepage = pathname && pathname !== path.landing;

    return (
        <Container>
            <PerfectScrollbar>
                <Content>
                    <TopBar />
                    <Box sx={{ pt: 2 }}>{children}</Box>
                </Content>
                {isNotHomepage && <Footer />}
            </PerfectScrollbar>
        </Container>
    );
}
