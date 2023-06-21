import HomeIcon from '@mui/icons-material/Home';
import { grey, purple } from '@mui/material/colors';
import { usePathname } from 'next/navigation';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import { Link } from 'components/Link';
import { Row } from 'components/Row';
import { path } from 'config/path';
import { SearchInput } from 'features/SearchInput';
import { SignInButton } from 'features/authButton/SignInButton';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { LanguageSelect } from 'components/LanguageSelect';
import { NewListingButton } from 'features/NewListingButton';
import { NotificationDrawer } from 'features/notifications/NotificationDrawer';
import { isUserAdmin, isUserLoggedIn } from 'state/user/selectors';

export function TopBar(): JSX.Element {
    const pathname = usePathname();

    const userIsAdmin = useAppSelector(isUserAdmin);

    const userIsLoggedIn = useAppSelector(isUserLoggedIn);

    const isMarketplace = !!pathname && pathname === path.marketplace;

    const isNotHomepage = pathname && pathname !== path.landing;

    const isNotMerchantAssetsPage =
        pathname?.split('/')[1] !== path.merchantAssets.split('/')[1];

    return (
        <Row justifyContent="space-between">
            <Row spacing={4} alignItems="center">
                <Link href={path.landing}>
                    <HomeIcon sx={{ color: grey[500] }} />
                </Link>
                <Link
                    sx={{ color: grey[400] }}
                    href={path.marketplace}
                    textId="marketplace"
                    allCapitalized
                />
                <Link
                    sx={{ color: grey[400] }}
                    href={path.merchantAssets}
                    textId="createdAssets"
                    allCapitalized
                />
            </Row>
            {isNotHomepage && !isMarketplace && <SearchInput />}
            <Row alignItems="center" spacing={userIsLoggedIn ? 2 : 4}>
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
                {userIsAdmin && (
                    <Link href={path.admin}>
                        <AdminPanelSettingsIcon sx={{ color: purple[300] }} />
                    </Link>
                )}
            </Row>
        </Row>
    );
}
