import HomeIcon from '@mui/icons-material/Home';
import { usePathname } from 'next/navigation';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { Link } from '@/components/Link';
import { Row } from '@/components/Row';
import { path } from '@/config/path';
import { SearchInput } from '@/features/SearchInput';
import { SignInButton } from '@/features/authButton/SignInButton';
import { useAppSelector } from '@/libs/hooks/useAppSelector';
import { LanguageSelect } from '@/components/LanguageSelect';
import { UserMenuButton } from '@/features/userMenu/UserMenuButton';
import { NewListingButton } from '@/features/NewListingButton';
import { NotificationDrawer } from '@/features/notifications/NotificationDrawer';
import { AddNewAssetModalButton } from '@/features/addNewAssetModal/AddNewAssetModalButton';
import { isUserAdmin, isUserLoggedIn } from '@/state/user/selectors';

export function TopBar(): JSX.Element {
    const pathname = usePathname();

    const userIsAdmin = useAppSelector(isUserAdmin);

    const userIsLoggedIn = useAppSelector(isUserLoggedIn);

    const isMarketplace = !!pathname && pathname === path.marketplace;

    const isNotHomepage = pathname && pathname !== path.landing;

    return (
        <Row justifyContent="space-between" alignItems="center">
            <Row spacing={4} alignItems="center">
                {userIsAdmin && (
                    <Link href={path.admin}>
                        <AdminPanelSettingsIcon
                            sx={{ color: 'secondary.dark' }}
                        />
                    </Link>
                )}
                <Link href={path.landing}>
                    <HomeIcon sx={{ color: 'text.secondary' }} />
                </Link>
                <Link
                    sx={{ color: 'text.secondary' }}
                    href={path.marketplace}
                    textId="marketplace"
                    allCapitalized
                />
                <Link
                    sx={{ color: 'text.secondary' }}
                    href={path.merchantAssets}
                    textId="createdAssets"
                    allCapitalized
                />
            </Row>
            {isNotHomepage && !isMarketplace && <SearchInput />}
            <Row alignItems="center" spacing={userIsLoggedIn ? 2 : 4}>
                {isNotHomepage && (
                    <AddNewAssetModalButton>
                        {(handleOpenModal) => (
                            <NewListingButton onClick={handleOpenModal} />
                        )}
                    </AddNewAssetModalButton>
                )}
                {userIsLoggedIn && isNotHomepage && (
                    <Row spacing={2} alignItems="center">
                        <NotificationDrawer />
                        <UserMenuButton />
                    </Row>
                )}
                {!userIsLoggedIn && isNotHomepage && <SignInButton />}
                <LanguageSelect />
            </Row>
        </Row>
    );
}
