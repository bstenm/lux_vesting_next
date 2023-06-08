import { grey } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';
import { usePathname } from 'next/navigation';

import { Link } from 'components/Link';
import { Row } from 'components/Row';
import { path } from 'config/path';
import { SignInButton } from 'features/authButton/SignInButton';
import { isUserLoggedIn } from 'state/user/selectors';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { LanguageSelect } from 'components/LanguageSelect';
import { NewListingButton } from 'features/NewListingButton';
import { NotificationDrawer } from 'features/notifications/NotificationDrawer';

export function TopBar(): JSX.Element {
    const pathname = usePathname();

    const userIsLoggedIn = useAppSelector(isUserLoggedIn);

    const isNotHomepage = pathname && pathname !== path.landing;

    const isNotMerchantAssetsPage =
        pathname?.split('/')[1] !== path.merchantAssets.split('/')[1];

    return (
        <Row justifyContent="space-between">
            <Row spacing={6} alignItems="center">
                <Link href={path.landing}>
                    <HomeIcon sx={{ color: grey[500] }} />
                </Link>
                <Link
                    sx={{ color: grey[400] }}
                    href={path.marketplace}
                    textId="marketplace"
                    capitalized
                />
            </Row>
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
            </Row>
        </Row>
    );
}
