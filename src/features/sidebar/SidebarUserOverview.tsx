'use client';

import Avatar from '@mui/material/Avatar';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useTranslation } from 'react-i18next';
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

import { Spinner } from 'components/Spinner';

import { useTorusLogout } from './useTorusLogout';

type Props = {
    name?: string;
    avatar?: string;
};

export function SidebarUserOverview({
    avatar = '',
    name = ''
}: Props): JSX.Element {
    const { t } = useTranslation();

    const [logout, loggingOut, loggedOut] = useTorusLogout();

    return (
        <Menu>
            <SubMenu title={name} icon={<Avatar alt={name} src={avatar} />}>
                {/* <MenuItem icon={<AccountCircleIcon />}>
                    <Link href="/profile">{t('myProfile')}</Link>
                </MenuItem>
                <MenuItem icon={<EditIcon />}>
                    <Link href="/edit-profile">{t('editProfile')}</Link>
                </MenuItem> */}
                <MenuItem onClick={logout} icon={<ExitToAppIcon />}>
                    {loggingOut && !loggedOut ? <Spinner /> : t('logout')}
                </MenuItem>
            </SubMenu>
        </Menu>
    );
}
