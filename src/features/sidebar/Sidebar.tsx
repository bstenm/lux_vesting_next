'use client';

import PerfectScrollbar from 'react-perfect-scrollbar';
import { useMediaQuery } from '@react-hook/media-query';
import { Sidebar as ProSidebar } from 'react-pro-sidebar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { SidebarTitle } from 'features/sidebar/SidebarTitle';
import { menuActions } from 'state/menu/menuSlice';
import { getMenuState } from 'state/menu/selectors';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { useAppDispatch } from 'libs/hooks/useAppDispatch';
import { SidebarUserOverview } from 'features/sidebar/SidebarUserOverview';
import { getUserData, isUserLoggedIn } from 'state/user/selectors';

import { SidebarMenu } from './SidebarMenu';

export function Sidebar(): JSX.Element {
    const dispatch = useAppDispatch();

    const userData = useAppSelector(getUserData);

    const loggedIn = useAppSelector(isUserLoggedIn);

    const menuState = useAppSelector(getMenuState);

    const onMobile = useMediaQuery('only screen and (max-width: 840px)');

    const handleToggleSidebar = (): void => {
        dispatch(menuActions.toggleOpen());
    };

    const handleCollapse = (): void => {
        if (menuState.collapsed) return;
        dispatch(menuActions.toggleCollapse());
    };

    const closeWhenOnMobile = (): void => {
        if (onMobile) {
            dispatch(menuActions.close());
        }
    };

    return (
        <ProSidebar
            id="sidebar"
            toggled={menuState.open}
            collapsed={menuState.collapsed}
            breakPoint="md"
            onBackdropClick={handleToggleSidebar}>
            <SidebarTitle
                onClick={closeWhenOnMobile}
                handleCollapse={handleCollapse}
                collapsed={menuState.collapsed}
            />
            {loggedIn && (
                <SidebarUserOverview
                    name={userData.name}
                    avatar={userData.avatar || userData.profileImage}
                />
            )}
            <PerfectScrollbar>
                <SidebarMenu />
            </PerfectScrollbar>
        </ProSidebar>
    );
}
