'use client';

import { RedButton } from '@/components/buttons/RedButton';
import { Typography } from '@/components/Typography';
import { BlackBanner } from '@/components/BlackBanner';
import { GreenButton } from '@/components/buttons/GreenButton';
import { YellowButton } from '@/components/buttons/YellowButton';
import { AssetAuthenticationStatus, AssetItem } from '@/config/types/asset';

import { AdminAssetAuthenticationStatusControlModal } from './AdminAssetAuthenticationStatusControlModal';

type Props = {
    data: AssetItem;
};

export const ManageAdminAssetAuthenticationStatusButton = ({
    data
}: Props): JSX.Element => {
    const statusToElement: Record<AssetAuthenticationStatus, JSX.Element> = {
        denied: (
            <AdminAssetAuthenticationStatusControlModal data={data}>
                {(open) => <RedButton textId="authDenied" onClick={open} />}
            </AdminAssetAuthenticationStatusControlModal>
        ),
        revoked: (
            <AdminAssetAuthenticationStatusControlModal data={data}>
                {(open) => <RedButton textId="authRevoked" onClick={open} />}
            </AdminAssetAuthenticationStatusControlModal>
        ),
        pending: (
            <AdminAssetAuthenticationStatusControlModal data={data}>
                {(open) => <YellowButton textId="authPending" onClick={open} />}
            </AdminAssetAuthenticationStatusControlModal>
        ),
        approved: (
            <AdminAssetAuthenticationStatusControlModal data={data}>
                {(open) => (
                    <GreenButton textId="authenticated" onClick={open} />
                )}
            </AdminAssetAuthenticationStatusControlModal>
        ),
        unprocessed: (
            <BlackBanner>
                <Typography
                    uppercased
                    sx={{ color: 'primary.main' }}
                    textId="unauthenticated"
                    variant="body2"
                />
            </BlackBanner>
        )
    };

    return statusToElement[data.authentication.status];
};
