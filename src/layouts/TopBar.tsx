import { usePathname } from 'next/navigation';

import { Row } from 'components/Row';
import { SignInButton } from 'features/authButton/SignInButton';
import { isUserLoggedIn } from 'state/user/selectors';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { LanguageSelect } from 'components/LanguageSelect';
import { NewListingButton } from 'features/NewListingButton';
import { NotificationDrawer } from 'features/notifications/NotificationDrawer';
import { path } from 'config/path';

export function TopBar(): JSX.Element {
    const pathname = usePathname();

    const userIsLoggedIn = useAppSelector(isUserLoggedIn);

    const isNotHomepage = pathname && pathname !== path.landing;

    const isNotMerchantAssetsPage =
        pathname?.split('/')[1] !== path.merchantAssets;
    console.log(pathname, isNotMerchantAssetsPage);
    return (
        <Row
            spacing={userIsLoggedIn ? 2 : 4}
            alignItems="center"
            justifyContent="flex-end">
            {isNotMerchantAssetsPage && isNotHomepage && <NewListingButton />}
            {userIsLoggedIn && isNotHomepage && (
                <Row spacing={2} alignItems="center">
                    <NotificationDrawer />
                </Row>
            )}
            {!userIsLoggedIn && isNotHomepage && <SignInButton />}
            <LanguageSelect />
        </Row>
    );
}
