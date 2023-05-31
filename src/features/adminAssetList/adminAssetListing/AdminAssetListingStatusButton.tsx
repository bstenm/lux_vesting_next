'use client';

import { RedButton } from 'components/buttons/RedButton';
import { Typography } from 'components/Typography';
import { AssetListingStatus } from 'config/types/asset';
import { GreenButton } from 'components/buttons/GreenButton';
import { YellowButton } from 'components/buttons/YellowButton';

type Props = {
    status: AssetListingStatus;
    onViewListingData: () => void;
    onViewPuchaseData: () => void;
};

export const AdminAssetListingStatusButton = ({
    status,
    onViewListingData,
    onViewPuchaseData
}: Props): JSX.Element => {
    const statusToButton: Record<AssetListingStatus, JSX.Element> = {
        denied: (
            <RedButton textId="listingDenied" onClick={onViewListingData} />
        ),
        pending: (
            <YellowButton textId="pendingListing" onClick={onViewListingData} />
        ),
        purchased: (
            <GreenButton textId="purchased" onClick={onViewPuchaseData} />
        ),
        approved: (
            <GreenButton textId="listedItem" onClick={onViewListingData} />
        ),
        unprocessed: (
            <Typography
                sx={{
                    p: 1,
                    color: 'primary.light',
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

    return statusToButton[status];
};
