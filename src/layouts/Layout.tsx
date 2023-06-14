import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
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
                <Box sx={{ px: 6, minHeight: '100%' }}>
                    <Stack
                        sx={{
                            width: 'calc(100vw - 80px)',
                            height: 60,
                            zIndex: 6000,
                            bgcolor: 'common.black',
                            position: isNotHomepage ? 'fixed' : 'static'
                        }}
                        justifyContent="center">
                        <TopBar />
                    </Stack>
                    <Box sx={{ pt: isNotHomepage ? 9 : 0 }}>{children}</Box>
                </Box>
                {isNotHomepage && <Footer />}
            </PerfectScrollbar>
        </Container>
    );
}
