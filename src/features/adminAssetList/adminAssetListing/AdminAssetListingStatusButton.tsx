'use client';

import { RedButton } from '@/components/buttons/RedButton';
import { Typography } from '@/components/Typography';
import { AssetListingStatus } from '@/config/types/asset';
import { GreenButton } from '@/components/buttons/GreenButton';
import { YellowButton } from '@/components/buttons/YellowButton';
import { PurpleButton } from '@/components/buttons/PurpleButton';

type Props = {
    status?: AssetListingStatus;
    onViewListingData: () => void;
};

export const AdminAssetListingStatusButton = ({
    status,
    onViewListingData
}: Props): JSX.Element => {
    const statusToButton: Record<AssetListingStatus, JSX.Element> = {
        denied: (
            <RedButton textId="listingDenied" onClick={onViewListingData} />
        ),
        revoked: (
            <PurpleButton textId="listingRevoked" onClick={onViewListingData} />
        ),
        pending: (
            <YellowButton textId="pendingListing" onClick={onViewListingData} />
        ),
        approved: (
            <GreenButton textId="listedItem" onClick={onViewListingData} />
        ),
        unprocessed: (
            <Typography
                sx={{
                    p: 1,
                    color: 'primary.main',
                    bgcolor: 'black',
                    textAlign: 'center',
                    opacity: 1
                }}
                textId="notListed"
                variant="body2"
                uppercased
            />
        )
    };

    return statusToButton[status ?? 'unprocessed'];
};
