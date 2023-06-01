import { styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useEffect, useRef } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { Row } from 'components/Row';
import { landing } from 'pages/LandingPage';
import { SignInButton } from 'features/authButton/SignInButton';
import { isUserLoggedIn } from 'state/user/selectors';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { LanguageSelect } from 'components/LanguageSelect';
import { merchantAssets } from 'pages/MerchantAssetsPage';
import { NotificationDrawer } from 'features/notifications/NotificationDrawer';

import { Footer } from './Footer';
import { NewListingButton } from './NewListingButton';

const Container = styled('main')`
    flex-grow: 1;
    background-color: #000;
`;

const Content = styled('div')`
    padding: 25px;
    min-height: 100%;
`;

export function Main({ children }: { children: React.ReactNode }): JSX.Element {
    const pathname  = usePathname();

    const ps = useRef<HTMLElement>();

    const userIsLoggedIn = useAppSelector(isUserLoggedIn);

    const isNotHomepage = pathname && pathname !== landing.path;

    const isNotMerchantAssetsPage =
        pathname.split('/')[1] !== merchantAssets.path;

    const scrollTop = (): void => {
        const curr = ps.current;
        if (curr) {
            curr.scrollTop = 0;
        }
    };

    useEffect(() => {
        scrollTop();
    }, [pathname]);

    return (
        <Container>
            <PerfectScrollbar
                containerRef={(el) => {
                    ps.current = el;
                }}>
                <Content>
                    <Row
                        spacing={userIsLoggedIn ? 2 : 4}
                        alignItems="center"
                        justifyContent="flex-end">
                        {isNotMerchantAssetsPage && isNotHomepage && (
                            <NewListingButton />
                        )}
                        {userIsLoggedIn && isNotHomepage && (
                            <Row spacing={2} alignItems="center">
                                <NotificationDrawer />
                            </Row>
                        )}
                        {!userIsLoggedIn && isNotHomepage && <SignInButton />}
                        <LanguageSelect />
                    </Row>
                    {children}
                    {isNotHomepage && <Footer />}
                </Content>
            </PerfectScrollbar>
        </Container>
    );
}