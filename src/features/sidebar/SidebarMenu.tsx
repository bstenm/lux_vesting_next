'use client';

import purple from '@mui/material/colors/purple';
import { Menu } from 'react-pro-sidebar';
import BiotechIcon from '@mui/icons-material/Biotech';
import LiveHelpOutlinedIcon from '@mui/icons-material/LiveHelpOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

import { MenuLink } from 'features/sidebar/MenuLink';
import { useAppSelector } from 'libs/hooks/useAppSelector';
import { isUserAdmin, isUserBuilder } from 'state/user/selectors';
import HomeIcon from 'assets/homeIcon.svg';
import StakingIcon from 'assets/staking.svg';
import AuctionIcon from 'assets/auction.svg';
import SupportIcon from 'assets/support.svg';
import DocumentsIcon from 'assets/documents.svg';
import LoyaltyTiersIcon from 'assets/loyaltyTiersIcon.svg';
import { adminAssetList } from 'pages/AdminAssetListPage';
import { marketplace } from 'pages/MarketplacePage';
import { contactUs } from 'pages/ContactUsPage';
import { loyaltyTiers } from 'pages/LoyaltyTiersPage';
import { privacyPolicy } from 'pages/PrivacyPolicyPage';
import { landing } from 'pages/LandingPage';
import { merchantAssets } from 'pages/MerchantAssetsPage';

export function SidebarMenu(): JSX.Element {
    const isBuilder = useAppSelector(isUserBuilder);

    const isAdmin = useAppSelector(isUserAdmin);

    return (
        <Menu>
            {isAdmin && (
                <MenuLink
                    path={adminAssetList.path}
                    Icon={() => (
                        <AdminPanelSettingsIcon
                            sx={{ color: purple[200] }}
                            fontSize="large"
                        />
                    )}
                    title="admin"
                />
            )}
            <MenuLink Icon={HomeIcon} path={landing.path} title="home" />
            <MenuLink
                Icon={AuctionIcon}
                path={marketplace.path}
                title="marketplace"
            />
            <MenuLink Icon={StakingIcon} title="myBids" />
            <MenuLink
                Icon={DocumentsIcon}
                path={merchantAssets.path}
                title="merchantAssets"
            />
            <MenuLink
                Icon={SupportIcon}
                path={contactUs.path}
                title="contactUs"
            />
            <MenuLink
                Icon={LoyaltyTiersIcon}
                path={loyaltyTiers.path}
                title="nftLoyaltyTiers"
            />
            <MenuLink Icon={LiveHelpOutlinedIcon} path="faq" title="faq" />
            <MenuLink
                Icon={VerifiedUserOutlinedIcon}
                path={privacyPolicy.path}
                title="privacyPolicy"
            />
            {/* <MenuLink Icon={SettingsIcon} path="/settings" title="settings" /> */}
            {isBuilder && (
                <MenuLink Icon={BiotechIcon} path="/test" title="test" />
            )}
        </Menu>
    );
}
