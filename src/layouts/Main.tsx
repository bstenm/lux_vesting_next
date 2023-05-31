import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useEffect, useRef } from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { Row } from 'components/Row';
import { landing } from 'pages/LandingPage';
import { menuActions } from 'state/menu/menuSlice';
import { SignInButton } from 'features/authButton/SignInButton';
import { getMenuState } from 'state/menu/selectors';
import { isUserLoggedIn } from 'state/user/selectors';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { merchantAssets } from 'pages/MerchantAssetsPage';
import { useAppDispatch } from 'libs/hooks/useAppDispatch';
import { NotificationDrawer } from 'features/notifications/NotificationDrawer';
import { ToggleSidebarButton } from 'components/ToggleSidebarButton';
import { CollapseSidebarButton } from 'components/CollapseSidebarButton';
import { LanguageSelect } from 'components/LanguageSelect';

import { NewListingButton } from './NewListingButton';

const Container = styled('main')`
    flex-grow: 1;
    background-color: #000;
`;

const Content = styled(Box)`
    padding: 25px;
    min-height: 100vh;
`;

export function Main({ children }: { children: React.ReactNode }): JSX.Element {
    const { pathname } = { pathname: '' };

    const ps = useRef<HTMLElement>();

    const dispatch = useAppDispatch();

    const menuState = useAppSelector(getMenuState);

    const userIsLoggedIn = useAppSelector(isUserLoggedIn);

    const isNotHomepage = pathname && pathname !== landing.path;

    const isNotMerchantAssetsPage =
        pathname.split('/')[1] !== merchantAssets.path;

    const handleCollapsedChange = (): void => {
        dispatch(menuActions.toggleCollapse());
    };

    const handleToggleSidebar = (): void => {
        dispatch(menuActions.toggleOpen());
    };

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
                    <Row sx={{ mb: 1 }} justifyContent="space-between">
                        <Row
                            sx={{
                                zIndex: 100,
                                bgcolor: 'common.black'
                            }}>
                            <ToggleSidebarButton toggle={handleToggleSidebar} />
                            <CollapseSidebarButton
                                collapsed={menuState.collapsed}
                                onToggle={handleCollapsedChange}
                            />
                        </Row>
                        <Row
                            spacing={userIsLoggedIn ? 2 : 4}
                            alignItems="center">
                            {isNotMerchantAssetsPage && isNotHomepage && (
                                <NewListingButton />
                            )}
                            {userIsLoggedIn && isNotHomepage && (
                                <Row spacing={2} alignItems="center">
                                    <NotificationDrawer />
                                </Row>
                            )}
                            {!userIsLoggedIn && isNotHomepage && (
                                <SignInButton />
                            )}
                            <LanguageSelect />
                        </Row>
                    </Row>
                    {children}
                </Content>
            </PerfectScrollbar>
        </Container>
    );
}
